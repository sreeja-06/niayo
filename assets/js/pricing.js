// Helper: Map page path to service key used in API
const serviceMap = {
    'app-development.html': 'app_dev',
    'web-development.html': 'web_dev',
    'servers-hosting.html': 'servers_hosting_service',
    'company-incorporation.html': 'company_incorporation',
    'domain-registration.html': 'domain_registration',
    'logo-branding.html': 'logo_branding',
    'marketing.html': 'marketing',
    'business-solution.html': 'business_solutions',
    'market-research.html': 'market_research',
    'professional-email.html': 'pro_email',
    'seo.html': 'seo',
};

function getServiceKey() {
    const path = window.location.pathname;
    const page = path.substring(path.lastIndexOf('/') + 1);
    return serviceMap[page] || null;
}

const BACKEND_URL = "http://localhost:5000"; // or your Flask backend URL

async function loadPricing() {
    const service = getServiceKey();
    if (!service) return;
    // Fetch pricing data from backend
    const res = await fetch(`${BACKEND_URL}/api/pricing/${service}`);
    if (!res.ok) {
        console.error('Failed to fetch pricing data');
        return;
    }
    const data = await res.json();
    // Fetch the pricing template (from your static server)
    //const templateRes = await fetch('services/${service}');
    //if (!templateRes.ok) return;
    //const templateHtml = await templateRes.text();
    //// Insert the template into the container
    //const container = document.getElementById('pricing-section');
    //if (!container) return;
    //container.innerHTML = templateHtml;
    //// Render pricing data into the template
    renderPricingData(data);
}

function renderPricingData(plans) {
    // Ensure plans are mapped to cards by plan name
    const planOrder = ['Basic', 'Professional', 'Enterprise'];
    const cards = document.querySelectorAll('#pricing-section .pricing-card');
    planOrder.forEach((planName, idx) => {
        const plan = plans.find(p => p.plan.toLowerCase() === planName.toLowerCase());
        if (!plan || !cards[idx]) return;
        // Set plan name
        const h3 = cards[idx].querySelector('h3');
        if (h3) h3.textContent = plan.plan;
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
        // Set features (max 7, fill with disabled if less)
        const featuresList = cards[idx].querySelector('.pricing-features ul');
        if (featuresList) {
            featuresList.innerHTML = '';
            let features = plan.features.filter(f => f.trim() !== '');
            for (let i = 0; i < 7; i++) {
                const li = document.createElement('li');
                if (features[i]) {
                    li.innerHTML = `<i class='fas fa-check'></i> ${features[i].trim()}`;
                } else {
                    li.classList.add('disabled');
                    li.innerHTML = `<i class='fas fa-times'></i>`;
                }
                featuresList.appendChild(li);
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', loadPricing);
console.log('pricing.js loaded');
