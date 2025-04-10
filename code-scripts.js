// Code Showcase Interactions
document.addEventListener('DOMContentLoaded', () => {
    // Header scroll effect
    const header = document.querySelector('header');

    function checkScroll() {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Check scroll position on load
    if (header) {
        checkScroll();
        // Listen for scroll events
        window.addEventListener('scroll', checkScroll);
    }

    // Mobile navigation toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('nav ul');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    const navItems = document.querySelectorAll('nav a');

    if (navItems.length && navLinks) {
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            });
        });
    }

    // Handle toggling between Web/Java and Python projects
    const categoryIcons = document.querySelectorAll('.category-icon');
    const frontendSection = document.getElementById('frontend-projects');
    const backendSection = document.getElementById('backend-projects');
    
    // Set up toggling between project types when clicking category icons
    if (categoryIcons.length > 0 && frontendSection && backendSection) {
        // Make sure sections have proper transition styling
        frontendSection.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        backendSection.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        // Set the initial display style
        frontendSection.style.display = 'block';
        frontendSection.style.opacity = '1';
        frontendSection.style.transform = 'translateY(0)';
        
        backendSection.style.display = 'none';
        backendSection.style.opacity = '0';
        backendSection.style.transform = 'translateY(20px)';
        
        // Add click handlers to category icons
        categoryIcons.forEach((icon, index) => {
            icon.addEventListener('click', () => {
                // Update active state for category icons
                categoryIcons.forEach(i => i.classList.remove('active'));
                icon.classList.add('active');
                
                // Show appropriate section
                if (index === 0) { // Java/JavaScript/CSS
                    // Hide backend first
                    backendSection.style.opacity = '0';
                    backendSection.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        backendSection.style.display = 'none';
                        // Show frontend
                        frontendSection.style.display = 'block';
                        setTimeout(() => {
                            frontendSection.style.opacity = '1';
                            frontendSection.style.transform = 'translateY(0)';
                        }, 50);
                    }, 300);
                } else { // Python
                    // Hide frontend first
                    frontendSection.style.opacity = '0';
                    frontendSection.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        frontendSection.style.display = 'none';
                        // Show backend
                        backendSection.style.display = 'block';
                        setTimeout(() => {
                            backendSection.style.opacity = '1';
                            backendSection.style.transform = 'translateY(0)';
                        }, 50);
                    }, 300);
                }
            });
        });
        
        // First icon is already active by default (added in HTML)
    }

    // Lightbox functionality for images
    const lightboxLinks = document.querySelectorAll('.lightbox-link');
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImage = document.getElementById('lightbox-image');

    if (lightboxLinks.length > 0 && lightboxModal && lightboxImage) {
        const lightboxClose = lightboxModal.querySelector('.modal-close');

        lightboxLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const imageUrl = link.getAttribute('href');
                lightboxImage.src = imageUrl;
                lightboxModal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });

        // Close lightbox
        if (lightboxClose) {
            lightboxClose.addEventListener('click', () => {
                lightboxModal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Re-enable scrolling
            });
        }

        // Click outside to close
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                lightboxModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Key press handling for modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close lightbox if open
            if (lightboxModal && lightboxModal.style.display === 'block') {
                lightboxModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    });

    // Code snippet hover effects
    const codeCards = document.querySelectorAll('.code-card');
    
    if (codeCards.length) {
        codeCards.forEach(card => {
            const codeSnippet = card.querySelector('.code-snippet');
            const codeImage = card.querySelector('.code-image');
            
            if (codeSnippet && codeImage) {
                card.addEventListener('mouseenter', () => {
                    codeSnippet.style.maxHeight = '200px';
                });
                
                card.addEventListener('mouseleave', () => {
                    codeSnippet.style.maxHeight = '200px';
                });
            }
        });
    }
});