import { useState, useEffect } from 'react';

interface PopupTriggerOptions {
  scrollThreshold?: number; // Percentage of page scroll to trigger
  inactivityTimeout?: number; // Time in milliseconds
  exitDelay?: number; // Delay in milliseconds before showing exit popup
}

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

  // Handle onload popup
  useEffect(() => {
    const hasSeenLoadPopup = localStorage.getItem('hasSeenLoadPopup');
    if (!hasSeenLoadPopup) {
      const timer = setTimeout(() => {
        setShowLoadPopup(true);
      }, 2000); // Show after 2 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  // Handle scroll popup
  useEffect(() => {
    const handleScroll = () => {
      if (hasInteracted) return;

      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercentage >= scrollThreshold) {
        setShowScrollPopup(true);
        setHasInteracted(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollThreshold, hasInteracted]);

  // Handle exit intent popup
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleMouseLeave = (e: MouseEvent) => {
      if (!hasInteracted && e.clientY <= 0) {
        timeout = setTimeout(() => {
          setShowExitPopup(true);
          setHasInteracted(true);
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
      if (!hasInteracted) {
        inactivityTimer = setTimeout(() => {
          setShowInactivePopup(true);
          setHasInteracted(true);
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
    localStorage.setItem('hasSeenLoadPopup', 'true');
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