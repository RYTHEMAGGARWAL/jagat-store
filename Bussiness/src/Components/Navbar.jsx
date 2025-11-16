import React, { useState, useEffect } from 'react';
import { Menu, User, Package } from 'lucide-react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import SearchBar from './SearchBar'; // ✅ NEW: Import SearchBar component
import logo3 from '../assets/logo3.png';
import cartIcon from '../assets/cart-icon.png';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const navigate = useNavigate();

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

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userOrders');
    
    setUser(null);
    setIsMobileMenuOpen(false);
    
    alert('Logged out successfully!');
    navigate('/');
    
    setTimeout(() => {
      window.location.reload();
    }, 100);
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

        {/* ✅ NEW: Search Section with SearchBar Component */}
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