// migrate_atta_rice_dal_IMPROVED.js - Smart Migration with Add/Update/Delete
// Save in Backend folder and run: node migrate_atta_rice_dal_IMPROVED.js

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

// ========== ATTA RICE DAL PRODUCTS ==========
// ADD/EDIT/DELETE products here and run the script
const attaRiceDalProducts = [
  // ATTA (Wheat Flour)
  { 
    name: "Aashirvaad Whole Wheat Atta", 
    weight: "5kg", 
    price: 239, 
    oldPrice: 262, 
    discount: "8% OFF", 
    category: "Atta Rice Dal", 
    brand: "Aashirvaad", 
    image: 	"https://th.bing.com/th/id/OIP.Jy9xCIAIgVmqIg3wRVTcAwHaIt?w=160&h=188&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3", 
    inStock: true, 
    description: "100% whole wheat atta, made from MP wheat",
    stock: 50
  },
  { 
    name: "Aashirvaad Whole Wheat Atta", 
    weight: "10kg", 
    price: 545, 
    oldPrice: 595, 
    discount: "8% OFF", 
    category: "Atta Rice Dal", 
    brand: "Aashirvaad", 
    image: "https://m.media-amazon.com/images/I/71VqJK+GzhL._SL1500_.jpg", 
    inStock: true, 
    description: "100% whole wheat atta, family pack",
    stock: 50
  },
  { 
    name: "Fortune Chakki Fresh Atta", 
    weight: "5kg", 
    price: 265, 
    oldPrice: 290, 
    discount: "9% OFF", 
    category: "Atta Rice Dal", 
    brand: "Fortune", 
    image: "https://m.media-amazon.com/images/I/71nvAAs1HzL._SL1500_.jpg", 
    inStock: true, 
    description: "Freshly chakki ground atta for soft rotis",
    stock: 50
  },
  { 
    name: "Fortune Chakki Fresh Atta", 
    weight: "10kg", 
    price: 525, 
    oldPrice: 570, 
    discount: "8% OFF", 
    category: "Atta Rice Dal", 
    brand: "Fortune", 
    image: "https://m.media-amazon.com/images/I/71gvsFc0JuL._SL1500_.jpg", 
    inStock: true, 
    description: "Freshly chakki ground atta, family pack",
    stock: 50
  },
  { 
    name: "Nature Fresh Sampoorna Chakki Atta", 
    weight: "5kg", 
    price: 245, 
    oldPrice: 270, 
    discount: "9% OFF", 
    category: "Atta Rice Dal", 
    brand: "Nature Fresh", 
    image: "https://m.media-amazon.com/images/I/71H8jPE+qWL._SL1500_.jpg", 
    inStock: true, 
    description: "100% sampoorna whole wheat chakki atta",
    stock: 50
  },
  { 
    name: "Nature Fresh Sampoorna Chakki Atta", 
    weight: "10kg", 
    price: 485, 
    oldPrice: 530, 
    discount: "8% OFF", 
    category: "Atta Rice Dal", 
    brand: "Nature Fresh", 
    image: "https://m.media-amazon.com/images/I/71PXvN1UKZL._SL1500_.jpg", 
    inStock: true, 
    description: "100% sampoorna whole wheat chakki atta, family pack",
    stock: 50
  },
  { 
    name: "Pillsbury Chakki Fresh Atta", 
    weight: "5kg", 
    price: 275, 
    category: "Atta Rice Dal", 
    brand: "Pillsbury", 
    image: "https://m.media-amazon.com/images/I/71rH8K7RDVL._SL1500_.jpg", 
    inStock: true, 
    description: "Fresh chakki ground atta",
    stock: 50
  },
  { 
    name: "Annapurna Atta", 
    weight: "10kg", 
    price: 520, 
    oldPrice: 570, 
    discount: "9% OFF", 
    category: "Atta Rice Dal", 
    brand: "Annapurna", 
    image: "https://m.media-amazon.com/images/I/71gG8kZiVgL._SL1500_.jpg", 
    inStock: true, 
    description: "Premium quality atta",
    stock: 50
  },
  
  // RICE
  { 
    name: "India Gate Basmati Rice", 
    weight: "5kg", 
    price: 550, 
    oldPrice: 600, 
    discount: "8% OFF", 
    category: "Atta Rice Dal", 
    brand: "India Gate", 
    image: "https://m.media-amazon.com/images/I/71UqLdfS9xL._SL1500_.jpg", 
    inStock: true, 
    description: "Premium basmati rice",
    stock: 50
  },
  { 
    name: "India Gate Basmati Rice", 
    weight: "1kg", 
    price: 120, 
    category: "Atta Rice Dal", 
    brand: "India Gate", 
    image: "https://m.media-amazon.com/images/I/71vHJlf7OeL._SL1500_.jpg", 
    inStock: true, 
    description: "Small pack basmati",
    stock: 50
  },
  { 
    name: "Daawat Basmati Rice", 
    weight: "5kg", 
    price: 580, 
    oldPrice: 630, 
    discount: "8% OFF", 
    category: "Atta Rice Dal", 
    brand: "Daawat", 
    image: "https://m.media-amazon.com/images/I/71WxXQa1ueL._SL1500_.jpg", 
    inStock: true, 
    description: "Long grain basmati",
    stock: 50
  },
  { 
    name: "Kohinoor Basmati Rice", 
    weight: "5kg", 
    price: 600, 
    oldPrice: 650, 
    discount: "8% OFF", 
    category: "Atta Rice Dal", 
    brand: "Kohinoor", 
    image: "https://m.media-amazon.com/images/I/71qJOjQdYJL._SL1500_.jpg", 
    inStock: true, 
    description: "Super basmati rice",
    stock: 50
  },
  { 
    name: "Fortune Rozana Basmati Rice", 
    weight: "5kg", 
    price: 450, 
    category: "Atta Rice Dal", 
    brand: "Fortune", 
    image: "https://m.media-amazon.com/images/I/71UKgJ1sKuL._SL1500_.jpg", 
    inStock: true, 
    description: "Everyday basmati rice",
    stock: 50
  },
  { 
    name: "Sonamasuri Rice", 
    weight: "5kg", 
    price: 320, 
    category: "Atta Rice Dal", 
    brand: "Generic", 
    image: "https://m.media-amazon.com/images/I/71OMrfCkZhL._SL1500_.jpg", 
    inStock: true, 
    description: "South Indian rice",
    stock: 50
  },
  { 
    name: "Brown Rice", 
    weight: "1kg", 
    price: 150, 
    category: "Atta Rice Dal", 
    brand: "India Gate", 
    image: "https://m.media-amazon.com/images/I/71yxnYBqWEL._SL1500_.jpg", 
    inStock: true, 
    description: "Healthy brown rice",
    stock: 50
  },
  
  // DAL (Pulses)
  { 
    name: "Tata Sampann Toor Dal", 
    weight: "1kg", 
    price: 180, 
    oldPrice: 195, 
    discount: "8% OFF", 
    category: "Atta Rice Dal", 
    brand: "Tata Sampann", 
    image: "https://m.media-amazon.com/images/I/71pQoY3pv8L._SL1500_.jpg", 
    inStock: true, 
    description: "Premium arhar dal",
    stock: 50
  },
  { 
    name: "Tata Sampann Moong Dal", 
    weight: "1kg", 
    price: 150, 
    category: "Atta Rice Dal", 
    brand: "Tata Sampann", 
    image: "https://m.media-amazon.com/images/I/71aYYJx8oOL._SL1500_.jpg", 
    inStock: true, 
    description: "Split green gram",
    stock: 50
  },
  { 
    name: "Tata Sampann Chana Dal", 
    weight: "1kg", 
    price: 140, 
    category: "Atta Rice Dal", 
    brand: "Tata Sampann", 
    image: "https://m.media-amazon.com/images/I/71IIh0FmIyL._SL1500_.jpg", 
    inStock: true, 
    description: "Bengal gram dal",
    stock: 50
  },
  { 
    name: "Tata Sampann Masoor Dal", 
    weight: "1kg", 
    price: 145, 
    category: "Atta Rice Dal", 
    brand: "Tata Sampann", 
    image: "https://m.media-amazon.com/images/I/71VwXS9fBhL._SL1500_.jpg", 
    inStock: true, 
    description: "Red lentils dal",
    stock: 50
  },
  { 
    name: "Tata Sampann Urad Dal", 
    weight: "1kg", 
    price: 160, 
    category: "Atta Rice Dal", 
    brand: "Tata Sampann", 
    image: "https://m.media-amazon.com/images/I/71zmB5W8zeL._SL1500_.jpg", 
    inStock: true, 
    description: "Black gram dal",
    stock: 50
  },
  { 
    name: "Aashirvaad Toor Dal", 
    weight: "1kg", 
    price: 175, 
    oldPrice: 190, 
    discount: "8% OFF", 
    category: "Atta Rice Dal", 
    brand: "Aashirvaad", 
    image: "https://m.media-amazon.com/images/I/71o0mqV8JaL._SL1500_.jpg", 
    inStock: true, 
    description: "Quality arhar dal",
    stock: 50
  },
  { 
    name: "Aashirvaad Moong Dal", 
    weight: "500g", 
    price: 80, 
    category: "Atta Rice Dal", 
    brand: "Aashirvaad", 
    image: "https://m.media-amazon.com/images/I/71Kxm9ZKZQL._SL1500_.jpg", 
    inStock: true, 
    description: "Small pack moong dal",
    stock: 50
  },
  { 
    name: "Fortune Toor Dal", 
    weight: "1kg", 
    price: 170, 
    category: "Atta Rice Dal", 
    brand: "Fortune", 
    image: "https://m.media-amazon.com/images/I/61OwfCHZoBL._SL1280_.jpg", 
    inStock: true, 
    description: "Everyday arhar dal",
    stock: 50
  },
  { 
    name: "Rajma (Red Kidney Beans)", 
    weight: "500g", 
    price: 85, 
    category: "Atta Rice Dal", 
    brand: "Generic", 
    image: "https://m.media-amazon.com/images/I/71O7Vm3TJIL._SL1500_.jpg", 
    inStock: true, 
    description: "Premium rajma",
    stock: 50
  },
  { 
    name: "Kabuli Chana (White Chickpeas)", 
    weight: "500g", 
    price: 75, 
    category: "Atta Rice Dal", 
    brand: "Generic", 
    image: "https://m.media-amazon.com/images/I/71wbU8iZyZL._SL1500_.jpg", 
    inStock: true, 
    description: "Large white chickpeas",
    stock: 50
  },
  { 
    name: "Kala Chana (Black Chickpeas)", 
    weight: "500g", 
    price: 70, 
    category: "Atta Rice Dal", 
    brand: "Generic", 
    image: "https://m.media-amazon.com/images/I/71LJv0QnXgL._SL1500_.jpg", 
    inStock: true, 
    description: "Black chickpeas",
    stock: 50
  },
  { 
    name: "Mix Dal", 
    weight: "1kg", 
    price: 155, 
    category: "Atta Rice Dal", 
    brand: "Tata Sampann", 
    image: "https://m.media-amazon.com/images/I/71eHJWt6xEL._SL1500_.jpg", 
    inStock: true, 
    description: "5 dal mix",
    stock: 50
  },
];

// ========== SMART MIGRATION FUNCTION ==========
const smartMigrate = async () => {
  try {
    console.log('\n🌾 Starting Smart Migration for Atta, Rice & Dal Products...\n');
    console.log('━'.repeat(60));
    
    let added = 0, updated = 0, unchanged = 0;
    
    // Get all existing products in this category
    const existingProducts = await Product.find({ category: "Atta Rice Dal" });
    
    // Create a map of existing products for quick lookup
    const existingMap = new Map();
    existingProducts.forEach(product => {
      const key = `${product.name}_${product.weight}`;
      existingMap.set(key, product);
    });
    
    // Create a set of products from our source
    const sourceProductKeys = new Set();
    
    // Process each product from source
    for (const productData of attaRiceDalProducts) {
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
    console.log(`   📦 Total in DB: ${await Product.countDocuments({ category: "Atta Rice Dal" })}`);
    console.log('\n✅ Migration Complete!\n');
    
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Migration Error:', err);
    process.exit(1);
  }
};

// Run migration
smartMigrate();