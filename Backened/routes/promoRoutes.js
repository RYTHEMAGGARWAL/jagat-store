// Backend/routes/promoRoutes.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Order = require('../models/Order');

// 📱 Send SMS via Fast2SMS
async function sendPromoSMS(phones, message) {
  try {
    // Join all phone numbers with comma
    const numbers = phones.join(',');
    
    const response = await fetch('https://www.fast2sms.com/dev/bulkV2', {
      method: 'POST',
      headers: {
        'authorization': process.env.FAST2SMS_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        route: 'q',  // Quick route for promotional
        message: message,
        language: 'english',
        flash: 0,
        numbers: numbers
      })
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('❌ Promo SMS error:', error.message);
    throw error;
  }
}

// 📊 Get customer stats for promo
router.get('/stats', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin only' });
    }
    
    // All unique customers with phone numbers
    const allCustomers = await User.find({ phone: { $exists: true, $ne: '' } }).select('phone');
    
    // Customers who ordered in last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentOrders = await Order.find({ 
      createdAt: { $gte: thirtyDaysAgo } 
    }).populate('user', 'phone');
    
    const recentPhones = new Set();
    recentOrders.forEach(order => {
      if (order.shippingAddress?.phone) {
        recentPhones.add(order.shippingAddress.phone.replace(/\D/g, '').slice(-10));
      }
      if (order.user?.phone) {
        recentPhones.add(order.user.phone.replace(/\D/g, '').slice(-10));
      }
    });
    
    // Customers who ordered in last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const weekOrders = await Order.find({ 
      createdAt: { $gte: sevenDaysAgo } 
    }).populate('user', 'phone');
    
    const weekPhones = new Set();
    weekOrders.forEach(order => {
      if (order.shippingAddress?.phone) {
        weekPhones.add(order.shippingAddress.phone.replace(/\D/g, '').slice(-10));
      }
    });
    
    res.json({
      success: true,
      stats: {
        allCustomers: allCustomers.length,
        last30Days: recentPhones.size,
        last7Days: weekPhones.size
      }
    });
  } catch (error) {
    console.error('❌ Stats error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// 📱 Send promotional SMS
router.post('/send', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin only' });
    }
    
    const { message, targetGroup } = req.body;
    
    if (!message || message.length < 10) {
      return res.status(400).json({ success: false, message: 'Message too short' });
    }
    
    if (message.length > 160) {
      return res.status(400).json({ success: false, message: 'Message too long (max 160 chars)' });
    }
    
    let phones = new Set();
    
    if (targetGroup === 'all') {
      // All customers from orders
      const orders = await Order.find({}).select('shippingAddress');
      orders.forEach(order => {
        if (order.shippingAddress?.phone) {
          const cleanPhone = order.shippingAddress.phone.replace(/\D/g, '').slice(-10);
          if (cleanPhone.length === 10) {
            phones.add(cleanPhone);
          }
        }
      });
      
      // All users with phone
      const users = await User.find({ phone: { $exists: true } }).select('phone');
      users.forEach(user => {
        if (user.phone) {
          const cleanPhone = user.phone.replace(/\D/g, '').slice(-10);
          if (cleanPhone.length === 10) {
            phones.add(cleanPhone);
          }
        }
      });
      
    } else if (targetGroup === 'last30days') {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const orders = await Order.find({ createdAt: { $gte: thirtyDaysAgo } }).select('shippingAddress');
      orders.forEach(order => {
        if (order.shippingAddress?.phone) {
          const cleanPhone = order.shippingAddress.phone.replace(/\D/g, '').slice(-10);
          if (cleanPhone.length === 10) {
            phones.add(cleanPhone);
          }
        }
      });
      
    } else if (targetGroup === 'last7days') {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const orders = await Order.find({ createdAt: { $gte: sevenDaysAgo } }).select('shippingAddress');
      orders.forEach(order => {
        if (order.shippingAddress?.phone) {
          const cleanPhone = order.shippingAddress.phone.replace(/\D/g, '').slice(-10);
          if (cleanPhone.length === 10) {
            phones.add(cleanPhone);
          }
        }
      });
    }
    
    const phoneArray = Array.from(phones);
    
    if (phoneArray.length === 0) {
      return res.status(400).json({ success: false, message: 'No customers found' });
    }
    
    console.log(`📱 Sending promo SMS to ${phoneArray.length} customers...`);
    
    // Send SMS in batches of 50 (Fast2SMS limit)
    const batchSize = 50;
    let successCount = 0;
    let failCount = 0;
    
    for (let i = 0; i < phoneArray.length; i += batchSize) {
      const batch = phoneArray.slice(i, i + batchSize);
      try {
        const result = await sendPromoSMS(batch, message);
        if (result.return === true) {
          successCount += batch.length;
        } else {
          failCount += batch.length;
        }
      } catch (err) {
        failCount += batch.length;
      }
    }
    
    console.log(`✅ Promo SMS sent: ${successCount} success, ${failCount} failed`);
    
    res.json({
      success: true,
      message: `SMS sent to ${successCount} customers!`,
      details: {
        total: phoneArray.length,
        success: successCount,
        failed: failCount,
        estimatedCost: `₹${(successCount * 0.15).toFixed(2)} - ₹${(successCount * 0.20).toFixed(2)}`
      }
    });
    
  } catch (error) {
    console.error('❌ Send promo error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;