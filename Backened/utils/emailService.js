// Backend/utils/emailService.js - Email Notification System

const nodemailer = require('nodemailer');

// Email Configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'jagatstore@gmail.com', // Your Gmail
    pass: process.env.EMAIL_PASSWORD || 'your-app-password' // Gmail App Password
  }
});

// Send Order Notification to Admin
const sendAdminOrderNotification = async (order) => {
  try {
    const mailOptions = {
      from: '"Jagat Store" <jagatstore@gmail.com>',
      to: 'admin@jagatstore.com', // Admin email
      subject: `🔔 NEW ORDER RECEIVED - #${order._id.toString().slice(-8).toUpperCase()}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background: #f5f5f5;
              margin: 0;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: white;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
            }
            .content {
              padding: 30px;
            }
            .order-details {
              background: #f8f9fa;
              border-radius: 8px;
              padding: 20px;
              margin: 20px 0;
            }
            .detail-row {
              display: flex;
              justify-content: space-between;
              padding: 10px 0;
              border-bottom: 1px solid #e0e0e0;
            }
            .detail-row:last-child {
              border-bottom: none;
            }
            .label {
              font-weight: 600;
              color: #666;
            }
            .value {
              font-weight: 700;
              color: #1a1a1a;
            }
            .items-list {
              margin: 20px 0;
            }
            .item {
              padding: 10px;
              background: #f8f9fa;
              border-radius: 8px;
              margin-bottom: 10px;
            }
            .btn {
              display: inline-block;
              padding: 14px 30px;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              text-decoration: none;
              border-radius: 8px;
              font-weight: 700;
              margin-top: 20px;
            }
            .footer {
              background: #f8f9fa;
              padding: 20px;
              text-align: center;
              color: #666;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔔 NEW ORDER ALERT!</h1>
              <p>A new order has been placed on Jagat Store</p>
            </div>
            
            <div class="content">
              <h2>Order Details</h2>
              
              <div class="order-details">
                <div class="detail-row">
                  <span class="label">Order ID:</span>
                  <span class="value">#${order._id.toString().slice(-8).toUpperCase()}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Customer:</span>
                  <span class="value">${order.user.name}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Phone:</span>
                  <span class="value">${order.shippingAddress.phone}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Total Amount:</span>
                  <span class="value">₹${order.totalPrice}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Payment Method:</span>
                  <span class="value">${order.paymentMethod}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Status:</span>
                  <span class="value" style="color: #ff9800;">${order.orderStatus}</span>
                </div>
              </div>

              <h3>Order Items (${order.orderItems.length})</h3>
              <div class="items-list">
                ${order.orderItems.map(item => `
                  <div class="item">
                    <strong>${item.name}</strong> - Qty: ${item.quantity} × ₹${item.price} = ₹${item.quantity * item.price}
                  </div>
                `).join('')}
              </div>

              <h3>Delivery Address</h3>
              <div class="order-details">
                <p style="margin: 0;">${order.shippingAddress.fullAddress}</p>
                <p style="margin: 5px 0 0 0;">${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}</p>
              </div>

              <center>
                <a href="http://localhost:5173/admin/orders/${order._id}" class="btn">
                  View in Admin Panel
                </a>
              </center>
            </div>

            <div class="footer">
              <p>This is an automated notification from Jagat Store</p>
              <p>&copy; ${new Date().getFullYear()} Jagat Store. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Admin notification email sent');
    return { success: true };
  } catch (error) {
    console.error('❌ Error sending admin email:', error);
    return { success: false, error: error.message };
  }
};

// Send Thank You Email to Customer
const sendCustomerOrderConfirmation = async (order) => {
  try {
    const mailOptions = {
      from: '"Jagat Store" <jagatstore@gmail.com>',
      to: order.user.email,
      subject: `✅ Order Confirmed - #${order._id.toString().slice(-8).toUpperCase()}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background: #f5f5f5;
              margin: 0;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: white;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            }
            .header {
              background: linear-gradient(135deg, #54b226 0%, #45a01e 100%);
              color: white;
              padding: 40px;
              text-align: center;
            }
            .header h1 {
              margin: 0 0 10px 0;
              font-size: 32px;
            }
            .checkmark {
              font-size: 60px;
              margin-bottom: 10px;
            }
            .content {
              padding: 30px;
            }
            .order-details {
              background: #f8f9fa;
              border-radius: 8px;
              padding: 20px;
              margin: 20px 0;
            }
            .detail-row {
              display: flex;
              justify-content: space-between;
              padding: 10px 0;
              border-bottom: 1px solid #e0e0e0;
            }
            .detail-row:last-child {
              border-bottom: none;
            }
            .label {
              font-weight: 600;
              color: #666;
            }
            .value {
              font-weight: 700;
              color: #1a1a1a;
            }
            .delivery-info {
              background: #e3f2fd;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
              text-align: center;
            }
            .delivery-info h3 {
              margin: 0 0 10px 0;
              color: #1976d2;
            }
            .items-list {
              margin: 20px 0;
            }
            .item {
              padding: 15px;
              background: #f8f9fa;
              border-radius: 8px;
              margin-bottom: 10px;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .btn {
              display: inline-block;
              padding: 14px 30px;
              background: linear-gradient(135deg, #54b226 0%, #45a01e 100%);
              color: white;
              text-decoration: none;
              border-radius: 8px;
              font-weight: 700;
              margin: 10px 5px;
            }
            .footer {
              background: #f8f9fa;
              padding: 20px;
              text-align: center;
              color: #666;
              font-size: 14px;
            }
            .total {
              font-size: 24px;
              color: #54b226;
              font-weight: 800;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="checkmark">✅</div>
              <h1>Order Confirmed!</h1>
              <p>Thank you for shopping with Jagat Store</p>
            </div>
            
            <div class="content">
              <h2>Hi ${order.user.name},</h2>
              <p>Your order has been successfully placed and confirmed. We're preparing your items for delivery.</p>

              <div class="delivery-info">
                <h3>🚚 Delivery in 40 minutes</h3>
                <p>Your order will be delivered to:</p>
                <p><strong>${order.shippingAddress.fullAddress}</strong></p>
                <p>${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}</p>
              </div>

              <h3>Order Summary</h3>
              <div class="order-details">
                <div class="detail-row">
                  <span class="label">Order ID:</span>
                  <span class="value">#${order._id.toString().slice(-8).toUpperCase()}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Order Date:</span>
                  <span class="value">${new Date(order.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Payment Method:</span>
                  <span class="value">${order.paymentMethod}</span>
                </div>
              </div>

              <h3>Items Ordered (${order.orderItems.length})</h3>
              <div class="items-list">
                ${order.orderItems.map(item => `
                  <div class="item">
                    <div>
                      <strong>${item.name}</strong><br>
                      <small>Qty: ${item.quantity} × ₹${item.price}</small>
                    </div>
                    <div style="font-weight: 700;">₹${item.quantity * item.price}</div>
                  </div>
                `).join('')}
              </div>

              <div class="order-details">
                <div class="detail-row">
                  <span class="label">Subtotal:</span>
                  <span class="value">₹${order.itemsPrice}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Delivery:</span>
                  <span class="value" style="color: #4caf50;">FREE</span>
                </div>
                <div class="detail-row">
                  <span class="label">Tax:</span>
                  <span class="value">₹${order.taxPrice}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Total:</span>
                  <span class="total">₹${order.totalPrice}</span>
                </div>
              </div>

              // <center>
              //   <a href="http://localhost:5173/my-orders" class="btn">
              //     Track Your Order
              //   </a>
              //   <a href="http://localhost:5173" class="btn" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
              //     Continue Shopping
              //   </a>
              // </center>

              <p style="margin-top: 30px; color: #666; font-size: 14px;">
                If you have any questions, feel free to contact us at rythemaggarwal7840@gmail.com
              </p>
            </div>

            <div class="footer">
              <p><strong>Thank you for choosing Jagat Store!</strong></p>
              <p>&copy; ${new Date().getFullYear()} Jagat Store. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Customer confirmation email sent to:', order.user.email);
    return { success: true };
  } catch (error) {
    console.error('❌ Error sending customer email:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendAdminOrderNotification,
  sendCustomerOrderConfirmation
};