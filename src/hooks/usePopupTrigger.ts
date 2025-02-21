import { useState, useEffect } from 'react';

interface PopupTriggerOptions {
  scrollThreshold?: number; // Percentage of page scroll to trigger
  inactivityTimeout?: number; // Time in milliseconds
  exitDelay?: number; // Delay in milliseconds before showing exit popup
}

const SESSION_STORAGE_KEY = 'popupShownInSession';
const LOCAL_STORAGE_KEY = 'subscribedUser';
const EXIT_INTENT_KEY = 'exitIntentShownTime';

export const usePopupTrigger = ({
  scrollThreshold = 50,
  inactivityTimeout = 60000, // 1 minute
  exitDelay = 1000,
}: PopupTriggerOptions = {}) => {
  const [showLoadPopup, setShowLoadPopup] = useState(false);
  const [showScrollPopup, setShowScrollPopup] = useState(false);
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [showInactivePopup, setShowInactivePopup] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Check if user has already subscribed
  const isSubscribed = () => {
    return localStorage.getItem(LOCAL_STORAGE_KEY) === 'true';
  };

  // Check if popup has been shown in current session
  const isShownInSession = () => {
    return sessionStorage.getItem(SESSION_STORAGE_KEY) === 'true';
  };

  // Check if exit intent popup can be shown (not shown in last hour)
  const canShowExitIntent = () => {
    const lastShownTime = localStorage.getItem(EXIT_INTENT_KEY);
    if (!lastShownTime) return true;
    
    const oneHourAgo = Date.now() - (60 * 60 * 1000);
    return parseInt(lastShownTime) < oneHourAgo;
  };

  // Handle onload popup
  useEffect(() => {
    if (!isSubscribed() && !isShownInSession()) {
      const timer = setTimeout(() => {
        setShowLoadPopup(true);
        sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Handle scroll popup
  useEffect(() => {
    const handleScroll = () => {
      if (hasInteracted || isSubscribed() || isShownInSession()) return;

      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercentage >= scrollThreshold) {
        setShowScrollPopup(true);
        setHasInteracted(true);
        sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollThreshold, hasInteracted]);

  // Handle exit intent popup
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleMouseLeave = (e: MouseEvent) => {
      if (!hasInteracted && !isSubscribed() && canShowExitIntent() && e.clientY <= 0) {
        timeout = setTimeout(() => {
          setShowExitPopup(true);
          setHasInteracted(true);
          localStorage.setItem(EXIT_INTENT_KEY, Date.now().toString());
        }, exitDelay);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (timeout) clearTimeout(timeout);
    };
  }, [exitDelay, hasInteracted]);

  // Handle inactivity popup
  useEffect(() => {
    let inactivityTimer: NodeJS.Timeout;

    const resetInactivityTimer = () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      if (!hasInteracted && !isSubscribed() && !isShownInSession()) {
        inactivityTimer = setTimeout(() => {
          setShowInactivePopup(true);
          setHasInteracted(true);
          sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
        }, inactivityTimeout);
      }
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, resetInactivityTimer);
    });

    resetInactivityTimer();

    return () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      events.forEach(event => {
        document.removeEventListener(event, resetInactivityTimer);
      });
    };
  }, [inactivityTimeout, hasInteracted]);

  const handleLoadPopupClose = () => {
    setShowLoadPopup(false);
  };

  const handleScrollPopupClose = () => {
    setShowScrollPopup(false);
  };

  const handleExitPopupClose = () => {
    setShowExitPopup(false);
  };

  const handleInactivePopupClose = () => {
    setShowInactivePopup(false);
  };

  return {
    showLoadPopup,
    showScrollPopup,
    showExitPopup,
    showInactivePopup,
    handleLoadPopupClose,
    handleScrollPopupClose,
    handleExitPopupClose,
    handleInactivePopupClose,
  };
}; 