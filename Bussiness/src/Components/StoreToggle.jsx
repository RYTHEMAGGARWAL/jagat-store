// Frontend/src/Components/StoreToggle.jsx - TIMEZONE FIXED

import React, { useState, useEffect } from 'react';
import { useStore } from './StoreContext';
import { 
  Store, 
  Power, 
  Clock, 
  MessageSquare, 
  Calendar,
  X,
  AlertTriangle,
  History,
  Zap
} from 'lucide-react';
import api from '../utils/api';
import './StoreToggle.css';

const StoreToggle = () => {
  const { 
    isStoreOpen, 
    closedMessage: currentMessage, 
    openingTime: currentOpeningTime,
    reopenDate: currentReopenDate,
    toggleStore,
    fetchStoreStatus,
    refresh
  } = useStore();

  const [isUpdating, setIsUpdating] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [closedMessage, setClosedMessage] = useState('');
  const [openingTime, setOpeningTime] = useState('');
  const [reopenDate, setReopenDate] = useState('');
  const [reason, setReason] = useState('');
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    setClosedMessage(currentMessage || 'We are currently closed. Please check back later!');
    setOpeningTime(currentOpeningTime || '9:00 AM');
  }, [currentMessage, currentOpeningTime]);

  // 🔧 Convert datetime-local to proper ISO string (keeping local time intent)
  const convertToISOWithTimezone = (localDateTimeString) => {
    if (!localDateTimeString) return null;
    
    // datetime-local gives: "2025-12-05T12:26"
    // We need to treat this as IST and convert to proper ISO
    
    // Create date from the local string
    const localDate = new Date(localDateTimeString);
    
    // The date is already interpreted as local time by the browser
    // Just return the ISO string - it will be in UTC
    return localDate.toISOString();
  };

  // 🔧 Format reopen date for DISPLAY (in local timezone)
  const formatReopenDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    return d.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // 🔧 Convert stored date back to datetime-local format for input
  const formatForDateTimeLocal = (isoDate) => {
    if (!isoDate) return '';
    const d = new Date(isoDate);
    // Format as YYYY-MM-DDTHH:MM in local time
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // Force Open Store NOW
  const handleForceOpen = async () => {
    if (isUpdating) return;
    
    if (!window.confirm('🔓 Store ko abhi OPEN karna hai?')) return;
    
    setIsUpdating(true);
    
    try {
      const response = await api.post('/store/force-open');
      
      if (response.data.success) {
        alert('✅ Store is now OPEN!');
        fetchStoreStatus();
      } else {
        alert('❌ ' + response.data.message);
      }
    } catch (err) {
      alert('❌ Failed to open store: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsUpdating(false);
    }
  };

  // Quick toggle
  const handleQuickToggle = async () => {
    if (isUpdating) return;
    
    const newState = !isStoreOpen;
    
    // If closing, show settings
    if (!newState) {
      setShowSettings(true);
      return;
    }
    
    // If opening, just toggle
    setIsUpdating(true);
    const result = await toggleStore(true, { reason: 'Quick open by admin' });
    setIsUpdating(false);
    
    if (result.success) {
      alert('✅ Store is now OPEN!');
    } else {
      alert('❌ ' + result.message);
    }
  };

  // Close store with settings
  const handleCloseStore = async () => {
    if (isUpdating) return;
    
    setIsUpdating(true);
    
    // Convert local datetime to ISO
    const isoReopenDate = convertToISOWithTimezone(reopenDate);
    
    console.log('📅 Sending reopen date:');
    console.log('   Input value:', reopenDate);
    console.log('   ISO converted:', isoReopenDate);
    
    const result = await toggleStore(false, {
      closedMessage,
      openingTime,
      reopenDate: isoReopenDate,
      reason: reason || 'Admin closed the store'
    });
    
    setIsUpdating(false);
    
    if (result.success) {
      setShowSettings(false);
      setReason('');
      setReopenDate('');
      alert('✅ Store is now CLOSED!');
    } else {
      alert('❌ ' + result.message);
    }
  };

  // Fetch history
  const fetchHistory = async () => {
    try {
      const response = await api.get('/store/history');
      if (response.data.success) {
        setHistory(response.data.history);
      }
    } catch (err) {
      console.error('Failed to fetch history:', err);
    }
  };

  const handleShowHistory = () => {
    fetchHistory();
    setShowHistory(true);
  };

  // Format history date
  const formatHistoryDate = (date) => {
    return new Date(date).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="store-toggle-section">
      {/* Main Toggle Card */}
      <div className={`store-status-card ${isStoreOpen ? 'open' : 'closed'}`}>
        <div className="status-header">
          <div className="status-icon-wrapper">
            <Store size={24} />
          </div>
          <div className="status-text">
            <h3>Store Status</h3>
            <span className={`status-badge ${isStoreOpen ? 'open' : 'closed'}`}>
              {isStoreOpen ? '🟢 OPEN' : '🔴 CLOSED'}
            </span>
          </div>
        </div>

        {/* Show scheduled reopen time if store is closed */}
        {!isStoreOpen && currentReopenDate && (
          <div className="scheduled-reopen">
            <Clock size={16} />
            <span>Scheduled to open: <strong>{formatReopenDate(currentReopenDate)}</strong></span>
          </div>
        )}

        <div className="toggle-wrapper">
          {isStoreOpen ? (
            <button 
              className="toggle-btn on"
              onClick={handleQuickToggle}
              disabled={isUpdating}
            >
              <Power size={20} />
              <span>{isUpdating ? 'Updating...' : 'Store is ON'}</span>
              <div className="toggle-indicator on">
                <div className="toggle-dot"></div>
              </div>
            </button>
          ) : (
            <div className="closed-actions">
              {/* Force Open Button */}
              <button 
                className="force-open-btn"
                onClick={handleForceOpen}
                disabled={isUpdating}
              >
                <Zap size={20} />
                <span>{isUpdating ? 'Opening...' : 'Open Store NOW'}</span>
              </button>
              
              {/* Regular Toggle */}
              <button 
                className="toggle-btn off"
                onClick={handleQuickToggle}
                disabled={isUpdating}
              >
                <Power size={18} />
                <span>Store is OFF</span>
              </button>
            </div>
          )}
        </div>

        <div className="status-actions">
          <button 
            className="action-btn settings"
            onClick={() => setShowSettings(!showSettings)}
          >
            <MessageSquare size={16} />
            {showSettings ? 'Hide' : 'Close Store'}
          </button>
          <button 
            className="action-btn history"
            onClick={handleShowHistory}
          >
            <History size={16} />
            History
          </button>
          <button 
            className="action-btn refresh"
            onClick={() => { fetchStoreStatus(); refresh && refresh(); }}
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="store-settings-panel">
          <h4>
            <AlertTriangle size={18} />
            Close Store Settings
          </h4>

          <div className="setting-group">
            <label>
              <MessageSquare size={16} />
              Closed Message (shown to users)
            </label>
            <textarea
              value={closedMessage}
              onChange={(e) => setClosedMessage(e.target.value)}
              placeholder="We are currently closed..."
              rows={2}
            />
          </div>

          <div className="setting-row">
            <div className="setting-group half">
              <label>
                <Clock size={16} />
                Opening Time (display)
              </label>
              <input
                type="text"
                value={openingTime}
                onChange={(e) => setOpeningTime(e.target.value)}
                placeholder="9:00 AM"
              />
            </div>

            <div className="setting-group half">
              <label>
                <Calendar size={16} />
                Auto-Reopen Time (IST)
              </label>
              <input
                type="datetime-local"
                value={reopenDate}
                onChange={(e) => setReopenDate(e.target.value)}
              />
              {reopenDate && (
                <small className="time-preview">
                  Will open at: {new Date(reopenDate).toLocaleString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  })}
                </small>
              )}
            </div>
          </div>

          <div className="setting-group">
            <label>Reason (for records)</label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Why are you closing the store?"
            />
          </div>

          <div className="settings-actions">
            <button 
              className="close-store-btn"
              onClick={handleCloseStore}
              disabled={isUpdating}
            >
              <X size={18} />
              {isUpdating ? 'Closing...' : 'Close Store Now'}
            </button>
            <button 
              className="cancel-btn"
              onClick={() => setShowSettings(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* History Modal */}
      {showHistory && (
        <div className="history-overlay" onClick={() => setShowHistory(false)}>
          <div className="history-modal" onClick={(e) => e.stopPropagation()}>
            <div className="history-header">
              <h4>
                <History size={18} />
                Store Status History
              </h4>
              <button onClick={() => setShowHistory(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="history-list">
              {history.length > 0 ? (
                history.map((item, index) => (
                  <div 
                    key={index} 
                    className={`history-item ${item.action}`}
                  >
                    <div className="history-icon">
                      {item.action === 'opened' ? '🟢' : '🔴'}
                    </div>
                    <div className="history-content">
                      <span className="history-action">
                        Store {item.action === 'opened' ? 'Opened' : 'Closed'}
                      </span>
                      {item.reason && (
                        <span className="history-reason">{item.reason}</span>
                      )}
                    </div>
                    <span className="history-time">
                      {formatHistoryDate(item.timestamp)}
                    </span>
                  </div>
                ))
              ) : (
                <p className="no-history">No history available</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreToggle;