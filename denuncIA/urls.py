from django.urls import path
from . import views

urlpatterns = [
    path("denuncias/", views.CreateDenuncia.as_view(), name="denuncia-list"),
    path("denuncias/<uuid:protocolo>/", views.GetDenuncia.as_view(), name="denuncia"),
    path("denuncias/delete/<uuid:protocolo>/", views.DeleteDenuncia.as_view(), name="delete-denuncia"),
    path("denuncias/edit/<uuid:protocolo>/", views.UpdateDenuncia.as_view(), name="update-denuncia"),
]