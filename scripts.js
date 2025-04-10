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

// Skill progress animations
function initSkillMeters() {
    const skillMeters = document.querySelectorAll('.skill-meter');
    
    skillMeters.forEach(meter => {
        const progressBar = meter.querySelector('.skill-progress');
        const percent = progressBar.getAttribute('data-percent');
        
        // Animate the progress bars
        if (progressBar) {
            progressBar.style.width = '0';
            setTimeout(() => {
                progressBar.style.width = `${percent}%`;
            }, 300);
        }
    });
}

// Initialize skill meters on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize progress bars
    initSkillMeters();
    
    // Add subtle parallax effect to shapes
    const shapes = document.querySelectorAll('.shape, .glow');
    
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
});

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