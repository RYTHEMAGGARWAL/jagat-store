// migrate_home_offices.js - Home and Offices Products Migration

const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI || "mongodb+srv://rythemaggarwal7840:Rythem7840@cluster0.obezyro.mongodb.net/?appName=Cluster0")
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

const Product = require('./models/Product');

const homeOfficesProducts = [
  // Stationery - Pens & Pencils
  {
    name: 'Reynolds Ball Pen - 10 pcs',
    description: 'Smooth writing ball pens',
    price: 80,
    mrp: 90,
    category: 'Home and Offices',
    brand: 'Reynolds',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10501a.jpg' }],
    stock: 100,
    inStock: true,
    unit: 'pcs',
    quantity: 10
  },
  {
    name: 'Cello Butterflow Pens - 10 pcs',
    description: 'Blue ink ball pens',
    price: 70,
    mrp: 80,
    category: 'Home and Offices',
    brand: 'Cello',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10502a.jpg' }],
    stock: 95,
    inStock: true,
    unit: 'pcs',
    quantity: 10
  },
  {
    name: 'Apsara Pencils - 10 pcs',
    description: 'Extra dark pencils',
    price: 60,
    mrp: 70,
    category: 'Home and Offices',
    brand: 'Apsara',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10503a.jpg' }],
    stock: 110,
    inStock: true,
    unit: 'pcs',
    quantity: 10
  },

  // Notebooks & Paper
  {
    name: 'Classmate Notebook - 6 pcs',
    description: 'Single line ruled notebooks',
    price: 195,
    mrp: 220,
    category: 'Home and Offices',
    brand: 'Classmate',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10504a.jpg' }],
    stock: 80,
    inStock: true,
    unit: 'pcs',
    quantity: 6
  },
  {
    name: 'A4 Paper Ream - 500 Sheets',
    description: 'Premium quality copier paper',
    price: 280,
    mrp: 320,
    category: 'Home and Offices',
    brand: 'JK Copier',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10505a.jpg' }],
    stock: 50,
    inStock: true,
    unit: 'sheets',
    quantity: 500
  },
  {
    name: 'Spiral Notebooks - 3 pcs',
    description: 'Hard bound spiral notebooks',
    price: 165,
    mrp: 185,
    category: 'Home and Offices',
    brand: 'Navneet',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10506a.jpg' }],
    stock: 75,
    inStock: true,
    unit: 'pcs',
    quantity: 3
  },

  // Adhesives & Tape
  {
    name: 'Fevicol MR - 200g',
    description: 'All-purpose adhesive',
    price: 65,
    mrp: 75,
    category: 'Home and Offices',
    brand: 'Fevicol',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10507a.jpg' }],
    stock: 90,
    inStock: true,
    unit: 'g',
    quantity: 200
  },
  {
    name: 'Fevistik Glue Stick - 3 pcs',
    description: 'Non-toxic glue sticks',
    price: 85,
    mrp: 95,
    category: 'Home and Offices',
    brand: 'Fevicol',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10508a.jpg' }],
    stock: 85,
    inStock: true,
    unit: 'pcs',
    quantity: 3
  },
  {
    name: 'Scotch Tape - 2 pcs',
    description: 'Clear adhesive tape',
    price: 85,
    mrp: 95,
    category: 'Home and Offices',
    brand: '3M',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10509a.jpg' }],
    stock: 70,
    inStock: true,
    unit: 'pcs',
    quantity: 2
  },
  {
    name: 'Double Sided Tape',
    description: 'Strong double-sided adhesive',
    price: 55,
    mrp: 65,
    category: 'Home and Offices',
    brand: '3M',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10510a.jpg' }],
    stock: 65,
    inStock: true,
    unit: 'pcs',
    quantity: 1
  },

  // Office Supplies
  {
    name: 'Stapler + Pins Set',
    description: 'Full strip stapler with 1000 pins',
    price: 120,
    mrp: 140,
    category: 'Home and Offices',
    brand: 'Kangaro',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10511a.jpg' }],
    stock: 60,
    inStock: true,
    unit: 'set',
    quantity: 1
  },
  {
    name: 'Stapler Pins - Box',
    description: '5000 stapler pins',
    price: 45,
    mrp: 52,
    category: 'Home and Offices',
    brand: 'Kangaro',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10512a.jpg' }],
    stock: 80,
    inStock: true,
    unit: 'box',
    quantity: 1
  },
  {
    name: 'Paper Clips Box - 100 pcs',
    description: 'Metal paper clips',
    price: 35,
    mrp: 40,
    category: 'Home and Offices',
    brand: 'Kangaro',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10513a.jpg' }],
    stock: 85,
    inStock: true,
    unit: 'pcs',
    quantity: 100
  },
  {
    name: 'Binder Clips Set - 12 pcs',
    description: 'Assorted size binder clips',
    price: 65,
    mrp: 75,
    category: 'Home and Offices',
    brand: 'Kangaro',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10514a.jpg' }],
    stock: 70,
    inStock: true,
    unit: 'pcs',
    quantity: 12
  },

  // Markers & Colors
  {
    name: 'Marker Pen Set - 12 Colors',
    description: 'Permanent marker pens',
    price: 195,
    mrp: 220,
    category: 'Home and Offices',
    brand: 'Camlin',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10515a.jpg' }],
    stock: 65,
    inStock: true,
    unit: 'set',
    quantity: 1
  },
  {
    name: 'Highlighter Set - 4 Colors',
    description: 'Fluorescent highlighter pens',
    price: 120,
    mrp: 135,
    category: 'Home and Offices',
    brand: 'Camlin',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10516a.jpg' }],
    stock: 75,
    inStock: true,
    unit: 'set',
    quantity: 1
  },
  {
    name: 'Whiteboard Marker - 4 pcs',
    description: 'Board marker pens',
    price: 140,
    mrp: 160,
    category: 'Home and Offices',
    brand: 'Camlin',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10517a.jpg' }],
    stock: 60,
    inStock: true,
    unit: 'pcs',
    quantity: 4
  },

  // Files & Folders
  {
    name: 'File Folder Set - 10 pcs',
    description: 'Plastic file folders',
    price: 165,
    mrp: 190,
    category: 'Home and Offices',
    brand: 'Solo',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10518a.jpg' }],
    stock: 70,
    inStock: true,
    unit: 'pcs',
    quantity: 10
  },
  {
    name: 'Box Files - 3 pcs',
    description: 'Heavy-duty box files',
    price: 280,
    mrp: 320,
    category: 'Home and Offices',
    brand: 'Solo',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10519a.jpg' }],
    stock: 45,
    inStock: true,
    unit: 'pcs',
    quantity: 3
  },

  // Scissors & Cutters
  {
    name: 'Scissor Premium',
    description: 'Stainless steel scissors',
    price: 95,
    mrp: 110,
    category: 'Home and Offices',
    brand: 'Maped',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10520a.jpg' }],
    stock: 55,
    inStock: true,
    unit: 'pcs',
    quantity: 1
  },
  {
    name: 'Paper Cutter',
    description: 'Safe blade paper cutter',
    price: 140,
    mrp: 165,
    category: 'Home and Offices',
    brand: 'Maped',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10521a.jpg' }],
    stock: 50,
    inStock: true,
    unit: 'pcs',
    quantity: 1
  }
];

const migrateHomeOffices = async () => {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/jagatstore');
    console.log('✅ Connected to MongoDB');

    console.log('🗑️  Removing existing Home and Offices products...');
    await Product.deleteMany({ category: 'Home and Offices' });
    console.log('✅ Existing products removed');

    console.log('📦 Adding new Home and Offices products...');
    const result = await Product.insertMany(homeOfficesProducts);
    console.log(`✅ Added ${result.length} Home and Offices products`);

    console.log('🎉 Migration completed successfully!');
    console.log(`📊 Total: ${result.length} products`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

migrateHomeOffices();