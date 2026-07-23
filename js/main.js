document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ========================================
    // 1. DARK MODE TOGGLE avec localStorage
    // ========================================
    const themeToggle = document.getElementById('themeToggle');
    const storedTheme = localStorage.getItem('theme') || 'light';
    
    if (storedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeToggle) {
            themeToggle.innerHTML = '☀️';
        }
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                this.innerHTML = '🌙';
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                this.innerHTML = '☀️';
            }
        });
    }

    // ========================================
    // 2. NAVBAR DYNAMIQUE (fond après 80px)
    // ========================================
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ========================================
    // 3. MENU HAMBURGER
    // ========================================
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.navbar-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('open');
        });
        
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }

    // ========================================
    // 4. COMPTE À REBOURS
    // ========================================
    function updateCountdown() {
        const targetDate = new Date('October 15, 2026 09:00:00').getTime();
        const now = new Date().getTime();
        const diff = targetDate - now;
        
        if (diff <= 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ========================================
    // 5. BOUTON RETOUR EN HAUT
    // ========================================
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========================================
    // 6. ANNÉE DYNAMIQUE DANS LE FOOTER
    // ========================================
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

    // ========================================
    // 7. INTERSECTION OBSERVER - ANIMATIONS
    // ========================================
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .zoom-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => observer.observe(el));

    // ========================================
    // 8. COMPTEURS ANIMÉS AU SCROLL
    // ========================================
    const counters = document.querySelectorAll('.stat-item .number');
    let countersAnimated = false;
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000;
                    const startTime = performance.now();
                    
                    function updateCounter(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const value = Math.floor(progress * target);
                        counter.textContent = value;
                        
                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    }
                    requestAnimationFrame(updateCounter);
                });
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        counterObserver.observe(statsSection);
    }

    // ========================================
    // 9. ONGLETS DU PROGRAMME
    // ========================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            tabContents.forEach(content => content.classList.remove('active'));
            
            const target = this.getAttribute('data-day');
            const targetContent = document.getElementById(target);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // ========================================
    // 10. FILTRAGE DYNAMIQUE DES INTERVENANTS
    // ========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const speakerCards = document.querySelectorAll('.speaker-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            speakerCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    card.classList.remove('visible');
                    setTimeout(() => card.classList.add('visible'), 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

        // ========================================
    // 11. VALIDATION DU FORMULAIRE
    // ========================================
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
            
            inputs.forEach(input => {
                const formGroup = input.closest('.form-group');
                const errorMsg = formGroup.querySelector('.error-message');
                
                formGroup.classList.remove('error', 'success');
                
                let value = input.value.trim();
                
                if (input.type === 'email' && value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        isValid = false;
                        formGroup.classList.add('error');
                        if (errorMsg) errorMsg.textContent = 'Veuillez entrer un email valide';
                    } else {
                        formGroup.classList.add('success');
                    }
                }
                else if (input.id === 'phone' && value) {
                    const phoneRegex = /^[0-9]{8,}$/;
                    if (!phoneRegex.test(value.replace(/[^0-9]/g, ''))) {
                        isValid = false;
                        formGroup.classList.add('error');
                        if (errorMsg) errorMsg.textContent = 'Téléphone minimum 8 chiffres';
                    } else {
                        formGroup.classList.add('success');
                    }
                }
                else if (input.tagName === 'TEXTAREA' && value) {
                    if (value.length < 20) {
                        isValid = false;
                        formGroup.classList.add('error');
                        if (errorMsg) errorMsg.textContent = 'Message minimum 20 caractères';
                    } else {
                        formGroup.classList.add('success');
                    }
                }
                else if (!value) {
                    isValid = false;
                    formGroup.classList.add('error');
                    if (errorMsg) errorMsg.textContent = 'Ce champ est requis';
                } else {
                    formGroup.classList.add('success');
                }
            });
            
            if (isValid) {
                successMessage.classList.add('show');
                form.reset();
                document.querySelectorAll('.form-group').forEach(g => g.classList.remove('success'));
                
                setTimeout(() => {
                    successMessage.classList.remove('show');
                }, 5000);
            } else {
                const firstError = document.querySelector('.form-group.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
        
        form.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('input', function() {
                const formGroup = this.closest('.form-group');
                if (formGroup.classList.contains('error') || formGroup.classList.contains('success')) {
                    formGroup.classList.remove('error', 'success');
                }
            });
        });
    }
