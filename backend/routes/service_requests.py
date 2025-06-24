from flask import Blueprint, request, jsonify
from models import db, ServiceRequest

service_requests_bp = Blueprint('service_requests', __name__)

@service_requests_bp.route('/api/service-requests/app-development', methods=['POST'])
def app_development_request():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    phone = data.get('phone')
    plan = data.get('plan')
    message = data.get('message')
    if not all([name, email, phone, plan, message]):
        return jsonify({'success': False, 'error': 'All fields are required.'}), 400
    req = ServiceRequest(
        name=name,
        email=email,
        phone=phone,
        plan=plan,
        message=message,
        service_requested='App Development'
    )
    db.session.add(req)
    db.session.commit()
    return jsonify({'success': True})

@service_requests_bp.route('/api/service-requests', methods=['POST'])
def create_service_request():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    phone = data.get('phone')
    plan = data.get('plan')
    message = data.get('message')
    service_requested = data.get('service_requested')
    if not all([name, email, phone, plan, message, service_requested]):
        return jsonify({'success': False, 'error': 'All fields are required.'}), 400
    req = ServiceRequest(
        name=name,
        email=email,
        phone=phone,
        plan=plan,
        message=message,
        service_requested=service_requested
    )
    db.session.add(req)
    db.session.commit()
    return jsonify({'success': True})
