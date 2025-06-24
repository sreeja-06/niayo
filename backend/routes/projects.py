from flask import Blueprint, jsonify
from models import db, Project

projects_bp = Blueprint('projects', __name__)

@projects_bp.route('/api/projects', methods=['GET'])
def get_projects():
    projects = Project.query.order_by(Project.created_at.desc()).all()
    result = []
    for project in projects:
        result.append({
            'id': project.id,
            'name': project.name,
            'description': project.description,
            'image_url': project.image_url,
            'tags': project.tags.split(',') if project.tags else []
        })
    return jsonify(result)
