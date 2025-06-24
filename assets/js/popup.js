// Service request modal functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeServiceRequestModal();
});

// Define company details data globally within popup.js
const companyDetails = {
    'private-limited': {
        title: 'Private Limited Company',
        overview: 'A Private Limited Company is the most popular form of business entity in India, offering limited liability protection to its shareholders.',
        features: [
            'Limited liability protection for shareholders',
            'Separate legal entity',
            'Minimum 2 and maximum 200 shareholders',
            'Minimum 2 directors required',
            'Easy transfer of ownership',
            'Better access to funding'
        ],
        requirements: [
            'Minimum capital: No minimum requirement',
            'Directors: Minimum 2, Maximum 15',
            'Shareholders: Minimum 2, Maximum 200',
            'Registered office in India'
        ],
        benefits: [
            'Limited liability protection',
            'Separate legal entity',
            'Easy to raise funds',
            'Better credibility',
            'Perpetual succession'
        ]
    },
    'public-limited': {
        title: 'Public Limited Company',
        overview: 'A Public Limited Company is suitable for large-scale businesses that want to raise capital from the public through stock exchanges.',
        features: [
            'Can raise capital from public',
            'Minimum 7 shareholders',
            'Minimum 3 directors required',
            'Can list on stock exchanges',
            'Strict regulatory compliance'
        ],
        requirements: [
            'Minimum capital: ₹5 lakhs',
            'Directors: Minimum 3',
            'Shareholders: Minimum 7, No maximum limit',
            'Registered office in India'
        ],
        benefits: [
            'Access to public funding',
            'Enhanced credibility',
            'Better growth opportunities',
            'Liquidity for shareholders'
        ]
    },
    'llp': {
        title: 'Limited Liability Partnership',
        overview: 'A Limited Liability Partnership (LLP) offers the benefits of limited liability while allowing partners the flexibility of organizing their internal structure as a partnership.',
        features: [
            'Combines features of both partnership and company',
            'Limited liability for partners',
            'Separate legal entity distinct from its partners',
            'Easy to form and manage with fewer compliances than a private limited company',
            'No maximum limit on the number of partners'
        ],
        requirements: [
            'Minimum 2 designated partners',
            'At least one designated partner must be an Indian resident',
            'Registered office in India',
            'LLP Agreement'
        ],
        benefits: [
            'Limited liability protection for partners',
            'Perpetual succession (continued existence regardless of partner changes)',
            'Flexibility in management and decision-making',
            'Lower compliance burden compared to companies'
        ]
    },
    'opc': {
        title: 'One Person Company',
        overview: 'An One Person Company (OPC) is a business entity with only one member, where the individual can enjoy the benefits of limited liability.',
        features: [
            'Only one director and one nominee',
            'Limited liability for the sole owner',
            'Separate legal entity',
            'Simpler compliance requirements',
            'Perpetual succession (nominee ensures continuity)'
        ],
        requirements: [
            'Only a natural person who is an Indian citizen and resident can be a member',
            'Minimum 1 director and 1 nominee',
            'Registered office in India'
        ],
        benefits: [
            'Limited liability for the individual',
            'Easy to manage and control',
            'Access to funding and bank loans',
            'Credibility of a company structure'
        ]
    },
    'partnership': {
        title: 'Partnership Firm',
        overview: 'A Partnership Firm is a traditional business structure formed by two or more individuals who agree to share the profits or losses of a business carried on by all or any of them acting for all.',
        features: [
            'Formed by a partnership deed',
            'Shared profits and losses among partners',
            'Unlimited liability for partners',
            'Easy to establish and dissolve',
            'Minimum 2 partners'
        ],
        requirements: [
            'Partnership Deed (written agreement)',
            'Minimum 2 partners',
            'Maximum 20 partners (10 for banking business)'
        ],
        benefits: [
            'Easy and inexpensive to set up',
            'Minimal regulatory compliance',
            'Shared decision-making and responsibilities',
            'No corporate tax (partners pay tax individually)'
        ]
    },
    'proprietorship': {
        title: 'Proprietorship',
        overview: 'A Proprietorship is the simplest form of business ownership, owned and controlled by a single individual. It is not a separate legal entity from its owner.',
        features: [
            'Single owner',
            'Unlimited liability for the owner',
            'Easy to start and operate',
            'Minimal regulatory compliance',
            'No separate legal existence from the owner'
        ],
        requirements: [
            'PAN card of the individual',
            'Bank account in the name of the business (optional, but recommended)',
            'Business address proof'
        ],
        benefits: [
            'Easy and inexpensive to establish',
            'Complete control and decision-making by the owner',
            'Minimal compliance burden',
            'Direct access to profits'
        ]
    },
    'foreign': {
        title: 'Foreign Company',
        overview: 'A Foreign Company refers to a company incorporated outside India that establishes a place of business in India.',
        features: [
            'Incorporated outside India',
            'Has a place of business in India (e.g., branch office, project office, liaison office)',
            'Complies with Indian laws and regulations',
            'Subject to regulations by RBI and MCA'
        ],
        requirements: [
            'Approval from Reserve Bank of India (RBI) or Ministry of Corporate Affairs (MCA)',
            'Filing of financial statements and annual returns',
            'Compliance with FEMA (Foreign Exchange Management Act)'
        ],
        benefits: [
            'Opportunity to tap into the Indian market',
            'Establish a physical presence in India',
            'Brand recognition and expansion',
            'Access to local resources and talent'
        ]
    },
    'section8': {
        title: 'Section 8 Company',
        overview: 'A Section 8 Company is a non-profit organization registered under the Companies Act, 2013, with the primary object of promoting commerce, art, science, sports, education, research, social welfare, religion, charity, protection of environment or any such other object.',
        features: [
            'Non-profit objective',
            'Profits are applied only for promoting its objects',
            'No dividend distribution to members',
            'Requires a license from the Central Government',
            'Can be formed as a private or public company'
        ],
        requirements: [
            'Minimum 2 directors (for private) or 3 directors (for public)',
            'No minimum share capital requirement',
            'Memorandum and Articles of Association outlining charitable objects',
            'Obtaining a license from the Central Government'
        ],
        benefits: [
            'Eligible for tax exemptions under Income Tax Act',
            'Enhanced credibility and public trust',
            'No minimum capital requirement',
            'Can receive donations and grants'
        ]
    },
    'producer': {
        title: 'Producer Company',
        overview: 'A Producer Company is a body corporate primarily formed for the welfare of agriculturalists, engaged in production, harvesting, processing, procurement, grading, pooling, handling, marketing, selling, export of primary produce of members or import of goods or services for their benefit.',
        features: [
            'For agricultural and allied activities',
            'Minimum 10 individual producers or 2 producer institutions',
            'Hybrid between a private limited company and a cooperative society',
            'Governed by specific provisions of the Companies Act, 2013',
            'Objective is the mutual assistance of its members'
        ],
        requirements: [
            'Minimum 10 individual producers or 2 producer institutions',
            'Minimum 5 directors',
            'No minimum capital requirement'
        ],
        benefits: [
            'Supports the interests of producers',
            'Access to funding and credit facilities',
            'Improved market access and price realization for produce',
            'Tax benefits and exemptions'
        ]
    },
    'nidhi': {
        title: 'Nidhi Company',
        overview: 'A Nidhi Company is a type of Non-Banking Financial Company (NBFC) that works on the principle of mutual benefit, allowing members to borrow and lend money to one another. It aims to cultivate the habit of thrift and savings among its members.',
        features: [
            'Operates for the mutual benefit of its members only',
            'Cannot deal with the public or external entities for borrowing or lending',
            'Regulated by the Ministry of Corporate Affairs (MCA)',
            'Focuses on small savings and financial assistance to members',
            'Minimum 200 members required within one year of incorporation'
        ],
        requirements: [
            'Minimum 200 members within one year of incorporation',
            'Minimum paid-up equity share capital of ₹5 lakhs',
            'Net owned funds of ₹10 lakhs or more',
            'Unencumbered term deposits of not less than 10% of the outstanding deposits'
        ],
        benefits: [
            'Easy access to loans for members at reasonable rates',
            'Promotes savings and financial discipline among members',
            'Simpler regulatory framework compared to other NBFCs',
            'Members benefit from both borrowing and lending activities'
        ]
    }
};

function initializeServiceRequestModal() {
    console.log('Initializing service request modal.');
    const modal = document.getElementById('requestServiceModal');
    const modalContent = modal.querySelector('.modal-content');
    const closeBtn = modal.querySelector('.modal-close');
    const form = document.getElementById('serviceRequestForm');
    const modalTitle = modal.querySelector('h2');
    const modalBodyOriginalContent = form.outerHTML;

    console.log('Modal element found:', modal);
    console.log('Modal content element found:', modalContent);
    console.log('Close button found:', closeBtn);
    console.log('Form element found:', form);

    let isModalOpen = false;

    // Open modal (for general service request buttons)
    document.querySelectorAll('[data-modal="requestService"]').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('General service request button clicked.');
            // Reset to original form content if it was changed
            modalContent.innerHTML = `
                <span class="modal-close">&times;</span>
                <h2>Request Service</h2>
                ${modalBodyOriginalContent}
            `;
            // Re-select elements after re-rendering content
            modal.querySelector('.modal-close').addEventListener('click', () => closeModal());
            modal.querySelector('#serviceRequestForm').addEventListener('submit', async (ev) => handleFormSubmission(ev.target));

            openModal();
        });
    });

    // Open modal (for 'Know More' buttons)
    document.querySelectorAll('.know-more-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const companyType = button.getAttribute('data-modal');
            console.log('Know More button clicked for:', companyType);
            const details = companyDetails[companyType];

            if (details) {
                modalContent.innerHTML = `
                    <span class="modal-close">&times;</span>
                    <h2>${details.title}</h2>
                    <div class="modal-body">
                        <h3>Overview</h3>
                        <p>${details.overview}</p>

                        <h3>Key Features</h3>
                        <ul>${details.features.map(f => `<li>✓ ${f}</li>`).join('')}</ul>

                        <h3>Requirements</h3>
                        <ul>${details.requirements.map(r => `<li>✓ ${r}</li>`).join('')}</ul>

                        <h3>Benefits</h3>
                        <ul>${details.benefits.map(b => `<li>✓ ${b}</li>`).join('')}</ul>
                    </div>
                `;
                // Re-select close button after re-rendering content
                modal.querySelector('.modal-close').addEventListener('click', () => closeModal());
                openModal();
            } else {
                console.error('Company details not found for:', companyType);
            }
        });
    });

    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            console.log('Close button clicked.');
            closeModal();
        });
    }

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            console.log('Clicked outside modal.');
            closeModal();
        }
    });

    // Handle form submission
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log('Form submitted.');
            await handleFormSubmission(form);
        });
    }

    // Handle keyboard navigation
    modal.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isModalOpen) {
            console.log('Escape key pressed.');
            closeModal();
        }
    });

    // Trap focus within modal when open
    modal.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && isModalOpen) {
            const focusableElements = modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    });

    function openModal() {
        console.log('Opening modal.');
        isModalOpen = true;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        modalContent.focus();
        
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'alert');
        announcement.setAttribute('aria-live', 'assertive');
        announcement.className = 'sr-only';
        announcement.textContent = 'Modal opened'; // Make this more general
        document.body.appendChild(announcement);
        setTimeout(() => announcement.remove(), 1000);
    }

    function closeModal() {
        console.log('Closing modal.');
        isModalOpen = false;
        modal.classList.remove('active');
        
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }

    async function handleFormSubmission(form) {
        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;

        // Gather form data
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const plan = formData.get('plan') || '';
        const message = formData.get('message');
        const service_requested = formData.get('service');

        // Validate required fields
        if (!name || !email || !phone || !message || !service_requested) {
            alert('Please fill in all required fields.');
            return;
        }
        // If plan is required (app-development.html), check for it
        if (form.querySelector('#plan') && !plan) {
            alert('Please select a plan.');
            return;
        }

        try {
            submitButton.disabled = true;
            submitButton.textContent = 'Submitting...';

            const payload = { name, email, phone, plan, message, service_requested };
            const response = await fetch('http://127.0.0.1:5000/api/service-requests', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            if (result.success) {
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Thank you for your request. We will contact you soon!';
                form.appendChild(successMessage);
                form.reset();
                setTimeout(() => {
                    closeModal();
                    successMessage.remove();
                }, 2000);
            } else {
                alert(result.error || 'An error occurred. Please try again.');
            }
        } catch (error) {
            console.error('Form submission failed:', error);
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = 'An error occurred. Please try again.';
            form.appendChild(errorMessage);
            setTimeout(() => errorMessage.remove(), 3000);
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    }

    // App Development Service Request Form Submission
    const appDevForm = document.getElementById('serviceRequestForm');
    if (appDevForm) {
        appDevForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const plan = document.getElementById('plan') ? document.getElementById('plan').value : '';
            const message = document.getElementById('message').value.trim();
            // Only send if plan field exists (app-development.html)
            if (!name || !email || !phone || !plan || !message) {
                alert('Please fill in all fields.');
                return;
            }
            try {
                const response = await fetch('http://127.0.0.1:5000/api/service-requests/app-development', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, phone, plan, message })
                });
                const result = await response.json();
                if (result.success) {
                    alert('Thank you! Your request has been submitted.');
                    appDevForm.reset();
                } else {
                    alert(result.error || 'An error occurred. Please try again.');
                }
            } catch (error) {
                alert('An error occurred. Please try again.');
            }
        });
    }
}

// Add CSS for modal animations
const style = document.createElement('style');
style.textContent = `
    .modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(96, 96, 96, 0.85);
        backdrop-filter: blur(8px);
        z-index: 2000;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .modal.active {
        opacity: 1;
    }

    .modal-content {
        background: rgba(0, 0, 0, 0.75);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 20px;
        padding: 40px;
        width: 90%;
        max-width: 600px;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        transform: scale(0.9);
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    }

    .modal.active .modal-content {
        transform: scale(1);
        opacity: 1;
    }

    .success-message {
        background-color: rgba(76, 175, 80, 0.2);
        color: #4CAF50;
        padding: 15px;
        margin-top: 15px;
        border-radius: 8px;
        text-align: center;
        border: 1px solid rgba(76, 175, 80, 0.3);
    }

    .error-message {
        background-color: rgba(244, 67, 54, 0.2);
        color: #f44336;
        padding: 15px;
        margin-top: 15px;
        border-radius: 8px;
        text-align: center;
        border: 1px solid rgba(244, 67, 54, 0.3);
    }

    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
`;
document.head.appendChild(style);