import './style.css'
import './notre-agence-styles.css'

// Notre Agence JavaScript functionality
class NotreAgenceWebsite {
  constructor() {
    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupThemeToggle();
    this.setupScrollEffects();
    this.setupAnimations();
    this.setupStats();
    this.setupHeroTextAnimation();
    this.setupClientsCarousel();
    this.setupHistoireSection();
  }

  // Navigation functionality
  setupNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle) {
      navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
      });
    }

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle?.classList.remove('active');
        navMenu?.classList.remove('active');
      });
    });

    // Active link highlighting for page sections
    this.updateActiveLink();
    window.addEventListener('scroll', () => this.updateActiveLink());
  }

  updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    // Keep "Notre agence" active since we're on this page
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === 'notre-agence.html') {
        link.classList.add('active');
      }
    });
  }

  // Theme toggle functionality
  setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle?.querySelector('.theme-icon');

    // Check for saved theme preference or default to dark
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (themeIcon) {
      themeIcon.textContent = currentTheme === 'dark' ? '🌙' : '☀️';
    }

    themeToggle?.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);

      if (themeIcon) {
        themeIcon.textContent = newTheme === 'dark' ? '🌙' : '☀️';
      }

      // Switch theme for all sections
      this.switchHistoireTheme(newTheme);
      this.switchStatsTheme(newTheme);
    });
  }

  // Scroll effects
  setupScrollEffects() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        navbar?.classList.add('scrolled');
      } else {
        navbar?.classList.remove('scrolled');
      }
    });
  }

  // Animation on scroll
  setupAnimations() {
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
    const animateElements = document.querySelectorAll('.team-card-brutalist, .stat-card-brutalist, .client-card');
    animateElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

  // Animated statistics counter
  setupStats() {
    const statNumbers = document.querySelectorAll('.stat-number');

    const animateCounter = (element) => {
      const target = parseInt(element.getAttribute('data-target'));
      const increment = target / 100;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current);

        if (current >= target) {
          element.textContent = target;
          clearInterval(timer);
        }
      }, 20);
    };

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          statsObserver.unobserve(entry.target);
        }
      });
    });

    statNumbers.forEach(stat => {
      statsObserver.observe(stat);
    });
  }

  // Hero text animation
  setupHeroTextAnimation() {
    document.querySelectorAll('.animated-text-hero').forEach(container => {
      const spans = container.querySelectorAll('span');
      let currentIndex = 0;

      // Initialize: show first span, hide others
      spans.forEach((span, index) => {
        if (index === 0) {
          span.style.opacity = '1';
          span.style.display = 'block';
        } else {
          span.style.opacity = '0';
          span.style.display = 'none';
        }
      });

      setInterval(() => {
        // Fade out current
        spans[currentIndex].style.opacity = '0';
        setTimeout(() => {
          spans[currentIndex].style.display = 'none';

          // Move to next
          currentIndex = (currentIndex + 1) % spans.length;

          // Fade in next
          spans[currentIndex].style.display = 'block';
          setTimeout(() => {
            spans[currentIndex].style.opacity = '1';
          }, 50);
        }, 300);
      }, 4000); // Slower timing for hero
    });
  }

  // Clients carousel
  setupClientsCarousel() {
    const carousel = document.getElementById('clients-carousel');
    if (!carousel) return;

    // Duplicate the carousel content for seamless infinite scroll
    const carouselContent = carousel.innerHTML;
    carousel.innerHTML = carouselContent + carouselContent;

    // Auto scroll animation
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame

    const animate = () => {
      scrollPosition += scrollSpeed;
      
      // Reset position when we've scrolled through the original content
      if (scrollPosition >= carousel.scrollWidth / 2) {
        scrollPosition = 0;
      }
      
      carousel.style.transform = `translateX(-${scrollPosition}px)`;
      requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Pause on hover
    carousel.addEventListener('mouseenter', () => {
      carousel.style.animationPlayState = 'paused';
    });

    carousel.addEventListener('mouseleave', () => {
      carousel.style.animationPlayState = 'running';
    });
  }

  // Histoire section functionality
  setupHistoireSection() {
    // Initialize theme based on current setting
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    this.switchHistoireTheme(currentTheme);
    this.switchStatsTheme(currentTheme);
  }

  switchHistoireTheme(theme) {
    const lightVersion = document.querySelector('.histoire-light');
    const darkVersion = document.querySelector('.histoire-dark');

    if (lightVersion && darkVersion) {
      if (theme === 'light') {
        lightVersion.style.display = 'block';
        darkVersion.style.display = 'none';
      } else {
        lightVersion.style.display = 'none';
        darkVersion.style.display = 'block';
      }
    }
  }

  switchStatsTheme(theme) {
    const lightVersion = document.querySelector('.stats-light');
    const darkVersion = document.querySelector('.stats-dark');

    if (lightVersion && darkVersion) {
      if (theme === 'light') {
        lightVersion.style.display = 'block';
        darkVersion.style.display = 'none';
      } else {
        lightVersion.style.display = 'none';
        darkVersion.style.display = 'block';
      }
    }
  }
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new NotreAgenceWebsite();
});

// Smooth scrolling for anchor links
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