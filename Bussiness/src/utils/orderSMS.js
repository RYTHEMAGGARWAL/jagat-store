// Backend/utils/orderSMS.js - Order Status SMS Integration

const { 
  sendOrderConfirmation, 
  sendOrderShipped, 
  sendOrderDelivered,
  sendOTP,
  generateOTP
} = require('./smsService');

/**
 * Send SMS when order is placed
 */
const onOrderPlaced = async (order) => {
  try {
    const phone = order.shippingAddress?.phone || order.user?.phone;
    const customerName = order.shippingAddress?.name || order.user?.name || 'Customer';
    const orderId = order._id.toString().slice(-8).toUpperCase();
    const amount = order.totalPrice;

    if (!phone) {
      console.log('⚠️ No phone number for order:', orderId);
      return { success: false, error: 'No phone number' };
    }

    console.log(`📱 Sending Order Confirmation SMS to ${phone}`);
    const result = await sendOrderConfirmation(phone, customerName, orderId, amount);
    
    if (result.success) {
      console.log(`✅ Order confirmation SMS sent for order ${orderId}`);
    } else {
      console.log(`❌ Failed to send SMS for order ${orderId}:`, result.error);
    }

    return result;
  } catch (error) {
    console.error('Order SMS Error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Send SMS when order is shipped
 */
const onOrderShipped = async (order, estimatedDelivery) => {
  try {
    const phone = order.shippingAddress?.phone || order.user?.phone;
    const orderId = order._id.toString().slice(-8).toUpperCase();
    
    // Format delivery date
    const deliveryDate = estimatedDelivery || getEstimatedDeliveryDate();

    if (!phone) {
      console.log('⚠️ No phone number for order:', orderId);
      return { success: false, error: 'No phone number' };
    }

    console.log(`📱 Sending Order Shipped SMS to ${phone}`);
    const result = await sendOrderShipped(phone, orderId, deliveryDate);
    
    if (result.success) {
      console.log(`✅ Shipped SMS sent for order ${orderId}`);
    } else {
      console.log(`❌ Failed to send shipped SMS for order ${orderId}:`, result.error);
    }

    return result;
  } catch (error) {
    console.error('Shipped SMS Error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Send SMS when order is delivered
 */
const onOrderDelivered = async (order) => {
  try {
    const phone = order.shippingAddress?.phone || order.user?.phone;
    const orderId = order._id.toString().slice(-8).toUpperCase();

    if (!phone) {
      console.log('⚠️ No phone number for order:', orderId);
      return { success: false, error: 'No phone number' };
    }

    console.log(`📱 Sending Order Delivered SMS to ${phone}`);
    const result = await sendOrderDelivered(phone, orderId);
    
    if (result.success) {
      console.log(`✅ Delivered SMS sent for order ${orderId}`);
    } else {
      console.log(`❌ Failed to send delivered SMS for order ${orderId}:`, result.error);
    }

    return result;
  } catch (error) {
    console.error('Delivered SMS Error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Send OTP for phone verification
 */
const sendPhoneOTP = async (phone) => {
  try {
    const otp = generateOTP();
    
    console.log(`📱 Sending OTP to ${phone}: ${otp}`);
    const result = await sendOTP(phone, otp);
    
    if (result.success) {
      console.log(`✅ OTP sent successfully`);
      return { success: true, otp };
    } else {
      console.log(`❌ Failed to send OTP:`, result.error);
      return { success: false, error: result.error };
    }
  } catch (error) {
    console.error('OTP SMS Error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get estimated delivery date (Today + 1-2 days)
 */
const getEstimatedDeliveryDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1); // Next day delivery
  
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-IN', options);
};

/**
 * Handle order status change - Main function to call
 */
const handleOrderStatusChange = async (order, newStatus, oldStatus) => {
  try {
    console.log(`📦 Order ${order._id} status changed: ${oldStatus} → ${newStatus}`);

    switch (newStatus) {
      case 'Confirmed':
        // Send confirmation when order is confirmed
        if (oldStatus === 'Processing') {
          return await onOrderPlaced(order);
        }
        break;

      case 'Shipped':
        return await onOrderShipped(order);

      case 'Delivered':
        return await onOrderDelivered(order);

      default:
        console.log(`ℹ️ No SMS for status: ${newStatus}`);
        return { success: true, message: 'No SMS needed for this status' };
    }
  } catch (error) {
    console.error('Status Change SMS Error:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  onOrderPlaced,
  onOrderShipped,
  onOrderDelivered,
  sendPhoneOTP,
  handleOrderStatusChange,
  generateOTP
};