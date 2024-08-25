# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from .simplification import simplify_mesh
# from .serializers import Simplify3DSerializer

# class Simplify3DView(APIView):
#     def post(self, request):
#         input_file = request.FILES.get('file')
#         if input_file:
#             output_file = 'backend/output_file.fbx'  # Chemin pour enregistrer le fichier simplifié

#             # Simplification du fichier 3D
#             simplify_mesh(input_file, output_file, simplification_ratio=0.5)

#             # Structuration de la réponse avec le serializer
#             response_data = {
#                 'message': 'Simplification réussie',
#                 'output_file': output_file
#             }
#             serializer = Simplify3DSerializer(response_data)
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         else:
#             return Response({'error': 'Aucun fichier fourni'}, status=status.HTTP_400_BAD_REQUEST)









# # # # # # # # # # # # # # # # 
# SANS SIMPLIFICATION 
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from rest_framework import status
# import os
# import datetime
# import tempfile
# from .firebase_config import bucket

# @api_view(['POST'])
# def simplify_3d_model(request):
#     print("Received request to simplify 3D model")
    
#     # Obtenir le fichier depuis la requête
#     file = request.FILES.get('file')

#     if not file:
#         print("Error: No file provided")
#         return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)
    
#     # Utiliser tempfile pour gérer les fichiers temporaires
#     try:
#         with tempfile.NamedTemporaryFile(delete=False) as temp_file:
#             for chunk in file.chunks():
#                 temp_file.write(chunk)
#             temp_file_path = temp_file.name
#         print(f"File saved successfully to: {temp_file_path}")
#     except Exception as e:
#         print(f"Error saving file: {e}")
#         return Response({'error': 'Error saving file'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#     # Téléversement vers Firebase Storage
#     blob = bucket.blob(f"simplified_models/{file.name}")
#     print(f"Uploading file to Firebase Storage: {blob.name}")
    
#     try:
#         blob.upload_from_filename(temp_file_path)
#         print("File uploaded successfully")
#     except Exception as e:
#         print(f"Error uploading file: {e}")
#         return Response({'error': 'Error uploading file'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#     # Création de l'URL de téléchargement
#     download_url = blob.generate_signed_url(expiration=datetime.timedelta(days=7))
#     print(f"Generated download URL: {download_url}")
    
#     # Nettoyage du fichier local
#     try:
#         os.remove(temp_file_path)
#         print(f"Local file {temp_file_path} removed successfully")
#     except Exception as e:
#         print(f"Error removing local file: {e}")
    
#     return Response({'downloadUrl': download_url})





# # # # # # # # # # # # # # # # 
# with pybind11
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
        target_faces = 5000  # Ajustez ce nombre selon vos besoins
        
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





# # # # # # # # # # # # # # # # 
# WITH Open3D 

# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from rest_framework import status
# import os
# import datetime
# import tempfile
# import open3d as o3d
# from .firebase_config import bucket

# # Formats supportés par Open3D
# SUPPORTED_FORMATS = ['.obj', '.stl', '.ply', '.glb', '.gltf']

# @api_view(['POST'])
# def simplify_3d_model(request):
#     print("Received request to simplify 3D model")
    
#     # Obtenir le fichier depuis la requête
#     file = request.FILES.get('file')

#     if not file:
#         print("Error: No file provided")
#         return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)

#     # Récupérer l'extension du fichier
#     file_extension = os.path.splitext(file.name)[1].lower()
    
#     if file_extension not in SUPPORTED_FORMATS:
#         print(f"Unsupported file format: {file_extension}")
#         return Response({'error': f"Unsupported file format: {file_extension}. Supported formats are: {SUPPORTED_FORMATS}"}, status=status.HTTP_400_BAD_REQUEST)
    
#     # Utiliser tempfile pour gérer les fichiers temporaires
#     try:
#         with tempfile.NamedTemporaryFile(delete=False, suffix=file_extension) as temp_file:
#             for chunk in file.chunks():
#                 temp_file.write(chunk)
#             temp_file_path = temp_file.name
#         print(f"File saved successfully to: {temp_file_path}")
#     except Exception as e:
#         print(f"Error saving file: {e}")
#         return Response({'error': 'Error saving file'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#     # Simplification du modèle 3D avec Open3D
#     try:
#         # Charger le modèle 3D avec Open3D
#         mesh = o3d.io.read_triangle_mesh(temp_file_path)

#         # Vérifier si le modèle est maintenant un maillage valide
#         if not mesh.has_vertices() or not mesh.has_triangles():
#             print("Error: The file does not contain a valid mesh")
#             return Response({'error': 'The file does not contain a valid mesh'}, status=status.HTTP_400_BAD_REQUEST)

#         # Simplifier le maillage en réduisant le nombre de faces (triangles)
#         target_faces = 5000  # Ajustez ce nombre selon vos besoins

#         # Simplification via la fonction `simplify_quadric_decimation`
#         simplified_mesh = mesh.simplify_quadric_decimation(target_faces)
        
#         # Exporter le modèle simplifié dans un fichier temporaire
#         simplified_temp_path = temp_file_path + "_simplified" + file_extension
#         o3d.io.write_triangle_mesh(simplified_temp_path, simplified_mesh)
#         print(f"Simplified model saved to: {simplified_temp_path}")
#     except Exception as e:
#         print(f"Error simplifying file: {e}")
#         return Response({'error': f"Error simplifying file: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#     # Téléversement vers Firebase Storage
#     blob = bucket.blob(f"simplified_models/{os.path.basename(simplified_temp_path)}")
#     print(f"Uploading file to Firebase Storage: {blob.name}")
    
#     try:
#         blob.upload_from_filename(simplified_temp_path)
#         print("File uploaded successfully")
#     except Exception as e:
#         print(f"Error uploading file: {e}")
#         return Response({'error': 'Error uploading file'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#     # Création de l'URL de téléchargement
#     download_url = blob.generate_signed_url(expiration=datetime.timedelta(days=7))
#     print(f"Generated download URL: {download_url}")
    
#     # Nettoyage des fichiers locaux
#     try:
#         os.remove(temp_file_path)
#         os.remove(simplified_temp_path)
#         print(f"Local files removed successfully")
#     except Exception as e:
#         print(f"Error removing local files: {e}")
    
#     return Response({'downloadUrl': download_url})









# # # # # # # # # # # # # # # # 
# WITH pymesh2
 
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from rest_framework import status
# import os
# import datetime
# import tempfile
# import pymesh2 as pymesh
# from .firebase_config import bucket

# # Formats supportés par PyMesh
# SUPPORTED_FORMATS = ['.obj', '.stl', '.ply']

# @api_view(['POST'])
# def simplify_3d_model(request):
#     print("Received request to simplify 3D model")
    
#     # Obtenir le fichier depuis la requête
#     file = request.FILES.get('file')

#     if not file:
#         print("Error: No file provided")
#         return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)

#     # Récupérer l'extension du fichier
#     file_extension = os.path.splitext(file.name)[1].lower()
    
#     if file_extension not in SUPPORTED_FORMATS:
#         print(f"Unsupported file format: {file_extension}")
#         return Response({'error': f"Unsupported file format: {file_extension}. Supported formats are: {SUPPORTED_FORMATS}"}, status=status.HTTP_400_BAD_REQUEST)
    
#     # Utiliser tempfile pour gérer les fichiers temporaires
#     try:
#         with tempfile.NamedTemporaryFile(delete=False, suffix=file_extension) as temp_file:
#             for chunk in file.chunks():
#                 temp_file.write(chunk)
#             temp_file_path = temp_file.name
#         print(f"File saved successfully to: {temp_file_path}")
#     except Exception as e:
#         print(f"Error saving file: {e}")
#         return Response({'error': 'Error saving file'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#     # Simplification du modèle 3D avec PyMesh
#     try:
#         # Charger le modèle 3D avec PyMesh
#         mesh = pymesh.load_mesh(temp_file_path)

#         # Simplifier le maillage en réduisant le nombre de faces (triangles)
#         target_faces = 5000  # Ajustez ce nombre selon vos besoins

#         # Simplification via la fonction `simplify_quadric_decimation`
#         simplified_mesh = pymesh.optimize_mesh(mesh, target_faces)
        
#         # Exporter le modèle simplifié dans un fichier temporaire
#         simplified_temp_path = temp_file_path + "_simplified" + file_extension
#         pymesh.save_mesh(simplified_temp_path, simplified_mesh)
#         print(f"Simplified model saved to: {simplified_temp_path}")
#     except Exception as e:
#         print(f"Error simplifying file: {e}")
#         return Response({'error': f"Error simplifying file: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#     # Téléversement vers Firebase Storage
#     blob = bucket.blob(f"simplified_models/{os.path.basename(simplified_temp_path)}")
#     print(f"Uploading file to Firebase Storage: {blob.name}")
    
#     try:
#         blob.upload_from_filename(simplified_temp_path)
#         print("File uploaded successfully")
#     except Exception as e:
#         print(f"Error uploading file: {e}")
#         return Response({'error': 'Error uploading file'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#     # Création de l'URL de téléchargement
#     download_url = blob.generate_signed_url(expiration=datetime.timedelta(days=7))
#     print(f"Generated download URL: {download_url}")
    
#     # Nettoyage des fichiers locaux
#     try:
#         os.remove(temp_file_path)
#         os.remove(simplified_temp_path)
#         print(f"Local files removed successfully")
#     except Exception as e:
#         print(f"Error removing local files: {e}")
    
#     return Response({'downloadUrl': download_url})
