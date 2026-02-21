// =============================================
// Dark Mode Toggle
// =============================================
const themeToggle = document.querySelector('.theme-toggle');
const storedTheme = localStorage.getItem('theme');

if (storedTheme) {
    document.documentElement.setAttribute('data-theme', storedTheme);
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });
}

// =============================================
// Navbar - Hide on scroll down, show on scroll up
// =============================================
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;
const scrollThreshold = 5;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (Math.abs(scrollTop - lastScrollTop) < scrollThreshold) return;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.classList.add('hidden');
    } else {
        navbar.classList.remove('hidden');
    }
    lastScrollTop = scrollTop;
});

// =============================================
// Mobile Menu Toggle
// =============================================
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.navbar nav');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.navbar nav a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// =============================================
// Active Nav Link Highlighting on Scroll
// =============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar nav ul li a');

function highlightNavOnScroll() {
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavOnScroll);

// =============================================
// Resume Tabs
// =============================================
function openTab(evt, tabName) {
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = 'none';
        tabContents[i].classList.remove('active-tab');
    }

    const tabBtns = document.getElementsByClassName('tab-btn');
    for (let i = 0; i < tabBtns.length; i++) {
        tabBtns[i].classList.remove('active');
    }

    document.getElementById(tabName).style.display = 'block';
    document.getElementById(tabName).classList.add('active-tab');
    evt.currentTarget.classList.add('active');
}

// =============================================
// Scroll Fade-In Animations
// =============================================
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.12
    });

    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });
}

// =============================================
// Initialize
// =============================================
window.addEventListener('DOMContentLoaded', () => {
    setupScrollAnimations();
    highlightNavOnScroll();

    // Initialize first resume tab
    const firstTab = document.querySelector('.tab-btn');
    if (firstTab) firstTab.click();
});
