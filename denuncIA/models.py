from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Denuncia(models.Model): #model de denuncia
    protocolo = models.UUIDField(primary_key=True, unique=True)
    categoria = models.CharField(max_length=100)
    descricao = models.TextField()
    latitude = models.DecimalField(max_digits=25, decimal_places=20)
    longitude = models.DecimalField(max_digits=25, decimal_places=20)
    status = models.CharField(max_length = 10)
    autor = models.ForeignKey(User, on_delete=models.CASCADE, related_name="denuncias")
    created_at = models.DateTimeField(auto_now_add=True)
   #TODO: COLOCAR UM CAMPO DE IMAGEM! retirei pois estava com problemas em trazer a imagem do front para o back
   
    def __str__(self):
        return self.categoria    
     
class Comentario(models.Model): #model de comentario
    autor = models.ForeignKey(User, on_delete=models.CASCADE, related_name="comentarios_postados") #possui uma chave estrangeira atrelada ao usuario q comentou, que pega basicamente o usuario que estava logado qnd realizou o comentario
    conteudoResposta = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    denuncia = models.ForeignKey(Denuncia, on_delete=models.CASCADE, related_name='comentarios') #chave estrangera da denuncia onde o comentario foi inserido
       
    def __str__(self):
        return self.conteudoResposta    
    
class GestorPublico(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE) #gestor publico recebe user, entretanto, como queremos adicioanr um campo extra, que nao faz parte do User padrão do django, devemos criar essa classe
    cra_de_gestor = models.CharField(max_length=50) #campo extra ao qual eu me refiro
    

#Notem q não há class User, pois estamos utilizando o User que o proprio django ja fornece, entao meio q por tras dos panos existe ja uma model User
