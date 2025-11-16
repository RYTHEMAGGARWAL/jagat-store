import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from './CartContext';
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
    totalItems 
  } = useCart();

  const [updating, setUpdating] = useState(false);

  const FALLBACK_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f5f5f5" width="100" height="100"/%3E%3Ctext x="50%25" y="50%25" font-size="12" text-anchor="middle" dy=".3em" fill="%23999"%3ENo Image%3C/text%3E%3C/svg%3E';

  // Refresh cart on mount
  useEffect(() => {
    refreshCart();
  }, []);

  const handleIncrease = async (productId, currentQty) => {
    try {
      setUpdating(true);
      const newQty = currentQty + 1;
      await updateQuantity(productId, newQty);
      // Force refresh to get updated data
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
        // Confirm before removing
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
        // Force refresh
        await refreshCart();
      }
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Failed to remove item');
    } finally {
      setUpdating(false);
    }
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

  // Calculate totals from current cart items
  const subtotal = cartItems.reduce((total, item) => {
    return total + (item.product.price * item.quantity);
  }, 0);
  
  const deliveryFee = 0;
  const tax = 0;
  const total = subtotal + deliveryFee + tax;

  return (
    <div className="cart-page">
      <div className="cart-container-main">
        
        {/* Left Side - Cart Items */}
        <div className="cart-left">
          <div className="cart-title-section">
            <h1>Shopping Cart</h1>
            <p className="items-count">{cartItems.length} items</p>
          </div>

          {updating && (
            <div className="updating-overlay">
              <div className="updating-spinner"></div>
              Updating...
            </div>
          )}

          <div className="cart-items-list">
            {cartItems.map((item) => {
              const product = item.product;
              const quantity = item.quantity;
              const itemTotal = product.price * quantity;

              return (
                <div key={product._id} className="cart-product-card">
                  
                  {/* Product Image */}
                  <div className="product-img-box">
                    <img 
                      src={product.image || FALLBACK_IMAGE}
                      alt={product.name}
                      onError={(e) => { e.target.src = FALLBACK_IMAGE; }}
                    />
                  </div>

                  {/* Product Info */}
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

                  {/* Quantity + Remove */}
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

                  {/* Item Total */}
                  <div className="product-total-box">
                    <span className="item-total-price">₹{itemTotal.toFixed(2)}</span>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side - Order Summary */}
        <div className="cart-right">
          <div className="order-summary-card">
            <h2>Order Summary</h2>
            
            <div className="summary-line">
              <span>Subtotal ({cartItems.length} items)</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            <div className="summary-line">
              <span>Delivery Charges</span>
              <span className="free-text">FREE</span>
            </div>

            <div className="summary-line">
              <span>Tax (GST)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>

            <div className="summary-total-line">
              <span>Total Amount</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

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
              className="checkout-btn-main" 
              onClick={() => navigate('/checkout')}
              disabled={updating}
            >
              Proceed to Checkout
            </button>
            
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