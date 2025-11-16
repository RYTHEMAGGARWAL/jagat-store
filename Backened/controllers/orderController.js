console.log('🔥 NEW ORDERCONTROLLER LOADED 🔥');

const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const User = require('../models/User');
const nodemailer = require('nodemailer');

console.log('📧 Nodemailer imported:', typeof nodemailer.createTransport);

exports.createOrder = async (req, res) => {
  console.log('🎯 NEW CREATE ORDER FUNCTION 🎯');
  
  try {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;
    
    console.log('📦 Order request from:', req.user.email);
    
    // Validate stock
    for (let item of orderItems) {
      const product = await Product.findById(item.product);
      if (!product || product.stock < item.quantity) {
        return res.status(400).json({ success: false, message: 'Stock issue' });
      }
    }
    
    // Create order
    const order = await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentInfo: { method: paymentMethod, status: paymentMethod === 'COD' ? 'Pending' : 'Success' },
      itemsPrice, taxPrice, shippingPrice, totalPrice,
      orderStatus: 'Processing'
    });
    
    console.log('✅ Order:', order._id);
    console.log('💾 user ID:', order.user);
    
    // EMAIL STARTS HERE
    try {
      console.log('🔔 EMAIL START');
      console.log('📧 Nodemailer type:', typeof nodemailer);
      console.log('📧 createTransport type:', typeof nodemailer.createTransport);
      
      const user = await User.findById(req.user._id);
      console.log('User:', user ? user.email : 'NOT FOUND');
      
      if (user && user.email) {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: { 
            user: 'Rythemaggarwal7840@gmail.com', 
            pass: 'falfhjejmjbwkohy' 
          }
        });
        
        console.log('✅ Transporter created');
        
        const orderIdShort = order._id.toString().slice(-8).toUpperCase();
        const orderDate = new Date().toLocaleString('en-IN', { 
          dateStyle: 'medium', 
          timeStyle: 'short' 
        });
        
        // Create items list HTML
        const itemsListHTML = order.orderItems.map((item, index) => `
          <tr style="border-bottom: 1px solid #e0e0e0;">
            <td style="padding: 15px 10px;">
              <strong>${index + 1}. ${item.name}</strong>
            </td>
            <td style="padding: 15px 10px; text-align: center;">x${item.quantity}</td>
            <td style="padding: 15px 10px; text-align: right;">₹${item.price}</td>
            <td style="padding: 15px 10px; text-align: right;"><strong>₹${item.price * item.quantity}</strong></td>
          </tr>
        `).join('');
        
        // 📧 ADMIN EMAIL - Professional & Detailed
        console.log('📧 Sending admin email...');
        await transporter.sendMail({
          from: '"Jagat Store 🛍️" <Rythemaggarwal7840@gmail.com>',
          to: 'Rythemaggarwal7840@gmail.com',
          subject: `🔔 New Order #${orderIdShort} - ₹${totalPrice} | ${user.name}`,
          html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: bold;">🎉 New Order Received!</h1>
              <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Order #${orderIdShort}</p>
            </td>
          </tr>
          
          <!-- Order Alert -->
          <tr>
            <td style="padding: 30px; background-color: #fff3cd; border-bottom: 3px solid #ffc107;">
              <p style="margin: 0; color: #856404; font-size: 16px; text-align: center;">
                <strong>⚡ Action Required:</strong> New order needs processing!
              </p>
            </td>
          </tr>
          
          <!-- Customer Info -->
          <tr>
            <td style="padding: 30px;">
              <h2 style="color: #333; margin: 0 0 20px 0; font-size: 20px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
                👤 Customer Information
              </h2>
              <table width="100%" cellpadding="8" style="background-color: #f8f9fa; border-radius: 8px;">
                <tr>
                  <td style="color: #666; width: 40%;"><strong>Name:</strong></td>
                  <td style="color: #333;"><strong>${user.name}</strong></td>
                </tr>
                <tr>
                  <td style="color: #666;"><strong>Email:</strong></td>
                  <td style="color: #333;">${user.email}</td>
                </tr>
                <tr>
                  <td style="color: #666;"><strong>Phone:</strong></td>
                  <td style="color: #333;"><strong>${shippingAddress.phone}</strong></td>
                </tr>
                <tr>
                  <td style="color: #666;"><strong>Order Date:</strong></td>
                  <td style="color: #333;">${orderDate}</td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Order Details -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <h2 style="color: #333; margin: 0 0 20px 0; font-size: 20px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
                📦 Order Details
              </h2>
              <table width="100%" cellpadding="0" style="border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
                <tr style="background-color: #667eea; color: white;">
                  <th style="padding: 12px 10px; text-align: left;">Item</th>
                  <th style="padding: 12px 10px; text-align: center;">Qty</th>
                  <th style="padding: 12px 10px; text-align: right;">Price</th>
                  <th style="padding: 12px 10px; text-align: right;">Total</th>
                </tr>
                ${itemsListHTML}
              </table>
              
              <!-- Price Summary -->
              <table width="100%" cellpadding="8" style="margin-top: 20px; background-color: #f8f9fa; border-radius: 8px;">
                <tr>
                  <td style="color: #666;">Subtotal:</td>
                  <td style="text-align: right; color: #333;">₹${itemsPrice}</td>
                </tr>
                <tr>
                  <td style="color: #666;">Tax (GST):</td>
                  <td style="text-align: right; color: #333;">₹${taxPrice}</td>
                </tr>
                <tr>
                  <td style="color: #666;">Shipping:</td>
                  <td style="text-align: right; color: #4caf50; font-weight: bold;">FREE</td>
                </tr>
                <tr style="border-top: 2px solid #667eea;">
                  <td style="color: #333; font-size: 18px; padding-top: 12px;"><strong>Grand Total:</strong></td>
                  <td style="text-align: right; color: #667eea; font-size: 24px; font-weight: bold; padding-top: 12px;">₹${totalPrice}</td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Payment & Delivery Info -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <table width="100%" cellpadding="0">
                <tr>
                  <td width="48%" style="background-color: #e3f2fd; padding: 15px; border-radius: 8px;">
                    <p style="margin: 0; color: #1976d2; font-size: 14px;"><strong>💳 Payment Method</strong></p>
                    <p style="margin: 5px 0 0 0; color: #333; font-size: 16px; font-weight: bold;">${paymentMethod}</p>
                  </td>
                  <td width="4%"></td>
                  <td width="48%" style="background-color: ${paymentMethod === 'COD' ? '#fff3e0' : '#e8f5e9'}; padding: 15px; border-radius: 8px;">
                    <p style="margin: 0; color: ${paymentMethod === 'COD' ? '#f57c00' : '#388e3c'}; font-size: 14px;"><strong>💰 Payment Status</strong></p>
                    <p style="margin: 5px 0 0 0; color: #333; font-size: 16px; font-weight: bold;">${paymentMethod === 'COD' ? 'Pending' : 'Paid'}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Delivery Address -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <h2 style="color: #333; margin: 0 0 15px 0; font-size: 20px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
                📍 Delivery Address
              </h2>
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea;">
                <p style="margin: 0; color: #333; font-size: 16px; line-height: 1.6;">
                  <strong>${shippingAddress.fullAddress}</strong><br>
                  ${shippingAddress.city}, ${shippingAddress.state}<br>
                  <strong>PIN Code:</strong> ${shippingAddress.pincode}<br>
                  <strong>Phone:</strong> ${shippingAddress.phone}
                </p>
              </div>
            </td>
          </tr>
          
          <!-- Action Button -->
          <tr>
            <td style="padding: 0 30px 40px 30px; text-align: center;">
              <a href="http://localhost:5173/admin/orders/${order._id}" 
                 style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4); transition: all 0.3s;">
                🚀 View & Process Order
              </a>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0 0 10px 0; color: #333; font-size: 16px; font-weight: bold;">Jagat Store Admin Panel</p>
              <p style="margin: 0; color: #666; font-size: 14px;">Process this order as soon as possible for quick delivery!</p>
              <p style="margin: 10px 0 0 0; color: #999; font-size: 12px;">This is an automated notification from Jagat Store</p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
          `
        });
        console.log('✅ ADMIN EMAIL SENT');
        
        // 📧 CUSTOMER EMAIL - Beautiful & Friendly
        console.log('📧 Sending customer email...');
        await transporter.sendMail({
          from: '"Jagat Store 🛍️" <Rythemaggarwal7840@gmail.com>',
          to: user.email,
          subject: `✅ Order Confirmed #${orderIdShort} - Thank You for Shopping!`,
          html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
          
          <!-- Header with Success Icon -->
          <tr>
            <td style="background: linear-gradient(135deg, #54b226 0%, #45a01e 100%); padding: 50px 30px; text-align: center;">
              <div style="background-color: white; width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                <span style="font-size: 50px;">✅</span>
              </div>
              <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: bold;">Order Confirmed!</h1>
              <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 18px; opacity: 0.95;">Thank you for shopping with us, ${user.name}!</p>
            </td>
          </tr>
          
          <!-- Success Message -->
          <tr>
            <td style="padding: 40px 30px 20px 30px; text-align: center;">
              <h2 style="color: #333; margin: 0 0 15px 0; font-size: 24px;">🎉 Your order is confirmed!</h2>
              <p style="color: #666; margin: 0; font-size: 16px; line-height: 1.6;">
                We've received your order and we're getting it ready for delivery.<br>
                You'll receive another email when your order ships.
              </p>
            </td>
          </tr>
          
          <!-- Order ID Card -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 12px; text-align: center;">
                <p style="color: white; margin: 0 0 5px 0; font-size: 14px; opacity: 0.9;">Order Number</p>
                <p style="color: white; margin: 0; font-size: 28px; font-weight: bold; letter-spacing: 2px;">#${orderIdShort}</p>
              </div>
            </td>
          </tr>
          
          <!-- Delivery Info Banner -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <div style="background-color: #e3f2fd; padding: 25px; border-radius: 12px; text-align: center; border: 2px dashed #2196f3;">
                <p style="margin: 0; color: #1976d2; font-size: 18px; font-weight: bold;">
                  🚚 Expected Delivery: Within 40 minutes
                </p>
                <p style="margin: 8px 0 0 0; color: #1976d2; font-size: 14px;">
                  We'll deliver to: <strong>${shippingAddress.city}</strong>
                </p>
              </div>
            </td>
          </tr>
          
          <!-- Order Summary -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <h3 style="color: #333; margin: 0 0 20px 0; font-size: 20px; border-bottom: 2px solid #54b226; padding-bottom: 10px;">
                📦 Order Summary
              </h3>
              <table width="100%" cellpadding="0" style="border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
                <tr style="background-color: #54b226; color: white;">
                  <th style="padding: 12px 10px; text-align: left;">Item</th>
                  <th style="padding: 12px 10px; text-align: center;">Qty</th>
                  <th style="padding: 12px 10px; text-align: right;">Price</th>
                  <th style="padding: 12px 10px; text-align: right;">Total</th>
                </tr>
                ${itemsListHTML}
              </table>
            </td>
          </tr>
          
          <!-- Price Breakdown -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <table width="100%" cellpadding="10" style="background-color: #f8f9fa; border-radius: 8px;">
                <tr>
                  <td style="color: #666;">Subtotal</td>
                  <td style="text-align: right; color: #333; font-weight: bold;">₹${itemsPrice}</td>
                </tr>
                <tr>
                  <td style="color: #666;">Tax (GST)</td>
                  <td style="text-align: right; color: #333; font-weight: bold;">₹${taxPrice}</td>
                </tr>
                <tr>
                  <td style="color: #666;">Delivery Charges</td>
                  <td style="text-align: right; color: #4caf50; font-weight: bold;">FREE 🎁</td>
                </tr>
                <tr style="border-top: 2px solid #54b226;">
                  <td style="color: #333; font-size: 20px; padding-top: 15px;"><strong>Total Amount</strong></td>
                  <td style="text-align: right; color: #54b226; font-size: 28px; font-weight: bold; padding-top: 15px;">₹${totalPrice}</td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Payment Info -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <div style="background-color: ${paymentMethod === 'COD' ? '#fff3e0' : '#e8f5e9'}; padding: 20px; border-radius: 8px; border-left: 4px solid ${paymentMethod === 'COD' ? '#ff9800' : '#4caf50'};">
                <p style="margin: 0; color: #333; font-size: 16px;">
                  <strong>💳 Payment Method:</strong> <span style="color: ${paymentMethod === 'COD' ? '#f57c00' : '#2e7d32'}; font-weight: bold;">${paymentMethod}</span>
                </p>
                <p style="margin: 8px 0 0 0; color: #666; font-size: 14px;">
                  ${paymentMethod === 'COD' ? '💵 Please keep exact change ready for delivery' : '✅ Payment successful! Your order is being processed'}
                </p>
              </div>
            </td>
          </tr>
          
          <!-- Delivery Address -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <h3 style="color: #333; margin: 0 0 15px 0; font-size: 20px; border-bottom: 2px solid #54b226; padding-bottom: 10px;">
                📍 Delivery Address
              </h3>
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #54b226;">
                <p style="margin: 0; color: #333; font-size: 16px; line-height: 1.8;">
                  <strong style="font-size: 18px;">${user.name}</strong><br>
                  ${shippingAddress.fullAddress}<br>
                  ${shippingAddress.city}, ${shippingAddress.state} - ${shippingAddress.pincode}<br>
                  📞 <strong>${shippingAddress.phone}</strong>
                </p>
              </div>
            </td>
          </tr>
          
          <!-- Action Buttons -->
          // <tr>
          //   <td style="padding: 0 30px 40px 30px; text-align: center;">
          //     <table width="100%" cellpadding="0">
          //       <tr>
          //         <td style="padding: 5px;">
          //           <a href="http://localhost:5173/my-orders" 
          //              style="display: block; padding: 16px 30px; background: linear-gradient(135deg, #54b226 0%, #45a01e 100%); color: white; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 15px rgba(84, 178, 38, 0.4);">
          //             📦 Track Your Order
          //           </a>
          //         </td>
          //         <td style="padding: 5px;">
          //           <a href="http://localhost:5173" 
          //              style="display: block; padding: 16px 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);">
          //             🛍️ Continue Shopping
          //           </a>
          //         </td>
          //       </tr>
          //     </table>
          //   </td>
          // </tr>
          
          <!-- Thank You Message -->
          <tr>
            <td style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 40px 30px; text-align: center; border-top: 1px solid #e0e0e0;">
              <h3 style="color: #54b226; margin: 0 0 15px 0; font-size: 24px;">Thank You for Shopping! 🙏</h3>
              <p style="color: #666; margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">
                We appreciate your business and hope you enjoy your purchase!<br>
                <strong>Please visit us again soon!</strong>
              </p>
              <div style="margin-top: 25px; padding-top: 25px; border-top: 1px solid #dee2e6;">
                <p style="margin: 0 0 5px 0; color: #333; font-size: 18px; font-weight: bold;">🛍️ Jagat Store</p>
                <p style="margin: 0; color: #999; font-size: 14px;">Your one-stop shop for everything!</p>
                <p style="margin: 15px 0 0 0; color: #666; font-size: 13px;">
                  Need help? Contact us at <a href="mailto:Rythemaggarwal7840@gmail.com" style="color: #54b226; text-decoration: none; font-weight: bold;">support@jagatstore.com</a>
                </p>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #2c3e50; padding: 20px 30px; text-align: center;">
              <p style="margin: 0; color: #95a5a6; font-size: 12px;">
                This email was sent to ${user.email}<br>
                © 2024 Jagat Store. All rights reserved.
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
          `
        });
        console.log('✅ CUSTOMER EMAIL SENT');
      }
    } catch (e) {
      console.log('❌ Email error:', e.message);
      console.log('Error details:', e);
    }
    
    // Stock update
    for (let item of orderItems) {
      await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
    }
    
    // Clear cart
    await Cart.findOneAndUpdate({ user: req.user._id }, { items: [], totalPrice: 0 });
    
    res.json({ success: true, order });
    
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ success: false, message: error.message });
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