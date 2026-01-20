// Create floating hearts
function createFloatingHearts() {
    const heartsContainer = document.querySelector('.floating-hearts');
    if (!heartsContainer) return;

    const hearts = ['💕', '💖', '💗', '🌸', '🌺', '🌷'];
    
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 15 + 's';
        heart.style.fontSize = (Math.random() * 1 + 1) + 'rem';
        heartsContainer.appendChild(heart);
    }
}

// Page transition - using enhanced version below

// Reveal secret message on landing page
function revealSecret() {
    const secretMessage = document.getElementById('secretMessage');
    const clickHint = document.querySelector('.click-hint');
    if (secretMessage) {
        secretMessage.classList.add('show');
        setTimeout(() => {
            secretMessage.classList.remove('show');
        }, 3000);
    }
    if (clickHint) {
        clickHint.style.opacity = '0';
        setTimeout(() => {
            clickHint.style.display = 'none';
        }, 500);
    }
}

// Reveal messages on story page icons
function revealMessage(num) {
    const message = document.getElementById(`message${num}`);
    if (message) {
        message.classList.toggle('show');
    }
}

// Reveal location messages
function revealLocationMessage(location) {
    const message = document.getElementById(`${location}Message`);
    if (message) {
        // Hide other messages first
        document.querySelectorAll('.location-message').forEach(msg => {
            if (msg !== message) {
                msg.classList.remove('show');
            }
        });
        message.classList.toggle('show');
        
        // Auto-hide after 4 seconds
        setTimeout(() => {
            message.classList.remove('show');
        }, 4000);
    }
}

// Story page scroll animations
function initStoryAnimations() {
    const sections = document.querySelectorAll('.story-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add interactive click to icons
                const icon = entry.target.querySelector('.story-icon');
                if (icon && !icon.classList.contains('clicked')) {
                    icon.addEventListener('click', function() {
                        this.style.animation = 'bounceIn 0.5s ease';
                        setTimeout(() => {
                            this.style.animation = '';
                        }, 500);
                    });
                }
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px'
    });

    sections.forEach(section => {
        observer.observe(section);
    });
}

// Distance page animations
function initDistanceAnimations() {
    const dotJhb = document.getElementById('dotJhb');
    const dotKzn = document.getElementById('dotKzn');
    const connectionLine = document.getElementById('connectionLine');
    
    if (!dotJhb || !dotKzn || !connectionLine) return;

    function updateConnectionLine() {
        const jhbRect = dotJhb.getBoundingClientRect();
        const kznRect = dotKzn.getBoundingClientRect();
        const mapRect = dotJhb.parentElement.getBoundingClientRect();
        
        const jhbX = jhbRect.left + jhbRect.width / 2 - mapRect.left;
        const jhbY = jhbRect.top + jhbRect.height / 2 - mapRect.top;
        const kznX = kznRect.left + kznRect.width / 2 - mapRect.left;
        const kznY = kznRect.top + kznRect.height / 2 - mapRect.top;
        
        const line = connectionLine.querySelector('#line');
        if (line) {
            line.setAttribute('x1', jhbX);
            line.setAttribute('y1', jhbY);
            line.setAttribute('x2', kznX);
            line.setAttribute('y2', kznY);
        }
    }

    // Update line on load and resize
    setTimeout(updateConnectionLine, 100);
    window.addEventListener('load', updateConnectionLine);
    window.addEventListener('resize', updateConnectionLine);
    
    // Animate dots moving closer
    let animationFrame;
    function animateDots() {
        updateConnectionLine();
        animationFrame = requestAnimationFrame(animateDots);
    }
    animateDots();
}

// Question page answer handler
function handleAnswer(isYes) {
    const yesBtn = document.querySelector('.yes-btn');
    const noBtn = document.querySelector('.no-btn');
    const celebration = document.getElementById('celebration');
    
    if (isYes) {
        // Celebration animation
        createCelebration();
        
        // Hide buttons and show closing message
        if (yesBtn) yesBtn.style.display = 'none';
        if (noBtn) noBtn.style.display = 'none';
        
        // Show special message
        const closingMessage = document.getElementById('closingMessage');
        if (closingMessage) {
            closingMessage.innerHTML = `
                <p class="closing-text fade-in" style="font-size: 2rem; color: var(--pink-dark); font-weight: 600;">
                    Yay! Let's gooo! 💕💕💕
                </p>
                <p class="closing-text fade-in" style="margin-top: 2rem;">
                    If you had a Twin...<br>
                    I'd still choose you, Mam.
                </p>
            `;
        }
        
        // Show final CTA button
        const finalCta = document.getElementById('finalCta');
        if (finalCta) {
            setTimeout(() => {
                finalCta.style.display = 'block';
                finalCta.style.animation = 'fadeInUp 1s ease forwards';
            }, 2000);
        }
    } else {
        // Playful "no" response
        if (noBtn) {
            noBtn.style.transform = 'translateX(-1000px) rotate(360deg)';
            noBtn.style.opacity = '0';
            setTimeout(() => {
                if (noBtn) {
                    noBtn.innerHTML = '<span>Nice try 😏 Click me again</span>';
                    noBtn.style.transform = 'translateX(0) rotate(0deg)';
                    noBtn.style.opacity = '1';
                    noBtn.onclick = () => handleAnswer(true);
                }
            }, 500);
        }
    }
}

// Celebration animation
function createCelebration() {
    const celebration = document.getElementById('celebration');
    if (!celebration) return;

    const emojis = ['💕', '💖', '💗', '🌸', '🎉', '✨', '💝', '🌺'];
    
    for (let i = 0; i < 50; i++) {
        const emoji = document.createElement('div');
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.position = 'absolute';
        emoji.style.left = Math.random() * 100 + '%';
        emoji.style.top = Math.random() * 100 + '%';
        emoji.style.fontSize = (Math.random() * 2 + 1.5) + 'rem';
        emoji.style.animation = `celebrate 3s ease-out forwards`;
        emoji.style.animationDelay = Math.random() * 0.5 + 's';
        emoji.style.pointerEvents = 'none';
        celebration.appendChild(emoji);
    }

    // Add celebration animation CSS
    if (!document.getElementById('celebration-style')) {
        const style = document.createElement('style');
        style.id = 'celebration-style';
        style.textContent = `
            @keyframes celebrate {
                0% {
                    opacity: 1;
                    transform: translateY(0) rotate(0deg) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translateY(-200px) rotate(360deg) scale(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize memories page interactions
function initMemoriesPage() {
    const memoryCards = document.querySelectorAll('.memory-card');
    const revealedMessages = {
        1: "💕 That moment changed everything. I'm so glad you turned back, Mam. (Even though that 'why' almost ended me 😂) 💕",
        2: "💕 Those walks are my favorite. Just us, talking, getting to know each other. Perfect vibes. 💕",
        3: "💕 Our little budget date was everything. Just being with you, chatting in the car. I loved it lowkey. 💕",
        4: "💕 Ice cream and walks with you? That's all I need. Simple moments, big feelings. (You're easy to impress 😏) 💕",
        5: "💕 You're absolutely stunning, Ms. I can't help but stare. You're beautiful inside and out. (And I'm not the only one who noticed 😅) 💕",
        6: "💕 You're worth every gym session, Mam. I'll be ready to protect what matters most. (Time to get intimidating 💪) 💕"
    };
    
    memoryCards.forEach(card => {
        card.addEventListener('click', function() {
            if (!this.classList.contains('clicked')) {
                this.classList.add('clicked');
                const memoryNum = this.dataset.memory;
                const revealed = document.createElement('div');
                revealed.className = 'memory-revealed';
                revealed.textContent = revealedMessages[memoryNum];
                this.appendChild(revealed);
                setTimeout(() => {
                    revealed.classList.add('show');
                }, 100);
            }
        });
    });
}

// Initialize thank you page
function initThankYouPage() {
    createFloatingHearts();
}

// Initialize based on current page
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Initialize global features
    initCustomCursor();
    initScrollProgress();
    initLoadingScreen();
    initKeyboardNavigation();
    
    if (currentPage === 'index.html' || currentPage === '') {
        createFloatingHearts();
        createParticles();
    } else if (currentPage === 'story.html') {
        initStoryAnimations();
    } else if (currentPage === 'distance.html') {
        initDistanceAnimations();
    } else if (currentPage === 'memories.html') {
        initMemoriesPage();
    } else if (currentPage === 'thankyou.html') {
        initThankYouPage();
    }
    
    // Add hover effects to all interactive elements
    const interactiveElements = document.querySelectorAll('button, a, .location-dot, .memory-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    // Disable custom cursor on mobile
    if (window.innerWidth <= 768) {
        document.body.style.cursor = 'auto';
        const cursor = document.getElementById('customCursor');
        const cursorDot = document.getElementById('customCursorDot');
        if (cursor) cursor.style.display = 'none';
        if (cursorDot) cursorDot.style.display = 'none';
    }
});

// Smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Custom Cursor
function initCustomCursor() {
    const cursor = document.getElementById('customCursor');
    const cursorDot = document.getElementById('customCursorDot');
    
    if (!cursor || !cursorDot) return;
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth cursor animation
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Hover effects
    const interactiveElements = document.querySelectorAll('button, a, .clickable-icon, .memory-card, .location-dot');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
}

// Scroll Progress Bar
function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');
    if (!progressBar) return;
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Enhanced Page Transition
function fadeToPage(url) {
    const transition = document.createElement('div');
    transition.className = 'page-transition';
    document.body.appendChild(transition);
    
    setTimeout(() => {
        transition.classList.add('active');
    }, 10);
    
    setTimeout(() => {
        window.location.href = url;
    }, 600);
}

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (!loadingScreen) return;
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 800);
    });
}

// Keyboard Navigation
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Arrow keys for navigation
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            const nextBtn = document.querySelector('.next-btn, .question-btn');
            if (nextBtn && !e.target.matches('input, textarea')) {
                nextBtn.click();
            }
        }
        
        // Escape to close modals/messages
        if (e.key === 'Escape') {
            document.querySelectorAll('.secret-message.show, .location-message.show').forEach(el => {
                el.classList.remove('show');
            });
        }
    });
}

// Particle Effects for Landing Page
function createParticles() {
    const container = document.querySelector('.floating-hearts');
    if (!container) return;
    
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: var(--pink-medium);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.2};
            animation: floatParticle ${Math.random() * 20 + 10}s infinite ease-in-out;
            animation-delay: ${Math.random() * 5}s;
        `;
        container.appendChild(particle);
    }
    
    // Add particle animation CSS
    if (!document.getElementById('particle-style')) {
        const style = document.createElement('style');
        style.id = 'particle-style';
        style.textContent = `
            @keyframes floatParticle {
                0%, 100% {
                    transform: translate(0, 0) rotate(0deg);
                }
                25% {
                    transform: translate(20px, -30px) rotate(90deg);
                }
                50% {
                    transform: translate(-20px, -60px) rotate(180deg);
                }
                75% {
                    transform: translate(30px, -30px) rotate(270deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
}
