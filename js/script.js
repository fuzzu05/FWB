// Theme Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'dark';

if (currentTheme === 'light') {
    document.body.setAttribute('data-theme', 'light');
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        let theme = document.body.getAttribute('data-theme');
        if (theme === 'light') {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
}

// Header Scroll Effect
const header = document.getElementById('main-header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal, .card, .experience-card, .testimonial-card, .section-header');

// Add reveal class to elements
revealElements.forEach(el => el.classList.add('reveal'));

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    revealOnScroll.observe(el);
});

// Typing Effect for Taglines
// const typeEffectSpan = document.querySelector('.type-effect');
// if (typeEffectSpan) {
//     const taglines = [
//         "Connecting Builders.",
//         "Where Builders Connect.",
//         "Where Ambition Connects.",
//         "Connect. Build. Grow."
//     ];
//     let taglineIndex = 0;
//     let charIndex = 0;
//     let isDeleting = false;
//     let typingSpeed = 100;

//     function type() {
//         const currentTagline = taglines[taglineIndex];

//         if (isDeleting) {
//             typeEffectSpan.textContent = currentTagline.substring(0, charIndex - 1);
//             charIndex--;
//             typingSpeed = 40;
//         } else {
//             typeEffectSpan.textContent = currentTagline.substring(0, charIndex + 1);
//             charIndex++;
//             typingSpeed = 80;
//         }

//         if (!isDeleting && charIndex === currentTagline.length) {
//             isDeleting = true;
//             typingSpeed = 2500; // pause at end of word
//         } else if (isDeleting && charIndex === 0) {
//             isDeleting = false;
//             taglineIndex = (taglineIndex + 1) % taglines.length;
//             typingSpeed = 500; // pause before typing next
//         }

//         setTimeout(type, typingSpeed);
//     }

//     setTimeout(type, 1000);
// }

// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
    lerp: 0.05, // Slower interpolation for a smoother, heavier feel
    wheelMultiplier: 0.8, // Slower scrolling speed
    smoothWheel: true,
    smoothTouch: false,
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// EmailJS Form Handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        
        const submitBtn = document.getElementById('submit-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = 'Sending...';
        submitBtn.disabled = true;

        emailjs.sendForm('fwbcontact', 'fwbmails', this)
            .then(() => {
                submitBtn.innerHTML = 'Sent Successfully! <span class="arrow">✓</span>';
                contactForm.reset();
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            }, (error) => {
                console.error('EmailJS Error:', error);
                submitBtn.innerHTML = 'Failed to Send <span class="arrow">✕</span>';
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            });
    });
}
