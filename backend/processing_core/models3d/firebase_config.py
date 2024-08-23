# backend/firebase_config.py
import firebase_admin
from firebase_admin import credentials, storage
import os
file_path = 'D:/Desktop/3DProcessnewver/3d_processing_app/backend/dprocessing-9d736-firebase-adminsdk-6i4nn-d1789de6d9.json'

if os.path.exists(file_path):
    print("File exists.")
else:
    print("File does not exist.")
# Initialize Firebase app only if it hasn't been initialized yet
def initialize_firebase():
    if not firebase_admin._apps:  # Check if Firebase apps have already been initialized
        cred = credentials.Certificate('D:/Téléchargements/dprocessing-9d736-firebase-adminsdk-6i4nn-d1789de6d9.json')
        
        firebase_admin.initialize_app(cred, {
            'storageBucket': 'dprocessing-9d736.appspot.com'
        })
        
    return firebase_admin.get_app()


# Initialize Firebase app
app = initialize_firebase()
bucket = storage.bucket()
