// ========================================
// DÉTECTION DU JOUR J
// Le site bascule en mode "Jour J" à partir du 5 avril 2026
// ========================================

function isWeddingDay() {
    const now = new Date();
    const weddingDay = new Date('2026-04-05T00:00:00');
    return now >= weddingDay;
}

function activateWeddingDayMode() {
    // Ajoute la classe qui cache tout sauf le hero (via CSS)
    document.body.classList.add('wedding-day');

    // Masque l'enveloppe intro → on affiche directement le hero
    const intro = document.getElementById('intro');
    if (intro) {
        intro.style.display = 'none';
    }

    // Débloque le scroll
    document.body.style.overflow = 'auto';

    // Lance la musique immédiatement (interaction pas requise sur Jour J)
    // On crée un bouton discret pour lancer la musique (contournement autoplay)
    const musicBtn = document.createElement('button');
    musicBtn.id = 'music-btn';
    musicBtn.innerHTML = '♪ Musique';
    musicBtn.style.cssText = `
        position: fixed;
        bottom: 1.5rem;
        right: 1.5rem;
        z-index: 999;
        background: rgba(212, 165, 116, 0.9);
        color: white;
        border: none;
        border-radius: 9999px;
        padding: 0.6rem 1.2rem;
        font-family: 'Inter', sans-serif;
        font-size: 0.85rem;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transition: opacity 0.3s ease;
    `;
    document.body.appendChild(musicBtn);

    musicBtn.addEventListener('click', () => {
        playMusic();
        musicBtn.style.opacity = '0';
        setTimeout(() => musicBtn.remove(), 400);
    });
}


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
    } else if (!audio.paused === false) {
        // Ne reprend que si la musique avait déjà été lancée
        audio.play().catch(() => {});
    }
});


// ========================================
// ENVELOPE / INTRO  (mode normal uniquement)
// ========================================
// ANIMATION LETTRE PAR LETTRE — Noms
// ========================================

function animateHeroNames() {
    const namesEl = document.querySelector('.hero-names');
    if (!namesEl) return;

    const fullText = namesEl.textContent.trim();
    namesEl.textContent = '';
    namesEl.style.opacity = '1'; // annule l'animation CSS d'origine

    [...fullText].forEach((char, i) => {
        const span = document.createElement('span');
        span.className = 'letter-reveal';
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.animationDelay = `${i * 80}ms`;
        namesEl.appendChild(span);
    });
}


// ========================================

const envelope = document.getElementById('envelope');
const intro = document.getElementById('intro');

if (envelope) {
    envelope.addEventListener('click', () => {
        envelope.style.pointerEvents = 'none';

        // Lance la musique dès le clic
        playMusic();

        // Ouvre l'enveloppe
        envelope.classList.add('open');

        setTimeout(() => {
            intro.style.opacity = '0';
            intro.style.transition = 'opacity 1.5s ease';

            setTimeout(() => {
                intro.style.display = 'none';
                document.body.style.overflow = 'auto';
                // Lance l'animation des noms juste après l'ouverture
                animateHeroNames();
            }, 1500);

        }, 3000);
    });
}


// ========================================
// COUNTDOWN TIMER
// ========================================

function initCountdown() {
    const weddingDate = new Date('2026-04-05T16:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance > 0) {
            const days    = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours   = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').textContent    = String(days).padStart(2, '0');
            document.getElementById('hours').textContent   = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        } else {
            ['days','hours','minutes','seconds'].forEach(id => {
                document.getElementById(id).textContent = '00';
            });
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}


// ========================================
// SCROLL ANIMATIONS
// ========================================

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { root: null, rootMargin: '-100px', threshold: 0.1 });

    document.querySelectorAll('.fade-on-scroll').forEach(el => observer.observe(el));
}


// ========================================
// SMOOTH SCROLL
// ========================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}


// ========================================
// SCROLL INDICATOR
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
// CARD EFFECTS
// ========================================

function initCardEffects() {
    document.querySelectorAll('.event-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s ease';
        });
    });
}

function initCountdownCardEffects() {
    document.querySelectorAll('.countdown-card').forEach((card, index) => {
        card.style.animationDelay = `${0.2 + index * 0.1}s`;
    });
}


// ========================================
// PERFORMANCE
// ========================================

function optimizePerformance() {
    document.body.classList.add('loading');
    window.addEventListener('load', () => document.body.classList.remove('loading'));
}

function initRSVPTracking() {
    const rsvpButton = document.querySelector('.rsvp-button');
    if (rsvpButton) {
        rsvpButton.addEventListener('click', () => console.log('RSVP button clicked'));
    }
}

function fixMobileViewport() {
    const set = () => document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    set();
    window.addEventListener('resize', set);
}


// ========================================
// ACCESSIBILITY
// ========================================

function initAccessibility() {
    document.body.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') document.body.classList.add('keyboard-navigation');
    });
    document.body.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
}


// ========================================
// INIT
// ========================================

document.addEventListener('DOMContentLoaded', () => {

    // ★ Vérifie si c'est le Jour J
    if (isWeddingDay()) {
        activateWeddingDayMode();
        // En mode Jour J : pas de countdown, pas de scroll animations inutiles
        return;
    }

    // Mode normal (avant le 5 avril)
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

document.addEventListener('DOMContentLoaded', initAccessibility);

window.addEventListener('beforeprint', () => console.log('Preparing page for printing...'));
window.addEventListener('afterprint', () => console.log('Print completed'));
