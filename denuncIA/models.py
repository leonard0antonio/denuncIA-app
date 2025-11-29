from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Denuncia(models.Model):
    protocolo = models.UUIDField(primary_key=True, unique=True)
    categoria = models.CharField(max_length=100)
    descricao = models.TextField()
    latitude = models.DecimalField(max_digits=25, decimal_places=20)
    longitude = models.DecimalField(max_digits=25, decimal_places=20)
    status = models.CharField(max_length = 10)
    autor = models.ForeignKey(User, on_delete=models.CASCADE, related_name="denuncias")
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.categoria