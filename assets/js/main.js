// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeScrollEffects();

    // Handle Get In Touch form submission
    const serviceRequestForm = document.getElementById('serviceRequestForm');
    if (serviceRequestForm) {
        serviceRequestForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const name = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const phone = document.getElementById('contactPhone').value.trim();
            const message = document.getElementById('contactMessage').value.trim();
            if (!name || !email || !phone || !message) {
                alert('Please fill in all fields.');
                return;
            }
            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, phone, message })
                });
                const result = await response.json();
                if (result.success) {
                    alert('Thank you! Your request has been submitted.');
                    serviceRequestForm.reset();
                } else {
                    alert(result.error || 'An error occurred. Please try again.');
                }
            } catch (error) {
                alert('An error occurred. Please try again.');
            }
        });
    }

    // Load project cards
    loadProjects();

    // Add ripple effect to hero-section buttons
    addButtonRippleEffect();

    // Load partner images
    loadPartners();
});

// Scroll effects
function initializeScrollEffects() {
    const nav = document.querySelector('.floating-nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add/remove background based on scroll position
        if (currentScroll > 50) {
            nav.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            nav.style.background = 'rgba(0, 0, 0, 0.9)';
        }

        // Hide/show nav based on scroll direction
        if (currentScroll > lastScroll && currentScroll > 100) {
            nav.style.transform = 'translate(-50%, -100%)';
        } else {
            nav.style.transform = 'translate(-50%, 0)';
        }

        lastScroll = currentScroll;
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Only prevent default and handle scroll if href is not just "#"
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Dynamic Project Cards Fetch
function renderProjectCard(project) {
    return `
    <div class="project-card">
        <div class="project-image">
            <img src="${project.image_url}" alt="${project.name}" style="object-fit:cover;width:100%;height:100%;background:#000;" />
        </div>
        <div class="project-content">
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
            </div>
        </div>
    </div>
    `;
}

async function loadProjects() {
    const grid = document.querySelector('.projects-grid');
    if (!grid) return;
    try {
        const res = await fetch('http://127.0.0.1:5000/api/projects');
        const projects = await res.json();
        grid.innerHTML = projects.map(renderProjectCard).join('');
    } catch (e) {
        grid.innerHTML = '<p style="color:red">Failed to load projects.</p>';
    }
}

// Add ripple effect to hero-section buttons
function addButtonRippleEffect() {
    document.querySelectorAll('.cta-buttons .btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Remove any existing ripple
            const oldRipple = this.querySelector('.ripple');
            if (oldRipple) oldRipple.remove();
            // Create ripple
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Dynamic Partner Images Fetch
function renderPartnerCard(image) {
    return `
    <div class="partner-card">
        <div class="partner-logo">
            <img src="${image.url}" alt="${image.description || image.filename}">
        </div>
    </div>
    `;
}

async function loadPartners() {
    const partnersTrack = document.querySelector('.partners-track');
    if (!partnersTrack) return;
    try {
        const res = await fetch('http://127.0.0.1:5000/api/backend-images');
        const images = await res.json();
        partnersTrack.innerHTML = images.map(renderPartnerCard).join('');
    } catch (e) {
        partnersTrack.innerHTML = '<p style="color:red">Failed to load partners.</p>';
    }
}

// Export functions for use in other modules
window.naiyo24 = {
    initializeScrollEffects
};