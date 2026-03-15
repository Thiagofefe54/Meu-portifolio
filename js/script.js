/* --- 1. TYPEWRITER --- */
const textElement = document.querySelector('.typewriter');
const phrases = ["Sistemas Complexos.", "Interfaces Modernas.", "o Futuro.", "Soluções em IA."];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
        textElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(type, 2000); 
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 50 : 100);
    }
}
document.addEventListener('DOMContentLoaded', type);

/* --- 2. MATRIX BG (VERMELHO NEON) --- */
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = [];
for (let x = 0; x < columns; x++) drops[x] = 1;

function drawMatrix() {
    ctx.fillStyle = 'rgba(10, 10, 12, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ff073a'; /* VERMELHO NEON */
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    }
}
setInterval(drawMatrix, 33);
window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });

/* --- 3. GSAP ANIMAÇÕES --- */
gsap.registerPlugin(ScrollTrigger);

// Hero - Entrada cinematográfica
gsap.from('.badge', { 
    opacity: 0, y: -30, duration: 0.8, delay: 0.3, ease: 'back.out(1.7)' 
});

gsap.from('h1', { 
    opacity: 0, y: 50, duration: 1, delay: 0.5, ease: 'power3.out' 
});

gsap.from('.hero p', { 
    opacity: 0, y: 30, duration: 0.8, delay: 0.8, ease: 'power2.out' 
});

gsap.from('.botoes a', { 
    opacity: 0, y: 30, duration: 0.6, stagger: 0.2, delay: 1, ease: 'power2.out' 
});

gsap.from('.hero-img img', { 
    opacity: 0, scale: 0.5, rotation: -10, duration: 1.2, delay: 0.5, ease: 'elastic.out(1, 0.5)' 
});

// Efeito Glow pulsante na foto
gsap.to('.hero-img img', {
    boxShadow: '0 0 40px rgba(255, 7, 58, 0.5), 0 0 80px rgba(255, 7, 58, 0.2)',
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
});

// Títulos das seções - aparecem com estilo
gsap.utils.toArray('.projetos-section h2, .servicos-section h2, .sobre-section h2, .contato-info h2').forEach(title => {
    gsap.from(title, {
        scrollTrigger: {
            trigger: title,
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 60,
        duration: 1,
        ease: 'power3.out'
    });
});

// Cards de Projeto - entram em cascata
gsap.utils.toArray('.card-projeto').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 80,
        scale: 0.9,
        duration: 0.8,
        delay: i * 0.15,
        ease: 'power3.out'
    });
});

// Cards de Serviço - entram com rotação leve
gsap.utils.toArray('.card-servico').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 60,
        rotateX: 15,
        duration: 0.8,
        delay: i * 0.2,
        ease: 'power3.out'
    });
});

// Skill boxes - efeito dominó
gsap.utils.toArray('.skill-box').forEach((box, i) => {
    gsap.from(box, {
        scrollTrigger: {
            trigger: box,
            start: 'top 90%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        scale: 0,
        duration: 0.5,
        delay: i * 0.1,
        ease: 'back.out(1.7)'
    });
});

// Contato - info entra da esquerda, form da direita
gsap.from('.contato-info', {
    scrollTrigger: {
        trigger: '.contato-section',
        start: 'top 70%',
        toggleActions: 'play none none none'
    },
    opacity: 0,
    x: -80,
    duration: 1,
    ease: 'power3.out'
});

gsap.from('.form-contato', {
    scrollTrigger: {
        trigger: '.contato-section',
        start: 'top 70%',
        toggleActions: 'play none none none'
    },
    opacity: 0,
    x: 80,
    duration: 1,
    delay: 0.2,
    ease: 'power3.out'
});

// Navbar - muda cor no scroll
ScrollTrigger.create({
    start: 'top -100',
    end: 99999,
    toggleClass: { className: 'scrolled', targets: 'nav' }
});

/* --- 4. MENU MOBILE --- */
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = menuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
    });
});