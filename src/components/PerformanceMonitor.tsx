import { useEffect } from 'react';

interface PerformanceMetrics {
  FCP: number; // First Contentful Paint
  LCP: number; // Largest Contentful Paint
  FID: number; // First Input Delay
  CLS: number; // Cumulative Layout Shift
  TTFB: number; // Time to First Byte
}

interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

interface FirstInputEvent extends PerformanceEntry {
  processingStart: number;
  startTime: number;
}

const PerformanceMonitor = () => {
  useEffect(() => {
    // Only run in production and if the browser supports the Performance API
    if (process.env.NODE_ENV === 'production' && 'PerformanceObserver' in window) {
      // Track First Contentful Paint (FCP)
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const firstEntry = entries[0];
        if (firstEntry) {
          console.log('FCP:', firstEntry.startTime);
          logMetric('FCP', firstEntry.startTime);
        }
      });
      fcpObserver.observe({ entryTypes: ['paint'] });

      // Track Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          console.log('LCP:', lastEntry.startTime);
          logMetric('LCP', lastEntry.startTime);
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // Track First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const firstEntry = entries[0] as FirstInputEvent;
        if (firstEntry) {
          console.log('FID:', firstEntry.processingStart - firstEntry.startTime);
          logMetric('FID', firstEntry.processingStart - firstEntry.startTime);
        }
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Track Cumulative Layout Shift (CLS)
      let clsValue = 0;
      let clsEntries: LayoutShift[] = [];

      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries() as LayoutShift[];
        entries.forEach((entry) => {
          // Only count layout shifts without recent user input
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            clsEntries.push(entry);
            console.log('CLS:', clsValue);
            logMetric('CLS', clsValue);
          }
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      // Track Time to First Byte (TTFB)
      const navigationEntries = performance.getEntriesByType('navigation');
      if (navigationEntries.length > 0) {
        const navigationEntry = navigationEntries[0] as PerformanceNavigationTiming;
        const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
        console.log('TTFB:', ttfb);
        logMetric('TTFB', ttfb);
      }

      return () => {
        fcpObserver.disconnect();
        lcpObserver.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
      };
    }
  }, []);

  const logMetric = (metricName: keyof PerformanceMetrics, value: number) => {
    // In a real application, you would send this data to your analytics service
    // For now, we'll just log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Performance Metric - ${metricName}:`, value);
    } else {
      // TODO: Send to analytics service
      // Example: 
      // analytics.logEvent('performance_metric', {
      //   metric_name: metricName,
      //   value: value,
      //   page: window.location.pathname,
      //   timestamp: new Date().toISOString()
      // });
    }
  };

  // This component doesn't render anything visible
  return null;
};

export default PerformanceMonitor; 