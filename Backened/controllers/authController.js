const User = require('../models/User');
const Cart = require('../models/Cart');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';

// Store OTPs temporarily (in production, use Redis)
const otpStore = new Map();

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// ============================================================
// 📱 SEND SMS OTP - Using Fast2SMS (Quick SMS Route)
// ============================================================
const sendSmsOTP = async (phone, otp) => {
  try {
    const FAST2SMS_API_KEY = process.env.FAST2SMS_API_KEY;

    if (!FAST2SMS_API_KEY) {
      console.log('⚠️ Fast2SMS not configured, OTP:', otp);
      return true;
    }

    // Method 1: Try Quick Transactional SMS (no DLT, no verification needed)
    const message = `Your OTP for Jagat Store is ${otp}. Valid for 10 minutes. Do not share with anyone.`;
    
    const response = await fetch('https://www.fast2sms.com/dev/bulkV2', {
      method: 'POST',
      headers: {
        'authorization': FAST2SMS_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        route: 'q', // Quick SMS route
        message: message,
        language: 'english',
        flash: 0,
        numbers: phone
      })
    });

    const data = await response.json();

    if (data.return === true) {
      console.log('✅ SMS OTP sent to:', phone);
      console.log('📱 Message ID:', data.request_id);
      return true;
    } else {
      console.error('❌ Fast2SMS error:', data);
      console.log('📱 DEV MODE - OTP for', phone, ':', otp);
      return true;
    }
  } catch (error) {
    console.error('❌ SMS send failed:', error.message);
    console.log('📱 DEV MODE - OTP for', phone, ':', otp);
    return true;
  }
};

// ============================================================
// 📧 SEND EMAIL - Using Resend API
// ============================================================
const sendEmail = async (to, subject, html) => {
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
};

// ============================================================
// 🔐 TOKEN & COOKIE HELPERS
// ============================================================
const COOKIE_OPTIONS = {
  httpOnly: false,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  path: '/'
};

const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();
  
  res.cookie('token', token, COOKIE_OPTIONS);
  
  res.status(statusCode).json({
    success: true,
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isPhoneVerified: user.isPhoneVerified
    }
  });
};

// ============================================================
// 📱 REGISTRATION OTP FUNCTIONS (NEW)
// ============================================================

// @desc    Send OTP for Registration
// @route   POST /api/auth/send-register-otp
// @access  Public
exports.sendRegisterOtp = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // Validation
    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and phone number'
      });
    }

    // Validate phone number (10 digits)
    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid 10-digit phone number'
      });
    }

    // Check if phone already exists
    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      return res.status(400).json({
        success: false,
        message: 'Phone number already registered. Please login.'
      });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered. Please login.'
      });
    }

    // Generate OTP
    const otp = generateOTP();

    // Store OTP with user data (10 minute expiry)
    otpStore.set(`register_${phone}`, {
      otp,
      name,
      email,
      phone,
      expiresAt: Date.now() + 10 * 60 * 1000
    });

    console.log(`📱 Register OTP for ${phone}: ${otp}`);

    // Send SMS OTP
    const smsSent = await sendSmsOTP(phone, otp);

    if (!smsSent) {
      return res.status(500).json({
        success: false,
        message: 'Failed to send OTP. Please try again.'
      });
    }

    res.json({
      success: true,
      message: 'OTP sent successfully to your phone'
    });

  } catch (error) {
    console.error('Send Register OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send OTP. Please try again.'
    });
  }
};

// @desc    Verify OTP and Complete Registration
// @route   POST /api/auth/verify-register-otp
// @access  Public
exports.verifyRegisterOtp = async (req, res) => {
  try {
    const { name, email, phone, otp } = req.body;

    // Validation
    if (!phone || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Phone and OTP are required'
      });
    }

    // Get stored OTP data
    const storedData = otpStore.get(`register_${phone}`);

    if (!storedData) {
      return res.status(400).json({
        success: false,
        message: 'OTP expired or not found. Please request a new one.'
      });
    }

    // Check expiry
    if (Date.now() > storedData.expiresAt) {
      otpStore.delete(`register_${phone}`);
      return res.status(400).json({
        success: false,
        message: 'OTP has expired. Please request a new one.'
      });
    }

    // Verify OTP
    if (storedData.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP. Please try again.'
      });
    }

    // Create user (without password - OTP based registration)
    const user = new User({
      name: storedData.name || name,
      email: storedData.email || email,
      phone: phone,
      isPhoneVerified: true,
      role: 'user'
    });

    await user.save();

    // Create empty cart for user
    try {
      await Cart.create({ user: user._id, items: [] });
    } catch (cartError) {
      console.log('Cart creation skipped:', cartError.message);
    }

    // Clear OTP
    otpStore.delete(`register_${phone}`);

    console.log(`✅ User registered via OTP: ${phone}`);

    // Send welcome email
    await sendEmail(
      user.email,
      '🎉 Welcome to Jagat Store!',
      `
<!DOCTYPE html>
<html>
<body style="font-family: Arial; margin: 0; padding: 0; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
          <tr>
            <td style="background: linear-gradient(135deg, #0f3460 0%, #1a1a2e 100%); padding: 40px; text-align: center;">
              <div style="font-size: 60px;">🛒</div>
              <h1 style="color: white; margin: 10px 0 0 0; font-size: 28px;">Welcome to Jagat Store!</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: #333; margin: 0 0 15px 0;">Hello ${user.name}! 👋</h2>
              <p style="color: #666; font-size: 16px; line-height: 1.6;">
                Thank you for creating your account. You're all set to start shopping!
              </p>
              <div style="background: #e8f5e9; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4caf50;">
                <p style="margin: 0; color: #2e7d32; font-size: 14px;">
                  <strong>📱 Phone:</strong> +91 ${user.phone} (Verified ✅)<br>
                  <strong>📧 Email:</strong> ${user.email}
                </p>
              </div>
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://jagatstore.in" 
                   style="display: inline-block; padding: 15px 30px; background: linear-gradient(135deg, #0f3460 0%, #1a1a2e 100%); color: white; text-decoration: none; border-radius: 50px; font-weight: bold;">
                  Start Shopping 🛍️
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0; color: #666; font-size: 14px;">Jagat Store - Happy Shopping!</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `
    );

    // Send token and login user
    sendToken(user, 201, res);

  } catch (error) {
    console.error('Verify Register OTP error:', error);
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        success: false,
        message: `${field === 'phone' ? 'Phone number' : 'Email'} already registered`
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Registration failed. Please try again.'
    });
  }
};

// ============================================================
// 📱 LOGIN OTP FUNCTIONS (NEW)
// ============================================================

// @desc    Send OTP for Login
// @route   POST /api/auth/send-login-otp
// @access  Public
exports.sendLoginOtp = async (req, res) => {
  try {
    const { phone } = req.body;

    // Validation
    if (!phone) {
      return res.status(400).json({
        success: false,
        message: 'Please provide phone number'
      });
    }

    // Validate phone number
    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid 10-digit phone number'
      });
    }

    // Check if user exists
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No account found with this phone number. Please register first.'
      });
    }

    // Generate OTP
    const otp = generateOTP();

    // Store OTP (5 minute expiry for login)
    otpStore.set(`login_${phone}`, {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000
    });

    console.log(`📱 Login OTP for ${phone}: ${otp}`);

    // Send SMS OTP
    const smsSent = await sendSmsOTP(phone, otp);

    if (!smsSent) {
      return res.status(500).json({
        success: false,
        message: 'Failed to send OTP. Please try again.'
      });
    }

    res.json({
      success: true,
      message: 'OTP sent successfully to your phone'
    });

  } catch (error) {
    console.error('Send Login OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send OTP. Please try again.'
    });
  }
};

// @desc    Verify OTP and Login
// @route   POST /api/auth/verify-login-otp
// @access  Public
exports.verifyLoginOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    // Validation
    if (!phone || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Phone and OTP are required'
      });
    }

    // Get stored OTP
    const storedData = otpStore.get(`login_${phone}`);

    if (!storedData) {
      return res.status(400).json({
        success: false,
        message: 'OTP expired or not found. Please request a new one.'
      });
    }

    // Check expiry
    if (Date.now() > storedData.expiresAt) {
      otpStore.delete(`login_${phone}`);
      return res.status(400).json({
        success: false,
        message: 'OTP has expired. Please request a new one.'
      });
    }

    // Verify OTP
    if (storedData.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP. Please try again.'
      });
    }

    // Find user
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update phone verified status
    if (!user.isPhoneVerified) {
      user.isPhoneVerified = true;
      await user.save();
    }

    // Clear OTP
    otpStore.delete(`login_${phone}`);

    console.log(`✅ User logged in via OTP: ${phone}`);

    // Send token
    sendToken(user, 200, res);

  } catch (error) {
    console.error('Verify Login OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed. Please try again.'
    });
  }
};

// ============================================================
// 🔐 EXISTING AUTH FUNCTIONS
// ============================================================

// @desc    Register with Password (keeping for backward compatibility)
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    
    const user = await User.create({ name, email, phone, password });
    
    try {
      await Cart.create({ user: user._id, items: [] });
    } catch (cartError) {
      console.log('Cart creation skipped:', cartError.message);
    }
    
    sendToken(user, 201, res);
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        success: false,
        message: `${field === 'phone' ? 'Phone number' : 'Email'} already registered`
      });
    }
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Login with Password
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check if user has password (OTP registered users might not have)
    if (!user.password) {
      return res.status(401).json({
        success: false,
        message: 'Please login with OTP. No password set for this account.'
      });
    }
    
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
    
    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Logout
// @route   GET /api/auth/logout
// @access  Public
exports.logout = async (req, res) => {
  res.cookie('token', '', { ...COOKIE_OPTIONS, expires: new Date(0) });
  
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
};

// @desc    Get Profile
// @route   GET /api/auth/me
// @access  Private
exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json({ 
    success: true, 
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isPhoneVerified: user.isPhoneVerified
    }
  });
};

// ============================================================
// 🔑 FORGOT PASSWORD FUNCTIONS (Email OTP - Existing)
// ============================================================

// @desc    Send OTP to email for password reset
// @route   POST /api/auth/forgot-password
// @access  Public
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No account found with this email'
      });
    }

    const otp = generateOTP();
    
    otpStore.set(email, {
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000
    });

    console.log(`🔑 Password Reset OTP for ${email}: ${otp}`);

    const emailSent = await sendEmail(
      email,
      '🔐 Password Reset OTP - Jagat Store',
      `
<!DOCTYPE html>
<html>
<body style="font-family: Arial; margin: 0; padding: 0; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
          <tr>
            <td style="background: linear-gradient(135deg, #0f3460 0%, #1a1a2e 100%); padding: 40px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">🔐 Password Reset</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 30px; text-align: center;">
              <h2 style="color: #333; margin: 0 0 20px 0;">Hello ${user.name},</h2>
              <p style="color: #666; font-size: 16px; line-height: 1.6;">
                We received a request to reset your password for your Jagat Store account.
              </p>
              <div style="background: linear-gradient(135deg, #0f3460 0%, #1a1a2e 100%); padding: 25px; border-radius: 12px; margin: 30px 0;">
                <p style="color: white; margin: 0 0 10px 0; font-size: 14px;">Your OTP Code:</p>
                <p style="color: white; margin: 0; font-size: 36px; font-weight: bold; letter-spacing: 8px;">${otp}</p>
              </div>
              <p style="color: #666; font-size: 14px; margin: 20px 0;">
                This OTP will expire in <strong style="color: #f44336;">10 minutes</strong>
              </p>
              <p style="color: #999; font-size: 13px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                If you didn't request this, please ignore this email.
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0; color: #666; font-size: 14px;">Jagat Store - Secure Shopping</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `
    );

    if (!emailSent) {
      return res.status(500).json({
        success: false,
        message: 'Failed to send OTP email. Please try again.'
      });
    }

    res.json({
      success: true,
      message: 'OTP sent to your email'
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send OTP. Please try again.'
    });
  }
};

// @desc    Verify email OTP
// @route   POST /api/auth/verify-otp
// @access  Public
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const storedOTP = otpStore.get(email);
    
    if (!storedOTP) {
      return res.status(400).json({
        success: false,
        message: 'OTP expired or not found. Please request a new one.'
      });
    }

    if (Date.now() > storedOTP.expiresAt) {
      otpStore.delete(email);
      return res.status(400).json({
        success: false,
        message: 'OTP has expired. Please request a new one.'
      });
    }

    if (storedOTP.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP. Please try again.'
      });
    }

    res.json({
      success: true,
      message: 'OTP verified successfully'
    });

  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify OTP'
    });
  }
};

// @desc    Reset password
// @route   POST /api/auth/reset-password
// @access  Public
exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const storedOTP = otpStore.get(email);
    
    if (!storedOTP || storedOTP.otp !== otp || Date.now() > storedOTP.expiresAt) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP'
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Set new password (will be hashed by pre-save hook)
    user.password = newPassword;
    await user.save();

    otpStore.delete(email);

    console.log(`✅ Password reset successful for: ${email}`);

    // Send confirmation email
    await sendEmail(
      email,
      '✅ Password Changed Successfully - Jagat Store',
      `
<!DOCTYPE html>
<html>
<body style="font-family: Arial; margin: 0; padding: 0; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
          <tr>
            <td style="background: linear-gradient(135deg, #54b226 0%, #45a01e 100%); padding: 40px; text-align: center;">
              <div style="font-size: 60px;">✅</div>
              <h1 style="color: white; margin: 10px 0 0 0; font-size: 28px;">Password Changed!</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: #333; margin: 0 0 15px 0;">Hello ${user.name},</h2>
              <p style="color: #666; font-size: 16px; line-height: 1.6;">
                Your password has been successfully changed.
              </p>
              <div style="background: #e8f5e9; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4caf50;">
                <p style="margin: 0; color: #2e7d32; font-size: 14px;">
                  <strong>Changed on:</strong> ${new Date().toLocaleString('en-IN')}<br>
                  <strong>Account:</strong> ${email}
                </p>
              </div>
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://jagatstore.in/login" 
                   style="display: inline-block; padding: 15px 30px; background: linear-gradient(135deg, #0f3460 0%, #1a1a2e 100%); color: white; text-decoration: none; border-radius: 50px; font-weight: bold;">
                  Login Now
                </a>
              </div>
              <p style="color: #f44336; font-size: 13px; background: #ffebee; padding: 15px; border-radius: 8px; margin-top: 30px;">
                <strong>⚠️ Security Alert:</strong> If you didn't make this change, please contact us immediately!
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0; color: #666; font-size: 14px;">Jagat Store - Your Account Security</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `
    );

    res.json({
      success: true,
      message: 'Password reset successful'
    });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reset password'
    });
  }
};