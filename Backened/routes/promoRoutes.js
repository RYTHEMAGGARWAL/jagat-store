// Backend/routes/promoRoutes.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Order = require('../models/Order');

// 📱 Send SMS via Fast2SMS (EXACT same as OTP - working code)
async function sendPromoSMS(phones, message) {
  try {
    const FAST2SMS_API_KEY = process.env.FAST2SMS_API_KEY;
    
    if (!FAST2SMS_API_KEY) {
      console.log('⚠️ Fast2SMS not configured');
      return { return: false, message: 'API key missing' };
    }
    
    const numbers = phones.join(',');
    console.log('📱 Sending to:', phones.length, 'numbers');
    
    const response = await fetch('https://www.fast2sms.com/dev/bulkV2', {
      method: 'POST',
      headers: {
        'authorization': FAST2SMS_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        route: 'q',
        message: message,
        language: 'english', 
        flash: 0,
        numbers: numbers
      })
    });

    const data = await response.json();
    console.log('📱 Fast2SMS Response:', JSON.stringify(data, null, 2));
    
    return data;
  } catch (error) {
    console.error('❌ Promo SMS error:', error.message);
    return { return: false, message: error.message };
  }
}

// 📊 Get customer stats for promo
router.get('/stats', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin only' });
    }
    
    // All unique phones from ORDERS (same as send logic)
    const allOrders = await Order.find({}).select('shippingAddress createdAt');
    
    const allPhones = new Set();
    const last30Phones = new Set();
    const last7Phones = new Set();
    
    const now = new Date();
    const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
    
    allOrders.forEach(order => {
      if (order.shippingAddress?.phone) {
        const cleanPhone = order.shippingAddress.phone.replace(/\D/g, '').slice(-10);
        if (cleanPhone.length === 10) {
          allPhones.add(cleanPhone);
          
          const orderDate = new Date(order.createdAt);
          if (orderDate >= thirtyDaysAgo) {
            last30Phones.add(cleanPhone);
          }
          if (orderDate >= sevenDaysAgo) {
            last7Phones.add(cleanPhone);
          }
        }
      }
    });
    
    res.json({
      success: true,
      stats: {
        allCustomers: allPhones.size,
        last30Days: last30Phones.size,
        last7Days: last7Phones.size
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
      // All unique phones from orders
      const orders = await Order.find({}).select('shippingAddress');
      orders.forEach(order => {
        if (order.shippingAddress?.phone) {
          const cleanPhone = order.shippingAddress.phone.replace(/\D/g, '').slice(-10);
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

// 🧪 Send TEST SMS to single number
router.post('/test', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin only' });
    }
    
    const { phone, message } = req.body;
    
    if (!phone || !message) {
      return res.status(400).json({ success: false, message: 'Phone and message required' });
    }
    
    const cleanPhone = phone.replace(/\D/g, '').slice(-10);
    
    if (cleanPhone.length !== 10) {
      return res.status(400).json({ success: false, message: 'Invalid phone number' });
    }
    
    console.log(`🧪 Sending TEST SMS to: ${cleanPhone}`);
    
    const result = await sendPromoSMS([cleanPhone], message);
    
    if (result.return === true) {
      res.json({
        success: true,
        message: `✅ Test SMS sent to ${cleanPhone}!`
      });
    } else {
      res.status(400).json({
        success: false,
        message: result.message || 'SMS failed. Check Fast2SMS balance.'
      });
    }
    
  } catch (error) {
    console.error('❌ Test SMS error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;