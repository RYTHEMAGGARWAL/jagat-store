// fix_categories.js - Fix duplicate category names
// Run: node fix_categories.js

require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

const productSchema = new mongoose.Schema({}, { strict: false });
const Product = mongoose.model('Product', productSchema);

const fixCategories = async () => {
  try {
    console.log('\n🔧 Fixing Duplicate Categories...\n');
    console.log('━'.repeat(60));
    
    // Fix: "Snacks Munchies" -> "Snacks & Munchies"
    const result1 = await Product.updateMany(
      { category: "Snacks Munchies" },
      { $set: { category: "Snacks & Munchies" } }
    );
    console.log(`✅ "Snacks Munchies" → "Snacks & Munchies": ${result1.modifiedCount} products fixed`);
    
    // Fix any other potential issues:
    
    // "Dairy Bread Eggs" -> "Dairy Bread & Eggs"
    const result2 = await Product.updateMany(
      { category: "Dairy Bread Eggs" },
      { $set: { category: "Dairy Bread & Eggs" } }
    );
    console.log(`✅ "Dairy Bread Eggs" → "Dairy Bread & Eggs": ${result2.modifiedCount} products fixed`);
    
    // "Cold Drinks Juices" -> "Cold Drinks & Juices"
    const result3 = await Product.updateMany(
      { category: "Cold Drinks Juices" },
      { $set: { category: "Cold Drinks & Juices" } }
    );
    console.log(`✅ "Cold Drinks Juices" → "Cold Drinks & Juices": ${result3.modifiedCount} products fixed`);
    
    // "Cleaning & Household" -> "Cleaning Essentials" (if exists)
    const result4 = await Product.updateMany(
      { category: "Cleaning & Household" },
      { $set: { category: "Cleaning Essentials" } }
    );
    console.log(`✅ "Cleaning & Household" → "Cleaning Essentials": ${result4.modifiedCount} products fixed`);
    
    console.log('\n' + '━'.repeat(60));
    
    // Show updated category breakdown
    const categories = await Product.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    console.log('\n📊 UPDATED CATEGORIES:\n');
    let total = 0;
    categories.forEach(cat => {
      console.log(`   ${cat._id}: ${cat.count} products`);
      total += cat.count;
    });
    
    console.log('\n' + '━'.repeat(60));
    console.log(`\n📦 Total Products: ${total}`);
    console.log(`📂 Total Categories: ${categories.length}`);
    console.log('\n✅ All Categories Fixed!\n');
    
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Error:', err);
    process.exit(1);
  }
};

fixCategories();