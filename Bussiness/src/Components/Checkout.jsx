import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from './CartContext';
import { isStoreOpen, getStoreStatusMessage, STORE_HOURS } from '../utils/storeTiming';
import api from '../utils/api';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart, loading: cartLoading } = useCart();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    houseNo: '',      // House/Flat number - Manual
    landmark: '',     // Landmark - Manual
    detectedArea: '', // Auto-detected area from GPS
    paymentMethod: 'COD'
  });

  // Manual area selection (backup if GPS fails)
  const [manualAreaSelected, setManualAreaSelected] = useState(false);
  const [selectedArea, setSelectedArea] = useState('');

  // Delivery areas list
  const DELIVERY_AREAS = [
    'Vijay Nagar',
    'Pratap Vihar', 
    'Siddharth Vihar',
    'Hindon Vihar',
    'Gaushala',
    'Jassipura',
    'Old Bus Stand',
    'Nandgram',
    'Ghukna',
    'Ambedkar Road'
  ];

  const [placing, setPlacing] = useState(false);
  const [storeStatus, setStoreStatus] = useState(getStoreStatusMessage());
  const [deliveryCheck, setDeliveryCheck] = useState(null);

  // 📍 LOCATION STATES
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [userDistance, setUserDistance] = useState(null);
  const [userCoords, setUserCoords] = useState(null);

  // 🏪 SHOP LOCATION (Jagat Store - Pratap Vihar, Ghaziabad)
  const SHOP_LOCATION = {
    lat: 28.6534355,  // Jagat Store exact latitude
    lng: 77.408827,   // Jagat Store exact longitude
    name: 'Jagat Store'
  };
  
  // 🚚 MAX DELIVERY RADIUS (in km)
  const MAX_DELIVERY_RADIUS = 5;

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
            name: '🎁 FREE Gift',
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

  // 📍 CALCULATE DISTANCE (Haversine formula)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return Math.round(distance * 10) / 10; // Round to 1 decimal
  };

  // 🔑 GOOGLE MAPS API KEY
  const GOOGLE_MAPS_API_KEY = 'AIzaSyDD2irS68O-QaBCk--OMBG5djxaFq1BP-w';

  // 📍 GET ADDRESS FROM COORDINATES - Using Google Maps API
  const getAddressFromCoords = async (lat, lng) => {
    try {
      // Use result_type to get detailed address
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}&language=en&result_type=street_address|sublocality|locality`
      );
      const data = await response.json();
      
      console.log('Google Geocoding Response:', data);
      
      if (data.status === 'OK' && data.results && data.results.length > 0) {
        // Try to find the most detailed address (usually first result)
        let bestAddress = '';
        let addressComponents = {
          premise: '',
          street: '',
          neighborhood: '',
          sublocality3: '',
          sublocality2: '',
          sublocality1: '',
          locality: '',
          district: '',
          state: '',
          pincode: ''
        };

        // Go through all results to find best components
        data.results.forEach(result => {
          result.address_components.forEach(component => {
            const types = component.types;
            
            if (types.includes('premise') && !addressComponents.premise) {
              addressComponents.premise = component.long_name;
            }
            if (types.includes('route') && !addressComponents.street) {
              addressComponents.street = component.long_name;
            }
            if (types.includes('neighborhood') && !addressComponents.neighborhood) {
              addressComponents.neighborhood = component.long_name;
            }
            if (types.includes('sublocality_level_3') && !addressComponents.sublocality3) {
              addressComponents.sublocality3 = component.long_name;
            }
            if (types.includes('sublocality_level_2') && !addressComponents.sublocality2) {
              addressComponents.sublocality2 = component.long_name;
            }
            if (types.includes('sublocality_level_1') && !addressComponents.sublocality1) {
              addressComponents.sublocality1 = component.long_name;
            }
            if (types.includes('locality') && !addressComponents.locality) {
              addressComponents.locality = component.long_name;
            }
            if (types.includes('administrative_area_level_2') && !addressComponents.district) {
              addressComponents.district = component.long_name;
            }
            if (types.includes('administrative_area_level_1') && !addressComponents.state) {
              addressComponents.state = component.long_name;
            }
            if (types.includes('postal_code') && !addressComponents.pincode) {
              addressComponents.pincode = component.long_name;
            }
          });
        });

        // Build address from components (most specific to least)
        let parts = [];
        if (addressComponents.premise) parts.push(addressComponents.premise);
        if (addressComponents.street) parts.push(addressComponents.street);
        if (addressComponents.neighborhood) parts.push(addressComponents.neighborhood);
        if (addressComponents.sublocality3) parts.push(addressComponents.sublocality3);
        if (addressComponents.sublocality2) parts.push(addressComponents.sublocality2);
        if (addressComponents.sublocality1) parts.push(addressComponents.sublocality1);
        if (addressComponents.locality) parts.push(addressComponents.locality);
        if (addressComponents.district && addressComponents.district !== addressComponents.locality) {
          parts.push(addressComponents.district);
        }
        if (addressComponents.state) parts.push(addressComponents.state);
        if (addressComponents.pincode) parts.push(addressComponents.pincode);

        // Remove duplicates
        const uniqueParts = [...new Set(parts)];
        bestAddress = uniqueParts.join(', ');

        // If we got a good address, return it
        if (bestAddress && bestAddress.length > 20) {
          return bestAddress;
        }

        // Fallback to formatted_address from first result
        if (data.results[0].formatted_address) {
          return data.results[0].formatted_address;
        }
      }
      
      // If Google fails, try backup with more params
      console.log('Trying backup geocoding...');
      const backupResponse = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
      );
      const backupData = await backupResponse.json();
      
      if (backupData.status === 'OK' && backupData.results && backupData.results[0]) {
        return backupData.results[0].formatted_address;
      }
      
      console.error('Google Geocoding error:', data.status, data.error_message);
      return 'Ghaziabad, Uttar Pradesh';
    } catch (error) {
      console.error('Geocoding error:', error);
      return 'Ghaziabad, Uttar Pradesh';
    }
  };

  // 📍 DETECT USER LOCATION
  const detectLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('❌ Geolocation is not supported by your browser');
      return;
    }

    setLocationLoading(true);
    setLocationError(null);
    setUserDistance(null);
    setDeliveryCheck(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          console.log('📍 GPS Coordinates:', latitude, longitude);
          
          setUserCoords({ lat: latitude, lng: longitude });

          // Calculate distance from shop
          const distance = calculateDistance(
            latitude, longitude,
            SHOP_LOCATION.lat, SHOP_LOCATION.lng
          );
          console.log('📏 Distance from shop:', distance, 'km');
          setUserDistance(distance);

          // Get address from Google Maps API
          const address = await getAddressFromCoords(latitude, longitude);
          console.log('📍 Detected Address:', address);
          
          if (address) {
            setFormData(prev => ({ ...prev, detectedArea: address }));
          }

          // 📍 CHECK ONLY DISTANCE - 5km radius
          if (distance <= MAX_DELIVERY_RADIUS) {
            // Reset manual selection since GPS works
            setManualAreaSelected(false);
            setSelectedArea('');
            setDeliveryCheck({
              available: true,
              message: `✅ Great! You're ${distance} km away. Delivery available!`,
              color: '#2e7d32'
            });
          } else {
            setDeliveryCheck({
              available: false,
              message: `❌ GPS shows ${distance} km away. Select your area below if you're in our delivery zone.`,
              color: '#c62828'
            });
          }

          setLocationLoading(false);
        } catch (error) {
          console.error('Location processing error:', error);
          setLocationError('❌ Error processing location. Please try again.');
          setLocationLoading(false);
        }
      },
      (error) => {
        setLocationLoading(false);
        console.error('Geolocation error:', error);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('📍 Location permission denied. Please allow location access in your browser settings and try again.');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError('📍 Location unavailable. Please check your GPS/location settings.');
            break;
          case error.TIMEOUT:
            setLocationError('📍 Location request timed out. Please try again.');
            break;
          default:
            setLocationError('📍 Could not get location. Please try again.');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0
      }
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle manual area selection
  const handleManualAreaSelect = (area) => {
    setSelectedArea(area);
    setManualAreaSelected(true);
    setFormData(prev => ({ ...prev, detectedArea: area + ', Ghaziabad, Uttar Pradesh' }));
    setDeliveryCheck({
      available: true,
      message: `✅ ${area} - Delivery Available!`,
      color: '#2e7d32'
    });
  };

  // Check if delivery is available (GPS or Manual)
  const isDeliveryAvailable = () => {
    return manualAreaSelected; // Delivery available only when area is selected
  };

  // Get full address for order
  const getFullAddress = () => {
    let parts = [];
    if (formData.houseNo) parts.push(formData.houseNo);
    if (formData.landmark) parts.push(`Near ${formData.landmark}`);
    if (formData.detectedArea) parts.push(formData.detectedArea);
    return parts.join(', ') || 'Address not provided';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isStoreOpen()) {
      alert(`Sorry! Store is closed. We're open from ${STORE_HOURS.OPEN}:00 AM to ${STORE_HOURS.CLOSE % 12 || 12}:00 PM`);
      return;
    }

    if (!formData.name || !formData.phone || !formData.houseNo) {
      alert('Please fill all required fields (Name, Phone, House No.)');
      return;
    }

    if (formData.phone.length !== 10) {
      alert('Please enter valid 10-digit phone number');
      return;
    }

    // 📍 CHECK GPS DISTANCE OR MANUAL AREA SELECTION
    if (!isDeliveryAvailable()) {
      alert('📍 Please detect your location or select your area to verify delivery availability.');
      return;
    }

    // Get full address
    const fullAddress = getFullAddress();

    setPlacing(true);

    try {
      console.log('📦 Creating order...');

      const orderItems = cartItems.map(item => ({
        product: item.product._id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        image: item.product.image || '',
        weight: item.product.weight || ''
      }));

      const itemsTotal = getCartTotal();
      const shippingCost = itemsTotal >= DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE;
      const finalTotal = itemsTotal + shippingCost;

      const orderData = {
        orderItems,
        shippingAddress: {
          name: formData.name,
          fullAddress: fullAddress,
          houseNo: formData.houseNo,
          landmark: formData.landmark,
          detectedArea: formData.detectedArea,
          selectedArea: manualAreaSelected ? selectedArea : null,
          city: 'Ghaziabad',
          state: 'Uttar Pradesh',
          pincode: '201009',
          phone: formData.phone,
          coordinates: userCoords
        },
        paymentMethod: 'COD',
        itemsPrice: itemsTotal,
        taxPrice: 0,
        shippingPrice: shippingCost,
        totalPrice: finalTotal,
        hasGift: hasGift,
        giftItem: giftItem,
        deliveryDistance: userDistance,
        manualAreaSelected: manualAreaSelected
      };

      console.log('📤 Sending order:', orderData);

      const response = await api.post('/orders', orderData);

      if (response.data.success) {
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
            deliveryAddress: fullAddress,
            customerName: formData.name,
            customerPhone: formData.phone,
            paymentMethod: 'COD',
            orderDate: new Date().toISOString(),
            hasGift: hasGift,
            giftSavings: hasGift ? (giftItem?.oldPrice || 149) : 0,
            deliveryDistance: userDistance
          },
          replace: true 
        });
      } else {
        alert('Failed to place order. Please try again.');
        setPlacing(false);
      }
    } catch (error) {
      console.error('❌ Order error:', error);
      alert(error.response?.data?.message || 'Failed to place order. Please try again.');
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
  const deliveryFee = subtotal >= DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE;
  const remainingForFreeDelivery = Math.max(0, DELIVERY_THRESHOLD - subtotal);
  const tax = 0;
  const total = subtotal + deliveryFee + tax;

  // Store Closed UI
  if (!storeStatus.isOpen) {
    return (
      <div className="checkout-page">
        <div className="store-closed-message">
          <div className="closed-icon">🌙</div>
          <h1>Store is Currently Closed</h1>
          <p className="closed-main-msg">We're open from {STORE_HOURS.OPEN}:00 AM to {STORE_HOURS.CLOSE % 12 || 12}:00 PM</p>
          <p className="closed-sub-msg">Please come back during operating hours</p>

          <div className="store-hours-box">
            <h3>🕐 Store Hours</h3>
            <p>Morning: {STORE_HOURS.OPEN}:00 AM - {STORE_HOURS.CLOSE % 12 || 12}:00 PM</p>
          </div>

          <div className="closed-actions">
            <Link to="/cart" className="back-to-cart-btn">View Cart</Link>
            <Link to="/" className="browse-btn">Browse Products</Link>
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
            <h2>📦 Delivery Details</h2>

            {/* 📍 AREA SELECTION SECTION - REQUIRED */}
            <div className="area-selection-section">
              <div className="area-header">
                <span className="area-icon">📍</span>
                <span>Select Your Delivery Area *</span>
              </div>
              
              <div className="area-buttons-grid">
                {DELIVERY_AREAS.map((area) => (
                  <button
                    key={area}
                    type="button"
                    className={`area-select-btn ${selectedArea === area ? 'selected' : ''}`}
                    onClick={() => handleManualAreaSelect(area)}
                  >
                    {selectedArea === area && '✅ '}{area}
                  </button>
                ))}
              </div>

              {selectedArea && (
                <div className="selected-area-badge">
                  ✅ Delivery available in {selectedArea}!
                </div>
              )}
            </div>

            
            <form onSubmit={handleSubmit} className="checkout-form">
              
              {/* Show form fields only when area is selected */}
              {isDeliveryAvailable() ? (
                <>
                  {/* DELIVERY FORM FIELDS */}

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
                    <label>
                      House No. / Flat No. / Gali No. *
                    </label>
                    <input
                      type="text"
                      name="houseNo"
                      value={formData.houseNo}
                      onChange={handleChange}
                      placeholder="e.g., 71, Gali No. 3, Flat 201"
                      required
                      disabled={placing}
                    />
                  </div>

                  <div className="form-group">
                    <label>Landmark (Optional)</label>
                    <input
                      type="text"
                      name="landmark"
                      value={formData.landmark}
                      onChange={handleChange}
                      placeholder="e.g., Near Gaushala, Opposite School"
                      disabled={placing}
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Detected Area
                      <span className="auto-filled-badge">📍 Auto-filled</span>
                    </label>
                    <textarea
                      name="detectedArea"
                      value={formData.detectedArea}
                      onChange={handleChange}
                      placeholder="Auto-detected from your location"
                      rows="2"
                      disabled={placing}
                      className="detected-area-field"
                    />
                  </div>

                  {/* Full Address Preview */}
                  {(formData.houseNo || formData.detectedArea) && (
                    <div className="full-address-preview">
                      <label>📍 Full Delivery Address:</label>
                      <p>{getFullAddress()}</p>
                    </div>
                  )}

                  {/* PAYMENT METHOD - ONLY COD */}
                  <div className="payment-method-display">
                    <div className="cod-badge">
                      <span className="cod-icon">💵</span>
                      <div className="cod-text">
                        <strong>Payment Method:</strong> Cash on Delivery (COD)
                      </div>
                    </div>
                    <p className="cod-note">
                      💡 Pay cash when you receive your order
                    </p>
                  </div>

                  {/* DELIVERY BOY SCANNER MESSAGE */}
                  <div className="scanner-info-box">
                    <div className="scanner-icon">📱</div>
                    <div className="scanner-text">
                      <strong>📦 Quick Delivery:</strong>
                      <p>Order will be delivered within 40 minutes!</p>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className={`place-order-btn ${hasGift ? 'has-gift' : ''}`}
                    disabled={placing || !formData.houseNo || !formData.name || !formData.phone}
                  >
                    {placing ? (
                      '⏳ Placing Order...'
                    ) : !formData.name || !formData.phone ? (
                      '📝 Fill Name & Phone'
                    ) : !formData.houseNo ? (
                      '📝 Enter House No. / Address'
                    ) : (
                      `✅ Place Order - ₹${total.toFixed(0)} (COD) ${hasGift ? '🎁' : ''}`
                    )}
                  </button>
                </>
              ) : (
                <div className="select-area-message">
                  <div className="message-icon">👆</div>
                  <p>Please select your delivery area above to continue</p>
                </div>
              )}
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
              
              <div className="total-row">
                <span>Delivery Charges</span>
                {subtotal >= DELIVERY_THRESHOLD ? (
                  <span className="free">FREE</span>
                ) : (
                  <span className="delivery-charge">₹{DELIVERY_CHARGE}</span>
                )}
              </div>

              {subtotal < DELIVERY_THRESHOLD && subtotal > 0 && (
                <div className="free-delivery-hint">
                  🚚 Add ₹{remainingForFreeDelivery.toFixed(0)} more for FREE delivery!
                </div>
              )}
              
              <div className="total-row">
                <span>Tax (GST)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              
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

            {hasGift && (
              <div className="checkout-savings-badge">
                🎉 You're saving ₹{giftItem?.oldPrice || 149} with FREE gift!
              </div>
            )}

            <div className="delivery-info-checkout">
              <p>🚚 Delivery in 40 minutes</p>
              <p>📍 {getFullAddress()}</p>
              {selectedArea && <p>🏠 Area: {selectedArea}</p>}
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