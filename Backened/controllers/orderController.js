console.log('NEW ORDERCONTROLLER LOADED - SUPER FAST MODE ACTIVATED');

const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const User = require('../models/User');
const nodemailer = require('nodemailer');

// FIXED & OPTIMIZED createOrder - 3 सेकंड में Order Place!
// सिर्फ़ createOrder function को ये वाला पेस्ट कर दो (बाकी file वैसी ही)

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
      totalPrice
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

    // Create order
    const order = await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentInfo: { method: paymentMethod, status: 'Pending' },
      itemsPrice, taxPrice, shippingPrice, totalPrice,
      orderStatus: 'Processing'
    });

    // Clear cart (background)
    Cart.findOneAndUpdate({ user: req.user._id }, { items: [], totalPrice: 0 }).catch(() => {});

    // TURANT RESPONSE → 3 सेकंड में success page!
    res.json({
      success: true,
      message: 'Order placed!',
      order: { _id: order._id, totalPrice }
    });

    // BACKGROUND MEIN SAB KUCH (email + stock)
    process.nextTick(async () => {
      const user = await User.findById(req.user._id).catch(() => null);
      const shortId = order._id.toString().slice(-8).toUpperCase();
      const date = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

      // Items HTML for both emails
      const itemsHTML = orderItems.map((item, i) => `
        <tr style="border-bottom:1px solid #eee;">
          <td style="padding:12px 8px;">${i + 1}. ${item.name}</td>
          <td style="padding:12px 8px; text-align:center;">${item.quantity}</td>
          <td style="padding:12px 8px; text-align:right;">₹${item.price}</td>
          <td style="padding:12px 8px; text-align:right; font-weight:bold;">₹${item.price * item.quantity}</td>
        </tr>
      `).join('');

      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'Rythemaggarwal7840@gmail.com',
            pass: 'falfhjejmjbwkohy'
          }
        });

        // ADMIN EMAIL - Pro & Detailed
        await transporter.sendMail({
          from: '"Jagat Store" <Rythemaggarwal7840@gmail.com>',
          to: 'Rythemaggarwal7840@gmail.com',
          subject: `NEW ORDER #${shortId} | ₹${totalPrice} | ${user?.name || 'Guest'}`,
          html: `
            <div style="font-family:Arial,sans-serif; max-width:600px; margin:auto; border:1px solid #ddd; border-radius:12px; overflow:hidden;">
              <div style="background:linear-gradient(135deg,#667eea,#764ba2); color:white; padding:20px; text-align:center;">
                <h1 style="margin:0;">NEW ORDER RECEIVED!</h1>
                <p style="margin:5px 0 0; font-size:18px;">Order #${shortId}</p>
              </div>
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
                <h3>Order Items (${orderItems.length})</h3>
                <table width="100%" style="border-collapse:collapse;">
                  <thead>
                    <tr style="background:#667eea; color:white;">
                      <th style="padding:10px; text-align:left;">Item</th>
                      <th style="padding:10px;">Qty</th>
                      <th style="padding:10px; text-align:right;">Price</th>
                      <th style="padding:10px; text-align:right;">Total</th>
                    </tr>
                  </thead>
                  <tbody>${itemsHTML}</tbody>
                </table>
                <div style="margin-top:20px; text-align:right; font-size:18px;">
                  <strong>Total Amount: ₹${totalPrice}</strong>
                </div>
              </div>
              <div style="background:#2c3e50; color:white; padding:15px; text-align:center; font-size:12px;">
                © 2025 Jagat Store | Ghaziabad
              </div>
            </div>
          `
        });

        // CUSTOMER EMAIL - Sweet & Thank You
        if (user?.email) {
          await transporter.sendMail({
            from: '"Jagat Store" <Rythemaggarwal7840@gmail.com>',
            to: user.email,
            subject: `Order Confirmed #${shortId} | Thank You ${user.name.split(' ')[0]}!`,
            html: `
              <div style="font-family:Arial,sans-serif; max-width:600px; margin:auto; border:1px solid #ddd; border-radius:12px; overflow:hidden;">
                <div style="background:linear-gradient(135deg,#11998e,#38ef7d); color:white; padding:30px; text-align:center;">
                  <h1 style="margin:0;">Thank You for Your Order!</h1>
                  <p style="margin:10px 0 0; font-size:20px;">Order #${shortId}</p>
                </div>
                <div style="padding:25px; text-align:center; background:#f8fff9;">
                  <p style="font-size:18px;">Hi <strong>${user.name.split(' ')[0]}</strong>,</p>
                  <p>Your order has been confirmed and is being prepared with love!</p>
                  <p><strong>Delivery in 40 minutes</strong></p>
                </div>
                <div style="padding:20px; background:#f0f8ff;">
                  <h3>Your Order Summary</h3>
                  <table width="100%" style="border-collapse:collapse;">
                    ${itemsHTML}
                  </table>
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
                  <p style="margin:5px 0 0; font-size:24px;">Jagat Store</p>
                </div>
              </div>
            `
          });
        }

        console.log('BOTH EMAILS SENT SUCCESSFULLY!');

        // Stock update (last mein)
        for (let item of orderItems) {
          await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
        }

      } catch (err) {
        console.error('Background tasks failed (no issue):', err.message);
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
    
    res.json({
      success: true,
      orders
    });
  } catch (error) {
    console.error('❌ Get my orders error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all orders (Admin only)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email phone')
      .populate('orderItems.product')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      orders
    });
  } catch (error) {
    console.error('❌ Get all orders error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email phone');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    res.json({
      success: true,
      order
    });
  } catch (error) {
    console.error('❌ Get order error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update order status (Admin only)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status, note } = req.body;
    
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    order.orderStatus = status;
    
    if (!order.statusHistory) {
      order.statusHistory = [];
    }
    
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
    
    res.json({
      success: true,
      message: 'Order status updated successfully',
      order
    });
  } catch (error) {
    console.error('❌ Update status error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Cancel order
exports.cancelOrder = async (req, res) => {
  try {
    const { reason } = req.body;
    
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }
    
    if (['Delivered', 'Cancelled'].includes(order.orderStatus)) {
      return res.status(400).json({
        success: false,
        message: `Cannot cancel order with status: ${order.orderStatus}`
      });
    }
    
    order.orderStatus = 'Cancelled';
    order.cancelledAt = Date.now();
    order.cancellationReason = reason || 'Cancelled by user';
    
    if (!order.statusHistory) {
      order.statusHistory = [];
    }
    
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
    
    res.json({
      success: true,
      message: 'Order cancelled successfully',
      order
    });
  } catch (error) {
    console.error('❌ Cancel order error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete order (Admin only)
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    await order.deleteOne();
    
    res.json({
      success: true,
      message: 'Order deleted successfully'
    });
  } catch (error) {
    console.error('❌ Delete order error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};