

# # # # # # # # # # # # # # # # 
# Tache 1 :simplification with pybind11
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import os
import datetime
import tempfile
import trimesh
from .firebase_config import bucket

# Formats supportés par trimesh
SUPPORTED_FORMATS = ['.obj', '.stl', '.ply', '.glb', '.gltf']

@api_view(['POST'])
def simplify_3d_model(request):
    print("Received request to simplify 3D model")
    
    # Obtenir le fichier depuis la requête
    file = request.FILES.get('file')

    if not file:
        print("Error: No file provided")
        return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)

    # Récupérer l'extension du fichier
    file_extension = os.path.splitext(file.name)[1].lower()
    
    if file_extension not in SUPPORTED_FORMATS:
        print(f"Unsupported file format: {file_extension}")
        return Response({'error': f"Unsupported file format: {file_extension}. Supported formats are: {SUPPORTED_FORMATS}"}, status=status.HTTP_400_BAD_REQUEST)
    
    # Utiliser tempfile pour gérer les fichiers temporaires
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=file_extension) as temp_file:
            for chunk in file.chunks():
                temp_file.write(chunk)
            temp_file_path = temp_file.name
        print(f"File saved successfully to: {temp_file_path}")
    except Exception as e:
        print(f"Error saving file: {e}")
        return Response({'error': 'Error saving file'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Simplification du modèle 3D avec trimesh
    try:
        # Charger le modèle 3D avec trimesh
        mesh = trimesh.load(temp_file_path)

        # Si le modèle est une scène, extraire un maillage combiné
        if isinstance(mesh, trimesh.Scene):
            print("The file contains a scene, converting to a mesh")
            # Combiner tous les géométries dans un seul maillage
            mesh = mesh.dump(concatenate=True)
        
        # Vérifier si le modèle est maintenant un maillage valide
        if not isinstance(mesh, trimesh.Trimesh):
            print("Error: The file does not contain a valid mesh after scene processing")
            return Response({'error': 'The file does not contain a valid mesh'}, status=status.HTTP_400_BAD_REQUEST)

        # Simplifier le maillage en réduisant le nombre de faces (triangles)
        target_faces = 10000  # Ajustez ce nombre selon vos besoins
        
        # Simplification via la fonction simplify_quadratic_decimation
        simplified_mesh = mesh.simplify_quadratic_decimation(target_faces)
        
        # Exporter le modèle simplifié dans un fichier temporaire
        simplified_temp_path = temp_file_path + "_simplified" + file_extension
        simplified_mesh.export(simplified_temp_path)
        print(f"Simplified model saved to: {simplified_temp_path}")
    except Exception as e:
        print(f"Error simplifying file: {e}")
        return Response({'error': f"Error simplifying file: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Téléversement vers Firebase Storage
    blob = bucket.blob(f"simplified_models/{os.path.basename(simplified_temp_path)}")
    print(f"Uploading file to Firebase Storage: {blob.name}")
    
    try:
        blob.upload_from_filename(simplified_temp_path)
        print("File uploaded successfully")
    except Exception as e:
        print(f"Error uploading file: {e}")
        return Response({'error': 'Error uploading file'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Création de l'URL de téléchargement
    download_url = blob.generate_signed_url(expiration=datetime.timedelta(days=7))
    print(f"Generated download URL: {download_url}")
    
    # Nettoyage des fichiers locaux
    try:
        os.remove(temp_file_path)
        os.remove(simplified_temp_path)
        print(f"Local files removed successfully")
    except Exception as e:
        print(f"Error removing local files: {e}")
    
    return Response({'downloadUrl': download_url})

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import os
import tempfile
import trimesh
import traceback
import json
import datetime
from .firebase_config import bucket

# Formats supportés par trimesh
SUPPORTED_FORMATS = ['.obj']

@api_view(['POST'])
def label_3d_model(request):
    print("Received request to label 3D model")

    # Obtenir le fichier depuis la requête
    file = request.FILES.get('file')

    if not file:
        print("Error: No file provided")
        return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)

    # Récupérer l'extension du fichier
    file_extension = os.path.splitext(file.name)[1].lower()

    if file_extension not in SUPPORTED_FORMATS:
        print(f"Unsupported file format: {file_extension}")
        return Response({'error': f"Unsupported file format: {file_extension}. Supported formats are: {SUPPORTED_FORMATS}"}, status=status.HTTP_400_BAD_REQUEST)

    # Utiliser tempfile pour gérer les fichiers temporaires
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=file_extension) as temp_file:
            for chunk in file.chunks():
                temp_file.write(chunk)
            temp_file_path = temp_file.name
        print(f"File saved successfully to: {temp_file_path}")
    except Exception as e:
        print(f"Error saving file: {e}")
        return Response({'error': 'Error saving file'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    try:
        # Charger le modèle .obj
        scene = trimesh.load(temp_file_path)

        if isinstance(scene, trimesh.Scene):
            if len(scene.geometry) == 0:
                print("No geometries found in the scene")
                return Response({'error': 'No geometries found in the scene'}, status=status.HTTP_400_BAD_REQUEST)
            mesh = scene.dump(concatenate=True)
        else:
            mesh = scene

        vertices = mesh.vertices.tolist()

        # Calculer les Min/Max pour chaque axe
        min_x, max_x = min([v[0] for v in vertices]), max([v[0] for v in vertices])
        min_y, max_y = min([v[1] for v in vertices]), max([v[1] for v in vertices])
        min_z, max_z = min([v[2] for v in vertices]), max([v[2] for v in vertices])

        # Définir les seuils dynamiques basés sur les Min/Max
        z_threshold = (min_z + max_z) / 2  # Point médian pour séparer maxillaire et mandibule
        x_incisive_threshold = (max_x - min_x) * 0.2  # 20% de la plage pour incisive
        x_canine_threshold = (max_x - min_x) * 0.35  # 35% de la plage pour canine
        y_buccal_threshold = (min_y + max_y) / 2  # Séparation entre buccal et lingual

        vertex_labels = {}

        for i, vertex in enumerate(vertices):
            x, y, z = vertex
            label = []

            # Maxillaire ou mandibule basé sur Z
            if z > z_threshold:
                label.append('maxillaire')
            else:
                label.append('mandibule')

            # Classification en fonction de X pour les dents
            if abs(x) < x_incisive_threshold:
                label.append('incisive')
            elif abs(x) < x_canine_threshold:
                label.append('canine')
            elif abs(x) < (max_x - min_x) * 0.5:
                label.append('premolaire')
            else:
                label.append('molaire')

            # Classification buccale ou linguale en fonction de Y
            if y > y_buccal_threshold:
                label.append('buccal')
            else:
                label.append('lingual')

            vertex_labels[i] = {
                'labels': label,
                'coordinates': vertex
            }

        # Lire le fichier .obj temporaire
        with open(temp_file_path, 'r') as obj_file:
            obj_data = obj_file.readlines()

        # Créer un fichier temporaire pour le modèle étiqueté
        with tempfile.NamedTemporaryFile(delete=False, suffix="_labeled.obj") as labeled_obj_file:
            labeled_obj_path = labeled_obj_file.name
            vertex_counter = 0
            for line in obj_data:
                labeled_obj_file.write(line.encode('utf-8'))
                if line.startswith('v '):  # Chaque ligne de vertex commence par 'v '
                    if vertex_counter in vertex_labels:
                        labels = ', '.join(vertex_labels[vertex_counter]['labels'])
                        comment = f" # Labels: {labels}\n"
                        # Afficher les lignes mises à jour dans la console
                        print(f"Adding labels to vertex {vertex_counter}: {comment.strip()}")
                    else:
                        comment = " # Labels: N/A\n"
                    labeled_obj_file.write(comment.encode('utf-8'))
                    vertex_counter += 1

        # Créer un fichier temporaire pour le fichier JSON des labels
        with tempfile.NamedTemporaryFile(delete=False, suffix=".json", mode='w') as json_file:
            json_file_path = json_file.name
            json.dump(vertex_labels, json_file, indent=4)
        print("Labeling completed successfully")

    except Exception as e:
        error_message = str(e)
        traceback_message = traceback.format_exc()
        print(f"Error during labeling: {error_message}\n{traceback_message}")
        return Response({'error': f'{error_message}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Téléversement des fichiers générés vers Firebase Storage
    try:
        # Téléversement du fichier .obj étiqueté
        labeled_obj_blob = bucket.blob(f"labeled_models/{os.path.basename(labeled_obj_path)}")
        labeled_obj_blob.upload_from_filename(labeled_obj_path, content_type='application/octet-stream')
        print(f"Labeled OBJ file uploaded to Firebase Storage: {labeled_obj_blob.name}")

        # Téléversement du fichier JSON des labels
        json_blob = bucket.blob(f"labeled_models/{os.path.basename(json_file_path)}")
        json_blob.upload_from_filename(json_file_path, content_type='application/json')
        print(f"JSON labels file uploaded to Firebase Storage: {json_blob.name}")

        # Génération des URLs de téléchargement
        labeled_obj_url = labeled_obj_blob.generate_signed_url(expiration=datetime.timedelta(days=7))
        json_file_url = json_blob.generate_signed_url(expiration=datetime.timedelta(days=7))
        print(f"Generated download URLs:\nOBJ: {labeled_obj_url}\nJSON: {json_file_url}")

    except Exception as e:
        print(f"Error uploading files to Firebase Storage: {e}")
        return Response({'error': 'Error uploading files'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Nettoyage des fichiers temporaires
    try:
        os.remove(temp_file_path)
        os.remove(labeled_obj_path)
        os.remove(json_file_path)
        print("Temporary files removed successfully")
    except Exception as e:
        print(f"Error removing temporary files: {e}")

    return Response({
        'message': 'OBJ file has been labeled with dental context and saved successfully.',
        'labeledObjUrl': labeled_obj_url,
        'jsonFileUrl': json_file_url
    })


# # Tache 2 :Conversion des labels 
# from django.http import JsonResponse
# import trimesh
# import os
# import traceback
# import json  

# def load_and_check_model(request):
#     file_path = 'C:/Users/lenovo/3D Objects/Maxilla.obj'  # Chemin vers le modèle .obj
#     output_dir = 'C:/Users/lenovo/3D Objects/output/'  # Répertoire de sortie
    
#     if not os.path.exists(file_path):
#         return JsonResponse({'error': 'File not found'}, status=404)
    
#     if not os.path.exists(output_dir):
#         os.makedirs(output_dir)

#     try:
#         # Charger le modèle .obj
#         scene = trimesh.load(file_path)
        
#         if isinstance(scene, trimesh.Scene):
#             if len(scene.geometry) == 0:
#                 return JsonResponse({'error': 'No geometries found in the scene'}, status=404)
#             mesh = list(scene.geometry.values())[0]
#         else:
#             mesh = scene
        
#         vertices = mesh.vertices.tolist()
#         edges = mesh.edges.tolist()
#         faces = mesh.faces.tolist()

#         # Calculer les Min/Max pour chaque axe
#         min_x, max_x = min([v[0] for v in vertices]), max([v[0] for v in vertices])
#         min_y, max_y = min([v[1] for v in vertices]), max([v[1] for v in vertices])
#         min_z, max_z = min([v[2] for v in vertices]), max([v[2] for v in vertices])

#         # Définir les seuils dynamiques basés sur les Min/Max
#         z_threshold = (min_z + max_z) / 2  # Point médian pour séparer maxillaire et mandibule
#         x_incisive_threshold = (max_x - min_x) * 0.2  # 20% de la plage pour incisive
#         x_canine_threshold = (max_x - min_x) * 0.35  # 35% de la plage pour canine
#         y_buccal_threshold = (min_y + max_y) / 2  # Séparation entre buccal et lingual

#         vertex_labels = {}

#         for i, vertex in enumerate(vertices):
#             x, y, z = vertex
#             label = []

#             # Maxillaire ou mandibule basé sur Z
#             if z > z_threshold:
#                 label.append('maxillaire')
#             else:
#                 label.append('mandibule')

#             # Classification en fonction de X pour les dents
#             if abs(x) < x_incisive_threshold:
#                 label.append('incisive')
#             elif abs(x) < x_canine_threshold:
#                 label.append('canine')
#             elif abs(x) < (max_x - min_x) * 0.5:
#                 label.append('premolaire')
#             else:
#                 label.append('molaire')

#             # Classification buccale ou linguale en fonction de Y
#             if y > y_buccal_threshold:
#                 label.append('buccal')
#             else:
#                 label.append('lingual')

#             vertex_labels[i] = {
#                 'labels': label,
#                 'coordinates': vertex
#             }

#         # Lire le fichier .obj d'origine
#         with open(file_path, 'r') as obj_file:
#             obj_data = obj_file.readlines()

#         # Ajouter les commentaires avec les labels dans le fichier .obj
#         labeled_obj_path = os.path.join(output_dir, 'Maxilla_labeled.obj')
#         with open(labeled_obj_path, 'w') as labeled_obj_file:
#             vertex_counter = 0
#             for line in obj_data:
#                 labeled_obj_file.write(line)
#                 if line.startswith('v '):  # Chaque ligne de vertex commence par 'v '
#                     if vertex_counter in vertex_labels:
#                         labels = ', '.join(vertex_labels[vertex_counter]['labels'])
#                         comment = f" # Labels: {labels}\n"
#                     else:
#                         # Si la clé n'existe pas, écrivez un commentaire par défaut
#                         comment = " # Labels: N/A\n"
#                     labeled_obj_file.write(comment)
#                     vertex_counter += 1

#         # Écrire les labels dans un fichier JSON
#         json_file_path = os.path.join(output_dir, 'vertex_labels.json')
#         with open(json_file_path, 'w') as json_file:
#             json.dump(vertex_labels, json_file, indent=4)

#         # Afficher les changements dans la console
#         print("\nChangements appliqués au fichier .obj :\n")
#         for i, label_data in vertex_labels.items():
#             print(f"Vertex {i}: {label_data['coordinates']} -> Labels: {', '.join(label_data['labels'])}")

#         # Optionnel: Écrire également les vertices avec labels dans un fichier texte séparé
#         with open(os.path.join(output_dir, 'labeled_vertices_dental.txt'), 'w') as file:
#             for i, label_data in vertex_labels.items():
#                 file.write(f"Vertex {i}: {label_data['coordinates']} -> Labels: {', '.join(label_data['labels'])}\n")

#     except Exception as e:
#         error_message = str(e)
#         # Ajoutez la trace complète de l'exception pour plus de détails
#         traceback_message = traceback.format_exc()
#         return JsonResponse({'error': f'{error_message}\n{traceback_message}'}, status=500)

#     return JsonResponse({'message': 'OBJ file has been labeled with dental context and saved successfully.'})

