from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Denuncia, Comentario, GestorPublico
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate

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
    # Define o campo explicitamente para aceitar no JSON raiz
    cra_de_gestor = serializers.CharField(required=True, write_only=True)
    
    class Meta:
        model = User
        fields = ["id", "username", "password", "cra_de_gestor"]
        extra_kwargs = {"password": {"write_only": True}}
        
    def create(self, validated_data):
        # Remove o campo extra antes de criar o User
        cra = validated_data.pop('cra_de_gestor')
        password = validated_data.pop('password')
        
        # Cria o usuário
        user = User.objects.create_user(**validated_data, password=password)
        
        # Garante que o grupo existe e adiciona o usuário
        gestor_group, _ = Group.objects.get_or_create(name='Gestor_Publico')
        user.groups.add(gestor_group)
        
        # Cria o perfil de gestor vinculado
        GestorPublico.objects.create(user=user, cra_de_gestor=cra)
        
        return user

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

class GestorTokenObtainPairSerializer(serializers.Serializer):
    cra_de_gestor = serializers.CharField(write_only=True, required=True)
    password = serializers.CharField(write_only=True, required=True)
    access = serializers.CharField(read_only=True)
    refresh = serializers.CharField(read_only=True)
   
    def validate(self, attrs):
        from rest_framework_simplejwt.tokens import RefreshToken
        
        cra_de_gestor = attrs.get('cra_de_gestor')
        password = attrs.get('password')

        if not cra_de_gestor or not password:
            raise serializers.ValidationError('CRA de gestor e senha são obrigatórios')

        try:
            gestor_publico = GestorPublico.objects.get(cra_de_gestor=cra_de_gestor)
        except GestorPublico.DoesNotExist:
            raise serializers.ValidationError('Não há nenhuma conta com essas credenciais cadastrada')

        user = authenticate(username=gestor_publico.user.username, password=password)

        if user is None:
            raise serializers.ValidationError('Credenciais inválidas')
    
        refresh = RefreshToken.for_user(user)
        attrs['access'] = str(refresh.access_token)
        attrs['refresh'] = str(refresh)
        return attrs