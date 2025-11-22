from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Denuncia

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}
        
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data) 
        return user
        
class DenunciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Denuncia
        fields = ["categoria", "descricao", "localizacao", "status", "foto"
                  "autor", "created_at"]
        extra_kwargs = {"autor": {"write_only": True}} #o usuario é setado pelo back end apenas.