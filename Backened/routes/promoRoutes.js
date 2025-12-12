// Backend/routes/promoRoutes.js - ALL 8 PROMO TEMPLATES
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Order = require('../models/Order');
const auth = require('../middleware/auth');

// ============================================
// 📱 ALL PROMO MESSAGE IDs (599106)
// ============================================
const FAST2SMS_PROMO = {
  MYSTERY_GIFT: '205111',        // 1 var: Amount
  FREE_DELIVERY: '205112',       // 1 var: Amount
  FESTIVAL_SALE: '205113',       // 2 vars: Festival|Discount
  DISCOUNT_CODE: '205114',       // 2 vars: Discount|Code
  FESTIVAL_POOJA: '205122',      // 1 var: Festival 🆕
  WELCOME_PROMO: '205123',       // 0 vars 🆕
  FREE_DELIVERY_HINDI: '205124', // 1 var: Amount 🆕
  BUDGET_FRIENDLY: '205125'      // 1 var: Amount 🆕
};

const SENDER_ID = '599106';

const adminOnly = (req, res, next) => { 
  if (req.user && req.user.role === 'admin') next(); 
  else res.status(403).json({ success: false, message: 'Admin only' }); 
};

async function sendFast2SMS(phone, messageId, variablesValues = null) {
  try {
    const cleanPhone = phone.toString().replace(/\D/g, '').slice(-10);
    if (cleanPhone.length !== 10) return { success: false, error: 'Invalid phone' };
    
    console.log('📱 Promo SMS:', { phone: cleanPhone, messageId, variables: variablesValues });
    
    const body = { route: 'dlt', sender_id: SENDER_ID, message: messageId, numbers: cleanPhone, flash: 0 };
    if (variablesValues) body.variables_values = variablesValues;
    
    const response = await fetch('https://www.fast2sms.com/dev/bulkV2', {
      method: 'POST',
      headers: { 'authorization': process.env.FAST2SMS_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    console.log('📱 Response:', JSON.stringify(data));
    return { success: data.return === true, data };
  } catch (error) { return { success: false, error: error.message }; }
}

async function sendBulkPromoSMS(phones, messageId, variablesValues = null) {
  let success = 0, failed = 0;
  for (const phone of phones) { 
    const result = await sendFast2SMS(phone, messageId, variablesValues); 
    if (result.success) success++; else failed++; 
    await new Promise(r => setTimeout(r, 100)); 
  }
  return { success, failed };
}

// Get customer stats
router.get('/stats', auth, adminOnly, async (req, res) => {
  try {
    const allCustomers = await User.countDocuments({ phone: { $exists: true, $ne: null, $ne: '' } });
    const d30 = new Date(); d30.setDate(d30.getDate() - 30);
    const d7 = new Date(); d7.setDate(d7.getDate() - 7);
    const last30 = await Order.distinct('user', { createdAt: { $gte: d30 } });
    const last7 = await Order.distinct('user', { createdAt: { $gte: d7 } });
    res.json({ success: true, stats: { allCustomers, last30Days: last30.length, last7Days: last7.length } });
  } catch (error) { res.status(500).json({ success: false, message: 'Failed' }); }
});

// Get all available templates
router.get('/templates', auth, adminOnly, async (req, res) => {
  res.json({
    success: true,
    templates: [
      { id: 'mystery_gift', name: '🎁 Mystery Gift', variables: ['amount'], example: '999' },
      { id: 'free_delivery', name: '🚚 Free Delivery (Eng)', variables: ['amount'], example: '499' },
      { id: 'festival_sale', name: '🎉 Festival Sale', variables: ['festival', 'discount'], example: 'Winter|50' },
      { id: 'discount_code', name: '💰 Discount Code', variables: ['discount', 'code'], example: '20|JAGAT20' },
      { id: 'festival_pooja', name: '🪔 Festival Pooja', variables: ['festival'], example: 'Diwali' },
      { id: 'welcome_promo', name: '👋 Welcome/Intro', variables: [], example: '' },
      { id: 'free_delivery_hindi', name: '🚚 Free Delivery (Hindi)', variables: ['amount'], example: '399' },
      { id: 'budget_friendly', name: '💵 Budget Friendly', variables: ['amount'], example: '299' }
    ]
  });
});

// Test SMS to single number
router.post('/test', auth, adminOnly, async (req, res) => {
  try {
    const { phone, templateType = 'welcome_promo', variable1, variable2 } = req.body;
    if (!phone) return res.status(400).json({ success: false, message: 'Phone required' });
    
    let messageId, variablesValues = null;
    
    switch (templateType) {
      case 'mystery_gift':
        messageId = FAST2SMS_PROMO.MYSTERY_GIFT;
        variablesValues = variable1 || '999';
        break;
      case 'free_delivery':
        messageId = FAST2SMS_PROMO.FREE_DELIVERY;
        variablesValues = variable1 || '499';
        break;
      case 'festival_sale':
        messageId = FAST2SMS_PROMO.FESTIVAL_SALE;
        variablesValues = `${variable1 || 'Winter'}|${variable2 || '50'}`;
        break;
      case 'discount_code':
      case 'discount':
        messageId = FAST2SMS_PROMO.DISCOUNT_CODE;
        variablesValues = `${variable1 || '20'}|${variable2 || 'JAGAT20'}`;
        break;
      case 'festival_pooja':
        messageId = FAST2SMS_PROMO.FESTIVAL_POOJA;
        variablesValues = variable1 || 'Diwali';
        break;
      case 'welcome_promo':
        messageId = FAST2SMS_PROMO.WELCOME_PROMO;
        variablesValues = null;
        break;
      case 'free_delivery_hindi':
        messageId = FAST2SMS_PROMO.FREE_DELIVERY_HINDI;
        variablesValues = variable1 || '399';
        break;
      case 'budget_friendly':
        messageId = FAST2SMS_PROMO.BUDGET_FRIENDLY;
        variablesValues = variable1 || '299';
        break;
      case 'festival':
        messageId = FAST2SMS_PROMO.FESTIVAL_SALE;
        variablesValues = `${variable1 || 'Winter'}|${variable2 || '50'}`;
        break;
      default:
        messageId = FAST2SMS_PROMO.WELCOME_PROMO;
        variablesValues = null;
    }
    
    const result = await sendFast2SMS(phone, messageId, variablesValues);
    if (result.success) res.json({ success: true, message: `✅ Sent to ${phone}!` });
    else res.status(400).json({ success: false, message: `❌ Failed: ${result.error || result.data?.message}` });
  } catch (error) { res.status(500).json({ success: false, message: 'Failed' }); }
});

// Send bulk promo SMS
router.post('/send', auth, adminOnly, async (req, res) => {
  try {
    const { targetGroup, templateType = 'welcome_promo', variable1, variable2 } = req.body;
    const hour = new Date().getHours();
    if (hour < 9 || hour >= 21) return res.status(400).json({ success: false, message: '⏰ Promotional SMS only 9AM-9PM' });
    
    // Get target phones
    let phones = [];
    if (targetGroup === 'all') { 
      const users = await User.find({ phone: { $exists: true, $ne: null, $ne: '' } }).select('phone'); 
      phones = users.map(u => u.phone); 
    }
    else if (targetGroup === 'last30days') { 
      const d = new Date(); d.setDate(d.getDate() - 30); 
      const orders = await Order.find({ createdAt: { $gte: d } }).populate('user', 'phone'); 
      const s = new Set(); orders.forEach(o => { if (o.user?.phone) s.add(o.user.phone); }); 
      phones = Array.from(s); 
    }
    else if (targetGroup === 'last7days') { 
      const d = new Date(); d.setDate(d.getDate() - 7); 
      const orders = await Order.find({ createdAt: { $gte: d } }).populate('user', 'phone'); 
      const s = new Set(); orders.forEach(o => { if (o.user?.phone) s.add(o.user.phone); }); 
      phones = Array.from(s); 
    }
    if (phones.length === 0) return res.status(400).json({ success: false, message: 'No customers found' });
    
    let messageId, variablesValues = null;
    switch (templateType) {
      case 'mystery_gift': messageId = FAST2SMS_PROMO.MYSTERY_GIFT; variablesValues = variable1 || '999'; break;
      case 'free_delivery': messageId = FAST2SMS_PROMO.FREE_DELIVERY; variablesValues = variable1 || '499'; break;
      case 'festival_sale': case 'festival': messageId = FAST2SMS_PROMO.FESTIVAL_SALE; variablesValues = `${variable1 || 'Winter'}|${variable2 || '50'}`; break;
      case 'discount_code': case 'discount': messageId = FAST2SMS_PROMO.DISCOUNT_CODE; variablesValues = `${variable1 || '20'}|${variable2 || 'JAGAT20'}`; break;
      case 'festival_pooja': messageId = FAST2SMS_PROMO.FESTIVAL_POOJA; variablesValues = variable1 || 'Diwali'; break;
      case 'welcome_promo': messageId = FAST2SMS_PROMO.WELCOME_PROMO; variablesValues = null; break;
      case 'free_delivery_hindi': messageId = FAST2SMS_PROMO.FREE_DELIVERY_HINDI; variablesValues = variable1 || '399'; break;
      case 'budget_friendly': messageId = FAST2SMS_PROMO.BUDGET_FRIENDLY; variablesValues = variable1 || '299'; break;
      default: messageId = FAST2SMS_PROMO.WELCOME_PROMO; variablesValues = null;
    }
    
    const results = await sendBulkPromoSMS(phones, messageId, variablesValues);
    const cost = `₹${(results.success * 0.12).toFixed(2)} - ₹${(results.success * 0.15).toFixed(2)}`;
    
    res.json({ 
      success: true, 
      message: '📱 Campaign completed!', 
      details: { total: phones.length, success: results.success, failed: results.failed, estimatedCost: cost } 
    });
  } catch (error) { res.status(500).json({ success: false, message: 'Failed' }); }
});

// Quick routes
router.post('/mystery-gift', auth, adminOnly, async (req, res) => {
  try {
    const { phones, amount = '999' } = req.body;
    if (!phones || phones.length === 0) return res.status(400).json({ success: false, message: 'Phones required' });
    const results = await sendBulkPromoSMS(phones, FAST2SMS_PROMO.MYSTERY_GIFT, amount);
    res.json({ success: true, message: `Sent to ${results.success} customers`, details: results });
  } catch (error) { res.status(500).json({ success: false, message: 'Failed' }); }
});

router.post('/free-delivery', auth, adminOnly, async (req, res) => {
  try {
    const { phones, amount = '399' } = req.body;
    if (!phones || phones.length === 0) return res.status(400).json({ success: false, message: 'Phones required' });
    const results = await sendBulkPromoSMS(phones, FAST2SMS_PROMO.FREE_DELIVERY_HINDI, amount);
    res.json({ success: true, message: `Sent to ${results.success} customers`, details: results });
  } catch (error) { res.status(500).json({ success: false, message: 'Failed' }); }
});

router.post('/festival', auth, adminOnly, async (req, res) => {
  try {
    const { phones, festival = 'Diwali' } = req.body;
    if (!phones || phones.length === 0) return res.status(400).json({ success: false, message: 'Phones required' });
    const results = await sendBulkPromoSMS(phones, FAST2SMS_PROMO.FESTIVAL_POOJA, festival);
    res.json({ success: true, message: `Sent to ${results.success} customers`, details: results });
  } catch (error) { res.status(500).json({ success: false, message: 'Failed' }); }
});

module.exports = router;