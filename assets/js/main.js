/**
 * SafeQueue Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initRTL();
    initMobileNav();
    initScrollHeader();
    initPasswordToggle();
});

// Password Toggle
function initPasswordToggle() {
    const toggles = document.querySelectorAll('.toggle-password');
    toggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.parentElement.querySelector('input');
            const icon = btn.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('ph-eye');
                icon.classList.add('ph-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('ph-eye-slash');
                icon.classList.add('ph-eye');
            }
        });
    });
}

// Theme Management
function initTheme() {
    const themeToggle = document.querySelectorAll('.theme-toggle');
    const html = document.documentElement;
    const currentTheme = localStorage.getItem('theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    html.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    themeToggle.forEach(btn => {
        btn.addEventListener('click', () => {
            const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    });
}

function updateThemeIcon(theme) {
    const icons = document.querySelectorAll('.theme-toggle i');
    icons.forEach(icon => {
        if (theme === 'dark') {
            icon.classList.remove('ph-moon');
            icon.classList.add('ph-sun');
        } else {
            icon.classList.remove('ph-sun');
            icon.classList.add('ph-moon');
        }
    });
}

// RTL Management
function initRTL() {
    const rtlToggle = document.querySelectorAll('.rtl-toggle');
    const html = document.documentElement;
    const isRTL = localStorage.getItem('rtl') === 'true';

    if (isRTL) {
        html.setAttribute('dir', 'rtl');
    }

    rtlToggle.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentState = html.getAttribute('dir') === 'rtl';
            const newState = !currentState;
            html.setAttribute('dir', newState ? 'rtl' : 'ltr');
            localStorage.setItem('rtl', newState);
        });
    });
}

// Mobile Navigation
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger-btn');
    const closeBtn = document.querySelector('.drawer-close');
    const drawer = document.querySelector('.drawer');
    const overlay = document.querySelector('.drawer-overlay');

    if (!hamburger) return;

    const toggleDrawer = () => {
        drawer.classList.toggle('open');
        overlay.classList.toggle('active');
        document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
    };

    hamburger.addEventListener('click', toggleDrawer);
    if (closeBtn) closeBtn.addEventListener('click', toggleDrawer);
    overlay.addEventListener('click', toggleDrawer);
}

// Scroll Header
function initScrollHeader() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = 'var(--shadow)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
}
function initStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (!statNumbers.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseFloat(el.getAttribute('data-target'));
                const isDecimal = target % 1 !== 0;
                const duration = 1800;
                const steps = 60;
                const increment = target / steps;
                let current = 0;
                let count = 0;

                const timer = setInterval(() => {
                    count++;
                    current += increment;
                    if (count >= steps) {
                        current = target;
                        clearInterval(timer);
                    }
                    el.textContent = isDecimal ? current.toFixed(1) + '%' : Math.floor(current) + (el.closest('.stat-card').querySelector('.stat-label').textContent.includes('LATENCY') ? 'ms' : '%');
                }, duration / steps);

                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => observer.observe(el));
}

initStatCounters();