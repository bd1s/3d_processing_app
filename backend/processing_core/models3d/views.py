from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import os
import datetime
from .firebase_config import bucket

@api_view(['POST'])
def simplify_3d_model(request):
    print("Received request to simplify 3D model")
    
    # Obtenir le fichier depuis la requête
    file = request.FILES.get('file')

    print(f"File received: {file}")

    # Vérifier si le fichier est fourni
    if not file:
        print("Error: No file provided")
        return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Simplification du modèle 3D (implémentez votre logique ici)
    simplified_file_path = f'/tmp/{file.name}'
    print(f"Saving simplified model to: {simplified_file_path}")

    try:
        with open(simplified_file_path, 'wb') as f:
            for chunk in file.chunks():
                f.write(chunk)
        print("File saved successfully")
    except Exception as e:
        print(f"Error saving file: {e}")
        return Response({'error': 'Error saving file'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Téléversement vers Firebase Storage
    blob = bucket.blob(f"simplified_models/{file.name}")
    print(f"Uploading file to Firebase Storage: {blob.name}")
    
    try:
        blob.upload_from_filename(simplified_file_path)
        print("File uploaded successfully")
    except Exception as e:
        print(f"Error uploading file: {e}")
        return Response({'error': 'Error uploading file'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Création de l'URL de téléchargement
    download_url = blob.generate_signed_url(expiration=datetime.timedelta(days=7))
    print(f"Generated download URL: {download_url}")
    
    # Nettoyage du fichier local
    try:
        os.remove(simplified_file_path)
        print(f"Local file {simplified_file_path} removed successfully")
    except Exception as e:
        print(f"Error removing local file: {e}")
    
    return Response({'downloadUrl': download_url})
