// check_database_update.js - Why Updates Not Working?
require('dotenv').config();
const mongoose = require('mongoose');

console.log('\n╔═══════════════════════════════════════════╗');
console.log('║   DATABASE UPDATE CHECK                   ║');
console.log('╚═══════════════════════════════════════════╝\n');

console.log('🔍 Step 1: Checking MongoDB Connection\n');

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://rythemaggarwal7840:Rythem7840@cluster0.obezyro.mongodb.net/?appName=Cluster0";
console.log(`Connection String: ${MONGO_URI}\n`);

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected Successfully\n');
    checkDatabase();
  })
  .catch(err => {
    console.error('❌ MongoDB Connection FAILED!');
    console.error(`Error: ${err.message}\n`);
    console.log('💡 Solutions:');
    console.log('   1. Make sure MongoDB is running');
    console.log('   2. Check MONGO_URI in .env file');
    console.log('   3. Try: mongodb://localhost:27017/jagatstore\n');
    process.exit(1);
  });

const productSchema = new mongoose.Schema({
  name: String,
  image: String,
  category: String,
  brand: String,
  price: Number,
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

async function checkDatabase() {
  try {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('🔍 Step 2: Checking Database Name\n');
    
    const dbName = mongoose.connection.db.databaseName;
    console.log(`Connected to Database: "${dbName}"\n`);
    
    if (dbName !== 'jagatstore') {
      console.log('⚠️  WARNING: Different database name!');
      console.log(`   Expected: jagatstore`);
      console.log(`   Connected: ${dbName}\n`);
    }
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('🔍 Step 3: Checking Collections\n');
    
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Available Collections:');
    collections.forEach(col => {
      console.log(`   - ${col.name}`);
    });
    console.log('');
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('🔍 Step 4: Counting Products\n');
    
    const totalProducts = await Product.countDocuments();
    const pharmacyProducts = await Product.countDocuments({ category: 'Pharmacy' });
    
    console.log(`Total Products: ${totalProducts}`);
    console.log(`Pharmacy Products: ${pharmacyProducts}\n`);
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('🔍 Step 5: Test Update\n');
    
    console.log('Testing if updates work...\n');
    
    // Try to create a test product
    const testProduct = new Product({
      name: 'TEST PRODUCT - DELETE ME',
      category: 'Pharmacy',
      brand: 'Test Brand',
      price: 999,
      image: 'https://test.com/image.jpg'
    });
    
    try {
      await testProduct.save();
      console.log('✅ Test Product Created Successfully!\n');
      
      // Try to update it
      testProduct.price = 888;
      await testProduct.save();
      console.log('✅ Test Product Updated Successfully!\n');
      
      // Delete test product
      await Product.deleteOne({ name: 'TEST PRODUCT - DELETE ME' });
      console.log('✅ Test Product Deleted Successfully!\n');
      
      console.log('✅ Database Updates ARE WORKING!\n');
      
    } catch (error) {
      console.log('❌ Test Product Creation FAILED!');
      console.log(`Error: ${error.message}\n`);
    }
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('🔍 Step 6: Checking Existing Pharmacy Products\n');
    
    if (pharmacyProducts > 0) {
      const firstProduct = await Product.findOne({ category: 'Pharmacy' });
      console.log('First Pharmacy Product:');
      console.log(`   Name: ${firstProduct.name}`);
      console.log(`   Price: ₹${firstProduct.price}`);
      console.log(`   Image: ${firstProduct.image ? firstProduct.image.substring(0, 50) + '...' : 'NO IMAGE'}`);
      console.log(`   Created: ${firstProduct.createdAt || 'N/A'}\n`);
    } else {
      console.log('❌ NO Pharmacy Products Found!\n');
      console.log('💡 Run migration script:');
      console.log('   node migrate_pharmacy_products.js\n');
    }
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('💡 DIAGNOSIS:\n');
    
    console.log('Possible Reasons Updates Not Working:\n');
    console.log('1️⃣  Wrong Database Connection');
    console.log('   Check: .env file has correct MONGO_URI\n');
    
    console.log('2️⃣  Script Not Completing');
    console.log('   Check: Script runs without errors\n');
    
    console.log('3️⃣  Different Database Name');
    console.log(`   Current: ${dbName}`);
    console.log('   Expected: jagatstore\n');
    
    console.log('4️⃣  Cache Issue');
    console.log('   Solution: Restart backend server\n');
    
    console.log('5️⃣  Schema Mismatch');
    console.log('   Check: Product model matches migration script\n');
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('✅ Check Complete!\n');
    
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}