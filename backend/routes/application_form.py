from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os
from models import db, ApplicationForm

application_form_bp = Blueprint('application_form', __name__)

UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'uploads')
ALLOWED_EXTENSIONS = {'pdf', 'doc', 'docx'}

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@application_form_bp.route('/apply', methods=['POST'])
def submit_application():
    data = request.form
    file = request.files.get('resume')
    if not file or not allowed_file(file.filename):
        return jsonify({'success': False, 'message': 'Invalid or missing resume file.'}), 400

    filename = secure_filename(file.filename)
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(file_path)
    rel_file_path = os.path.relpath(file_path, os.path.dirname(os.path.dirname(__file__)))

    try:
        application = ApplicationForm(
            full_name=data.get('fullName'),
            email_address=data.get('email'),
            phone_number=data.get('phone'),
            current_location=data.get('location'),
            years_of_experience=int(data.get('experience', 0)),
            current_ctc_lpa=float(data.get('currentCTC', 0)),
            expected_ctc_lpa=float(data.get('expectedCTC', 0)),
            notice_period_days=int(data.get('noticePeriod', 0)),
            resume_file=rel_file_path.replace('\\', '/'),
            portfolio_link=data.get('portfolio'),
            cover_letter=data.get('coverLetter'),
            terms_accepted=data.get('terms') == 'on',
        )
        db.session.add(application)
        db.session.commit()
        return jsonify({'success': True, 'message': 'Application submitted successfully.'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'message': str(e)}), 500
