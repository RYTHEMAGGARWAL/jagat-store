// ================================================
// 📱 WHATSAPP UTILITY FUNCTIONS
// ================================================

// WhatsApp Number (without + sign)
export const WHATSAPP_NUMBER = '919599633093';

// Base WhatsApp URL
const WA_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

/**
 * 🛒 Generate WhatsApp message for cart order
 * @param {Array} cartItems - Array of cart items
 * @param {number} subtotal - Cart subtotal
 * @param {number} deliveryFee - Delivery fee
 * @param {number} total - Total amount
 * @param {boolean} hasGift - Whether order has gift
 * @returns {string} WhatsApp URL with encoded message
 */
export const generateCartOrderMessage = (cartItems, subtotal, deliveryFee, total, hasGift = false) => {
  let message = `🛒 *New Order Request - Jagat Store*\n\n`;
  message += `Hi! I want to place an order:\n\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  
  cartItems.forEach((item, index) => {
    const itemTotal = item.product.price * item.quantity;
    message += `${index + 1}. *${item.product.name}*\n`;
    message += `   ₹${item.product.price} × ${item.quantity} = ₹${itemTotal}\n`;
  });
  
  if (hasGift) {
    message += `\n🎁 *FREE Gift - Ice Cream Pack*\n`;
  }
  
  message += `━━━━━━━━━━━━━━━━━━━━━\n\n`;
  message += `📦 Subtotal: ₹${subtotal.toFixed(2)}\n`;
  message += `🚚 Delivery: ${deliveryFee === 0 ? 'FREE' : '₹' + deliveryFee}\n`;
  message += `💰 *Total: ₹${total.toFixed(2)}*\n\n`;
  message += `Please confirm availability! 🙏`;
  
  return `${WA_URL}?text=${encodeURIComponent(message)}`;
};

/**
 * 📦 Generate WhatsApp message for order confirmation share
 * @param {Object} orderDetails - Order details object
 * @returns {string} WhatsApp URL with encoded message
 */
export const generateOrderShareMessage = (orderDetails) => {
  const { orderId, totalAmount, items, hasGift, deliveryAddress } = orderDetails;
  
  let message = `✅ *Order Placed Successfully!*\n\n`;
  message += `🏪 *Jagat Store*\n\n`;
  message += `📋 Order ID: #${orderId?.slice(-8) || 'N/A'}\n`;
  message += `📦 Items: ${items} items${hasGift ? ' + 1 Gift 🎁' : ''}\n`;
  message += `💰 Total: ₹${totalAmount?.toFixed(2) || '0.00'}\n`;
  message += `📍 Delivery: ${deliveryAddress || 'N/A'}\n`;
  message += `🚚 Arriving in 40 minutes!\n\n`;
  message += `Order from Jagat Store for quick delivery! 🛒`;
  
  return `${WA_URL}?text=${encodeURIComponent(message)}`;
};

/**
 * 📤 Generate WhatsApp message for product share
 * @param {Object} product - Product object
 * @returns {string} WhatsApp URL with encoded message
 */
export const generateProductShareMessage = (product) => {
  let message = `Check out this product from *Jagat Store*! 🛒\n\n`;
  message += `*${product.name}*\n`;
  if (product.brand) message += `Brand: ${product.brand}\n`;
  if (product.weight) message += `Size: ${product.weight}\n`;
  message += `💰 Price: ₹${product.price}\n`;
  if (product.oldPrice && product.oldPrice > product.price) {
    const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
    message += `🏷️ ${discount}% OFF (was ₹${product.oldPrice})\n`;
  }
  message += `\n🚚 Fast delivery in 40 minutes!`;
  
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
};

/**
 * 💬 Generate WhatsApp link for general inquiry
 * @param {string} customMessage - Optional custom message
 * @returns {string} WhatsApp URL
 */
export const generateInquiryLink = (customMessage = '') => {
  const message = customMessage || `Hi! 👋 I have a question about Jagat Store.`;
  return `${WA_URL}?text=${encodeURIComponent(message)}`;
};

/**
 * 🆘 Generate WhatsApp link for support
 * @param {string} orderId - Order ID for support
 * @returns {string} WhatsApp URL
 */
export const generateSupportLink = (orderId = '') => {
  let message = `🆘 *Need Help - Jagat Store*\n\n`;
  if (orderId) {
    message += `Order ID: #${orderId}\n\n`;
  }
  message += `I need assistance with my order.`;
  
  return `${WA_URL}?text=${encodeURIComponent(message)}`;
};

/**
 * 📱 Open WhatsApp link
 * @param {string} url - WhatsApp URL
 */
export const openWhatsApp = (url) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};