import React, { useState, useEffect } from 'react';
import { Menu, User, Package } from 'lucide-react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import SearchBar from './SearchBar';
import logo3 from '../assets/logo3.png';
import cartIcon from '../assets/cart-icon.png';
import { tokenHelpers } from '../utils/api';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { getTotalItems, getCartTotal, cartItems, resetCart } = useCart();
  const totalItems = getTotalItems();
  const navigate = useNavigate();

  // 🎁 Gift threshold
  const GIFT_THRESHOLD = 999;
  
  // Calculate cart total for gift indicator
  const cartTotal = cartItems ? cartItems.reduce((total, item) => {
    return total + (item.product?.price || 0) * (item.quantity || 0);
  }, 0) : 0;
  
  const remainingForGift = Math.max(0, GIFT_THRESHOLD - cartTotal);
  const isGiftUnlocked = cartTotal >= GIFT_THRESHOLD;
  const giftProgress = Math.min(100, (cartTotal / GIFT_THRESHOLD) * 100);

  // Check if user is logged in
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

 const toggleMobileMenu = () => {
  setIsMobileMenuOpen(!isMobileMenuOpen);
};

// 📜 Auto-close menu on scroll
useEffect(() => {
  const handleScroll = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  window.addEventListener('scroll', handleScroll);
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, [isMobileMenuOpen]);

// 📱 Close menu when clicking outside
useEffect(() => {
  const handleClickOutside = (e) => {
    if (isMobileMenuOpen && !e.target.closest('.mobile-menu-dropdown') && !e.target.closest('.mobile-menu-btn')) {
      setIsMobileMenuOpen(false);
    }
  };

  document.addEventListener('click', handleClickOutside);
  
  return () => {
    document.removeEventListener('click', handleClickOutside);
  };
}, [isMobileMenuOpen]);

  // 🔐 Handle logout - COMPLETE FIX
  const handleLogout = async () => {
    console.log('🚪 Starting logout process...');
    
    // ✅ Step 1: Reset cart state immediately
    if (typeof resetCart === 'function') {
      resetCart();
    }
    
    // ✅ Step 2: Dispatch custom event for CartContext
    window.dispatchEvent(new Event('user-logout'));
    
    // ✅ Step 3: Use tokenHelpers to clear EVERYTHING (calls backend logout API)
    await tokenHelpers.removeToken();
    
    // ✅ Step 4: Update state
    setUser(null);
    setIsMobileMenuOpen(false);
    
    console.log('✅ Logout complete, redirecting...');
    
    // ✅ Step 5: Force full page reload to clear everything
  
    window.location.href = '/';
  };

  // Cart icon component
  const CartIcon = ({ size = 20 }) => (
    <img 
      src={cartIcon} 
      alt="Cart" 
      style={{ 
        width: size, 
        height: size, 
        objectFit: 'contain' 
      }} 
    />
  );

  // 🎁 Gift Mini Indicator Component
  const GiftMiniIndicator = () => {
    if (cartTotal === 0) return null;
    
    return (
      <Link to="/Cart" className={`gift-mini-indicator ${isGiftUnlocked ? 'unlocked' : ''}`}>
        <span className="gift-mini-icon">{isGiftUnlocked ? '🎁' : '🎁'}</span>
        {isGiftUnlocked ? (
          <span className="gift-mini-text">Gift Unlocked! ✨</span>
        ) : (
          <span className="gift-mini-text">₹{remainingForGift.toFixed(0)} more</span>
        )}
      </Link>
    );
  };

  return (
    <div className="blinkit-header">
      <div className="header-container">
        {/* Logo Section */}
        <div className="logo-section">
          <Link to="/">
            <img src={logo3} alt="Jagat Store" className="logo-img" />
          </Link>
        </div>

        {/* Delivery Info Section - HIDDEN ON MOBILE */}
        <div className="delivery-title-row">
          <span className="delivery-time">Delivery in 40 minutes</span>
        </div>

        {/* Search Section with SearchBar Component */}
        <div className="search-section">
          <SearchBar />
        </div>

        {/* Desktop Auth and Cart Section */}
        <div className="auth-cart-section">
          {user ? (
            <>
              {/* User Info with Dropdown */}
              <div className="user-menu-container">
                <div className="user-info-btn">
                  <User size={16} />
                  <span className="user-name">{user.name}</span>
                </div>
                
                {/* Dropdown Menu */}
                <div className="user-dropdown">
                  <Link to="/my-orders" className="dropdown-item my-orders-link">
                    <Package size={16} />
                    <span>My Orders</span>
                  </Link>
                  
                  {user.role === 'admin' && (
                    <Link to="/admin/dashboard" className="dropdown-item admin-link">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                        <path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path>
                      </svg>
                      <span>Admin Panel</span>
                    </Link>
                  )}
                  
                  <button onClick={handleLogout} className="dropdown-item logout-link">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <Link to="/Login">
              <button className="login-btn">Login</button>
            </Link>
          )}
          
          {/* 🎁 Gift Mini Indicator - Desktop */}
          <GiftMiniIndicator />
          
          {/* Desktop Cart */}
          <Link to="/Cart">
            <div className="cart-container">
              <CartIcon size={20} />
              {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
            </div>
          </Link>
        </div>

        {/* Mobile Menu Button & Cart */}
        <div className="mobile-menu">
          {/* 🎁 Gift Mini Indicator - Mobile (Small version) */}
          {cartTotal > 0 && (
            <Link to="/Cart" className={`gift-mini-mobile ${isGiftUnlocked ? 'unlocked' : ''}`}>
              <span>🎁</span>
            </Link>
          )}
          
          <button 
            className="mobile-menu-btn" 
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <Menu className="hamburger" size={20} />
          </button>
          
          <Link to="/Cart" className="mobile-cart-container">
            <CartIcon size={20} />
            {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
          </Link>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`mobile-menu-dropdown ${isMobileMenuOpen ? 'open' : ''}`}>
        {/* 🎁 Gift Progress in Mobile Menu */}
        {cartTotal > 0 && (
          <div className={`mobile-gift-banner ${isGiftUnlocked ? 'unlocked' : ''}`}>
            {isGiftUnlocked ? (
              <>
                <span className="mobile-gift-icon">🎁</span>
                <span>FREE Gift Unlocked! ✨</span>
              </>
            ) : (
              <>
                <span className="mobile-gift-icon">🎁</span>
                <span>Add ₹{remainingForGift.toFixed(0)} for FREE gift</span>
              </>
            )}
          </div>
        )}
        
        {user ? (
          <>
            <div className="mobile-user-info">
              <User size={18} />
              <span>{user.name}</span>
            </div>
            
            <Link to="/my-orders" className="mobile-menu-item" onClick={toggleMobileMenu}>
              <Package size={16} />
              <span>My Orders</span>
            </Link>
            
            {user.role === 'admin' && (
              <Link to="/admin/dashboard" className="mobile-menu-item" onClick={toggleMobileMenu}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
                <span>Admin Panel</span>
              </Link>
            )}
            
            <button onClick={handleLogout} className="mobile-logout-btn">
              Logout
            </button>
          </>
        ) : (
          <Link to="/Login" onClick={toggleMobileMenu}>
            <button className="mobile-login-btn">Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;