from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Denuncia, Comentario, GestorPublico

#Arquivo para validação de dados

#Estamos utilizando a biblioteca Rest framework para realizar esses serializers

class UserSerializer(serializers.ModelSerializer): #validacao do user
    class Meta:
        model = User
        fields = ["id", "username", "password"] #campos
        extra_kwargs = {"password": {"write_only": True}} #a senha só é visivel durante o cadastro
        
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data) 
        return user
        
class GestorExtraFieldSerializer(serializers.ModelSerializer): #serializer apenas para lidar com o campo extra "cra_de_gestao" que não existe por padrão em User
    class Meta:
        model = GestorPublico
        fields = ["cra_de_gestor"]
        
class GestorSerializer(serializers.ModelSerializer):
    gestorPublico = GestorExtraFieldSerializer(required=False) #o drf validará os dados de GestorExtraFieldSerializer e 
    
    class Meta:
        model = User
        fields = ["id", "username", "password", "gestorPublico"]
        extra_kwargs = {"password": {"write_only": True}}
        
    def create(self, validated_data):
        gestor_data = validated_data.pop('gestorPublico', {}) #caso o campo gestorPublico (que contém cra_de_gestor) não estiver presente, o pop retornará apenas {}
        user = User.objects.create_user(**validated_data)  #apos o pop do cra_de_gestor, sobra apenas username e password serão passados para user
        return user
        
        
class DenunciaSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Denuncia
        fields = ["protocolo", "categoria", "descricao", "latitude", "longitude", "status",
                  "autor", "created_at"]
        extra_kwargs = {"autor": {"read_only": True}} #o usuario é setado pelo back end apenas.
                                 
                                    
class ComentarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comentario
        fields = ["conteudoResposta", "created_at", "autor", "denuncia"]
        extra_kwargs = {"autor": {"read_only": True}}
        
        read_only_fields = ['denuncia', 'autor', 'created_at']