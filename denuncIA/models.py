from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Denuncia(models.Model):
    categoria = models.CharField(max_length=100)
    descricao = models.TextField()
    localizacao = models.CharField(max_length = 200)
    status = models.CharField(max_length = 10)
    foto = models.ImageField(upload_to="caminho_futuro/")
    autor = models.ForeignKey(User, on_delete=models.CASCADE, related_name="denuncias")
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.categoria