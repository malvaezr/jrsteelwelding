/**
 * J & R Steel Welding - Main JavaScript
 * Interactive features: animations, filters, slider, form handling
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initNavigation();
    initScrollAnimations();
    initCounterAnimation();
    initProjectFilters();
    initMediaSliders();
    initTestimonialSlider();
    initQuoteForm();
    initSmoothScroll();
});

/**
 * Navigation Module
 * Handles mobile menu toggle and scroll-based navbar styling
 */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    navToggle?.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle?.classList.remove('active');
            navMenu?.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }, { passive: true });
}

/**
 * Scroll Animations Module
 * Reveals elements when they enter the viewport
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add delay based on data attribute
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);

                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));
}

/**
 * Counter Animation Module
 * Animates numbers when they come into view
 */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.dataset.count);
    const duration = 2000; // 2 seconds
    const step = (target / duration) * 16; // 60fps
    let current = 0;

    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    requestAnimationFrame(updateCounter);
}

/**
 * Project Filters Module
 * Filters project cards based on category
 */
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;

            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter projects with animation
            projectCards.forEach(card => {
                const category = card.dataset.category;

                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';

                    requestAnimationFrame(() => {
                        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    });
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        card.classList.add('hidden');
                    }, 400);
                }
            });
        });
    });
}

/**
 * Media Slider Module
 * Handles image/video galleries within project cards
 */
function initMediaSliders() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        const slider = card.querySelector('.media-slider');
        const prevBtn = card.querySelector('.media-prev');
        const nextBtn = card.querySelector('.media-next');
        const counter = card.querySelector('.media-counter');

        if (!slider) return;

        const mediaItems = slider.querySelectorAll('img, video');
        if (mediaItems.length <= 1) {
            // Hide controls if only one image
            const controls = card.querySelector('.media-controls');
            if (controls) controls.style.display = 'none';
            return;
        }

        let currentIndex = 0;
        const totalItems = mediaItems.length;

        function updateSlider() {
            mediaItems.forEach((item, index) => {
                if (index === currentIndex) {
                    item.classList.remove('hidden');
                    // Auto-play video when visible
                    if (item.tagName === 'VIDEO') {
                        item.play();
                    }
                } else {
                    item.classList.add('hidden');
                    // Pause video when hidden
                    if (item.tagName === 'VIDEO') {
                        item.pause();
                    }
                }
            });

            if (counter) {
                counter.textContent = `${currentIndex + 1} / ${totalItems}`;
            }
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalItems;
            updateSlider();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
            updateSlider();
        }

        prevBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            prevSlide();
        });

        nextBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            nextSlide();
        });

        // Initialize
        updateSlider();
    });
}

/**
 * Testimonial Slider Module
 * Handles testimonial carousel navigation
 */
function initTestimonialSlider() {
    const track = document.querySelector('.testimonial-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.testimonial-btn.prev');
    const nextBtn = document.querySelector('.testimonial-btn.next');
    const dotsContainer = document.querySelector('.testimonial-dots');

    if (!track || cards.length === 0) return;

    let currentIndex = 0;
    const totalSlides = cards.length;

    // Create dots
    cards.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer?.appendChild(dot);
    });

    const dots = document.querySelectorAll('.testimonial-dots .dot');

    function updateSlider() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
    }

    prevBtn?.addEventListener('click', prevSlide);
    nextBtn?.addEventListener('click', nextSlide);

    // Auto-advance every 6 seconds
    let autoSlide = setInterval(nextSlide, 6000);

    // Pause on hover
    track.addEventListener('mouseenter', () => clearInterval(autoSlide));
    track.addEventListener('mouseleave', () => {
        autoSlide = setInterval(nextSlide, 6000);
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
}

/**
 * Quote Form Module
 * Handles form validation and submission
 */
function initQuoteForm() {
    const form = document.getElementById('quoteForm');
    const submitBtn = form?.querySelector('.btn-submit');
    const formSuccess = document.getElementById('formSuccess');

    form?.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Basic validation
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // Show loading state
        submitBtn?.classList.add('loading');

        // Collect form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Simulate API call (replace with actual endpoint)
        try {
            await simulateSubmission(data);

            // Show success message
            form.style.display = 'none';
            formSuccess?.classList.add('show');

            // Reset form for potential re-use
            form.reset();
        } catch (error) {
            console.error('Form submission error:', error);
            alert('There was an error submitting your request. Please try again or contact us directly.');
        } finally {
            submitBtn?.classList.remove('loading');
        }
    });

    // Add input animations
    const inputs = form?.querySelectorAll('input, select, textarea');
    inputs?.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement?.classList.add('focused');
        });
        input.addEventListener('blur', () => {
            input.parentElement?.classList.remove('focused');
        });
    });
}

function simulateSubmission(data) {
    // Simulates a network request - replace with actual API call
    return new Promise((resolve) => {
        console.log('Form data:', data);
        setTimeout(resolve, 1500);
    });
}

/**
 * Smooth Scroll Module
 * Handles smooth scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                const navbarHeight = document.getElementById('navbar')?.offsetHeight || 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Parallax Effect (Optional)
 * Adds subtle parallax to hero section
 */
function initParallax() {
    const hero = document.querySelector('.hero');

    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;

        hero.style.backgroundPositionY = `${rate}px`;
    }, { passive: true });
}

// Initialize parallax if desired
// initParallax();

/**
 * Lazy Loading Images (Progressive Enhancement)
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if images have data-src
initLazyLoading();
