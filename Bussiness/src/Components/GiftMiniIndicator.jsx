// Components/GiftMiniIndicator.jsx - MINI GIFT PROGRESS FOR NAVBAR

import React from 'react';
import { useCart } from './CartContext';
import './SurpriseGift.css';

const GiftMiniIndicator = ({ onClick }) => {
  const { getTotalPrice } = useCart();
  const cartTotal = getTotalPrice ? getTotalPrice() : 0;
  
  const GIFT_THRESHOLD = 999;
  const remaining = Math.max(0, GIFT_THRESHOLD - cartTotal);
  const isUnlocked = cartTotal >= GIFT_THRESHOLD;
  const progress = Math.min(100, (cartTotal / GIFT_THRESHOLD) * 100);

  // Don't show if cart is empty
  if (cartTotal === 0) return null;

  return (
    <div 
      className={`gift-mini-indicator ${isUnlocked ? 'unlocked' : ''}`}
      onClick={onClick}
      title={isUnlocked ? 'Gift Unlocked! 🎉' : `Add ₹${remaining.toFixed(0)} more for FREE gift`}
    >
      <span className="gift-mini-icon">{isUnlocked ? '🎁' : '🎁'}</span>
      {isUnlocked ? (
        <span>Gift Unlocked! ✨</span>
      ) : (
        <span>₹{remaining.toFixed(0)} more</span>
      )}
    </div>
  );
};

export default GiftMiniIndicator;