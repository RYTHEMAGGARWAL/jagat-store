import React, { useState } from 'react';
import './WhatsAppButton.css';

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  // 📱 WHATSAPP NUMBER (with country code, no + sign)
  const WHATSAPP_NUMBER = '919599633093';
  
  // Default message when clicking the button
  const defaultMessage = encodeURIComponent(
    `Hi! 👋\n\nI'm visiting Jagat Store website and need some help.`
  );

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${defaultMessage}`;

  // Hide tooltip after 5 seconds
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="whatsapp-float-container">
      {/* Tooltip */}
      {(showTooltip || isHovered) && (
        <div className="whatsapp-tooltip">
          💬 Chat with us!
        </div>
      )}
      
      {/* Floating Button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float-btn"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Chat on WhatsApp"
      >
        <svg 
          viewBox="0 0 32 32" 
          className="whatsapp-icon"
          fill="white"
        >
          <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.156-1.972C9.822 30.974 12.79 32 16.004 32 24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.382 22.618c-.396 1.116-1.958 2.042-3.212 2.312-.858.182-1.98.328-5.756-1.238-4.832-2.006-7.94-6.908-8.18-7.228-.232-.32-1.946-2.594-1.946-4.948 0-2.354 1.234-3.51 1.672-3.992.396-.434 1.04-.632 1.656-.632.2 0 .38.01.54.018.438.02.658.046.946.73.36.858 1.24 3.012 1.348 3.232.11.22.22.52.07.82-.14.31-.26.448-.48.698-.22.25-.43.44-.65.71-.2.24-.43.5-.18.94.25.44 1.11 1.832 2.386 2.968 1.64 1.46 2.986 1.928 3.462 2.138.358.158.786.118 1.046-.16.328-.36.732-.954 1.144-1.54.292-.42.662-.472 1.058-.318.4.148 2.546 1.2 2.984 1.42.438.22.73.328.838.51.108.18.108 1.06-.288 2.176z"/>
        </svg>
        
        {/* Pulse Animation Ring */}
        <span className="whatsapp-pulse"></span>
      </a>
    </div>
  );
};

export default WhatsAppButton;