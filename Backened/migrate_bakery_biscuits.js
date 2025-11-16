// migrate_bakery_biscuits.js - Bakery & Biscuits Products Migration

const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('./models/Product');

const bakeryBiscuitsProducts = [
  // Marie Biscuits
  {
    name: 'Parle Marie Biscuits - 250g',
    description: 'Classic Marie biscuits, perfect with tea',
    price: 35,
    mrp: 40,
    category: 'Bakery Biscuits',
    brand: 'Parle',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10491a.jpg' }],
    stock: 150,
    inStock: true,
    unit: 'g',
    quantity: 250
  },
  {
    name: 'Britannia Marie Gold - 500g',
    description: 'Premium Marie biscuits with rich taste',
    price: 65,
    mrp: 72,
    category: 'Bakery Biscuits',
    brand: 'Britannia',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10491a.jpg' }],
    stock: 120,
    inStock: true,
    unit: 'g',
    quantity: 500
  },

  // Glucose Biscuits
  {
    name: 'Parle-G Gold Biscuits - 1kg',
    description: 'India\'s favorite glucose biscuits',
    price: 120,
    mrp: 135,
    category: 'Bakery Biscuits',
    brand: 'Parle',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/25610a.jpg' }],
    stock: 200,
    inStock: true,
    unit: 'kg',
    quantity: 1
  },
  {
    name: 'Britannia 50-50 Biscuits - 400g',
    description: 'Sweet and salty biscuits combo',
    price: 55,
    mrp: 62,
    category: 'Bakery Biscuits',
    brand: 'Britannia',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/25611a.jpg' }],
    stock: 130,
    inStock: true,
    unit: 'g',
    quantity: 400
  },

  // Cream Biscuits
  {
    name: 'Britannia Bourbon Biscuits - 400g',
    description: 'Chocolate cream biscuits',
    price: 80,
    mrp: 90,
    category: 'Bakery Biscuits',
    brand: 'Britannia',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/447a.jpg' }],
    stock: 140,
    inStock: true,
    unit: 'g',
    quantity: 400
  },
  {
    name: 'Parle Hide & Seek Biscuits - 600g',
    description: 'Chocolate chip cookies',
    price: 110,
    mrp: 125,
    category: 'Bakery Biscuits',
    brand: 'Parle',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/448a.jpg' }],
    stock: 100,
    inStock: true,
    unit: 'g',
    quantity: 600
  },
  {
    name: 'Sunfeast Dark Fantasy Biscuits - 300g',
    description: 'Premium chocolate biscuits',
    price: 95,
    mrp: 105,
    category: 'Bakery Biscuits',
    brand: 'Sunfeast',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/449a.jpg' }],
    stock: 90,
    inStock: true,
    unit: 'g',
    quantity: 300
  },

  // Cookies
  {
    name: 'Britannia Good Day Butter Cookies - 600g',
    description: 'Rich butter cookies',
    price: 120,
    mrp: 135,
    category: 'Bakery Biscuits',
    brand: 'Britannia',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/450a.jpg' }],
    stock: 110,
    inStock: true,
    unit: 'g',
    quantity: 600
  },
  {
    name: 'Sunfeast Mom\'s Magic Cookies - 600g',
    description: 'Homemade taste cookies',
    price: 115,
    mrp: 130,
    category: 'Bakery Biscuits',
    brand: 'Sunfeast',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/451a.jpg' }],
    stock: 95,
    inStock: true,
    unit: 'g',
    quantity: 600
  },
  {
    name: 'Oreo Cream Biscuits - 600g',
    description: 'World\'s favorite sandwich cookie',
    price: 140,
    mrp: 160,
    category: 'Bakery Biscuits',
    brand: 'Oreo',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/452a.jpg' }],
    stock: 120,
    inStock: true,
    unit: 'g',
    quantity: 600
  },

  // Bread & Pav
  {
    name: 'Britannia Bread - White - 400g',
    description: 'Fresh white bread',
    price: 45,
    mrp: 50,
    category: 'Bakery Biscuits',
    brand: 'Britannia',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/453a.jpg' }],
    stock: 80,
    inStock: true,
    unit: 'g',
    quantity: 400
  },
  {
    name: 'Modern Brown Bread - 400g',
    description: 'Healthy brown bread',
    price: 55,
    mrp: 62,
    category: 'Bakery Biscuits',
    brand: 'Modern',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/454a.jpg' }],
    stock: 70,
    inStock: true,
    unit: 'g',
    quantity: 400
  },
  {
    name: 'Wibs Premium Pav - 6 pcs',
    description: 'Fresh pav bread',
    price: 30,
    mrp: 35,
    category: 'Bakery Biscuits',
    brand: 'Wibs',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/455a.jpg' }],
    stock: 100,
    inStock: true,
    unit: 'pcs',
    quantity: 6
  },

  // Rusk & Toast
  {
    name: 'Britannia Rusk - 600g',
    description: 'Crispy tea rusk',
    price: 75,
    mrp: 85,
    category: 'Bakery Biscuits',
    brand: 'Britannia',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/456a.jpg' }],
    stock: 90,
    inStock: true,
    unit: 'g',
    quantity: 600
  },
  {
    name: 'Britannia Cake Rusk - 400g',
    description: 'Sweet cake rusk',
    price: 60,
    mrp: 68,
    category: 'Bakery Biscuits',
    brand: 'Britannia',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/457a.jpg' }],
    stock: 85,
    inStock: true,
    unit: 'g',
    quantity: 400
  }
];

const migrateBakeryBiscuits = async () => {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/jagatstore');
    console.log('✅ Connected to MongoDB');

    console.log('🗑️  Removing existing Bakery & Biscuits products...');
    await Product.deleteMany({ category: 'Bakery Biscuits' });
    console.log('✅ Existing products removed');

    console.log('📦 Adding new Bakery & Biscuits products...');
    const result = await Product.insertMany(bakeryBiscuitsProducts);
    console.log(`✅ Added ${result.length} Bakery & Biscuits products`);

    console.log('🎉 Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

migrateBakeryBiscuits();