// Mobile navigation toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Theme toggle functionality
class ThemeToggle {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        
        this.init();
    }
    
    init() {
        // Set initial theme
        this.setTheme(this.currentTheme);
        
        // Add event listener
        this.themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });
    }
    
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update icon
        const icon = this.themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
        
        this.currentTheme = theme;
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }
}

// Initialize theme toggle
new ThemeToggle();

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    
    if (window.scrollY > 50) {
        if (isDark) {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        if (isDark) {
            navbar.style.background = 'rgba(15, 23, 42, 0.9)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.9)';
        }
        navbar.style.boxShadow = 'none';
    }
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Chat Assistant Functionality
class ChatAssistant {
    constructor() {
        this.chatToggle = document.getElementById('chatToggle');
        this.chatWindow = document.getElementById('chatWindow');
        this.chatClose = document.getElementById('chatClose');
        this.chatInput = document.getElementById('chatInput');
        this.chatSend = document.getElementById('chatSend');
        this.chatMessages = document.getElementById('chatMessages');
        
        this.responses = {
            'greetings': [
                'Hello! I\'m here to help you learn more about Sphamandla\'s work and experience.',
                'Hi there! Great to meet you! I can tell you all about Sphamandla\'s projects and skills.',
                'Hey! Welcome to sphamandla\'s portfolio. What would you like to know about his work?',
                'Hello! I\'m doing great, thanks for asking! I\'m here to help you explore Sphamandla\'s portfolio.',
                'Hi! Thanks for stopping by. I can help you learn more about Sphamandla\'s experience and projects.'
            ],
            
            'education': 'Sphamandla holds a  Bachelor’s Degree in Computer Science and Information Technology from the University of Kwazulu-Natal. He also has various certifications Spring Framework 6 and Spring Boot 3 Certification , Java , RestAPI , FNB APP Academy.',
            'skills': 'Sphamandla is proficient in Java, Python, C#, C++, HTML, Springboot, ASP.NET and many other modern technologies. He\'s experienced in both frontend and backend development.',
            'projects': 'Sphamandla has completed several projects including Hotel booking, MovieTicketBooking, and is currently working on Aestelred (luxury items), Premium Jets (private jets).',
            'contact': 'You can reach Sphamandla at sphamandlankuna302@gmail.com or +27 (0) 828 667 024. He\'s based in Johannesburg, South Africa.',
            'default': 'I can help you with information about Sphamandla\'s experience, education, skills, projects, or contact details. What would you like to know?'
        };
        
        this.initializeChat();
    }
    
    initializeChat() {
        this.chatToggle.addEventListener('click', () => this.toggleChat());
        this.chatClose.addEventListener('click', () => this.closeChat());
        this.chatSend.addEventListener('click', () => this.sendMessage());
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }
    
    toggleChat() {
        this.chatWindow.classList.toggle('active');
    }
    
    closeChat() {
        this.chatWindow.classList.remove('active');
    }
    
    sendMessage() {
        const message = this.chatInput.value.trim();
        if (!message) return;
        
        this.addMessage(message, 'user');
        this.chatInput.value = '';
        
        // Simulate typing delay
        setTimeout(() => {
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot');
        }, 1000);
    }
    
    addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = content;
        
        messageDiv.appendChild(messageContent);
        this.chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
    
    generateResponse(message) {
        const lowercaseMessage = message.toLowerCase().trim();
        
        // Check for greetings first
        const greetings = ['hi', 'hello', 'hey', 'halo', 'hala', 'ola', 'how are you', 'good morning', 'good afternoon', 'good evening'];
        if (greetings.some(greeting => lowercaseMessage.includes(greeting))) {
            const greetingResponses = this.responses.greetings;
            return greetingResponses[Math.floor(Math.random() * greetingResponses.length)];
        }
        
        // Check for keywords in the message
        for (const [key, response] of Object.entries(this.responses)) {
            if (key !== 'default' && key !== 'greetings' && lowercaseMessage.includes(key)) {
                return response;
            }
        }
        
        // Check for common variations
        if (lowercaseMessage.includes('work') || lowercaseMessage.includes('job')) {
            return this.responses.experience;
        }
        
        if (lowercaseMessage.includes('school') || lowercaseMessage.includes('university') || lowercaseMessage.includes('degree')) {
            return this.responses.education;
        }
        
        if (lowercaseMessage.includes('technology') || lowercaseMessage.includes('programming') || lowercaseMessage.includes('code')) {
            return this.responses.skills;
        }
        
        if (lowercaseMessage.includes('portfolio') || lowercaseMessage.includes('work samples')) {
            return this.responses.projects;
        }
        
        if (lowercaseMessage.includes('reach') || lowercaseMessage.includes('email') || lowercaseMessage.includes('phone')) {
            return this.responses.contact;
        }
        
        return this.responses.default;
    }
}

// Initialize chat assistant
new ChatAssistant();

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.skill-category, .project-card, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Typing effect for hero subtitle
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const originalText = heroSubtitle.textContent;
    
    setTimeout(() => {
        typeWriter(heroSubtitle, originalText, 50);
    }, 1000);
});

// Particle background effect (optional enhancement)
class ParticleBackground {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.numberOfParticles = 50;
        
        this.init();
    }
    
    init() {
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.opacity = '0.1';
        
        document.body.appendChild(this.canvas);
        
        this.resize();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        for (let i = 0; i < this.numberOfParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = '#2563eb';
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle background
new ParticleBackground();

// Add some interactive hover effects
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});