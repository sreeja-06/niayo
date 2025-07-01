document.addEventListener('DOMContentLoaded', function() {
    // Get position from URL
    const urlParams = new URLSearchParams(window.location.search);
    const position = urlParams.get('position');
    
    // Update form with position
    if (position) {
        updateFormForPosition(position);
    }
    
    // Initialize animations
    initializeAnimations();
    
    // Initialize form handling
    initializeFormHandling();
    
    // Initialize file upload
    initializeFileUpload();

    // Initialize scroll animations
    initializeScrollAnimations();
});

// Initialize scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.job-details-section').forEach(section => {
        observer.observe(section);
    });
}

// Update form based on position
function updateFormForPosition(position) {
    // Update page title
    document.title = `Apply for ${position} - Naiyo24`;
    
    // Update form title with animation
    const formTitle = document.querySelector('.form-title');
    if (formTitle) {
        formTitle.style.opacity = '0';
        formTitle.style.transform = 'translateY(-20px)';
        formTitle.textContent = `Apply for ${position}`;
        
        setTimeout(() => {
            formTitle.style.transition = 'all 0.6s ease';
            formTitle.style.opacity = '1';
            formTitle.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Add hidden input for position
    const form = document.getElementById('applicationForm');
    const positionInput = document.createElement('input');
    positionInput.type = 'hidden';
    positionInput.name = 'position';
    positionInput.value = position;
    form.appendChild(positionInput);
    
    // Update job details based on position
    updateJobDetails(position);
}

// Update job details based on position
function updateJobDetails(position) {
    const jobDetails = {
        'Senior Full Stack Developer': {
            description: 'Join our core development team to build scalable web applications using modern technologies.',
            skills: ['React.js', 'Node.js', 'Python', 'AWS', 'MongoDB', 'Docker'],
            salary: '₹15L - ₹25L per annum',
            terms: 'Full-time position with flexible working hours and remote work options.'
        },
        'UI/UX Designer': {
            description: 'Create beautiful and intuitive user interfaces for our web and mobile applications.',
            skills: ['Figma', 'Adobe XD', 'UI Design', 'UX Research', 'Prototyping', 'User Testing'],
            salary: '₹12L - ₹18L per annum',
            terms: 'Full-time position with creative freedom and modern design tools.'
        },
        'DevOps Engineer': {
            description: 'Manage and optimize our cloud infrastructure and deployment pipelines.',
            skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'Linux'],
            salary: '₹18L - ₹28L per annum',
            terms: 'Full-time position with focus on automation and infrastructure.'
        },
        'Software Development Intern': {
            description: 'Learn and contribute to real-world projects while working with experienced developers.',
            skills: ['JavaScript', 'Python', 'Git', 'Web Development', 'Problem Solving'],
            salary: '₹25K - ₹35K per month',
            terms: '6-month internship with potential for full-time conversion.'
        },
        'UI/UX Design Intern': {
            description: 'Work on real design projects and learn from our experienced design team.',
            skills: ['UI Design', 'UX Research', 'Figma', 'Prototyping', 'Design Thinking'],
            salary: '₹20K - ₹30K per month',
            terms: '3-month internship with mentorship and portfolio building.'
        },
        'Marketing Intern': {
            description: 'Help create and execute marketing strategies for our digital products.',
            skills: ['Digital Marketing', 'Social Media', 'Content Creation', 'Analytics', 'SEO'],
            salary: '₹15K - ₹25K per month',
            terms: '3-month internship with hands-on marketing experience.'
        }
    };

    const details = jobDetails[position];
    if (details) {
        // Update job description with animation
        const descriptionElement = document.querySelector('.job-description p');
        if (descriptionElement) {
            animateText(descriptionElement, details.description);
        }

        // Update required skills with staggered animation
        const skillsList = document.querySelector('.skills-list');
        if (skillsList) {
            skillsList.innerHTML = '';
            details.skills.forEach((skill, index) => {
                const skillTag = document.createElement('li');
                skillTag.className = 'skill-tag';
                skillTag.style.opacity = '0';
                skillTag.style.transform = 'scale(0.8)';
                skillTag.textContent = skill;
                skillsList.appendChild(skillTag);

                setTimeout(() => {
                    skillTag.style.transition = 'all 0.3s ease';
                    skillTag.style.opacity = '1';
                    skillTag.style.transform = 'scale(1)';
                }, 100 * index);
            });
        }

        // Update salary structure with animation
        const salaryElement = document.querySelector('.salary-details p');
        if (salaryElement) {
            animateText(salaryElement, details.salary);
        }

        // Update terms and conditions with animation
        const termsElement = document.querySelector('.terms-content p');
        if (termsElement) {
            animateText(termsElement, details.terms);
        }
    }
}

// Text animation helper
function animateText(element, newText) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        element.textContent = newText;
        element.style.transition = 'all 0.5s ease';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, 200);
}

// Animation Functions
function initializeAnimations() {
    // Animate form elements on load
    const formElements = document.querySelectorAll('.form-group');
    formElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        setTimeout(() => {
            element.style.transition = 'all 0.5s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100 * index);
    });

    // Animate job details sections
    const jobSections = document.querySelectorAll('.job-details-section');
    jobSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateX(20px)';
        setTimeout(() => {
            section.style.transition = 'all 0.5s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateX(0)';
        }, 100 * index);
    });
}

// Form Handling Functions
function initializeFormHandling() {
    const form = document.getElementById('applicationForm');
    const inputs = form.querySelectorAll('input, textarea');

    // Add focus effects
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
            animateInput(input);
        });

        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
            validateInput(input);
        });

        // Add input animation
        input.addEventListener('input', () => {
            if (input.value.length > 0) {
                input.classList.add('has-value');
            } else {
                input.classList.remove('has-value');
            }
        });
    });

    // Form submission
    form.addEventListener('submit', handleFormSubmit);
}

// Input animation helper
function animateInput(input) {
    input.style.transform = 'scale(1.02)';
    setTimeout(() => {
        input.style.transition = 'transform 0.3s ease';
        input.style.transform = 'scale(1)';
    }, 200);
}

function validateInput(input) {
    const value = input.value.trim();
    const formGroup = input.parentElement;
    let isValid = true;
    let errorMessage = '';

    switch(input.type) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;

        case 'tel':
            const phoneRegex = /^\+?[\d\s-]{10,}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
            break;

        case 'number':
            if (input.required && value === '') {
                isValid = false;
                errorMessage = 'This field is required';
            } else if (value !== '' && parseFloat(value) < 0) {
                isValid = false;
                errorMessage = 'Please enter a positive number';
            }
            break;

        default:
            if (input.required && value === '') {
                isValid = false;
                errorMessage = 'This field is required';
            }
    }

    // Update UI based on validation
    const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
    errorElement.className = 'error-message';
    
    if (!isValid) {
        if (!formGroup.querySelector('.error-message')) {
            errorElement.textContent = errorMessage;
            formGroup.appendChild(errorElement);
            errorElement.style.opacity = '0';
            errorElement.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                errorElement.style.transition = 'all 0.3s ease';
                errorElement.style.opacity = '1';
                errorElement.style.transform = 'translateY(0)';
            }, 10);
        }
        input.classList.add('error');
        shakeElement(input);
    } else {
        if (formGroup.querySelector('.error-message')) {
            formGroup.removeChild(errorElement);
        }
        input.classList.remove('error');
    }

    return isValid;
}

// Shake animation for invalid inputs
function shakeElement(element) {
    element.style.animation = 'shake 0.5s ease';
    setTimeout(() => {
        element.style.animation = '';
    }, 500);
}

function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;

    // Validate all inputs
    inputs.forEach(input => {
        if (!validateInput(input)) {
            isValid = false;
        }
    });

    if (!isValid) {
        showNotification('Please fill in all required fields correctly', 'error');
        return;
    }

    // Show loading state
    const submitBtn = form.querySelector('.submit-btn');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitBtn.disabled = true;

    // Prepare form data for AJAX
    const formData = new FormData(form);

    fetch('http://127.0.0.1:5000/api/apply', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Submitted Successfully!';
            showNotification('Your application has been submitted successfully!', 'success');
            setTimeout(() => {
                form.reset();
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }, 2000);
        } else {
            showNotification(data.message || 'Submission failed', 'error');
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    })
    .catch(() => {
        showNotification('An error occurred. Please try again.', 'error');
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    });
}

// File Upload Functions
function initializeFileUpload() {
    const fileInput = document.getElementById('resume');
    const fileLabel = document.querySelector('.file-upload-label span');

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            const validTypes = ['.pdf', '.doc', '.docx'];
            const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
            
            if (!validTypes.includes(fileExtension)) {
                showNotification('Please upload a PDF or Word document', 'error');
                fileInput.value = '';
                fileLabel.textContent = 'Choose File';
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                showNotification('File size should be less than 5MB', 'error');
                fileInput.value = '';
                fileLabel.textContent = 'Choose File';
                return;
            }

            // Update label with file name
            fileLabel.textContent = file.name;
            showNotification('File selected successfully', 'success');
        }
    });
}

// Notification Function
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    // Add to document
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // Remove after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add notification styles
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        background: white;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        gap: 10px;
        transform: translateX(120%);
        transition: transform 0.3s ease;
        z-index: 1000;
    }

    .notification.show {
        transform: translateX(0);
    }

    .notification.success {
        border-left: 4px solid #22c55e;
    }

    .notification.error {
        border-left: 4px solid #ef4444;
    }

    .notification i {
        font-size: 1.2rem;
    }

    .notification.success i {
        color: #22c55e;
    }

    .notification.error i {
        color: #ef4444;
    }

    .error-message {
        color: #ef4444;
        font-size: 0.85rem;
        margin-top: 5px;
    }

    .form-group input.error,
    .form-group textarea.error {
        border-color: #ef4444;
    }

    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }

    .form-group input.has-value,
    .form-group textarea.has-value {
        border-color: #22c55e;
    }
`;
document.head.appendChild(style);
