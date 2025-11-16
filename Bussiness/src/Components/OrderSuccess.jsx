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
        
        {/* Success Animation */}
        <div className="success-checkmark">
          <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
            <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
          </svg>
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
            <span className="info-icon">💳</span>
            <div className="info-text">
              <strong>Cash on Delivery</strong>
              <p>Pay when you receive</p>
            </div>
          </div>
        </div>

        {/* Track Order Section */}
        <div className="order-status-timeline">
          <div className="timeline-item active">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <strong>Order Placed</strong>
              <p>Your order has been confirmed</p>
            </div>
          </div>
          
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <strong>Preparing</strong>
              <p>Items being packed</p>
            </div>
          </div>
          
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <strong>Out for Delivery</strong>
              <p>On the way to you</p>
            </div>
          </div>
          
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <strong>Delivered</strong>
              <p>Enjoy your order!</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="success-actions">
          <button 
            className="btn-primary-success"
            onClick={() => navigate('/')}
          >
            Continue Shopping
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