// Backend/routes/otpRoutes.js - OTP + Welcome SMS
const express = require('express');
const router = express.Router();

const FAST2SMS = {
  OTP: '205107',      // 1 var: OTP
  WELCOME: '205126'   // 1 var: Name 🆕
};
const SENDER_ID = 'JGATST';

const otpStore = new Map();
const OTP_EXPIRY = 10 * 60 * 1000;

function generateOTP() { return Math.floor(100000 + Math.random() * 900000).toString(); }

async function sendFast2SMS(phone, messageId, variablesValues) {
  try {
    const cleanPhone = phone.toString().replace(/\D/g, '').slice(-10);
    if (cleanPhone.length !== 10) return { success: false, error: 'Invalid phone' };
    
    console.log('📱 SMS:', { phone: cleanPhone, messageId, variables: variablesValues });
    
    const body = { route: 'dlt', sender_id: SENDER_ID, message: messageId, numbers: cleanPhone, flash: 0 };
    if (variablesValues) body.variables_values = variablesValues;
    
    const response = await fetch('https://www.fast2sms.com/dev/bulkV2', {
      method: 'POST',
      headers: { 'authorization': process.env.FAST2SMS_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    console.log('📱 Response:', JSON.stringify(data));
    
    if (data.return === true) { console.log('✅ SMS sent to:', cleanPhone); return { success: true }; }
    return { success: false, error: data.message };
  } catch (error) { return { success: false, error: error.message }; }
}

// Send OTP
router.post('/send', async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ success: false, message: 'Phone required' });
    const cleanPhone = phone.toString().replace(/\D/g, '').slice(-10);
    if (cleanPhone.length !== 10) return res.status(400).json({ success: false, message: 'Invalid phone' });
    
    const existing = otpStore.get(cleanPhone);
    if (existing && existing.attempts >= 3) {
      const left = Math.ceil((existing.expiresAt - Date.now()) / 60000);
      return res.status(429).json({ success: false, message: `Too many attempts. Try in ${left} min.` });
    }
    
    const otp = generateOTP();
    // 205107: Dear Customer, Your OTP for JAGAT STORE is {OTP}. Valid for 10 minutes...
    const result = await sendFast2SMS(cleanPhone, FAST2SMS.OTP, otp);
    if (!result.success) return res.status(500).json({ success: false, message: 'Failed to send OTP' });
    
    otpStore.set(cleanPhone, { otp, expiresAt: Date.now() + OTP_EXPIRY, attempts: (existing?.attempts || 0) + 1 });
    setTimeout(() => otpStore.delete(cleanPhone), OTP_EXPIRY);
    res.json({ success: true, message: `OTP sent to ${cleanPhone.slice(0,2)}****${cleanPhone.slice(-2)}` });
  } catch (error) { res.status(500).json({ success: false, message: 'Failed' }); }
});

// Verify OTP
router.post('/verify', async (req, res) => {
  try {
    const { phone, otp } = req.body;
    if (!phone || !otp) return res.status(400).json({ success: false, message: 'Phone & OTP required' });
    const cleanPhone = phone.toString().replace(/\D/g, '').slice(-10);
    const stored = otpStore.get(cleanPhone);
    if (!stored) return res.status(400).json({ success: false, message: 'OTP expired' });
    if (Date.now() > stored.expiresAt) { otpStore.delete(cleanPhone); return res.status(400).json({ success: false, message: 'OTP expired' }); }
    if (stored.otp !== otp) return res.status(400).json({ success: false, message: 'Invalid OTP' });
    otpStore.delete(cleanPhone);
    res.json({ success: true, message: 'OTP verified!', verified: true });
  } catch (error) { res.status(500).json({ success: false, message: 'Failed' }); }
});

// Resend OTP
router.post('/resend', async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ success: false, message: 'Phone required' });
    const cleanPhone = phone.toString().replace(/\D/g, '').slice(-10);
    otpStore.delete(cleanPhone);
    const otp = generateOTP();
    const result = await sendFast2SMS(cleanPhone, FAST2SMS.OTP, otp);
    if (!result.success) return res.status(500).json({ success: false, message: 'Failed' });
    otpStore.set(cleanPhone, { otp, expiresAt: Date.now() + OTP_EXPIRY, attempts: 1 });
    setTimeout(() => otpStore.delete(cleanPhone), OTP_EXPIRY);
    res.json({ success: true, message: 'New OTP sent!' });
  } catch (error) { res.status(500).json({ success: false, message: 'Failed' }); }
});

// 🆕 Send Welcome SMS (for registration)
router.post('/welcome', async (req, res) => {
  try {
    const { phone, name } = req.body;
    if (!phone || !name) return res.status(400).json({ success: false, message: 'Phone & name required' });
    // 205126: Welcome to JAGAT STORE, {Name}! Thank you for registering...
    const result = await sendFast2SMS(phone, FAST2SMS.WELCOME, name);
    if (result.success) res.json({ success: true, message: 'Welcome SMS sent!' });
    else res.status(500).json({ success: false, message: 'Failed to send' });
  } catch (error) { res.status(500).json({ success: false, message: 'Failed' }); }
});

module.exports = router;