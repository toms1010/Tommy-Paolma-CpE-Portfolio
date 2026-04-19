// Particles.js (using JSON config file)
if (typeof particlesJS !== 'undefined') {
    particlesJS.load('particles-js', 'js/particles.json', function() {
        console.log('Particles loaded');
    });
}

// Typing effect
const typingElement = document.getElementById('typing');
if (typingElement) {
    const roles = ['Computer Engineer', 'Software Developer', 'Cybersecurity Analyst', 'Data Analyst', 'Fullstack Developer', 'Tech Innovator'];
    let roleIndex = 0, charIndex = 0, isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const current = roles[roleIndex];
        if (isDeleting) {
            typingElement.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        if (!isDeleting && charIndex === current.length) {
            isDeleting = true;
            typingSpeed = 1500;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500;
        }
        setTimeout(typeEffect, typingSpeed);
    }
    document.addEventListener('DOMContentLoaded', typeEffect);
}

// Mobile menu toggle
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
if (burger) {
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('toggle');
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if (navLinks && navLinks.classList.contains('active')) navLinks.classList.remove('active');
        }
    });
});

// ==================== LANGUAGES & TOOLS DATA ====================
// Includes all frameworks: Python, R, Java, JavaScript, Electron, C#
const toolsData = [
    // Frontend (original)
    { name: "Tailwind CSS", icon: "", percent: 85, category: "frontend" },
    { name: "React", icon: "https://i.ibb.co/G4chpx4B/react.png", percent: 80, category: "frontend" },
    { name: "TypeScript", icon: "", percent: 75, category: "frontend" },
    { name: "Next.js", icon: "", percent: 70, category: "frontend" },
    { name: "Vue.js", icon: "", percent: 65, category: "frontend" },
    // Mobile (original)
    { name: "React Native", icon: "", percent: 70, category: "mobile" },
    { name: "Flutter", icon: "", percent: 60, category: "mobile" },
    
    // ========== FRAMEWORKS (new) ==========
    // Python Frameworks
    { name: "FastAPI", icon: "", percent: 75, category: "framework" },
    { name: "Django", icon: "", percent: 80, category: "framework" },
    { name: "Reflex", icon: "", percent: 55, category: "framework" },
    { name: "Streamlit", icon: "", percent: 85, category: "framework" },
    { name: "Gradio", icon: "", percent: 70, category: "framework" },
    // R Frameworks
    { name: "Shiny (R)", icon: "", percent: 65, category: "framework" },
    { name: "Tidyverse", icon: "", percent: 80, category: "framework" },
    // Java Frameworks
    { name: "Spring Boot", icon: "", percent: 75, category: "framework" },
    { name: "Quarkus", icon: "", percent: 60, category: "framework" },
    { name: "Micronaut", icon: "", percent: 55, category: "framework" },
    // JavaScript/Node.js Frameworks
    { name: "NestJS", icon: "", percent: 70, category: "framework" },
    { name: "Qwik", icon: "", percent: 50, category: "framework" },
    { name: "SvelteKit", icon: "", percent: 65, category: "framework" },
    // Desktop Frameworks
    { name: "Electron", icon: "", percent: 75, category: "framework" },
    { name: "Tauri", icon: "", percent: 60, category: "framework" },
    { name: "Proton Native", icon: "", percent: 50, category: "framework" },
    // C# (.NET) Frameworks
    { name: "ASP.NET Core", icon: "", percent: 80, category: "framework" },
    { name: "Blazor", icon: "", percent: 70, category: "framework" },
    { name: ".NET MAUI", icon: "", percent: 65, category: "framework" },
    { name: "SignalR", icon: "", percent: 65, category: "framework" },
    
    // Backend & DB (original + additions)
    { name: "Node.js", icon: "", percent: 70, category: "backend" },
    { name: "MongoDB", icon: "https://i.ibb.co/3ynqthQ6/mongodb-original-wordmark-logo-icon-146425.png", percent: 75, category: "backend" },
    { name: "MySQL", icon: "https://i.ibb.co/cXydcb2T/My-SQL-Logo-wine.png", percent: 80, category: "backend" },
    { name: "Python", icon: "https://i.ibb.co/d4chTzQG/Python-logo.png", percent: 85, category: "backend" },
    { name: "C++", icon: "https://i.ibb.co/k2F7sND9/ISO-C-Logo-svg.png", percent: 75, category: "backend" },
    { name: "R Language", icon: "", percent: 60, category: "backend" },
    { name: "Java", icon: "", percent: 70, category: "backend" },
    { name: "C#", icon: "https://i.ibb.co/yncTV35r/C-removebg-preview.png", percent: 80, category: "backend" },
    
    // DevOps
    { name: "Docker", icon: "", percent: 65, category: "devops" },
    { name: "GitHub Actions", icon: "", percent: 60, category: "devops" },
    { name: "Git/GitHub", icon: "", percent: 80, category: "devops" }
];

function renderTools(filter = 'all') {
    const grid = document.getElementById('toolsGrid');
    if (!grid) return;
    const filtered = toolsData.filter(t => filter === 'all' || t.category === filter);
    grid.innerHTML = filtered.map(tool => `
        <div class="tool-card" data-category="${tool.category}">
            ${tool.icon ? `<img src="${tool.icon}" alt="${tool.name}" onerror="this.style.display='none'">` : `<i class="fas fa-code" style="font-size: 2rem; color: var(--accent); margin-bottom: 0.5rem;"></i>`}
            <span>${tool.name}</span>
            <div class="progress-bar"><div class="progress" style="width: ${tool.percent}%"></div></div>
            <span class="percent">${tool.percent}%</span>
        </div>
    `).join('');
}

// Filter buttons event listeners
const filterBtns = document.querySelectorAll('.filter-btn');
if (filterBtns.length) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderTools(btn.dataset.filter);
        });
    });
    renderTools('all');
}

// Back to Top Button
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Active nav link highlight
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === 'index.html' && href === 'index.html') || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
    }
});