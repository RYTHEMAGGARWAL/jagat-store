// migrate_organic_healthy_IMPROVED.js - Smart Migration with Add/Update/Delete
// Save in Backend folder and run: node migrate_organic_healthy_IMPROVED.js

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

// ========== ORGANIC & HEALTHY LIVING PRODUCTS ==========
const organicHealthyProducts = [
  // ORGANIC TEA & COFFEE
  { name: 'Organic India Tulsi Tea', weight: '100 Bags', price: 245, oldPrice: 275, discount: '11% OFF', category: 'Organic & Healthy Living', brand: 'Organic India', image: 'https://m.media-amazon.com/images/I/71GhiCG0OGL._SL1500_.jpg', inStock: true, description: 'Organic Tulsi green tea bags', stock: 60 },
  { name: 'Organic India Tulsi Green Tea', weight: '25 Bags', price: 95, oldPrice: 110, discount: '14% OFF', category: 'Organic & Healthy Living', brand: 'Organic India', image: 'https://m.media-amazon.com/images/I/71Q8QXOgxZL._SL1500_.jpg', inStock: true, description: 'Premium tulsi green tea', stock: 75 },

  // ORGANIC GRAINS & RICE
  { name: '24 Mantra Organic Brown Rice', weight: '1kg', price: 165, oldPrice: 190, discount: '13% OFF', category: 'Organic & Healthy Living', brand: '24 Mantra', image: 'https://m.media-amazon.com/images/I/71gKNj8OXCL._SL1500_.jpg', inStock: true, description: 'Unpolished brown rice', stock: 70 },
  { name: '24 Mantra Organic White Rice', weight: '1kg', price: 175, oldPrice: 200, discount: '13% OFF', category: 'Organic & Healthy Living', brand: '24 Mantra', image: 'https://m.media-amazon.com/images/I/71F7xNQz-BL._SL1500_.jpg', inStock: true, description: 'Organic basmati rice', stock: 65 },
  { name: 'Pro Nature Organic Quinoa', weight: '500g', price: 295, oldPrice: 330, discount: '11% OFF', category: 'Organic & Healthy Living', brand: 'Pro Nature', image: 'https://m.media-amazon.com/images/I/61TQ9x5SZXL._SL1500_.jpg', inStock: true, description: 'Premium quality quinoa', stock: 50 },

  // ORGANIC SWEETENERS
  { name: 'Organic Honey', weight: '500g', price: 285, oldPrice: 320, discount: '11% OFF', category: 'Organic & Healthy Living', brand: 'Organic India', image: 'https://m.media-amazon.com/images/I/61eC0f3MFNL._SL1500_.jpg', inStock: true, description: '100% pure organic honey', stock: 55 },
  { name: 'Organic Jaggery Powder', weight: '500g', price: 125, oldPrice: 145, discount: '14% OFF', category: 'Organic & Healthy Living', brand: '24 Mantra', image: 'https://m.media-amazon.com/images/I/61mG0Q9dTBL._SL1500_.jpg', inStock: true, description: 'Chemical-free jaggery', stock: 70 },

  // HEALTHY BREAKFAST
  { name: 'Soulfull Ragi Bites', weight: '400g', price: 175, oldPrice: 195, discount: '10% OFF', category: 'Organic & Healthy Living', brand: 'Soulfull', image: 'https://m.media-amazon.com/images/I/71XyF8t6zEL._SL1500_.jpg', inStock: true, description: 'Healthy ragi breakfast cereal', stock: 65 },
  { name: 'Yoga Bar Muesli', weight: '700g', price: 295, oldPrice: 330, discount: '11% OFF', category: 'Organic & Healthy Living', brand: 'Yoga Bar', image: 'https://m.media-amazon.com/images/I/71TN9DQ0Q0L._SL1500_.jpg', inStock: true, description: 'Crunchy muesli with fruits & nuts', stock: 50 },

  // SEEDS & NUTS
  { name: 'Nourish Organics Seeds Mix', weight: '150g', price: 185, oldPrice: 210, discount: '12% OFF', category: 'Organic & Healthy Living', brand: 'Nourish', image: 'https://m.media-amazon.com/images/I/71fK7rD9GXL._SL1500_.jpg', inStock: true, description: 'Mix of chia, flax & sunflower seeds', stock: 60 },
  { name: 'True Elements Chia Seeds', weight: '150g', price: 165, oldPrice: 190, discount: '13% OFF', category: 'Organic & Healthy Living', brand: 'True Elements', image: 'https://m.media-amazon.com/images/I/61dqyS2eRML._SL1280_.jpg', inStock: true, description: 'Premium quality chia seeds', stock: 55 },
  { name: 'True Elements Flax Seeds', weight: '150g', price: 145, oldPrice: 165, discount: '12% OFF', category: 'Organic & Healthy Living', brand: 'True Elements', image: 'https://m.media-amazon.com/images/I/61kK9E1gE1L._SL1280_.jpg', inStock: true, description: 'Roasted flax seeds', stock: 60 },
  { name: 'True Elements Pumpkin Seeds', weight: '125g', price: 185, oldPrice: 210, discount: '12% OFF', category: 'Organic & Healthy Living', brand: 'True Elements', image: 'https://m.media-amazon.com/images/I/71xN7jQnM2L._SL1280_.jpg', inStock: true, description: 'Raw pumpkin seeds', stock: 50 },

  // ORGANIC MILK ALTERNATIVES
  { name: 'Raw Pressery Almond Milk', weight: '1L', price: 195, oldPrice: 220, discount: '11% OFF', category: 'Organic & Healthy Living', brand: 'Raw Pressery', image: 'https://m.media-amazon.com/images/I/51N3rJ0gK5L._SL1080_.jpg', inStock: true, description: 'Unsweetened almond milk', stock: 45 },
  { name: 'Raw Pressery Coconut Milk', weight: '1L', price: 185, oldPrice: 210, discount: '12% OFF', category: 'Organic & Healthy Living', brand: 'Raw Pressery', image: 'https://m.media-amazon.com/images/I/51xmTQr6yJL._SL1080_.jpg', inStock: true, description: 'Fresh coconut milk', stock: 40 },

  // ORGANIC NUT BUTTER
  { name: 'Pintola Organic Peanut Butter', weight: '1kg', price: 495, oldPrice: 550, discount: '10% OFF', category: 'Organic & Healthy Living', brand: 'Pintola', image: 'https://m.media-amazon.com/images/I/61vjgvV0IrL._SL1500_.jpg', inStock: true, description: 'All natural crunchy peanut butter', stock: 40 },
  { name: 'Pintola Organic Almond Butter', weight: '500g', price: 625, oldPrice: 699, discount: '11% OFF', category: 'Organic & Healthy Living', brand: 'Pintola', image: 'https://m.media-amazon.com/images/I/619K8eUzYeL._SL1500_.jpg', inStock: true, description: '100% roasted almonds', stock: 35 },

  // HEALTHY SNACKS
  { name: 'Yoga Bar Protein Bars', weight: '6 pcs', price: 295, oldPrice: 330, discount: '11% OFF', category: 'Organic & Healthy Living', brand: 'Yoga Bar', image: 'https://m.media-amazon.com/images/I/71lWQcLSGYL._SL1500_.jpg', inStock: true, description: 'High protein nutrition bars', stock: 55 },
  { name: 'RiteBite Max Protein Bars', weight: '6 pcs', price: 285, oldPrice: 320, discount: '11% OFF', category: 'Organic & Healthy Living', brand: 'RiteBite', image: 'https://m.media-amazon.com/images/I/71oM8kqLFuL._SL1500_.jpg', inStock: true, description: 'Active protein bars', stock: 60 },

  // ORGANIC OIL
  { name: 'Organic Cold Pressed Coconut Oil', weight: '500ml', price: 285, oldPrice: 320, discount: '11% OFF', category: 'Organic & Healthy Living', brand: '24 Mantra', image: 'https://m.media-amazon.com/images/I/71cFy5gTLLL._SL1500_.jpg', inStock: true, description: '100% pure virgin coconut oil', stock: 50 }
];

// ========== SMART MIGRATION FUNCTION ==========
const smartMigrate = async () => {
  try {
    console.log('\n🌿 Starting Smart Migration for Organic & Healthy Living...\n');
    console.log('━'.repeat(60));
    
    let added = 0, updated = 0, unchanged = 0;
    
    const existingProducts = await Product.find({ category: "Organic & Healthy Living" });
    
    const existingMap = new Map();
    existingProducts.forEach(product => {
      const key = `${product.name}_${product.weight}`;
      existingMap.set(key, product);
    });
    
    const sourceProductKeys = new Set();
    
    for (const productData of organicHealthyProducts) {
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
    console.log(`   📦 Total in DB: ${await Product.countDocuments({ category: "Organic & Healthy Living" })}`);
    console.log('\n✅ Migration Complete!\n');
    
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Migration Error:', err);
    process.exit(1);
  }
};

smartMigrate();