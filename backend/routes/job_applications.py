from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os
from models import db, JobApplication

job_applications_bp = Blueprint('job_applications', __name__)

UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), '..', 'uploads')
ALLOWED_EXTENSIONS = {'pdf', 'doc', 'docx'}

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def allowed_file(filename):
    return filename and '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@job_applications_bp.route('/job_applications', methods=['POST'])
def submit_job_application():
    if 'cv' not in request.files:
        return jsonify({'error': 'CV file is required'}), 400
    cv = request.files['cv']
    if not cv or not cv.filename or not allowed_file(cv.filename):
        return jsonify({'error': 'Invalid CV file'}), 400
    filename = secure_filename(str(cv.filename))
    save_path = os.path.join(UPLOAD_FOLDER, filename)
    cv.save(save_path)

    data = request.form
    required_fields = ['name', 'email', 'phone', 'experience', 'mode', 'job_applied_for']
    for field in required_fields:
        if not data.get(field):
            return jsonify({'error': f'Missing required field: {field}'}), 400

    application = JobApplication(
        name=data.get('name'),
        email=data.get('email'),
        phone=data.get('phone'),
        experience=data.get('experience'),
        mode=data.get('mode'),
        message=data.get('message', ''),
        job_applied_for=data.get('job_applied_for'),
        cv_filename=filename
    )
    db.session.add(application)
    db.session.commit()
    return jsonify({'message': 'Application submitted successfully'}), 201 