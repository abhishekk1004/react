from rest_framework import serializers
from .models import Blog, Project, Album, Photo, Certificate, Contact, Quote


class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = '__all__'


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = '__all__'


class AlbumSerializer(serializers.ModelSerializer):
    photos = PhotoSerializer(many=True, read_only=True)
    photo_count = serializers.SerializerMethodField()

    class Meta:
        model = Album
        fields = '__all__'

    def get_photo_count(self, obj):
        return obj.photos.count()


class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = '__all__'


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'


class QuoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quote
        fields = '__all__'
