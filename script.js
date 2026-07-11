document.addEventListener('DOMContentLoaded', () => {

    // 1. Navigation Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Nav Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu on clicking links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // 3. typing text effect in Hero Section
    const words = [
        "Linux System Administrator",
        "Junior DevOps Engineer",
        "L2 Support Engineer",
        "Cloud Systems Enthusiast"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingDelay = 100;
    const erasingDelay = 50;
    const newWordDelay = 2000;
    const typingTextEl = document.getElementById('typing-text');

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Delete characters
            typingTextEl.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Write characters
            typingTextEl.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        // Adjust speed
        let typeSpeed = isDeleting ? erasingDelay : typingDelay;

        if (!isDeleting && charIndex === currentWord.length) {
            // Full word typed -> Wait before starting deleting
            typeSpeed = newWordDelay;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Word deleted -> Switch to next word
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // brief pause before writing next
        }

        setTimeout(type, typeSpeed);
    }

    if (typingTextEl) {
        setTimeout(type, 1000); // Start typing loop
    }

    // 4. Skills Filtering Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Toggle active class on buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.getAttribute('data-category');

            skillCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                // Set transition settings
                card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // 5. Contact Form Handler (Mock Submit)
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');

    if (contactForm && formFeedback) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !subject || !message) {
                formFeedback.className = "form-feedback error";
                formFeedback.textContent = "Please fill in all the required fields.";
                return;
            }

            // Construct and trigger WhatsApp redirect
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Redirecting...</span> <i class="fa-solid fa-spinner fa-spin"></i>';

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                
                // Show redirection feedback
                formFeedback.className = "form-feedback success";
                formFeedback.style.display = "block";
                formFeedback.textContent = `Redirecting to WhatsApp to send your message...`;

                // Build message body
                const whatsappText = `Hello Lovesh,\n\nMy name is: *${name}*\nEmail: *${email}*\nSubject: *${subject}*\n\n*Message:* ${message}`;
                const encodedText = encodeURIComponent(whatsappText);
                const whatsappUrl = `https://wa.me/916350458087?text=${encodedText}`;

                // Open WhatsApp link
                window.open(whatsappUrl, '_blank');

                // Clear fields
                contactForm.reset();

                // Hide feedback after 5 seconds
                setTimeout(() => {
                    formFeedback.style.display = 'none';
                }, 5000);
            }, 1000);
        });
    }
});
