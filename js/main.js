/**
 * J & R Steel Welding - Main JavaScript
 * Interactive features: animations, filters, slider, form handling
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initNavigation();
    initScrollAnimations();
    initCounterAnimation();
    initMediaCarousels();
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
 * Media Carousel Module
 * Handles video autoplay, auto-rotation, and manual controls for project spotlights
 */
function initMediaCarousels() {
    const spotlights = document.querySelectorAll('.project-spotlight');

    spotlights.forEach(spotlight => {
        const carousel = spotlight.querySelector('.media-carousel');
        const mediaItems = spotlight.querySelectorAll('.media-item');
        const indicators = spotlight.querySelectorAll('.indicator');
        const prevBtn = spotlight.querySelector('.media-nav-btn.prev');
        const nextBtn = spotlight.querySelector('.media-nav-btn.next');
        const videoControl = spotlight.querySelector('.video-control');

        if (!carousel || mediaItems.length === 0) return;

        let currentIndex = 0;
        let autoplayInterval = null;
        let isPaused = false;
        const totalItems = mediaItems.length;
        const interval = parseInt(carousel.dataset.interval) || 6000;
        const shouldAutoplay = carousel.dataset.autoplay === 'true';

        // Get current video element
        function getCurrentVideo() {
            const activeItem = mediaItems[currentIndex];
            return activeItem?.querySelector('video');
        }

        // Update carousel display
        function updateCarousel() {
            mediaItems.forEach((item, index) => {
                const isActive = index === currentIndex;
                item.classList.toggle('active', isActive);

                // Handle video play/pause
                const video = item.querySelector('video');
                if (video) {
                    if (isActive && !isPaused) {
                        video.play().catch(() => {});
                    } else {
                        video.pause();
                    }
                }
            });

            // Update indicators
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentIndex);
            });

            // Update video control visibility
            updateVideoControl();
        }

        // Update video control button state
        function updateVideoControl() {
            const video = getCurrentVideo();
            const pauseIcon = videoControl?.querySelector('.icon-pause');
            const playIcon = videoControl?.querySelector('.icon-play');

            if (video && videoControl) {
                videoControl.style.display = 'flex';
                if (isPaused) {
                    pauseIcon?.classList.add('hidden');
                    playIcon?.classList.remove('hidden');
                } else {
                    pauseIcon?.classList.remove('hidden');
                    playIcon?.classList.add('hidden');
                }
            } else if (videoControl) {
                // Hide control if not on video
                videoControl.style.display = 'none';
            }
        }

        // Go to specific slide
        function goToSlide(index) {
            currentIndex = index;
            updateCarousel();
            resetAutoplay();
        }

        // Next slide
        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel();
        }

        // Previous slide
        function prevSlide() {
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
            updateCarousel();
        }

        // Start autoplay
        function startAutoplay() {
            if (shouldAutoplay && !autoplayInterval) {
                autoplayInterval = setInterval(nextSlide, interval);
            }
        }

        // Stop autoplay
        function stopAutoplay() {
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
                autoplayInterval = null;
            }
        }

        // Reset autoplay timer
        function resetAutoplay() {
            stopAutoplay();
            startAutoplay();
        }

        // Toggle video play/pause
        function toggleVideo() {
            const video = getCurrentVideo();
            if (video) {
                if (video.paused) {
                    video.play().catch(() => {});
                    isPaused = false;
                } else {
                    video.pause();
                    isPaused = true;
                }
                updateVideoControl();
            }
        }

        // Event Listeners
        prevBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            prevSlide();
            resetAutoplay();
        });

        nextBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            nextSlide();
            resetAutoplay();
        });

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => goToSlide(index));
        });

        videoControl?.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleVideo();
        });

        // Pause autoplay on hover
        spotlight.addEventListener('mouseenter', stopAutoplay);
        spotlight.addEventListener('mouseleave', () => {
            if (!isPaused) startAutoplay();
        });

        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            stopAutoplay();
        }, { passive: true });

        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            handleSwipe();
            if (!isPaused) startAutoplay();
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

        // Initialize carousel with IntersectionObserver for performance
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCarousel();
                    startAutoplay();
                } else {
                    stopAutoplay();
                    // Pause all videos when not visible
                    mediaItems.forEach(item => {
                        const video = item.querySelector('video');
                        if (video) video.pause();
                    });
                }
            });
        }, { threshold: 0.3 });

        observer.observe(spotlight);

        // Initial setup
        updateCarousel();
    });
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
