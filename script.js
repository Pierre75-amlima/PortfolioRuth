// ===== SCROLL PROGRESS BAR =====
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.getElementById('scrollProgress').style.width = scrollPercent + '%';
});

// ===== SMOOTH SCROLL NAVIGATION =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

// ===== MOBILE MENU TOGGLE =====
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// ===== PORTFOLIO FILTER =====
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        // Remove active class from all buttons
        document.querySelectorAll('.filter-btn').forEach(b => {
            b.classList.remove('active', 'bg-amber-400/20', 'text-amber-300', 'border-amber-400/50');
            b.classList.add('border-white/10', 'text-white/70');
        });

        // Add active class to clicked button
        this.classList.add('active', 'bg-amber-400/20', 'text-amber-300', 'border-amber-400/50');
        this.classList.remove('border-white/10', 'text-white/70');

        // Filter portfolio items
        const filter = this.getAttribute('data-filter');
        const items = document.querySelectorAll('.portfolio-item');

        items.forEach(item => {
            const category = item.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===== SCROLL REVEAL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .portfolio-item, .skill-bar').forEach(el => {
    el.classList.add('scroll-reveal');
    observer.observe(el);
});

// ===== SKILL BARS ANIMATION =====
const skillBars = document.querySelectorAll('.skill-bar');
const skillsSection = document.getElementById('skills');
let skillsAnimated = false;

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !skillsAnimated) {
            skillsAnimated = true;
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.transition = 'width 1.5s ease-out';
                    bar.style.width = width;
                }, 100);
            });
        }
    });
}, { threshold: 0.5 });

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// ===== FORM SUBMISSION =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const button = contactForm.querySelector('button');
        const originalText = button.textContent;

        button.disabled = true;
        button.textContent = 'Envoi en cours...';

        // Simulate form submission
        setTimeout(() => {
            button.textContent = '✓ Message envoyé avec succès !';
            button.classList.add('bg-green-500', 'hover:bg-green-600');

            setTimeout(() => {
                button.disabled = false;
                button.textContent = originalText;
                button.classList.remove('bg-green-500', 'hover:bg-green-600');
                contactForm.reset();
            }, 3000);
        }, 1500);
    });
}

// ===== LAZY LOADING IMAGES =====
const lazyImages = document.querySelectorAll('img[loading="lazy"]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => {
    imageObserver.observe(img);
});

// ===== ACTIVE NAV LINK ON SCROLL =====
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`a[href="#${sectionId}"]`);

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
});

// ===== GSAP ANIMATIONS (if GSAP is loaded) =====
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Animate service cards on scroll
    gsap.utils.toArray('.service-card').forEach((card) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                end: 'top 50%',
                scrub: 1,
                markers: false
            },
            opacity: 0,
            y: 50,
            duration: 0.6
        });
    });

    // Animate portfolio items
    gsap.utils.toArray('.portfolio-item').forEach((item) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 75%',
                end: 'top 50%',
                scrub: 1
            },
            opacity: 0,
            y: 50,
            duration: 0.6
        });
    });
}

// ===== PARALLAX EFFECT (Light) =====
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const elements = document.querySelectorAll('[data-parallax]');
    
    elements.forEach(el => {
        const speed = el.getAttribute('data-parallax') || 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== MICRO-INTERACTIONS =====
// Button ripple effect
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// ===== PRELOAD CRITICAL IMAGES =====
window.addEventListener('load', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.classList.add('loaded');
    });
});

// ===== PERFORMANCE: DEBOUNCE SCROLL =====
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Update scroll progress
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            document.getElementById('scrollProgress').style.width = scrollPercent + '%';
            
            ticking = false;
        });
        ticking = true;
    }
});

// ===== INITIALIZE ON DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded successfully');
    
    // Add animation classes to elements
    document.querySelectorAll('.service-card').forEach((el, index) => {
        el.style.animationDelay = (index * 0.1) + 's';
    });
});
