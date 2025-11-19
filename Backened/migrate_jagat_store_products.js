// migrate_jagat_store_IMPROVED.js - Smart Migration with Add/Update/Delete
// Save in Backend folder and run: node migrate_jagat_store_IMPROVED.js

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

// ========== JAGAT STORE EXCLUSIVE PRODUCTS ==========
const jagatStoreProducts = [
  // FRESH VEGETABLES (10 products)
  { name: "Fresh Tomato", weight: "500g", price: 25, oldPrice: 30, discount: "17% OFF", category: "Jagat Store", brand: "Jagat Fresh", image: "https://m.media-amazon.com/images/I/61TdF3q7L9L._SL1500_.jpg", inStock: true, description: "Fresh red tomatoes, locally sourced", stock: 100 },
  { name: "Fresh Onion", weight: "1kg", price: 35, category: "Jagat Store", brand: "Jagat Fresh", image: "https://m.media-amazon.com/images/I/61X4FqH7hWL._SL1500_.jpg", inStock: true, description: "Premium quality onions", stock: 100 },
  { name: "Fresh Potato", weight: "1kg", price: 30, category: "Jagat Store", brand: "Jagat Fresh", image: "https://m.media-amazon.com/images/I/61zZ6ypOBTL._SL1500_.jpg", inStock: true, description: "Farm fresh potatoes", stock: 100 },
  { name: "Green Capsicum", weight: "250g", price: 28, category: "Jagat Store", brand: "Jagat Fresh", image: "https://m.media-amazon.com/images/I/61IiMLgTusL._SL1500_.jpg", inStock: true, description: "Fresh green bell peppers", stock: 90 },
  { name: "Fresh Cucumber", weight: "500g", price: 20, category: "Jagat Store", brand: "Jagat Fresh", image: "https://m.media-amazon.com/images/I/61rqI4fCLvL._SL1500_.jpg", inStock: true, description: "Crispy fresh cucumbers", stock: 95 },
  { name: "Fresh Carrot", weight: "500g", price: 35, category: "Jagat Store", brand: "Jagat Fresh", image: "https://m.media-amazon.com/images/I/61XM7pTjQgL._SL1500_.jpg", inStock: true, description: "Healthy orange carrots", stock: 90 },
  { name: "Fresh Spinach (Palak)", weight: "250g", price: 18, category: "Jagat Store", brand: "Jagat Fresh", image: "https://m.media-amazon.com/images/I/61TQZpWlK2L._SL1500_.jpg", inStock: true, description: "Fresh green spinach leaves", stock: 85 },
  { name: "Fresh Coriander Leaves", weight: "100g", price: 12, category: "Jagat Store", brand: "Jagat Fresh", image: "https://m.media-amazon.com/images/I/61hqIWJXXxL._SL1500_.jpg", inStock: true, description: "Fresh dhania patta", stock: 80 },
  { name: "Fresh Ginger", weight: "250g", price: 45, oldPrice: 55, discount: "18% OFF", category: "Jagat Store", brand: "Jagat Fresh", image: "https://m.media-amazon.com/images/I/61v6TmRCJxL._SL1500_.jpg", inStock: true, description: "Premium quality ginger (adrak)", stock: 75 },
  { name: "Fresh Green Chilli", weight: "100g", price: 15, category: "Jagat Store", brand: "Jagat Fresh", image: "https://m.media-amazon.com/images/I/61GRQ6Y7KWL._SL1500_.jpg", inStock: true, description: "Spicy green chillies (hari mirch)", stock: 85 },

  // FRESH FRUITS (10 products)
  { name: "Fresh Banana", weight: "6 pcs", price: 42, category: "Jagat Store", brand: "Jagat Fresh", image: "https://m.media-amazon.com/images/I/61OPzCQCTlL._SL1500_.jpg", inStock: true, description: "Ripe yellow bananas (kela)", stock: 100 },
  { name: "Fresh Apple - Royal Gala", weight: "4 pcs (500g)", price: 120, oldPrice: 145, discount: "17% OFF", category: "Jagat Store", brand: "Jagat Fresh", image: "https://m.media-amazon.com/images/I/71nZTt1GICL._SL1500_.jpg", inStock: true, description: "Premium quality apples (seb)", stock: 90 },
  { name: "Fresh Orange", weight: "1kg", price: 80, category: "Jagat Store", brand: "Jagat Fresh", image: "https://m.media-amazon.com/images/I/61m9vC40qRL._SL1500_.jpg", inStock: true, description: "Juicy fresh oranges (santra)", stock: 95 },
  { name: "Fresh Pomegranate", weight: "2 pcs (500g)", price: 150, oldPrice: 180, discount: "17% OFF", category: "Jagat Store", brand: "Jagat Fresh", image: "https://m.media-amazon.com/images/I/61T+kq4VDSL._SL1500_.jpg", inStock: true, description: "Sweet pomegranate (anar)", stock: 80 },
  { name: "Fresh Papaya", weight: "1 pc (800g)", price: 55, category: "Jagat Store", brand: "Jagat Fresh", image: "https://m.media-amazon.com/images/I/61eS4wRoZ5L._SL1500_.jpg", inStock: true, description: "Ripe papaya (papita)", stock: 75 },
  { name: "Fresh Watermelon", weight: "1 pc (3-4kg)", price: 45, category: "Jagat Store", brand: "Jagat Fresh", image: "https://m.media-amazon.com/images/I/71ZgTKiNshL._SL1500_.jpg", inStock: true, description: "Sweet red watermelon (tarbooz)", stock: 60 },
  { name: "Fresh Mango - Alphonso", weight: "6 pcs (1kg)", price: 299, oldPrice: 349, discount: "14% OFF", category: "Jagat Store", brand: "Jagat Fresh", image: "https://m.media-amazon.com/images/I/61r9xZmTBaL._SL1500_.jpg", inStock: true, description: "Premium Alphonso mangoes (aam)", stock: 50 },
  { name: "Fresh Grapes - Green", weight: "500g", price: 85, category: "Jagat Store", brand: "Jagat Fresh", image: "https://m.media-amazon.com/images/I/61UtWOy-1bL._SL1500_.jpg", inStock: true, description: "Seedless green grapes (angoor)", stock: 70 },
  { name: "Fresh Kiwi", weight: "3 pcs", price: 99, category: "Jagat Store", brand: "Jagat Fresh", image: "https://m.media-amazon.com/images/I/61pV72CU3LL._SL1500_.jpg", inStock: true, description: "Fresh kiwi fruits", stock: 65 },
  { name: "Fresh Pineapple", weight: "1 pc (1kg)", price: 65, category: "Jagat Store", brand: "Jagat Fresh", image: "https://m.media-amazon.com/images/I/61oQ8P+J35L._SL1500_.jpg", inStock: true, description: "Sweet pineapple (ananas)", stock: 60 },

  // PACKAGED FOODS (10 products)
  { name: "Jagat Special Namkeen Mix", weight: "400g", price: 89, oldPrice: 110, discount: "19% OFF", category: "Jagat Store", brand: "Jagat Foods", image: "https://m.media-amazon.com/images/I/71GMn8dKsEL._SL1500_.jpg", inStock: true, description: "Crispy namkeen mixture", stock: 100 },
  { name: "Jagat Roasted Peanuts", weight: "500g", price: 75, category: "Jagat Store", brand: "Jagat Foods", image: "https://m.media-amazon.com/images/I/71VFN5s2WTL._SL1500_.jpg", inStock: true, description: "Lightly salted roasted moongfali", stock: 95 },
  { name: "Jagat Poha Thick", weight: "1kg", price: 55, category: "Jagat Store", brand: "Jagat Foods", image: "https://m.media-amazon.com/images/I/71cjJVNQZ9L._SL1500_.jpg", inStock: true, description: "Premium quality thick poha", stock: 90 },
  { name: "Jagat Besan (Gram Flour)", weight: "1kg", price: 95, category: "Jagat Store", brand: "Jagat Foods", image: "https://m.media-amazon.com/images/I/71MQXx7V6DL._SL1500_.jpg", inStock: true, description: "Pure gram flour for pakoras", stock: 85 },
  { name: "Jagat Sooji (Rava)", weight: "500g", price: 42, category: "Jagat Store", brand: "Jagat Foods", image: "https://m.media-amazon.com/images/I/71GwvQ2R7rL._SL1500_.jpg", inStock: true, description: "Fine quality semolina", stock: 90 },
  { name: "Jagat Maida (All Purpose Flour)", weight: "1kg", price: 48, category: "Jagat Store", brand: "Jagat Foods", image: "https://m.media-amazon.com/images/I/71Jy8pRTJ2L._SL1500_.jpg", inStock: true, description: "Refined wheat flour", stock: 95 },
  { name: "Jagat Roasted Chana", weight: "500g", price: 65, category: "Jagat Store", brand: "Jagat Foods", image: "https://m.media-amazon.com/images/I/71PK3PpRtEL._SL1500_.jpg", inStock: true, description: "Healthy roasted chickpeas snack", stock: 100 },
  { name: "Jagat Cornflakes", weight: "800g", price: 149, oldPrice: 175, discount: "15% OFF", category: "Jagat Store", brand: "Jagat Foods", image: "https://m.media-amazon.com/images/I/71nSvPZGiGL._SL1500_.jpg", inStock: true, description: "Crispy breakfast cornflakes", stock: 80 },
  { name: "Jagat Oats", weight: "1kg", price: 165, oldPrice: 190, discount: "13% OFF", category: "Jagat Store", brand: "Jagat Foods", image: "https://m.media-amazon.com/images/I/71GJDhj7YwL._SL1500_.jpg", inStock: true, description: "Healthy rolled oats", stock: 75 },
  { name: "Jagat Vermicelli (Seviyaan)", weight: "400g", price: 45, category: "Jagat Store", brand: "Jagat Foods", image: "https://m.media-amazon.com/images/I/61fQX7j3nBL._SL1500_.jpg", inStock: true, description: "Roasted vermicelli for kheer", stock: 85 },

  // BEVERAGES (10 products)
  { name: "Jagat Fresh Juice - Orange", weight: "1L", price: 120, oldPrice: 145, discount: "17% OFF", category: "Jagat Store", brand: "Jagat Beverages", image: "https://m.media-amazon.com/images/I/61SPH8dL+cL._SL1500_.jpg", inStock: true, description: "Fresh orange juice, no preservatives", stock: 70 },
  { name: "Jagat Fresh Juice - Mixed Fruit", weight: "1L", price: 115, category: "Jagat Store", brand: "Jagat Beverages", image: "https://m.media-amazon.com/images/I/71UBnY8rDzL._SL1500_.jpg", inStock: true, description: "Blend of fresh fruits", stock: 75 },
  { name: "Jagat Lassi - Sweet", weight: "500ml", price: 45, category: "Jagat Store", brand: "Jagat Dairy", image: "https://m.media-amazon.com/images/I/61+8T8MvY8L._SL1500_.jpg", inStock: true, description: "Traditional sweet lassi", stock: 80 },
  { name: "Jagat Buttermilk (Chaas)", weight: "500ml", price: 25, category: "Jagat Store", brand: "Jagat Dairy", image: "https://m.media-amazon.com/images/I/61bQR0H7qVL._SL1500_.jpg", inStock: true, description: "Fresh spiced buttermilk", stock: 85 },
  { name: "Jagat Premium Tea", weight: "500g", price: 185, oldPrice: 220, discount: "16% OFF", category: "Jagat Store", brand: "Jagat Beverages", image: "https://m.media-amazon.com/images/I/71XnCqcPXBL._SL1500_.jpg", inStock: true, description: "Premium quality loose tea leaves", stock: 70 },
  { name: "Jagat Green Tea", weight: "100 bags", price: 299, oldPrice: 349, discount: "14% OFF", category: "Jagat Store", brand: "Jagat Beverages", image: "https://m.media-amazon.com/images/I/71Q8QXOgxZL._SL1500_.jpg", inStock: true, description: "Healthy green tea bags", stock: 60 },
  { name: "Jagat Instant Coffee", weight: "100g", price: 145, category: "Jagat Store", brand: "Jagat Beverages", image: "https://m.media-amazon.com/images/I/71g4FaV+SQL._SL1500_.jpg", inStock: true, description: "Rich instant coffee powder", stock: 75 },
  { name: "Jagat Coconut Water", weight: "500ml", price: 55, category: "Jagat Store", brand: "Jagat Beverages", image: "https://m.media-amazon.com/images/I/61U7Uw4CjxL._SL1500_.jpg", inStock: true, description: "Natural coconut water (nariyal pani)", stock: 80 },
  { name: "Jagat Mango Drink", weight: "1L", price: 95, category: "Jagat Store", brand: "Jagat Beverages", image: "https://m.media-amazon.com/images/I/71zoYuRfBVL._SL1500_.jpg", inStock: true, description: "Refreshing mango flavored drink", stock: 85 },
  { name: "Jagat Lemonade", weight: "750ml", price: 65, category: "Jagat Store", brand: "Jagat Beverages", image: "https://m.media-amazon.com/images/I/61Z8MYD3JLL._SL1500_.jpg", inStock: true, description: "Fresh lemon drink (nimbu pani)", stock: 90 },

  // HOUSEHOLD ESSENTIALS (10 products)
  { name: "Jagat Detergent Powder", weight: "2kg", price: 249, oldPrice: 299, discount: "17% OFF", category: "Jagat Store", brand: "Jagat Home", image: "https://m.media-amazon.com/images/I/71NvSDN2vUL._SL1500_.jpg", inStock: true, description: "Powerful cleaning detergent", stock: 70 },
  { name: "Jagat Dishwash Liquid", weight: "1L", price: 125, category: "Jagat Store", brand: "Jagat Home", image: "https://m.media-amazon.com/images/I/61vFdIZKT3L._SL1500_.jpg", inStock: true, description: "Grease cutting dishwash gel", stock: 75 },
  { name: "Jagat Floor Cleaner", weight: "1L", price: 99, oldPrice: 120, discount: "18% OFF", category: "Jagat Store", brand: "Jagat Home", image: "https://m.media-amazon.com/images/I/61xQpB7NHGL._SL1500_.jpg", inStock: true, description: "Multi-purpose floor cleaner", stock: 80 },
  { name: "Jagat Toilet Cleaner", weight: "1L", price: 115, category: "Jagat Store", brand: "Jagat Home", image: "https://m.media-amazon.com/images/I/61rkR8R0jmL._SL1500_.jpg", inStock: true, description: "Powerful toilet bowl cleaner", stock: 70 },
  { name: "Jagat Phenyl", weight: "1L", price: 65, category: "Jagat Store", brand: "Jagat Home", image: "https://m.media-amazon.com/images/I/61dZ7xNPQqL._SL1500_.jpg", inStock: true, description: "Disinfectant floor cleaner", stock: 85 },
  { name: "Jagat Garbage Bags", weight: "30 pcs (Large)", price: 89, category: "Jagat Store", brand: "Jagat Home", image: "https://m.media-amazon.com/images/I/71YgJ0QmCBL._SL1500_.jpg", inStock: true, description: "Strong dustbin bags", stock: 90 },
  { name: "Jagat Naphthalene Balls", weight: "200g", price: 45, category: "Jagat Store", brand: "Jagat Home", image: "https://m.media-amazon.com/images/I/61h4Z0c7uNL._SL1500_.jpg", inStock: true, description: "Moth repellent balls (kapoor)", stock: 95 },
  { name: "Jagat Air Freshener", weight: "300ml", price: 135, oldPrice: 160, discount: "16% OFF", category: "Jagat Store", brand: "Jagat Home", image: "https://m.media-amazon.com/images/I/61BZ6tJ9qEL._SL1500_.jpg", inStock: true, description: "Room freshener spray", stock: 60 },
  { name: "Jagat Mosquito Coil", weight: "10 pcs", price: 55, category: "Jagat Store", brand: "Jagat Home", image: "https://m.media-amazon.com/images/I/71YqV7kR7cL._SL1500_.jpg", inStock: true, description: "Mosquito repellent coils", stock: 100 },
  { name: "Jagat Scrub Pad", weight: "6 pcs", price: 49, category: "Jagat Store", brand: "Jagat Home", image: "https://m.media-amazon.com/images/I/61YcPn7bXZL._SL1500_.jpg", inStock: true, description: "Kitchen scrubbing pads", stock: 110 }
];

// ========== SMART MIGRATION FUNCTION ==========
const smartMigrate = async () => {
  try {
    console.log('\n🏪 Starting Smart Migration for Jagat Store...\n');
    console.log('━'.repeat(60));
    
    let added = 0, updated = 0, unchanged = 0;
    
    const existingProducts = await Product.find({ category: "Jagat Store" });
    
    const existingMap = new Map();
    existingProducts.forEach(product => {
      const key = `${product.name}_${product.weight}`;
      existingMap.set(key, product);
    });
    
    const sourceProductKeys = new Set();
    
    for (const productData of jagatStoreProducts) {
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
    console.log(`   📦 Total in DB: ${await Product.countDocuments({ category: "Jagat Store" })}`);
    
    console.log('\n📋 Product Categories:');
    console.log('   🥬 Fresh Vegetables: 10 products');
    console.log('   🍎 Fresh Fruits: 10 products');
    console.log('   🍱 Packaged Foods: 10 products');
    console.log('   🥤 Beverages: 10 products');
    console.log('   🧹 Household Essentials: 10 products');
    
    console.log('\n✅ Migration Complete!\n');
    
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Migration Error:', err);
    process.exit(1);
  }
};

smartMigrate();