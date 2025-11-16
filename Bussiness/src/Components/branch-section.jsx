import React from 'react';
import './branch-section.css';

export default function BranchesSection() {
  const branches = [
    {
      name: "Jagat Store",
      address: "F-388 Pratap Vihar Sec-11, near by Police Chowki, Ghaziabad, Uttar-Pradesh, 201009",
      phone: "+91 9910864099",
      phoneAlt: "+91 9599633093",
      email: "rythemaggarwal7840@gmail.com",
      gst: "07XXXXX1234X1ZX",
      timings: "10:00 AM - 8:00 PM",
      
      // ✅ EXACT JAGAT STORE LOCATION
      // Method 1: Direct search query for "Jagat Store F-388 Pratap Vihar"
      mapUrl: "https://www.google.com/maps/search/Jagat+Store+F-388+Pratap+Vihar+Sec-11+Ghaziabad",
      
      // Embed with place search
      embedUrl: "https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Jagat+Store+F-388+Pratap+Vihar+Sec-11+Ghaziabad&zoom=17"
    }
  ];

  const handleMapClick = (mapUrl) => {
    // Opens Google Maps with exact "Jagat Store" search
    window.open(mapUrl, '_blank', 'noopener,noreferrer');
  };

  const handlePhoneClick = (phone) => {
    window.location.href = `tel:${phone.replace(/\s/g, '')}`;
  };

  const handleEmailClick = (email) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <section className="branches-section" id="branches">
      <div className="branches-container">
        {/* Left Content */}
        <div className="branches-left">
          <h2 className="branches-title">
            Our Store
          </h2>
          
          <p className="branches-description">
            Visit us at Pratap Vihar, Ghaziabad for the best grocery shopping experience. 
            We're here to serve you with fresh products and great service!
          </p>
          
          <div className="branch-highlights">
            <div className="highlight-item">
              <span className="highlight-icon">🕐</span>
              <span className="highlight-text">Open Daily</span>
            </div>
            <div className="highlight-item">
              <span className="highlight-icon">🚚</span>
              <span className="highlight-text">Home Delivery</span>
            </div>
            <div className="highlight-item">
              <span className="highlight-icon">✅</span>
              <span className="highlight-text">Quality Products</span>
            </div>
          </div>
        </div>

        {/* Right Content - Branch Card */}
        <div className="branches-grid">
          {branches.map((branch, index) => (
            <div key={index} className="branch-card">
              
              {/* Google Map Embed */}
              <div className="map-container">
                {/* Clickable overlay */}
                <div 
                  className="map-click-overlay"
                  onClick={() => handleMapClick(branch.mapUrl)}
                  title="Click to open Jagat Store in Google Maps"
                >
                  <div className="map-overlay-text">
                    <span className="map-icon">📍</span>
                    Click to open Jagat Store in Maps
                  </div>
                </div>
                
                {/* Google Maps iframe */}
                <iframe
                  src={branch.embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Jagat Store Location"
                />
              </div>

              {/* Branch Info */}
              <div className="branch-info">
                <h3 className="branch-name">{branch.name}</h3>
                
                {/* Address */}
                <div className="info-item">
                  <span className="info-icon">📍</span>
                  <p className="branch-address">{branch.address}</p>
                </div>

                {/* Phone Numbers */}
                <div 
                  className="info-item clickable"
                  onClick={() => handlePhoneClick(branch.phone)}
                >
                  <span className="info-icon">📞</span>
                  <p className="branch-contact">{branch.phone}</p>
                </div>

                {branch.phoneAlt && (
                  <div 
                    className="info-item clickable"
                    onClick={() => handlePhoneClick(branch.phoneAlt)}
                  >
                    <span className="info-icon">📞</span>
                    <p className="branch-contact">{branch.phoneAlt}</p>
                  </div>
                )}

                {/* Email */}
                <div 
                  className="info-item clickable"
                  onClick={() => handleEmailClick(branch.email)}
                >
                  <span className="info-icon">📧</span>
                  <p className="branch-contact">{branch.email}</p>
                </div>

                {/* Timings */}
                <div className="info-item">
                  <span className="info-icon">🕐</span>
                  <p className="branch-timings">
                    <strong>Timings:</strong> {branch.timings}
                  </p>
                </div>

                {/* GST */}
                <div className="info-item">
                  <span className="info-icon">📄</span>
                  <p className="branch-gst">
                    <strong>GST No:</strong> {branch.gst}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="branch-actions">
                  <button 
                    className="action-btn primary"
                    onClick={() => handleMapClick(branch.mapUrl)}
                  >
                    🗺️ Get Directions
                  </button>
                  <button 
                    className="action-btn secondary"
                    onClick={() => handlePhoneClick(branch.phone)}
                  >
                    📞 Call Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}