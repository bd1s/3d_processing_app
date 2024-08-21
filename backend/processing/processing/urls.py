from django.contrib import admin
from django.urls import path
from models3d.views import Simplify3DView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('simplify/', Simplify3DView.as_view(), name='simplify_3d'),
]
