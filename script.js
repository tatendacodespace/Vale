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

// Page transition
function fadeToPage(url) {
    document.body.classList.add('fade-out');
    setTimeout(() => {
        window.location.href = url;
    }, 500);
}

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
                    Yay! 💕💕💕
                </p>
                <p class="closing-text fade-in" style="margin-top: 2rem;">
                    Even if you're far...<br>
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
            noBtn.style.transform = 'translateX(-1000px)';
            noBtn.style.opacity = '0';
            setTimeout(() => {
                if (noBtn) noBtn.textContent = 'Try again? 😊';
                if (noBtn) noBtn.style.transform = 'translateX(0)';
                if (noBtn) noBtn.style.opacity = '1';
                if (noBtn) noBtn.onclick = () => handleAnswer(true);
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
        1: "💕 Every word you say makes my day better. 💕",
        2: "💕 Time stops when we talk. 💕",
        3: "💕 Your happiness is my happiness. 💕",
        4: "💕 I can't wait to make memories with you. 💕"
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
    
    if (currentPage === 'index.html' || currentPage === '') {
        createFloatingHearts();
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
});

// Smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';
