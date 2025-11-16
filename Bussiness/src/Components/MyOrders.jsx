// Frontend/src/Components/MyOrders.jsx - SIMPLE DEBUG VERSION

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
      console.log('API URL:', api.defaults.baseURL + '/orders/myorders');
      
      const response = await api.get('/orders/myorders');
      
      console.log('📥 Response:', response);
      console.log('📦 Data:', response.data);
      console.log('✅ Success:', response.data.success);
      console.log('📊 Orders Count:', response.data.count);
      console.log('🛒 Orders Array:', response.data.orders);
      
      if (response.data.success) {
        const fetchedOrders = response.data.orders || [];
        console.log('✅ Setting orders:', fetchedOrders.length);
        setOrders(fetchedOrders);
      } else {
        console.log('❌ Success is false');
        setError('Failed to fetch orders');
      }
    } catch (error) {
      console.error('❌ ERROR fetching orders:', error);
      console.error('Error response:', error.response);
      console.error('Error data:', error.response?.data);
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
            console.log(`Rendering order ${index}:`, order);
            
            if (!order || !order._id) {
              console.warn('Invalid order at index', index, order);
              return null;
            }

            return (
              <div key={order._id} className="order-card">
                
                <div className="order-header">
                  <div className="order-header-left">
                    <h3>#{order._id.slice(-8).toUpperCase()}</h3>
                    <p className="order-date">
                      {order.createdAt ? formatDate(order.createdAt) : 'N/A'}
                    </p>
                  </div>
                  <div className="order-header-right">
                    <span className="order-status status-processing">
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