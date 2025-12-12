// Backend/utils/smsService.js - Fast2SMS DLT Integration

const axios = require('axios');

// Fast2SMS Configuration
const FAST2SMS_API_KEY = 'RSeiNETOFhItqsawM2PAGVJCmKp7ULkQxljHbr4fB5Zd0cy8z3RQwqWFgIjlXNnr5Gsf8Ob6eB1KcEAC';
const FAST2SMS_URL = 'https://www.fast2sms.com/dev/bulkV2';

// DLT Template IDs (Airtel Approved)
const TEMPLATE_IDS = {
  OTP: '1007780450357762183',
  ORDER_CONFIRMATION: '1007854070808506182',
  ORDER_SHIPPED: '1007708186231786720',
  ORDER_DELIVERED: '1007497793945641498',
  PROMO_DISCOUNT: '1007907938828340845',
  PROMO_FESTIVAL: '1007593415253974241',
  PROMO_FREE_DELIVERY: '1007503885372031318',
  PROMO_MYSTERY_GIFT: '1007137882541903598'
};

// Sender IDs
const SENDER_ID = {
  SERVICE: 'JGATST',      // For OTP, Order updates
  PROMO: '599106'         // For Promotional SMS
};

/**
 * Send SMS via Fast2SMS DLT Route
 */
const sendSMS = async (phone, message, templateId, senderId = SENDER_ID.SERVICE) => {
  try {
    // Clean phone number (remove +91, spaces, etc.)
    const cleanPhone = phone.toString().replace(/\D/g, '').slice(-10);
    
    if (cleanPhone.length !== 10) {
      throw new Error('Invalid phone number');
    }

    const response = await axios.post(FAST2SMS_URL, {
      route: 'dlt',
      sender_id: senderId,
      template_id: templateId,
      message: message,
      numbers: cleanPhone,
      flash: 0
    }, {
      headers: {
        'authorization': FAST2SMS_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    console.log('📱 SMS Response:', response.data);
    
    return {
      success: response.data.return === true,
      messageId: response.data.request_id,
      data: response.data
    };
    
  } catch (error) {
    console.error('❌ SMS Error:', error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

/**
 * Send OTP SMS
 */
const sendOTP = async (phone, otp) => {
  const message = `Dear Customer, Your OTP for JAGAT STORE is ${otp}. Valid for 10 minutes. Do not share with anyone. - JAGAT STORE`;
  return await sendSMS(phone, message, TEMPLATE_IDS.OTP, SENDER_ID.SERVICE);
};

/**
 * Send Order Confirmation SMS
 */
const sendOrderConfirmation = async (phone, customerName, orderId, amount) => {
  const message = `Dear ${customerName}, Your order ${orderId} is confirmed at JAGAT STORE. Amount: Rs.${amount}. Thank you for shopping! - JAGAT STORE`;
  return await sendSMS(phone, message, TEMPLATE_IDS.ORDER_CONFIRMATION, SENDER_ID.SERVICE);
};

/**
 * Send Order Shipped SMS
 */
const sendOrderShipped = async (phone, orderId, deliveryDate) => {
  const message = `Dear Customer, Your order ${orderId} has been shipped from JAGAT STORE. Expected delivery: ${deliveryDate}. Thank you! - JAGAT STORE`;
  return await sendSMS(phone, message, TEMPLATE_IDS.ORDER_SHIPPED, SENDER_ID.SERVICE);
};

/**
 * Send Order Delivered SMS
 */
const sendOrderDelivered = async (phone, orderId) => {
  const message = `Dear Customer, Your order ${orderId} from JAGAT STORE has been delivered. Thank you for shopping with us! - JAGAT STORE`;
  return await sendSMS(phone, message, TEMPLATE_IDS.ORDER_DELIVERED, SENDER_ID.SERVICE);
};

/**
 * Send Promotional SMS - Mystery Gift
 */
const sendPromoMysteryGift = async (phone, minAmount = '999') => {
  const message = `JAGAT STORE: Order above Rs.${minAmount} and get a FREE Mystery Gift! Shop now at jagatstore.in Hurry, limited stock! - JAGAT STORE`;
  return await sendSMS(phone, message, TEMPLATE_IDS.PROMO_MYSTERY_GIFT, SENDER_ID.PROMO);
};

/**
 * Send Promotional SMS - Discount
 */
const sendPromoDiscount = async (phone, discountPercent, couponCode) => {
  const message = `JAGAT STORE: Get ${discountPercent} percent OFF on all products! Shop now at jagatstore.in Use code: ${couponCode} - JAGAT STORE`;
  return await sendSMS(phone, message, TEMPLATE_IDS.PROMO_DISCOUNT, SENDER_ID.PROMO);
};

/**
 * Send Promotional SMS - Festival Sale
 */
const sendPromoFestival = async (phone, festivalName, discountPercent) => {
  const message = `JAGAT STORE: ${festivalName} Sale is LIVE! Upto ${discountPercent} percent OFF on all items. Shop at jagatstore.in - JAGAT STORE`;
  return await sendSMS(phone, message, TEMPLATE_IDS.PROMO_FESTIVAL, SENDER_ID.PROMO);
};

/**
 * Send Promotional SMS - Free Delivery
 */
const sendPromoFreeDelivery = async (phone, minAmount) => {
  const message = `JAGAT STORE: FREE Delivery on orders above Rs.${minAmount}! Shop groceries at jagatstore.in Order now! - JAGAT STORE`;
  return await sendSMS(phone, message, TEMPLATE_IDS.PROMO_FREE_DELIVERY, SENDER_ID.PROMO);
};

/**
 * Send Bulk Promotional SMS
 */
const sendBulkPromoSMS = async (phones, message, templateId) => {
  const results = {
    success: 0,
    failed: 0,
    errors: []
  };

  // Send in batches of 10 to avoid rate limiting
  const batchSize = 10;
  for (let i = 0; i < phones.length; i += batchSize) {
    const batch = phones.slice(i, i + batchSize);
    
    const promises = batch.map(async (phone) => {
      const result = await sendSMS(phone, message, templateId, SENDER_ID.PROMO);
      if (result.success) {
        results.success++;
      } else {
        results.failed++;
        results.errors.push({ phone, error: result.error });
      }
    });

    await Promise.all(promises);
    
    // Small delay between batches
    if (i + batchSize < phones.length) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  return results;
};

/**
 * Generate 6 digit OTP
 */
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

module.exports = {
  sendSMS,
  sendOTP,
  sendOrderConfirmation,
  sendOrderShipped,
  sendOrderDelivered,
  sendPromoMysteryGift,
  sendPromoDiscount,
  sendPromoFestival,
  sendPromoFreeDelivery,
  sendBulkPromoSMS,
  generateOTP,
  TEMPLATE_IDS,
  SENDER_ID
};