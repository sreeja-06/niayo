// Navigation-specific functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeServicesDropdown();
    initializeMobileMenu();
});

// Services dropdown functionality
function initializeServicesDropdown() {
    // Responsive dropdown: handle click for all devices, keyboard for accessibility
    const servicesLink = document.querySelector('.nav-dropdown .nav-link');
    const dropdownContent = document.querySelector('.dropdown-content');
    const servicesDropdown = document.querySelector('.nav-dropdown');
    let isDropdownOpen = false;
    if (servicesLink && dropdownContent && servicesDropdown) {
        // Toggle dropdown on click/tap for all devices
        servicesLink.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            isDropdownOpen = !isDropdownOpen;
            servicesDropdown.classList.toggle('active');
            if (isDropdownOpen) {
                dropdownContent.style.display = 'flex';
            } else {
                dropdownContent.style.display = 'none';
            }
        });
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-dropdown')) {
                isDropdownOpen = false;
                servicesDropdown.classList.remove('active');
                dropdownContent.style.display = 'none';
            }
        });
        // Keyboard navigation for accessibility
        servicesLink.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                isDropdownOpen = !isDropdownOpen;
                servicesDropdown.classList.toggle('active');
                if (isDropdownOpen) {
                    dropdownContent.style.display = 'flex';
                } else {
                    dropdownContent.style.display = 'none';
                }
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
                    isDropdownOpen = false;
                    servicesDropdown.classList.remove('active');
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
    const servicesLink = servicesDropdown ? servicesDropdown.querySelector('.nav-link') : null;
    const dropdownContent = servicesDropdown ? servicesDropdown.querySelector('.dropdown-content') : null;
    let isMenuOpen = false;
    let isDropdownOpen = false;

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

        // Close menu when clicking outside (but not dropdown, handled above)
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
            }
        });

        // Handle navigation link clicks (except dropdown toggles)
        navItems.forEach(item => {
            // Only close menu if not a dropdown toggle
            if (!item.closest('.dropdown-content') && !item.closest('.nav-dropdown')) {
                item.addEventListener('click', () => {
                    if (window.innerWidth <= 1024) {
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
    
    if (window.innerWidth > 1024) {
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