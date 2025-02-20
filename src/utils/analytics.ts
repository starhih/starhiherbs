interface GTagEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

declare global {
  interface Window {
    gtag: (
      command: 'event' | 'config' | 'js',
      action: string | Date,
      params?: Record<string, any>
    ) => void;
    dataLayer: any[];
  }
}

const GA_TRACKING_ID = process.env.REACT_APP_GA_TRACKING_ID || 'G-XXXXXXXXXX';

export const initializeGA = (): void => {
  if (process.env.NODE_ENV === 'production') {
    try {
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
      script.async = true;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function(...args) {
        window.dataLayer.push(arguments);
      };
      window.gtag('js', new Date());
      window.gtag('config', GA_TRACKING_ID);
    } catch (error) {
      console.error('Failed to initialize Google Analytics:', error);
    }
  }
};

export const trackEvent = (event: GTagEvent): void => {
  if (process.env.NODE_ENV === 'production' && window.gtag) {
    try {
      window.gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
      });
    } catch (error) {
      console.error('Failed to track event:', error);
    }
  }
};

export const trackPageView = (path: string): void => {
  trackEvent({
    action: 'page_view',
    category: 'Navigation',
    label: path,
  });
};

export const trackError = (error: Error): void => {
  trackEvent({
    action: 'error',
    category: 'Error',
    label: `${error.name}: ${error.message}`,
  });
}; 