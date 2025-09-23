// Loading Screen
window.addEventListener('load', function() {
    const loading = document.getElementById('loading');
    setTimeout(() => {
        loading.classList.add('hide');
    }, 1000);
});

// Smooth scrolling for navigation links
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

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Contact form handling
document.querySelector('.contact-form form').addEventListener('submit', function(e) {
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
    
    // Show success message
    alert('Thank you for your message! Your email client should open now.');
    
    // Reset form
    this.reset();
});

// Add interactive effects for cards
document.querySelectorAll('.product-card, .company-card, .skill-category').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    element.style.opacity = '1';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect after page load
setTimeout(() => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        typeWriter(heroTitle, 'Nik Mohd Shafik Izwan', 150);
    }
}, 1500);

// Animate stats counter
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    updateCounter();
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach((stat, index) => {
                const targets = [13, 2, 5];
                setTimeout(() => {
                    animateCounter(stat, targets[index]);
                }, index * 200);
            });
            statsObserver.unobserve(entry.target);
        }
    });
});

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Client stats animation
const clientStatsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-item .stat-number');
            statNumbers.forEach((stat, index) => {
                const targets = [5, 10, 100, 3];
                const suffixes = ['+', '+', '%', ''];
                setTimeout(() => {
                    animateCounterWithSuffix(stat, targets[index], suffixes[index]);
                }, index * 300);
            });
            clientStatsObserver.unobserve(entry.target);
        }
    });
});

function animateCounterWithSuffix(element, target, suffix = '+', duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + suffix;
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + suffix;
        }
    }
    updateCounter();
}

const clientStats = document.querySelector('.client-stats');
if (clientStats) {
    clientStatsObserver.observe(clientStats);
}

// Client card interactions
document.querySelectorAll('.client-card').forEach((card, index) => {
    // Add staggered animation delay
    card.style.setProperty('--card-index', index);
    
    // Enhanced hover effects
    card.addEventListener('mouseenter', function() {
        // Add floating animation
        this.style.transform = 'translateY(-15px) scale(1.02)';
        this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        
        // Animate tech tags
        const techTags = this.querySelectorAll('.tech-tag');
        techTags.forEach((tag, tagIndex) => {
            setTimeout(() => {
                tag.style.transform = 'translateY(-3px) scale(1.05)';
                tag.style.background = 'var(--primary-color)';
                tag.style.color = 'var(--white)';
            }, tagIndex * 100);
        });
        
        // Animate client logo
        const logo = this.querySelector('.client-logo');
        if (logo) {
            logo.style.transform = 'rotate(5deg) scale(1.1)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.transition = 'all 0.3s ease';
        
        // Reset tech tags
        const techTags = this.querySelectorAll('.tech-tag');
        techTags.forEach(tag => {
            tag.style.transform = 'translateY(0) scale(1)';
            tag.style.background = 'var(--bg-light)';
            tag.style.color = 'var(--primary-color)';
        });
        
        // Reset client logo
        const logo = this.querySelector('.client-logo');
        if (logo) {
            logo.style.transform = 'rotate(0deg) scale(1)';
        }
    });
    
    // Click effect for client cards
    card.addEventListener('click', function() {
        const project = this.dataset.project;
        showProjectModal(project);
    });
});

// Project modal functionality
function showProjectModal(projectId) {
    const projectData = {
        sbtape: {
            title: 'SBTAPE Sdn Bhd - Coating Production System',
            description: 'Comprehensive system maintenance and feature enhancement for coating production operations.',
            details: [
                'Maintained legacy .NET production systems',
                'Added new features based on user requirements',
                'Improved system efficiency and reliability',
                'Implemented quality control modules'
            ],
            technologies: ['.NET Framework', 'C#', 'SQL Server', 'WinForms', 'Crystal Reports'],
            duration: '2014 - 2018',
            role: 'IT Executive & System Developer'
        },
        jpnin: {
            title: 'JPNIN - E-Fokus Mapping Platform',
            description: 'Advanced mapping and analysis platform for national unity issues.',
            details: [
                'Developed Maps-based mapping solution',
                'Implemented data analytics for unity issues',
                'Created interactive dashboards',
                'Integrated with government databases'
            ],
            technologies: ['Maps Technology', 'Web Mapping', 'Analytics Engine', 'Government APIs'],
            duration: 'Government Project',
            role: 'Lead Developer',
            link: 'efokus.jpnin.gov.my'
        },
        iwk: {
            title: 'IWK - New Billing System',
            description: 'All-in-one internal ERP system for operational management.',
            details: [
                'Designed comprehensive billing architecture',
                'Integrated multiple operational modules',
                'Implemented automated workflows',
                'Created management dashboards'
            ],
            technologies: ['.NET Core', 'Entity Framework', 'SQL Server', 'REST APIs', 'Angular'],
            duration: 'Enterprise Project',
            role: 'System Architect & Developer'
        },
        rela: {
            title: 'RELA - Mapping and Prediction System',
            description: 'Intelligent mapping system for volunteer member management and location optimization.',
            details: [
                'Developed member tracking system',
                'Implemented location-based analytics',
                'Created predictive algorithms',
                'Built real-time monitoring dashboard'
            ],
            technologies: ['GIS Mapping', 'Machine Learning', 'Location Services', 'Real-time Analytics'],
            duration: 'Government Agency Project',
            role: 'AI Developer & System Designer'
        },
        felcra: {
            title: 'Felcra Berhad - Farm Sense Device',
            description: 'IoT-based wildlife detection system for palm oil plantation protection.',
            details: [
                'Developed IoT sensor network',
                'Implemented AI-based animal detection',
                'Created early warning system',
                'Built mobile monitoring app'
            ],
            technologies: ['IoT Sensors', 'ESP32', 'Machine Learning', 'Mobile App', 'Real-time Alerts'],
            duration: 'Agriculture Innovation Project',
            role: 'IoT Solution Architect'
        }
    };
    
    const project = projectData[projectId];
    if (!project) return;
    
    // Create modal HTML
    const modalHTML = `
        <div class="project-modal" id="projectModal">
            <div class="modal-backdrop"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${project.title}</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p class="project-description">${project.description}</p>
                    
                    <div class="project-info">
                        <div class="info-item">
                            <strong>Duration:</strong> ${project.duration}
                        </div>
                        <div class="info-item">
                            <strong>Role:</strong> ${project.role}
                        </div>
                        ${project.link ? `<div class="info-item">
                            <strong>Website:</strong> <a href="https://${project.link}" target="_blank">${project.link}</a>
                        </div>` : ''}
                    </div>
                    
                    <div class="project-details">
                        <h4>Key Achievements:</h4>
                        <ul>
                            ${project.details.map(detail => `<li>${detail}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="project-technologies">
                        <h4>Technologies Used:</h4>
                        <div class="tech-tags">
                            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add modal styles
    const modalStyles = `
        <style>
            .project-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: modalFadeIn 0.3s ease;
            }
            
            .modal-backdrop {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(5px);
            }
            
            .modal-content {
                background: white;
                border-radius: 20px;
                max-width: 600px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                position: relative;
                z-index: 2;
                animation: modalSlideUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            
            .modal-header {
                padding: 2rem 2rem 1rem;
                border-bottom: 2px solid var(--bg-light);
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
            }
            
            .modal-header h2 {
                color: var(--primary-color);
                margin: 0;
                font-size: 1.4rem;
                line-height: 1.3;
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                color: var(--text-light);
                padding: 0;
                margin-left: 1rem;
                transition: color 0.3s ease;
            }
            
            .modal-close:hover {
                color: var(--accent-color);
            }
            
            .modal-body {
                padding: 2rem;
            }
            
            .project-description {
                font-size: 1.1rem;
                margin-bottom: 2rem;
                color: var(--text-light);
                line-height: 1.6;
            }
            
            .project-info {
                display: grid;
                gap: 0.5rem;
                margin-bottom: 2rem;
                padding: 1.5rem;
                background: var(--bg-light);
                border-radius: 15px;
            }
            
            .info-item {
                color: var(--text-dark);
            }
            
            .info-item strong {
                color: var(--primary-color);
            }
            
            .info-item a {
                color: var(--accent-color);
                text-decoration: none;
            }
            
            .project-details {
                margin-bottom: 2rem;
            }
            
            .project-details h4,
            .project-technologies h4 {
                color: var(--primary-color);
                margin-bottom: 1rem;
            }
            
            .project-details ul {
                padding-left: 1.5rem;
                color: var(--text-light);
            }
            
            .project-details li {
                margin-bottom: 0.5rem;
                line-height: 1.5;
            }
            
            .project-technologies .tech-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
            }
            
            .project-technologies .tech-tag {
                background: var(--primary-color);
                color: white;
                padding: 0.4rem 1rem;
                border-radius: 20px;
                font-size: 0.9rem;
                font-weight: 500;
            }
            
            @keyframes modalFadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes modalSlideUp {
                from {
                    opacity: 0;
                    transform: translateY(50px) scale(0.9);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
            
            @media (max-width: 768px) {
                .modal-content {
                    width: 95%;
                    margin: 1rem;
                }
                
                .modal-header {
                    padding: 1.5rem 1.5rem 1rem;
                }
                
                .modal-body {
                    padding: 1.5rem;
                }
                
                .modal-header h2 {
                    font-size: 1.2rem;
                }
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', modalStyles);
    
    // Add event listeners
    const modal = document.getElementById('projectModal');
    const backdrop = modal.querySelector('.modal-backdrop');
    const closeBtn = modal.querySelector('.modal-close');
    
    function closeModal() {
        modal.style.animation = 'modalFadeIn 0.3s ease reverse';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
    
    backdrop.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        const rate = scrolled * -0.5;
        heroContent.style.transform = `translateY(${rate}px)`;
    }
});

// Dynamic background animation
function createFloatingShapes() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 5; i++) {
        const shape = document.createElement('div');
        shape.className = 'floating-shape';
        shape.style.cssText = `
            position: absolute;
            width: ${Math.random() * 100 + 50}px;
            height: ${Math.random() * 100 + 50}px;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float-around ${Math.random() * 10 + 10}s infinite linear;
        `;
        hero.appendChild(shape);
    }
}

// Add floating shapes animation
const floatingShapesCSS = `
    <style>
        @keyframes float-around {
            0% {
                transform: translate(0, 0) rotate(0deg);
                opacity: 0.3;
            }
            25% {
                transform: translate(100px, -100px) rotate(90deg);
                opacity: 0.6;
            }
            50% {
                transform: translate(-50px, -200px) rotate(180deg);
                opacity: 0.3;
            }
            75% {
                transform: translate(-150px, -50px) rotate(270deg);
                opacity: 0.8;
            }
            100% {
                transform: translate(0, 0) rotate(360deg);
                opacity: 0.3;
            }
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', floatingShapesCSS);

// Initialize floating shapes
setTimeout(createFloatingShapes, 2000);

// Smooth reveal animation for client cards
const clientCardsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 150);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.client-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    clientCardsObserver.observe(card);
});

console.log('🚀 Portfolio loaded successfully!');
