# from django.contrib import admin
# from django.urls import path
# from models3d.views import Simplify3DView

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('simplify/', Simplify3DView.as_view(), name='simplify_3d'),
# ]



from django.urls import path
from django.contrib import admin
from processing_core.models3d.views import simplify_3d_model  # Importation directe de la vue

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/simplify3d/', simplify_3d_model, name='simplify_3d_model'),
]