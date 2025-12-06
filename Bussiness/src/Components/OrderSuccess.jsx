import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './OrderSuccess.css';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state;
  const [countdown, setCountdown] = useState(60); // 60 seconds = 1 minute

  useEffect(() => {
    // If no order data, redirect immediately
    if (!orderData) {
      navigate('/', { replace: true });
      return;
    }

    // Countdown timer - 60 seconds
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          navigate('/', { replace: true });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [navigate, orderData]);

  if (!orderData) {
    return null;
  }

  const { orderId, totalAmount, items, deliveryAddress, customerName } = orderData;

  return (
    <div className="order-success-page">
      <div className="success-container">
        
        {/* ✅ NEW ATTRACTIVE SUCCESS ANIMATION */}
        <div className="success-animation-wrapper">
          <div className="success-checkmark-new">
            <div className="check-icon">
              <span className="icon-line line-tip"></span>
              <span className="icon-line line-long"></span>
              <div className="icon-circle"></div>
              <div className="icon-fix"></div>
            </div>
          </div>
          <div className="success-particles">
            <span>🎉</span>
            <span>✨</span>
            <span>🎊</span>
            <span>⭐</span>
            <span>💫</span>
            <span>🌟</span>
          </div>
        </div>

        {/* Success Message */}
        <h1 className="success-title">Order Placed Successfully! 🎉</h1>
        <p className="success-subtitle">Thank you {customerName || 'for your order'}!</p>

        {/* Order Details */}
        <div className="order-details-card">
          <div className="order-detail-row">
            <span className="detail-label">Order ID:</span>
            <span className="detail-value">{orderId || '#ORD' + Date.now()}</span>
          </div>
          
          <div className="order-detail-row">
            <span className="detail-label">Total Amount:</span>
            <span className="detail-value amount">₹{totalAmount?.toFixed(2) || '0.00'}</span>
          </div>
          
          <div className="order-detail-row">
            <span className="detail-label">Items:</span>
            <span className="detail-value">{items || 0} items</span>
          </div>
          
          <div className="order-detail-row full">
            <span className="detail-label">Delivery Address:</span>
            <span className="detail-value">{deliveryAddress || 'F-388 Pratap Vihar, Sec-11, GZB'}</span>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="delivery-info-success">
          <div className="info-item">
            <span className="info-icon">🚚</span>
            <div className="info-text">
              <strong>Delivery in 40 minutes</strong>
              <p>Your order is being prepared</p>
            </div>
          </div>
          
          <div className="info-item">
            <span className="info-icon">💵</span>
            <div className="info-text">
              <strong>Cash on Delivery</strong>
              <p>Pay when you receive</p>
            </div>
          </div>
        </div>

        {/* Track Order Section - NEW ATTRACTIVE */}
        <div className="order-status-timeline-new">
          <h3 className="timeline-title">📦 Order Status</h3>
          
          <div className="timeline-track">
            <div className="timeline-step completed">
              <div className="step-icon">✅</div>
              <div className="step-content">
                <span className="step-label">Order Placed</span>
                <span className="step-desc">Confirmed</span>
              </div>
            </div>
            
            <div className="timeline-connector active"></div>
            
            <div className="timeline-step active">
              <div className="step-icon">📦</div>
              <div className="step-content">
                <span className="step-label">Preparing</span>
                <span className="step-desc">Packing items</span>
              </div>
            </div>
            
            <div className="timeline-connector"></div>
            
            <div className="timeline-step">
              <div className="step-icon">🚚</div>
              <div className="step-content">
                <span className="step-label">Out for Delivery</span>
                <span className="step-desc">On the way</span>
              </div>
            </div>
            
            <div className="timeline-connector"></div>
            
            <div className="timeline-step">
              <div className="step-icon">🎉</div>
              <div className="step-content">
                <span className="step-label">Delivered</span>
                <span className="step-desc">Enjoy!</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="success-actions">
          <button 
            className="btn-primary-success"
            onClick={() => navigate('/')}
          >
            🛒 Continue Shopping
          </button>
        </div>

        {/* Auto Redirect Message */}
        <p className="redirect-message">
          Redirecting to home in <span className="countdown">{countdown}</span> seconds...
        </p>

      </div>
    </div>
  );
};

export default OrderSuccess;