// ========================================
// AUDIO PLAYER
// ========================================

const audio = new Audio('music.mp3');
audio.loop = true;
audio.volume = 0.6;

function playMusic() {
    audio.play().catch(err => console.log('Audio error:', err));
}

function stopMusic() {
    audio.pause();
    audio.currentTime = 0;
}

window.addEventListener('beforeunload', stopMusic);
window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
        audio.pause();
    } else {
        audio.play();
    }
});


// ========================================
// ENVELOPE / INTRO
// ========================================

const envelope = document.getElementById('envelope');
const intro = document.getElementById('intro');
const site = document.getElementById('site');

envelope.addEventListener('click', () => {
  // Empêcher double clic
  envelope.style.pointerEvents = 'none';

  // Lancer la musique dès le clic
  playMusic();

  // Ouvrir l'enveloppe
  envelope.classList.add('open');

  // Attente CINÉMATIQUE
  setTimeout(() => {
    intro.style.opacity = '0';
    intro.style.transition = 'opacity 1.5s ease';

    setTimeout(() => {
      intro.style.display = 'none';
      document.body.style.overflow = 'auto';
    }, 1500);

  }, 3000);
});


// ========================================
// COUNTDOWN TIMER
// ========================================

function initCountdown() {
    // Wedding date: April 05, 2026, 16:00
    const weddingDate = new Date('2026-04-05T16:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = String(days).padStart(2, '0');
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        } else {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ========================================
// SCROLL ANIMATIONS
// ========================================

function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '-100px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-on-scroll');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
}

// ========================================
// PARALLAX SCROLL EFFECT (OPTIONAL)
// ========================================

function initParallax() {
    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-section');
        if (hero) {
            const parallaxSpeed = 0.5;
            hero.style.backgroundPositionY = `${scrolled * parallaxSpeed}px`;
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

// ========================================
// MOUSE SCROLL INDICATOR HIDE ON SCROLL
// ========================================

function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        });
    }
}

// ========================================
// EVENT CARD HOVER EFFECTS
// ========================================

function initCardEffects() {
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s ease';
        });
    });
}

// ========================================
// COUNTDOWN CARD ANIMATIONS
// ========================================

function initCountdownCardEffects() {
    const countdownCards = document.querySelectorAll('.countdown-card');
    countdownCards.forEach((card, index) => {
        card.style.animationDelay = `${0.2 + index * 0.1}s`;
    });
}

// ========================================
// LOADING OPTIMIZATION
// ========================================

function optimizePerformance() {
    document.body.classList.add('loading');
    window.addEventListener('load', () => {
        document.body.classList.remove('loading');
    });

    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => { img.src = img.dataset.src; });
    }
}

// ========================================
// WHATSAPP BUTTON ANALYTICS (OPTIONAL)
// ========================================

function initRSVPTracking() {
    const rsvpButton = document.querySelector('.rsvp-button');
    if (rsvpButton) {
        rsvpButton.addEventListener('click', () => {
            console.log('RSVP button clicked');
        });
    }
}

// ========================================
// VIEWPORT HEIGHT FIX FOR MOBILE
// ========================================

function fixMobileViewport() {
    const setViewportHeight = () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
}

// ========================================
// FORM VALIDATION
// ========================================

function initFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const isValid = validateForm(this);
            if (!isValid) e.preventDefault();
        });
    });
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    return isValid;
}

// ========================================
// INITIALIZE ALL FUNCTIONS
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    initScrollAnimations();
    initSmoothScroll();
    initScrollIndicator();
    initCardEffects();
    initCountdownCardEffects();
    initRSVPTracking();
    fixMobileViewport();
    optimizePerformance();

    console.log('Wedding invitation loaded successfully! 💐');
});

// ========================================
// UTILITY FUNCTIONS
// ========================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => { clearTimeout(timeout); func(...args); };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========================================
// ACCESSIBILITY ENHANCEMENTS
// ========================================

function initAccessibility() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') { /* Close modal logic here */ }
    });

    document.body.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') document.body.classList.add('keyboard-navigation');
    });

    document.body.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
}

document.addEventListener('DOMContentLoaded', initAccessibility);

// ========================================
// PRINT STYLES HANDLING
// ========================================

window.addEventListener('beforeprint', () => { console.log('Preparing page for printing...'); });
window.addEventListener('afterprint', () => { console.log('Print completed'); });