from rest_framework import viewsets, status
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.utils import timezone
import random

from .models import Blog, Project, Album, Photo, Certificate, Contact, Quote
from .serializers import (
    BlogSerializer, ProjectSerializer, AlbumSerializer, 
    PhotoSerializer, CertificateSerializer, ContactSerializer, QuoteSerializer
)


# 📝 Blog ViewSet
class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured blogs for homepage"""
        featured = Blog.objects.filter(is_featured=True)[:3]
        serializer = self.get_serializer(featured, many=True)
        return Response(serializer.data)


# 🚀 Project ViewSet
class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured projects for homepage"""
        featured = Project.objects.filter(is_featured=True)[:3]
        serializer = self.get_serializer(featured, many=True)
        return Response(serializer.data)


# 📷 Album ViewSet (Admin can add/delete)
class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'destroy']:
            return [IsAuthenticated()]  # 🔐 Only admin can modify
        return [AllowAny()]


# 📷 Photo ViewSet (Admin can add/delete)
class PhotoViewSet(viewsets.ModelViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'destroy']:
            return [IsAuthenticated()]  # 🔐 Only admin can modify
        return [AllowAny()]


# 🏆 Certificate ViewSet
class CertificateViewSet(viewsets.ModelViewSet):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'destroy']:
            return [IsAuthenticated()]
        return [AllowAny()]


# 📧 Contact ViewSet
class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]  # Anyone can submit contact form
        return [IsAuthenticated()]  # Only admin can view submissions


# 💬 Get random daily quote
@api_view(['GET'])
def daily_quote(request):
    """Returns a random quote that changes daily"""
    quotes = Quote.objects.filter(is_active=True)
    if quotes.exists():
        # Use date as seed for consistent daily quote
        today = timezone.now().date()
        random.seed(today.toordinal())
        quote = random.choice(list(quotes))
        return Response(QuoteSerializer(quote).data)
    return Response({'text': 'Stay hungry, stay foolish.', 'author': 'Steve Jobs'})
