// Components/SurpriseGift.jsx - WITH 5 SEC COUNTDOWN TO CHECKOUT

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SurpriseGift.css';

const SurpriseGift = ({ cartTotal, onGiftAdded }) => {
  const navigate = useNavigate();
  const GIFT_THRESHOLD = 999;
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [giftRevealed, setGiftRevealed] = useState(false);
  const [giftAdded, setGiftAdded] = useState(false);
  const [addingGift, setAddingGift] = useState(false);
  const [prevTotal, setPrevTotal] = useState(0);
  
  // ✅ NEW: Countdown state
  const [countdown, setCountdown] = useState(null);

  const remaining = Math.max(0, GIFT_THRESHOLD - cartTotal);
  const progress = Math.min(100, (cartTotal / GIFT_THRESHOLD) * 100);

  // 🎨 GIFT PRODUCT DETAILS
  const GIFT_PRODUCT = {
    name: '🎁 FREE Gift ',
    brand: 'Jagat Store',
    category: 'Gift',
    price: 0,
    oldPrice: 149,
    quantity: 1,
    weight: '500ml',
    image: 'https://tse2.mm.bing.net/th/id/OIP.0BK9_yGQYmr2f7QjTesVDQHaE8?pid=Api&P=0&h=180',
    isGift: true
  };

  // Check unlock status
  useEffect(() => {
    if (cartTotal >= GIFT_THRESHOLD && prevTotal < GIFT_THRESHOLD) {
      setIsUnlocked(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else if (cartTotal >= GIFT_THRESHOLD) {
      setIsUnlocked(true);
    } else {
      setIsUnlocked(false);
      setGiftRevealed(false);
      setGiftAdded(false);
      setCountdown(null);
      // Remove gift from localStorage if below threshold
      localStorage.removeItem('jagat_gift_added');
      localStorage.removeItem('jagat_gift_product');
    }
    
    setPrevTotal(cartTotal);
  }, [cartTotal, prevTotal]);

  // Check localStorage for gift status
  useEffect(() => {
    const giftAddedStatus = localStorage.getItem('jagat_gift_added');
    if (giftAddedStatus === 'true' && cartTotal >= GIFT_THRESHOLD) {
      setGiftAdded(true);
      setGiftRevealed(true);
    } else if (cartTotal < GIFT_THRESHOLD) {
      setGiftAdded(false);
      setGiftRevealed(false);
    }
  }, [cartTotal]);

  const handleRevealGift = () => {
    setGiftRevealed(true);
    
    // Scroll to Add Gift button
    setTimeout(() => {
      document.querySelector('.add-gift-btn')?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }, 500);
  };

  // 🎁 ADD GIFT TO CART + 5 SEC COUNTDOWN
  const handleAddGiftToCart = async () => {
    if (addingGift || giftAdded) return;

    try {
      setAddingGift(true);
      
      const token = localStorage.getItem('token');
      const API_URL = import.meta.env?.VITE_API_URL || 'http://localhost:5000/api';

      let apiSuccess = false;

      if (token) {
        try {
          const response = await fetch(`${API_URL}/cart/add-gift`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              giftProduct: GIFT_PRODUCT,
              cartTotal: cartTotal
            })
          });

          const data = await response.json();
          
          if (response.ok && data.success) {
            apiSuccess = true;
          }
        } catch (apiError) {
          console.log('API call failed, using localStorage');
        }
      }

      // Save to localStorage
      localStorage.setItem('jagat_gift_added', 'true');
      localStorage.setItem('jagat_gift_product', JSON.stringify(GIFT_PRODUCT));
      
      setGiftAdded(true);
      
      // 🔥 CALLBACK TO PARENT - This refreshes cart display!
      if (onGiftAdded && typeof onGiftAdded === 'function') {
        onGiftAdded();
      }

      // ✅ START 5 SECOND COUNTDOWN
      setCountdown(5);
      
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate('/checkout');
            return null;
          }
          return prev - 1;
        });
      }, 1000);

    } catch (error) {
      console.error('Error adding gift:', error);
      // Still mark as added
      localStorage.setItem('jagat_gift_added', 'true');
      localStorage.setItem('jagat_gift_product', JSON.stringify(GIFT_PRODUCT));
      setGiftAdded(true);
      
      if (onGiftAdded) onGiftAdded();
      
      // ✅ START COUNTDOWN EVEN ON ERROR
      setCountdown(5);
      
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate('/checkout');
            return null;
          }
          return prev - 1;
        });
      }, 1000);
      
    } finally {
      setAddingGift(false);
    }
  };

  // ✅ SKIP COUNTDOWN - Go to checkout immediately
  const handleSkipCountdown = () => {
    setCountdown(null);
    navigate('/checkout');
  };

  // Confetti
  const renderConfetti = () => {
    if (!showConfetti) return null;
    
    const confettiPieces = [];
    const colors = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff6b9d', '#c44dff'];
    
    for (let i = 0; i < 50; i++) {
      const style = {
        left: `${Math.random() * 100}%`,
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        animationDelay: `${Math.random() * 0.5}s`,
        animationDuration: `${2 + Math.random() * 2}s`
      };
      confettiPieces.push(<div key={i} className="confetti-piece" style={style} />);
    }
    
    return <div className="confetti-container">{confettiPieces}</div>;
  };

  return (
    <div className={`surprise-gift-container ${isUnlocked ? 'unlocked' : ''}`}>
      {renderConfetti()}
      
      {/* Header */}
      <div className="gift-header">
        <div className="gift-icon-wrapper">
          <span className={`gift-icon ${isUnlocked ? 'bounce' : 'shake'}`}>🎁</span>
          {isUnlocked && <span className="sparkle">✨</span>}
        </div>
        <div className="gift-title">
          {isUnlocked ? (
            <>
              <h3>🎉 Congratulations!</h3>
              <p>You've unlocked a <span className="highlight">FREE Surprise Gift!</span></p>
            </>
          ) : (
            <>
              <h3>🎁 Surprise Gift Awaits!</h3>
              <p>Add <span className="highlight">₹{remaining.toFixed(0)}</span> more to unlock</p>
            </>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="gift-progress-section">
        <div className="progress-labels">
          <span>₹0</span>
          <span className="threshold-label">₹{GIFT_THRESHOLD}</span>
        </div>
        <div className="progress-bar-container">
          <div 
            className={`progress-bar-fill ${isUnlocked ? 'complete' : ''}`}
            style={{ width: `${progress}%` }}
          >
            {progress > 10 && (
              <span className="progress-text">₹{cartTotal.toFixed(0)}</span>
            )}
          </div>
          <div className="gift-marker" style={{ left: '100%' }}>
            🎁
          </div>
        </div>
      </div>

      {/* Gift Reveal Section */}
      {isUnlocked && (
        <div className="gift-reveal-section">
          {!giftRevealed ? (
            <button className="reveal-btn" onClick={handleRevealGift}>
              <span className="btn-icon">🎁</span>
              <span>Tap to Reveal Your Gift!</span>
              <span className="btn-sparkles">✨</span>
            </button>
          ) : (
            <div className="revealed-gift">
              <div className="gift-box-animation">
                <div className="gift-box">
                  <div className="gift-box-lid"></div>
                  <div className="gift-box-body"></div>
                </div>
                <div className="gift-item-popup">
                  <div className="gift-box-open">
                    <span className="box-lid">🎀</span>
                    <span className="box-base">📦</span>
                    <span className="gift-inside">🎁</span>
                  </div>
                </div>
              </div>
              <div className="gift-details">
                <h4>🎊 Your FREE Gift!</h4>
                <p className="gift-name"></p>
                <p className="gift-value">Worth ₹149 - FREE!</p>
                
                {/* ADD TO CART BUTTON */}
                {!giftAdded ? (
                  <button 
                    className="add-gift-btn"
                    onClick={handleAddGiftToCart}
                    disabled={addingGift}
                  >
                    {addingGift ? (
                      <>
                        <span className="btn-spinner"></span>
                        <span>Adding...</span>
                      </>
                    ) : (
                      <>
                        <span>🛒</span>
                        <span>Add Gift to Cart</span>
                      </>
                    )}
                  </button>
                ) : (
                  <div className="gift-added-section">
                    {/* ✅ ADDED BADGE WITH COUNTDOWN */}
                    <div className="gift-badge">
                      <span>✅ Added to Cart</span>
                    </div>
                    
                    {/* ✅ COUNTDOWN DISPLAY */}
                    {countdown && (
                      <div className="checkout-countdown">
                        <div className="countdown-text">
                          <span className="countdown-icon">🚀</span>
                          <span>Going to Checkout in <strong>{countdown}s</strong></span>
                        </div>
                        <button 
                          className="skip-btn"
                          onClick={handleSkipCountdown}
                        >
                          Go Now →
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Motivational Messages */}
      {!isUnlocked && (
        <div className="motivation-section">
          {progress >= 75 ? (
            <p className="motivation-text hot">🔥 Almost there! Just ₹{remaining.toFixed(0)} more!</p>
          ) : progress >= 50 ? (
            <p className="motivation-text warm">💪 Halfway there! Keep going!</p>
          ) : progress >= 25 ? (
            <p className="motivation-text">🛒 Great start! Add more items!</p>
          ) : (
            <p className="motivation-text">🎯 Shop for ₹{GIFT_THRESHOLD} to unlock free gift!</p>
          )}
        </div>
      )}

      {/* Jagat Store Badge */}
      <div className="jagat-badge">
        <span>🪴</span>
        <span>From <strong>Jagat Store</strong> with ❤️</span>
      </div>
    </div>
  );
};

export default SurpriseGift;