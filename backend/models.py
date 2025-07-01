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


class ApplicationForm(db.Model):
    __tablename__ = 'application_form'
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(255), nullable=False)
    email_address = db.Column(db.String(255), nullable=False)
    phone_number = db.Column(db.String(30), nullable=False)
    current_location = db.Column(db.String(255), nullable=False)
    years_of_experience = db.Column(db.Integer, nullable=False)
    current_ctc_lpa = db.Column(db.Numeric(10, 2), nullable=False)
    expected_ctc_lpa = db.Column(db.Numeric(10, 2), nullable=False)
    notice_period_days = db.Column(db.Integer, nullable=False)
    resume_file = db.Column(db.String(255), nullable=False)
    portfolio_link = db.Column(db.String(255), nullable=True)
    cover_letter = db.Column(db.Text, nullable=True)
    terms_accepted = db.Column(db.Boolean, nullable=False)
