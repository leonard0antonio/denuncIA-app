from django.contrib import admin
from django.urls import path, include
from denuncIA.views import CreateUserView, GestorTokenObtainView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path("denuncia/user/register/", CreateUserView.as_view(), name="cadastro"),
    path("denuncia/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("denuncia/token/gestor/", GestorTokenObtainView.as_view(), name='token_obtain_pair_gestor'),
    path("denuncia/token/refresh/", TokenRefreshView.as_view(), name="refresh_token"),
    
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include("denuncIA.urls")), 
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)