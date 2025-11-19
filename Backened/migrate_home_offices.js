// migrate_home_offices_IMPROVED.js - Smart Migration with Add/Update/Delete
// Save in Backend folder and run: node migrate_home_offices_IMPROVED.js

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

// ========== HOME AND OFFICES PRODUCTS ==========
const homeOfficesProducts = [
  // STATIONERY - PENS & PENCILS
  {
    name: 'Reynolds Ball Pen',
    weight: '10 pcs',
    price: 80,
    oldPrice: 90,
    discount: '11% OFF',
    category: 'Home and Offices',
    brand: 'Reynolds',
    image: 'https://m.media-amazon.com/images/I/61f1KPyYUxL._SL1500_.jpg',
    inStock: true,
    description: 'Smooth writing ball pens',
    stock: 100
  },
  {
    name: 'Cello Butterflow Pens',
    weight: '10 pcs',
    price: 70,
    oldPrice: 80,
    discount: '13% OFF',
    category: 'Home and Offices',
    brand: 'Cello',
    image: 'https://m.media-amazon.com/images/I/61M8ZnF8+HL._SL1500_.jpg',
    inStock: true,
    description: 'Blue ink ball pens',
    stock: 95
  },
  {
    name: 'Apsara Pencils',
    weight: '10 pcs',
    price: 60,
    oldPrice: 70,
    discount: '14% OFF',
    category: 'Home and Offices',
    brand: 'Apsara',
    image: 'https://m.media-amazon.com/images/I/61DUcLmOqHL._SL1500_.jpg',
    inStock: true,
    description: 'Extra dark pencils',
    stock: 110
  },

  // NOTEBOOKS & PAPER
  {
    name: 'Classmate Notebook',
    weight: '6 pcs',
    price: 195,
    oldPrice: 220,
    discount: '11% OFF',
    category: 'Home and Offices',
    brand: 'Classmate',
    image: 'https://m.media-amazon.com/images/I/71gSXqhCkEL._SL1500_.jpg',
    inStock: true,
    description: 'Single line ruled notebooks',
    stock: 80
  },
  {
    name: 'A4 Paper Ream',
    weight: '500 Sheets',
    price: 280,
    oldPrice: 320,
    discount: '13% OFF',
    category: 'Home and Offices',
    brand: 'JK Copier',
    image: 'https://m.media-amazon.com/images/I/61JztcPBSZL._SL1500_.jpg',
    inStock: true,
    description: 'Premium quality copier paper',
    stock: 50
  },
  {
    name: 'Spiral Notebooks',
    weight: '3 pcs',
    price: 165,
    oldPrice: 185,
    discount: '11% OFF',
    category: 'Home and Offices',
    brand: 'Navneet',
    image: 'https://m.media-amazon.com/images/I/71Dw5nL+5yL._SL1500_.jpg',
    inStock: true,
    description: 'Hard bound spiral notebooks',
    stock: 75
  },

  // ADHESIVES & TAPE
  {
    name: 'Fevicol MR',
    weight: '200g',
    price: 65,
    oldPrice: 75,
    discount: '13% OFF',
    category: 'Home and Offices',
    brand: 'Fevicol',
    image: 'https://m.media-amazon.com/images/I/61b+vpG0v7L._SL1500_.jpg',
    inStock: true,
    description: 'All-purpose adhesive',
    stock: 90
  },
  {
    name: 'Fevistik Glue Stick',
    weight: '3 pcs',
    price: 85,
    oldPrice: 95,
    discount: '11% OFF',
    category: 'Home and Offices',
    brand: 'Fevicol',
    image: 'https://m.media-amazon.com/images/I/61Q0fFTvQCL._SL1500_.jpg',
    inStock: true,
    description: 'Non-toxic glue sticks',
    stock: 85
  },
  {
    name: 'Scotch Tape',
    weight: '2 pcs',
    price: 85,
    oldPrice: 95,
    discount: '11% OFF',
    category: 'Home and Offices',
    brand: '3M',
    image: 'https://m.media-amazon.com/images/I/61PklGKVsJL._SL1500_.jpg',
    inStock: true,
    description: 'Clear adhesive tape',
    stock: 70
  },
  {
    name: 'Double Sided Tape',
    weight: '1 pc',
    price: 55,
    oldPrice: 65,
    discount: '15% OFF',
    category: 'Home and Offices',
    brand: '3M',
    image: 'https://m.media-amazon.com/images/I/61lI8yyXBLL._SL1500_.jpg',
    inStock: true,
    description: 'Strong double-sided adhesive',
    stock: 65
  },

  // OFFICE SUPPLIES
  {
    name: 'Stapler + Pins Set',
    weight: '1 set',
    price: 120,
    oldPrice: 140,
    discount: '14% OFF',
    category: 'Home and Offices',
    brand: 'Kangaro',
    image: 'https://m.media-amazon.com/images/I/61xV+wJ0a4L._SL1500_.jpg',
    inStock: true,
    description: 'Full strip stapler with 1000 pins',
    stock: 60
  },
  {
    name: 'Stapler Pins',
    weight: '1 box',
    price: 45,
    oldPrice: 52,
    discount: '13% OFF',
    category: 'Home and Offices',
    brand: 'Kangaro',
    image: 'https://m.media-amazon.com/images/I/61cJqCGPfSL._SL1500_.jpg',
    inStock: true,
    description: '5000 stapler pins',
    stock: 80
  },
  {
    name: 'Paper Clips Box',
    weight: '100 pcs',
    price: 35,
    oldPrice: 40,
    discount: '13% OFF',
    category: 'Home and Offices',
    brand: 'Kangaro',
    image: 'https://m.media-amazon.com/images/I/61u3GNZG+HL._SL1500_.jpg',
    inStock: true,
    description: 'Metal paper clips',
    stock: 85
  },
  {
    name: 'Binder Clips Set',
    weight: '12 pcs',
    price: 65,
    oldPrice: 75,
    discount: '13% OFF',
    category: 'Home and Offices',
    brand: 'Kangaro',
    image: 'https://m.media-amazon.com/images/I/71N8aKKKqBL._SL1500_.jpg',
    inStock: true,
    description: 'Assorted size binder clips',
    stock: 70
  },

  // MARKERS & COLORS
  {
    name: 'Marker Pen Set',
    weight: '12 Colors',
    price: 195,
    oldPrice: 220,
    discount: '11% OFF',
    category: 'Home and Offices',
    brand: 'Camlin',
    image: 'https://m.media-amazon.com/images/I/71tHYwVCwUL._SL1500_.jpg',
    inStock: true,
    description: 'Permanent marker pens',
    stock: 65
  },
  {
    name: 'Highlighter Set',
    weight: '4 Colors',
    price: 120,
    oldPrice: 135,
    discount: '11% OFF',
    category: 'Home and Offices',
    brand: 'Camlin',
    image: 'https://m.media-amazon.com/images/I/61SixmQqgWL._SL1500_.jpg',
    inStock: true,
    description: 'Fluorescent highlighter pens',
    stock: 75
  },
  {
    name: 'Whiteboard Marker',
    weight: '4 pcs',
    price: 140,
    oldPrice: 160,
    discount: '13% OFF',
    category: 'Home and Offices',
    brand: 'Camlin',
    image: 'https://m.media-amazon.com/images/I/61k5nJSCpfL._SL1500_.jpg',
    inStock: true,
    description: 'Board marker pens',
    stock: 60
  },

  // FILES & FOLDERS
  {
    name: 'File Folder Set',
    weight: '10 pcs',
    price: 165,
    oldPrice: 190,
    discount: '13% OFF',
    category: 'Home and Offices',
    brand: 'Solo',
    image: 'https://m.media-amazon.com/images/I/71iO8wQN3QL._SL1500_.jpg',
    inStock: true,
    description: 'Plastic file folders',
    stock: 70
  },
  {
    name: 'Box Files',
    weight: '3 pcs',
    price: 280,
    oldPrice: 320,
    discount: '13% OFF',
    category: 'Home and Offices',
    brand: 'Solo',
    image: 'https://m.media-amazon.com/images/I/61dNO4OQKEL._SL1500_.jpg',
    inStock: true,
    description: 'Heavy-duty box files',
    stock: 45
  },

  // SCISSORS & CUTTERS
  {
    name: 'Scissor Premium',
    weight: '1 pc',
    price: 95,
    oldPrice: 110,
    discount: '14% OFF',
    category: 'Home and Offices',
    brand: 'Maped',
    image: 'https://m.media-amazon.com/images/I/51rJ+pWb8EL._SL1500_.jpg',
    inStock: true,
    description: 'Stainless steel scissors',
    stock: 55
  },
  {
    name: 'Paper Cutter',
    weight: '1 pc',
    price: 140,
    oldPrice: 165,
    discount: '15% OFF',
    category: 'Home and Offices',
    brand: 'Maped',
    image: 'https://m.media-amazon.com/images/I/61Y8WjLsVCL._SL1500_.jpg',
    inStock: true,
    description: 'Safe blade paper cutter',
    stock: 50
  }
];

// ========== SMART MIGRATION FUNCTION ==========
const smartMigrate = async () => {
  try {
    console.log('\n📝 Starting Smart Migration for Home and Offices...\n');
    console.log('━'.repeat(60));
    
    let added = 0, updated = 0, unchanged = 0;
    
    const existingProducts = await Product.find({ category: "Home and Offices" });
    
    const existingMap = new Map();
    existingProducts.forEach(product => {
      const key = `${product.name}_${product.weight}`;
      existingMap.set(key, product);
    });
    
    const sourceProductKeys = new Set();
    
    for (const productData of homeOfficesProducts) {
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
    console.log(`   📦 Total in DB: ${await Product.countDocuments({ category: "Home and Offices" })}`);
    console.log('\n✅ Migration Complete!\n');
    
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Migration Error:', err);
    process.exit(1);
  }
};

smartMigrate();