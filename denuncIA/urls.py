from django.urls import path
from . import views

urlpatterns = [
    path("denuncias/", views.CreateDenuncia.as_view(), name="denuncia-list"),
    path("denuncias/delete/<int:id>/", views.DeleteDenuncia.as_view(), name="delete-denuncia")
]