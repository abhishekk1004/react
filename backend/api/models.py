from django.db import models

# 📝 Blog Model
class Blog(models.Model):
    title = models.CharField(max_length=200)
    excerpt = models.TextField(max_length=300)
    content = models.TextField()
    image = models.ImageField(upload_to='blogs/')  # 🖼️ Blog cover image
    category = models.CharField(max_length=50)
    read_time = models.CharField(max_length=20, default="5 min read")
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title


# 🚀 Project Model
class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='projects/')  # 🖼️ Project thumbnail
    technologies = models.JSONField(default=list)  # ["Python", "Django", "React"]
    github_url = models.URLField(blank=True)
    live_url = models.URLField(blank=True)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title


# 📷 Photography Album Model
class Album(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    cover_image = models.ImageField(upload_to='albums/')  # 🖼️ Album cover
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


# 📷 Photo Model (belongs to Album)
class Photo(models.Model):
    album = models.ForeignKey(Album, related_name='photos', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='photos/')  # 🖼️ Photo file
    caption = models.CharField(max_length=200, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.album.name} - {self.caption or 'Photo'}"


# 🏆 Certificate Model
class Certificate(models.Model):
    CERT_TYPES = [
        ('badge', 'Badge'),
        ('certificate', 'Certificate'),
    ]
    title = models.CharField(max_length=200)
    issuer = models.CharField(max_length=100)
    cert_type = models.CharField(max_length=20, choices=CERT_TYPES)
    image = models.ImageField(upload_to='certificates/')  # 🖼️ Certificate image
    credential_url = models.URLField(blank=True)  # For online badges
    issue_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-issue_date']

    def __str__(self):
        return self.title


# 📧 Contact Form Submissions
class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    message = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-submitted_at']

    def __str__(self):
        return f"{self.name} - {self.email}"


# 💬 Daily Quotes
class Quote(models.Model):
    text = models.TextField()
    author = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.author}: {self.text[:50]}..."
