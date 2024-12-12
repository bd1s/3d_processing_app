
# from django.urls import path
# from processing_core.models3d.views import label_3d_model
# from processing_core.models3d.views import Simplify3DView

# urlpatterns = [
#     path('api/load-model/', label_3d_model, name='label_3d_model'),
#     path('api/simplify3d/', Simplify3DView.as_view(), name='simplify_3d_model'),

# ]


from django.urls import path
from processing_core.models3d.views import label_3d_model
from processing_core.models3d.views import simplify_3d_model

urlpatterns = [
    path('simplify/', simplify_3d_model, name='simplify_3d_model'),
    path('label/', label_3d_model, name='label_3d_model'),
]
