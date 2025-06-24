from flask import Blueprint, request, jsonify
from models import db, ContactMessage
import re

contact_bp = Blueprint('contact', __name__)

@contact_bp.route('/api/contact', methods=['POST'])
def contact():
    data = request.get_json()
    name = data.get('name', '').strip()
    email = data.get('email', '').strip()
    phone = data.get('phone', '').strip()
    message = data.get('message', '').strip()

    # Basic validation
    if not name or not email or not phone or not message:
        return jsonify({'success': False, 'error': 'All fields are required.'}), 400

    # Email format validation (simple)
    email_regex = r'^[^@\s]+@[^@\s]+\.[^@\s]+$'
    if not re.match(email_regex, email):
        return jsonify({'success': False, 'error': 'Invalid email address.'}), 400

    # Phone format validation (simple)
    phone_regex = r'^[0-9+\-\s()]+$'
    if not re.match(phone_regex, phone):
        return jsonify({'success': False, 'error': 'Invalid phone number.'}), 400

    try:
        contact_msg = ContactMessage(name=name, email=email, phone=phone, message=message)
        db.session.add(contact_msg)
        db.session.commit()
        return jsonify({'success': True}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': 'Database error. Please try again.'}), 500 