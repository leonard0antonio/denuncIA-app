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
        fields = ["protocolo", "categoria", "descricao", "latitude", "longitude", "status",
                  "autor", "created_at"]
        extra_kwargs = {"autor": {"read_only": True}} #o usuario é setado pelo back end apenas.
                                    #CORRECAO: ERA RPA SER READ ONLY AO IVNES DE WRITE ONLY