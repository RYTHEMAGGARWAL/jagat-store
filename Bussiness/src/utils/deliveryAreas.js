// utils/deliveryAreas.js - Delivery Area Management

// ✅ ALLOWED DELIVERY AREAS (4km radius from Jagat Store)
export const ALLOWED_DELIVERY_AREAS = [
  'Pratap Vihar',
  'Siddharth Vihar',
  'Brahmaputra',
  'Vijay Nagar',
  'Hindon Vihar',
  'Pratap Vihar Sec-11',
  'Pratap Vihar Sector 11',
  'Siddharth Vihar Sector',
  'Brahmaputra Apartment',
  'Vijay Nagar Ghaziabad',
  'Hindon Vihar Ghaziabad'
];

// Check if address is in allowed delivery area
export const isDeliveryAvailable = (address) => {
  if (!address || typeof address !== 'string') {
    return false;
  }

  const addressLower = address.toLowerCase();
  
  return ALLOWED_DELIVERY_AREAS.some(area => 
    addressLower.includes(area.toLowerCase())
  );
};

// Get delivery area message
export const getDeliveryMessage = (address) => {
  if (isDeliveryAvailable(address)) {
    return {
      available: true,
      message: '✅ Delivery available in your area!',
      color: '#54b226'
    };
  }
  
  return {
    available: false,
    message: '❌ Sorry! We currently deliver only within 4km radius (Pratap Vihar, Siddharth Vihar, Brahmaputra, Vijay Nagar, Hindon Vihar)',
    color: '#dc3545'
  };
};

// Format delivery areas for display
export const getDeliveryAreasText = () => {
  return ALLOWED_DELIVERY_AREAS.slice(0, 5).join(', ');
};

// Check distance-based delivery (if you have coordinates)
export const checkDeliveryByDistance = (userLat, userLng) => {
  // Jagat Store coordinates (update with exact coordinates)
  const STORE_LAT = 28.647065;
  const STORE_LNG = 77.407080;
  const MAX_DISTANCE_KM = 4;

  // Haversine formula to calculate distance
  const toRad = (value) => (value * Math.PI) / 180;
  
  const R = 6371; // Earth's radius in km
  const dLat = toRad(userLat - STORE_LAT);
  const dLng = toRad(userLng - STORE_LNG);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(STORE_LAT)) * Math.cos(toRad(userLat)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return {
    distance: distance.toFixed(2),
    isWithinRange: distance <= MAX_DISTANCE_KM,
    message: distance <= MAX_DISTANCE_KM 
      ? `✅ You're ${distance.toFixed(1)}km away. Delivery available!`
      : `❌ You're ${distance.toFixed(1)}km away. We deliver up to ${MAX_DISTANCE_KM}km only.`
  };
};