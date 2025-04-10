// Adobe Showcase Interactions
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
    
    // Video modal functionality
    const videoLinks = document.querySelectorAll('.video-link');
    const videoModal = document.getElementById('video-modal');
    const videoFrame = document.getElementById('video-frame');

    if (videoLinks.length > 0 && videoModal && videoFrame) {
        const videoClose = videoModal.querySelector('.modal-close');

        videoLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const videoUrl = link.getAttribute('href');
                videoFrame.src = videoUrl;
                videoModal.style.display = 'flex';
                videoModal.style.alignItems = 'center';
                videoModal.style.justifyContent = 'center';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });

        // Close video modal
        if (videoClose) {
            videoClose.addEventListener('click', () => {
                videoModal.style.display = 'none';
                videoFrame.src = ''; // Stop video playback
                document.body.style.overflow = 'auto'; // Re-enable scrolling
            });
        }

        // Click outside to close
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                videoModal.style.display = 'none';
                videoFrame.src = ''; // Stop video playback
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

            // Close video modal if open
            if (videoModal && videoModal.style.display === 'block') {
                videoModal.style.display = 'none';
                if (videoFrame) videoFrame.src = ''; // Stop video playback
                document.body.style.overflow = 'auto';
            }
        }
    });


    // App Selector Functionality
    const appButtons = document.querySelectorAll('.app-button');
    const projectSections = document.querySelectorAll('.project-section');

    function showProjectSection(appName) {
        // Hide all project sections with fade effect
        projectSections.forEach(section => {
            section.classList.remove('active');
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
        });

        // Show the selected section
        const selectedSection = document.getElementById(`${appName}-projects`);
        if (selectedSection) {
            selectedSection.classList.add('active');
            // Short delay for the fade-in effect
            setTimeout(() => {
                selectedSection.style.opacity = '1';
                selectedSection.style.transform = 'translateY(0)';
            }, 50);
        }

        // Update button states
        appButtons.forEach(button => {
            if (button.getAttribute('data-app') === appName) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    // Set initial state (default to first app)
    if (appButtons.length > 0 && projectSections.length > 0) {
        // Initialize all sections with initial styles
        projectSections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });

        const defaultApp = appButtons[0].getAttribute('data-app');
        showProjectSection(defaultApp);

        // Add click event listeners to app buttons
        appButtons.forEach(button => {
            button.addEventListener('click', () => {
                const appName = button.getAttribute('data-app');
                showProjectSection(appName);
                
                // Removed auto-scroll behavior
            });
        });
    }
});