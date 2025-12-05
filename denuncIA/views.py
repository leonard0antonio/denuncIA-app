from django.contrib.auth.models import User
from django.db.models import Count, Q
from rest_framework import generics, status
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import (
    UserSerializer, DenunciaSerializer, ComentarioSerializer, 
    RankingSerializer, GestorSerializer, GestorTokenObtainPairSerializer
)
from .models import Denuncia, Comentario, GestorPublico

class GetDenuncia(generics.RetrieveAPIView):
    serializer_class = DenunciaSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'protocolo'
    
    def get_queryset(self):
        return Denuncia.objects.all()

class CreateDenuncia(generics.ListCreateAPIView):
    serializer_class = DenunciaSerializer
    permission_classes = [IsAuthenticated] 
    parser_classes = (MultiPartParser, FormParser)

    def get_queryset(self):
        user = self.request.user 
        if hasattr(user, 'profile_gestor') or user.is_staff:
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
        if hasattr(user, 'profile_gestor') or user.is_staff:
            return Denuncia.objects.all()
        return Denuncia.objects.filter(autor=user)
    
class UpdateDenuncia(generics.UpdateAPIView):
    serializer_class = DenunciaSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)
    lookup_field = 'protocolo'

    def get_queryset(self):
        user = self.request.user 
        if hasattr(user, 'profile_gestor') or user.is_staff:
            return Denuncia.objects.all()
        return Denuncia.objects.filter(autor=user)

    def perform_update(self, serializer):
        user = self.request.user
        
        if hasattr(user, 'profile_gestor') or user.is_staff:
            serializer.save(
                categoria=serializer.instance.categoria,
                descricao=serializer.instance.descricao,
                latitude=serializer.instance.latitude,
                longitude=serializer.instance.longitude,
                foto=serializer.instance.foto
            )
        else:
            serializer.save(status=serializer.instance.status)

class CreateComentario(generics.ListCreateAPIView):
    serializer_class = ComentarioSerializer
    permission_classes = [IsAuthenticated] 

    def get_queryset(self):
        denuncia_protocolo = self.kwargs.get('protocolo')
        return Comentario.objects.filter(denuncia__protocolo=denuncia_protocolo).order_by('created_at')
    
    def perform_create(self, serializer):
        denuncia_protocolo = self.kwargs.get('protocolo')
        denuncia = get_object_or_404(Denuncia, protocolo=denuncia_protocolo)
        serializer.save(autor=self.request.user, denuncia=denuncia)

class RankingList(generics.ListAPIView):
    serializer_class = RankingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return User.objects.annotate(
            total_denuncias=Count('denuncias', filter=Q(denuncias__status__in=['Em análise', 'Resolvido']))
        ).order_by('-total_denuncias')[:10]

class DenunciasAgrupadasView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        reports = Denuncia.objects.all()
        clusters = []
        THRESHOLD = 0.09 

        for report in reports:
            added = False
            for cluster in clusters:
                center = cluster['reports'][0]
                d_lat = abs(report.latitude - center.latitude)
                d_lon = abs(report.longitude - center.longitude)
                
                if d_lat < THRESHOLD and d_lon < THRESHOLD:
                    cluster['reports'].append(report)
                    added = True
                    break
            if not added:
                clusters.append({'reports': [report]})

        data = []
        for i, cluster in enumerate(clusters):
            serialized_reports = DenunciaSerializer(cluster['reports'], many=True).data
            data.append({
                "cluster_id": i + 1,
                "count": len(cluster['reports']),
                "center_lat": cluster['reports'][0].latitude,
                "center_lon": cluster['reports'][0].longitude,
                "reports": serialized_reports
            })
        return Response(data)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
class CreateGestorPublicoView(generics.CreateAPIView):
    queryset = GestorPublico.objects.all()
    serializer_class = GestorSerializer
    permission_classes = [AllowAny]

class GestorTokenObtainView(generics.GenericAPIView):
    serializer_class = GestorTokenObtainPairSerializer
    permission_classes = [AllowAny]
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)
    
class GestorDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = GestorSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return User.objects.filter(profile_gestor__isnull=False)
        return User.objects.filter(id=user.id)