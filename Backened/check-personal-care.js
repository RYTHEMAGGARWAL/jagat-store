// check-personal-care.js
// Run: node check-personal-care.js

const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://rythemaggarwal7840:Rythem7840@cluster0.obezyro.mongodb.net/?appName=Cluster0";

async function checkPersonalCare() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    const Product = mongoose.model('Product', new mongoose.Schema({}, { strict: false }));

    // Total Personal Care products
    const total = await Product.countDocuments({ category: 'Personal Care' });
    console.log(`📦 Total "Personal Care" products: ${total}`);

    // In Stock products
    const inStock = await Product.countDocuments({ 
      category: 'Personal Care',
      inStock: true 
    });
    console.log(`✅ In Stock: ${inStock}`);

    // Out of Stock products
    const outOfStock = await Product.countDocuments({ 
      category: 'Personal Care',
      inStock: false 
    });
    console.log(`❌ Out of Stock: ${outOfStock}`);

    // Products with no inStock field
    const noStockField = await Product.countDocuments({ 
      category: 'Personal Care',
      inStock: { $exists: false }
    });
    console.log(`⚠️ No inStock field: ${noStockField}`);

    // Check for similar category names (case issues)
    console.log('\n🔍 Checking similar category names...');
    const categories = await Product.distinct('category');
    const personalCareVariants = categories.filter(cat => 
      cat && cat.toLowerCase().includes('personal')
    );
    console.log('Found variants:', personalCareVariants);

    // Count each variant
    for (const cat of personalCareVariants) {
      const count = await Product.countDocuments({ category: cat });
      console.log(`   "${cat}": ${count} products`);
    }

    await mongoose.disconnect();
    console.log('\n✅ Done!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkPersonalCare();