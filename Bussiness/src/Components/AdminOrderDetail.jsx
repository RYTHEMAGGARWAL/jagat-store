import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Package, 
  MapPin, 
  CreditCard, 
  User,
  Phone,
  Calendar,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  Gift
} from 'lucide-react';
import api from '../utils/api';
import './AdminOrderDetail.css';

const AdminOrderDetail = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const { orderId } = useParams();
  const navigate = useNavigate();

  const statusOptions = [
    { value: 'Processing', label: '📦 Processing', color: '#ff9800' },
    { value: 'Confirmed', label: '✅ Confirmed', color: '#2196f3' },
    { value: 'Shipped', label: '🚢 Shipped', color: '#9c27b0' },
    { value: 'Out for Delivery', label: '🚚 Out for Delivery', color: '#00bcd4' },
    { value: 'Delivered', label: '✓ Delivered', color: '#4caf50' },
    { value: 'Cancelled', label: '✕ Cancelled', color: '#f44336' }
  ];

  useEffect(() => {
    checkAdminAccess();
    fetchOrderDetails();
  }, [orderId]);

  const checkAdminAccess = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user || user.role !== 'admin') {
      alert('❌ Access Denied! Admin only.');
      navigate('/');
    }
  };

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      
      console.log('📦 Fetching order:', orderId);
      
      const response = await api.get(`/orders/${orderId}`);
      
      console.log('✅ Order response:', response.data);
      
      if (response.data.success) {
        setOrder(response.data.order);
        setNewStatus(response.data.order.orderStatus);
      } else {
        alert('Order not found');
        navigate('/admin/dashboard');
      }
    } catch (error) {
      console.error('❌ Error fetching order:', error);
      alert('Failed to fetch order details');
      navigate('/admin/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    if (!newStatus) {
      alert('Please select a status');
      return;
    }

    if (newStatus === order.orderStatus) {
      alert('Status is already ' + newStatus);
      return;
    }

    if (!window.confirm(`Update order status to "${newStatus}"?\n\nThis will be visible to the customer immediately.`)) {
      return;
    }

    try {
      setUpdating(true);
      
      console.log('🔄 Updating status to:', newStatus);
      
      const response = await api.put(`/orders/${orderId}/status`, {
        status: newStatus,
        note: `Status updated to ${newStatus} by admin`
      });

      console.log('✅ Update response:', response.data);

      if (response.data.success) {
        alert('✅ Order status updated successfully!\n\nCustomer can now see this update.');
        fetchOrderDetails();
      }
    } catch (error) {
      console.error('❌ Error updating status:', error);
      alert('❌ Failed to update status: ' + (error.response?.data?.message || error.message));
    } finally {
      setUpdating(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    const statusObj = statusOptions.find(s => s.value === status);
    return statusObj ? statusObj.color : '#666';
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Processing': return <Clock size={20} />;
      case 'Confirmed': return <CheckCircle size={20} />;
      case 'Shipped': return <Package size={20} />;
      case 'Out for Delivery': return <Truck size={20} />;
      case 'Delivered': return <CheckCircle size={20} />;
      case 'Cancelled': return <XCircle size={20} />;
      default: return <Clock size={20} />;
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="spinner"></div>
        <p>Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="admin-order-detail">
        <div className="no-order">
          <h2>Order not found</h2>
          <button className="back-btn" onClick={() => navigate('/admin/dashboard')}>
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const canUpdateStatus = order.orderStatus !== 'Delivered' && order.orderStatus !== 'Cancelled';

  return (
    <div className="admin-order-detail">
      <div className="detail-header">
        <button className="back-btn" onClick={() => navigate('/admin/dashboard')}>
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
        
        <div className="order-header-info">
          <h1>Order #{order._id.slice(-8).toUpperCase()}</h1>
          
          {/* 🎁 GIFT BADGE IN HEADER */}
          {order.hasGift && (
            <span className="header-gift-badge">
              🎁 Includes FREE Gift
            </span>
          )}
          
          <span 
            className="current-status"
            style={{ 
              background: getStatusColor(order.orderStatus),
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            {getStatusIcon(order.orderStatus)}
            {order.orderStatus}
          </span>
        </div>
        
        <p className="order-date">
          <Calendar size={16} />
          Placed on {formatDate(order.createdAt)}
        </p>
      </div>

      {/* 🎁 GIFT ALERT BANNER */}
      {order.hasGift && (
        <div className="gift-alert-banner">
          <div className="gift-alert-icon">🎁</div>
          <div className="gift-alert-text">
            <strong>This order includes a FREE Gift!</strong>
            <p>Don't forget to pack: {order.giftItem?.name || 'Premium Ice Cream Pack'}</p>
          </div>
          <div className="gift-alert-value">
            Worth ₹{order.giftSavings || order.giftItem?.oldPrice || 149}
          </div>
        </div>
      )}

      <div className="order-detail-grid">
        {/* Left Column */}
        <div className="left-column">
          {/* Customer Info */}
          <div className="info-card">
            <div className="card-header">
              <User size={20} color="#667eea" />
              <h3>Customer Information</h3>
            </div>
            <div className="card-content">
              <div className="info-row">
                <User size={16} color="#999" />
                <div>
                  <p className="info-label">Customer Name</p>
                  <p className="info-value">{order.user?.name || 'N/A'}</p>
                </div>
              </div>
              <div className="info-row">
                <Phone size={16} color="#999" />
                <div>
                  <p className="info-label">Phone Number</p>
                  <p className="info-value">{order.shippingAddress?.phone || 'N/A'}</p>
                </div>
              </div>
              <div className="info-row">
                <MapPin size={16} color="#999" />
                <div>
                  <p className="info-label">Delivery Address</p>
                  <p className="info-value">{order.shippingAddress?.fullAddress}</p>
                  <p className="info-value">
                    {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="info-card">
            <div className="card-header">
              <CreditCard size={20} color="#4caf50" />
              <h3>Payment Information</h3>
            </div>
            <div className="card-content">
              <div className="payment-info">
                <p className="info-label">Payment Method</p>
                <p className="payment-method">{order.paymentInfo?.method || 'COD'}</p>
              </div>
              <div className="payment-info">
                <p className="info-label">Payment Status</p>
                <span className={`payment-status ${order.paymentInfo?.status?.toLowerCase() || 'pending'}`}>
                  {order.paymentMethod === 'COD' ? 'Pay on Delivery' : (order.paymentInfo?.status || 'Pending')}
                </span>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="info-card">
            <div className="card-header">
              <Package size={20} color="#ff9800" />
              <h3>Order Items ({order.orderItems?.length || 0}{order.hasGift ? ' + 1 Gift' : ''})</h3>
            </div>
            <div className="card-content">
              <div className="order-items-list">
                {order.orderItems?.map((item, index) => (
                  <div key={index} className="order-item">
                    <img 
                      src={item.image || 'https://via.placeholder.com/80'} 
                      alt={item.name}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/80?text=No+Image';
                      }}
                    />
                    <div className="item-info">
                      <p className="item-name">{item.name}</p>
                      <p className="item-qty">Quantity: {item.quantity}</p>
                    </div>
                    <p className="item-price">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}

                {/* 🎁 GIFT ITEM ROW */}
                {order.hasGift && order.giftItem && (
                  <div className="order-item gift-item-row">
                    <div className="gift-item-ribbon">🎁 FREE GIFT</div>
                    <img 
                      src={order.giftItem.image || 'https://m.media-amazon.com/images/I/81nRsEQCprL._SL1500_.jpg'} 
                      alt="Gift"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/80?text=Gift';
                      }}
                    />
                    <div className="item-info">
                      <p className="item-name gift-name">{order.giftItem.name || 'Premium Ice Cream Pack'}</p>
                      <p className="item-qty">Quantity: 1 | 🎁 Complimentary</p>
                    </div>
                    <p className="item-price gift-price">
                      <span className="free-text">FREE</span>
                      <span className="original-price">₹{order.giftItem.oldPrice || 149}</span>
                    </p>
                  </div>
                )}
              </div>

              <div className="order-summary">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>₹{order.itemsPrice}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery:</span>
                  <span className="free">FREE</span>
                </div>
                <div className="summary-row">
                  <span>Tax:</span>
                  <span>₹{order.taxPrice || 0}</span>
                </div>
                
                {/* 🎁 GIFT ROW IN SUMMARY */}
                {order.hasGift && (
                  <div className="summary-row gift-summary-row">
                    <span>🎁 Gift (Worth ₹{order.giftItem?.oldPrice || 149}):</span>
                    <span className="gift-free">FREE</span>
                  </div>
                )}
                
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>₹{order.totalPrice}</span>
                </div>

                {/* 🎁 SAVINGS DISPLAY */}
                {order.hasGift && (
                  <div className="admin-savings-badge">
                    🎉 Customer saved ₹{order.giftSavings || order.giftItem?.oldPrice || 149} with FREE gift!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="right-column">
          {/* Update Status Card */}
          <div className="update-status-card" style={{
            background: canUpdateStatus ? 'white' : '#f5f5f5'
          }}>
            <div className="card-header" style={{
              background: canUpdateStatus ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#ddd',
              color: 'white'
            }}>
              <Truck size={20} />
              <h3>Update Order Status</h3>
            </div>
            <div className="card-content">
              {canUpdateStatus ? (
                <>
                  <div className="form-group">
                    <label>Select New Status</label>
                    <select 
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="status-select"
                    >
                      {statusOptions.map(status => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button 
                    className="update-btn"
                    onClick={handleUpdateStatus}
                    disabled={updating || newStatus === order.orderStatus}
                  >
                    {updating ? '⏳ Updating...' : '✅ Update Status'}
                  </button>

                  {/* 🎁 GIFT REMINDER */}
                  {order.hasGift && (
                    <div className="gift-pack-reminder">
                      <span>🎁</span>
                      <span>Remember to pack the FREE gift!</span>
                    </div>
                  )}

                  <div style={{
                    marginTop: '16px',
                    padding: '12px',
                    background: '#e3f2fd',
                    borderRadius: '8px',
                    fontSize: '13px',
                    color: '#1976d2'
                  }}>
                    💡 Status will be updated in real-time for the customer
                  </div>
                </>
              ) : (
                <div className="status-message" style={{
                  padding: '20px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  fontWeight: '600',
                  background: order.orderStatus === 'Delivered' ? '#e8f5e9' : '#ffebee',
                  color: order.orderStatus === 'Delivered' ? '#2e7d32' : '#c62828'
                }}>
                  {order.orderStatus === 'Delivered' ? (
                    <>
                      <CheckCircle size={32} style={{ marginBottom: '8px' }} />
                      <p>✅ Order has been delivered</p>
                    </>
                  ) : (
                    <>
                      <XCircle size={32} style={{ marginBottom: '8px' }} />
                      <p>❌ Order has been cancelled</p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Status History */}
          {order.statusHistory && order.statusHistory.length > 0 && (
            <div className="status-history-card">
              <div className="card-header">
                <Calendar size={20} />
                <h3>Status History</h3>
              </div>
              <div className="card-content">
                <div className="timeline">
                  {order.statusHistory.map((history, index) => (
                    <div key={index} className="timeline-item">
                      <div className="timeline-dot" style={{ 
                        background: getStatusColor(history.status) 
                      }}></div>
                      <div className="timeline-content">
                        <p className="timeline-status">
                          {getStatusIcon(history.status)}
                          {history.status}
                        </p>
                        <p className="timeline-note">{history.note}</p>
                        <p className="timeline-time">
                          {formatDate(history.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="quick-actions-card">
            <div className="card-header">
              <h3>Quick Actions</h3>
            </div>
            <div className="card-content">
              <button 
                className="action-btn print-btn"
                onClick={() => window.print()}
              >
                🖨️ Print Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetail;