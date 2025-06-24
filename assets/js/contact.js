// Form validation and submission handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('serviceRequestForm');
    
    if (contactForm) {
        const successMsg = document.getElementById('contactSuccessMsg');
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const phone = document.getElementById('contactPhone').value.trim();
            const message = document.getElementById('contactMessage').value.trim();
            
            // Basic validation
            if (!name || !email || !phone || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Phone validation
            const phoneRegex = /^[0-9+\-\s()]+$/;
            if (!phoneRegex.test(phone)) {
                alert('Please enter a valid phone number');
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        phone,
                        message
                    })
                });

                const data = await response.json();

                if (data.success) {
                    // Show beautiful success message
                    if (successMsg) {
                        successMsg.style.display = 'flex';
                        successMsg.style.opacity = '1';
                        setTimeout(() => {
                            successMsg.style.opacity = '0';
                            setTimeout(() => { successMsg.style.display = 'none'; }, 400);
                        }, 4000);
                    }
                    contactForm.reset();
                } else {
                    alert(data.error || 'Something went wrong. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Unable to send message. Please try again later.');
            }
        });
    }
    
    // Handle Get In Touch form in contactus.html
    const getInTouchForm = document.getElementById('getInTouchForm');
    if (getInTouchForm) {
        const getInTouchSuccessMsg = document.getElementById('getInTouchSuccessMsg');
        getInTouchForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const name = document.getElementById('getInTouchName').value.trim();
            const email = document.getElementById('getInTouchEmail').value.trim();
            const phone = document.getElementById('getInTouchPhone').value.trim();
            const message = document.getElementById('getInTouchMessage').value.trim();
            if (!name || !email || !phone || !message) {
                alert('Please fill in all fields');
                return;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            const phoneRegex = /^[0-9+\-\s()]+$/;
            if (!phoneRegex.test(phone)) {
                alert('Please enter a valid phone number');
                return;
            }
            try {
                const response = await fetch('http://localhost:5000/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        phone,
                        message
                    })
                });
                const data = await response.json();
                if (data.success) {
                    if (getInTouchSuccessMsg) {
                        getInTouchSuccessMsg.style.display = 'flex';
                        getInTouchSuccessMsg.style.opacity = '1';
                        setTimeout(() => {
                            getInTouchSuccessMsg.style.opacity = '0';
                            setTimeout(() => { getInTouchSuccessMsg.style.display = 'none'; }, 400);
                        }, 4000);
                    }
                    getInTouchForm.reset();
                } else {
                    alert(data.error || 'Something went wrong. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Unable to send message. Please try again later.');
            }
        });
    }
    
    // Smooth scroll for anchor links
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
    
    // Add animation to team members on scroll
    const teamMembers = document.querySelectorAll('.team-member');
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    teamMembers.forEach(member => {
        member.style.opacity = '0';
        member.style.transform = 'translateY(20px)';
        member.style.transition = 'all 0.5s ease-out';
        observer.observe(member);
    });
});