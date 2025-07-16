// Performance monitoring and optimization utilities

class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.init();
  }

  init() {
    // Monitor Core Web Vitals
    this.observeWebVitals();
    
    // Monitor resource loading
    this.observeResourceTiming();
    
    // Monitor long tasks
    this.observeLongTasks();
    
    // Report metrics after page load
    window.addEventListener('load', () => {
      setTimeout(() => this.reportMetrics(), 1000);
    });
  }

  observeWebVitals() {
    // Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.metrics.lcp = lastEntry.startTime;
        console.log('LCP:', lastEntry.startTime);
      });
      
      try {
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        console.warn('LCP observation not supported');
      }

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          this.metrics.fid = entry.processingStart - entry.startTime;
          console.log('FID:', entry.processingStart - entry.startTime);
        });
      });
      
      try {
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        console.warn('FID observation not supported');
      }

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        this.metrics.cls = clsValue;
        console.log('CLS:', clsValue);
      });
      
      try {
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        console.warn('CLS observation not supported');
      }
    }
  }

  observeResourceTiming() {
    if ('PerformanceObserver' in window) {
      const resourceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          // Log slow resources
          if (entry.duration > 1000) {
            console.warn('Slow resource:', entry.name, entry.duration + 'ms');
          }
          
          // Track video loading performance
          if (entry.name.includes('.mp4') || entry.name.includes('video')) {
            console.log('Video load time:', entry.name, entry.duration + 'ms');
          }
        });
      });
      
      try {
        resourceObserver.observe({ entryTypes: ['resource'] });
      } catch (e) {
        console.warn('Resource timing observation not supported');
      }
    }
  }

  observeLongTasks() {
    if ('PerformanceObserver' in window) {
      const longTaskObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          console.warn('Long task detected:', entry.duration + 'ms', entry);
          this.metrics.longTasks = (this.metrics.longTasks || 0) + 1;
        });
      });
      
      try {
        longTaskObserver.observe({ entryTypes: ['longtask'] });
      } catch (e) {
        console.warn('Long task observation not supported');
      }
    }
  }

  reportMetrics() {
    // Get navigation timing
    const navigation = performance.getEntriesByType('navigation')[0];
    if (navigation) {
      this.metrics.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
      this.metrics.loadComplete = navigation.loadEventEnd - navigation.loadEventStart;
      this.metrics.totalLoadTime = navigation.loadEventEnd - navigation.fetchStart;
    }

    // Report all metrics
    console.group('Performance Metrics');
    console.log('Total Load Time:', this.metrics.totalLoadTime + 'ms');
    console.log('DOM Content Loaded:', this.metrics.domContentLoaded + 'ms');
    console.log('Load Complete:', this.metrics.loadComplete + 'ms');
    console.log('LCP:', this.metrics.lcp + 'ms');
    console.log('FID:', this.metrics.fid + 'ms');
    console.log('CLS:', this.metrics.cls);
    console.log('Long Tasks:', this.metrics.longTasks || 0);
    console.groupEnd();

    // Send metrics to analytics (if needed)
    this.sendMetrics();
  }

  sendMetrics() {
    // This could send metrics to Google Analytics, monitoring service, etc.
    // For now, just store in localStorage for debugging
    try {
      localStorage.setItem('performance-metrics', JSON.stringify({
        ...this.metrics,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        url: window.location.href
      }));
    } catch (e) {
      console.warn('Could not store performance metrics');
    }
  }

  // Utility method to measure custom operations
  static measure(name, fn) {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    console.log(`${name} took ${end - start}ms`);
    return result;
  }

  // Utility method for async operations
  static async measureAsync(name, fn) {
    const start = performance.now();
    const result = await fn();
    const end = performance.now();
    console.log(`${name} took ${end - start}ms`);
    return result;
  }
}

// Initialize performance monitoring
if (typeof window !== 'undefined') {
  window.performanceMonitor = new PerformanceMonitor();
}

export default PerformanceMonitor;
