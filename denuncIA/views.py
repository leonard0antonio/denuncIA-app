from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from django.shortcuts import get_object_or_404
from .serializers import UserSerializer, DenunciaSerializer, ComentarioSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Denuncia, Comentario


class GetDenuncia(generics.RetrieveAPIView):
    serializer_class = DenunciaSerializer
    permission_classes = [IsAuthenticated]

    lookup_field = 'protocolo'

    def get_queryset(self):
        user = self.request.user
        return Denuncia.objects.filter(autor=user)

class CreateDenuncia(generics.ListCreateAPIView):
    serializer_class = DenunciaSerializer
    permission_classes = [IsAuthenticated] #Apenas o usuario autenticado pode chamar essa rota (autenticação é feita pelo token jwt)

    def get_queryset(self):
        user = self.request.user #requisita o usuario que está fazendo a requisicao
        return Denuncia.objects.filter(autor=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(autor=self.request.user)
        else:
            print(serializer.erros)
    
class DeleteDenuncia(generics.DestroyAPIView):
    serializer_class = DenunciaSerializer
    permission_classes = [IsAuthenticated]
    
    lookup_field = 'protocolo'
    
    def get_queryset(self):
        user = self.request.user #requisita o usuario que está fazendo a requisicao
        return Denuncia.objects.filter(autor=user)
    
class UpdateDenuncia(generics.UpdateAPIView):
    serializer_class = DenunciaSerializer
    permission_classes = [IsAuthenticated]
    
    lookup_field = 'protocolo'

    def get_queryset(self):
        user = self.request.user #requisita o usuario que está fazendo a requisicao
        return Denuncia.objects.filter(autor=user)
    
class CreateComentario(generics.ListCreateAPIView):
    serializer_class = ComentarioSerializer
    permission_classes = [IsAuthenticated] 

    def get_queryset(self):
        denuncia_protocolo = self.kwargs.get('protocolo')
        return Comentario.objects.filter(denuncia__protocolo=denuncia_protocolo)
    
    def perform_create(self, serializer):
        denuncia_protocolo = self.kwargs.get('protocolo')
        denuncia= get_object_or_404(Denuncia, protocolo=denuncia_protocolo)
        if serializer.is_valid():
            serializer.save(autor=self.request.user,
                            denuncia=denuncia)
        else:
            print(serializer.erros)
    
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny] #qualquer pessoa pode cria um user





    