from flask import Blueprint, jsonify
from models import db, Job

jobs_bp = Blueprint('jobs', __name__)

@jobs_bp.route('/jobs', methods=['GET'])
def get_jobs():
    jobs = Job.query.order_by(Job.created_at.desc()).all()
    result = []
    for job in jobs:
        result.append({
            'id': job.id,
            'job_name': job.job_name,
            'category': job.category,
            'required_skills': job.required_skills,
            'title': job.title,
            'location': job.location,
            'experience': job.experience,
            'start_date': job.start_date,
            'description': job.description,
            'created_at': job.created_at.isoformat() if job.created_at else None
        })
    return jsonify(result) 