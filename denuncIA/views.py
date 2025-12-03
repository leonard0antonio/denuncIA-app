from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth import get_permission_codename
from rest_framework import generics
from django.shortcuts import get_object_or_404
from .serializers import UserSerializer, DenunciaSerializer, ComentarioSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Denuncia, Comentario


#Estamos utilizando o rest framework para construir as views (pois facilita bastante!)

class GetDenuncia(generics.RetrieveAPIView):
    serializer_class = DenunciaSerializer #chama o serializer 
    permission_classes = [IsAuthenticated] #só pode fazer o get se o usuario estiver logado (autenticado)

    lookup_field = 'protocolo' #busca pelo campo protocolo 
    

    def get_queryset(self):
        user = self.request.user #requisita o usuario que está fazendo a requisicao
        
        
        #TODO: PERMITIR QUE USUÁRIO QUE SÃO GESTORES PUBLICOS POSSAM ACESSAR TODAS AS DENUNCIAS FEITAS 
    #    view_perm_codename = get_permission_codename('view', self.queryset.model._meta)

    #    if user.has_perm(view_perm_codename){
     #       return Denuncia.object.all()
      #  }
        return Denuncia.objects.filter(autor=user) #retorna as denuncias (objetos) realizadas apenas pelo usuario

class CreateDenuncia(generics.ListCreateAPIView):
    serializer_class = DenunciaSerializer
    permission_classes = [IsAuthenticated] #Apenas o usuario autenticado pode chamar essa rota (autenticação é feita pelo token jwt)

    def get_queryset(self):
        user = self.request.user #requisita o usuario que está fazendo a requisicao
        return Denuncia.objects.filter(autor=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid(): #Caso o serializer passar, ou seja, se todos os campos forem preenchidos corretamente ele irá salvar
            serializer.save(autor=self.request.user) #aqui ele salva no usuario
        else:
            print(serializer.erros)
    
class DeleteDenuncia(generics.DestroyAPIView):
    serializer_class = DenunciaSerializer
    permission_classes = [IsAuthenticated]
    
    lookup_field = 'protocolo'
    
    def get_queryset(self):
        user = self.request.user #requisita o usuario que está fazendo a requisicao
        return Denuncia.objects.filter(autor=user)
    
    #Já que estamos utilizando o rest framework, com as informações acima ele já consegue deletar a denuncia do banco automaticamente
    #bom demais
    
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
        denuncia_protocolo = self.kwargs.get('protocolo') #obtem o path, que no caso é o protocolo
        return Comentario.objects.filter(denuncia__protocolo=denuncia_protocolo) 
    
    def perform_create(self, serializer):
        denuncia_protocolo = self.kwargs.get('protocolo')
        denuncia = get_object_or_404(Denuncia, protocolo=denuncia_protocolo)
        if serializer.is_valid():
            serializer.save(autor=self.request.user,
                            denuncia=denuncia)
        else:
            print(serializer.erros)
    
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny] #qualquer pessoa pode cria um user





    