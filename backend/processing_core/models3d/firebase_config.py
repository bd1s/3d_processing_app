import firebase_admin
from firebase_admin import credentials, storage
import os

# Chemin du fichier de clé JSON - utilisez une variable d'environnement ou un chemin relatif pour plus de flexibilité
file_path = os.getenv('FIREBASE_CREDENTIALS_PATH', 'C:/3d_processing_app/backend/dprocessing-9d736-firebase-adminsdk-6i4nn-d1789de6d9.json')

if os.path.exists(file_path):
    print("File exists.")
else:
    raise FileNotFoundError(f"Firebase credentials file not found at: {file_path}")

# Initialiser Firebase app uniquement si elle n'est pas déjà initialisée
def initialize_firebase():
    if not firebase_admin._apps:  # Vérifie si les applications Firebase ont déjà été initialisées
        try:
            cred = credentials.Certificate(file_path)
            firebase_admin.initialize_app(cred, {
                'storageBucket': 'dprocessing-9d736.appspot.com'
            })
            print("Firebase app initialized successfully.")
        except Exception as e:
            print(f"Error initializing Firebase: {e}")
            raise
    return firebase_admin.get_app()

# Initialiser Firebase app
app = initialize_firebase()
bucket = storage.bucket()

# Debugging information
print(f"Firebase bucket name: {bucket.name}")
print("Bucket details:")
try:
    # List a few files in the bucket to ensure it is accessible
    blobs = bucket.list_blobs(max_results=5)  # List up to 5 files
    print("Files in bucket:")
    for blob in blobs:
        print(f" - {blob.name}")
except Exception as e:
    print(f"Error listing bucket files: {e}")