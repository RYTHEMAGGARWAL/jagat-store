// Frontend/src/Components/StoreBanner.jsx - With Live Countdown

import React, { useState, useEffect } from 'react';
import { useStore } from './StoreContext';
import { X, Bell } from 'lucide-react';
import './StoreBanner.css';

const StoreBanner = () => {
  const { 
    isStoreOpen, 
    closedMessage, 
    openingTime, 
    reopenDate,
    showAnnouncement,
    announcementMessage,
    loading 
  } = useStore();

  const [dismissed, setDismissed] = useState(false);
  const [countdown, setCountdown] = useState('');

  // Check if user is admin
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user?.role === 'admin';

  // ⏰ Live Countdown Timer
  useEffect(() => {
    if (!reopenDate || isStoreOpen) {
      setCountdown('');
      return;
    }

    const updateCountdown = () => {
      const now = Date.now();
      const reopenTime = new Date(reopenDate).getTime();
      const diff = reopenTime - now;

      if (diff <= 0) {
        setCountdown('Opening now...');
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (hours > 0) {
        setCountdown(`${hours}h ${minutes}m`);
      } else if (minutes > 0) {
        setCountdown(`${minutes}m ${seconds}s`);
      } else {
        setCountdown(`${seconds}s`);
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [reopenDate, isStoreOpen]);

  // Don't show for admin or while loading
  if (loading || isAdmin || dismissed) return null;

  // Format reopen date
  const formatReopenDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    return d.toLocaleString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Announcement banner (when store is open)
  if (isStoreOpen && showAnnouncement && announcementMessage) {
    return (
      <div className="store-banner announcement">
        <div className="banner-content">
          <Bell size={16} />
          <span>{announcementMessage}</span>
        </div>
        <button className="banner-close" onClick={() => setDismissed(true)}>
          <X size={16} />
        </button>
      </div>
    );
  }

  // Closed banner with countdown
  if (!isStoreOpen) {
    return (
      <div className="store-banner closed">
        <div className="banner-content">
          <span className="banner-icon">😴</span>
          <span className="banner-text">
            <strong>Store Closed</strong>
            <span className="banner-separator">•</span>
            {reopenDate ? (
              <>
                Opens {formatReopenDate(reopenDate)}
                {countdown && (
                  <span className="countdown-badge">⏱️ {countdown}</span>
                )}
              </>
            ) : (
              `Opens at ${openingTime}`
            )}
          </span>
        </div>
        <button className="banner-close" onClick={() => setDismissed(true)}>
          <X size={16} />
        </button>
      </div>
    );
  }

  return null;
};

export default StoreBanner;