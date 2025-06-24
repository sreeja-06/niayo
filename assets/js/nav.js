// Navigation-specific functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeServicesDropdown();
    initializeMobileMenu();
});

// Services dropdown functionality
function initializeServicesDropdown() {
    const servicesLink = document.querySelector('.nav-dropdown .nav-link');
    const dropdownContent = document.querySelector('.dropdown-content');
    let isDropdownVisible = false;

    if (servicesLink && dropdownContent) {
        // Toggle dropdown on click
        servicesLink.addEventListener('click', (e) => {
            e.preventDefault();
            isDropdownVisible = !isDropdownVisible;
            dropdownContent.style.display = isDropdownVisible ? 'block' : 'none';
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-dropdown')) {
                isDropdownVisible = false;
                dropdownContent.style.display = 'none';
            }
        });

        // Handle keyboard navigation
        servicesLink.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                isDropdownVisible = !isDropdownVisible;
                dropdownContent.style.display = isDropdownVisible ? 'block' : 'none';
            }
        });

        // Add keyboard navigation for dropdown items
        const dropdownItems = dropdownContent.querySelectorAll('a');
        dropdownItems.forEach((item, index) => {
            item.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    const nextItem = dropdownItems[index + 1];
                    if (nextItem) nextItem.focus();
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    const prevItem = dropdownItems[index - 1];
                    if (prevItem) prevItem.focus();
                } else if (e.key === 'Escape') {
                    e.preventDefault();
                    isDropdownVisible = false;
                    dropdownContent.style.display = 'none';
                    servicesLink.focus();
                }
            });
        });
    }
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    const servicesDropdown = document.querySelector('.nav-dropdown');
    let isMenuOpen = false;

    if (mobileMenuBtn && navLinks) {
        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            isMenuOpen = !isMenuOpen;
            navLinks.classList.toggle('active');
            mobileMenuBtn.setAttribute('aria-expanded', isMenuOpen);
            
            // Toggle icon
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // Handle services dropdown in mobile view
        if (servicesDropdown) {
            const servicesLink = servicesDropdown.querySelector('.nav-link');
            const dropdownContent = servicesDropdown.querySelector('.dropdown-content');

            servicesLink.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();
                    servicesDropdown.classList.toggle('active');
                }
            });
        }

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (isMenuOpen && !e.target.closest('.nav-links') && !e.target.closest('.mobile-menu-btn')) {
                isMenuOpen = false;
                navLinks.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', false);
                
                // Reset icon
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }

                // Close any open dropdowns
                if (servicesDropdown) {
                    servicesDropdown.classList.remove('active');
                }
            }
        });

        // Handle navigation link clicks
        navItems.forEach(item => {
            if (!item.closest('.dropdown-content')) {
                item.addEventListener('click', () => {
                    if (window.innerWidth <= 768) {
                        isMenuOpen = false;
                        navLinks.classList.remove('active');
                        mobileMenuBtn.setAttribute('aria-expanded', false);
                        
                        // Reset icon
                        const icon = mobileMenuBtn.querySelector('i');
                        if (icon) {
                            icon.classList.remove('fa-times');
                            icon.classList.add('fa-bars');
                        }
                    }
                });
            }
        });
    }
}

// Handle window resize
window.addEventListener('resize', () => {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const servicesDropdown = document.querySelector('.nav-dropdown');
    
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        if (mobileMenuBtn) {
            mobileMenuBtn.setAttribute('aria-expanded', false);
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
        if (servicesDropdown) {
            servicesDropdown.classList.remove('active');
            const dropdownContent = servicesDropdown.querySelector('.dropdown-content');
            if (dropdownContent) {
                dropdownContent.style.display = '';
                dropdownContent.style.opacity = '1';
            }
        }
    }
}); 