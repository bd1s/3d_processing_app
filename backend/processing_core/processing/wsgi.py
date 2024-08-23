"""
WSGI config for processing_core project.

It exposes the WSGI callable as a module-level variable named `application`.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/wsgi/
"""

import os
from django.core.wsgi import get_wsgi_application

# Met à jour le nom du module settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'processing_core.processing.settings')

application = get_wsgi_application()