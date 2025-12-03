from django.urls import path
from . import views


#Urls da API, aqui é onde os metodos do CRUD são realizados de fato.
urlpatterns = [
    path("denuncias/", views.CreateDenuncia.as_view(), name="denuncia-list"),
    path("denuncias/<uuid:protocolo>/", views.GetDenuncia.as_view(), name="denuncia"),
    path("denuncias/delete/<uuid:protocolo>/", views.DeleteDenuncia.as_view(), name="delete-denuncia"),
    path("denuncias/edit/<uuid:protocolo>/", views.UpdateDenuncia.as_view(), name="update-denuncia"),
    path("denuncias/<uuid:protocolo>/comentarios/", views.CreateComentario.as_view(), name="comentario-list"),
]