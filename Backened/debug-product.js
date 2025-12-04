// debug-products.js
// Run: node debug-products.js

const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://rythemaggarwal7840:Rythem7840@cluster0.obezyro.mongodb.net/?appName=Cluster0";

async function debugProducts() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    const Product = mongoose.model('Product', new mongoose.Schema({}, { strict: false }));

    // Get all Personal Care products
    const allProducts = await Product.find({ category: 'Personal Care' });
    console.log(`📦 Total Personal Care in DB: ${allProducts.length}`);

    // Check for duplicate names
    const nameCount = {};
    allProducts.forEach(p => {
      const key = p.name;
      nameCount[key] = (nameCount[key] || 0) + 1;
    });

    const duplicates = Object.entries(nameCount).filter(([name, count]) => count > 1);
    
    if (duplicates.length > 0) {
      console.log('\n⚠️ DUPLICATE NAMES FOUND:');
      duplicates.forEach(([name, count]) => {
        console.log(`   "${name}" - ${count} times`);
      });
      
      const totalDuplicates = duplicates.reduce((sum, [_, count]) => sum + (count - 1), 0);
      console.log(`\n📊 Total duplicate entries: ${totalDuplicates}`);
      console.log(`📊 Unique products: ${allProducts.length - totalDuplicates}`);
    } else {
      console.log('\n✅ No duplicates found');
    }

    // Check for products with issues
    console.log('\n🔍 Checking for problematic products...');
    
    const noImage = allProducts.filter(p => !p.image);
    const noPrice = allProducts.filter(p => !p.price);
    const noStock = allProducts.filter(p => p.stock === undefined);
    
    console.log(`   No image: ${noImage.length}`);
    console.log(`   No price: ${noPrice.length}`);
    console.log(`   No stock field: ${noStock.length}`);

    // List products that might be filtered out
    console.log('\n🔍 Checking for potential filter issues...');
    
    const outOfStock = allProducts.filter(p => p.inStock === false);
    const hiddenProducts = allProducts.filter(p => p.isHidden === true);
    const deletedProducts = allProducts.filter(p => p.isDeleted === true);
    
    console.log(`   Out of stock (inStock=false): ${outOfStock.length}`);
    console.log(`   Hidden (isHidden=true): ${hiddenProducts.length}`);
    console.log(`   Deleted (isDeleted=true): ${deletedProducts.length}`);

    await mongoose.disconnect();
    console.log('\n✅ Done!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

debugProducts();