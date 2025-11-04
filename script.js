// script.js

// Navigation scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        }
    });
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function activateNavLink() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
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

window.addEventListener('scroll', activateNavLink);

// Contact form submission - Send to Gmail
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (name && email && message) {
            // Create mailto link with form data
            const subject = encodeURIComponent(`Nouveau message de ${name} via Portfolio`);
            const body = encodeURIComponent(
                `Nom: ${name}\n` +
                `Email: ${email}\n\n` +
                `Message:\n${message}`
            );
            const mailtoLink = `mailto:jolinetebu@gmail.com?subject=${subject}&body=${body}`;
            
            // Open default email client
            window.location.href = mailtoLink;
            
            // Show success message
            alert('Votre client email va s\'ouvrir pour envoyer le message. Merci !');
            
            // Reset form after short delay
            setTimeout(() => {
                contactForm.reset();
            }, 1000);
        } else {
            alert('Veuillez remplir tous les champs du formulaire.');
        }
    });
}

// Chat button functionality - Redirect to WhatsApp
const chatButton = document.querySelector('.chat-button button');
if (chatButton) {
    chatButton.addEventListener('click', function() {
        // WhatsApp number (country code + number without +)
        const phoneNumber = '237657662216'; // Cameroon country code + your number
        const message = encodeURIComponent('Bonjour Joline, je visite votre portfolio et j\'aimerais discuter avec vous.');
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
        
        // Open WhatsApp in new tab
        window.open(whatsappURL, '_blank');
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.section-title, .hero-title, .project-image, .skill-badge');
    animatedElements.forEach(el => observer.observe(el));
});

// Navbar background change on scroll
let lastScroll = 0;
window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        document.querySelector('.navbar').style.boxShadow = 'none';
    } else {
        document.querySelector('.navbar').style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
    
    lastScroll = currentScroll;
});

// Social icons hover effect
const socialIcons = document.querySelectorAll('.social-icon');
socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(5px) scale(1.1)';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0) scale(1)';
    });
});

// Project cards hover effect
const projectImages = document.querySelectorAll('.project-image');
projectImages.forEach(project => {
    project.addEventListener('mouseenter', function() {
        this.querySelector('img').style.transform = 'scale(1.08)';
    });
    
    project.addEventListener('mouseleave', function() {
        this.querySelector('img').style.transform = 'scale(1)';
    });
});

// Skills badges animation on hover
const skillBadges = document.querySelectorAll('.skill-badge');
skillBadges.forEach(badge => {
    badge.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    badge.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(function() {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Mobile menu close on link click
const mobileLinks = document.querySelectorAll('.navbar-nav .nav-link');
const navbarToggler = document.querySelector('.navbar-toggler');

mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
        if (window.innerWidth < 992) {
            navbarToggler.click();
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const scrolled = window.pageYOffset;
        heroSection.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Form input focus effects
const formInputs = document.querySelectorAll('.form-control');
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.querySelector('.form-label').style.color = 'var(--primary-color)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.querySelector('.form-label').style.color = '';
    });
});

// Console message
console.log('%c👋 Bienvenue sur mon portfolio !', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cDéveloppé par Joline', 'color: #4f46e5; font-size: 14px;');