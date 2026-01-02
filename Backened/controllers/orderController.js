console.log('📧📱 ORDERCONTROLLER - ALL 15 TEMPLATES READY!');

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

// ============================================
// 📱 ALL FAST2SMS MESSAGE IDs (15 Templates)
// ============================================
const FAST2SMS = {
  // SERVICE TEMPLATES (JGATST)
  OTP: '205107',                    // 1 var: OTP
  ORDER_SHIPPED: '205108',          // 2 vars: OrderID|Date
  ORDER_CONFIRMATION: '205109',     // 3 vars: Name|OrderID|Amount
  ORDER_DELIVERED: '205110',        // 1 var: OrderID
  WELCOME: '205126',                // 1 var: Name 🆕
  ORDER_CANCELLED: '205127',        // 3 vars: Name|OrderID|Amount 🆕
  FEEDBACK: '205128'                // 1 var: Name 🆕
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
// 🎨 BEAUTIFUL ADMIN EMAIL TEMPLATE
// ========================================
function getAdminEmailHTML(order, user, shortId, totalPrice) {
  const customerName = user?.name || order.shippingAddress?.name || 'N/A';
  const customerPhone = order.shippingAddress?.phone || user?.phone || 'N/A';
  const customerEmail = user?.email || 'N/A';
  
  const itemsHTML = order.orderItems?.map((item, i) => `
    <tr style="border-bottom:1px solid #eee;">
      <td style="padding:12px 8px;">${i+1}.</td>
      <td style="padding:12px 8px;">
        <strong>${item.name}</strong><br>
        <small style="color:#666;">${item.weight || ''}</small>
      </td>
      <td style="padding:12px 8px;text-align:center;">${item.quantity}</td>
      <td style="padding:12px 8px;text-align:right;">₹${item.price}</td>
      <td style="padding:12px 8px;text-align:right;"><strong>₹${item.price * item.quantity}</strong></td>
    </tr>
  `).join('') || '';

  const giftHTML = order.hasGift ? `
    <tr style="background:#fff3cd;border-bottom:2px solid #ffc107;">
      <td style="padding:12px 8px;" colspan="5">
        🎁 <strong>FREE GIFT INCLUDED!</strong> (Saved ₹${order.giftSavings || 149})
      </td>
    </tr>
  ` : '';

  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:'Segoe UI',Arial,sans-serif;background:#f5f5f5;">
  <div style="max-width:700px;margin:20px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.1);">
    
    <div style="background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white;padding:30px;text-align:center;">
      <h1 style="margin:0;font-size:32px;">🛒 NEW ORDER!</h1>
      <p style="margin:10px 0 0;font-size:18px;opacity:0.9;">Order #${shortId}</p>
    </div>

    <div style="background:#f8f9fa;border-left:4px solid #667eea;padding:20px;margin:20px;">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;">
        <div>
          <p style="margin:0;color:#666;font-size:13px;">TOTAL AMOUNT</p>
          <p style="margin:5px 0 0;font-size:28px;font-weight:bold;color:#667eea;">₹${totalPrice}</p>
        </div>
        <div>
          <p style="margin:0;color:#666;font-size:13px;">PAYMENT METHOD</p>
          <p style="margin:5px 0 0;font-size:18px;font-weight:bold;">${order.paymentInfo?.method || 'COD'}</p>
        </div>
      </div>
    </div>

    <div style="padding:0 30px 20px;">
      <h2 style="color:#333;border-bottom:2px solid #667eea;padding-bottom:10px;">👤 Customer Details</h2>
      <table width="100%" style="margin-top:15px;">
        <tr>
          <td style="padding:8px 0;color:#666;width:120px;">Name:</td>
          <td style="padding:8px 0;"><strong>${customerName}</strong></td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#666;">Phone:</td>
          <td style="padding:8px 0;"><strong>${customerPhone}</strong></td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#666;">Email:</td>
          <td style="padding:8px 0;">${customerEmail}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#666;vertical-align:top;">Address:</td>
          <td style="padding:8px 0;line-height:1.6;">
            <strong>${order.shippingAddress?.fullAddress || 'N/A'}</strong><br>
            ${order.shippingAddress?.city || ''}, ${order.shippingAddress?.state || ''}<br>
            ${order.shippingAddress?.pincode || ''}
          </td>
        </tr>
      </table>
    </div>

    <div style="padding:0 30px 30px;">
      <h2 style="color:#333;border-bottom:2px solid #667eea;padding-bottom:10px;">📦 Order Items</h2>
      <table width="100%" style="border-collapse:collapse;margin-top:15px;">
        <thead>
          <tr style="background:#f8f9fa;border-bottom:2px solid #667eea;">
            <th style="padding:12px 8px;text-align:left;width:30px;">#</th>
            <th style="padding:12px 8px;text-align:left;">Product</th>
            <th style="padding:12px 8px;text-align:center;width:80px;">Qty</th>
            <th style="padding:12px 8px;text-align:right;width:100px;">Price</th>
            <th style="padding:12px 8px;text-align:right;width:100px;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHTML}
          ${giftHTML}
        </tbody>
        <tfoot>
          <tr style="background:#f8f9fa;border-top:2px solid #667eea;">
            <td colspan="4" style="padding:15px 8px;text-align:right;"><strong>GRAND TOTAL:</strong></td>
            <td style="padding:15px 8px;text-align:right;"><strong style="font-size:20px;color:#667eea;">₹${totalPrice}</strong></td>
          </tr>
        </tfoot>
      </table>
    </div>

    <div style="padding:0 30px 30px;text-align:center;">
      <a href="${process.env.FRONTEND_URL || 'https://www.jagatstore.in'}/admin/orders" 
         style="display:inline-block;padding:15px 40px;background:#667eea;color:white;text-decoration:none;border-radius:8px;font-weight:bold;margin:0 10px;">
        📋 View in Dashboard
      </a>
    </div>

    <div style="background:#2c3e50;color:white;padding:25px;text-align:center;">
      <p style="margin:0;font-size:18px;font-weight:bold;">🛒 JAGAT STORE</p>
      <p style="margin:10px 0 0;font-size:14px;opacity:0.8;">Admin Order Notification</p>
      <p style="margin:10px 0 0;font-size:12px;opacity:0.6;">📞 +91 9599633093 | 📧 orders@jagatstore.in</p>
    </div>

  </div>
</body>
</html>
  `;
}

// ========================================
// 🎨 BEAUTIFUL CUSTOMER EMAIL TEMPLATE
// ========================================
function getCustomerEmailHTML(order, user, shortId, totalPrice) {
  const customerName = user?.name?.split(' ')[0] || order.shippingAddress?.name?.split(' ')[0] || 'Customer';
  const trackingUrl = `${process.env.FRONTEND_URL || 'https://www.jagatstore.in'}/orders/${order._id}`;
  
  const itemsHTML = order.orderItems?.map((item, i) => `
    <tr style="border-bottom:1px solid #eee;">
      <td style="padding:12px 8px;">
        ${i+1}. <strong>${item.name}</strong><br>
        <small style="color:#666;">${item.weight || ''}</small>
      </td>
      <td style="padding:12px 8px;text-align:center;">${item.quantity}</td>
      <td style="padding:12px 8px;text-align:right;"><strong>₹${item.price * item.quantity}</strong></td>
    </tr>
  `).join('') || '';

  const giftHTML = order.hasGift ? `
    <div style="background:linear-gradient(135deg,#ffd700,#ffed4e);padding:20px;margin:20px 0;border-radius:8px;text-align:center;">
      <p style="margin:0;font-size:24px;">🎁</p>
      <p style="margin:10px 0 0;font-size:16px;font-weight:bold;color:#333;">FREE GIFT INCLUDED!</p>
      <p style="margin:5px 0 0;font-size:14px;color:#666;">You saved ₹${order.giftSavings || 149}!</p>
    </div>
  ` : '';

  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:'Segoe UI',Arial,sans-serif;background:#f5f5f5;">
  <div style="max-width:600px;margin:20px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.1);">
    
    <div style="background:linear-gradient(135deg,#11998e 0%,#38ef7d 100%);color:white;padding:40px;text-align:center;">
      <h1 style="margin:0;font-size:32px;">✅ Order Confirmed!</h1>
      <p style="margin:15px 0 0;font-size:16px;opacity:0.9;">Thank you for shopping with us!</p>
      <div style="background:rgba(255,255,255,0.2);padding:15px;border-radius:8px;margin-top:20px;">
        <p style="margin:0;font-size:14px;opacity:0.9;">Order Number</p>
        <p style="margin:5px 0 0;font-size:24px;font-weight:bold;">#${shortId}</p>
      </div>
    </div>

    <div style="padding:30px;text-align:center;">
      <p style="margin:0;font-size:18px;color:#333;">Hi <strong>${customerName}</strong>! 👋</p>
      <p style="margin:15px 0 0;font-size:16px;color:#666;line-height:1.6;">
        Great news! Your order has been confirmed and will be delivered soon.
      </p>
    </div>

    ${giftHTML}

    <div style="padding:0 30px 30px;">
      <h2 style="color:#333;border-bottom:2px solid #11998e;padding-bottom:10px;">📦 Your Order</h2>
      <table width="100%" style="border-collapse:collapse;margin-top:15px;">
        <thead>
          <tr style="background:#f8f9fa;border-bottom:2px solid #11998e;">
            <th style="padding:12px 8px;text-align:left;">Item</th>
            <th style="padding:12px 8px;text-align:center;width:80px;">Qty</th>
            <th style="padding:12px 8px;text-align:right;width:100px;">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHTML}
        </tbody>
      </table>
      
      <div style="margin-top:20px;padding:20px;background:linear-gradient(135deg,#667eea22,#764ba222);border-radius:8px;text-align:right;">
        <p style="margin:0;color:#666;font-size:14px;">Total Amount</p>
        <p style="margin:5px 0 0;font-size:32px;font-weight:bold;color:#11998e;">₹${totalPrice}</p>
        <p style="margin:5px 0 0;font-size:14px;color:#666;">Payment: ${order.paymentInfo?.method || 'Cash on Delivery'}</p>
      </div>
    </div>

    <div style="padding:0 30px 30px;">
      <h3 style="color:#333;border-bottom:2px solid #11998e;padding-bottom:10px;">📍 Delivery Address</h3>
      <div style="background:#f8f9fa;padding:15px;border-radius:8px;margin-top:15px;">
        <p style="margin:0;font-weight:bold;color:#333;">${order.shippingAddress?.name || customerName}</p>
        <p style="margin:10px 0 0;color:#666;line-height:1.6;">
          ${order.shippingAddress?.fullAddress || ''}<br>
          ${order.shippingAddress?.city || ''}, ${order.shippingAddress?.state || ''} - ${order.shippingAddress?.pincode || ''}<br>
          📞 ${order.shippingAddress?.phone || ''}
        </p>
      </div>
    </div>

    <div style="padding:0 30px 30px;text-align:center;">
      <div style="background:#fff3cd;border-left:4px solid #ffc107;padding:15px;border-radius:4px;">
        <p style="margin:0;color:#856404;"><strong>⏰ Expected Delivery:</strong> ${getExpectedDelivery()}</p>
      </div>
    </div>

    <div style="padding:0 30px 30px;text-align:center;">
      <a href="${trackingUrl}" 
         style="display:inline-block;padding:15px 40px;background:#11998e;color:white;text-decoration:none;border-radius:8px;font-weight:bold;font-size:16px;">
        📍 Track Your Order
      </a>
    </div>

    <div style="padding:0 30px 30px;">
      <div style="background:#f8f9fa;padding:20px;border-radius:8px;text-align:center;">
        <p style="margin:0;color:#666;font-size:14px;">Need help with your order?</p>
        <p style="margin:10px 0 0;">
          <a href="tel:+919599633093" style="color:#11998e;text-decoration:none;font-weight:bold;">📞 +91 9599633093</a>
          <span style="color:#ccc;margin:0 10px;">|</span>
          <a href="mailto:orders@jagatstore.in" style="color:#11998e;text-decoration:none;font-weight:bold;">📧 Email Us</a>
        </p>
      </div>
    </div>

    <div style="background:#2c3e50;color:white;padding:30px;text-align:center;">
      <p style="margin:0;font-size:20px;font-weight:bold;">🛒 JAGAT STORE</p>
      <p style="margin:10px 0 0;font-size:14px;opacity:0.8;">Your Trusted Grocery Partner</p>
      <p style="margin:15px 0 0;font-size:12px;opacity:0.6;">Thank you for choosing Jagat Store!<br>We appreciate your business 💚</p>
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
        
        // 📧 SEND BEAUTIFUL ADMIN EMAIL
        const adminHTML = getAdminEmailHTML(order, user, shortId, totalPrice);
        await sendEmail(adminEmail, `${finalHasGift ? '🎁 ' : ''}🛒 NEW ORDER #${shortId} - ₹${totalPrice}`, adminHTML);
        
        // 📧 SEND BEAUTIFUL CUSTOMER EMAIL
        if (user?.email) {
          const customerHTML = getCustomerEmailHTML(order, user, shortId, totalPrice);
          await sendEmail(user.email, `✅ Order Confirmed #${shortId} - Jagat Store`, customerHTML);
        }
        
        // 📱 SEND ORDER CONFIRMATION SMS
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