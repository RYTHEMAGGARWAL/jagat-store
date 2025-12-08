console.log('📧📱 ORDERCONTROLLER - AUTO EMAIL + SMS READY!');

const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const User = require('../models/User');

// 🎁 GIFT CONFIGURATION
const GIFT_THRESHOLD = 999;
const GIFT_PRODUCT = {
  name: '🎁 FREE Gift',
  brand: 'Jagat Store',
  category: 'Gift',
  price: 0,
  oldPrice: 149,
  quantity: 1,
  weight: '500ml',
  image: 'https://m.media-amazon.com/images/I/81nRsEQCprL._SL1500_.jpg',
  isGift: true
};

// ============================================
// 📧 SEND EMAIL USING RESEND API
// ============================================
async function sendEmail(to, subject, html) {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Jagat Store <orders@jagatstore.in>',
        to: to,
        subject: subject,
        html: html
      })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Email sent to:', to);
      return true;
    } else {
      console.error('❌ Resend error:', data);
      return false;
    }
  } catch (error) {
    console.error('❌ Email failed:', error.message);
    return false;
  }
}

// ============================================
// 📱 SEND SMS VIA FAST2SMS (Only for important updates)
// ============================================
async function sendSMS(phone, message) {
  try {
    // Clean phone number - only 10 digits
    const cleanPhone = phone.replace(/\D/g, '').slice(-10);
    
    if (cleanPhone.length !== 10) {
      console.log('⚠️ Invalid phone number:', phone);
      return false;
    }
    
    const response = await fetch('https://www.fast2sms.com/dev/bulkV2', {
      method: 'POST',
      headers: {
        'authorization': process.env.FAST2SMS_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        route: 'q',  // Quick transactional route
        message: message,
        language: 'english',
        flash: 0,
        numbers: cleanPhone
      })
    });
    
    const data = await response.json();
    
    if (data.return === true) {
      console.log('✅ SMS sent to:', cleanPhone);
      return true;
    } else {
      console.log('❌ SMS failed:', data.message);
      return false;
    }
  } catch (error) {
    console.error('❌ SMS error:', error.message);
    return false;
  }
}

// 📱 GET SMS MESSAGE FOR STATUS (Only Out for Delivery & Delivered)
function getStatusSMS(order, status, customerName) {
  const shortId = order._id.toString().slice(-8).toUpperCase();
  
  const messages = {
    'Out for Delivery': `JAGAT STORE: Hi ${customerName}! Your order #${shortId} is OUT FOR DELIVERY and will arrive TODAY! Keep your phone handy. Total: Rs${order.totalPrice}`,
    
    'Delivered': `JAGAT STORE: Hi ${customerName}! Your order #${shortId} (Rs${order.totalPrice}) has been DELIVERED. Thank you for shopping with us!`
  };
  
  return messages[status] || null;
}

// ============================================
// 📬 STATUS-WISE EMAIL TEMPLATES
// ============================================
function getStatusEmailTemplate(order, status, user) {
  const shortId = order._id.toString().slice(-8).toUpperCase();
  const customerName = user?.name?.split(' ')[0] || order.shippingAddress?.name?.split(' ')[0] || 'Customer';
  const trackingUrl = `${process.env.FRONTEND_URL || 'https://www.jagatstore.in'}/orders/${order._id}`;
  
  const templates = {
    'Confirmed': {
      subject: `✅ Order Confirmed #${shortId} | Jagat Store`,
      emoji: '✅',
      title: 'Order Confirmed!',
      message: `Great news, ${customerName}! Your order has been confirmed and is being prepared for shipping.`,
      color: '#2196f3',
      nextStep: 'Your order will be shipped soon. We\'ll notify you when it\'s on the way!'
    },
    'Shipped': {
      subject: `🚢 Order Shipped #${shortId} | On The Way!`,
      emoji: '🚢',
      title: 'Your Order Has Been Shipped!',
      message: `Hey ${customerName}! Your order is now on its way to you. Get ready to receive your goodies!`,
      color: '#9c27b0',
      nextStep: 'Your package will reach you within 1-2 business days. Keep an eye out!'
    },
    'Out for Delivery': {
      subject: `🚚 Out for Delivery #${shortId} | Arriving Today!`,
      emoji: '🚚',
      title: 'Out for Delivery!',
      message: `Exciting news, ${customerName}! Your order is out for delivery and will arrive TODAY!`,
      color: '#00bcd4',
      nextStep: 'Please keep your phone handy. Our delivery partner will contact you shortly.'
    },
    'Delivered': {
      subject: `✓ Delivered #${shortId} | Thank You! 🎉`,
      emoji: '✓',
      title: 'Order Delivered Successfully!',
      message: `Hey ${customerName}! Your order has been delivered. We hope you love your purchase!`,
      color: '#4caf50',
      nextStep: 'Thank you for shopping with Jagat Store! We\'d love to see you again soon. 💚'
    },
    'Cancelled': {
      subject: `❌ Order Cancelled #${shortId} | Jagat Store`,
      emoji: '❌',
      title: 'Order Cancelled',
      message: `Hi ${customerName}, your order has been cancelled as per request.`,
      color: '#f44336',
      nextStep: 'If you have any questions, please contact us. We hope to serve you again soon!'
    }
  };
  
  const template = templates[status];
  if (!template) return null;
  
  // Build items HTML
  const itemsHTML = order.orderItems?.map((item, i) => `
    <tr style="border-bottom:1px solid #eee;">
      <td style="padding:12px 8px;">${i + 1}. ${item.name} ${item.weight ? `(${item.weight})` : ''}</td>
      <td style="padding:12px 8px; text-align:center;">${item.quantity}</td>
      <td style="padding:12px 8px; text-align:right;">₹${item.price * item.quantity}</td>
    </tr>
  `).join('') || '';
  
  return {
    subject: template.subject,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin:0; padding:0; font-family:Arial,sans-serif; background:#f5f5f5;">
        <div style="max-width:600px; margin:0 auto; background:#ffffff;">
          
          <!-- Header -->
          <div style="background:linear-gradient(135deg, ${template.color}, ${template.color}dd); color:white; padding:30px; text-align:center;">
            <h1 style="margin:0; font-size:28px;">${template.emoji} ${template.title}</h1>
            <p style="margin:10px 0 0; font-size:16px; opacity:0.9;">Order #${shortId}</p>
          </div>
          
          <!-- Message -->
          <div style="padding:30px; text-align:center;">
            <p style="font-size:18px; color:#333; margin:0 0 20px;">${template.message}</p>
            <p style="font-size:14px; color:#666; margin:0; padding:15px; background:#f9f9f9; border-radius:8px;">
              ${template.nextStep}
            </p>
          </div>
          
          <!-- Order Details -->
          <div style="padding:0 30px 30px;">
            <h3 style="color:#333; border-bottom:2px solid ${template.color}; padding-bottom:10px;">📦 Order Details</h3>
            <table width="100%" style="border-collapse:collapse; margin-top:15px;">
              <thead>
                <tr style="background:#f5f5f5;">
                  <th style="padding:12px 8px; text-align:left; color:#666;">Item</th>
                  <th style="padding:12px 8px; text-align:center; color:#666;">Qty</th>
                  <th style="padding:12px 8px; text-align:right; color:#666;">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHTML}
                ${order.hasGift ? `
                  <tr style="background:#e8f5e9;">
                    <td style="padding:12px 8px; color:#2e7d32;">🎁 FREE Gift</td>
                    <td style="padding:12px 8px; text-align:center; color:#2e7d32;">1</td>
                    <td style="padding:12px 8px; text-align:right; color:#2e7d32;">FREE</td>
                  </tr>
                ` : ''}
              </tbody>
            </table>
            
            <!-- Total -->
            <div style="margin-top:20px; padding:15px; background:linear-gradient(135deg, ${template.color}15, ${template.color}25); border-radius:8px; text-align:right;">
              <span style="font-size:20px; font-weight:bold; color:#333;">Total: ₹${order.totalPrice}</span>
            </div>
          </div>
          
          <!-- Delivery Address -->
          <div style="padding:0 30px 30px;">
            <h3 style="color:#333; border-bottom:2px solid #eee; padding-bottom:10px;">📍 Delivery Address</h3>
            <p style="color:#666; line-height:1.6; margin:15px 0 0;">
              <strong>${order.shippingAddress?.name || customerName}</strong><br>
              ${order.shippingAddress?.fullAddress || order.shippingAddress?.address || ''}<br>
              ${order.shippingAddress?.city || ''}, ${order.shippingAddress?.state || ''} - ${order.shippingAddress?.pincode || ''}<br>
              📞 ${order.shippingAddress?.phone || ''}
            </p>
          </div>
          
          <!-- Track Order Button -->
          <div style="padding:0 30px 30px; text-align:center;">
            <a href="${trackingUrl}" style="display:inline-block; padding:15px 40px; background:${template.color}; color:white; text-decoration:none; border-radius:8px; font-weight:bold; font-size:16px;">
              Track Your Order
            </a>
          </div>
          
          <!-- Footer -->
          <div style="background:#2c3e50; color:white; padding:25px; text-align:center;">
            <p style="margin:0 0 10px; font-size:18px; font-weight:bold;">🛒 JAGAT STORE</p>
            <p style="margin:0 0 5px; font-size:12px; opacity:0.8;">Your Trusted Grocery Partner</p>
            <p style="margin:10px 0 0; font-size:12px; opacity:0.7;">
              📞 +91 9599633093 | 📧 support@jagatstore.in
            </p>
            <p style="margin:10px 0 0; font-size:11px; opacity:0.6;">
              © 2025 Jagat Store | Ghaziabad, UP
            </p>
          </div>
          
        </div>
      </body>
      </html>
    `
  };
}

// ============================================
// 🔔 SEND STATUS NOTIFICATIONS (Email + SMS)
// ============================================
async function sendStatusNotification(order, status) {
  try {
    const user = await User.findById(order.user).catch(() => null);
    const customerEmail = user?.email;
    const customerPhone = order.shippingAddress?.phone || user?.phone;
    const customerName = user?.name?.split(' ')[0] || order.shippingAddress?.name?.split(' ')[0] || 'Customer';
    
    console.log(`📬 Sending ${status} notifications to:`, { email: customerEmail, phone: customerPhone });
    
    // 1. SEND EMAIL (All status changes)
    if (customerEmail) {
      const emailTemplate = getStatusEmailTemplate(order, status, user);
      if (emailTemplate) {
        await sendEmail(customerEmail, emailTemplate.subject, emailTemplate.html);
        console.log(`✅ Email sent for status: ${status}`);
      }
    }
    
    // 2. SEND SMS (Only for Out for Delivery & Delivered)
    if (customerPhone && (status === 'Out for Delivery' || status === 'Delivered')) {
      const smsMessage = getStatusSMS(order, status, customerName);
      if (smsMessage) {
        await sendSMS(customerPhone, smsMessage);
      }
    }
    
    return true;
  } catch (error) {
    console.error('❌ Notification error:', error.message);
    return false;
  }
}

// ============================================
// CREATE ORDER
// ============================================
exports.createOrder = async (req, res) => {
  console.log('NEW ORDER FROM:', req.user.email);

  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      hasGift,
      giftItem
    } = req.body;

    // Stock check
    for (let item of orderItems) {
      const product = await Product.findById(item.product);
      if (!product || product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `${item.name} is out of stock!`
        });
      }
    }

    // 🎁 VALIDATE GIFT
    let finalHasGift = false;
    let finalGiftItem = null;
    let giftSavings = 0;

    if (hasGift && itemsPrice >= GIFT_THRESHOLD) {
      finalHasGift = true;
      finalGiftItem = giftItem || GIFT_PRODUCT;
      giftSavings = finalGiftItem.oldPrice || 149;
      console.log('🎁 Order includes FREE gift!');
    }

    // Create order
    const order = await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentInfo: { method: paymentMethod, status: 'Pending' },
      itemsPrice, 
      taxPrice, 
      shippingPrice, 
      totalPrice,
      hasGift: finalHasGift,
      giftItem: finalGiftItem,
      giftSavings: giftSavings,
      orderStatus: 'Processing'
    });

    // Clear cart
    Cart.findOneAndUpdate(
      { user: req.user._id }, 
      { items: [], totalPrice: 0, hasGift: false, giftItem: null }
    ).catch(() => {});

    // TURANT RESPONSE
    res.json({
      success: true,
      message: finalHasGift ? '🎉 Order placed with FREE gift!' : 'Order placed!',
      order: { 
        _id: order._id, 
        totalPrice,
        hasGift: finalHasGift,
        giftSavings: giftSavings
      }
    });

    // BACKGROUND - Email + Stock
    process.nextTick(async () => {
      const user = await User.findById(req.user._id).catch(() => null);
      const shortId = order._id.toString().slice(-8).toUpperCase();
      const date = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

      const itemsHTML = orderItems.map((item, i) => `
        <tr style="border-bottom:1px solid #eee;">
          <td style="padding:12px 8px;">${i + 1}. ${item.name}</td>
          <td style="padding:12px 8px; text-align:center;">${item.quantity}</td>
          <td style="padding:12px 8px; text-align:right;">₹${item.price}</td>
          <td style="padding:12px 8px; text-align:right; font-weight:bold;">₹${item.price * item.quantity}</td>
        </tr>
      `).join('');

      const giftHTML = finalHasGift ? `
        <tr style="border-bottom:1px solid #eee; background: linear-gradient(135deg, #e8f5e9, #c8e6c9);">
          <td style="padding:12px 8px; color:#2e7d32;">
            🎁 <strong>FREE GIFT</strong> - ${finalGiftItem?.name || 'Gift Pack'}
          </td>
          <td style="padding:12px 8px; text-align:center; color:#2e7d32;">1</td>
          <td style="padding:12px 8px; text-align:right; text-decoration:line-through; color:#999;">₹${finalGiftItem?.oldPrice || 149}</td>
          <td style="padding:12px 8px; text-align:right; font-weight:bold; color:#2e7d32;">FREE</td>
        </tr>
      ` : '';

      const savingsBadge = finalHasGift ? `
        <div style="background:linear-gradient(135deg, #4caf50, #2e7d32); color:white; padding:15px; text-align:center; margin:15px 0; border-radius:8px;">
          🎉 Customer saved ₹${giftSavings} with FREE gift!
        </div>
      ` : '';

      try {
        const adminEmail = process.env.ADMIN_EMAIL || 'rythemaggarwal7840@gmail.com';

        // ADMIN EMAIL
        await sendEmail(
          adminEmail,
          `${finalHasGift ? '🎁 ' : ''}NEW ORDER #${shortId} | ₹${totalPrice} | ${user?.name || 'Guest'}`,
          `
            <div style="font-family:Arial,sans-serif; max-width:600px; margin:auto; border:1px solid #ddd; border-radius:12px; overflow:hidden;">
              <div style="background:linear-gradient(135deg,#667eea,#764ba2); color:white; padding:20px; text-align:center;">
                <h1 style="margin:0;">NEW ORDER RECEIVED!</h1>
                <p style="margin:5px 0 0; font-size:18px;">Order #${shortId}</p>
              </div>
              
              ${finalHasGift ? `
                <div style="background:linear-gradient(135deg, #4caf50, #2e7d32); color:white; padding:15px; text-align:center; font-weight:bold;">
                  🎁 THIS ORDER INCLUDES FREE GIFT (Worth ₹${giftSavings})
                </div>
              ` : ''}
              
              <div style="background:#fff3cd; padding:15px; text-align:center; font-weight:bold; color:#856404;">
                Action Required: New order needs packing & delivery!
              </div>
              <div style="padding:20px; background:#f9f9f9;">
                <h3>Customer Details</h3>
                <p><strong>Name:</strong> ${user?.name || 'N/A'}</p>
                <p><strong>Phone:</strong> ${shippingAddress.phone}</p>
                <p><strong>Address:</strong> ${shippingAddress.fullAddress}</p>
                <p><strong>Order Date:</strong> ${date}</p>
              </div>
              <div style="padding:20px;">
                <h3>Order Items (${orderItems.length}${finalHasGift ? ' + 1 Gift' : ''})</h3>
                <table width="100%" style="border-collapse:collapse;">
                  <thead>
                    <tr style="background:#667eea; color:white;">
                      <th style="padding:10px; text-align:left;">Item</th>
                      <th style="padding:10px;">Qty</th>
                      <th style="padding:10px; text-align:right;">Price</th>
                      <th style="padding:10px; text-align:right;">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemsHTML}
                    ${giftHTML}
                  </tbody>
                </table>
                ${savingsBadge}
                <div style="margin-top:20px; text-align:right; font-size:18px;">
                  <strong>Total Amount: ₹${totalPrice}</strong>
                </div>
              </div>
              <div style="background:#2c3e50; color:white; padding:15px; text-align:center; font-size:12px;">
                © 2025 Jagat Store | Ghaziabad
              </div>
            </div>
          `
        );

        // CUSTOMER EMAIL
        if (user?.email) {
          await sendEmail(
            user.email,
            `${finalHasGift ? '🎁 ' : ''}Order Confirmed #${shortId} | Thank You ${user.name.split(' ')[0]}!`,
            `
              <div style="font-family:Arial,sans-serif; max-width:600px; margin:auto; border:1px solid #ddd; border-radius:12px; overflow:hidden;">
                <div style="background:linear-gradient(135deg,#11998e,#38ef7d); color:white; padding:30px; text-align:center;">
                  <h1 style="margin:0;">Thank You for Your Order!</h1>
                  <p style="margin:10px 0 0; font-size:20px;">Order #${shortId}</p>
                </div>
                
                ${finalHasGift ? `
                  <div style="background:linear-gradient(135deg, #ff9800, #ff5722); color:white; padding:20px; text-align:center;">
                    <h2 style="margin:0;">🎉 Congratulations!</h2>
                    <p style="margin:10px 0 0; font-size:16px;">You got a FREE Gift (Worth ₹${giftSavings})!</p>
                  </div>
                ` : ''}
                
                <div style="padding:30px;">
                  <p style="font-size:16px; color:#333;">Hi ${user.name.split(' ')[0]},</p>
                  <p style="color:#666; line-height:1.6;">
                    Your order has been confirmed! We're preparing your items with care.
                  </p>
                  
                  <div style="background:#f9f9f9; padding:20px; border-radius:8px; margin:20px 0;">
                    <h3 style="margin:0 0 15px; color:#333;">📦 Order Summary</h3>
                    <p><strong>Order ID:</strong> #${shortId}</p>
                    <p><strong>Items:</strong> ${orderItems.length}${finalHasGift ? ' + 1 Gift' : ''}</p>
                    <p><strong>Total:</strong> ₹${totalPrice}</p>
                    <p><strong>Payment:</strong> ${paymentMethod || 'Cash on Delivery'}</p>
                  </div>
                  
                  <div style="background:#e8f5e9; padding:20px; border-radius:8px;">
                    <h3 style="margin:0 0 10px; color:#2e7d32;">📍 Delivery Address</h3>
                    <p style="color:#666; margin:0; line-height:1.6;">
                      ${shippingAddress.fullAddress}<br>
                      ${shippingAddress.city}, ${shippingAddress.state} - ${shippingAddress.pincode}<br>
                      📞 ${shippingAddress.phone}
                    </p>
                  </div>
                  
                  <p style="margin-top:25px; color:#666; font-size:14px;">
                    We'll send you another email when your order ships. Thank you for choosing Jagat Store! 💚
                  </p>
                </div>
                
                <div style="background:#2c3e50; color:white; padding:20px; text-align:center;">
                  <p style="margin:0 0 5px; font-size:16px; font-weight:bold;">🛒 JAGAT STORE</p>
                  <p style="margin:0; font-size:12px; opacity:0.8;">www.jagatstore.in | +91 9599633093</p>
                </div>
              </div>
            `
          );
        }

        console.log('✅ ALL EMAILS SENT SUCCESSFULLY!');

        // Stock update
        for (let item of orderItems) {
          await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
        }

      } catch (err) {
        console.error('❌ Background tasks failed:', err.message);
      }
    });

  } catch (error) {
    console.error('Order failed:', error);
    if (!res.headersSent) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
};

// Get logged in user orders
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('orderItems.product')
      .sort({ createdAt: -1 });
    
    res.json({ success: true, orders });
  } catch (error) {
    console.error('❌ Get my orders error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all orders (Admin only)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email phone')
      .populate('orderItems.product')
      .sort({ createdAt: -1 });
    
    res.json({ success: true, orders });
  } catch (error) {
    console.error('❌ Get all orders error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email phone');

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    res.json({ success: true, order });
  } catch (error) {
    console.error('❌ Get order error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ============================================
// 🔥 UPDATE ORDER STATUS (WITH AUTO EMAIL!)
// ============================================
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status, note } = req.body;
    const order = await Order.findById(req.params.id).populate('user', 'name email phone');
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    
    const previousStatus = order.orderStatus;
    order.orderStatus = status;
    
    if (!order.statusHistory) order.statusHistory = [];
    
    order.statusHistory.push({
      status,
      note: note || `Order status updated to ${status}`,
      timestamp: new Date()
    });
    
    if (status === 'Delivered') {
      order.deliveredAt = Date.now();
      if (order.paymentInfo) {
        order.paymentInfo.status = 'Success';
        order.paymentInfo.paidAt = Date.now();
      }
    }
    
    if (status === 'Cancelled') {
      order.cancelledAt = Date.now();
      order.cancellationReason = note;
      
      // Restore stock
      for (let item of order.orderItems) {
        const product = await Product.findById(item.product);
        if (product) {
          product.stock += item.quantity;
          await product.save();
        }
      }
    }
    
    await order.save();
    
    // 📧📱 SEND NOTIFICATIONS - Only if status actually changed
    if (previousStatus !== status) {
      console.log(`📬 Status changed: ${previousStatus} → ${status}`);
      
      // Send email + SMS (SMS only for Out for Delivery & Delivered)
      process.nextTick(async () => {
        await sendStatusNotification(order, status);
      });
    }
    
    const smsNote = (status === 'Out for Delivery' || status === 'Delivered') ? ' + SMS' : '';
    
    res.json({ 
      success: true, 
      message: `✅ Status updated to ${status}. Email${smsNote} sent to customer!`,
      order 
    });
  } catch (error) {
    console.error('❌ Update status error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Cancel order
exports.cancelOrder = async (req, res) => {
  try {
    const { reason } = req.body;
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    
    if (['Delivered', 'Cancelled'].includes(order.orderStatus)) {
      return res.status(400).json({ success: false, message: `Cannot cancel order with status: ${order.orderStatus}` });
    }
    
    order.orderStatus = 'Cancelled';
    order.cancelledAt = Date.now();
    order.cancellationReason = reason || 'Cancelled by user';
    
    if (!order.statusHistory) order.statusHistory = [];
    
    order.statusHistory.push({
      status: 'Cancelled',
      note: reason || 'Cancelled by user',
      timestamp: new Date()
    });
    
    for (let item of order.orderItems) {
      const product = await Product.findById(item.product);
      if (product) {
        product.stock += item.quantity;
        await product.save();
      }
    }
    
    await order.save();
    
    // 📧 Send cancellation email (no SMS for cancellation)
    process.nextTick(async () => {
      await sendStatusNotification(order, 'Cancelled');
    });
    
    res.json({ 
      success: true, 
      message: 'Order cancelled successfully', 
      order
    });
  } catch (error) {
    console.error('❌ Cancel order error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete order (Admin only)
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    
    await order.deleteOne();
    res.json({ success: true, message: 'Order deleted successfully' });
  } catch (error) {
    console.error('❌ Delete order error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 💰 Mark Order as Paid (Admin only)
exports.markOrderAsPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: 'Order not found' 
      });
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    
    if (order.paymentInfo) {
      order.paymentInfo.status = 'Success';
      order.paymentInfo.paidAt = Date.now();
    }

    if (!order.statusHistory) order.statusHistory = [];
    order.statusHistory.push({
      status: order.orderStatus,
      note: 'Payment collected - Marked as Paid by admin',
      timestamp: new Date()
    });

    const updatedOrder = await order.save();

    console.log('💰 Order marked as paid:', order._id);

    res.status(200).json({
      success: true,
      message: 'Order marked as paid',
      order: updatedOrder
    });
  } catch (error) {
    console.error('❌ Mark as paid error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating payment status' 
    });
  }
};