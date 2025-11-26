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
    paymentMethod: 'COD'
  });

  const [placing, setPlacing] = useState(false);
  const [storeStatus, setStoreStatus] = useState(getStoreStatusMessage());
  const [deliveryCheck, setDeliveryCheck] = useState(null);

  // 🎁 GIFT CONFIGURATION
  const GIFT_THRESHOLD = 999;
  const [hasGift, setHasGift] = useState(false);
  const [giftItem, setGiftItem] = useState(null);

  // 🚚 DELIVERY CONFIGURATION
  const DELIVERY_THRESHOLD = 399;
  const DELIVERY_CHARGE = 19;

  // Check store timing every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setStoreStatus(getStoreStatusMessage());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // 🎁 CHECK GIFT STATUS
  useEffect(() => {
    const giftAdded = localStorage.getItem('jagat_gift_added');
    const storedGift = localStorage.getItem('jagat_gift_product');
    const subtotal = getCartTotal();

    if (giftAdded === 'true' && subtotal >= GIFT_THRESHOLD) {
      setHasGift(true);
      if (storedGift) {
        try {
          setGiftItem(JSON.parse(storedGift));
        } catch (e) {
          setGiftItem({
            name: '🎁 FREE Gift - Premium Ice Cream Pack',
            brand: 'Jagat Store',
            price: 0,
            oldPrice: 149,
            weight: '500ml',
            image: 'https://m.media-amazon.com/images/I/81nRsEQCprL._SL1500_.jpg',
            isGift: true
          });
        }
      }
    } else {
      setHasGift(false);
      setGiftItem(null);
    }
  }, [cartItems]);

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

    if (name === 'address' && value.length > 5) {
      const deliveryMsg = getDeliveryMessage(value);
      setDeliveryCheck(deliveryMsg);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isStoreOpen()) {
      alert(`Sorry! Store is closed. We're open from ${STORE_HOURS.OPEN}:00 AM to ${STORE_HOURS.CLOSE % 12 || 12}:00 PM`);
      return;
    }

    if (!formData.name || !formData.phone || !formData.address) {
      alert('Please fill all required fields');
      return;
    }

    if (formData.phone.length !== 10) {
      alert('Please enter valid 10-digit phone number');
      return;
    }

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
        image: item.product.image || '',
        weight: item.product.weight || ''  // 📦 ADD WEIGHT
      }));

      const itemsTotal = getCartTotal();
      
      // 🚚 CALCULATE DELIVERY CHARGE
      const shippingCost = itemsTotal >= DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE;
      const finalTotal = itemsTotal + shippingCost;

      // 🎁 INCLUDE GIFT DATA IN ORDER
      const orderData = {
        orderItems,
        shippingAddress: {
          fullAddress: formData.address,
          city: 'Ghaziabad',
          state: 'Uttar Pradesh',
          pincode: '201009',
          phone: formData.phone
        },
        paymentMethod: 'COD',
        itemsPrice: itemsTotal,
        taxPrice: 0,
        shippingPrice: shippingCost,  // 🚚 DELIVERY CHARGE
        totalPrice: finalTotal,        // 🚚 INCLUDES DELIVERY
        // 🎁 GIFT DATA
        hasGift: hasGift,
        giftItem: giftItem
      };

      console.log('📤 Sending order to backend:', orderData);
      console.log('🚚 Delivery charge:', shippingCost);
      console.log('🎁 Gift included:', hasGift);

      const response = await api.post('/orders', orderData);

      console.log('✅ Order response:', response.data);

      if (response.data.success) {
        console.log('🎉 Order created successfully!');
        
        // 🎁 CLEAR GIFT FROM LOCALSTORAGE
        localStorage.removeItem('jagat_gift_added');
        localStorage.removeItem('jagat_gift_product');
        localStorage.removeItem('jagat_gift_cart_total');
        
        clearCart();

        navigate('/order-success', { 
          state: {
            orderId: response.data.order._id,
            totalAmount: finalTotal,
            deliveryCharge: shippingCost,
            items: orderItems.length,
            deliveryAddress: formData.address,
            customerName: formData.name,
            customerPhone: formData.phone,
            paymentMethod: 'COD',
            orderDate: new Date().toISOString(),
            // 🎁 GIFT INFO FOR SUCCESS PAGE
            hasGift: hasGift,
            giftSavings: hasGift ? (giftItem?.oldPrice || 149) : 0
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
  
  // 🚚 DELIVERY FEE LOGIC
  const deliveryFee = subtotal >= DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE;
  const remainingForFreeDelivery = Math.max(0, DELIVERY_THRESHOLD - subtotal);
  
  const tax = 0;
  const total = subtotal + deliveryFee + tax;

  // Store Closed UI
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
        
        {/* STORE TIMING BANNER */}
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

            {/* DELIVERY AREAS INFO */}
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
                
                {/* DELIVERY CHECK MESSAGE */}
                {deliveryCheck && (
                  <div 
                    className={`delivery-check-msg ${deliveryCheck.available ? 'success' : 'error'}`}
                    style={{ color: deliveryCheck.color }}
                  >
                    {deliveryCheck.message}
                  </div>
                )}
              </div>

              {/* PAYMENT METHOD - ONLY COD */}
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

              {/* DELIVERY BOY SCANNER MESSAGE */}
              <div className="scanner-info-box">
                <div className="scanner-icon">📱</div>
                <div className="scanner-text">
                  <strong>📦 Order Confirmation:</strong>
                  <p>Our delivery boy will scan the order barcode upon delivery to confirm receipt. Please keep your phone ready!</p>
                </div>
              </div>

              <button 
                type="submit" 
                className={`place-order-btn ${hasGift ? 'has-gift' : ''}`}
                disabled={placing || (deliveryCheck && !deliveryCheck.available)}
              >
                {placing ? '⏳ Placing Order...' : `Place Order - ₹${total.toFixed(2)} (COD) ${hasGift ? '🎁' : ''}`}
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

              {/* 🎁 GIFT ITEM IN SUMMARY */}
              {hasGift && giftItem && (
                <div className="summary-item gift-summary-item">
                  <div className="gift-badge-checkout">🎁 FREE</div>
                  <img 
                    src={giftItem.image || 'https://m.media-amazon.com/images/I/81nRsEQCprL._SL1500_.jpg'} 
                    alt="Gift"
                  />
                  <div className="item-details">
                    <p className="item-name">{giftItem.name || 'Premium Ice Cream Pack'}</p>
                    <p className="item-qty">Complimentary Gift</p>
                  </div>
                  <span className="item-price gift-price-checkout">
                    <span className="free">FREE</span>
                    <span className="original">₹{giftItem.oldPrice || 149}</span>
                  </span>
                </div>
              )}
            </div>

            <div className="summary-totals">
              <div className="total-row">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              
              {/* 🚚 DELIVERY CHARGES */}
              <div className="total-row">
                <span>Delivery Charges</span>
                {subtotal >= DELIVERY_THRESHOLD ? (
                  <span className="free">FREE</span>
                ) : (
                  <span className="delivery-charge">₹{DELIVERY_CHARGE}</span>
                )}
              </div>

              {/* 🚚 FREE DELIVERY HINT */}
              {subtotal < DELIVERY_THRESHOLD && subtotal > 0 && (
                <div className="free-delivery-hint">
                  🚚 Add ₹{remainingForFreeDelivery.toFixed(0)} more for FREE delivery!
                </div>
              )}
              
              <div className="total-row">
                <span>Tax (GST)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              
              {/* 🎁 GIFT ROW */}
              {hasGift && (
                <div className="total-row gift-row">
                  <span>🎁 Surprise Gift</span>
                  <span className="gift-free">FREE (Worth ₹{giftItem?.oldPrice || 149})</span>
                </div>
              )}
              
              <div className="total-row final">
                <span>Total Amount</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            {/* 🎁 SAVINGS BADGE */}
            {hasGift && (
              <div className="checkout-savings-badge">
                🎉 You're saving ₹{giftItem?.oldPrice || 149} with FREE gift!
              </div>
            )}

            <div className="delivery-info-checkout">
              <p>🚚 Delivery in 40 minutes</p>
              <p>📍 {formData.address || 'Enter address above'}</p>
              <p>💵 Cash on Delivery</p>
              {hasGift && <p>🎁 Includes FREE Gift!</p>}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;