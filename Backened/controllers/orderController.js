console.log('📧📱 ORDERCONTROLLER - MOBILE OPTIMIZED EMAILS!');

const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const User = require('../models/User');

const GIFT_THRESHOLD = 999;
const GIFT_PRODUCT = {
  name: '🎁 FREE Gift', brand: 'Jagat Store', category: 'Gift',
  price: 0, oldPrice: 149, quantity: 1, weight: '500ml',
  image: 'https://m.media-amazon.com/images/I/81nRsEQCprL._SL1500_.jpg', isGift: true
};

const FAST2SMS = {
  OTP: '205107',
  ORDER_SHIPPED: '205108',
  ORDER_CONFIRMATION: '205109',
  ORDER_DELIVERED: '205110',
  WELCOME: '205126',
  ORDER_CANCELLED: '205127',
  FEEDBACK: '205128'
};

const SENDER_ID = 'JGATST';

async function sendEmail(to, subject, html) {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: 'Jagat Store <orders@jagatstore.in>', to, subject, html })
    });
    const data = await response.json();
    if (response.ok) { console.log('✅ Email sent to:', to); return true; }
    console.error('❌ Resend error:', data); return false;
  } catch (error) { console.error('❌ Email failed:', error.message); return false; }
}

async function sendFast2SMS(phone, messageId, variablesValues = null, senderId = 'JGATST') {
  try {
    const cleanPhone = phone.toString().replace(/\D/g, '').slice(-10);
    if (cleanPhone.length !== 10) { console.log('⚠️ Invalid phone:', phone); return false; }

    console.log('📱 Sending SMS:');
    console.log('   Phone:', cleanPhone);
    console.log('   Message ID:', messageId);
    console.log('   Variables:', variablesValues);
    
    const body = { route: 'dlt', sender_id: senderId, message: messageId, numbers: cleanPhone, flash: 0 };
    if (variablesValues) body.variables_values = variablesValues;
    
    const response = await fetch('https://www.fast2sms.com/dev/bulkV2', {
      method: 'POST',
      headers: { 'authorization': process.env.FAST2SMS_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    
    const data = await response.json();
    console.log('📱 Fast2SMS Response:', JSON.stringify(data));
    
    if (data.return === true) { console.log('✅ SMS sent to:', cleanPhone); return true; }
    console.log('❌ SMS failed:', data.message); return false;
  } catch (error) { console.error('❌ SMS error:', error.message); return false; }
}

function getExpectedDelivery() {
  const date = new Date(); date.setDate(date.getDate() + 1);
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

// ========================================
// 🎨 BEAUTIFUL MOBILE-OPTIMIZED ADMIN EMAIL
// ========================================
function getAdminEmailHTML(order, user, shortId, totalPrice) {
  const customerName = user?.name || order.shippingAddress?.name || 'N/A';
  const customerPhone = order.shippingAddress?.phone || user?.phone || 'N/A';
  const customerEmail = user?.email || 'N/A';
  
  const itemsHTML = order.orderItems?.map((item, i) => `
    <div class="order-item">
      <div class="item-image">
        <img src="${item.image || 'https://via.placeholder.com/100'}" alt="${item.name}">
      </div>
      <div class="item-details">
        <div class="item-name">${item.name}</div>
        <div class="item-meta">${item.brand || ''} ${item.weight ? '| ' + item.weight : ''}</div>
        <div class="item-price-mobile">
          <span>Qty: ${item.quantity}</span>
          <span class="price">₹${item.price * item.quantity}</span>
        </div>
      </div>
    </div>
  `).join('') || '';

  const giftBadge = order.hasGift ? `
    <div style="background:linear-gradient(135deg,#ffd700,#ffed4e);padding:15px;margin:20px 0;border-radius:10px;text-align:center;">
      <div style="font-size:28px;margin-bottom:8px;">🎁</div>
      <div style="font-weight:bold;color:#333;font-size:16px;">FREE GIFT INCLUDED!</div>
      <div style="color:#666;font-size:14px;margin-top:4px;">Saved ₹${order.giftSavings || 149}</div>
    </div>
  ` : '';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <style>
    body { margin:0; padding:0; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; background:#f5f5f5; }
    .container { max-width:600px; margin:0 auto; background:#fff; }
    .header { background:linear-gradient(135deg,#667eea,#764ba2); color:#fff; padding:30px 20px; text-align:center; }
    .header h1 { margin:0; font-size:28px; }
    .header p { margin:10px 0 0; opacity:0.9; font-size:16px; }
    .summary-box { background:#f8f9fa; border-left:4px solid #667eea; padding:20px; margin:20px; border-radius:8px; }
    .summary-grid { display:flex; gap:20px; flex-wrap:wrap; }
    .summary-item { flex:1; min-width:120px; }
    .summary-label { color:#666; font-size:12px; margin-bottom:5px; }
    .summary-value { font-size:24px; font-weight:bold; color:#667eea; }
    .section { padding:0 20px 20px; }
    .section-title { color:#333; border-bottom:2px solid #667eea; padding-bottom:10px; margin:20px 0 15px; font-size:18px; font-weight:bold; }
    .info-row { padding:10px 0; border-bottom:1px solid #eee; display:flex; }
    .info-label { color:#666; width:100px; flex-shrink:0; }
    .info-value { font-weight:500; color:#333; flex:1; }
    .order-item { display:flex; gap:15px; padding:15px; background:#fff; border:1px solid #eee; border-radius:8px; margin-bottom:10px; }
    .item-image { flex-shrink:0; }
    .item-image img { width:80px; height:80px; object-fit:cover; border-radius:8px; border:1px solid #eee; }
    .item-details { flex:1; }
    .item-name { font-weight:bold; color:#333; font-size:15px; margin-bottom:4px; }
    .item-meta { color:#999; font-size:13px; margin-bottom:8px; }
    .item-price-mobile { display:flex; justify-content:space-between; align-items:center; }
    .price { font-weight:bold; color:#667eea; font-size:16px; }
    .total-box { background:linear-gradient(135deg,#667eea22,#764ba222); padding:20px; border-radius:10px; margin-top:15px; text-align:right; }
    .total-label { color:#666; font-size:14px; margin-bottom:5px; }
    .total-amount { font-size:32px; font-weight:bold; color:#667eea; }
    .button { display:inline-block; padding:15px 30px; background:#667eea; color:#fff; text-decoration:none; border-radius:8px; font-weight:bold; margin:10px 0; }
    .footer { background:#2c3e50; color:#fff; padding:25px; text-align:center; }
    .footer-title { font-size:20px; font-weight:bold; margin:0; }
    .footer-subtitle { opacity:0.8; font-size:14px; margin:10px 0 0; }
    .footer-contact { opacity:0.6; font-size:12px; margin:10px 0 0; }
    
    @media only screen and (max-width:600px) {
      .header h1 { font-size:24px !important; }
      .summary-grid { flex-direction:column; gap:15px; }
      .summary-value { font-size:28px !important; }
      .section { padding:0 15px 15px !important; }
      .item-image img { width:70px !important; height:70px !important; }
      .item-name { font-size:14px !important; }
      .total-amount { font-size:28px !important; }
      .button { padding:12px 25px !important; font-size:14px !important; }
    }
  </style>
</head>
<body>
  <div class="container">
    
    <div class="header">
      <h1>🛒 NEW ORDER!</h1>
      <p>Order #${shortId}</p>
    </div>

    <div class="summary-box">
      <div class="summary-grid">
        <div class="summary-item">
          <div class="summary-label">TOTAL AMOUNT</div>
          <div class="summary-value">₹${totalPrice}</div>
        </div>
        <div class="summary-item">
          <div class="summary-label">PAYMENT</div>
          <div class="summary-value" style="font-size:18px;">${order.paymentInfo?.method || 'COD'}</div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">👤 Customer Details</div>
      <div class="info-row">
        <div class="info-label">Name:</div>
        <div class="info-value">${customerName}</div>
      </div>
      <div class="info-row">
        <div class="info-label">Phone:</div>
        <div class="info-value">${customerPhone}</div>
      </div>
      <div class="info-row">
        <div class="info-label">Email:</div>
        <div class="info-value">${customerEmail}</div>
      </div>
      <div class="info-row" style="border:none;">
        <div class="info-label">Address:</div>
        <div class="info-value">
          ${order.shippingAddress?.fullAddress || 'N/A'}<br>
          ${order.shippingAddress?.city || ''}, ${order.shippingAddress?.state || ''} ${order.shippingAddress?.pincode || ''}
        </div>
      </div>
    </div>

    ${giftBadge}

    <div class="section">
      <div class="section-title">📦 Order Items</div>
      ${itemsHTML}
      
      <div class="total-box">
        <div class="total-label">GRAND TOTAL</div>
        <div class="total-amount">₹${totalPrice}</div>
      </div>
    </div>

    <div class="section" style="text-align:center;">
      <a href="${process.env.FRONTEND_URL || 'https://www.jagatstore.in'}/admin/orders" class="button">
        📋 View in Dashboard
      </a>
    </div>

    <div class="footer">
      <div class="footer-title">🛒 JAGAT STORE</div>
      <div class="footer-subtitle">Admin Order Notification</div>
      <div class="footer-contact">📞 +91 9599633093 | 📧 orders@jagatstore.in</div>
    </div>

  </div>
</body>
</html>
  `;
}

// ========================================
// 🎨 BEAUTIFUL MOBILE-OPTIMIZED CUSTOMER EMAIL
// ========================================
function getCustomerEmailHTML(order, user, shortId, totalPrice) {
  const customerName = user?.name?.split(' ')[0] || order.shippingAddress?.name?.split(' ')[0] || 'Customer';
  const trackingUrl = `${process.env.FRONTEND_URL || 'https://www.jagatstore.in'}/orders/${order._id}`;
  
  const itemsHTML = order.orderItems?.map((item, i) => `
    <div class="order-item">
      <div class="item-image">
        <img src="${item.image || 'https://via.placeholder.com/100'}" alt="${item.name}">
      </div>
      <div class="item-details">
        <div class="item-name">${item.name}</div>
        <div class="item-meta">${item.weight || ''}</div>
        <div class="item-price-row">
          <span class="qty">Qty: ${item.quantity}</span>
          <span class="amount">₹${item.price * item.quantity}</span>
        </div>
      </div>
    </div>
  `).join('') || '';

  const giftBadge = order.hasGift ? `
    <div style="background:linear-gradient(135deg,#ffd700,#ffed4e);padding:20px;margin:20px;border-radius:12px;text-align:center;box-shadow:0 2px 8px rgba(255,215,0,0.3);">
      <div style="font-size:32px;margin-bottom:10px;">🎁</div>
      <div style="font-weight:bold;color:#333;font-size:18px;">FREE GIFT INCLUDED!</div>
      <div style="color:#666;font-size:15px;margin-top:6px;">You saved ₹${order.giftSavings || 149}!</div>
    </div>
  ` : '';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <style>
    body { margin:0; padding:0; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; background:#f5f5f5; }
    .container { max-width:600px; margin:0 auto; background:#fff; }
    .header { background:linear-gradient(135deg,#11998e,#38ef7d); color:#fff; padding:40px 20px; text-align:center; }
    .header h1 { margin:0; font-size:32px; }
    .header p { margin:15px 0 0; opacity:0.9; font-size:16px; }
    .order-badge { background:rgba(255,255,255,0.2); padding:15px; border-radius:10px; margin-top:20px; }
    .order-badge-label { font-size:14px; opacity:0.9; margin:0; }
    .order-badge-number { font-size:24px; font-weight:bold; margin:5px 0 0; }
    .greeting { padding:30px 20px; text-align:center; background:#fff; }
    .greeting-text { font-size:18px; color:#333; margin:0; }
    .greeting-name { font-weight:bold; }
    .greeting-message { font-size:16px; color:#666; margin:15px 0 0; line-height:1.6; }
    .section { padding:0 20px 20px; }
    .section-title { color:#333; border-bottom:2px solid #11998e; padding-bottom:10px; margin:20px 0 15px; font-size:18px; font-weight:bold; }
    .order-item { display:flex; gap:15px; padding:15px; background:#fff; border:1px solid #eee; border-radius:10px; margin-bottom:12px; box-shadow:0 1px 3px rgba(0,0,0,0.05); }
    .item-image { flex-shrink:0; }
    .item-image img { width:90px; height:90px; object-fit:cover; border-radius:10px; border:1px solid #eee; }
    .item-details { flex:1; display:flex; flex-direction:column; justify-content:space-between; }
    .item-name { font-weight:bold; color:#333; font-size:15px; line-height:1.4; }
    .item-meta { color:#999; font-size:13px; margin:4px 0; }
    .item-price-row { display:flex; justify-content:space-between; align-items:center; margin-top:8px; }
    .qty { color:#666; font-size:14px; }
    .amount { font-weight:bold; color:#11998e; font-size:17px; }
    .total-box { background:linear-gradient(135deg,#11998e22,#38ef7d22); padding:25px; border-radius:12px; margin-top:15px; text-align:center; }
    .total-label { color:#666; font-size:14px; margin-bottom:8px; }
    .total-amount { font-size:36px; font-weight:bold; color:#11998e; margin:5px 0; }
    .total-payment { color:#666; font-size:14px; margin-top:5px; }
    .address-box { background:#f8f9fa; padding:20px; border-radius:10px; margin-top:15px; }
    .address-name { font-weight:bold; color:#333; font-size:16px; margin-bottom:10px; }
    .address-text { color:#666; line-height:1.8; font-size:14px; }
    .delivery-box { background:#fff3cd; border-left:4px solid #ffc107; padding:15px; border-radius:6px; margin:20px; text-align:center; }
    .delivery-text { color:#856404; font-weight:500; font-size:15px; margin:0; }
    .button { display:inline-block; padding:16px 35px; background:#11998e; color:#fff; text-decoration:none; border-radius:10px; font-weight:bold; font-size:16px; margin:10px 0; box-shadow:0 4px 12px rgba(17,153,142,0.3); }
    .help-box { background:#f8f9fa; padding:20px; border-radius:10px; margin:20px; text-align:center; }
    .help-title { color:#666; font-size:14px; margin:0 0 12px; }
    .help-link { color:#11998e; text-decoration:none; font-weight:bold; margin:0 10px; }
    .footer { background:#2c3e50; color:#fff; padding:30px 20px; text-align:center; }
    .footer-title { font-size:22px; font-weight:bold; margin:0; }
    .footer-subtitle { opacity:0.8; font-size:14px; margin:10px 0; }
    .footer-message { opacity:0.6; font-size:13px; margin:15px 0 0; line-height:1.6; }
    
    @media only screen and (max-width:600px) {
      .header h1 { font-size:26px !important; }
      .order-badge-number { font-size:20px !important; }
      .greeting-text { font-size:16px !important; }
      .greeting-message { font-size:14px !important; }
      .item-image img { width:75px !important; height:75px !important; }
      .item-name { font-size:14px !important; }
      .amount { font-size:16px !important; }
      .total-amount { font-size:32px !important; }
      .button { padding:14px 28px !important; font-size:15px !important; }
      .section { padding:0 15px 15px !important; }
    }
  </style>
</head>
<body>
  <div class="container">
    
    <div class="header">
      <h1>✅ Order Confirmed!</h1>
      <p>Thank you for shopping with us!</p>
      <div class="order-badge">
        <p class="order-badge-label">Order Number</p>
        <p class="order-badge-number">#${shortId}</p>
      </div>
    </div>

    <div class="greeting">
      <p class="greeting-text">Hi <span class="greeting-name">${customerName}</span>! 👋</p>
      <p class="greeting-message">Great news! Your order has been confirmed and will be delivered soon.</p>
    </div>

    ${giftBadge}

    <div class="section">
      <div class="section-title">📦 Your Order</div>
      ${itemsHTML}
      
      <div class="total-box">
        <div class="total-label">Total Amount</div>
        <div class="total-amount">₹${totalPrice}</div>
        <div class="total-payment">Payment: ${order.paymentInfo?.method || 'Cash on Delivery'}</div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">📍 Delivery Address</div>
      <div class="address-box">
        <div class="address-name">${order.shippingAddress?.name || customerName}</div>
        <div class="address-text">
          ${order.shippingAddress?.fullAddress || ''}<br>
          ${order.shippingAddress?.city || ''}, ${order.shippingAddress?.state || ''} - ${order.shippingAddress?.pincode || ''}<br>
          📞 ${order.shippingAddress?.phone || ''}
        </div>
      </div>
    </div>

    <div class="delivery-box">
      <p class="delivery-text">⏰ Expected Delivery: ${getExpectedDelivery()}</p>
    </div>

    <div class="section" style="text-align:center;">
      <a href="${trackingUrl}" class="button">📍 Track Your Order</a>
    </div>

    <div class="help-box">
      <p class="help-title">Need help with your order?</p>
      <a href="tel:+919599633093" class="help-link">📞 Call Us</a>
      <span style="color:#ccc;">|</span>
      <a href="mailto:orders@jagatstore.in" class="help-link">📧 Email Us</a>
    </div>

    <div class="footer">
      <div class="footer-title">🛒 JAGAT STORE</div>
      <div class="footer-subtitle">Your Trusted Grocery Partner</div>
      <div class="footer-message">Thank you for choosing Jagat Store!<br>We appreciate your business 💚</div>
    </div>

  </div>
</body>
</html>
  `;
}

function getStatusEmailTemplate(order, status, user) {
  const shortId = order._id.toString().slice(-8).toUpperCase();
  const customerName = user?.name?.split(' ')[0] || order.shippingAddress?.name?.split(' ')[0] || 'Customer';
  const trackingUrl = `${process.env.FRONTEND_URL || 'https://www.jagatstore.in'}/orders/${order._id}`;
  
  const templates = {
    'Confirmed': { subject: `✅ Order Confirmed #${shortId} | Jagat Store`, emoji: '✅', title: 'Order Confirmed!', message: `Great news, ${customerName}! Your order has been confirmed.`, color: '#2196f3', nextStep: 'Your order will be shipped soon!' },
    'Shipped': { subject: `🚢 Order Shipped #${shortId}`, emoji: '🚢', title: 'Order Shipped!', message: `Hey ${customerName}! Your order is on its way!`, color: '#9c27b0', nextStep: 'Expected delivery in 1-2 days.' },
    'Out for Delivery': { subject: `🚚 Out for Delivery #${shortId}`, emoji: '🚚', title: 'Out for Delivery!', message: `${customerName}, your order arrives TODAY!`, color: '#00bcd4', nextStep: 'Keep your phone handy!' },
    'Delivered': { subject: `✓ Delivered #${shortId}`, emoji: '✓', title: 'Delivered!', message: `${customerName}, your order has been delivered!`, color: '#4caf50', nextStep: 'Thank you for shopping! 💚' },
    'Cancelled': { subject: `❌ Cancelled #${shortId}`, emoji: '❌', title: 'Order Cancelled', message: `${customerName}, your order was cancelled.`, color: '#f44336', nextStep: 'Refund will be processed in 5-7 days.' }
  };
  
  const t = templates[status]; if (!t) return null;
  const itemsHTML = order.orderItems?.map((item, i) => `<tr style="border-bottom:1px solid #eee;"><td style="padding:12px 8px;">${i+1}. ${item.name}</td><td style="padding:12px 8px;text-align:center;">${item.quantity}</td><td style="padding:12px 8px;text-align:right;">₹${item.price * item.quantity}</td></tr>`).join('') || '';
  
  return { subject: t.subject, html: `<!DOCTYPE html><html><body style="margin:0;padding:0;font-family:Arial;background:#f5f5f5;"><div style="max-width:600px;margin:0 auto;background:#fff;"><div style="background:${t.color};color:white;padding:30px;text-align:center;"><h1 style="margin:0;">${t.emoji} ${t.title}</h1><p style="margin:10px 0 0;">Order #${shortId}</p></div><div style="padding:30px;text-align:center;"><p style="font-size:18px;color:#333;">${t.message}</p><p style="font-size:14px;color:#666;padding:15px;background:#f9f9f9;border-radius:8px;">${t.nextStep}</p></div><div style="padding:0 30px 30px;"><h3 style="border-bottom:2px solid ${t.color};padding-bottom:10px;">📦 Order Details</h3><table width="100%" style="border-collapse:collapse;margin-top:15px;"><thead><tr style="background:#f5f5f5;"><th style="padding:12px 8px;text-align:left;">Item</th><th style="padding:12px 8px;text-align:center;">Qty</th><th style="padding:12px 8px;text-align:right;">Amount</th></tr></thead><tbody>${itemsHTML}</tbody></table><div style="margin-top:20px;padding:15px;background:${t.color}22;border-radius:8px;text-align:right;"><span style="font-size:20px;font-weight:bold;">Total: ₹${order.totalPrice}</span></div></div><div style="padding:0 30px 30px;"><h3>📍 Delivery Address</h3><p style="color:#666;line-height:1.6;"><strong>${order.shippingAddress?.name || customerName}</strong><br>${order.shippingAddress?.fullAddress || ''}<br>📞 ${order.shippingAddress?.phone || ''}</p></div><div style="padding:0 30px 30px;text-align:center;"><a href="${trackingUrl}" style="display:inline-block;padding:15px 40px;background:${t.color};color:white;text-decoration:none;border-radius:8px;font-weight:bold;">Track Order</a></div><div style="background:#2c3e50;color:white;padding:25px;text-align:center;"><p style="margin:0;font-size:18px;font-weight:bold;">🛒 JAGAT STORE</p><p style="margin:10px 0 0;font-size:12px;opacity:0.7;">📞 +91 9599633093</p></div></div></body></html>` };
}

async function sendStatusNotification(order, status) {
  try {
    const user = await User.findById(order.user).catch(() => null);
    const customerEmail = user?.email;
    const customerPhone = order.shippingAddress?.phone || user?.phone;
    const customerName = user?.name?.split(' ')[0] || order.shippingAddress?.name?.split(' ')[0] || 'Customer';
    const orderId = order._id.toString().slice(-8).toUpperCase();
    
    console.log(`📬 Sending ${status} notifications:`, { email: customerEmail, phone: customerPhone });
    
    if (customerEmail) {
      const emailTemplate = getStatusEmailTemplate(order, status, user);
      if (emailTemplate) { await sendEmail(customerEmail, emailTemplate.subject, emailTemplate.html); console.log(`✅ Email sent for: ${status}`); }
    }
    
    if (customerPhone) {
      if (status === 'Confirmed') {
        await sendFast2SMS(customerPhone, FAST2SMS.ORDER_CONFIRMATION, `${customerName}|${orderId}|${order.totalPrice}`);
      } else if (status === 'Shipped' || status === 'Out for Delivery') {
        const deliveryDate = status === 'Out for Delivery' ? 'Today' : getExpectedDelivery();
        await sendFast2SMS(customerPhone, FAST2SMS.ORDER_SHIPPED, `${orderId}|${deliveryDate}`);
      } else if (status === 'Delivered') {
        await sendFast2SMS(customerPhone, FAST2SMS.ORDER_DELIVERED, orderId);
        setTimeout(async () => {
          try {
            await sendFast2SMS(customerPhone, FAST2SMS.FEEDBACK, customerName);
            console.log('✅ Feedback SMS sent to:', customerPhone);
          } catch (e) { console.log('Feedback SMS failed:', e.message); }
        }, 2 * 60 * 60 * 1000);
      } else if (status === 'Cancelled') {
        await sendFast2SMS(customerPhone, FAST2SMS.ORDER_CANCELLED, `${customerName}|${orderId}|${order.totalPrice}`);
      }
      console.log(`✅ SMS sent for: ${status}`);
    }
    return true;
  } catch (error) { console.error('❌ Notification error:', error.message); return false; }
}

async function sendWelcomeSMS(phone, name) {
  try {
    await sendFast2SMS(phone, FAST2SMS.WELCOME, name);
    console.log('✅ Welcome SMS sent to:', phone);
    return true;
  } catch (error) { console.error('❌ Welcome SMS failed:', error.message); return false; }
}

exports.sendWelcomeSMS = sendWelcomeSMS;

exports.createOrder = async (req, res) => {
  console.log('NEW ORDER FROM:', req.user.email);
  try {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice, hasGift, giftItem } = req.body;
    for (let item of orderItems) { const product = await Product.findById(item.product); if (!product || product.stock < item.quantity) return res.status(400).json({ success: false, message: `${item.name} is out of stock!` }); }
    
    let finalHasGift = false, finalGiftItem = null, giftSavings = 0;
    if (hasGift && itemsPrice >= GIFT_THRESHOLD) { finalHasGift = true; finalGiftItem = giftItem || GIFT_PRODUCT; giftSavings = finalGiftItem.oldPrice || 149; console.log('🎁 FREE gift included!'); }
    
    const order = await Order.create({ user: req.user._id, orderItems, shippingAddress, paymentInfo: { method: paymentMethod, status: 'Pending' }, itemsPrice, taxPrice, shippingPrice, totalPrice, hasGift: finalHasGift, giftItem: finalGiftItem, giftSavings, orderStatus: 'Processing' });
    Cart.findOneAndUpdate({ user: req.user._id }, { items: [], totalPrice: 0, hasGift: false, giftItem: null }).catch(() => {});
    
    res.json({ success: true, message: finalHasGift ? '🎉 Order placed with FREE gift!' : 'Order placed!', order: { _id: order._id, totalPrice, hasGift: finalHasGift, giftSavings } });
    
    process.nextTick(async () => {
      const user = await User.findById(req.user._id).catch(() => null);
      const shortId = order._id.toString().slice(-8).toUpperCase();
      const customerName = user?.name?.split(' ')[0] || 'Customer';
      
      try {
        const adminEmail = process.env.ADMIN_EMAIL || 'rythemaggarwal7840@gmail.com';
        
        const adminHTML = getAdminEmailHTML(order, user, shortId, totalPrice);
        await sendEmail(adminEmail, `${finalHasGift ? '🎁 ' : ''}🛒 NEW ORDER #${shortId} - ₹${totalPrice}`, adminHTML);
        
        if (user?.email) {
          const customerHTML = getCustomerEmailHTML(order, user, shortId, totalPrice);
          await sendEmail(user.email, `✅ Order Confirmed #${shortId} - Jagat Store`, customerHTML);
        }
        
        const customerPhone = shippingAddress?.phone || user?.phone;
        if (customerPhone) {
          await sendFast2SMS(customerPhone, FAST2SMS.ORDER_CONFIRMATION, `${customerName}|${shortId}|${totalPrice}`);
          console.log('✅ Order confirmation SMS sent!');
        }
        
        console.log('✅ ALL NOTIFICATIONS SENT!');
        for (let item of orderItems) await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
      } catch (err) { console.error('❌ Background tasks failed:', err.message); }
    });
  } catch (error) { console.error('Order failed:', error); if (!res.headersSent) res.status(500).json({ success: false, message: 'Server error' }); }
};

exports.getMyOrders = async (req, res) => { try { const orders = await Order.find({ user: req.user._id }).populate('orderItems.product').sort({ createdAt: -1 }); res.json({ success: true, orders }); } catch (error) { res.status(500).json({ success: false, message: error.message }); } };
exports.getAllOrders = async (req, res) => { try { const orders = await Order.find().populate('user', 'name email phone').populate('orderItems.product').sort({ createdAt: -1 }); res.json({ success: true, orders }); } catch (error) { res.status(500).json({ success: false, message: error.message }); } };
exports.getOrderById = async (req, res) => { try { const order = await Order.findById(req.params.id).populate('user', 'name email phone'); if (!order) return res.status(404).json({ success: false, message: 'Order not found' }); if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') return res.status(403).json({ success: false, message: 'Not authorized' }); res.json({ success: true, order }); } catch (error) { res.status(500).json({ success: false, message: error.message }); } };

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status, note } = req.body;
    const order = await Order.findById(req.params.id).populate('user', 'name email phone');
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    
    const previousStatus = order.orderStatus;
    order.orderStatus = status;
    if (!order.statusHistory) order.statusHistory = [];
    order.statusHistory.push({ status, note: note || `Status: ${status}`, timestamp: new Date() });
    if (status === 'Delivered') { order.deliveredAt = Date.now(); if (order.paymentInfo) { order.paymentInfo.status = 'Success'; order.paymentInfo.paidAt = Date.now(); } }
    if (status === 'Cancelled') { order.cancelledAt = Date.now(); order.cancellationReason = note; for (let item of order.orderItems) { const product = await Product.findById(item.product); if (product) { product.stock += item.quantity; await product.save(); } } }
    await order.save();
    
    if (previousStatus !== status) { console.log(`📬 Status: ${previousStatus} → ${status}`); process.nextTick(async () => { await sendStatusNotification(order, status); }); }
    
    const smsNote = ['Confirmed', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'].includes(status) ? ' + SMS' : '';
    res.json({ success: true, message: `✅ Status: ${status}. Email${smsNote} sent!`, order });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

exports.cancelOrder = async (req, res) => {
  try {
    const { reason } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    if (order.user.toString() !== req.user._id.toString()) return res.status(403).json({ success: false, message: 'Not authorized' });
    if (['Delivered', 'Cancelled'].includes(order.orderStatus)) return res.status(400).json({ success: false, message: `Cannot cancel: ${order.orderStatus}` });
    
    order.orderStatus = 'Cancelled'; order.cancelledAt = Date.now(); order.cancellationReason = reason || 'Cancelled by user';
    if (!order.statusHistory) order.statusHistory = [];
    order.statusHistory.push({ status: 'Cancelled', note: reason || 'Cancelled by user', timestamp: new Date() });
    for (let item of order.orderItems) { const product = await Product.findById(item.product); if (product) { product.stock += item.quantity; await product.save(); } }
    await order.save();
    process.nextTick(async () => { await sendStatusNotification(order, 'Cancelled'); });
    res.json({ success: true, message: 'Order cancelled', order });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

exports.deleteOrder = async (req, res) => { try { const order = await Order.findById(req.params.id); if (!order) return res.status(404).json({ success: false, message: 'Order not found' }); await order.deleteOne(); res.json({ success: true, message: 'Order deleted' }); } catch (error) { res.status(500).json({ success: false, message: error.message }); } };

exports.markOrderAsPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    order.isPaid = true; order.paidAt = Date.now();
    if (order.paymentInfo) { order.paymentInfo.status = 'Success'; order.paymentInfo.paidAt = Date.now(); }
    if (!order.statusHistory) order.statusHistory = [];
    order.statusHistory.push({ status: order.orderStatus, note: 'Marked as Paid', timestamp: new Date() });
    const updatedOrder = await order.save();
    console.log('💰 Paid:', order._id);
    res.status(200).json({ success: true, message: 'Marked as paid', order: updatedOrder });
  } catch (error) { res.status(500).json({ success: false, message: 'Error updating payment' }); }
};