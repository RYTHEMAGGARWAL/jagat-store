import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from './CartContext';
import SurpriseGift from '../Components/SurpriseGift';
import { generateCartOrderMessage } from '../utils/whatsappUtils';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal, 
    refreshCart, 
    loading,
    totalItems,
    // 🎁 Gift data from context
    hasGift,
    giftItem
  } = useCart();

  const [updating, setUpdating] = useState(false);
  const [localHasGift, setLocalHasGift] = useState(false);
  const [localGiftItem, setLocalGiftItem] = useState(null);

  // 🎁 Gift Configuration
  const GIFT_THRESHOLD = 999;
  const DEFAULT_GIFT = {
    name: '🎁 FREE Gift',
    brand: 'Jagat Store',
    price: 0,
    oldPrice: 149,
    weight: '500ml',
   image: 'https://tse2.mm.bing.net/th/id/OIP.0BK9_yGQYmr2f7QjTesVDQHaE8?pid=Api&P=0&h=180',
    isGift: true
  };

  // 🚚 DELIVERY CONFIGURATION
  const DELIVERY_THRESHOLD = 399;
  const DELIVERY_CHARGE = 19;

  const FALLBACK_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f5f5f5" width="100" height="100"/%3E%3Ctext x="50%25" y="50%25" font-size="12" text-anchor="middle" dy=".3em" fill="%23999"%3ENo Image%3C/text%3E%3C/svg%3E';

  // Refresh cart on mount
  useEffect(() => {
    refreshCart();
  }, []);

  // 🎁 Check localStorage for gift status
  useEffect(() => {
    const giftAdded = localStorage.getItem('jagat_gift_added');
    const storedGift = localStorage.getItem('jagat_gift_product');
    
    if (giftAdded === 'true') {
      setLocalHasGift(true);
      if (storedGift) {
        try {
          setLocalGiftItem(JSON.parse(storedGift));
        } catch (e) {
          setLocalGiftItem(DEFAULT_GIFT);
        }
      } else {
        setLocalGiftItem(DEFAULT_GIFT);
      }
    }
  }, []);

  // 🎁 Sync with context gift data
  useEffect(() => {
    if (hasGift && giftItem) {
      setLocalHasGift(true);
      setLocalGiftItem(giftItem);
    }
  }, [hasGift, giftItem]);

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => {
    return total + (item.product.price * item.quantity);
  }, 0);

  // 🎁 Check if gift should be shown
  const showGift = (localHasGift || hasGift) && subtotal >= GIFT_THRESHOLD;
  const currentGiftItem = localGiftItem || giftItem || DEFAULT_GIFT;

  // 🎁 Auto-remove gift if below threshold
  useEffect(() => {
    if (subtotal < GIFT_THRESHOLD && localHasGift) {
      setLocalHasGift(false);
      setLocalGiftItem(null);
      localStorage.removeItem('jagat_gift_added');
      localStorage.removeItem('jagat_gift_product');
    }
  }, [subtotal, localHasGift]);

  const handleIncrease = async (productId, currentQty) => {
    try {
      setUpdating(true);
      const newQty = currentQty + 1;
      await updateQuantity(productId, newQty);
      await refreshCart();
    } catch (error) {
      console.error('Error increasing quantity:', error);
      alert('Failed to update quantity');
    } finally {
      setUpdating(false);
    }
  };

  const handleDecrease = async (productId, currentQty) => {
    try {
      setUpdating(true);
      if (currentQty <= 1) {
        if (window.confirm('Remove this item from cart?')) {
          await removeFromCart(productId);
          await refreshCart();
        }
      } else {
        const newQty = currentQty - 1;
        await updateQuantity(productId, newQty);
        await refreshCart();
      }
    } catch (error) {
      console.error('Error decreasing quantity:', error);
      alert('Failed to update quantity');
    } finally {
      setUpdating(false);
    }
  };

  const handleRemove = async (productId) => {
    try {
      if (window.confirm('Remove this item from cart?')) {
        setUpdating(true);
        await removeFromCart(productId);
        await refreshCart();
      }
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Failed to remove item');
    } finally {
      setUpdating(false);
    }
  };

  // 🎁 Handle gift added callback
  // 🎁 Handle gift added callback
const handleGiftAdded = () => {
  setLocalHasGift(true);
  setLocalGiftItem(DEFAULT_GIFT);
  refreshCart();
  
  // Scroll to checkout button
  setTimeout(() => {
    document.querySelector('.checkout-btn-main')?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center' 
    });
  }, 500);
};

  if (loading) {
    return (
      <div className="cart-page">
        <div className="cart-loading">
          <div className="spinner"></div>
          <p>Loading cart...</p>
        </div>
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <div className="empty-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add items to get started</p>
          <Link to="/" className="shop-now-btn">Start Shopping</Link>
        </div>
      </div>
    );
  }

  // 🚚 DELIVERY FEE LOGIC - FREE above ₹399, else ₹19
  const deliveryFee = subtotal >= DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE;
  const remainingForFreeDelivery = Math.max(0, DELIVERY_THRESHOLD - subtotal);
  
  const tax = 0;
  const total = subtotal + deliveryFee + tax;
  const remainingForGift = Math.max(0, GIFT_THRESHOLD - subtotal);

  return (
    <div className="cart-page">
      <div className="cart-container-main">
        
        {/* Left Side - Cart Items */}
        <div className="cart-left">
          <div className="cart-title-section">
            <h1>Shopping Cart</h1>
            <p className="items-count">{cartItems.length} items {showGift && '+ 1 Gift 🎁'}</p>
          </div>

          {updating && (
            <div className="updating-overlay">
              <div className="updating-spinner"></div>
              Updating...
            </div>
          )}

          <div className="cart-items-list">
            {/* Regular Cart Items */}
            {cartItems.map((item) => {
              const product = item.product;
              const quantity = item.quantity;
              const itemTotal = product.price * quantity;

              return (
                <div key={product._id} className="cart-product-card">
                  <div className="product-img-box">
                    <img 
                      src={product.image || FALLBACK_IMAGE}
                      alt={product.name}
                      onError={(e) => { e.target.src = FALLBACK_IMAGE; }}
                    />
                  </div>

                  <div className="product-info-box">
                    <h3>{product.name}</h3>
                    {product.brand && <p className="brand-text">{product.brand}</p>}
                    {product.weight && <p className="weight-text">{product.weight}</p>}
                    <div className="price-box">
                      <span className="current-price">₹{product.price}</span>
                      {product.oldPrice && product.oldPrice > product.price && (
                        <span className="old-price">₹{product.oldPrice}</span>
                      )}
                    </div>
                  </div>

                  <div className="product-actions-box">
                    <div className="qty-controls">
                      <button 
                        onClick={() => handleDecrease(product._id, quantity)}
                        disabled={updating}
                      >
                        −
                      </button>
                      <span>{quantity}</span>
                      <button 
                        onClick={() => handleIncrease(product._id, quantity)}
                        disabled={updating}
                      >
                        +
                      </button>
                    </div>
                    <button 
                      className="remove-btn-small"
                      onClick={() => handleRemove(product._id)}
                      disabled={updating}
                    >
                      🗑️ Remove
                    </button>
                  </div>

                  <div className="product-total-box">
                    <span className="item-total-price">₹{itemTotal.toFixed(2)}</span>
                  </div>
                </div>
              );
            })}

            {/* 🎁 GIFT ITEM - SHOWS IN CART */}
            {showGift && currentGiftItem && (
              <div className="cart-product-card gift-item-card">
                {/* Gift Badge */}
                <div className="gift-ribbon">🎁 FREE GIFT</div>
                
                <div className="product-img-box">
                  <img 
                    src={currentGiftItem.image || '	https://tse2.mm.bing.net/th/id/OIP.0BK9_yGQYmr2f7QjTesVDQHaE8?pid=Api&P=0&h=180'}
                    alt={currentGiftItem.name}
                    onError={(e) => { e.target.src = FALLBACK_IMAGE; }}
                  />
                </div>

                <div className="product-info-box">
                  <h3>{currentGiftItem.name || ' k'}</h3>
                  <p className="brand-text">{currentGiftItem.brand || 'Jagat Store'}</p>
                  {/* <p className="weight-text">{currentGiftItem.weight || '500ml'}</p> */}
                  <div className="price-box">
                    <span className="current-price gift-price">FREE</span>
                    <span className="old-price">₹{currentGiftItem.oldPrice || 149}</span>
                  </div>
                </div>

                <div className="product-actions-box">
                  <div className="gift-qty">
                    <span>Qty: 1</span>
                  </div>
                  <span className="gift-tag">🎉 Complimentary</span>
                </div>

                <div className="product-total-box">
                  <span className="item-total-price gift-total">₹0.00</span>
                  <span className="gift-savings">Worth ₹{currentGiftItem.oldPrice || 149}!</span>
                </div>
              </div>
            )}
          </div>

          {/* 🎁 SURPRISE GIFT COMPONENT */}
          <SurpriseGift cartTotal={subtotal} onGiftAdded={handleGiftAdded} />
        </div>

        {/* Right Side - Order Summary */}
        <div className="cart-right">
          <div className="order-summary-card">
            <h2>Order Summary</h2>
            
            <div className="summary-line">
              <span>Subtotal ({cartItems.length} items)</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            {/* 🚚 DELIVERY CHARGES */}
            <div className="summary-line">
              <span>Delivery Charges</span>
              {subtotal >= DELIVERY_THRESHOLD ? (
                <span className="free-text">FREE</span>
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

            <div className="summary-line">
              <span>Tax (GST)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>

            {/* 🎁 Gift Row in Summary */}
            {showGift && (
              <div className="summary-line gift-summary-row">
                <span>🎁 Surprise Gift</span>
                <span className="gift-free-text">FREE (Worth ₹{currentGiftItem?.oldPrice || 149})</span>
              </div>
            )}

            <div className="summary-total-line">
              <span>Total Amount</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            {/* 🎁 Savings Badge */}
            {showGift && (
              <div className="savings-badge">
              🎁 FREE Gift Unlocked! Worth ₹{currentGiftItem?.oldPrice || 149}
              </div>
            )}

            {/* 🎁 Gift Progress - Shows when NOT unlocked */}
           {/* 🎁 Gift Progress */}
{subtotal > 0 && !showGift && (
  <div className={`gift-progress-mini ${subtotal >= GIFT_THRESHOLD ? 'gift-unlocked' : ''}`}>
    {subtotal >= GIFT_THRESHOLD ? (
      <>
        <span>🎁 Mystery Gift Unlocked!</span>
       <div 
  className="mystery-gift-cta"
  onClick={() => {
    document.querySelector('.surprise-gift-container')?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center' 
    });
  }}
>
  <span>✨ Tap to Reveal Your Gift Below ⬇️</span>
</div>
      </>
    ) : (
      <>
        <span>🎁 ₹{remainingForGift.toFixed(0)} away from a FREE surprise gift!</span>
        <div className="mini-progress-bar">
          <div 
            className="mini-progress-fill"
            style={{ width: `${Math.min(100, (subtotal / GIFT_THRESHOLD) * 100)}%` }}
          ></div>
        </div>
      </>
    )}
  </div>
)}

            <div className="delivery-box">
              <div className="delivery-line">
                <span>🚚</span>
                <span>Delivery in 40 minutes</span>
              </div>
              <div className="delivery-line">
                <span>📍</span>
                <span>F-388 Pratap Vihar, Sec-11, GZB</span>
              </div>
            </div>

            <button 
              className={`checkout-btn-main ${showGift ? 'has-gift' : ''}`}
              onClick={() => navigate('/checkout')}
              disabled={updating}
            >
              Proceed to Checkout {showGift && '🎁'}
            </button>

            {/* 📱 WHATSAPP ORDER BUTTON */}
            <a 
              href={generateCartOrderMessage(cartItems, subtotal, deliveryFee, total, showGift)}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-order-btn"
            >
              <svg viewBox="0 0 32 32" fill="white">
                <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.156-1.972C9.822 30.974 12.79 32 16.004 32 24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.382 22.618c-.396 1.116-1.958 2.042-3.212 2.312-.858.182-1.98.328-5.756-1.238-4.832-2.006-7.94-6.908-8.18-7.228-.232-.32-1.946-2.594-1.946-4.948 0-2.354 1.234-3.51 1.672-3.992.396-.434 1.04-.632 1.656-.632.2 0 .38.01.54.018.438.02.658.046.946.73.36.858 1.24 3.012 1.348 3.232.11.22.22.52.07.82-.14.31-.26.448-.48.698-.22.25-.43.44-.65.71-.2.24-.43.5-.18.94.25.44 1.11 1.832 2.386 2.968 1.64 1.46 2.986 1.928 3.462 2.138.358.158.786.118 1.046-.16.328-.36.732-.954 1.144-1.54.292-.42.662-.472 1.058-.318.4.148 2.546 1.2 2.984 1.42.438.22.73.328.838.51.108.18.108 1.06-.288 2.176z"/>
              </svg>
              Order via WhatsApp
            </a>
            
            <Link to="/" className="continue-btn-outline">
              Continue Shopping
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;