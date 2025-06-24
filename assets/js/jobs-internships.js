// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initializeAnimations();
    
    // Initialize filter functionality
    initializeFilters();
    
    // Initialize modal functionality
    initializeModals();
});

// Animation initialization
function initializeAnimations() {
    // Animate career cards with staggered delay
    const cards = document.querySelectorAll('.career-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all career cards
    cards.forEach(card => observer.observe(card));
}

// Filter functionality
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const careerCards = document.querySelectorAll('.career-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');
            
            // Animate cards out
            careerCards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
            });

            // After animation, filter and animate cards back in
            setTimeout(() => {
                careerCards.forEach((card, index) => {
                    if (filter === 'all' || card.getAttribute('data-type') === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100);
                    } else {
                        card.style.display = 'none';
                    }
                });
            }, 300);
        });
    });
}

// Modal functionality
function initializeModals() {
    // Create modal container if it doesn't exist
    if (!document.querySelector('.modal-container')) {
        const modalContainer = document.createElement('div');
        modalContainer.className = 'modal-container';
        document.body.appendChild(modalContainer);
    }

    // Add click event listeners to all apply buttons
    const applyButtons = document.querySelectorAll('.apply-btn');
    applyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const type = button.closest('.career-card').getAttribute('data-type');
            openModal(type);
        });
    });
}

// Modal functions
function openModal(type) {
    const modalContainer = document.querySelector('.modal-container');
    const jobTitle = event.target.closest('.career-card').querySelector('h3').textContent;
    
    // Create modal content based on type
    const modalContent = `
        <div class="modal">
            <div class="modal-header">
                <h2>Apply for ${jobTitle}</h2>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <form id="applicationForm" class="application-form">
                    <div class="form-group">
                        <label for="fullName">Full Name</label>
                        <input type="text" id="fullName" name="fullName" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="phone">Phone</label>
                        <input type="tel" id="phone" name="phone" required>
                    </div>
                    <div class="form-group">
                        <label for="experience">Years of Experience</label>
                        <input type="number" id="experience" name="experience" min="0" required>
                    </div>
                    <div class="form-group">
                        <label for="resume">Resume/CV</label>
                        <input type="file" id="resume" name="resume" accept=".pdf,.doc,.docx" required>
                    </div>
                    <div class="form-group">
                        <label for="coverLetter">Cover Letter</label>
                        <textarea id="coverLetter" name="coverLetter" rows="5"></textarea>
                    </div>
                    <button type="submit" class="submit-btn">Submit Application</button>
                </form>
            </div>
        </div>
    `;

    // Add modal to container
    modalContainer.innerHTML = modalContent;
    modalContainer.style.display = 'flex';

    // Add event listeners
    const closeBtn = modalContainer.querySelector('.close-modal');
    const form = modalContainer.querySelector('#applicationForm');

    closeBtn.addEventListener('click', closeModal);
    modalContainer.addEventListener('click', (e) => {
        if (e.target === modalContainer) closeModal();
    });

    form.addEventListener('submit', handleFormSubmit);
}

function closeModal() {
    const modalContainer = document.querySelector('.modal-container');
    modalContainer.style.display = 'none';
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    // Here you would typically send the form data to your server
    // For now, we'll just show a success message
    const form = e.target;
    const submitBtn = form.querySelector('.submit-btn');
    
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
        form.innerHTML = `
            <div class="success-message">
                <i class="fas fa-check-circle"></i>
                <h3>Application Submitted!</h3>
                <p>Thank you for applying. We will review your application and get back to you soon.</p>
            </div>
        `;
    }, 1500);
}

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
