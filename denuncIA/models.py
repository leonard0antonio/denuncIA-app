from django.db import models
from django.contrib.auth.models import User

class Denuncia(models.Model): #model de denuncia
    STATUS_CHOICES = [
        ('Em análise', 'Em análise'),
        ('Resolvido', 'Resolvido'),
        ('Rejeitado', 'Rejeitado'),
    ]

    protocolo = models.UUIDField(primary_key=True, unique=True)
    categoria = models.CharField(max_length=100)
    descricao = models.TextField()
    latitude = models.DecimalField(max_digits=25, decimal_places=20)
    longitude = models.DecimalField(max_digits=25, decimal_places=20)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Em análise')
    autor = models.ForeignKey(User, on_delete=models.CASCADE, related_name="denuncias")
    created_at = models.DateTimeField(auto_now_add=True)
    
    foto = models.ImageField(upload_to='denuncias_fotos/', null=True, blank=True)
   
    def __str__(self):
        return f"{self.categoria} - {self.protocolo}"
     
class Comentario(models.Model): #model de comentario
    autor = models.ForeignKey(User, on_delete=models.CASCADE, related_name="comentarios_postados") #possui uma chave estrangeira atrelada ao usuario q comentou
    conteudoResposta = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    denuncia = models.ForeignKey(Denuncia, on_delete=models.CASCADE, related_name='comentarios') #chave estrangera da denuncia onde o comentario foi inserido
       
    def __str__(self):
        return self.conteudoResposta    
    
class GestorPublico(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE) #gestor publico recebe user
    cra_de_gestor = models.CharField(max_length=50) #campo extra
    
    def __str__(self):
        return f"Gestor: {self.user.username}"