console.log('NEW ORDERCONTROLLER LOADED - WITH RESEND EMAIL 📧');

const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const User = require('../models/User');

// 🎁 GIFT CONFIGURATION
const GIFT_THRESHOLD = 999;
const GIFT_PRODUCT = {
  name: '🎁 FREE Gift - Premium Ice Cream Pack',
  brand: 'Jagat Store',
  category: 'Gift',
  price: 0,
  oldPrice: 149,
  quantity: 1,
  weight: '500ml',
  image: 'https://m.media-amazon.com/images/I/81nRsEQCprL._SL1500_.jpg',
  isGift: true
};

// 📧 SEND EMAIL USING RESEND API (Works on Render!)
async function sendEmail(to, subject, html) {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Jagat Store <onboarding@resend.dev>',
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

// FIXED & OPTIMIZED createOrder
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
            🎁 <strong>FREE GIFT</strong> - ${finalGiftItem?.name || 'Premium Ice Cream Pack'}
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
        const adminEmail = process.env.ADMIN_EMAIL || 'Rythemaggarwal7840@gmail.com';

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
                    <p style="margin:10px 0 0; font-size:16px;">You got a FREE Premium Ice Cream Pack (Worth ₹${giftSavings})!</p>
                  </div>
                ` : ''}
                
                <div style="padding:25px; text-align:center; background:#f8fff9;">
                  <p style="font-size:18px;">Hi <strong>${user.name.split(' ')[0]}</strong>,</p>
                  <p>Your order has been confirmed and is being prepared with love!</p>
                  <p><strong>Delivery in 40 minutes</strong></p>
                </div>
                <div style="padding:20px; background:#f0f8ff;">
                  <h3>Your Order Summary</h3>
                  <table width="100%" style="border-collapse:collapse;">
                    ${itemsHTML}
                    ${giftHTML}
                  </table>
                  ${finalHasGift ? `
                    <div style="background:#e8f5e9; padding:15px; border-radius:8px; margin-top:15px; text-align:center; border:2px dashed #4caf50;">
                      <p style="margin:0; color:#2e7d32; font-weight:bold;">🎁 You saved ₹${giftSavings} with your FREE gift!</p>
                    </div>
                  ` : ''}
                  <div style="margin-top:20px; text-align:right; font-size:20px; color:#11998e;">
                    <strong>Total: ₹${totalPrice} (COD)</strong>
                  </div>
                </div>
                <div style="padding:20px; text-align:center; background:#fff;">
                  <p>Delivery Address:</p>
                  <p style="font-weight:bold;">${shippingAddress.fullAddress}</p>
                  <p>Phone: ${shippingAddress.phone}</p>
                </div>
                <div style="background:#11998e; color:white; padding:20px; text-align:center;">
                  <p style="margin:0; font-size:16px;">We deliver happiness!</p>
                  <p style="margin:5px 0 0; font-size:24px;">🏪 Jagat Store</p>
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

// Update order status (Admin only)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status, note } = req.body;
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    
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
      
      for (let item of order.orderItems) {
        const product = await Product.findById(item.product);
        if (product) {
          product.stock += item.quantity;
          await product.save();
        }
      }
    }
    
    await order.save();
    res.json({ success: true, message: 'Order status updated successfully', order });
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
    res.json({ success: true, message: 'Order cancelled successfully', order });
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