from django.contrib.auth.models import User
from django.db.models import Count
from rest_framework import generics
from django.shortcuts import get_object_or_404
from .serializers import UserSerializer, DenunciaSerializer, ComentarioSerializer, RankingSerializer, GestorSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Denuncia, Comentario

class GetDenuncia(generics.RetrieveAPIView):
    serializer_class = DenunciaSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'protocolo'
    
    def get_queryset(self):
        user = self.request.user
        if hasattr(user, 'gestorpublico') or user.is_staff:
            return Denuncia.objects.all()
        return Denuncia.objects.filter(autor=user)

class CreateDenuncia(generics.ListCreateAPIView):
    serializer_class = DenunciaSerializer
    permission_classes = [IsAuthenticated] 
    parser_classes = (MultiPartParser, FormParser)

    def get_queryset(self):
        user = self.request.user 
        if hasattr(user, 'gestorpublico') or user.is_staff:
             return Denuncia.objects.all().order_by('-created_at')
        return Denuncia.objects.filter(autor=user).order_by('-created_at')
    
    def perform_create(self, serializer):
        if serializer.is_valid(): 
            serializer.save(autor=self.request.user) 
    
class DeleteDenuncia(generics.DestroyAPIView):
    serializer_class = DenunciaSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'protocolo'
    
    def get_queryset(self):
        user = self.request.user 
        if hasattr(user, 'gestorpublico') or user.is_staff:
            return Denuncia.objects.all()
        return Denuncia.objects.filter(autor=user)
    
class UpdateDenuncia(generics.UpdateAPIView):
    serializer_class = DenunciaSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)
    lookup_field = 'protocolo'

    def get_queryset(self):
        user = self.request.user 
        if hasattr(user, 'gestorpublico') or user.is_staff:
            return Denuncia.objects.all()
        return Denuncia.objects.filter(autor=user)

class CreateComentario(generics.ListCreateAPIView):
    serializer_class = ComentarioSerializer
    permission_classes = [IsAuthenticated] 

    def get_queryset(self):
        denuncia_protocolo = self.kwargs.get('protocolo')
        return Comentario.objects.filter(denuncia__protocolo=denuncia_protocolo) 
    
    def perform_create(self, serializer):
        denuncia_protocolo = self.kwargs.get('protocolo')
        denuncia = get_object_or_404(Denuncia, protocolo=denuncia_protocolo)
        serializer.save(autor=self.request.user, denuncia=denuncia)

class RankingList(generics.ListAPIView):
    serializer_class = RankingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return User.objects.annotate(total_denuncias=Count('denuncias')).order_by('-total_denuncias')[:10]
    
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class CreateGestorView(generics.CreateAPIView):
    """ Cria um novo usuário já vinculado como Gestor Público """
    queryset = User.objects.all()
    serializer_class = GestorSerializer
    permission_classes = [AllowAny]

class GestorDetailView(generics.RetrieveUpdateDestroyAPIView):
    """ Permite ver, editar ou deletar um Gestor (Requer permissão de Admin ou do próprio) """
    queryset = User.objects.all()
    serializer_class = GestorSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return User.objects.filter(gestorpublico__isnull=False)
        return User.objects.filter(id=user.id)