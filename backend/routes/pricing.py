from flask import Blueprint, jsonify
import re
from models import (
    AppDevPricing, WebDevPricing, ServersHostingPricing, CompanyIncorporationPricing,
    DomainRegistrationPricing, LogoBrandingPricing, MarketingPricing, BusinessSolutionPricing,
    MarketResearchPricing, ProfessionalEmailPricing, SEOPricing
)

pricing_bp = Blueprint('pricing', __name__)

# Map service name in URL to model
SERVICE_MODEL_MAP = {
    'app_dev': AppDevPricing,
    'web_dev': WebDevPricing,
    'servers_hosting_service': ServersHostingPricing,
    'company_incorporation': CompanyIncorporationPricing,
    'domain_registration': DomainRegistrationPricing,
    'logo_branding': LogoBrandingPricing,
    'marketing': MarketingPricing,
    'business_solutions': BusinessSolutionPricing,
    'market_research': MarketResearchPricing,
    'pro-email': ProfessionalEmailPricing,
    'seo': SEOPricing,
}

@pricing_bp.route('/api/pricing/<service>', methods=['GET'])
def get_pricing(service):
    model = SERVICE_MODEL_MAP.get(service)
    if not model:
        return jsonify({'error': 'Invalid service'}), 404
    plans = model.query.all()
    result = []
    for plan in plans:
        result.append({
            'id': plan.id,
            'plan': plan.plan,
            'price': plan.price,
            'features': re.split(r',|\\n', plan.features) if plan.features else [],
            'description': plan.description or ''
        })
    return jsonify(result)
