import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from './CartContext';
import { isStoreOpen, getStoreStatusMessage, STORE_HOURS } from '../utils/storeTiming';
import { isDeliveryAvailable, getDeliveryMessage, getDeliveryAreasText } from '../utils/deliveryAreas';
import api from '../utils/api';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart, loading: cartLoading } = useCart();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'COD' // ✅ FIXED TO COD ONLY
  });

  const [placing, setPlacing] = useState(false);
  const [storeStatus, setStoreStatus] = useState(getStoreStatusMessage());
  const [deliveryCheck, setDeliveryCheck] = useState(null);

  // Check store timing every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setStoreStatus(getStoreStatusMessage());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (cartLoading) return;
    
    if (!cartItems || cartItems.length === 0) {
      navigate('/cart');
    }

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [cartItems, cartLoading, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // ✅ CHECK DELIVERY AREA WHEN ADDRESS CHANGES
    if (name === 'address' && value.length > 5) {
      const deliveryMsg = getDeliveryMessage(value);
      setDeliveryCheck(deliveryMsg);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ CHECK STORE TIMING
    if (!isStoreOpen()) {
      alert(`Sorry! Store is closed. We're open from ${STORE_HOURS.OPEN}:00 AM to ${STORE_HOURS.CLOSE % 12 || 12}:00 PM`);
      return;
    }

    // Validation
    if (!formData.name || !formData.phone || !formData.address) {
      alert('Please fill all required fields');
      return;
    }

    if (formData.phone.length !== 10) {
      alert('Please enter valid 10-digit phone number');
      return;
    }

    // ✅ CHECK DELIVERY AREA
    if (!isDeliveryAvailable(formData.address)) {
      alert(`Sorry! We currently deliver only to:\n\n${getDeliveryAreasText()}\n\nPlease check your address.`);
      return;
    }

    setPlacing(true);

    try {
      console.log('📦 Creating order...');

      const orderItems = cartItems.map(item => ({
        product: item.product._id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        image: item.product.image || ''
      }));

      const totalPrice = getCartTotal();

      const orderData = {
        orderItems,
        shippingAddress: {
          fullAddress: formData.address,
          city: 'Ghaziabad',
          state: 'Uttar Pradesh',
          pincode: '201009',
          phone: formData.phone
        },
        paymentMethod: 'COD', // ✅ ALWAYS COD
        itemsPrice: totalPrice,
        taxPrice: 0,
        shippingPrice: 0,
        totalPrice: totalPrice
      };

      console.log('📤 Sending order to backend:', orderData);

      const response = await api.post('/orders', orderData);

      console.log('✅ Order response:', response.data);

      if (response.data.success) {
        console.log('🎉 Order created successfully!');
        
        clearCart();

        navigate('/order-success', { 
          state: {
            orderId: response.data.order._id,
            totalAmount: totalPrice,
            items: orderItems.length,
            deliveryAddress: formData.address,
            customerName: formData.name,
            customerPhone: formData.phone,
            paymentMethod: 'COD',
            orderDate: new Date().toISOString()
          },
          replace: true 
        });
      } else {
        alert('Failed to place order. Please try again.');
        setPlacing(false);
      }
    } catch (error) {
      console.error('❌ Order error:', error);
      
      alert(
        error.response?.data?.message || 
        'Failed to place order. Please try again.'
      );
      setPlacing(false);
    }
  };

  if (cartLoading) {
    return (
      <div className="checkout-page">
        <div className="checkout-loading">
          <div className="spinner"></div>
          <p>Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return null;
  }

  const subtotal = getCartTotal();
  const deliveryFee = 0;
  const tax = 0;
  const total = subtotal + deliveryFee + tax;

  // ✅ STORE CLOSED UI
  if (!storeStatus.isOpen) {
    return (
      <div className="checkout-page">
        <div className="store-closed-message">
          <div className="closed-icon">🕐</div>
          <h1>Store is Closed</h1>
          <p className="closed-main-msg">{storeStatus.message}</p>
          <p className="closed-sub-msg">{storeStatus.nextAction}</p>
          
          <div className="store-hours-box">
            <h3>📅 Store Hours</h3>
            <p>
              <strong>Open:</strong> {STORE_HOURS.OPEN}:00 AM<br/>
              <strong>Close:</strong> {STORE_HOURS.CLOSE % 12 || 12}:00 PM
            </p>
          </div>

          <div className="closed-actions">
            <Link to="/cart" className="back-to-cart-btn">
              View Cart
            </Link>
            <Link to="/" className="browse-btn">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        
        {/* ✅ STORE TIMING BANNER */}
        {storeStatus.isOpen && (
          <div className="store-open-banner">
            <span className="open-indicator">🟢 Store is Open</span>
            <span className="closing-time">Closes at {STORE_HOURS.CLOSE % 12 || 12}:00 PM</span>
          </div>
        )}

        {/* Left - Delivery Details Form */}
        <div className="checkout-left">
          <div className="checkout-section">
            <h2>Delivery Details</h2>

            {/* ✅ DELIVERY AREAS INFO */}
            <div className="delivery-areas-info">
              <div className="info-icon">🚚</div>
              <div className="info-text">
                <strong>We deliver to:</strong> {getDeliveryAreasText()}
                <br/>
                <small>(Within 4km radius from store)</small>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  disabled={placing}
                />
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10 digit number"
                  maxLength="10"
                  pattern="[0-9]{10}"
                  required
                  disabled={placing}
                />
              </div>

              <div className="form-group">
                <label>Delivery Address *</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your complete address with area name (e.g., Pratap Vihar, Siddharth Vihar, etc.)"
                  rows="3"
                  required
                  disabled={placing}
                />
                
                {/* ✅ DELIVERY CHECK MESSAGE */}
                {deliveryCheck && (
                  <div 
                    className={`delivery-check-msg ${deliveryCheck.available ? 'success' : 'error'}`}
                    style={{ color: deliveryCheck.color }}
                  >
                    {deliveryCheck.message}
                  </div>
                )}
              </div>

              {/* ✅ PAYMENT METHOD - ONLY COD (HIDDEN/DISABLED) */}
              <div className="payment-method-display">
                <div className="cod-badge">
                  <span className="cod-icon">💵</span>
                  <div className="cod-text">
                    <strong>Payment Method:</strong> Cash on Delivery (COD)
                  </div>
                </div>
                <p className="cod-note">
                  💡 Pay cash to our delivery boy when you receive your order
                </p>
              </div>

              {/* ✅ DELIVERY BOY SCANNER MESSAGE */}
              <div className="scanner-info-box">
                <div className="scanner-icon">📱</div>
                <div className="scanner-text">
                  <strong>📦 Order Confirmation:</strong>
                  <p>Our delivery boy will scan the order barcode upon delivery to confirm receipt. Please keep your phone ready!</p>
                </div>
              </div>

              <button 
                type="submit" 
                className="place-order-btn"
                disabled={placing || (deliveryCheck && !deliveryCheck.available)}
              >
                {placing ? '⏳ Placing Order...' : `Place Order - ₹${total.toFixed(2)} (COD)`}
              </button>
            </form>
          </div>
        </div>

        {/* Right - Order Summary */}
        <div className="checkout-right">
          <div className="order-summary-checkout">
            <h2>Order Summary</h2>

            <div className="summary-items">
              {cartItems.map((item) => (
                <div key={item.product._id} className="summary-item">
                  <img 
                    src={item.product.image || '/placeholder.png'} 
                    alt={item.product.name}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/80?text=Product';
                    }}
                  />
                  <div className="item-details">
                    <p className="item-name">{item.product.name}</p>
                    <p className="item-qty">Qty: {item.quantity}</p>
                  </div>
                  <span className="item-price">
                    ₹{(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="summary-totals">
              <div className="total-row">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Delivery Charges</span>
                <span className="free">FREE</span>
              </div>
              <div className="total-row">
                <span>Tax (GST)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="total-row final">
                <span>Total Amount</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            <div className="delivery-info-checkout">
              <p>🚚 Delivery in 40 minutes</p>
              <p>📍 {formData.address || 'Enter address above'}</p>
              <p>💵 Cash on Delivery</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;