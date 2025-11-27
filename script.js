// script.js - Portfolio Moderne & Sophistiqué

// ========== DOM ELEMENTS ==========
const navbar = document.querySelector('.navbar');
const menuToggle = document.getElementById('menuToggle');
const navbarMenu = document.getElementById('navbarMenu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const fabButton = document.getElementById('fabButton');

// ========== NAVBAR MANAGEMENT ==========
// Sticky navbar on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    navbarMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbarMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Smooth scroll navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ========== ACTIVE NAV LINK ==========
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ========== CONTACT FORM ==========
contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const subject = this.querySelector('input[type="text"]:nth-of-type(2)').value;
    const message = this.querySelector('textarea').value;

    if (name && email && subject && message) {
        const mailSubject = encodeURIComponent(`[Portfolio] ${subject}`);
        const mailBody = encodeURIComponent(
            `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        );
        
        window.location.href = `mailto:jolinetebu@gmail.com?subject=${mailSubject}&body=${mailBody}`;
        
        // Show success message
        showNotification('Message envoyé! Merci de votre contact.', 'success');
        
        // Reset form
        setTimeout(() => this.reset(), 500);
    } else {
        showNotification('Veuillez remplir tous les champs.', 'error');
    }
});

// ========== FAB BUTTON ==========
fabButton.addEventListener('click', () => {
    const phoneNumber = '237657662216';
    const message = encodeURIComponent('Bonjour Joline, je visite votre portfolio et j\'aimerais discuter avec vous.');
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, '_blank');
});

// ========== ANIMATIONS & OBSERVERS ==========

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `slideInUp 0.8s ease forwards`;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll(
    '.section-title, .project-card, .skill-card, .info-card, .about-highlights'
).forEach(el => observer.observe(el));

// ========== SKILL BARS ANIMATION ==========
const skillProgressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            skillProgressObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelector('.skills-grid')?.parentElement?.addEventListener('mouseenter', function() {
    if (!this.dataset.observed) {
        skillProgressObserver.observe(document.querySelector('.skills-section'));
        this.dataset.observed = true;
    }
});

// ========== PARALLAX EFFECT ==========
window.addEventListener('scroll', () => {
    const heroSection = document.querySelector('.hero-section');
    if (heroSection && window.scrollY < window.innerHeight) {
        const scrolled = window.scrollY;
        const orbs = document.querySelectorAll('.gradient-orb');
        orbs.forEach((orb, index) => {
            orb.style.transform = `translateY(${scrolled * (0.5 + index * 0.1)}px)`;
        });
    }
});

// ========== NOTIFICATION SYSTEM ==========
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 16px 24px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.4s ease;
        font-weight: 500;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease';
        setTimeout(() => notification.remove(), 400);
    }, 4000);
}

// ========== FORM INPUT ANIMATION ==========
const formInputs = document.querySelectorAll('.form-input');
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// ========== PROJECT CARDS HOVER ==========
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.addEventListener('mouseenter', function() {
        projectCards.forEach(c => {
            if (c !== this) {
                c.style.opacity = '0.7';
                c.style.filter = 'blur(2px)';
            }
        });
    });
    
    card.addEventListener('mouseleave', function() {
        projectCards.forEach(c => {
            c.style.opacity = '1';
            c.style.filter = 'blur(0)';
        });
    });
});

// ========== FLOATING CARDS INTERACTION ==========
const floatingCards = document.querySelectorAll('.floating-card');
floatingCards.forEach(card => {
    card.addEventListener('click', function() {
        this.style.transform = 'rotateZ(360deg) scale(1.2)';
        setTimeout(() => {
            this.style.transform = '';
        }, 600);
    });
});

// ========== RANDOM GRADIENT COLORS ==========
function getRandomColor() {
    const colors = [
        'linear-gradient(135deg, #6366f1, #ec4899)',
        'linear-gradient(135deg, #06b6d4, #6366f1)',
        'linear-gradient(135deg, #ec4899, #f97316)',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Apply random gradients to floating cards on load
window.addEventListener('load', () => {
    floatingCards.forEach((card, index) => {
        card.style.animation = `bounce ${3 + index * 0.5}s ease-in-out infinite`;
    });
});

// ========== SCROLL TO TOP BUTTON ==========
const scrollButton = document.createElement('button');
scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollButton.style.cssText = `
    position: fixed;
    bottom: 120px;
    right: 40px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #6366f1, #4f46e5);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 5px 15px rgba(99, 102, 241, 0.3);
    font-size: 1.2rem;
`;

document.body.appendChild(scrollButton);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollButton.style.opacity = '1';
        scrollButton.style.visibility = 'visible';
    } else {
        scrollButton.style.opacity = '0';
        scrollButton.style.visibility = 'hidden';
    }
});

scrollButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollButton.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.2) translateY(-5px)';
});

scrollButton.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1) translateY(0)';
});

// ========== PRELOAD IMAGES ==========
function preloadImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const imageLoader = new Image();
        imageLoader.src = img.src;
    });
}

window.addEventListener('load', preloadImages);

// ========== PERFORMANCE OPTIMIZATION ==========
// Debounce scroll events
function debounce(func, wait = 10) {
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

window.addEventListener('scroll', debounce(() => {
    updateActiveNav();
}, 15));

// ========== CONSOLE MESSAGE ==========
console.log('%c🚀 Portfolio Joline - Modern & Sophisticated', 'color: #6366f1; font-size: 16px; font-weight: bold;');
console.log('%c✨ Design & Development by Joline Tebu', 'color: #ec4899; font-size: 12px;');
console.log('%c📱 Responsive • ⚡ Fast • 🎨 Beautiful', 'color: #06b6d4; font-size: 11px;');