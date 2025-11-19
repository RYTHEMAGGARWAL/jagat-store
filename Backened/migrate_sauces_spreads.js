// migrate_sauces_spreads_IMPROVED.js - Smart Migration with Add/Update/Delete
// Save in Backend folder and run: node migrate_sauces_spreads_IMPROVED.js

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

// ========== SAUCES & SPREADS PRODUCTS ==========
const saucesAndSpreadsProducts = [
  // TOMATO KETCHUP
  { name: 'Kissan Fresh Tomato Ketchup', weight: '200g', price: 45, oldPrice: 50, discount: '10% OFF', category: 'Sauces Spreads', brand: 'Kissan', image: 'https://m.media-amazon.com/images/I/71G8fX8DJQL._SL1500_.jpg', inStock: true, description: 'India\'s favorite tomato ketchup', stock: 100 },
  { name: 'Kissan Fresh Tomato Ketchup', weight: '500g', price: 95, oldPrice: 105, discount: '10% OFF', category: 'Sauces Spreads', brand: 'Kissan', image: 'https://m.media-amazon.com/images/I/71G8fX8DJQL._SL1500_.jpg', inStock: true, description: 'Family pack tomato ketchup', stock: 80 },
  { name: 'Maggi Rich Tomato Ketchup', weight: '1kg', price: 140, oldPrice: 160, discount: '13% OFF', category: 'Sauces Spreads', brand: 'Maggi', image: 'https://m.media-amazon.com/images/I/61HB0sK7eEL._SL1500_.jpg', inStock: true, description: 'Rich and tangy ketchup', stock: 60 },

  // CHILLI SAUCE
  { name: 'Ching\'s Secret Red Chilli Sauce', weight: '200g', price: 50, oldPrice: 55, discount: '9% OFF', category: 'Sauces Spreads', brand: 'Ching\'s Secret', image: 'https://m.media-amazon.com/images/I/61IC1tL8fFL._SL1500_.jpg', inStock: true, description: 'Spicy red chilli sauce', stock: 75 },
  { name: 'Ching\'s Secret Green Chilli Sauce', weight: '190g', price: 48, oldPrice: 52, discount: '8% OFF', category: 'Sauces Spreads', brand: 'Ching\'s Secret', image: 'https://m.media-amazon.com/images/I/61JD2uM9gGL._SL1500_.jpg', inStock: true, description: 'Tangy green chilli sauce', stock: 70 },

  // SOY SAUCE
  { name: 'Ching\'s Secret Dark Soy Sauce', weight: '210g', price: 55, oldPrice: 60, discount: '8% OFF', category: 'Sauces Spreads', brand: 'Ching\'s Secret', image: 'https://m.media-amazon.com/images/I/61KE3vN0hHL._SL1500_.jpg', inStock: true, description: 'Premium dark soy sauce', stock: 65 },
  { name: 'Lee Kum Kee Premium Soy Sauce', weight: '500ml', price: 180, oldPrice: 200, discount: '10% OFF', category: 'Sauces Spreads', brand: 'Lee Kum Kee', image: 'https://m.media-amazon.com/images/I/61LF4wO1iIL._SL1500_.jpg', inStock: true, description: 'Authentic Chinese soy sauce', stock: 40 },

  // SCHEZWAN SAUCE
  { name: 'Ching\'s Secret Schezwan Chutney', weight: '250g', price: 65, oldPrice: 70, discount: '7% OFF', category: 'Sauces Spreads', brand: 'Ching\'s Secret', image: 'https://m.media-amazon.com/images/I/61MG5xP2jJL._SL1500_.jpg', inStock: true, description: 'Spicy Schezwan sauce', stock: 85 },

  // MAYONNAISE
  { name: 'Veeba Eggless Mayo', weight: '250g', price: 85, oldPrice: 95, discount: '11% OFF', category: 'Sauces Spreads', brand: 'Veeba', image: 'https://m.media-amazon.com/images/I/61NH6yQ3kKL._SL1500_.jpg', inStock: true, description: 'Creamy eggless mayonnaise', stock: 90 },
  { name: 'Dr. Oetker FunFoods Veg Mayonnaise', weight: '500g', price: 150, oldPrice: 165, discount: '9% OFF', category: 'Sauces Spreads', brand: 'Dr. Oetker', image: 'https://m.media-amazon.com/images/I/61OI7zR4lLL._SL1500_.jpg', inStock: true, description: 'India\'s favorite mayo', stock: 75 },
  { name: 'Hellmann\'s Real Mayonnaise', weight: '400ml', price: 220, oldPrice: 245, discount: '10% OFF', category: 'Sauces Spreads', brand: 'Hellmann\'s', image: 'https://m.media-amazon.com/images/I/61PJ8AS5mML._SL1500_.jpg', inStock: true, description: 'World\'s best selling mayo', stock: 50 },

  // PEANUT BUTTER
  { name: 'Sundrop Peanut Butter Crunchy', weight: '462g', price: 180, oldPrice: 200, discount: '10% OFF', category: 'Sauces Spreads', brand: 'Sundrop', image: 'https://m.media-amazon.com/images/I/61QK9BT6nNL._SL1500_.jpg', inStock: true, description: 'High protein crunchy', stock: 70 },
  { name: 'Sundrop Peanut Butter Creamy', weight: '924g', price: 330, oldPrice: 370, discount: '11% OFF', category: 'Sauces Spreads', brand: 'Sundrop', image: 'https://m.media-amazon.com/images/I/61QK9BT6nNL._SL1500_.jpg', inStock: true, description: 'Smooth and creamy', stock: 60 },
  { name: 'Alpino Peanut Butter Smooth', weight: '1kg', price: 450, oldPrice: 499, discount: '10% OFF', category: 'Sauces Spreads', brand: 'Alpino', image: 'https://m.media-amazon.com/images/I/61RL0CU7oOL._SL1500_.jpg', inStock: true, description: '100% natural peanut butter', stock: 45 },

  // JAM
  { name: 'Kissan Mixed Fruit Jam', weight: '200g', price: 65, oldPrice: 72, discount: '10% OFF', category: 'Sauces Spreads', brand: 'Kissan', image: 'https://m.media-amazon.com/images/I/71SM1DV8pPL._SL1500_.jpg', inStock: true, description: 'Delicious mixed fruit jam', stock: 80 },
  { name: 'Kissan Mixed Fruit Jam', weight: '500g', price: 140, oldPrice: 155, discount: '10% OFF', category: 'Sauces Spreads', brand: 'Kissan', image: 'https://m.media-amazon.com/images/I/71SM1DV8pPL._SL1500_.jpg', inStock: true, description: 'Family pack jam', stock: 70 },
  { name: 'Kissan Pineapple Jam', weight: '200g', price: 68, oldPrice: 75, discount: '9% OFF', category: 'Sauces Spreads', brand: 'Kissan', image: 'https://m.media-amazon.com/images/I/71TN2EW9qQL._SL1500_.jpg', inStock: true, description: 'Tangy pineapple jam', stock: 65 },
  { name: 'Kissan Mango Jam', weight: '200g', price: 70, oldPrice: 77, discount: '9% OFF', category: 'Sauces Spreads', brand: 'Kissan', image: 'https://m.media-amazon.com/images/I/71UO3FX0rRL._SL1500_.jpg', inStock: true, description: 'Sweet mango jam', stock: 75 },

  // CHOCOLATE SPREAD
  { name: 'Nutella Hazelnut Spread', weight: '350g', price: 320, oldPrice: 360, discount: '11% OFF', category: 'Sauces Spreads', brand: 'Nutella', image: 'https://m.media-amazon.com/images/I/71VP4GY1sSL._SL1500_.jpg', inStock: true, description: 'World famous hazelnut spread', stock: 55 },
  { name: 'Nutella Hazelnut Spread', weight: '750g', price: 650, oldPrice: 720, discount: '10% OFF', category: 'Sauces Spreads', brand: 'Nutella', image: 'https://m.media-amazon.com/images/I/71VP4GY1sSL._SL1500_.jpg', inStock: true, description: 'Family pack Nutella', stock: 40 },
  { name: 'Hershey\'s Chocolate Syrup', weight: '623g', price: 280, oldPrice: 310, discount: '10% OFF', category: 'Sauces Spreads', brand: 'Hershey\'s', image: 'https://m.media-amazon.com/images/I/61WQ5HZ2tTL._SL1500_.jpg', inStock: true, description: 'Premium chocolate syrup', stock: 50 },

  // PASTA SAUCE
  { name: 'Kissan Pasta Sauce Italian Blend', weight: '200g', price: 75, oldPrice: 82, discount: '9% OFF', category: 'Sauces Spreads', brand: 'Kissan', image: 'https://m.media-amazon.com/images/I/61XR6IaA3UL._SL1500_.jpg', inStock: true, description: 'Ready to use pasta sauce', stock: 60 },
  { name: 'Maggi Pasta Sauce Tomato Basil', weight: '140g', price: 65, oldPrice: 70, discount: '7% OFF', category: 'Sauces Spreads', brand: 'Maggi', image: 'https://m.media-amazon.com/images/I/61YS7JbB4VL._SL1500_.jpg', inStock: true, description: 'Tomato and basil sauce', stock: 70 },

  // VINEGAR
  { name: 'Heinz Apple Cider Vinegar', weight: '473ml', price: 195, oldPrice: 215, discount: '9% OFF', category: 'Sauces Spreads', brand: 'Heinz', image: 'https://m.media-amazon.com/images/I/61ZT8KcC5WL._SL1500_.jpg', inStock: true, description: 'Natural apple cider vinegar', stock: 45 },
  { name: 'American Garden White Vinegar', weight: '473ml', price: 120, oldPrice: 135, discount: '11% OFF', category: 'Sauces Spreads', brand: 'American Garden', image: 'https://m.media-amazon.com/images/I/61aU9LdD6XL._SL1500_.jpg', inStock: true, description: 'Pure white vinegar', stock: 55 },

  // HONEY
  { name: 'Dabur Honey', weight: '400g', price: 185, oldPrice: 205, discount: '10% OFF', category: 'Sauces Spreads', brand: 'Dabur', image: 'https://m.media-amazon.com/images/I/61bV0MeE7YL._SL1500_.jpg', inStock: true, description: '100% pure honey', stock: 80 },
  { name: 'Dabur Honey', weight: '1kg', price: 420, oldPrice: 470, discount: '11% OFF', category: 'Sauces Spreads', brand: 'Dabur', image: 'https://m.media-amazon.com/images/I/61bV0MeE7YL._SL1500_.jpg', inStock: true, description: 'Family pack pure honey', stock: 60 },
  { name: 'Patanjali Pure Honey', weight: '500g', price: 160, oldPrice: 180, discount: '11% OFF', category: 'Sauces Spreads', brand: 'Patanjali', image: 'https://m.media-amazon.com/images/I/61cW1NfF8ZL._SL1500_.jpg', inStock: true, description: 'Natural pure honey', stock: 70 }
];

// ========== SMART MIGRATION FUNCTION ==========
const smartMigrate = async () => {
  try {
    console.log('\n🍯 Starting Smart Migration for Sauces & Spreads...\n');
    console.log('━'.repeat(60));
    
    let added = 0, updated = 0, unchanged = 0;
    
    const existingProducts = await Product.find({ category: "Sauces Spreads" });
    
    const existingMap = new Map();
    existingProducts.forEach(product => {
      const key = `${product.name}_${product.weight}`;
      existingMap.set(key, product);
    });
    
    const sourceProductKeys = new Set();
    
    for (const productData of saucesAndSpreadsProducts) {
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
    console.log(`   📦 Total in DB: ${await Product.countDocuments({ category: "Sauces Spreads" })}`);
    
    console.log('\n📋 Product Categories:');
    console.log('   🍅 Tomato Ketchup: 3 products');
    console.log('   🌶️  Chilli & Soy Sauce: 4 products');
    console.log('   🥪 Mayonnaise: 3 products');
    console.log('   🥜 Peanut Butter: 3 products');
    console.log('   🍓 Jams: 4 products');
    console.log('   🍫 Chocolate Spread: 3 products');
    console.log('   🍝 Pasta Sauce: 2 products');
    console.log('   🍯 Honey & Vinegar: 5 products');
    
    console.log('\n✅ Migration Complete!\n');
    
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Migration Error:', err);
    process.exit(1);
  }
};

smartMigrate();