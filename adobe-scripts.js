// Adobe Showcase Interactions
document.addEventListener('DOMContentLoaded', () => {
    // Header scroll effect
    const header = document.querySelector('header');
    
    // Add subtle parallax effect to shapes
    const shapes = document.querySelectorAll('.shape, .glow, .collaboration-shape, .collaboration-glow');
    
    if (shapes.length) {
        window.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            shapes.forEach(shape => {
                const speedX = parseFloat(shape.getAttribute('data-speed-x') || 20);
                const speedY = parseFloat(shape.getAttribute('data-speed-y') || 20);
                
                const moveX = (x - 0.5) * speedX;
                const moveY = (y - 0.5) * speedY;
                
                shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });
    }

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
    
    // Contact button scroll functionality
    const contactButton = document.querySelector('nav a[href="#contact"]');
    const collaborationSection = document.querySelector('.collaboration-section');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
    
    // Add event listener to contact button for smooth scrolling
    if (contactButton && collaborationSection) {
        contactButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get the position of the collaboration section
            const sectionPosition = collaborationSection.getBoundingClientRect().top;
            const offsetPosition = sectionPosition + window.pageYOffset;
            
            // Scroll smoothly to the section
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if it's open
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
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
                
                // Create a temporary image to get the natural dimensions
                const tempImg = new Image();
                tempImg.onload = function() {
                    const aspectRatio = this.naturalWidth / this.naturalHeight;
                    
                    // Set the lightbox image source
                    lightboxImage.src = imageUrl;
                    lightboxImage.setAttribute('data-aspect-ratio', aspectRatio);
                    
                    // Show the modal
                    lightboxModal.style.display = 'block';
                    document.body.style.overflow = 'hidden'; // Prevent scrolling
                    
                    // Apply aspect ratio preservation
                    preserveAspectRatio();
                };
                tempImg.src = imageUrl;
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
    // We'll get modalContent when needed instead of storing it as a constant

    if (videoLinks.length > 0 && videoModal) {
        const videoClose = videoModal.querySelector('.modal-close');

        videoLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const videoUrl = link.getAttribute('href');
                console.log('Video link clicked:', videoUrl);
                
                // Get the modal content element
                const modalContent = videoModal.querySelector('.modal-content');
                console.log('Modal content element:', modalContent);
                
                // Check if it's a local MP4 file
                if (videoUrl.endsWith('.mp4')) {
                    console.log('Creating video element for MP4 file');
                    // Create video element instead of using iframe
                    modalContent.innerHTML = `<video id="video-player" controls autoplay style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; margin: auto; width: 100%; height: 100%; object-fit: contain;">
                        <source src="${videoUrl}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>`;
                    console.log('Video element created:', modalContent.innerHTML);
                } else {
                    // Use iframe for YouTube or other embeds
                    modalContent.innerHTML = `<iframe id="video-frame" frameborder="0" allowfullscreen src="${videoUrl}" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; margin: auto; width: 100%; height: 100%; object-fit: contain;"></iframe>`;
                }
                
                // Show the modal with improved visibility and positioning
                videoModal.style.display = 'flex';
                videoModal.style.alignItems = 'center';
                videoModal.style.justifyContent = 'center';
                videoModal.style.zIndex = '2000';
                console.log('Video modal displayed:', videoModal.style.display);
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });

        // Close video modal
        if (videoClose) {
            videoClose.addEventListener('click', () => {
                videoModal.style.display = 'none';
                // Get modal content
                const modalContent = videoModal.querySelector('.modal-content');
                if (modalContent) {
                    modalContent.innerHTML = ''; // Remove video element to stop playback
                }
                document.body.style.overflow = 'auto'; // Re-enable scrolling
            });
        }

        // Click outside to close
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                videoModal.style.display = 'none';
                // Get modal content
                const modalContent = videoModal.querySelector('.modal-content');
                if (modalContent) {
                    modalContent.innerHTML = ''; // Remove video element to stop playback
                }
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
    if (videoModal && (videoModal.style.display === 'block' || videoModal.style.display === 'flex')) {
    videoModal.style.display = 'none';
    const modalContent = videoModal.querySelector('.modal-content');
    if (modalContent) modalContent.innerHTML = ''; // Remove video element to stop playback
    document.body.style.overflow = 'auto';
    }
    }
    });
    
    // Function to preserve aspect ratio of the lightbox image
    function preserveAspectRatio() {
        if (!lightboxImage || !lightboxModal) return;
        
        const aspectRatio = parseFloat(lightboxImage.getAttribute('data-aspect-ratio')) || 1;
        const viewportWidth = window.innerWidth * 0.8; // 80% of viewport width
        const viewportHeight = window.innerHeight * 0.8; // 80% of viewport height
        
        // Calculate dimensions that maintain aspect ratio and fit within viewport
        let width, height;
        
        if (viewportWidth / viewportHeight > aspectRatio) {
            // Viewport is wider than image aspect ratio - constrain by height
            height = viewportHeight;
            width = height * aspectRatio;
        } else {
            // Viewport is taller than image aspect ratio - constrain by width
            width = viewportWidth;
            height = width / aspectRatio;
        }
        
        // Apply the calculated dimensions
        lightboxImage.style.width = width + 'px';
        lightboxImage.style.height = height + 'px';
        lightboxImage.style.maxWidth = 'none';
        lightboxImage.style.maxHeight = 'none';
        lightboxImage.style.objectFit = 'contain';
    }
    
    // Handle window resize to maintain aspect ratio in lightbox
    window.addEventListener('resize', () => {
        if (lightboxModal && lightboxModal.style.display === 'block') {
            preserveAspectRatio();
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