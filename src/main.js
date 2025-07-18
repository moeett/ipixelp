import './style.css'

// Modern JavaScript for International Pixel Production Website

class IPPixelWebsite {
  constructor() {
    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupThemeToggle();
    this.setupScrollEffects();
    this.setupAnimations();
    this.setupPortfolio();
    this.setupStats();
    this.setupAboutSection();
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

    // Active link highlighting
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

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
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

      // Switch about section theme
      this.switchAboutTheme(newTheme);

      // Switch stats section theme
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
    const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .stat-item');
    animateElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

  // Portfolio functionality
  setupPortfolio() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const playOverlays = document.querySelectorAll('.portfolio-play-overlay');

    // Handle legacy portfolio items
    portfolioItems.forEach(item => {
      const playButton = item.querySelector('.portfolio-play');

      playButton?.addEventListener('click', () => {
        // Here you would implement video modal or redirect
        console.log('Play video for:', item.querySelector('.portfolio-title')?.textContent);
      });
    });

    // Handle new video portfolio items
    playOverlays.forEach(overlay => {
      overlay.addEventListener('click', function(e) {
        e.preventDefault();
        const video = this.parentElement.querySelector('.portfolio-video');

        if (video.paused) {
          // Pause all other videos first
          document.querySelectorAll('.portfolio-video').forEach(v => {
            if (v !== video) {
              v.pause();
              v.parentElement.querySelector('.portfolio-play-overlay').style.opacity = '0';
            }
          });

          // Play this video
          video.play();
          this.style.opacity = '0';

          // Show overlay again when video ends
          video.addEventListener('ended', () => {
            this.style.opacity = '1';
          });

          // Show overlay when video is paused
          video.addEventListener('pause', () => {
            if (!video.ended) {
              this.style.opacity = '1';
            }
          });

        } else {
          video.pause();
          this.style.opacity = '1';
        }
      });
    });

    // Handle video hover effects
    const portfolioCards = document.querySelectorAll('.portfolio-card-brutalist');
    portfolioCards.forEach(card => {
      const video = card.querySelector('.portfolio-video');
      const overlay = card.querySelector('.portfolio-play-overlay');

      if (video && overlay) {
        card.addEventListener('mouseenter', () => {
          if (video.paused) {
            overlay.style.opacity = '1';
          }
        });

        card.addEventListener('mouseleave', () => {
          if (video.paused) {
            overlay.style.opacity = '0';
          }
        });
      }
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

  // About section functionality
  setupAboutSection() {
    // Initialize theme based on current setting
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    this.switchAboutTheme(currentTheme);
    this.switchStatsTheme(currentTheme);

    // Setup text animation
    this.setupAboutTextAnimation();
  }

  switchAboutTheme(theme) {
    const lightVersion = document.querySelector('.about-light');
    const darkVersion = document.querySelector('.about-dark');

    console.log('Switching about theme to:', theme); // Debug log

    if (lightVersion && darkVersion) {
      if (theme === 'light') {
        lightVersion.style.display = 'block';
        darkVersion.style.display = 'none';
        console.log('Showing light version'); // Debug log
      } else {
        lightVersion.style.display = 'none';
        darkVersion.style.display = 'block';
        console.log('Showing dark version'); // Debug log
      }
    }
  }

  switchStatsTheme(theme) {
    const lightVersion = document.querySelector('.stats-light');
    const darkVersion = document.querySelector('.stats-dark');

    console.log('Switching stats theme to:', theme); // Debug log

    if (lightVersion && darkVersion) {
      if (theme === 'light') {
        lightVersion.style.display = 'block';
        darkVersion.style.display = 'none';
        console.log('Showing stats light version'); // Debug log
      } else {
        lightVersion.style.display = 'none';
        darkVersion.style.display = 'block';
        console.log('Showing stats dark version'); // Debug log
      }
    }
  }

  setupAboutTextAnimation() {
    // Animate text switching for about section
    document.querySelectorAll('.animated-text-about').forEach(container => {
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
      }, 3000);
    });
  }
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new IPPixelWebsite();
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
