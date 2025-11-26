// Frontend/src/Components/MyOrders.jsx - WITH GIFT DISPLAY 🎁

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import './MyOrders.css';

const MyOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuth();
    fetchOrders();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    console.log('🔐 Auth Check:');
    console.log('Token:', token ? 'Present' : 'Missing');
    console.log('User:', user);
    
    if (!token) {
      alert('Please login to view orders');
      navigate('/login');
      return;
    }
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('📋 Fetching MY orders...');
      
      const response = await api.get('/orders/myorders');
      
      console.log('📦 Data:', response.data);
      
      if (response.data.success) {
        const fetchedOrders = response.data.orders || [];
        console.log('✅ Setting orders:', fetchedOrders.length);
        setOrders(fetchedOrders);
      } else {
        setError('Failed to fetch orders');
      }
    } catch (error) {
      console.error('❌ ERROR fetching orders:', error);
      setError(error.response?.data?.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusClass = (status) => {
    const statusMap = {
      'Processing': 'status-processing',
      'Confirmed': 'status-shipping',
      'Shipped': 'status-shipping',
      'Out for Delivery': 'status-shipping',
      'Delivered': 'status-delivered',
      'Cancelled': 'status-cancelled'
    };
    return statusMap[status] || 'status-pending';
  };

  if (loading) {
    return (
      <div className="orders-page">
        <div className="orders-loading">
          <div className="spinner"></div>
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-page">
        <div className="empty-orders">
          <div className="empty-icon">❌</div>
          <h2>Error Loading Orders</h2>
          <p>{error}</p>
          <button className="shop-now-btn" onClick={fetchOrders}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="orders-page">
        <div className="empty-orders">
          <div className="empty-icon">📦</div>
          <h2>No Orders Yet</h2>
          <p>You haven't placed any orders</p>
          <button className="shop-now-btn" onClick={() => navigate('/')}>
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-container">
        
        <div className="orders-header">
          <h1>My Orders</h1>
          <p className="orders-count">{orders.length} orders</p>
        </div>

        <div className="orders-list">
          {orders.map((order, index) => {
            if (!order || !order._id) {
              return null;
            }

            return (
              <div key={order._id} className="order-card">
                
                <div className="order-header">
                  <div className="order-header-left">
                    <h3>
                      #{order._id.slice(-8).toUpperCase()}
                      {/* 🎁 GIFT BADGE */}
                      {order.hasGift && (
                        <span className="order-gift-badge">🎁 Includes Gift</span>
                      )}
                    </h3>
                    <p className="order-date">
                      {order.createdAt ? formatDate(order.createdAt) : 'N/A'}
                    </p>
                  </div>
                  <div className="order-header-right">
                    <span className={`order-status ${getStatusClass(order.orderStatus)}`}>
                      {order.orderStatus || 'Processing'}
                    </span>
                  </div>
                </div>

                <div className="order-details">
                  <div className="order-info-grid">
                    <div className="info-item">
                      <span className="info-label">Items:</span>
                      <span className="info-value">
                        {order.orderItems?.length || 0} items
                        {order.hasGift && ' + 1 Gift'}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Total:</span>
                      <span className="info-value total">
                        ₹{order.totalPrice || 0}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Payment:</span>
                      <span className="info-value">
                        {order.paymentInfo?.method || 'COD'}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Phone:</span>
                      <span className="info-value">
                        {order.shippingAddress?.phone || 'N/A'}
                      </span>
                    </div>
                  </div>

                  {/* 🎁 GIFT ROW */}
                  {order.hasGift && order.giftItem && (
                    <div className="order-gift-row">
                      <img 
                        src={order.giftItem.image || 'https://m.media-amazon.com/images/I/81nRsEQCprL._SL1500_.jpg'} 
                        alt="Gift"
                        className="gift-image"
                      />
                      <div className="gift-info">
                        <p className="gift-name">{order.giftItem.name || 'Premium Ice Cream Pack'}</p>
                        <p className="gift-label">🎁 Complimentary Gift</p>
                      </div>
                      <span className="gift-free">FREE</span>
                    </div>
                  )}

                  {/* 🎁 SAVINGS BADGE */}
                  {order.hasGift && (
                    <div className="order-savings-badge">
                      🎉 You saved ₹{order.giftSavings || order.giftItem?.oldPrice || 149} with FREE gift!
                    </div>
                  )}
                </div>

                <div className="order-actions">
                  <button 
                    className="btn-view-details"
                    onClick={() => navigate(`/order-details/${order._id}`)}
                  >
                    View Details
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default MyOrders;