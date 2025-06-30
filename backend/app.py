import os
from flask import Flask, send_from_directory
from config import Config
from models import db, ContactMessage
from dotenv import load_dotenv
from routes.contact import contact_bp
from routes.projects import projects_bp
from routes.service_requests import service_requests_bp
from routes.pricing import pricing_bp
from routes.departments import departments_bp
from flask_cors import CORS

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)

db.init_app(app)

app.register_blueprint(contact_bp)
app.register_blueprint(projects_bp)
app.register_blueprint(service_requests_bp)
app.register_blueprint(pricing_bp)
app.register_blueprint(departments_bp)

@app.route('/')
def home():
    return 'Naiyo24 Flask Backend is running!'

@app.route('/<path:path>')
def static_proxy(path):
    return send_from_directory('../', path)

if __name__ == '__main__':
    app.run(debug=True)

# Create tables if running as main
from models import db
with app.app_context():
    db.create_all()