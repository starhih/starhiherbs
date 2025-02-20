declare global {
  interface Window {
    gtag?: Function;
    dataLayer: any[];
  }
}

export const GA_TRACKING_ID = process.env.REACT_APP_GA_TRACKING_ID || 'G-XXXXXXXXXX';

export interface EventParams {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

// Initialize Google Analytics
export const initializeGA = (): void => {
  if (process.env.NODE_ENV === 'production') {
    try {
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
      script.async = true;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(arguments);
      }
      window.gtag = gtag;
      window.gtag('js', new Date());
      window.gtag('config', GA_TRACKING_ID);
    } catch (error) {
      console.error('Failed to initialize Google Analytics:', error);
    }
  }
};

export const event = (params: EventParams): void => {
  if (window.gtag && process.env.NODE_ENV === 'production') {
    try {
      window.gtag('event', params.action, {
        event_category: params.category,
        event_label: params.label,
        value: params.value,
      });
    } catch (error) {
      console.error('Failed to send analytics event:', error);
    }
  }
};

// Performance metrics tracking
export const trackPerformanceMetric = (
  metricName: string,
  value: number,
  page: string
) => {
  event({
    action: 'performance_metric',
    category: 'Performance',
    label: `${metricName} - ${page}`,
    value: Math.round(value), // GA only accepts integers
  });
};

// Error tracking
export const trackError = (
  error: Error,
  componentStack?: string
) => {
  event({
    action: 'error',
    category: 'Error',
    label: `${error.name}: ${error.message}${componentStack ? `\n${componentStack}` : ''}`,
  });
};

// User interaction tracking
export const trackInteraction = (
  elementName: string,
  interactionType: 'click' | 'hover' | 'scroll' | 'submit',
  additionalData?: Record<string, any>
) => {
  event({
    action: interactionType,
    category: 'User Interaction',
    label: elementName,
    ...additionalData,
  });
};

// Feature usage tracking
export const trackFeatureUsage = (
  featureName: string,
  action: 'start' | 'complete' | 'error',
  additionalData?: Record<string, any>
) => {
  event({
    action: `feature_${action}`,
    category: 'Feature Usage',
    label: featureName,
    ...additionalData,
  });
};

// Form tracking
export const trackFormInteraction = (
  formName: string,
  action: 'start' | 'submit' | 'error',
  errorMessage?: string
) => {
  event({
    action: `form_${action}`,
    category: 'Form Interaction',
    label: `${formName}${errorMessage ? ` - ${errorMessage}` : ''}`,
  });
};

// Search tracking
export const trackSearch = (
  searchTerm: string,
  category: string,
  resultsCount: number
) => {
  event({
    action: 'search',
    category: `Search - ${category}`,
    label: searchTerm,
    value: resultsCount,
  });
}; 