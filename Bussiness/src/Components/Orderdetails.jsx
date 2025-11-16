import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import './OrderDetails.css';

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      
      console.log('Fetching order:', orderId);
      
      const response = await api.get(`/orders/${orderId}`);
      
      console.log('Order response:', response.data);
      
      if (response.data.success) {
        setOrder(response.data.order);
      } else {
        alert('Order not found');
        navigate('/my-orders');
      }
    } catch (error) {
      console.error('Error fetching order:', error);
      alert('Failed to fetch order details');
      navigate('/my-orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'Processing': 'status-processing',
      'Confirmed': 'status-confirmed',
      'Shipped': 'status-shipping',
      'Out for Delivery': 'status-shipping',
      'Delivered': 'status-delivered',
      'Cancelled': 'status-cancelled'
    };
    return colors[status] || 'status-pending';
  };

  const getStatusText = (status) => {
    const icons = {
      'Processing': '📦',
      'Confirmed': '✅',
      'Shipped': '🚚',
      'Out for Delivery': '🚚',
      'Delivered': '✓',
      'Cancelled': '✕'
    };
    return `${icons[status] || '⏳'} ${status}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="order-details-page">
        <div className="loading-details">
          <div className="spinner"></div>
          <p>Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="order-details-page">
        <div className="order-not-found">
          <h2>Order Not Found</h2>
          <p>The order you're looking for doesn't exist.</p>
          <button className="btn-back" onClick={() => navigate('/my-orders')}>
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="order-details-page">
      <div className="order-details-container">
        
        {/* Back Button */}
        <button className="back-btn" onClick={() => navigate('/my-orders')}>
          ← Back to Orders
        </button>

        {/* Order Header */}
        <div className="details-header">
          <div className="details-header-left">
            <h1>Order #{order._id.slice(-8).toUpperCase()}</h1>
            <p className="order-date-details">{formatDate(order.createdAt)}</p>
          </div>
          <div className="details-header-right">
            <span className={`order-status-badge ${getStatusColor(order.orderStatus)}`}>
              {getStatusText(order.orderStatus)}
            </span>
          </div>
        </div>

        {/* Order Info Grid */}
        <div className="order-info-section">
          <div className="info-card">
            <h3>📦 Order Information</h3>
            <div className="info-rows">
              <div className="info-row">
                <span className="label">Order ID:</span>
                <span className="value">#{order._id.slice(-8).toUpperCase()}</span>
              </div>
              <div className="info-row">
                <span className="label">Order Date:</span>
                <span className="value">{formatDate(order.createdAt)}</span>
              </div>
              <div className="info-row">
                <span className="label">Total Items:</span>
                <span className="value">{order.orderItems?.length || 0} items</span>
              </div>
              <div className="info-row">
                <span className="label">Order Status:</span>
                <span className={`value ${getStatusColor(order.orderStatus)}`}>
                  {getStatusText(order.orderStatus)}
                </span>
              </div>
            </div>
          </div>

          <div className="info-card">
            <h3>💳 Payment Details</h3>
            <div className="info-rows">
              <div className="info-row">
                <span className="label">Payment Method:</span>
                <span className="value">{order.paymentInfo?.method || 'COD'}</span>
              </div>
              <div className="info-row">
                <span className="label">Subtotal:</span>
                <span className="value">₹{order.itemsPrice || order.totalPrice}</span>
              </div>
              <div className="info-row">
                <span className="label">Delivery Charges:</span>
                <span className="value free-text">FREE</span>
              </div>
              <div className="info-row total-row">
                <span className="label">Total Amount:</span>
                <span className="value total-value">₹{order.totalPrice}</span>
              </div>
            </div>
          </div>

          <div className="info-card">
            <h3>📍 Delivery Details</h3>
            <div className="info-rows">
              <div className="info-row">
                <span className="label">Address:</span>
                <span className="value">{order.shippingAddress?.fullAddress}</span>
              </div>
              <div className="info-row">
                <span className="label">City:</span>
                <span className="value">{order.shippingAddress?.city}</span>
              </div>
              <div className="info-row">
                <span className="label">State:</span>
                <span className="value">{order.shippingAddress?.state}</span>
              </div>
              <div className="info-row">
                <span className="label">Phone:</span>
                <span className="value">{order.shippingAddress?.phone}</span>
              </div>
            </div>
          </div>

          <div className="info-card">
            <h3>🛒 Order Items</h3>
            <div className="order-items-list">
              {order.orderItems?.map((item, index) => (
                <div key={index} className="order-item-row">
                  <img 
                    src={item.image || 'https://via.placeholder.com/60?text=Product'} 
                    alt={item.name}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/60?text=Product';
                    }}
                  />
                  <div className="item-info">
                    <p className="item-name">{item.name}</p>
                    <p className="item-qty">Quantity: {item.quantity}</p>
                    <p className="item-price">₹{item.price} × {item.quantity}</p>
                  </div>
                  <div className="item-total">
                    <p>₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Timeline */}
        <div className="order-timeline-section">
          <h3>📋 Order Timeline</h3>
          <div className="timeline">
            <div className={`timeline-step ${order.orderStatus ? 'completed' : ''}`}>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <strong>Order Placed</strong>
                <p>Your order has been confirmed</p>
                <span className="timeline-time">{formatDate(order.createdAt)}</span>
              </div>
            </div>

            <div className={`timeline-step ${order.orderStatus === 'Processing' || order.orderStatus === 'Confirmed' || order.orderStatus === 'Shipped' || order.orderStatus === 'Out for Delivery' || order.orderStatus === 'Delivered' ? 'completed' : order.orderStatus === 'Processing' ? 'active' : ''}`}>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <strong>Processing</strong>
                <p>Items are being packed</p>
              </div>
            </div>

            <div className={`timeline-step ${order.orderStatus === 'Shipped' || order.orderStatus === 'Out for Delivery' || order.orderStatus === 'Delivered' ? 'completed' : order.orderStatus === 'Confirmed' ? 'active' : ''}`}>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <strong>Shipped</strong>
                <p>Order is on the way</p>
              </div>
            </div>

            <div className={`timeline-step ${order.orderStatus === 'Delivered' ? 'completed' : order.orderStatus === 'Out for Delivery' ? 'active' : ''}`}>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <strong>Delivered</strong>
                <p>Order has been delivered</p>
                {order.deliveredAt && (
                  <span className="timeline-time">{formatDate(order.deliveredAt)}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="details-actions">
          <button className="btn-primary-details" onClick={() => navigate('/my-orders')}>
            Back to Orders
          </button>
          {order.orderStatus === 'Delivered' && (
            <button className="btn-secondary-details" onClick={() => navigate('/')}>
              Reorder Items
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default OrderDetails;