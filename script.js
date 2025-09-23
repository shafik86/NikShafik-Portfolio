/**
 * Bootstrap Portfolio JavaScript
 * Modern, clean, and performant
 */

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

/**
 * Initialize Application
 */
function initializeApp() {
    initThemeToggle();
    initCounterAnimations();
    initTypingEffect();
    initSmoothScrolling();
    initContactForm();
    initScrollSpy();
    initIntersectionObserver();
    
    console.log('🚀 Bootstrap Portfolio loaded successfully!');
    console.log('📱 Mobile-optimized with Bootstrap 5.3');
    console.log('🌙 Dark mode toggle active');
    console.log('⚡ Performance optimizations applied');
}

/**
 * Theme Toggle Functionality
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const html = document.documentElement;
    
    // Load saved theme or default to light
    const savedTheme = localStorage.getItem('bs-theme') || 'light';
    html.setAttribute('data-bs-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // Theme toggle event listener
    themeToggle?.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-bs-theme', newTheme);
        localStorage.setItem('bs-theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add smooth transition
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    });
    
    function updateThemeIcon(theme) {
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'bi bi-sun' : 'bi bi-moon';
        }
    }
}

/**
 * Counter Animations
 */
function initCounterAnimations() {
    // Hero counters
    const heroCounters = document.querySelectorAll('[data-counter]');
    // Client stats counters
    const statCounters = document.querySelectorAll('[data-counter-stat]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    // Observe hero counters
    heroCounters.forEach(counter => counterObserver.observe(counter));
    
    // Observe stat counters with delay
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    animateCounter(entry.target, true);
                }, index * 200);
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statCounters.forEach(counter => statObserver.observe(counter));
}

/**
 * Animate Counter Function
 */
function animateCounter(element, isStat = false) {
    const target = parseInt(element.getAttribute(isStat ? 'data-counter-stat' : 'data-counter'));
    const originalText = element.textContent;
    let suffix = '+';
    
    // Determine suffix based on original text
    if (originalText.includes('%')) suffix = '%';
    else if (target === 3 || target === 2) suffix = '';
    
    let current = 0;
    const increment = target / 50; // 50 steps
    const duration = 500; // 5 seconds
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
            
            // Add completed animation class
            element.classList.add('counter-completed');
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, stepTime);
}

/**
 * Typing Effect for Hero Title
 */
function initTypingEffect() {
    const heroTitle = document.getElementById('heroTitle');
    const text = 'Nik Mohd Shafik Izwan';
    
    if (heroTitle) {
        setTimeout(() => {
            typeWriter(heroTitle, text, 100);
        }, 800);
    }
}

/**
 * Type Writer Function
 */
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    element.classList.add('typing-animation');
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Remove typing cursor after completion
            setTimeout(() => {
                element.classList.remove('typing-animation');
            }, 1000);
        }
    }
    
    type();
}

/**
 * Smooth Scrolling for Anchor Links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = 80;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile navbar if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                        toggle: false
                    });
                    bsCollapse.hide();
                }
            }
        });
    });
}

/**
 * Contact Form Handling
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Create mailto link
        const mailtoLink = `mailto:nikshafik186@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success toast
        showToast('Thank you for your message! Your email client should open now.', 'success');
        
        // Reset form
        this.reset();
    });
}

/**
 * Show Toast Notification
 */
function showToast(message, type = 'info') {
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
        toastContainer.style.zIndex = '1080';
        document.body.appendChild(toastContainer);
    }
    
    // Create toast
    const toastId = 'toast-' + Date.now();
    const bgClass = type === 'success' ? 'bg-success' : 'bg-primary';
    
    const toastHTML = `
        <div id="${toastId}" class="toast ${bgClass} text-white" role="alert">
            <div class="d-flex">
                <div class="toast-body">
                    <i class="bi bi-${type === 'success' ? 'check-circle' : 'info-circle'} me-2"></i>
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;
    
    toastContainer.insertAdjacentHTML('beforeend', toastHTML);
    
    // Initialize and show toast
    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement, {
        autohide: true,
        delay: 5000
    });
    
    toast.show();
    
    // Remove toast element after it's hidden
    toastElement.addEventListener('hidden.bs.toast', () => {
        toastElement.remove();
    });
}

/**
 * Initialize ScrollSpy
 */
function initScrollSpy() {
    // Bootstrap ScrollSpy is initialized via data attributes in HTML
    // This function handles additional scroll-based animations
    
    window.addEventListener('scroll', throttle(() => {
        const navbar = document.querySelector('.navbar');
        
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    }, 100));
}

/**
 * Initialize Intersection Observer for Animations
 */
function initIntersectionObserver() {
    const animatedElements = document.querySelectorAll('.card, .badge');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach((element, index) => {
        // Set initial state
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `all 0.6s ease ${index * 0.1}s`;
        
        observer.observe(element);
    });
}

/**
 * Utility Functions
 */

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Performance Optimizations
 */

// Preload critical images
function preloadImages() {
    const imageUrls = ['Shafik-Passport.png'];
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Lazy load non-critical resources
function lazyLoadResources() {
    // Add lazy loading for images if needed
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

/**
 * Handle Window Resize
 */
window.addEventListener('resize', debounce(() => {
    // Handle responsive adjustments
    const navbar = document.querySelector('.navbar-collapse');
    if (window.innerWidth > 992 && navbar?.classList.contains('show')) {
        bootstrap.Collapse.getInstance(navbar)?.hide();
    }
}, 250));

/**
 * Handle Page Visibility
 */
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden - pause animations
        document.body.style.animationPlayState = 'paused';
    } else {
        // Page is visible - resume animations
        document.body.style.animationPlayState = 'running';
    }
});

/**
 * Error Handling
 */
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // Could send to analytics service
});

// Initialize preloading
preloadImages();
lazyLoadResources();
