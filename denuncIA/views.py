from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, DenunciaSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Denuncia


class CreateDenuncia(generics.ListAPIView):
    serializer_class = DenunciaSerializer
    permission_classes = [IsAuthenticated] #Apenas o usuario autenticado pode chamar essa rota (autenticação é feita pelo token jwt)

    def get_queryset(self):
        user = self.request.user #requisita o usuario que está fazendo a requisicao
        return Denuncia.objects.all
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(autor=self.request.user)
        else:
            print(serializer.erros)
    
class DeleteDenuncia(generics.DestroyAPIView):
    serializer_class = DenunciaSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user #requisita o usuario que está fazendo a requisicao
        return Denuncia.objects.filter(autor=user)
    
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny] #qualquer pessoa pode cria um user
