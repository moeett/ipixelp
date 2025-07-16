import './index.css'
import * as lucideIcons from 'lucide'

// Performance optimization: Lazy load icons
const iconCache = new Map();

function getIcon(name) {
  if (iconCache.has(name)) {
    return iconCache.get(name);
  }
  
  const icon = lucideIcons[name];
  if (icon) {
    iconCache.set(name, icon);
  }
  return icon;
}

// Initialize app with performance optimizations
async function initializeApp() {
  try {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      await new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve));
    }

    const root = document.getElementById('root');
    if (!root) return;

    // Render main content
    root.innerHTML = `
      <nav class="navbar">
        <div class="nav-container">
          <div class="nav-logo">iPixel</div>
          <button class="nav-toggle" id="navToggle" aria-label="Toggle navigation">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul class="nav-menu" id="navMenu">
            <li><a href="#home" class="nav-link">Home</a></li>
            <li><a href="#services" class="nav-link">Services</a></li>
            <li><a href="#portfolio" class="nav-link">Portfolio</a></li>
            <li><a href="#about" class="nav-link">About</a></li>
            <li><a href="#contact" class="nav-link">Contact</a></li>
          </ul>
        </div>
      </nav>

      <main>
        <section id="home" class="hero-section">
          <!-- Spline viewer will be injected here by index.html -->
          <div class="hero-overlay">
            <div class="hero-content">
              <h1 class="hero-title">Welcome to iPixel Productions</h1>
              <p class="hero-subtitle">Creating Immersive 3D & Animation Experiences</p>
              <div class="hero-buttons">
                <a href="#portfolio" class="btn btn-primary">View Our Work</a>
                <a href="#contact" class="btn btn-secondary">Get In Touch</a>
              </div>
            </div>
          </div>
        </section>

        <section id="services" class="section services-section">
          <div class="container">
            <div class="section-header">
              <h2 class="section-title">Our Services</h2>
              <p class="section-subtitle">Bringing your vision to life with cutting-edge technology</p>
            </div>
            <div class="services-grid">
              <div class="service-card">
                <div class="service-icon" data-icon="Cube"></div>
                <h3>3D Modeling & Animation</h3>
                <p>High-quality 3D assets and animations for games, films, and interactive experiences.</p>
              </div>
              <div class="service-card">
                <div class="service-icon" data-icon="Palette"></div>
                <h3>Visual Effects</h3>
                <p>Stunning VFX that seamlessly blend reality with imagination.</p>
              </div>
              <div class="service-card">
                <div class="service-icon" data-icon="Gamepad2"></div>
                <h3>Interactive Experiences</h3>
                <p>Engaging interactive content for web, mobile, and VR/AR platforms.</p>
              </div>
              <div class="service-card">
                <div class="service-icon" data-icon="Video"></div>
                <h3>Motion Graphics</h3>
                <p>Dynamic motion graphics that capture attention and communicate your message.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="portfolio" class="section portfolio-section">
          <div class="container">
            <div class="section-header">
              <h2 class="section-title">Portfolio</h2>
              <p class="section-subtitle">Explore our latest projects</p>
            </div>
            <div class="portfolio-grid">
              <div class="portfolio-item">
                <div class="portfolio-image-placeholder"></div>
                <div class="portfolio-content">
                  <h3>Project Alpha</h3>
                  <p>3D Animation</p>
                </div>
              </div>
              <div class="portfolio-item">
                <div class="portfolio-image-placeholder"></div>
                <div class="portfolio-content">
                  <h3>Project Beta</h3>
                  <p>Interactive Experience</p>
                </div>
              </div>
              <div class="portfolio-item">
                <div class="portfolio-image-placeholder"></div>
                <div class="portfolio-content">
                  <h3>Project Gamma</h3>
                  <p>Visual Effects</p>
                </div>
              </div>
              <div class="portfolio-item">
                <div class="portfolio-image-placeholder"></div>
                <div class="portfolio-content">
                  <h3>Project Delta</h3>
                  <p>Motion Graphics</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" class="section about-section">
          <div class="container">
            <div class="section-header">
              <h2 class="section-title">About iPixel</h2>
            </div>
            <div class="about-content">
              <div class="about-text">
                <p>iPixel Productions is a creative studio specializing in 3D animation, visual effects, and interactive digital experiences. With a passion for innovation and storytelling, we transform ideas into immersive realities.</p>
                <p>Our team of talented artists and developers combines artistic vision with technical expertise to deliver exceptional results that exceed expectations.</p>
              </div>
              <div class="about-stats">
                <div class="stat">
                  <div class="stat-number">50+</div>
                  <div class="stat-label">Projects Completed</div>
                </div>
                <div class="stat">
                  <div class="stat-number">30+</div>
                  <div class="stat-label">Happy Clients</div>
                </div>
                <div class="stat">
                  <div class="stat-number">5</div>
                  <div class="stat-label">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" class="section contact-section">
          <div class="container">
            <div class="section-header">
              <h2 class="section-title">Get In Touch</h2>
              <p class="section-subtitle">Let's create something amazing together</p>
            </div>
            <div class="contact-content">
              <form class="contact-form" id="contactForm">
                <div class="form-group">
                  <input type="text" name="name" placeholder="Your Name" required>
                </div>
                <div class="form-group">
                  <input type="email" name="email" placeholder="Your Email" required>
                </div>
                <div class="form-group">
                  <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Send Message</button>
              </form>
              <div class="contact-info">
                <div class="info-item">
                  <div class="info-icon" data-icon="Mail"></div>
                  <p>hello@ipixelproductions.com</p>
                </div>
                <div class="info-item">
                  <div class="info-icon" data-icon="Phone"></div>
                  <p>+1 (555) 123-4567</p>
                </div>
                <div class="info-item">
                  <div class="info-icon" data-icon="MapPin"></div>
                  <p>Los Angeles, CA</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer class="footer">
        <div class="container">
          <div class="footer-content">
            <div class="footer-brand">
              <h3>iPixel Productions</h3>
              <p>Creating immersive digital experiences</p>
            </div>
            <div class="footer-links">
              <a href="#services">Services</a>
              <a href="#portfolio">Portfolio</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </div>
            <div class="footer-social">
              <a href="#" aria-label="Twitter" data-icon="Twitter"></a>
              <a href="#" aria-label="LinkedIn" data-icon="Linkedin"></a>
              <a href="#" aria-label="Instagram" data-icon="Instagram"></a>
            </div>
          </div>
          <div class="footer-bottom">
            <p>&copy; 2024 iPixel Productions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    `;

    // Initialize UI components with optimizations
    initializeNavigation();
    
    // Defer icon loading
    requestIdleCallback(() => initializeIcons(), { timeout: 1000 });
    
    // Defer form initialization
    requestIdleCallback(() => initializeContactForm(), { timeout: 1500 });
    
    // Initialize smooth scrolling with passive listeners
    initializeSmoothScroll();

  } catch (error) {
    console.error('App initialization error:', error);
  }
}

// Optimized navigation initialization
function initializeNavigation() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    }, { passive: true });

    // Close menu on link click
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }, { passive: true });
    });
  }
}

// Lazy load icons
function initializeIcons() {
  document.querySelectorAll('[data-icon]').forEach(element => {
    const iconName = element.getAttribute('data-icon');
    const Icon = getIcon(iconName);
    
    if (Icon) {
      element.innerHTML = Icon.createIcon().innerHTML;
    }
  });
}

// Initialize contact form with debouncing
function initializeContactForm() {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simple form handling
      const formData = new FormData(form);
      console.log('Form submitted:', Object.fromEntries(formData));
      
      // Show success message
      form.innerHTML = `
        <div class="form-success">
          <h3>Thank you!</h3>
          <p>We'll get back to you soon.</p>
        </div>
      `;
    });
  }
}

// Optimized smooth scrolling with passive listeners
function initializeSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, { passive: false }); // Can't be passive since we preventDefault
  });
}

// WebGL error monitoring and recovery
if (window.PERFORMANCE_CONFIG?.enableSpline) {
  let webglErrorCount = 0;
  const maxWebGLErrors = 10;

  const originalError = console.error;
  console.error = function(...args) {
    const errorString = args.join(' ');

    if (errorString.includes('WebGL') || errorString.includes('GL_INVALID')) {
      webglErrorCount++;

      if (webglErrorCount > maxWebGLErrors) {
        console.warn('Too many WebGL errors. Disabling 3D content.');
        window.PERFORMANCE_CONFIG.enableSpline = false;

        // Remove Spline viewers
        document.querySelectorAll('spline-viewer').forEach(viewer => {
          viewer.remove();
        });

        // Show fallback content
        const heroSection = document.querySelector('.hero-section');
        if (heroSection && !heroSection.querySelector('.hero-fallback')) {
          const fallback = document.createElement('div');
          fallback.className = 'hero-fallback';
          fallback.innerHTML = `
            <div class="hero-fallback-content">
              <h1>iPixel Productions</h1>
              <p>Creating Immersive Digital Experiences</p>
            </div>
          `;
          heroSection.appendChild(fallback);
        }
      }
    }

    originalError.apply(console, args);
  };
}

// Start app initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

// Export for testing
export { initializeApp, getIcon };
