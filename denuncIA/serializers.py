from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Denuncia, Comentario, GestorPublico
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
    cra_de_gestor = serializers.CharField(required=True, write_only=True)
    
    class Meta:
        model = User
        fields = ["id", "username", "password", "cra_de_gestor"]
        extra_kwargs = {"password": {"write_only": True}}
        
    def create(self, validated_data):
        cra = validated_data.pop('cra_de_gestor')
        password = validated_data.pop('password')
        
        user = User.objects.create_user(**validated_data, password=password)
        
        gestor_group, _ = Group.objects.get_or_create(name='Gestor_Publico')
        user.groups.add(gestor_group)
        
        GestorPublico.objects.create(user=user, cra_de_gestor=cra)
        return user
    
class DenunciaSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Denuncia
        fields = ["protocolo", "categoria", "descricao", "latitude", "longitude", "status",
                  "autor", "created_at", "foto"]
        read_only_fields = ['autor']

class ComentarioSerializer(serializers.ModelSerializer):
    autor_nome = serializers.CharField(source='autor.username', read_only=True)
    class Meta:
        model = Comentario
        fields = ["id", "conteudoResposta", "created_at", "autor", "autor_nome", "denuncia"]
        extra_kwargs = {"autor": {"read_only": True}}
        read_only_fields = ['denuncia', 'autor', 'created_at']

class GestorTokenObtainPairSerializer(serializers.Serializer):
    username = serializers.CharField(write_only=True, required=True)
    cra_de_gestor = serializers.CharField(write_only=True, required=True)
    password = serializers.CharField(write_only=True, required=True)
    access = serializers.CharField(read_only=True)
    refresh = serializers.CharField(read_only=True)
   
    def validate(self, attrs):
        from rest_framework_simplejwt.tokens import RefreshToken
        
        username = attrs.get('username')
        cra_de_gestor = attrs.get('cra_de_gestor')
        password = attrs.get('password')

        if not username or not cra_de_gestor or not password:
            raise serializers.ValidationError('Usuário, CRA e senha são obrigatórios')

        try:
            gestor_publico = GestorPublico.objects.get(cra_de_gestor=cra_de_gestor)
        except GestorPublico.DoesNotExist:
            raise serializers.ValidationError('CRA não encontrado.')

        if gestor_publico.user.username != username:
             raise serializers.ValidationError('O usuário informado não corresponde a este CRA.')

        user = authenticate(username=username, password=password)

        if user is None:
            raise serializers.ValidationError('Senha incorreta.')
    
        refresh = RefreshToken.for_user(user)
        attrs['access'] = str(refresh.access_token)
        attrs['refresh'] = str(refresh)
        return attrs