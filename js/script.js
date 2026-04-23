// Particles.js
if (typeof particlesJS !== 'undefined') {
    particlesJS.load('particles-js', 'js/particles.json', function() {
        console.log('Particles loaded');
    });
}

// Typing effect
const typingElement = document.getElementById('typing');
if (typingElement) {
    const roles = ['Computer Engineer', 'Software Developer', 'Cybersecurity Analyst', 'Data Scientist', 'Fullstack Engineer'];
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

// ==================== DATA FOR MARQUEES ====================
// Certifications with actual image paths (same as certifications.html)
const certificationsList = [
    { name: "Python Programming", image: "images/python-1.png" },
    { name: "Web Development", image: "images/Basic%20Web%20Development%20-1.png" },
    { name: "C# Programming", image: "images/C%23.png" },
    { name: "Java Basics", image: "images/java_basic_certif.png" },
    { name: "SQL Fundamentals", image: "images/sql.png" },
    { name: "Cybersecurity", image: "images/Cybersecurity%20Fundamentals-1.png" },
    { name: "Ethical Hacking", image: "images/ethicalhacking-1.png" },
    { name: "Google Cloud", image: "images/Google%20Cloud%20fundamentals.png" },
    { name: "Data Science", image: "images/data%20science.png" },
    { name: "Cyber Hygiene", image: "images/cyberhygiene-1.png" },
    { name: "Advanced Training", image: "images/Certificate_of_Completion-1.png" },
    { name: "System Config", image: "images/installingAndConfiguring-1.png" },
    { name: "Basic Hardware", image: "images/basicHardware-1.png" },
    { name: "Aviation Tech", image: "images/aviations-1.png" },
    { name: "Certificate of Cyber", image: "images/certificate%20of%20cyber.png" },
    { name: "Data Visualization", image: "images/Data%20Visualization%20Workshop.png" }
];

// Tools with icons and skill levels
const toolsList = [
    { name: "React", icon: "fab fa-react", level: "85%" },
    { name: "Node.js", icon: "fab fa-node-js", level: "80%" },
    { name: "Tailwind CSS", icon: "fab fa-css3-alt", level: "90%" },
    { name: "Flutter", icon: "fab fa-flutter", level: "70%" },
    { name: "MongoDB", icon: "fas fa-leaf", level: "75%" },
    { name: "MySQL", icon: "fas fa-database", level: "80%" },
    { name: "C++", icon: "fas fa-code", level: "75%" },
    { name: "Python", icon: "fab fa-python", level: "88%" },
    { name: "Docker", icon: "fab fa-docker", level: "65%" },
    { name: "Git/GitHub", icon: "fab fa-github", level: "85%" },
    { name: "TypeScript", icon: "fab fa-js", level: "75%" },
    { name: "Next.js", icon: "fab fa-react", level: "72%" }
];

// Create certification marquee (with images)
function createCertMarquee(containerId, items) {
    const track = document.getElementById(containerId);
    if (!track) return;
    // Double the items for seamless loop
    const doubled = [...items, ...items];
    doubled.forEach(item => {
        const div = document.createElement('div');
        div.className = 'marquee-item cert-marquee-item';
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cert-marquee-img" onerror="this.style.display='none'">
            <span>${item.name}</span>
        `;
        track.appendChild(div);
    });
}

// Create tools marquee (with icons and percentages)
function createToolsMarquee(containerId, items) {
    const track = document.getElementById(containerId);
    if (!track) return;
    const doubled = [...items, ...items];
    doubled.forEach(item => {
        const div = document.createElement('div');
        div.className = 'marquee-item tool-marquee-item';
        div.innerHTML = `
            <i class="${item.icon}"></i>
            <span>${item.name}</span>
            <span class="skill-percent">${item.level}</span>
        `;
        track.appendChild(div);
    });
}

// Initialize marquees when page loads
document.addEventListener('DOMContentLoaded', () => {
    createCertMarquee('certsTrack', certificationsList);
    createToolsMarquee('toolsTrack', toolsList);
});

// Scroll progress bar
const progressBar = document.querySelector('.scroll-progress');
if (progressBar) {
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => navMenu.classList.remove('active'));
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
            if (navMenu && navMenu.classList.contains('active')) navMenu.classList.remove('active');
        }
    });
});

// Fade-in scroll animation
const fadeElements = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });
fadeElements.forEach(el => observer.observe(el));

// Back to Top button
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    window.addEventListener('scroll', () => {
        backToTop.style.display = window.scrollY > 400 ? 'flex' : 'none';
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Active nav link highlight
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
        link.classList.add('active');
    }
});