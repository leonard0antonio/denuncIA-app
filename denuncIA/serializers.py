from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Denuncia, Comentario, GestorPublico

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}
        
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data) 
        return user

class RankingSerializer(serializers.ModelSerializer):
    total_denuncias = serializers.IntegerField(read_only=True)
    class Meta:
        model = User
        fields = ['username', 'total_denuncias']

class GestorExtraFieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = GestorPublico
        fields = ["cra_de_gestor"]
        
class GestorSerializer(serializers.ModelSerializer):
    gestorPublico = GestorExtraFieldSerializer(required=True) # Obrigatório para cadastro
    class Meta:
        model = User
        fields = ["id", "username", "password", "gestorPublico"]
        extra_kwargs = {"password": {"write_only": True}}
        
    def create(self, validated_data):
        gestor_data = validated_data.pop('gestorPublico')
        user = User.objects.create_user(**validated_data)
        GestorPublico.objects.create(user=user, **gestor_data)
        return user

    def update(self, instance, validated_data):
        gestor_data = validated_data.pop('gestorPublico', None)
        instance.username = validated_data.get('username', instance.username)
        if 'password' in validated_data:
            instance.set_password(validated_data['password'])
        instance.save()

        if gestor_data:
            gestor, created = GestorPublico.objects.get_or_create(user=instance)
            gestor.cra_de_gestor = gestor_data.get('cra_de_gestor', gestor.cra_de_gestor)
            gestor.save()
            
        return instance

class DenunciaSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Denuncia
        fields = ["protocolo", "categoria", "descricao", "latitude", "longitude", "status",
                  "autor", "created_at", "foto"]
        extra_kwargs = {"autor": {"read_only": True}}
                                    
class ComentarioSerializer(serializers.ModelSerializer):
    autor_nome = serializers.CharField(source='autor.username', read_only=True)
    class Meta:
        model = Comentario
        fields = ["id", "conteudoResposta", "created_at", "autor", "autor_nome", "denuncia"]
        extra_kwargs = {"autor": {"read_only": True}}
        read_only_fields = ['denuncia', 'autor', 'created_at']