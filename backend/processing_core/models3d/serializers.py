from rest_framework import serializers

class Simplify3DSerializer(serializers.Serializer):
    message = serializers.CharField()
    output_file = serializers.CharField()
