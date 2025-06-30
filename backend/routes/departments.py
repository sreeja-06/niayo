from flask import Blueprint, jsonify
from flask.cli import load_dotenv
from models import db
from sqlalchemy import text

load_dotenv()
departments_bp = Blueprint('departments', __name__)

@departments_bp.route('/api/departments/fulltime')
def get_fulltime_departments():
    result = db.session.execute(text('SELECT * FROM public.departments_fulltime'))
    jobs = [dict(row) for row in result.mappings()]
    return jsonify(jobs)

@departments_bp.route('/api/departments/internship')
def get_internship_departments():
    result = db.session.execute(text('SELECT * FROM public.departments_internship'))
    jobs = [dict(row) for row in result.mappings()]
    return jsonify(jobs)
