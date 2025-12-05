// Frontend/src/Components/StoreContext.jsx - AUTO-REOPEN AT EXACT TIME

import React, { createContext, useState, useContext, useEffect, useRef, useCallback } from 'react';
import api from '../utils/api';

const StoreContext = createContext();

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return context;
};

export const StoreProvider = ({ children }) => {
  const [storeStatus, setStoreStatus] = useState({
    isStoreOpen: true,
    closedMessage: 'We are currently closed. Please check back later!',
    openingTime: '9:00 AM',
    reopenDate: null,
    showAnnouncement: false,
    announcementMessage: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const exactTimeoutRef = useRef(null);

  // Fetch store status from API
  const fetchStoreStatus = useCallback(async () => {
    try {
      const response = await api.get('/store/status');
      
      if (response.data.success) {
        const wasStoreClosed = !storeStatus.isStoreOpen;
        const isNowOpen = response.data.isStoreOpen;
        
        // Store just opened - show notification
        if (wasStoreClosed && isNowOpen) {
          console.log('🎉 Store just opened automatically!');
        }
        
        setStoreStatus({
          isStoreOpen: response.data.isStoreOpen,
          closedMessage: response.data.closedMessage,
          openingTime: response.data.openingTime,
          reopenDate: response.data.reopenDate,
          showAnnouncement: response.data.showAnnouncement,
          announcementMessage: response.data.announcementMessage
        });
      }
      setError(null);
    } catch (err) {
      console.error('Failed to fetch store status:', err);
      setStoreStatus(prev => ({ ...prev, isStoreOpen: true }));
    } finally {
      setLoading(false);
    }
  }, [storeStatus.isStoreOpen]);

  // Initial fetch
  useEffect(() => {
    fetchStoreStatus();
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (exactTimeoutRef.current) clearTimeout(exactTimeoutRef.current);
    };
  }, []);

  // ⏰ EXACT TIME AUTO-REOPEN LOGIC
  useEffect(() => {
    // Clear all timers
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (exactTimeoutRef.current) clearTimeout(exactTimeoutRef.current);

    // If store is closed and has reopen date
    if (!storeStatus.isStoreOpen && storeStatus.reopenDate) {
      const reopenTime = new Date(storeStatus.reopenDate).getTime();
      const now = Date.now();
      const timeUntilReopen = reopenTime - now;

      console.log('⏰ Time until reopen:', Math.round(timeUntilReopen / 1000), 'seconds');

      if (timeUntilReopen <= 0) {
        // Time already passed, fetch immediately
        console.log('⏰ Reopen time passed, fetching now...');
        fetchStoreStatus();
      } else {
        // 🎯 SET EXACT TIMEOUT - Will fire exactly at reopen time
        exactTimeoutRef.current = setTimeout(() => {
          console.log('🎯 EXACT reopen time reached! Opening store...');
          fetchStoreStatus();
        }, timeUntilReopen);

        // Also set interval based on how close we are
        if (timeUntilReopen < 60 * 1000) {
          // Less than 1 minute - check every 5 seconds
          console.log('⚡ Very close! Checking every 5 seconds');
          intervalRef.current = setInterval(fetchStoreStatus, 5 * 1000);
        } else if (timeUntilReopen < 5 * 60 * 1000) {
          // Less than 5 minutes - check every 15 seconds
          console.log('⏱️ Close! Checking every 15 seconds');
          intervalRef.current = setInterval(fetchStoreStatus, 15 * 1000);
        } else if (timeUntilReopen < 30 * 60 * 1000) {
          // Less than 30 minutes - check every 30 seconds
          intervalRef.current = setInterval(fetchStoreStatus, 30 * 1000);
        } else {
          // More than 30 minutes - check every minute
          intervalRef.current = setInterval(fetchStoreStatus, 60 * 1000);
        }

        // 🔄 Set a timeout to switch to faster checking when close
        if (timeUntilReopen > 60 * 1000) {
          const timeToStartFastCheck = timeUntilReopen - 60 * 1000; // 1 minute before
          timeoutRef.current = setTimeout(() => {
            console.log('⚡ Switching to fast check mode!');
            if (intervalRef.current) clearInterval(intervalRef.current);
            intervalRef.current = setInterval(fetchStoreStatus, 5 * 1000);
          }, timeToStartFastCheck);
        }
      }
    } else {
      // Store is open - normal interval (2 minutes)
      intervalRef.current = setInterval(fetchStoreStatus, 2 * 60 * 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (exactTimeoutRef.current) clearTimeout(exactTimeoutRef.current);
    };
  }, [storeStatus.isStoreOpen, storeStatus.reopenDate, fetchStoreStatus]);

  // Toggle store (Admin only)
  const toggleStore = async (isOpen, options = {}) => {
    try {
      const response = await api.put('/store/toggle', {
        isOpen,
        closedMessage: options.closedMessage,
        openingTime: options.openingTime,
        reopenDate: options.reopenDate,
        reason: options.reason
      });
      
      if (response.data.success) {
        setStoreStatus(prev => ({
          ...prev,
          isStoreOpen: response.data.settings.isStoreOpen,
          closedMessage: response.data.settings.closedMessage,
          openingTime: response.data.settings.openingTime,
          reopenDate: response.data.settings.reopenDate
        }));
        return { success: true, message: response.data.message };
      }
      
      return { success: false, message: 'Failed to update' };
    } catch (err) {
      console.error('Toggle store error:', err);
      return { 
        success: false, 
        message: err.response?.data?.message || 'Failed to update store status'
      };
    }
  };

  // Update announcement (Admin only)
  const updateAnnouncement = async (showAnnouncement, message) => {
    try {
      const response = await api.put('/store/announcement', {
        showAnnouncement,
        announcementMessage: message
      });
      
      if (response.data.success) {
        setStoreStatus(prev => ({
          ...prev,
          showAnnouncement: response.data.settings.showAnnouncement,
          announcementMessage: response.data.settings.announcementMessage
        }));
        return { success: true };
      }
      
      return { success: false };
    } catch (err) {
      console.error('Update announcement error:', err);
      return { success: false };
    }
  };

  // Check if checkout is allowed
  const canCheckout = () => {
    return storeStatus.isStoreOpen;
  };

  // Force refresh
  const refresh = () => {
    fetchStoreStatus();
  };

  const value = {
    ...storeStatus,
    loading,
    error,
    fetchStoreStatus,
    toggleStore,
    updateAnnouncement,
    canCheckout,
    refresh
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext };