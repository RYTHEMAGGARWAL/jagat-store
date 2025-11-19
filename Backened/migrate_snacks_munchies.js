// migrate_snacks_munchies_IMPROVED.js - Smart Migration with Add/Update/Delete
// Save in Backend folder and run: node migrate_snacks_munchies_IMPROVED.js

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

// ========== SNACKS & MUNCHIES PRODUCTS ==========
const snacksMunchiesProducts = [
  // CHIPS - LAYS
  { name: 'Lay\'s Classic Salted', weight: '95g', price: 40, oldPrice: 45, discount: '11% OFF', category: 'Snacks & Munchies', brand: 'Lay\'s', image: 'https://m.media-amazon.com/images/I/71a1rByk7tL._SL1500_.jpg', inStock: true, description: 'India\'s favorite potato chips', stock: 200 },
  { name: 'Lay\'s Magic Masala', weight: '95g', price: 40, oldPrice: 45, discount: '11% OFF', category: 'Snacks & Munchies', brand: 'Lay\'s', image: 'https://m.media-amazon.com/images/I/71b2sCzl8uL._SL1500_.jpg', inStock: true, description: 'Masala flavored chips', stock: 190 },
  { name: 'Lay\'s American Style Cream & Onion', weight: '90g', price: 40, oldPrice: 45, discount: '11% OFF', category: 'Snacks & Munchies', brand: 'Lay\'s', image: 'https://m.media-amazon.com/images/I/71c3tDam9vL._SL1500_.jpg', inStock: true, description: 'Creamy and tangy chips', stock: 180 },

  // KURKURE
  { name: 'Kurkure Masala Munch', weight: '90g', price: 35, oldPrice: 40, discount: '13% OFF', category: 'Snacks & Munchies', brand: 'Kurkure', image: 'https://m.media-amazon.com/images/I/71d4uEbn0wL._SL1500_.jpg', inStock: true, description: 'Crunchy masala snack', stock: 180 },
  { name: 'Kurkure Chilli Chatka', weight: '85g', price: 35, oldPrice: 40, discount: '13% OFF', category: 'Snacks & Munchies', brand: 'Kurkure', image: 'https://m.media-amazon.com/images/I/71e5vFco1xL._SL1500_.jpg', inStock: true, description: 'Spicy chilli kurkure', stock: 170 },

  // BINGO
  { name: 'Bingo Mad Angles', weight: '95g', price: 38, oldPrice: 42, discount: '10% OFF', category: 'Snacks & Munchies', brand: 'Bingo', image: 'https://m.media-amazon.com/images/I/71f6wGdp2yL._SL1500_.jpg', inStock: true, description: 'Tangy tomato chips', stock: 170 },
  { name: 'Bingo Original Style', weight: '90g', price: 35, oldPrice: 40, discount: '13% OFF', category: 'Snacks & Munchies', brand: 'Bingo', image: 'https://m.media-amazon.com/images/I/71g7xHer3zL._SL1500_.jpg', inStock: true, description: 'Salted potato chips', stock: 160 },

  // NAMKEEN - HALDIRAM'S
  { name: 'Haldiram\'s Aloo Bhujia', weight: '400g', price: 110, oldPrice: 125, discount: '12% OFF', category: 'Snacks & Munchies', brand: 'Haldiram\'s', image: 'https://m.media-amazon.com/images/I/71h8yIfq4AL._SL1500_.jpg', inStock: true, description: 'Classic aloo bhujia', stock: 140 },
  { name: 'Haldiram\'s Namkeen Mix', weight: '400g', price: 105, oldPrice: 120, discount: '13% OFF', category: 'Snacks & Munchies', brand: 'Haldiram\'s', image: 'https://m.media-amazon.com/images/I/71i9zJgr5BL._SL1500_.jpg', inStock: true, description: 'Crunchy namkeen mixture', stock: 130 },
  { name: 'Haldiram\'s Moong Dal', weight: '350g', price: 95, oldPrice: 110, discount: '14% OFF', category: 'Snacks & Munchies', brand: 'Haldiram\'s', image: 'https://m.media-amazon.com/images/I/71j0AKhs6CL._SL1500_.jpg', inStock: true, description: 'Crispy moong dal', stock: 125 },
  { name: 'Haldiram\'s Khatta Meetha', weight: '400g', price: 115, oldPrice: 130, discount: '12% OFF', category: 'Snacks & Munchies', brand: 'Haldiram\'s', image: 'https://m.media-amazon.com/images/I/71k1BLit7DL._SL1500_.jpg', inStock: true, description: 'Sweet and sour mix', stock: 120 },

  // BIKAJI
  { name: 'Bikaji Bhujia', weight: '400g', price: 100, oldPrice: 115, discount: '13% OFF', category: 'Snacks & Munchies', brand: 'Bikaji', image: 'https://m.media-amazon.com/images/I/71l2CMju8EL._SL1500_.jpg', inStock: true, description: 'Traditional Rajasthani bhujia', stock: 120 },
  { name: 'Bikaji All in One', weight: '400g', price: 105, oldPrice: 120, discount: '13% OFF', category: 'Snacks & Munchies', brand: 'Bikaji', image: 'https://m.media-amazon.com/images/I/71m3DNkv9FL._SL1500_.jpg', inStock: true, description: 'Mix of favorite namkeens', stock: 110 },

  // HEALTHY CHIPS
  { name: 'Too Yumm Multigrain Chips', weight: '54g', price: 30, oldPrice: 35, discount: '14% OFF', category: 'Snacks & Munchies', brand: 'Too Yumm', image: 'https://m.media-amazon.com/images/I/71n4EOlw0GL._SL1500_.jpg', inStock: true, description: 'Baked multigrain chips', stock: 150 },

  // PREMIUM CHIPS
  { name: 'Pringles Original', weight: '110g', price: 120, oldPrice: 135, discount: '11% OFF', category: 'Snacks & Munchies', brand: 'Pringles', image: 'https://m.media-amazon.com/images/I/71o5FPmx1HL._SL1500_.jpg', inStock: true, description: 'Perfectly stacked crisps', stock: 90 },
  { name: 'Pringles Sour Cream & Onion', weight: '110g', price: 120, oldPrice: 135, discount: '11% OFF', category: 'Snacks & Munchies', brand: 'Pringles', image: 'https://m.media-amazon.com/images/I/71p6GQny2IL._SL1500_.jpg', inStock: true, description: 'Tangy sour cream flavor', stock: 85 },

  // DORITOS & CHEETOS
  { name: 'Doritos Nachos', weight: '90g', price: 55, oldPrice: 62, discount: '11% OFF', category: 'Snacks & Munchies', brand: 'Doritos', image: 'https://m.media-amazon.com/images/I/71q7HRoz3JL._SL1500_.jpg', inStock: true, description: 'Crunchy nacho cheese', stock: 110 },
  { name: 'Cheetos Crunchy', weight: '70g', price: 40, oldPrice: 45, discount: '11% OFF', category: 'Snacks & Munchies', brand: 'Cheetos', image: 'https://m.media-amazon.com/images/I/71r8ISp04KL._SL1500_.jpg', inStock: true, description: 'Cheese flavored puffs', stock: 130 },

  // NUTS & SEEDS
  { name: 'Yellow Diamond Roasted Peanuts', weight: '200g', price: 60, oldPrice: 68, discount: '12% OFF', category: 'Snacks & Munchies', brand: 'Yellow Diamond', image: 'https://m.media-amazon.com/images/I/71s9JTq15LL._SL1500_.jpg', inStock: true, description: 'Salted roasted peanuts', stock: 100 },
  { name: 'Yellow Diamond Cashews', weight: '200g', price: 195, oldPrice: 220, discount: '11% OFF', category: 'Snacks & Munchies', brand: 'Yellow Diamond', image: 'https://m.media-amazon.com/images/I/71t0KUr26ML._SL1500_.jpg', inStock: true, description: 'Premium roasted cashews', stock: 70 },

  // BISCUIT SNACKS
  { name: 'Britannia Little Hearts', weight: '75g', price: 25, oldPrice: 30, discount: '17% OFF', category: 'Snacks & Munchies', brand: 'Britannia', image: 'https://m.media-amazon.com/images/I/71u1LVs37NL._SL1500_.jpg', inStock: true, description: 'Sweet heart biscuits', stock: 160 },
  { name: 'Parle Monaco Classic', weight: '200g', price: 35, oldPrice: 40, discount: '13% OFF', category: 'Snacks & Munchies', brand: 'Parle', image: 'https://m.media-amazon.com/images/I/71v2MWt48OL._SL1500_.jpg', inStock: true, description: 'Salted crackers', stock: 150 },
  { name: 'Britannia Treat Cream Wafers', weight: '150g', price: 50, oldPrice: 55, discount: '9% OFF', category: 'Snacks & Munchies', brand: 'Britannia', image: 'https://m.media-amazon.com/images/I/71w3NXu59PL._SL1500_.jpg', inStock: true, description: 'Vanilla cream wafers', stock: 120 },

  // POPCORN
  { name: 'Act II Popcorn Golden Sizzle', weight: '70g', price: 55, oldPrice: 62, discount: '11% OFF', category: 'Snacks & Munchies', brand: 'Act II', image: 'https://m.media-amazon.com/images/I/71x4OYv60QL._SL1500_.jpg', inStock: true, description: 'Microwave popcorn', stock: 95 }
];

// ========== SMART MIGRATION FUNCTION ==========
const smartMigrate = async () => {
  try {
    console.log('\n🍿 Starting Smart Migration for Snacks & Munchies...\n');
    console.log('━'.repeat(60));
    
    let added = 0, updated = 0, unchanged = 0;
    
    const existingProducts = await Product.find({ category: "Snacks & Munchies" });
    
    const existingMap = new Map();
    existingProducts.forEach(product => {
      const key = `${product.name}_${product.weight}`;
      existingMap.set(key, product);
    });
    
    const sourceProductKeys = new Set();
    
    for (const productData of snacksMunchiesProducts) {
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
    console.log(`   📦 Total in DB: ${await Product.countDocuments({ category: "Snacks & Munchies" })}`);
    
    console.log('\n📋 Product Categories:');
    console.log('   🥔 Chips (Lays, Kurkure, Bingo): 7 products');
    console.log('   🌾 Namkeen (Haldiram\'s, Bikaji): 6 products');
    console.log('   🥜 Premium & Healthy: 3 products');
    console.log('   🧀 International (Pringles, Doritos): 4 products');
    console.log('   🥜 Nuts & Seeds: 2 products');
    console.log('   🍪 Biscuit Snacks: 3 products');
    console.log('   🍿 Popcorn: 1 product');
    
    console.log('\n✅ Migration Complete!\n');
    
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Migration Error:', err);
    process.exit(1);
  }
};

smartMigrate();