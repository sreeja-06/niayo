from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class ContactMessage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(30), nullable=False)
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())


class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    tags = db.Column(db.String(255), nullable=False)  # Comma-separated tags
    created_at = db.Column(db.DateTime, server_default=db.func.now())


class ServiceRequest(db.Model):
    __tablename__ = 'service_requests'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(30), nullable=False)
    plan = db.Column(db.String(30), nullable=False)
    message = db.Column(db.Text, nullable=False)
    service_requested = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())


# Pricing models for each service (all share the same schema)
class AppDevPricing(db.Model):
    __tablename__ = 'app_dev'
    id = db.Column(db.Integer, primary_key=True)
    plan = db.Column(db.String(50), nullable=False)
    price = db.Column(db.String(50), nullable=False)
    features = db.Column(db.Text, nullable=False)  # Comma-separated
    description = db.Column(db.Text, nullable=True)


class WebDevPricing(db.Model):
    __tablename__ = 'web_dev'
    id = db.Column(db.Integer, primary_key=True)
    plan = db.Column(db.String(50), nullable=False)
    price = db.Column(db.String(50), nullable=False)
    features = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text, nullable=True)


class ServersHostingPricing(db.Model):
    __tablename__ = 'servers_hosting'
    id = db.Column(db.Integer, primary_key=True)
    plan = db.Column(db.String(50), nullable=False)
    price = db.Column(db.String(50), nullable=False)
    features = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text, nullable=True)


class CompanyIncorporationPricing(db.Model):
    __tablename__ = 'company_incorporation'
    id = db.Column(db.Integer, primary_key=True)
    plan = db.Column(db.String(50), nullable=False)
    price = db.Column(db.String(50), nullable=False)
    features = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text, nullable=True)


class DomainRegistrationPricing(db.Model):
    __tablename__ = 'domain_registration'
    id = db.Column(db.Integer, primary_key=True)
    plan = db.Column(db.String(50), nullable=False)
    price = db.Column(db.String(50), nullable=False)
    features = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text, nullable=True)


class LogoBrandingPricing(db.Model):
    __tablename__ = 'logo_branding'
    id = db.Column(db.Integer, primary_key=True)
    plan = db.Column(db.String(50), nullable=False)
    price = db.Column(db.String(50), nullable=False)
    features = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text, nullable=True)


class MarketingPricing(db.Model):
    __tablename__ = 'marketing'
    id = db.Column(db.Integer, primary_key=True)
    plan = db.Column(db.String(50), nullable=False)
    price = db.Column(db.String(50), nullable=False)
    features = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text, nullable=True)


class BusinessSolutionPricing(db.Model):
    __tablename__ = 'business_solutions'
    id = db.Column(db.Integer, primary_key=True)
    plan = db.Column(db.String(50), nullable=False)
    price = db.Column(db.String(50), nullable=False)
    features = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text, nullable=True)


class MarketResearchPricing(db.Model):
    __tablename__ = 'market_research'
    id = db.Column(db.Integer, primary_key=True)
    plan = db.Column(db.String(50), nullable=False)
    price = db.Column(db.String(50), nullable=False)
    features = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text, nullable=True)


class ProfessionalEmailPricing(db.Model):
    __tablename__ = 'pro_email'
    id = db.Column(db.Integer, primary_key=True)
    plan = db.Column(db.String(50), nullable=False)
    price = db.Column(db.String(50), nullable=False)
    features = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text, nullable=True)


class SEOPricing(db.Model):
    __tablename__ = 'seo'
    id = db.Column(db.Integer, primary_key=True)
    plan = db.Column(db.String(50), nullable=False)
    price = db.Column(db.String(50), nullable=False)
    features = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text, nullable=True)



class BackendImage(db.Model):
    __tablename__ = 'backend_images'
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(255), nullable=False)
    url = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)

    def __init__(self, filename, url, description=None):
        self.filename = filename
        self.url = url
        self.description = description


class Job(db.Model):
    __tablename__ = 'jobs'
    id = db.Column(db.Integer, primary_key=True)
    job_name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(50), nullable=False)  # 'Job' or 'Internship'
    required_skills = db.Column(db.Text, nullable=False)  # Comma-separated or JSON
    title = db.Column(db.String(150), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    experience = db.Column(db.String(50), nullable=False)
    start_date = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())


class JobApplication(db.Model):
    __tablename__ = 'job_applications'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(30), nullable=False)
    experience = db.Column(db.String(50), nullable=False)
    mode = db.Column(db.String(30), nullable=False)
    message = db.Column(db.Text, nullable=True)
    job_applied_for = db.Column(db.String(100), nullable=False)
    cv_filename = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
