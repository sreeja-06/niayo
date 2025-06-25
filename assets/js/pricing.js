// Helper: Map page path to service key used in API
const serviceMap = {
    'app-development.html': 'app_dev',
    'web-development.html': 'web_dev',
    'servers-hosting.html': 'servers_hosting',  // matches backend key exactly
    'professional-email.html': 'pro_email',           // matches backend key
    'domain-registration.html': 'domain_registration',
    'logo-branding.html': 'logo_branding',
    'marketing.html': 'marketing',
    'business-solution.html': 'business_solutions',
    'market-research.html': 'market_research',
    'company-incorporation.html': 'company_incorporation',
    'seo.html': 'seo'
};

function getServiceKey() {
    const path = window.location.pathname;
    const page = path.substring(path.lastIndexOf('/') + 1);
    const service = serviceMap[page];
    console.log('Current page:', page, 'Service key:', service); // Debug log
    return service || null;
}

const BACKEND_URL = "http://localhost:5000"; // or your Flask backend URL

async function loadPricing() {
    const service = getServiceKey();
    if (!service) {
        console.error('No service mapping found for current page');
        return;
    }

    try {
        // Fetch pricing data from backend
        console.log('Fetching pricing data for service:', service); // Debug log
        const res = await fetch(`${BACKEND_URL}/api/pricing/${service}`);
        if (!res.ok) {
            throw new Error(`Failed to fetch pricing data: ${res.status}`);
        }
        const data = await res.json();
        console.log('Received pricing data:', data); // Debug log

        // Find the pricing section
        const container = document.querySelector('.pricing-section');
        if (!container) {
            throw new Error('Pricing section not found in page');
        }

        // Render pricing data into the template
        renderPricingData(data);
    } catch (error) {
        console.error('Error loading pricing data:', error);
    }
}

function normalizePlanName(plan, service) {
    // Special mapping for market research
    if (service === 'market_research') {
        if (plan.toLowerCase() === 'starter') return 'Basic';
        if (plan.toLowerCase() === 'growth') return 'Professional';
    }
    return plan;
}

function renderPricingData(plans) {
    const service = getServiceKey();
    const planOrder = ['Basic', 'Professional', 'Enterprise'];
    const cards = document.querySelectorAll('.pricing-section .pricing-card');
    planOrder.forEach((planName, idx) => {
        const plan = plans.find(p => normalizePlanName(p.plan, service).toLowerCase() === planName.toLowerCase());
        if (!plan || !cards[idx]) return;
        // Set plan name
        const h3 = cards[idx].querySelector('h3');
        if (h3) h3.textContent = planName;
        // Set price and period
        const priceSpan = cards[idx].querySelector('.price');
        const periodSpan = cards[idx].querySelector('.period');
        if (priceSpan) priceSpan.textContent = plan.price;
        if (periodSpan) {
            if (plan.price.toLowerCase().includes('custom')) {
                periodSpan.textContent = '/month';
            } else {
                periodSpan.textContent = plan.price.includes('/') ? plan.price.split('/')[1] : '';
            }
        }
        // Set description
        const desc = cards[idx].querySelector('.pricing-description');
        if (desc) desc.textContent = plan.description;
        // Set features: only update text, preserve icons and li structure
        const featuresList = cards[idx].querySelector('.pricing-features ul');
        if (featuresList) {
            const lis = featuresList.querySelectorAll('li');
            let features = plan.features.filter(f => f.trim() !== '');
            lis.forEach((li, i) => {
                // Only update the text node after the icon
                const icon = li.querySelector('i');
                // Remove all text nodes after the icon
                while (icon && icon.nextSibling) {
                    icon.parentNode.removeChild(icon.nextSibling);
                }
                if (features[i]) {
                    // Add a space and the feature text
                    icon.insertAdjacentText('afterend', ' ' + features[i].trim());
                }
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', loadPricing);
console.log('pricing.js loaded');
