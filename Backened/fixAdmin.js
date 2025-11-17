// fixAdmin.js - Fix existing user to admin with correct password
// Place in Backend folder and run: node fixAdmin.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGO_URI =  "mongodb+srv://rythemaggarwal7840:Rythem7840@cluster0.obezyro.mongodb.net/?appName=Cluster0";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  role: { type: String, default: 'user' }
});

const User = mongoose.model('User', userSchema);

const fixAdmin = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    const email = 'Rythemaggarwal7840@gmail.com';

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      console.log('❌ User not found!');
      console.log('Creating new admin user...\n');

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);

      // Create admin
      const newAdmin = new User({
        name: 'Admin',
        email: email.toLowerCase(),
        password: hashedPassword,
        phone: '9876543210',
        role: 'admin'
      });

      await newAdmin.save();

      console.log('🎉 New admin created!');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('📧 Email:', email);
      console.log('🔑 Password: admin123');
      console.log('👤 Role: admin');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      
      process.exit(0);
    }

    console.log('🔍 Found existing user:');
    console.log('📧 Email:', user.email);
    console.log('👤 Name:', user.name);
    console.log('🎯 Current Role:', user.role);
    console.log('\n🔄 Updating to admin...\n');

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    // Update user
    user.role = 'admin';
    user.password = hashedPassword;
    user.name = 'Admin';

    await user.save();

    console.log('🎉 User updated successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 Email:', email);
    console.log('🔑 Password: admin123');
    console.log('👤 Role: admin');
    console.log('📞 Phone:', user.phone);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n✅ Now you can login as admin!');
    console.log('🌐 Go to: http://localhost:5173/login\n');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.log('\n💡 Make sure:');
    console.log('1. MongoDB is running');
    console.log('2. Database name is correct');
    process.exit(1);
  }
};

fixAdmin();