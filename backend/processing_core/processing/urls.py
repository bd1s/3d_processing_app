# backend/processing_core/processing/urls.py

from django.urls import path
from django.contrib import admin
from processing_core.models3d import views  # Use absolute import

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/simplify3d/', views.simplify_3d_model, name='simplify_3d_model'),
]



