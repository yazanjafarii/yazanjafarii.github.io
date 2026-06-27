// ===== ORGAN DATA =====
const organData = {
    brain: {
        name: "🧠 Brain",
        description: "Your brain is the command center of your body. It regulates dopamine, the neurotransmitter of motivation and pleasure. Through neuroplasticity, you can literally rewire your brain's response to pain and stress.",
        funFact: "Your brain contains ~86 billion neurons. Each neuron can connect to 10,000+ other neurons!"
    },
    heart: {
        name: "❤️ Heart",
        description: "Your heart communicates with your brain via the vagus nerve. Slow, deep breathing can activate your parasympathetic nervous system, telling your body it's safe to relax.",
        funFact: "Your heart rate variability is a key indicator of nervous system health and stress resilience."
    },
    lungs: {
        name: "💨 Lungs",
        description: "Conscious breathing influences your nervous system state. Slow diaphragmatic breathing activates the parasympathetic response, reducing cortisol and pain perception.",
        funFact: "A single breath can shift your nervous system from 'fight or flight' to 'rest and digest' mode."
    },
    liver: {
        name: "🔧 Liver",
        description: "Your liver processes toxins and regulates metabolic processes. A healthy lifestyle supports optimal detoxification and energy production.",
        funFact: "Your liver is the only organ that can regenerate itself. It can recover from up to 70% damage!"
    },
    stomach: {
        name: "🫘 Gut",
        description: "Your gut is your 'second brain' connected to mood, immunity, and pain perception. The gut-brain axis influences how you feel and perceive pain.",
        funFact: "Your gut contains ~100 trillion microbes. A healthy microbiome is crucial for mental health!"
    },
    spine: {
        name: "🦴 Spine",
        description: "Your spine houses the central nervous system. Proper alignment, movement, and posture enhance nervous system function and reduce pain.",
        funFact: "Your spine has 33 vertebrae and protects your spinal cord, which connects your brain to every part of your body."
    }
};

// ===== UPDATE SCROLL PROGRESS =====
function updateScrollProgress() {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / scrollHeight) * 100;
    document.querySelector('.progress-bar').style.width = progress + '%';
}

// ===== HIGHLIGHT ORGANS ON SCROLL =====
function highlightOrganOnScroll() {
    const contentBlocks = document.querySelectorAll('.content-block');
    
    contentBlocks.forEach(block => {
        const rect = block.getBoundingClientRect();
        const organName = block.dataset.organ;
        const organZone = document.querySelector(`.${organName}-zone`);
        const organShape = document.querySelector(`.${organName}-shape`);
        
        if (rect.top < window.innerHeight * 0.7 && rect.bottom > 0) {
            block.classList.add('visible');
            if (organZone) organZone.classList.add('active');
            if (organShape) organShape.classList.add('active');
        } else {
            if (organZone) organZone.classList.remove('active');
            if (organShape) organShape.classList.remove('active');
        }
    });
}

// ===== CLICK ORGAN TO SHOW INFO =====
document.querySelectorAll('.organ-zone').forEach(zone => {
    zone.addEventListener('click', (e) => {
        e.stopPropagation();
        const organ = e.target.dataset.organ;
        const info = organData[organ];
        
        if (info) {
            document.getElementById('organ-name').textContent = info.name;
            document.getElementById('organ-description').textContent = info.description;
            document.getElementById('organ-fun-fact').textContent = "💡 " + info.funFact;
            document.getElementById('organ-info').classList.remove('hidden');
        }
    });
    
    zone.addEventListener('mouseenter', () => {
        zone.style.opacity = '0.7';
    });
    
    zone.addEventListener('mouseleave', () => {
        if (!zone.classList.contains('active')) {
            zone.style.opacity = '0';
        }
    });
});

// Click organs in SVG too
document.querySelectorAll('.organ-shape').forEach(shape => {
    shape.addEventListener('click', (e) => {
        e.stopPropagation();
        const organ = e.target.dataset.organ;
        const info = organData[organ];
        
        if (info) {
            document.getElementById('organ-name').textContent = info.name;
            document.getElementById('organ-description').textContent = info.description;
            document.getElementById('organ-fun-fact').textContent = "💡 " + info.funFact;
            document.getElementById('organ-info').classList.remove('hidden');
        }
    });
});

// ===== CLOSE ORGAN INFO =====
function closeOrganInfo() {
    document.getElementById('organ-info').classList.add('hidden');
}

// Close popup when clicking outside
document.addEventListener('click', (e) => {
    const popup = document.getElementById('organ-info');
    const zones = document.querySelectorAll('.organ-zone, .organ-shape');
    
    if (!popup.contains(e.target) && ![...zones].some(z => z.contains(e.target))) {
        closeOrganInfo();
    }
});

// ===== MOBILE MENU TOGGLE =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger?.addEventListener('click', () => {
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.style.display = 'none';
    });
});

// ===== CONTACT FORM HANDLER =====
const contactForm = document.getElementById('contact-form');
contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector('textarea').value;
    
    const mailtoLink = `mailto:info@bodymindacademy.com?subject=New Message from ${name}&body=${encodeURIComponent(message)}%0A%0AFrom: ${name}%0AEmail: ${email}`;
    
    window.location.href = mailtoLink;
    contactForm.reset();
    alert('Thank you for your message! We\'ll get back to you soon.');
});

// ===== SMOOTH SCROLL NAVIGATION =====
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

// ===== INTERSECTION OBSERVER =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.content-block').forEach(block => {
    observer.observe(block);
});

// ===== SCROLL EVENTS =====
window.addEventListener('scroll', () => {
    updateScrollProgress();
    highlightOrganOnScroll();
});

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    updateScrollProgress();
    highlightOrganOnScroll();
});

// ===== RESIZE =====
window.addEventListener('resize', () => {
    updateScrollProgress();
});
