// Frontend/src/Components/CheckoutGuard.jsx - Block checkout when store is closed

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from './StoreContext';
import { Clock, ShoppingBag, ArrowLeft } from 'lucide-react';
import './StoreBanner.css';

const CheckoutGuard = ({ children }) => {
  const navigate = useNavigate();
  const { 
    isStoreOpen, 
    closedMessage, 
    openingTime, 
    reopenDate,
    loading 
  } = useStore();

  // Check if admin - allow admin to bypass
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user?.role === 'admin';

  // Show loading spinner
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '60vh' 
      }}>
        <div className="spinner"></div>
      </div>
    );
  }

  // Allow admin to checkout even when store is closed
  if (isAdmin) {
    return children;
  }

  // If store is closed, show blocked overlay for regular users
  if (!isStoreOpen) {
    const formatReopenDate = (date) => {
      if (!date) return null;
      const d = new Date(date);
      return d.toLocaleDateString('en-IN', {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      });
    };

    return (
      <div className="checkout-blocked-overlay">
        <div className="checkout-blocked-modal">
          <div className="blocked-emoji">😴</div>
          <h2 className="blocked-title">Store is Currently Closed</h2>
          <p className="blocked-message">
            {closedMessage || "We're currently closed. Please try again later!"}
          </p>
          
          <div className="blocked-info">
            <Clock size={18} />
            <span>
              {reopenDate 
                ? `Reopening: ${formatReopenDate(reopenDate)}`
                : `Usually opens at ${openingTime}`
              }
            </span>
          </div>
          
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>
            You can still browse products and add items to your cart. 
            Checkout will be available when we reopen.
          </p>
          
          <div className="blocked-buttons">
            <button 
              className="blocked-btn primary"
              onClick={() => navigate('/cart')}
            >
              <ShoppingBag size={18} style={{ marginRight: '8px' }} />
              Go to Cart
            </button>
            <button 
              className="blocked-btn secondary"
              onClick={() => navigate('/')}
            >
              <ArrowLeft size={18} style={{ marginRight: '8px' }} />
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Store is open, render checkout page
  return children;
};

export default CheckoutGuard;