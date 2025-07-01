from flask import Blueprint, request, jsonify, current_app, send_from_directory
from werkzeug.utils import secure_filename
import os
from models import db, BackendImage

backend_images_bp = Blueprint('backend_images', __name__)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@backend_images_bp.route('/api/backend-images', methods=['POST'])
def upload_backend_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image part in the request'}), 400
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(str(file.filename))
        upload_folder = current_app.config['UPLOAD_FOLDER']
        os.makedirs(upload_folder, exist_ok=True)
        file.save(os.path.join(upload_folder, filename))
        url = f'/api/backend-images/{filename}'
        description = request.form.get('description', '')
        image = BackendImage(filename, url, description)
        db.session.add(image)
        db.session.commit()
        return jsonify({'message': 'Image uploaded successfully', 'image': {'id': image.id, 'filename': filename, 'url': url, 'description': description}}), 201
    else:
        return jsonify({'error': 'Invalid file type'}), 400

@backend_images_bp.route('/api/backend-images', methods=['GET'])
def get_backend_images():
    images = BackendImage.query.all()
    result = [{'id': img.id, 'filename': img.filename, 'url': img.url, 'description': img.description} for img in images]
    return jsonify(result)

@backend_images_bp.route('/api/backend-images/<filename>', methods=['GET'])
def serve_backend_image(filename):
    upload_folder = current_app.config['UPLOAD_FOLDER']
    return send_from_directory(upload_folder, filename) 