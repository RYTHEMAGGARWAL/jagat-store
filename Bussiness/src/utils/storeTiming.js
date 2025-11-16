// utils/storeTiming.js - Store Hours Management

export const STORE_HOURS = {
  OPEN: 10,  // 10 AM
  CLOSE: 20  // 8 PM (20:00 in 24hr format)
};

// Check if store is currently open
export const isStoreOpen = () => {
  const now = new Date();
  const currentHour = now.getHours();
  
  return currentHour >= STORE_HOURS.OPEN && currentHour < STORE_HOURS.CLOSE;
};

// Get store status message
export const getStoreStatusMessage = () => {
  const now = new Date();
  const currentHour = now.getHours();
  
  if (currentHour < STORE_HOURS.OPEN) {
    return {
      isOpen: false,
      message: `Store opens at ${STORE_HOURS.OPEN}:00 AM`,
      nextAction: `Come back at ${STORE_HOURS.OPEN}:00 AM to place your order!`
    };
  } else if (currentHour >= STORE_HOURS.CLOSE) {
    return {
      isOpen: false,
      message: `Store is closed for today`,
      nextAction: `We open tomorrow at ${STORE_HOURS.OPEN}:00 AM. See you then!`
    };
  } else {
    const minutesUntilClose = (STORE_HOURS.CLOSE - currentHour - 1) * 60 + (60 - now.getMinutes());
    return {
      isOpen: true,
      message: `Store is open`,
      nextAction: `Closes at ${STORE_HOURS.CLOSE % 12 || 12}:00 ${STORE_HOURS.CLOSE >= 12 ? 'PM' : 'AM'}`,
      minutesUntilClose
    };
  }
};

// Get time remaining text
export const getTimeUntilOpen = () => {
  const now = new Date();
  const currentHour = now.getHours();
  
  if (currentHour < STORE_HOURS.OPEN) {
    const hoursUntilOpen = STORE_HOURS.OPEN - currentHour;
    return `Opens in ${hoursUntilOpen} hour${hoursUntilOpen > 1 ? 's' : ''}`;
  } else if (currentHour >= STORE_HOURS.CLOSE) {
    const hoursUntilOpen = 24 - currentHour + STORE_HOURS.OPEN;
    return `Opens in ${hoursUntilOpen} hours`;
  }
  
  return '';
};