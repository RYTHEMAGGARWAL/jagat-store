// migrate_breakfast_instant_IMPROVED.js - Smart Migration with Add/Update/Delete
// Save in Backend folder and run: node migrate_breakfast_instant_IMPROVED.js

require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI || "mongodb+srv://rythemaggarwal7840:Rythem7840@cluster0.obezyro.mongodb.net/?appName=Cluster0")
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  stock: { type: Number, default: 50 },
  brand: { type: String, default: 'Generic' },
  rating: { type: Number, default: 4.0 },
  reviews: { type: Array, default: [] },
  weight: { type: String, default: '' },
  oldPrice: { type: Number },
  discount: { type: String },
  inStock: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

// ========== BREAKFAST & INSTANT FOODS PRODUCTS ==========
// ADD/EDIT/DELETE products here and run the script
const breakfastInstantProducts = [
  // CEREALS
  {
    name: 'Kellogg\'s Corn Flakes',
    weight: '875g',
    price: 320,
    oldPrice: 360,
    discount: '11% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Kellogg\'s',
    image: 'https://m.media-amazon.com/images/I/71nSvPZGiGL._SL1500_.jpg',
    inStock: true,
    description: 'Crispy golden corn flakes for healthy breakfast',
    stock: 70
  },
  {
    name: 'Quaker Oats',
    weight: '1kg',
    price: 180,
    oldPrice: 200,
    discount: '10% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Quaker',
    image: 'https://m.media-amazon.com/images/I/71GJDhj7YwL._SL1500_.jpg',
    inStock: true,
    description: '100% natural whole grain oats',
    stock: 100
  },
  {
    name: 'Kellogg\'s Chocos',
    weight: '700g',
    price: 280,
    oldPrice: 315,
    discount: '11% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Kellogg\'s',
    image: 'https://m.media-amazon.com/images/I/71-aKLKJSHL._SL1500_.jpg',
    inStock: true,
    description: 'Chocolatey breakfast cereal for kids',
    stock: 60
  },
  {
    name: 'Saffola Oats',
    weight: '1kg',
    price: 195,
    oldPrice: 220,
    discount: '11% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Saffola',
    image: 'https://m.media-amazon.com/images/I/71gQVJ0i5PL._SL1500_.jpg',
    inStock: true,
    description: 'Heart-healthy oats',
    stock: 90
  },

  // INSTANT NOODLES
  {
    name: 'Maggi 2-Minute Noodles',
    weight: '12 Pack',
    price: 140,
    oldPrice: 156,
    discount: '10% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Maggi',
    image: 'https://m.media-amazon.com/images/I/71DhG3W5g4L._SL1500_.jpg',
    inStock: true,
    description: 'India\'s favorite instant noodles',
    stock: 150
  },
  {
    name: 'Yippee Noodles Magic Masala',
    weight: '12 Pack',
    price: 120,
    oldPrice: 135,
    discount: '11% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Yippee',
    image: 'https://m.media-amazon.com/images/I/71c8M1WCHZL._SL1500_.jpg',
    inStock: true,
    description: 'Tasty instant noodles',
    stock: 140
  },
  {
    name: 'Top Ramen Curry Noodles',
    weight: '12 Pack',
    price: 125,
    oldPrice: 140,
    discount: '11% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Top Ramen',
    image: 'https://m.media-amazon.com/images/I/71vGx6h8zYL._SL1500_.jpg',
    inStock: true,
    description: 'Delicious curry flavored noodles',
    stock: 130
  },
  {
    name: 'Maggi Cuppa Mania',
    weight: '4 Pack',
    price: 95,
    oldPrice: 108,
    discount: '12% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Maggi',
    image: 'https://m.media-amazon.com/images/I/71QcU4XrFvL._SL1500_.jpg',
    inStock: true,
    description: 'Cup noodles ready in minutes',
    stock: 110
  },
  {
    name: 'Knorr Soupy Noodles',
    weight: '4 Pack',
    price: 90,
    oldPrice: 100,
    discount: '10% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Knorr',
    image: 'https://m.media-amazon.com/images/I/71YKkv3XEML._SL1500_.jpg',
    inStock: true,
    description: 'Soupy instant noodles',
    stock: 100
  },

  // READY TO EAT
  {
    name: 'MTR Ready to Eat Poha',
    weight: '250g',
    price: 65,
    oldPrice: 72,
    discount: '10% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'MTR',
    image: 'https://m.media-amazon.com/images/I/71TqGd8ayvL._SL1500_.jpg',
    inStock: true,
    description: 'Traditional poha ready in 2 minutes',
    stock: 80
  },
  {
    name: 'MTR Ready to Eat Upma',
    weight: '250g',
    price: 65,
    oldPrice: 72,
    discount: '10% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'MTR',
    image: 'https://m.media-amazon.com/images/I/71OvBsQq7CL._SL1500_.jpg',
    inStock: true,
    description: 'South Indian upma ready to eat',
    stock: 75
  },
  {
    name: 'Nestlé Ceregrow',
    weight: '300g',
    price: 245,
    oldPrice: 275,
    discount: '11% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Nestlé',
    image: 'https://m.media-amazon.com/images/I/71CnhF+OHJL._SL1500_.jpg',
    inStock: true,
    description: 'Nutritious cereal for growing kids',
    stock: 50
  },

  // INSTANT MIXES
  {
    name: 'MTR Rava Idli Mix',
    weight: '500g',
    price: 85,
    oldPrice: 95,
    discount: '11% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'MTR',
    image: 'https://m.media-amazon.com/images/I/71f0T2tKyuL._SL1500_.jpg',
    inStock: true,
    description: 'Instant idli mix, just add water',
    stock: 85
  },
  {
    name: 'Gits Dosa Mix',
    weight: '500g',
    price: 80,
    oldPrice: 90,
    discount: '11% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Gits',
    image: 'https://m.media-amazon.com/images/I/71mOWJXeIIL._SL1500_.jpg',
    inStock: true,
    description: 'Crispy dosa mix ready in minutes',
    stock: 75
  },
  {
    name: 'Pillsbury Pancake Mix',
    weight: '400g',
    price: 120,
    oldPrice: 135,
    discount: '11% OFF',
    category: 'Breakfast & Instant Foods',
    brand: 'Pillsbury',
    image: 'https://m.media-amazon.com/images/I/71qNM5qk6FL._SL1500_.jpg',
    inStock: true,
    description: 'Fluffy pancakes in minutes',
    stock: 65
  }
];

// ========== SMART MIGRATION FUNCTION ==========
const smartMigrate = async () => {
  try {
    console.log('\n🥣 Starting Smart Migration for Breakfast & Instant Foods...\n');
    console.log('━'.repeat(60));
    
    let added = 0, updated = 0, unchanged = 0;
    
    // Get all existing products in this category
    const existingProducts = await Product.find({ category: "Breakfast & Instant Foods" });
    
    // Create a map of existing products for quick lookup
    const existingMap = new Map();
    existingProducts.forEach(product => {
      const key = `${product.name}_${product.weight}`;
      existingMap.set(key, product);
    });
    
    // Create a set of products from our source
    const sourceProductKeys = new Set();
    
    // Process each product from source
    for (const productData of breakfastInstantProducts) {
      const key = `${productData.name}_${productData.weight}`;
      sourceProductKeys.add(key);
      
      const existingProduct = existingMap.get(key);
      
      if (!existingProduct) {
        // ADD NEW PRODUCT
        await Product.create(productData);
        console.log(`✅ ADDED: ${productData.name} (${productData.weight}) - ₹${productData.price}`);
        added++;
      } else {
        // CHECK IF UPDATE NEEDED
        const needsUpdate = 
          existingProduct.price !== productData.price ||
          existingProduct.oldPrice !== productData.oldPrice ||
          existingProduct.discount !== productData.discount ||
          existingProduct.image !== productData.image ||
          existingProduct.description !== productData.description ||
          existingProduct.inStock !== productData.inStock ||
          existingProduct.stock !== productData.stock ||
          existingProduct.brand !== productData.brand;
        
        if (needsUpdate) {
          // UPDATE PRODUCT
          await Product.findByIdAndUpdate(existingProduct._id, productData);
          console.log(`🔄 UPDATED: ${productData.name} (${productData.weight}) - ₹${productData.price}`);
          updated++;
        } else {
          console.log(`⏭️  UNCHANGED: ${productData.name} (${productData.weight})`);
          unchanged++;
        }
      }
    }
    
    // DELETE products that are no longer in source
    console.log('\n' + '━'.repeat(60));
    console.log('🗑️  Checking for products to delete...\n');
    
    let deleted = 0;
    for (const existingProduct of existingProducts) {
      const key = `${existingProduct.name}_${existingProduct.weight}`;
      if (!sourceProductKeys.has(key)) {
        await Product.findByIdAndDelete(existingProduct._id);
        console.log(`❌ DELETED: ${existingProduct.name} (${existingProduct.weight})`);
        deleted++;
      }
    }
    
    // Summary
    console.log('\n' + '━'.repeat(60));
    console.log('\n📊 MIGRATION SUMMARY:');
    console.log(`   ✅ Added: ${added}`);
    console.log(`   🔄 Updated: ${updated}`);
    console.log(`   ⏭️  Unchanged: ${unchanged}`);
    console.log(`   ❌ Deleted: ${deleted}`);
    console.log(`   📦 Total in DB: ${await Product.countDocuments({ category: "Breakfast & Instant Foods" })}`);
    console.log('\n✅ Migration Complete!\n');
    
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Migration Error:', err);
    process.exit(1);
  }
};

// Run migration
smartMigrate();