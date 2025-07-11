import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgresql://postgres:2004@localhost/company_website')
    PORT = 5501
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    FLASK_ENV = os.getenv('FLASK_ENV', 'production') 
    UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'uploads') 