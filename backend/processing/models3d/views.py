from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .simplification import simplify_mesh
from .serializers import Simplify3DSerializer

class Simplify3DView(APIView):
    def post(self, request):
        input_file = request.FILES.get('file')
        if input_file:
            output_file = 'backend/output_file.fbx'  # Chemin pour enregistrer le fichier simplifié

            # Simplification du fichier 3D
            simplify_mesh(input_file, output_file, simplification_ratio=0.5)

            # Structuration de la réponse avec le serializer
            response_data = {
                'message': 'Simplification réussie',
                'output_file': output_file
            }
            serializer = Simplify3DSerializer(response_data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Aucun fichier fourni'}, status=status.HTTP_400_BAD_REQUEST)
