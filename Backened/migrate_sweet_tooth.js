// migrate_sweet_tooth_IMPROVED.js - Smart Migration with Add/Update/Delete
// Save in Backend folder and run: node migrate_sweet_tooth_IMPROVED.js

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

// ========== SWEET TOOTH PRODUCTS ==========
const sweetToothProducts = [
  // DAIRY MILK
  { name: 'Cadbury Dairy Milk', weight: '165g', price: 140, oldPrice: 160, discount: '13% OFF', category: 'Sweet Tooth', brand: 'Cadbury', image: 'https://m.media-amazon.com/images/I/61a1BsC9mDL._SL1500_.jpg', inStock: true, description: 'Classic milk chocolate', stock: 100 },
  { name: 'Cadbury Dairy Milk Silk', weight: '150g', price: 195, oldPrice: 220, discount: '11% OFF', category: 'Sweet Tooth', brand: 'Cadbury', image: 'https://m.media-amazon.com/images/I/61b2CtD0nEL._SL1500_.jpg', inStock: true, description: 'Premium silk chocolate', stock: 85 },
  { name: 'Cadbury Dairy Milk Fruit & Nut', weight: '165g', price: 150, oldPrice: 170, discount: '12% OFF', category: 'Sweet Tooth', brand: 'Cadbury', image: 'https://m.media-amazon.com/images/I/61c3DuE1oFL._SL1500_.jpg', inStock: true, description: 'Chocolate with dry fruits', stock: 90 },

  // KITKAT & NESTLE
  { name: 'KitKat Chocolate', weight: '138g', price: 120, oldPrice: 135, discount: '11% OFF', category: 'Sweet Tooth', brand: 'KitKat', image: 'https://m.media-amazon.com/images/I/61d4EvF2pGL._SL1500_.jpg', inStock: true, description: 'Crispy wafer chocolate', stock: 90 },
  { name: 'KitKat Dark', weight: '120g', price: 130, oldPrice: 145, discount: '10% OFF', category: 'Sweet Tooth', brand: 'KitKat', image: 'https://m.media-amazon.com/images/I/61e5FwG3qHL._SL1500_.jpg', inStock: true, description: 'Dark chocolate wafer', stock: 75 },

  // SMALL CHOCOLATES
  { name: '5 Star Chocolate', weight: '40g', price: 35, oldPrice: 40, discount: '13% OFF', category: 'Sweet Tooth', brand: '5 Star', image: 'https://m.media-amazon.com/images/I/61f6GxH4rIL._SL1500_.jpg', inStock: true, description: 'Caramel and nougat', stock: 150 },
  { name: 'Munch Chocolate', weight: '40g', price: 30, oldPrice: 35, discount: '14% OFF', category: 'Sweet Tooth', brand: 'Munch', image: 'https://m.media-amazon.com/images/I/61g7HyI5sJL._SL1500_.jpg', inStock: true, description: 'Crunchy wafer chocolate', stock: 140 },
  { name: 'Perk Chocolate', weight: '28g', price: 25, oldPrice: 30, discount: '17% OFF', category: 'Sweet Tooth', brand: 'Perk', image: 'https://m.media-amazon.com/images/I/61h8IzJ6tKL._SL1500_.jpg', inStock: true, description: 'Wafer chocolate bar', stock: 160 },

  // INTERNATIONAL BRANDS
  { name: 'Snickers Chocolate', weight: '50g', price: 40, oldPrice: 45, discount: '11% OFF', category: 'Sweet Tooth', brand: 'Snickers', image: 'https://m.media-amazon.com/images/I/61i9JAK7uLL._SL1500_.jpg', inStock: true, description: 'Peanuts, caramel, nougat', stock: 130 },
  { name: 'Mars Chocolate', weight: '51g', price: 45, oldPrice: 50, discount: '10% OFF', category: 'Sweet Tooth', brand: 'Mars', image: 'https://m.media-amazon.com/images/I/61j0KBL8vML._SL1500_.jpg', inStock: true, description: 'Chocolate caramel bar', stock: 120 },
  { name: 'Bounty Chocolate', weight: '57g', price: 50, oldPrice: 55, discount: '9% OFF', category: 'Sweet Tooth', brand: 'Bounty', image: 'https://m.media-amazon.com/images/I/61k1LCM9wNL._SL1500_.jpg', inStock: true, description: 'Coconut filled chocolate', stock: 110 },

  // PREMIUM CHOCOLATES
  { name: 'Ferrero Rocher', weight: '16 pcs', price: 550, oldPrice: 625, discount: '12% OFF', category: 'Sweet Tooth', brand: 'Ferrero', image: 'https://m.media-amazon.com/images/I/71l2MDN0xOL._SL1500_.jpg', inStock: true, description: 'Premium hazelnut chocolates', stock: 40 },
  { name: 'Ferrero Rocher', weight: '3 pcs', price: 125, oldPrice: 140, discount: '11% OFF', category: 'Sweet Tooth', brand: 'Ferrero', image: 'https://m.media-amazon.com/images/I/71m3NEO1yPL._SL1500_.jpg', inStock: true, description: 'Mini pack chocolates', stock: 70 },

  // ASSORTMENTS
  { name: 'Cadbury Celebrations', weight: '118g', price: 160, oldPrice: 180, discount: '11% OFF', category: 'Sweet Tooth', brand: 'Cadbury', image: 'https://m.media-amazon.com/images/I/71n4OFP2zQL._SL1500_.jpg', inStock: true, description: 'Assorted chocolates pack', stock: 70 },
  { name: 'Cadbury Celebrations Premium', weight: '286g', price: 380, oldPrice: 425, discount: '11% OFF', category: 'Sweet Tooth', brand: 'Cadbury', image: 'https://m.media-amazon.com/images/I/71o5PGQ30RL._SL1500_.jpg', inStock: true, description: 'Premium assorted chocolates', stock: 50 },

  // GEMS & CANDIES
  { name: 'Cadbury Gems', weight: '34g', price: 30, oldPrice: 35, discount: '14% OFF', category: 'Sweet Tooth', brand: 'Cadbury', image: 'https://m.media-amazon.com/images/I/71p6QHR41SL._SL1500_.jpg', inStock: true, description: 'Colorful chocolate buttons', stock: 140 },
  { name: 'Mango Bite', weight: '100 pcs', price: 80, oldPrice: 90, discount: '11% OFF', category: 'Sweet Tooth', brand: 'Parle', image: 'https://m.media-amazon.com/images/I/71q7RIS52TL._SL1500_.jpg', inStock: true, description: 'Mango flavored candy', stock: 100 },
  { name: 'Alpenliebe Juzt Jelly', weight: '200g', price: 95, oldPrice: 110, discount: '14% OFF', category: 'Sweet Tooth', brand: 'Alpenliebe', image: 'https://m.media-amazon.com/images/I/71r8SJT63UL._SL1500_.jpg', inStock: true, description: 'Fruit jelly candies', stock: 80 },
  { name: 'Pulse Candy', weight: '100 pcs', price: 85, oldPrice: 95, discount: '11% OFF', category: 'Sweet Tooth', brand: 'Pulse', image: 'https://m.media-amazon.com/images/I/71s9TKU74VL._SL1500_.jpg', inStock: true, description: 'Tangy kaccha aam candy', stock: 110 },

  // INDIAN SWEETS - READY TO EAT
  { name: 'Gulab Jamun Ready Mix', weight: '500g', price: 120, oldPrice: 135, discount: '11% OFF', category: 'Sweet Tooth', brand: 'Gits', image: 'https://m.media-amazon.com/images/I/71t0ULV85WL._SL1500_.jpg', inStock: true, description: 'Instant gulab jamun mix', stock: 60 },
  { name: 'Rasgulla Can', weight: '1kg', price: 180, oldPrice: 200, discount: '10% OFF', category: 'Sweet Tooth', brand: 'Haldiram\'s', image: 'https://m.media-amazon.com/images/I/71u1VMW96XL._SL1500_.jpg', inStock: true, description: 'Ready to eat rasgulla', stock: 50 },
  { name: 'Soan Papdi', weight: '500g', price: 165, oldPrice: 185, discount: '11% OFF', category: 'Sweet Tooth', brand: 'Haldiram\'s', image: 'https://m.media-amazon.com/images/I/71v2WNX07YL._SL1500_.jpg', inStock: true, description: 'Traditional Indian sweet', stock: 55 }
];

// ========== SMART MIGRATION FUNCTION ==========
const smartMigrate = async () => {
  try {
    console.log('\n🍫 Starting Smart Migration for Sweet Tooth...\n');
    console.log('━'.repeat(60));
    
    let added = 0, updated = 0, unchanged = 0;
    
    const existingProducts = await Product.find({ category: "Sweet Tooth" });
    
    const existingMap = new Map();
    existingProducts.forEach(product => {
      const key = `${product.name}_${product.weight}`;
      existingMap.set(key, product);
    });
    
    const sourceProductKeys = new Set();
    
    for (const productData of sweetToothProducts) {
      const key = `${productData.name}_${productData.weight}`;
      sourceProductKeys.add(key);
      
      const existingProduct = existingMap.get(key);
      
      if (!existingProduct) {
        await Product.create(productData);
        console.log(`✅ ADDED: ${productData.name} (${productData.weight}) - ₹${productData.price}`);
        added++;
      } else {
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
          await Product.findByIdAndUpdate(existingProduct._id, productData);
          console.log(`🔄 UPDATED: ${productData.name} (${productData.weight}) - ₹${productData.price}`);
          updated++;
        } else {
          console.log(`⏭️  UNCHANGED: ${productData.name} (${productData.weight})`);
          unchanged++;
        }
      }
    }
    
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
    
    console.log('\n' + '━'.repeat(60));
    console.log('\n📊 MIGRATION SUMMARY:');
    console.log(`   ✅ Added: ${added}`);
    console.log(`   🔄 Updated: ${updated}`);
    console.log(`   ⏭️  Unchanged: ${unchanged}`);
    console.log(`   ❌ Deleted: ${deleted}`);
    console.log(`   📦 Total in DB: ${await Product.countDocuments({ category: "Sweet Tooth" })}`);
    
    console.log('\n📋 Product Categories:');
    console.log('   🍫 Cadbury Dairy Milk: 3 products');
    console.log('   🍫 KitKat & Small Chocolates: 5 products');
    console.log('   🌍 International Brands: 3 products');
    console.log('   💎 Premium Chocolates: 2 products');
    console.log('   🎁 Assortments: 2 products');
    console.log('   🍬 Gems & Candies: 4 products');
    console.log('   🍡 Indian Sweets: 3 products');
    
    console.log('\n✅ Migration Complete!\n');
    
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Migration Error:', err);
    process.exit(1);
  }
};

smartMigrate();