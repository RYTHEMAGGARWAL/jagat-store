// Backend/check-categories.js - Run this to check all categories

const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect("mongodb+srv://rythemaggarwal7840:Rythem7840@cluster0.obezyro.mongodb.net/?appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Product = require('./models/Product');

async function checkCategories() {
  try {
    console.log('\n========== CHECKING MONGODB CATEGORIES ==========\n');

    // Get all unique categories
    const categories = await Product.distinct('category');
    
    console.log('📂 TOTAL CATEGORIES:', categories.length);
    console.log('📋 Categories:', categories);
    console.log('\n');

    // Check products in each category
    for (const category of categories) {
      const products = await Product.find({ category });
      
      console.log(`\n${'='.repeat(60)}`);
      console.log(`📦 CATEGORY: "${category}"`);
      console.log(`${'='.repeat(60)}`);
      console.log(`Total Products: ${products.length}\n`);
      
      if (products.length > 0) {
        products.forEach((product, index) => {
          console.log(`${index + 1}. ${product.name}`);
          console.log(`   ID: ${product._id}`);
          console.log(`   Price: ₹${product.price}`);
          console.log(`   Stock: ${product.stock}`);
          console.log(`   In Stock: ${product.inStock}`);
          console.log('');
        });
      } else {
        console.log('   (No products in this category)\n');
      }
    }

    console.log('\n========== SUMMARY ==========');
    console.log(`Total Categories: ${categories.length}`);
    const totalProducts = await Product.countDocuments();
    console.log(`Total Products: ${totalProducts}`);
    console.log('================================\n');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkCategories();