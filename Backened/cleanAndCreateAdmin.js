// cleanAndCreateAdmin.js - Delete all users and create ONE admin
// Place in Backend and run: node cleanAndCreateAdmin.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGO_URI = 'mongodb://localhost:27017/jagat-store';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  role: String
});

const User = mongoose.model('User', userSchema);

const cleanAndCreateAdmin = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to jagat-store database\n');

    // Delete ALL users
    console.log('🗑️  Deleting all existing users...');
    const deleteResult = await User.deleteMany({});
    console.log(`   ✅ Deleted ${deleteResult.deletedCount} user(s)\n`);

    // Create ONE clean admin
    console.log('👤 Creating ONE admin user...');
    
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

    console.log('✅ Admin created successfully!\n');

    // Verify
    console.log('🔍 Verification:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━');
    const allUsers = await User.find({});
    console.log(`   Total users in database: ${allUsers.length}`);
    
    if (allUsers.length === 1) {
      const user = allUsers[0];
      console.log(`   📧 Email: ${user.email}`);
      console.log(`   👤 Name: ${user.name}`);
      console.log(`   🎯 Role: ${user.role}`);
      console.log(`   📞 Phone: ${user.phone}`);
      console.log(`   🔐 Password Hash: ${user.password.substring(0, 25)}...`);
    }

    console.log('\n═══════════════════════════════════');
    console.log('🎉 SETUP COMPLETE!');
    console.log('═══════════════════════════════════');
    console.log('\n📋 LOGIN CREDENTIALS:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 Email: admin@jagatstore.com');
    console.log('🔑 Password: admin123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n🌐 NOW GO LOGIN:');
    console.log('   http://localhost:5173/login\n');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.log('\n💡 Make sure:');
    console.log('   - MongoDB is running');
    console.log('   - Database name is correct in config/db.js');
    process.exit(1);
  }
};

cleanAndCreateAdmin();