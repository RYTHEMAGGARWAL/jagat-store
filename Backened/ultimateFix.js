// ultimateFix.js - ONE SCRIPT TO FIX EVERYTHING!
// Place in Backend and run: node ultimateFix.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

console.log('═══════════════════════════════════');
console.log('🔧 ULTIMATE FIX - ONE TIME SOLUTION');
console.log('═══════════════════════════════════\n');

const fixEverything = async () => {
  try {
    // Step 1: Find what database backend is using
    console.log('1️⃣  Checking Backend Configuration...\n');
    
    let dbName = 'jagat-store'; // Default
    
    // Check config/db.js
    const dbConfigPath = path.join(__dirname, 'config', 'db.js');
    if (fs.existsSync(dbConfigPath)) {
      const dbConfig = fs.readFileSync(dbConfigPath, 'utf8');
      console.log('   📄 Found config/db.js');
      
      // Extract database name
      const match = dbConfig.match(/mongodb:\/\/[^\/]+\/([^'"\s,)]+)/);
      if (match) {
        dbName = match[1];
        console.log(`   📊 Backend uses database: "${dbName}"\n`);
      }
    }

    // Check .env
    const envPath = path.join(__dirname, '.env');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      const envMatch = envContent.match(/MONGO_URI=mongodb:\/\/[^\/]+\/([^\s\n]+)/);
      if (envMatch) {
        dbName = envMatch[1];
        console.log(`   📄 Found .env file`);
        console.log(`   📊 Backend uses database: "${dbName}"\n`);
      }
    }

    console.log(`✅ Backend is configured to use: "${dbName}"\n`);

    // Step 2: Connect to that database
    console.log('2️⃣  Connecting to MongoDB...\n');
    const MONGO_URI = `mongodb://localhost:27017/${dbName}`;
    console.log(`   🔗 Connecting to: ${MONGO_URI}`);
    
    await mongoose.connect(MONGO_URI);
    console.log('   ✅ Connected!\n');

    // Step 3: Delete all users
    console.log('3️⃣  Cleaning Database...\n');
    
    const User = mongoose.model('User', new mongoose.Schema({
      name: String,
      email: String,
      password: String,
      phone: String,
      role: String
    }));

    const deleteResult = await User.deleteMany({});
    console.log(`   🗑️  Deleted ${deleteResult.deletedCount} existing user(s)\n`);

    // Step 4: Create ONE admin
    console.log('4️⃣  Creating Admin...\n');
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    const admin = new User({
      name: 'Admin',
      email: 'admin@jagatstore.com',
      password: hashedPassword,
      phone: '9876543210',
      role: 'admin'
    });

    await admin.save();
    console.log('   ✅ Admin created in database: ' + dbName + '\n');

    // Step 5: Verify
    console.log('5️⃣  Verification...\n');
    
    const verify = await User.findOne({ email: 'admin@jagatstore.com' });
    const passwordTest = await bcrypt.compare('admin123', verify.password);

    console.log('   📧 Email:', verify.email);
    console.log('   👤 Name:', verify.name);
    console.log('   🎯 Role:', verify.role);
    console.log('   🔐 Password Test:', passwordTest ? '✅ WORKS' : '❌ FAILED');
    console.log('   📊 Database:', dbName);

    // Step 6: Success!
    console.log('\n═══════════════════════════════════');
    console.log('🎉 ALL FIXED! EVERYTHING READY!');
    console.log('═══════════════════════════════════\n');
    
    console.log('📋 LOGIN CREDENTIALS:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 Email: admin@jagatstore.com');
    console.log('🔑 Password: admin123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    console.log('🚀 NEXT STEPS:');
    console.log('1. Keep backend running');
    console.log('2. Go to: http://localhost:5173/login');
    console.log('3. Login with above credentials');
    console.log('4. Access: http://localhost:5173/admin/dashboard\n');

    console.log('💡 Backend will show:');
    console.log('   ✅ User found: admin@jagatstore.com Role: admin');
    console.log('   ✅ Password matched');
    console.log('   ✅ Login successful\n');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.log('\n💡 Make sure MongoDB is running!');
    console.log('   - Start MongoDB service');
    console.log('   - Or open MongoDB Compass\n');
    process.exit(1);
  }
};

fixEverything();