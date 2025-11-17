// createAdminNow.js - Creates admin with EXACT email
// Place in Backend and run: node createAdminNow.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGO_URI = "mongodb+srv://rythemaggarwal7840:Rythem7840@cluster0.obezyro.mongodb.net/?appName=Cluster0";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  role: String
});

const User = mongoose.model('User', userSchema);

const createAdminNow = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected!\n');

    const email = 'rythemaggarwal7840@gmail.com';

    // Delete existing user if any
    await User.deleteOne({ email });
    console.log('🗑️  Deleted any existing user\n');

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    // Create admin
    const admin = new User({
      name: 'Admin',
      email: email,
      password: hashedPassword,
      phone: '9876543210',
      role: 'admin'
    });

    await admin.save();

    console.log('🎉 ADMIN CREATED!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 Email:', email);
    console.log('🔑 Password: admin123');
    console.log('👤 Role: admin');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Verify
    const check = await User.findOne({ email });
    console.log('✅ VERIFICATION:');
    console.log('   Found:', check ? 'YES' : 'NO');
    console.log('   Email:', check?.email);
    console.log('   Role:', check?.role);
    console.log('   Password Hash:', check?.password.substring(0, 20) + '...\n');

    console.log('🌐 NOW GO LOGIN:');
    console.log('   http://localhost:5173/login');
    console.log('   Email: rythemaggarwal7840@gmail.com');
    console.log('   Password: admin123\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

createAdminNow();