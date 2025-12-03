"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from denuncIA.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

#Urls para gerar Tokens JWT (tokens de acesso e de atualização), essas urls não são acessadas manualmente, mas sim 
urlpatterns = [
    path('admin/', admin.site.urls),
    path("denuncia/user/register/", CreateUserView.as_view(), name="cadastro"), #url responsavel pelo cadastro dos usuarios, recebendo a createUserView
    path("denuncia/token/", TokenObtainPairView.as_view(), name="get_token"), #url q permite receber o token do usuario, verifique ' frontend\src\pages\loginRegister\Login.tsx ' em caso de duvida
    path("denuncia/token/refresh", TokenRefreshView.as_view(), name="refresh_token"), #url q gera o token de refresh, assim que o token de acesso vencer (a cada 30 min)
    path("api-auth/", include("rest_framework.urls")), # urls do rest framework, recomendo buscar na internet  oque isso faz!
    path("api/", include("denuncIA.urls")), # urls da api
    
]
