// Components/NewYearPopup.jsx - HIDES ON CART/CHECKOUT

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './NewYearPopup.css';

const NewYearPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Pages where popup should NOT show
  const hiddenPages = ['/cart', '/Cart', '/checkout', '/Checkout'];

  useEffect(() => {
    const popupShown = sessionStorage.getItem('newYearPopupShown');
    
    // ✅ Check if current page is in hidden list
    const shouldHide = hiddenPages.some(page => 
      location.pathname.toLowerCase() === page.toLowerCase()
    );

    if (!popupShown && !shouldHide) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    } else if (shouldHide) {
      setIsVisible(false);
    }
  }, [location.pathname]);

  // ✅ Hide when navigating to cart/checkout
  useEffect(() => {
    const shouldHide = hiddenPages.some(page => 
      location.pathname.toLowerCase() === page.toLowerCase()
    );
    
    if (shouldHide) {
      setIsVisible(false);
    }
  }, [location]);

  const handleClose = (e) => {
    e.stopPropagation();
    setIsVisible(false);
    sessionStorage.setItem('newYearPopupShown', 'true');
  };

  const handleShopNow = () => {
    setIsVisible(false);
    sessionStorage.setItem('newYearPopupShown', 'true');
    navigate('/');
  };

  if (!isVisible) return null;

  return (
    <div className="corner-popup" onClick={handleShopNow}>
      
      {/* Close Button */}
      <button className="corner-close" onClick={handleClose}>✕</button>
      
      {/* Gift Icon */}
      <div className="corner-icon">🎁</div>
      
      {/* Text Content */}
      <div className="corner-text">
        <div className="corner-badge">🎉 2025 NEW YEAR SALE</div>
        <div className="corner-offer">
          Above <strong>₹999</strong> get <span className="highlight">FREE Mystery Gift!</span>
        </div>
        <div className="corner-cta">Shop Now →</div>
      </div>
      
    </div>
  );
};

export default NewYearPopup;