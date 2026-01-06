from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'blogs', views.BlogViewSet)
router.register(r'projects', views.ProjectViewSet)
router.register(r'albums', views.AlbumViewSet)
router.register(r'photos', views.PhotoViewSet)
router.register(r'certificates', views.CertificateViewSet)
router.register(r'contacts', views.ContactViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('quote/', views.daily_quote, name='daily-quote'),
]
