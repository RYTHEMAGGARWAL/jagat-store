// Backend/test-email.js - Email Testing Script

const nodemailer = require('nodemailer');
require('dotenv').config();

async function testEmail() {
  console.log('📧 Testing Email Configuration...\n');
  
  console.log('Config:');
  console.log('EMAIL_USER:', process.env.EMAIL_USER);
  console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? '****' + process.env.EMAIL_PASSWORD.slice(-4) : 'NOT SET');
  console.log('ADMIN_EMAIL:', process.env.ADMIN_EMAIL);
  console.log('ENABLE_EMAIL_NOTIFICATIONS:', process.env.ENABLE_EMAIL_NOTIFICATIONS);
  console.log('\n');

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    console.log('✅ Transporter created');

    // Verify connection
    await transporter.verify();
    console.log('✅ Gmail connection verified');

    // Send test email
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: '🧪 Test Email from Jagat Store',
      html: `
        <div style="font-family: Arial; padding: 20px; background: #f5f5f5;">
          <div style="background: white; padding: 30px; border-radius: 10px; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #54b226;">✅ Email Configuration Working!</h1>
            <p>This is a test email from Jagat Store backend.</p>
            <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>From:</strong> ${process.env.EMAIL_USER}</p>
            <p><strong>To:</strong> ${process.env.ADMIN_EMAIL}</p>
            <p style="margin-top: 20px; color: #666;">If you received this email, your email configuration is correct! 🎉</p>
          </div>
        </div>
      `
    });

    console.log('✅ Test email sent successfully!');
    console.log('📧 Message ID:', info.messageId);
    console.log('\n✅ EMAIL WORKING! Check inbox:', process.env.ADMIN_EMAIL);

  } catch (error) {
    console.error('❌ Email Error:', error.message);
    
    if (error.code === 'EAUTH') {
      console.log('\n⚠️  AUTHENTICATION FAILED!');
      console.log('Solutions:');
      console.log('1. Enable 2-Step Verification on Gmail');
      console.log('2. Generate App Password: https://myaccount.google.com/apppasswords');
      console.log('3. Use App Password (16 chars, no spaces) in .env');
      console.log('4. Make sure EMAIL_USER and EMAIL_PASSWORD are correct');
    } else if (error.code === 'ECONNECTION') {
      console.log('\n⚠️  CONNECTION FAILED!');
      console.log('Check your internet connection');
    } else {
      console.log('\nFull Error:', error);
    }
  }
}

testEmail();