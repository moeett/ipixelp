import './style.css'
import './performance.js'

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
    this.setupSplineViewers();
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

  // Optimized animation on scroll
  setupAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target); // Stop observing once animated
        }
      });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .stat-item');
    animateElements.forEach(el => {
      el.classList.add('animate-ready');
      observer.observe(el);
    });
  }

  // Portfolio functionality
  setupPortfolio() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const playOverlays = document.querySelectorAll('.portfolio-play-overlay');

    // Setup lazy loading for videos
    this.setupVideoLazyLoading();

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

  // Optimized statistics counter
  setupStats() {
    const statNumbers = document.querySelectorAll('.stat-number');

    const animateCounter = (element) => {
      const target = parseInt(element.getAttribute('data-target'));
      const duration = 2000; // 2 seconds
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Use easing function for smoother animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(easeOutQuart * target);

        element.textContent = current;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          element.textContent = target;
        }
      };

      requestAnimationFrame(updateCounter);
    };

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

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

  // Spline viewer setup with error handling
  setupSplineViewers() {
    const loading = document.getElementById('hero-loading');
    const desktopViewer = document.getElementById('hero-desktop-viewer');
    const mobileViewer = document.getElementById('hero-mobile-viewer');
    const fallback = document.getElementById('hero-fallback');

    let loadTimeout;
    let hasLoaded = false;

    // Set a timeout for loading
    loadTimeout = setTimeout(() => {
      if (!hasLoaded) {
        console.warn('Spline viewers taking too long to load, showing fallback');
        this.showHeroFallback();
      }
    }, 8000); // 8 second timeout

    // Function to show fallback
    const showFallback = () => {
      if (hasLoaded) return;
      hasLoaded = true;
      clearTimeout(loadTimeout);
      this.showHeroFallback();
    };

    // Function to show loaded viewer
    const showViewer = (viewer) => {
      if (hasLoaded) return;
      hasLoaded = true;
      clearTimeout(loadTimeout);

      if (loading) loading.style.display = 'none';
      if (fallback) fallback.style.display = 'none';
      viewer.style.display = 'block';
    };

    // Add error handling for both viewers
    if (desktopViewer) {
      desktopViewer.addEventListener('load', () => {
        console.log('Desktop Spline viewer loaded');
        showViewer(desktopViewer);
      });

      desktopViewer.addEventListener('error', (e) => {
        console.error('Desktop Spline viewer failed to load:', e);
        showFallback();
      });
    }

    if (mobileViewer) {
      mobileViewer.addEventListener('load', () => {
        console.log('Mobile Spline viewer loaded');
        showViewer(mobileViewer);
      });

      mobileViewer.addEventListener('error', (e) => {
        console.error('Mobile Spline viewer failed to load:', e);
        showFallback();
      });
    }

    // Check WebGL support
    if (!this.checkWebGLSupport()) {
      console.warn('WebGL not supported, showing fallback');
      showFallback();
      return;
    }

    // Monitor for WebGL context loss
    this.setupWebGLErrorHandling();
  }

  showHeroFallback() {
    const loading = document.getElementById('hero-loading');
    const desktopViewer = document.getElementById('hero-desktop-viewer');
    const mobileViewer = document.getElementById('hero-mobile-viewer');
    const fallback = document.getElementById('hero-fallback');

    if (loading) loading.style.display = 'none';
    if (desktopViewer) desktopViewer.style.display = 'none';
    if (mobileViewer) mobileViewer.style.display = 'none';
    if (fallback) fallback.style.display = 'flex';
  }

  checkWebGLSupport() {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      return !!gl;
    } catch (e) {
      return false;
    }
  }

  setupWebGLErrorHandling() {
    // Listen for WebGL context lost events
    window.addEventListener('webglcontextlost', (e) => {
      console.error('WebGL context lost:', e);
      e.preventDefault();
      this.showHeroFallback();
    });

    // Monitor for WebGL errors in console
    const originalError = console.error;
    console.error = (...args) => {
      const message = args.join(' ');
      if (message.includes('WebGL') || message.includes('GL_INVALID')) {
        // WebGL error detected, consider showing fallback
        setTimeout(() => {
          const loading = document.getElementById('hero-loading');
          if (loading && loading.style.display !== 'none') {
            this.showHeroFallback();
          }
        }, 2000);
      }
      originalError.apply(console, args);
    };
  }

  // Video lazy loading functionality
  setupVideoLazyLoading() {
    const videos = document.querySelectorAll('.portfolio-video[data-src]');

    // Intersection Observer for lazy loading
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const video = entry.target;
          this.loadVideo(video);
          videoObserver.unobserve(video);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.1
    });

    videos.forEach(video => {
      videoObserver.observe(video);
    });
  }

  loadVideo(video) {
    const dataSrc = video.getAttribute('data-src');
    const source = video.querySelector('source[data-src]');

    if (dataSrc) {
      video.src = dataSrc;
      video.removeAttribute('data-src');
    }

    if (source && source.getAttribute('data-src')) {
      source.src = source.getAttribute('data-src');
      source.removeAttribute('data-src');
    }

    // Preload metadata only when needed
    video.preload = 'metadata';

    // Add error handling
    video.addEventListener('error', (e) => {
      console.warn('Video failed to load:', video.src, e);
      // Hide play overlay if video fails
      const overlay = video.parentElement.querySelector('.portfolio-play-overlay');
      if (overlay) {
        overlay.style.display = 'none';
      }
    });

    video.addEventListener('loadedmetadata', () => {
      console.log('Video metadata loaded:', video.src);
    });
  }
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new IPPixelWebsite();

  // Register service worker for caching
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('Service Worker registered:', registration);
      })
      .catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
  }
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
