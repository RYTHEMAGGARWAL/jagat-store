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
  Gift,
  Printer
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

  // 🏪 STORE DETAILS - YAHAN APNI DETAILS DALO
  const storeDetails = {
    name: 'JAGAT STORE',
    tagline: 'Your Trusted Grocery Partner',
    address: 'Shop No. 12, Main Market, Sector 15',
    city: 'Ghaziabad, Uttar Pradesh - 201001',
    phone: '+91 98765 43210',
    altPhone: '+91 98765 43211',
    email: 'support@jagatstore.in',
    website: 'www.jagatstore.in',
    gstin: '09ABCDE1234F1Z5',
    fssai: '12345678901234',
    panNo: 'ABCDE1234F'
  };

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
      const response = await api.get(`/orders/${orderId}`);
      if (response.data.success) {
        setOrder(response.data.order);
        setNewStatus(response.data.order.orderStatus);
        
        // 👇 Debug: Check shipping address structure
        console.log('📍 Shipping Address:', JSON.stringify(response.data.order.shippingAddress, null, 2));
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
    if (!newStatus || newStatus === order.orderStatus) {
      alert('Please select a different status');
      return;
    }

    if (!window.confirm(`Update order status to "${newStatus}"?`)) {
      return;
    }

    try {
      setUpdating(true);
      const response = await api.put(`/orders/${orderId}/status`, {
        status: newStatus,
        note: `Status updated to ${newStatus} by admin`
      });

      if (response.data.success) {
        alert('✅ Order status updated successfully!');
        fetchOrderDetails();
      }
    } catch (error) {
      console.error('❌ Error updating status:', error);
      alert('❌ Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  // 🖨️ PRINT RECEIPT FUNCTION - Opens in new window
  const handlePrintReceipt = () => {
    const paymentMethod = order.paymentMethod === 'COD' ? 'Cash on Delivery' : (order.paymentMethod || 'Cash on Delivery');
    
    const receiptContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Receipt - Order #${order._id.slice(-8).toUpperCase()}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: 'Courier New', Courier, monospace;
            font-size: 11px;
            width: 58mm;
            max-width: 58mm;
            margin: 0 auto;
            padding: 5px;
            color: #000;
            background: #fff;
          }
          .receipt-header { text-align: center; padding-bottom: 8px; border-bottom: 1px dashed #000; }
          .store-logo { font-size: 28px; }
          .store-name { font-size: 16px; font-weight: bold; letter-spacing: 1px; margin: 3px 0; }
          .store-tagline { font-size: 8px; color: #666; margin-bottom: 5px; }
          .store-contact { font-size: 8px; line-height: 1.4; }
          .store-contact p { margin: 1px 0; }
          .store-tax-info { margin-top: 5px; padding-top: 5px; border-top: 1px dashed #ccc; font-size: 8px; }
          .receipt-divider { text-align: center; padding: 6px 0; font-weight: bold; font-size: 11px; letter-spacing: 1px; border-top: 1px dashed #000; border-bottom: 1px dashed #000; margin: 6px 0; }
          .receipt-divider-line { border-top: 1px dashed #999; margin: 6px 0; }
          .receipt-row { display: flex; justify-content: space-between; margin: 2px 0; font-size: 9px; }
          .receipt-customer { padding: 6px 0; }
          .receipt-customer h3 { font-size: 10px; margin-bottom: 5px; border-bottom: 1px solid #000; padding-bottom: 3px; }
          .receipt-customer p { margin: 2px 0; font-size: 9px; }
          .customer-name { font-weight: bold; font-size: 11px !important; }
          .receipt-items table { width: 100%; border-collapse: collapse; font-size: 8px; }
          .receipt-items th { border-bottom: 1px solid #000; padding: 3px 1px; text-align: left; font-size: 8px; }
          .receipt-items td { padding: 3px 1px; border-bottom: 1px dashed #ccc; font-size: 8px; }
          .item-col { width: 50%; }
          .qty-col { width: 8%; text-align: center; }
          .rate-col { width: 20%; text-align: right; }
          .amount-col { width: 22%; text-align: right; font-weight: bold; }
          .item-weight { font-size: 7px; color: #666; }
          .gift-row { background: #f0f0f0; font-style: italic; }
          .total-row { font-size: 12px !important; font-weight: bold !important; border-top: 1px solid #000; border-bottom: 1px solid #000; padding: 5px 0 !important; margin-top: 3px; }
          .receipt-payment { padding: 6px 0; font-size: 9px; }
          .receipt-savings { text-align: center; padding: 6px; background: #f5f5f5; border: 1px dashed #000; margin: 6px 0; font-weight: bold; font-size: 9px; }
          .receipt-terms { padding: 6px 0; font-size: 7px; color: #666; }
          .receipt-terms h4 { font-size: 8px; color: #000; margin-bottom: 3px; }
          .receipt-terms ul { margin: 0; padding-left: 12px; }
          .receipt-terms li { margin: 2px 0; }
          .receipt-footer { text-align: center; padding-top: 10px; border-top: 1px dashed #000; }
          .thank-you p { margin: 3px 0; }
          .thank-you-main { font-size: 11px; font-weight: bold; }
          .visit-again { font-size: 9px; color: #666; }
          .receipt-barcode { font-size: 18px; letter-spacing: 2px; margin: 6px 0; }
          .receipt-generated { font-size: 7px; color: #999; margin-top: 6px; }
          @media print {
            @page { size: 58mm auto; margin: 0; }
            body { width: 58mm; }
          }
        </style>
      </head>
      <body>
        <div class="receipt-header">
          <div class="store-logo">🛒</div>
          <div class="store-name">${storeDetails.name}</div>
          <div class="store-tagline">${storeDetails.tagline}</div>
          <div class="store-contact">
            <p>${storeDetails.address}</p>
            <p>${storeDetails.city}</p>
            <p>📞 ${storeDetails.phone}</p>
            <p>✉️ ${storeDetails.email}</p>
            <p>🌐 ${storeDetails.website}</p>
          </div>
          <div class="store-tax-info">
            <p><strong>GSTIN:</strong> ${storeDetails.gstin}</p>
            <p><strong>FSSAI:</strong> ${storeDetails.fssai}</p>
          </div>
        </div>

        <div class="receipt-divider">TAX INVOICE</div>

        <div class="receipt-order-info">
          <div class="receipt-row"><span>Invoice No:</span><strong>INV-${order._id.slice(-8).toUpperCase()}</strong></div>
          <div class="receipt-row"><span>Order ID:</span><span>#${order._id.slice(-8).toUpperCase()}</span></div>
          <div class="receipt-row"><span>Date:</span><span>${formatShortDate(order.createdAt)}</span></div>
          <div class="receipt-row"><span>Time:</span><span>${formatTime(order.createdAt)}</span></div>
        </div>

        <div class="receipt-divider-line"></div>

        <div class="receipt-customer">
          <h3>📋 BILL TO:</h3>
          <p class="customer-name">${order.shippingAddress?.name || order.user?.name || 'Customer'}</p>
          <p>📞 ${order.shippingAddress?.phone || ''}</p>
          <p>${order.shippingAddress?.fullAddress || order.shippingAddress?.address || ''}</p>
          <p>${order.shippingAddress?.city || ''}, ${order.shippingAddress?.state || ''}</p>
          <p>PIN: ${order.shippingAddress?.pincode || ''}</p>
        </div>

        <div class="receipt-divider-line"></div>

        <div class="receipt-items">
          <table>
            <thead>
              <tr>
                <th class="item-col">Item</th>
                <th class="qty-col">Qty</th>
                <th class="rate-col">Rate</th>
                <th class="amount-col">Amt</th>
              </tr>
            </thead>
            <tbody>
              ${order.orderItems?.map(item => `
                <tr>
                  <td class="item-col">${item.name} ${item.weight ? `<span class="item-weight">(${item.weight})</span>` : ''}</td>
                  <td class="qty-col">${item.quantity}</td>
                  <td class="rate-col">₹${item.price.toFixed(2)}</td>
                  <td class="amount-col">₹${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              `).join('')}
              ${order.hasGift ? `
                <tr class="gift-row">
                  <td class="item-col">🎁 ${order.giftItem?.name || 'FREE Gift'}</td>
                  <td class="qty-col">1</td>
                  <td class="rate-col"><s>₹${order.giftItem?.oldPrice || 149}</s></td>
                  <td class="amount-col"><strong>FREE</strong></td>
                </tr>
              ` : ''}
            </tbody>
          </table>
        </div>

        <div class="receipt-divider-line"></div>

        <div class="receipt-totals">
          <div class="receipt-row"><span>Subtotal:</span><span>₹${order.itemsPrice?.toFixed(2)}</span></div>
          <div class="receipt-row"><span>Delivery:</span><span><strong>FREE</strong></span></div>
          ${order.taxPrice > 0 ? `<div class="receipt-row"><span>Tax (GST):</span><span>₹${order.taxPrice?.toFixed(2)}</span></div>` : ''}
          ${order.hasGift ? `<div class="receipt-row" style="color: green;"><span>🎁 Gift Savings:</span><span>-₹${order.giftItem?.oldPrice || 149}</span></div>` : ''}
          <div class="receipt-row total-row"><span>GRAND TOTAL:</span><span>₹${order.totalPrice?.toFixed(2)}</span></div>
        </div>

        <div class="receipt-divider-line"></div>

        <div class="receipt-payment">
          <div class="receipt-row"><span>Payment:</span><span>${paymentMethod}</span></div>
        </div>

        ${order.hasGift ? `<div class="receipt-savings">🎉 Customer saved ₹${(order.giftItem?.oldPrice || 149)} with FREE gift!</div>` : ''}

        <div class="receipt-terms">
          <h4>Terms & Conditions:</h4>
          <ul>
            <li>Goods once sold will not be taken back.</li>
            <li>Check items before accepting delivery.</li>
            <li>For complaints, contact within 24 hours.</li>
          </ul>
        </div>

        <div class="receipt-footer">
          <div class="thank-you">
            <p class="thank-you-main">🙏 Thank You for Shopping!</p>
            <p class="visit-again">Visit Again Soon!</p>
          </div>
          <div class="receipt-barcode">||| |||| ||| ||||</div>
          <p>#${order._id.slice(-8).toUpperCase()}</p>
          <div class="receipt-generated">
            <p>Generated: ${formatDate(new Date())}</p>
            <p>Computer generated invoice</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Create hidden iframe for printing
    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.top = '-10000px';
    iframe.style.left = '-10000px';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = 'none';
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(receiptContent);
    iframeDoc.close();

    // Print after content loads
    setTimeout(() => {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
      // Remove iframe after printing
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);
    }, 300);
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

  const formatShortDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-IN', {
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

      {/* Gift Alert Banner */}
      {order.hasGift && (
        <div className="gift-alert-banner">
          <div className="gift-alert-icon">🎁</div>
          <div className="gift-alert-text">
            <strong>This order includes a FREE Gift!</strong>
            <p>Don't forget to pack: {order.giftItem?.name || 'Premium Gift'}</p>
          </div>
          <div className="gift-alert-value">
            Worth ₹{order.giftItem?.oldPrice || 149}
          </div>
        </div>
      )}

      <div className="order-detail-grid">
        {/* Left Column */}
        <div className="left-column">
          {/* Customer Info Card */}
          <div className="info-card">
            <div className="card-header">
              <User size={20} />
              <h3>Customer Details</h3>
            </div>
            <div className="card-content">
              <div className="info-row">
                <User size={18} color="#667eea" />
                <div>
                  <p className="info-label">Name</p>
                  <p className="info-value">{order.shippingAddress?.name || order.user?.name || 'Customer'}</p>
                </div>
              </div>
              <div className="info-row">
                <Phone size={18} color="#667eea" />
                <div>
                  <p className="info-label">Phone</p>
                  <p className="info-value">{order.shippingAddress?.phone || 'N/A'}</p>
                </div>
              </div>
              <div className="info-row">
                <MapPin size={18} color="#667eea" />
                <div>
                  <p className="info-label">Delivery Address</p>
                  <p className="info-value">
                    {order.shippingAddress?.fullAddress || order.shippingAddress?.address || ''}<br/>
                    {order.shippingAddress?.city || ''}, {order.shippingAddress?.state || ''} - {order.shippingAddress?.pincode || ''}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Info Card */}
          <div className="info-card">
            <div className="card-header">
              <CreditCard size={20} />
              <h3>Payment Information</h3>
            </div>
            <div className="card-content">
              <div className="payment-info">
                <p className="info-label">Payment Method</p>
                <p className="payment-method">
                  {(!order.paymentMethod || order.paymentMethod === 'COD') ? '💵 Cash on Delivery' : `💳 ${order.paymentMethod}`}
                </p>
              </div>
              <div className="payment-info">
                <p className="info-label">Payment Status</p>
                <div className="payment-status-row">
                  <span className={`payment-status ${order.isPaid ? 'success' : 'pending'}`}>
                    {order.isPaid ? '✅ Paid' : '⏳ Pending'}
                  </span>
                  {!order.isPaid && (
                    <button 
                      className="mark-paid-btn"
                      onClick={async () => {
                        if (window.confirm('💰 Payment collect ho gaya? Mark as Paid?')) {
                          try {
                            const response = await api.put(`/orders/${order._id}/pay`);
                            if (response.data.success) {
                              setOrder({ ...order, isPaid: true, paidAt: new Date() });
                              alert('✅ Payment marked as Paid!');
                            }
                          } catch (error) {
                            console.error('Payment update error:', error);
                            alert('❌ Error updating payment status');
                          }
                        }
                      }}
                    >
                      💰 Mark as Paid
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Order Items Card */}
          <div className="info-card">
            <div className="card-header">
              <Package size={20} />
              <h3>Order Items ({order.orderItems?.length || 0} items)</h3>
            </div>
            <div className="card-content">
              <div className="order-items-list">
                {order.orderItems?.map((item, index) => (
                  <div key={index} className="order-item">
                    <img 
                      src={item.image || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAiIGhlaWdodD0iODAiIGZpbGw9IiNGMEYwRjAiLz48dGV4dCB4PSI0MCIgeT0iNDUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Tm8gSW1hZ2U8L3RleHQ+PC9zdmc+'} 
                      alt={item.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAiIGhlaWdodD0iODAiIGZpbGw9IiNGMEYwRjAiLz48dGV4dCB4PSI0MCIgeT0iNDUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Tm8gSW1hZ2U8L3RleHQ+PC9zdmc+';
                      }}
                    />
                    <div className="item-info">
                      <p className="item-name">{item.name}</p>
                      <p className="item-qty">Quantity: {item.quantity}</p>
                      {item.weight && (
                        <p className="item-weight" style={{ color: '#666', fontSize: '13px' }}>
                          Weight: {item.weight}
                        </p>
                      )}
                    </div>
                    <p className="item-price">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}

                {/* Gift Item */}
                {order.hasGift && (
                  <div className="order-item gift-item-row">
                    <div className="gift-item-ribbon">🎁 FREE GIFT</div>
                    <img 
                      src={order.giftItem?.image || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAiIGhlaWdodD0iODAiIGZpbGw9IiNFOEY1RTkiLz48dGV4dCB4PSI0MCIgeT0iNDUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyMCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+8J+OgTwvdGV4dD48L3N2Zz4='}
                      alt="Gift"
                      style={{ border: '2px solid #4caf50' }}
                    />
                    <div className="item-info">
                      <p className="item-name gift-name">🎁 {order.giftItem?.name || 'FREE Gift'}</p>
                      <p className="item-qty">Quantity: 1 | Complimentary</p>
                    </div>
                    <p className="item-price gift-price">
                      <span className="free-text">FREE</span>
                      <span className="original-price">₹{order.giftItem?.oldPrice || 149}</span>
                    </p>
                  </div>
                )}
              </div>

              <div className="order-summary">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>₹{order.itemsPrice?.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery:</span>
                  <span className="free">FREE</span>
                </div>
                <div className="summary-row">
                  <span>Tax:</span>
                  <span>₹{order.taxPrice?.toFixed(2) || '0.00'}</span>
                </div>
                {order.hasGift && (
                  <div className="summary-row gift-summary-row">
                    <span>🎁 Gift (Worth ₹{order.giftItem?.oldPrice || 149}):</span>
                    <span className="gift-free">FREE</span>
                  </div>
                )}
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>₹{order.totalPrice?.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="right-column">
          {/* Update Status Card */}
          <div className="update-status-card">
            <div className="card-header">
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
                  
                  {order.hasGift && (
                    <div className="gift-pack-reminder">
                      <span>🎁</span>
                      <span>Remember to pack the FREE gift!</span>
                    </div>
                  )}
                </>
              ) : (
                <div className={`status-message ${order.orderStatus.toLowerCase()}`}>
                  {order.orderStatus === 'Delivered' ? (
                    <>
                      <CheckCircle size={32} />
                      <p>✅ Order Delivered Successfully</p>
                    </>
                  ) : (
                    <>
                      <XCircle size={32} />
                      <p>❌ Order Cancelled</p>
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
                      <div className="timeline-dot" style={{ background: getStatusColor(history.status) }}></div>
                      <div className="timeline-content">
                        <p className="timeline-status">
                          {getStatusIcon(history.status)}
                          {history.status}
                        </p>
                        <p className="timeline-note">{history.note}</p>
                        <p className="timeline-time">{formatDate(history.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions - PRINT RECEIPT BUTTON */}
          <div className="quick-actions-card">
            <div className="card-header">
              <h3>🖨️ Quick Actions</h3>
            </div>
            <div className="card-content">
              <button 
                className="action-btn print-receipt-btn"
                onClick={handlePrintReceipt}
              >
                <Printer size={20} />
                Print Customer Receipt / Bill
              </button>
              
              <button 
                className="action-btn"
                onClick={() => {
                  const fullOrderContent = `
                    <!DOCTYPE html>
                    <html>
                    <head>
                      <title>Order Details - #${order._id.slice(-8).toUpperCase()}</title>
                      <style>
                        * { margin: 0; padding: 0; box-sizing: border-box; }
                        body { font-family: Arial, sans-serif; padding: 20px; color: #333; }
                        .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 15px; margin-bottom: 20px; }
                        .header h1 { font-size: 24px; margin-bottom: 5px; }
                        .header p { color: #666; }
                        .section { margin-bottom: 20px; }
                        .section-title { font-size: 16px; font-weight: bold; background: #f0f0f0; padding: 8px 12px; margin-bottom: 10px; border-left: 4px solid #333; }
                        .info-row { display: flex; padding: 6px 12px; border-bottom: 1px solid #eee; }
                        .info-label { width: 150px; font-weight: bold; color: #666; }
                        .info-value { flex: 1; }
                        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                        th { background: #333; color: white; padding: 10px; text-align: left; }
                        td { padding: 10px; border-bottom: 1px solid #ddd; }
                        .total-row { font-weight: bold; font-size: 18px; background: #f9f9f9; }
                        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #333; color: #666; }
                        @media print { body { padding: 10px; } }
                      </style>
                    </head>
                    <body>
                      <div class="header">
                        <h1>🛒 JAGAT STORE</h1>
                        <p>Order Details</p>
                      </div>

                      <div class="section">
                        <div class="section-title">📦 Order Information</div>
                        <div class="info-row"><span class="info-label">Order ID:</span><span class="info-value">#${order._id.slice(-8).toUpperCase()}</span></div>
                        <div class="info-row"><span class="info-label">Date:</span><span class="info-value">${formatDate(order.createdAt)}</span></div>
                        <div class="info-row"><span class="info-label">Status:</span><span class="info-value"><strong>${order.orderStatus}</strong></span></div>
                        <div class="info-row"><span class="info-label">Payment:</span><span class="info-value">${order.paymentMethod || 'Cash on Delivery'}</span></div>
                        <div class="info-row"><span class="info-label">Payment Status:</span><span class="info-value">${order.isPaid ? '✅ Paid' : '⏳ Pending'}</span></div>
                      </div>

                      <div class="section">
                        <div class="section-title">👤 Customer Details</div>
                        <div class="info-row"><span class="info-label">Name:</span><span class="info-value">${order.shippingAddress?.name || order.user?.name || 'Customer'}</span></div>
                        <div class="info-row"><span class="info-label">Phone:</span><span class="info-value">${order.shippingAddress?.phone || ''}</span></div>
                        <div class="info-row"><span class="info-label">Address:</span><span class="info-value">${order.shippingAddress?.fullAddress || order.shippingAddress?.address || ''}, ${order.shippingAddress?.city || ''}, ${order.shippingAddress?.state || ''} - ${order.shippingAddress?.pincode || ''}</span></div>
                      </div>

                      <div class="section">
                        <div class="section-title">🛍️ Order Items</div>
                        <table>
                          <thead>
                            <tr>
                              <th>Item</th>
                              <th>Qty</th>
                              <th>Price</th>
                              <th>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            ${order.orderItems?.map(item => `
                              <tr>
                                <td>${item.name} ${item.weight ? `(${item.weight})` : ''}</td>
                                <td>${item.quantity}</td>
                                <td>₹${item.price}</td>
                                <td>₹${(item.price * item.quantity).toFixed(2)}</td>
                              </tr>
                            `).join('')}
                            ${order.hasGift ? `
                              <tr style="background: #e8f5e9;">
                                <td>🎁 ${order.giftItem?.name || 'FREE Gift'}</td>
                                <td>1</td>
                                <td><s>₹${order.giftItem?.oldPrice || 149}</s></td>
                                <td><strong>FREE</strong></td>
                              </tr>
                            ` : ''}
                          </tbody>
                        </table>
                      </div>

                      <div class="section">
                        <div class="section-title">💰 Order Summary</div>
                        <div class="info-row"><span class="info-label">Subtotal:</span><span class="info-value">₹${order.itemsPrice?.toFixed(2)}</span></div>
                        <div class="info-row"><span class="info-label">Delivery:</span><span class="info-value">FREE</span></div>
                        ${order.taxPrice > 0 ? `<div class="info-row"><span class="info-label">Tax:</span><span class="info-value">₹${order.taxPrice?.toFixed(2)}</span></div>` : ''}
                        <div class="info-row total-row"><span class="info-label">GRAND TOTAL:</span><span class="info-value">₹${order.totalPrice?.toFixed(2)}</span></div>
                      </div>

                      <div class="footer">
                        <p>Printed on: ${formatDate(new Date())}</p>
                        <p>JAGAT STORE - www.jagatstore.in</p>
                      </div>
                    </body>
                    </html>
                  `;

                  const iframe = document.createElement('iframe');
                  iframe.style.position = 'absolute';
                  iframe.style.top = '-10000px';
                  iframe.style.left = '-10000px';
                  document.body.appendChild(iframe);
                  iframe.contentWindow.document.write(fullOrderContent);
                  iframe.contentWindow.document.close();
                  setTimeout(() => {
                    iframe.contentWindow.focus();
                    iframe.contentWindow.print();
                    setTimeout(() => document.body.removeChild(iframe), 1000);
                  }, 300);
                }}
                style={{ marginTop: '12px' }}
              >
                📄 Print Full Order Details
              </button>

              <button 
                className="action-btn whatsapp-btn"
                onClick={() => {
                  const msg = `🧾 *JAGAT STORE - Order Confirmation*\n\n📦 Order ID: #${order._id.slice(-8).toUpperCase()}\n💰 Total: ₹${order.totalPrice}\n📍 Status: ${order.orderStatus}\n\nThank you for shopping with us! 🙏`;
                  window.open(`https://wa.me/${order.shippingAddress?.phone?.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(msg)}`);
                }}
                style={{ marginTop: '12px' }}
              >
                📱 Send WhatsApp Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetail;