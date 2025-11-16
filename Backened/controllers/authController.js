const User = require('../models/User');
const Cart = require('../models/Cart');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

// Store OTPs temporarily (in production, use Redis)
const otpStore = new Map();

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send Email Function
const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'Rythemaggarwal7840@gmail.com',
      pass: 'falfhjejmjbwkohy'
    }
  });

  await transporter.sendMail({
    from: '"Jagat Store 🔐" <Rythemaggarwal7840@gmail.com>',
    to,
    subject,
    html
  });
};

// Send token in cookie
const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();
  
  const options = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true
  };
  
  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    user,
    token
  });
};

// Register
exports.register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    
    const user = await User.create({ name, email, phone, password });
    await Cart.create({ user: user._id, items: [] });
    
    sendToken(user, 201, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Login
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

// Logout
exports.logout = async (req, res) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true
  });
  
  res.json({
    success: true,
    message: 'Logged out'
  });
};

// Get profile
exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json({ success: true, user });
};

// ==================== FORGOT PASSWORD FUNCTIONS ====================

// @route   POST /api/auth/forgot-password
// @desc    Send OTP to email
// @access  Public
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No account found with this email'
      });
    }

    // Generate OTP
    const otp = generateOTP();
    
    // Store OTP with 10 minute expiry
    otpStore.set(email, {
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000 // 10 minutes
    });

    console.log(`🔐 OTP for ${email}: ${otp}`); // For testing

    // Send OTP Email
    await sendEmail(
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
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">🔐 Password Reset</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 30px; text-align: center;">
              <h2 style="color: #333; margin: 0 0 20px 0;">Hello ${user.name},</h2>
              <p style="color: #666; font-size: 16px; line-height: 1.6;">
                We received a request to reset your password for your Jagat Store account.
              </p>
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 25px; border-radius: 12px; margin: 30px 0;">
                <p style="color: white; margin: 0 0 10px 0; font-size: 14px;">Your OTP Code:</p>
                <p style="color: white; margin: 0; font-size: 36px; font-weight: bold; letter-spacing: 8px;">${otp}</p>
              </div>
              <p style="color: #666; font-size: 14px; margin: 20px 0;">
                This OTP will expire in <strong style="color: #f44336;">10 minutes</strong>
              </p>
              <p style="color: #999; font-size: 13px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                If you didn't request this, please ignore this email and your password will remain unchanged.
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

// @route   POST /api/auth/verify-otp
// @desc    Verify OTP
// @access  Public
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Check if OTP exists
    const storedOTP = otpStore.get(email);
    
    if (!storedOTP) {
      return res.status(400).json({
        success: false,
        message: 'OTP expired or not found. Please request a new one.'
      });
    }

    // Check if expired
    if (Date.now() > storedOTP.expiresAt) {
      otpStore.delete(email);
      return res.status(400).json({
        success: false,
        message: 'OTP has expired. Please request a new one.'
      });
    }

    // Verify OTP
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

// @route   POST /api/auth/reset-password
// @desc    Reset password with OTP
// @access  Public
exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // Verify OTP again
    const storedOTP = otpStore.get(email);
    
    if (!storedOTP || storedOTP.otp !== otp || Date.now() > storedOTP.expiresAt) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP'
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    // Clear OTP
    otpStore.delete(email);

    console.log(`✅ Password reset successful for: ${email}`);

    // Send confirmation email to user
    await sendEmail(
      email,
      '✅ Password Changed Successfully',
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
              <p style="color: #666; font-size: 14px; margin: 20px 0;">
                You can now login with your new password.
              </p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="http://localhost:5173/login" 
                   style="display: inline-block; padding: 15px 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 50px; font-weight: bold;">
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

    // Send notification to admin
    await sendEmail(
      'Rythemaggarwal7840@gmail.com',
      '🔐 User Password Reset - Admin Notification',
      `
<!DOCTYPE html>
<html>
<body style="font-family: Arial; margin: 0; padding: 0; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
          <tr>
            <td style="background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">🔐 Password Reset Alert</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px;">
              <h3 style="color: #333; margin: 0 0 20px 0;">User Password Reset Notification</h3>
              <table width="100%" cellpadding="10" style="background-color: #f8f9fa; border-radius: 8px;">
                <tr>
                  <td style="color: #666;"><strong>User Name:</strong></td>
                  <td style="color: #333; font-weight: bold;">${user.name}</td>
                </tr>
                <tr>
                  <td style="color: #666;"><strong>Email:</strong></td>
                  <td style="color: #333;">${email}</td>
                </tr>
                <tr>
                  <td style="color: #666;"><strong>Reset Time:</strong></td>
                  <td style="color: #333;">${new Date().toLocaleString('en-IN')}</td>
                </tr>
                <tr>
                  <td style="color: #666;"><strong>Status:</strong></td>
                  <td style="color: #4caf50; font-weight: bold;">✅ Successful</td>
                </tr>
              </table>
              <p style="color: #666; font-size: 14px; margin-top: 20px;">
                This is an automated notification from the Jagat Store system.
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f8f9fa; padding: 15px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0; color: #999; font-size: 12px;">Jagat Store Admin Panel</p>
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