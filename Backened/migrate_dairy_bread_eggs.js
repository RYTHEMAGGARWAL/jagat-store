// migrate_dairy_bread_eggs_IMPROVED.js - Smart Migration with Add/Update/Delete
// Save in Backend folder and run: node migrate_dairy_bread_eggs_IMPROVED.js

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

// ========== DAIRY BREAD EGGS PRODUCTS ==========
const dairyBreadEggsProducts = [
  // MILK - AMUL
  {
    name: 'Amul Milk (FullCream)',
    weight: '500ml',
    price: 35,
    oldPrice: 38,
    discount: '8% OFF',
    category: 'Dairy Bread Eggs',
    brand: 'Amul',
    image: 'https://m.media-amazon.com/images/I/61mKxG0MLWL._SL1500_.jpg',
    inStock: true,
    description: 'Fresh full cream milk from Amul',
    stock: 100
  },
  {
    name: 'Amul Milk (Toned)',
    weight: '500ml',
    price: 29,
    oldPrice: 32,
    discount: '9% OFF',
    category: 'Dairy Bread Eggs',
    brand: 'Amul',
    image: 'https://m.media-amazon.com/images/I/61fIrqvCjZL._SL1500_.jpg',
    inStock: true,
    description: 'Toned milk from Amul',
    stock: 100
  },
  {
    name: 'Amul Cow Milk',
    weight: '500ml',
    price: 30,
    oldPrice: 33,
    discount: '9% OFF',
    category: 'Dairy Bread Eggs',
    brand: 'Amul',
    image: 'https://m.media-amazon.com/images/I/61RhB6NJinL._SL1500_.jpg',
    inStock: true,
    description: 'Pure cow milk from Amul',
    stock: 100
  },

  // MILK - MOTHER DAIRY
  {
    name: 'Mother Dairy Cow Milk',
    weight: '500ml',
    price: 30,
    oldPrice: 33,
    discount: '9% OFF',
    category: 'Dairy Bread Eggs',
    brand: 'Mother Dairy',
    image: 'https://m.media-amazon.com/images/I/61Wst7uqJhL._SL1500_.jpg',
    inStock: true,
    description: 'Fresh cow milk from Mother Dairy',
    stock: 95
  },
  {
    name: 'Mother Dairy Milk (FullCream)',
    weight: '500ml',
    price: 35,
    oldPrice: 38,
    discount: '8% OFF',
    category: 'Dairy Bread Eggs',
    brand: 'Mother Dairy',
    image: 'https://m.media-amazon.com/images/I/61HhChxVp2L._SL1500_.jpg',
    inStock: true,
    description: 'Full cream milk from Mother Dairy',
    stock: 95
  },

  // CURD/DAHI
  {
    name: 'Amul Masti Curd (Dahi)',
    weight: '500ml',
    price: 35,
    oldPrice: 40,
    discount: '13% OFF',
    category: 'Dairy Bread Eggs',
    brand: 'Amul',
    image: 'https://m.media-amazon.com/images/I/61Lr+VQOYHL._SL1500_.jpg',
    inStock: true,
    description: 'Fresh curd from Amul',
    stock: 80
  },
  {
    name: 'Mother Dairy Curd (Dahi)',
    weight: '500ml',
    price: 35,
    oldPrice: 40,
    discount: '13% OFF',
    category: 'Dairy Bread Eggs',
    brand: 'Mother Dairy',
    image: 'https://m.media-amazon.com/images/I/61c8LqRgpCL._SL1500_.jpg',
    inStock: true,
    description: 'Fresh creamy curd',
    stock: 75
  },

  // BUTTER - AMUL
  {
    name: 'Amul Butter',
    weight: '100g',
    price: 62,
    oldPrice: 68,
    discount: '9% OFF',
    category: 'Dairy Bread Eggs',
    brand: 'Amul',
    image: 'https://m.media-amazon.com/images/I/71RM5vZ0wKL._SL1500_.jpg',
    inStock: true,
    description: 'Pure butter made from fresh cream',
    stock: 120
  },
  {
    name: 'Amul Butter',
    weight: '200g',
    price: 128,
    oldPrice: 140,
    discount: '9% OFF',
    category: 'Dairy Bread Eggs',
    brand: 'Amul',
    image: 'https://m.media-amazon.com/images/I/71RM5vZ0wKL._SL1500_.jpg',
    inStock: true,
    description: 'Medium pack pure butter',
    stock: 110
  },
  {
    name: 'Amul Butter',
    weight: '500g',
    price: 295,
    oldPrice: 320,
    discount: '8% OFF',
    category: 'Dairy Bread Eggs',
    brand: 'Amul',
    image: 'https://m.media-amazon.com/images/I/71RM5vZ0wKL._SL1500_.jpg',
    inStock: true,
    description: 'Large pack pure butter',
    stock: 90
  },

  // BUTTER - DELICIOUS
  {
    name: 'Delicious Butter',
    weight: '100g',
    price: 22,
    oldPrice: 25,
    discount: '12% OFF',
    category: 'Dairy Bread Eggs',
    brand: 'Delicious',
    image: 'https://m.media-amazon.com/images/I/71YxrjVF5LL._SL1500_.jpg',
    inStock: true,
    description: 'Budget-friendly butter',
    stock: 100
  },
  {
    name: 'Delicious Butter',
    weight: '500g',
    price: 105,
    oldPrice: 115,
    discount: '9% OFF',
    category: 'Dairy Bread Eggs',
    brand: 'Delicious',
    image: 'https://m.media-amazon.com/images/I/71YxrjVF5LL._SL1500_.jpg',
    inStock: true,
    description: 'Large pack budget butter',
    stock: 85
  },

  // CHEESE - AMUL
  {
    name: 'Amul Mozzarella Cheese Diced',
    weight: '200g',
    price: 129,
    oldPrice: 145,
    discount: '11% OFF',
    category: 'Dairy Bread Eggs',
    brand: 'Amul',
    image: 'https://m.media-amazon.com/images/I/61qgm87b9KL._SL1500_.jpg',
    inStock: true,
    description: 'Diced mozzarella cheese',
    stock: 70
  },
  {
    name: 'Amul Cheese Slice',
    weight: '10 pcs',
    price: 149,
    oldPrice: 165,
    discount: '10% OFF',
    category: 'Dairy Bread Eggs',
    brand: 'Amul',
    image: 'https://m.media-amazon.com/images/I/71sRsZ0sFdL._SL1500_.jpg',
    inStock: true,
    description: 'Cheese slices pack of 10',
    stock: 90
  },
  {
    name: 'Amul Cheese Slice',
    weight: '5 pcs',
    price: 85,
    oldPrice: 95,
    discount: '11% OFF',
    category: 'Dairy Bread Eggs',
    brand: 'Amul',
    image: 'https://m.media-amazon.com/images/I/71sRsZ0sFdL._SL1500_.jpg',
    inStock: true,
    description: 'Cheese slices pack of 5',
    stock: 100
  },
  {
    name: 'Amul Cheese Cube',
    weight: '8 pcs',
    price: 135,
    oldPrice: 150,
    discount: '10% OFF',
    category: 'Dairy Bread Eggs',
    brand: 'Amul',
    image: 'https://m.media-amazon.com/images/I/61xM0dRbwLL._SL1500_.jpg',
    inStock: true,
    description: 'Cheese cubes pack of 8',
    stock: 85
  },
  {
    name: 'Amul Cheese Spread',
    weight: '200g',
    price: 110,
    oldPrice: 125,
    discount: '12% OFF',
    category: 'Dairy Bread Eggs',
    brand: 'Amul',
    image: 'https://m.media-amazon.com/images/I/61bQZkFd+wL._SL1500_.jpg',
    inStock: true,
    description: 'Creamy cheese spread',
    stock: 95
  },

  // CREAM
  {
    name: 'Amul Cream',
    weight: '200ml',
    price: 70,
    oldPrice: 78,
    discount: '10% OFF',
    category: 'Dairy Bread Eggs',
    brand: 'Amul',
    image: 'https://m.media-amazon.com/images/I/51hR0jWBZ7L._SL1080_.jpg',
    inStock: true,
    description: 'Fresh dairy cream',
    stock: 80
  },
  {
    name: 'Amul Cream',
    weight: '1L',
    price: 230,
    oldPrice: 255,
    discount: '10% OFF',
    category: 'Dairy Bread Eggs',
    brand: 'Amul',
    image: 'https://m.media-amazon.com/images/I/51hR0jWBZ7L._SL1080_.jpg',
    inStock: true,
    description: 'Large pack fresh cream',
    stock: 60
  },

  // PANEER
  {
    name: 'Ananda Paneer',
    weight: '200g',
    price: 90,
    oldPrice: 100,
    discount: '10% OFF',
    category: 'Dairy Bread Eggs',
    brand: 'Ananda',
    image: 'https://m.media-amazon.com/images/I/61d3YT7sDUL._SL1500_.jpg',
    inStock: true,
    description: 'Fresh paneer',
    stock: 75
  },

  // BREAD - ENGLISH OVEN
  {
    name: 'English Oven Brown Bread',
    weight: '450g',
    price: 55,
    oldPrice: 62,
    discount: '11% OFF',
    category: 'Dairy Bread Eggs',
    brand: 'English Oven',
    image: 'https://m.media-amazon.com/images/I/71RgvB-WDML._SL1500_.jpg',
    inStock: true,
    description: 'Healthy brown bread',
    stock: 90
  },
  {
    name: 'English Oven Milk Bread',
    weight: '400g',
    price: 40,
    oldPrice: 45,
    discount: '11% OFF',
    category: 'Dairy Bread Eggs',
    brand: 'English Oven',
    image: 'https://m.media-amazon.com/images/I/71dv4vWc+kL._SL1500_.jpg',
    inStock: true,
    description: 'Soft milk bread',
    stock: 100
  },
  {
    name: 'English Oven White Bread',
    weight: '600g',
    price: 55,
    oldPrice: 62,
    discount: '11% OFF',
    category: 'Dairy Bread Eggs',
    brand: 'English Oven',
    image: 'https://m.media-amazon.com/images/I/71QBGz8NYVL._SL1500_.jpg',
    inStock: true,
    description: 'Classic white bread',
    stock: 95
  },
  {
    name: 'English Oven MultiGrain Bread',
    weight: '500g',
    price: 70,
    oldPrice: 80,
    discount: '13% OFF',
    category: 'Dairy Bread Eggs',
    brand: 'English Oven',
    image: 'https://m.media-amazon.com/images/I/71L5ZDQF3nL._SL1500_.jpg',
    inStock: true,
    description: 'Healthy multigrain bread',
    stock: 85
  },
  {
    name: 'English Oven Sandwich Bread',
    weight: '400g',
    price: 40,
    oldPrice: 45,
    discount: '11% OFF',
    category: 'Dairy Bread Eggs',
    brand: 'English Oven',
    image: 'https://m.media-amazon.com/images/I/71dv4vWc+kL._SL1500_.jpg',
    inStock: true,
    description: 'Perfect for sandwiches',
    stock: 100
  },
  {
    name: 'English Oven Fruit Bun',
    weight: '2 pcs',
    price: 20,
    oldPrice: 22,
    discount: '9% OFF',
    category: 'Dairy Bread Eggs',
    brand: 'English Oven',
    image: 'https://m.media-amazon.com/images/I/71K0g6hQtPL._SL1500_.jpg',
    inStock: true,
    description: 'Sweet fruit buns',
    stock: 110
  },
  {
    name: 'English Oven Burger Buns',
    weight: '6 pcs',
    price: 60,
    oldPrice: 68,
    discount: '12% OFF',
    category: 'Dairy Bread Eggs',
    brand: 'English Oven',
    image: 'https://m.media-amazon.com/images/I/61xJ5qoJdgL._SL1500_.jpg',
    inStock: true,
    description: 'Soft burger buns pack',
    stock: 80
  },
  {
    name: 'English Oven Pav',
    weight: '400g',
    price: 45,
    oldPrice: 50,
    discount: '10% OFF',
    category: 'Dairy Bread Eggs',
    brand: 'English Oven',
    image: 'https://m.media-amazon.com/images/I/71OE+0aJ-gL._SL1500_.jpg',
    inStock: true,
    description: 'Traditional pav bread',
    stock: 95
  }
];

// ========== SMART MIGRATION FUNCTION ==========
const smartMigrate = async () => {
  try {
    console.log('\n🥛 Starting Smart Migration for Dairy, Bread & Eggs...\n');
    console.log('━'.repeat(60));
    
    let added = 0, updated = 0, unchanged = 0;
    
    const existingProducts = await Product.find({ category: "Dairy Bread Eggs" });
    
    const existingMap = new Map();
    existingProducts.forEach(product => {
      const key = `${product.name}_${product.weight}`;
      existingMap.set(key, product);
    });
    
    const sourceProductKeys = new Set();
    
    for (const productData of dairyBreadEggsProducts) {
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
    console.log(`   📦 Total in DB: ${await Product.countDocuments({ category: "Dairy Bread Eggs" })}`);
    console.log('\n✅ Migration Complete!\n');
    
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Migration Error:', err);
    process.exit(1);
  }
};

smartMigrate();