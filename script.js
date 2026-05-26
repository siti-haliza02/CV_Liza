document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            body.classList.replace('light-mode', 'dark-mode');
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        } else {
            body.classList.replace('dark-mode', 'light-mode');
            localStorage.setItem('theme', 'light');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
    });

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Deteksi posisi scroll layar
            if (pageYOffset >= (sectionTop - 150)) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
    const skillBars = document.querySelectorAll('.skill-bar-fill');

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                if (entry.target.contains(skillBars[0]) || entry.target.classList.contains('skills-section')) {
                    skillBars.forEach(bar => {
                        const progress = bar.getAttribute('data-progress');
                        bar.style.width = progress;
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        scrollObserver.observe(element);
    });

    const projectCards = document.querySelectorAll('.project-card');
    const btnPrev = document.querySelector('.carousel-btn.btn-prev');
    const btnNext = document.querySelector('.carousel-btn.btn-next');
    let currentIndex = 1;

    function updateActiveProject(index) {
        projectCards.forEach((card, i) => {
            card.classList.remove('active');
            if (i === index) {
                card.classList.add('active');
            }
        });
    }
    btnNext.addEventListener('click', () => {
        if (currentIndex < projectCards.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; 
        }
        updateActiveProject(currentIndex);
    });

    btnPrev.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = projectCards.length - 1;
        }
        updateActiveProject(currentIndex);
    });
    projectCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            currentIndex = index;
            updateActiveProject(currentIndex);
        });
    });
    const contactForm = document.getElementById('portfolio-contact-form');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isFormValid = true;
        const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
        
        inputs.forEach(input => {
            const formGroup = input.parentElement;
            if (input.value.trim() === '') {
                formGroup.classList.add('invalid');
                isFormValid = false;
            } else {
                formGroup.classList.remove('invalid');
            }

            if (input.type === 'email' && input.value.trim() !== '') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value.trim())) {
                    formGroup.classList.add('invalid');
                    isFormValid = false;
                } else {
                    formGroup.classList.remove('invalid');
                }
            }
        });
        if (isFormValid) {
            alert('Terima kasih! Pesan Anda berhasil divalidasi dan disimulasikan. (Sistem CV Online Siti Nur Haliza)');
            contactForm.reset();
        }
    });
});