// migrate_cold_drinks_juices.js - Cold Drinks & Juices Migration

const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('./models/Product');

const coldDrinksJuicesProducts = [
  // Cold Drinks - Coca-Cola
  {
    name: 'Coca-Cola - 1.25L',
    description: 'The iconic refreshing cola drink',
    price: 60,
    mrp: 70,
    category: 'Cold Drinks & Juices',
    brand: 'Coca-Cola',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/40041a.jpg' }],
    stock: 120,
    inStock: true,
    unit: 'L',
    quantity: 1.25
  },
  {
    name: 'Coca-Cola - 750ml',
    description: 'Perfect size cola bottle',
    price: 40,
    mrp: 45,
    category: 'Cold Drinks & Juices',
    brand: 'Coca-Cola',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/40041a.jpg' }],
    stock: 150,
    inStock: true,
    unit: 'ml',
    quantity: 750
  },

  // Pepsi
  {
    name: 'Pepsi - 1.25L',
    description: 'Bold and refreshing cola',
    price: 60,
    mrp: 70,
    category: 'Cold Drinks & Juices',
    brand: 'Pepsi',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/40042a.jpg' }],
    stock: 115,
    inStock: true,
    unit: 'L',
    quantity: 1.25
  },
  {
    name: 'Pepsi - 750ml',
    description: 'Refreshing Pepsi cola',
    price: 40,
    mrp: 45,
    category: 'Cold Drinks & Juices',
    brand: 'Pepsi',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/40042a.jpg' }],
    stock: 140,
    inStock: true,
    unit: 'ml',
    quantity: 750
  },

  // Sprite & Lemon Drinks
  {
    name: 'Sprite - 1.25L',
    description: 'Clear lemon-lime flavored drink',
    price: 60,
    mrp: 70,
    category: 'Cold Drinks & Juices',
    brand: 'Sprite',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/40043a.jpg' }],
    stock: 110,
    inStock: true,
    unit: 'L',
    quantity: 1.25
  },
  {
    name: '7UP - 1.25L',
    description: 'Crisp lemon-lime soda',
    price: 60,
    mrp: 70,
    category: 'Cold Drinks & Juices',
    brand: '7UP',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/40044a.jpg' }],
    stock: 100,
    inStock: true,
    unit: 'L',
    quantity: 1.25
  },

  // Thums Up & Mountain Dew
  {
    name: 'Thums Up - 1.25L',
    description: 'Strong fizzy cola',
    price: 60,
    mrp: 70,
    category: 'Cold Drinks & Juices',
    brand: 'Thums Up',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/40045a.jpg' }],
    stock: 105,
    inStock: true,
    unit: 'L',
    quantity: 1.25
  },
  {
    name: 'Mountain Dew - 1.25L',
    description: 'Energizing citrus drink',
    price: 60,
    mrp: 70,
    category: 'Cold Drinks & Juices',
    brand: 'Mountain Dew',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/40046a.jpg' }],
    stock: 95,
    inStock: true,
    unit: 'L',
    quantity: 1.25
  },

  // Fanta
  {
    name: 'Fanta Orange - 1.25L',
    description: 'Orange flavored fizzy drink',
    price: 60,
    mrp: 70,
    category: 'Cold Drinks & Juices',
    brand: 'Fanta',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/40047a.jpg' }],
    stock: 100,
    inStock: true,
    unit: 'L',
    quantity: 1.25
  },

  // Fruit Juices - Premium
  {
    name: 'Real Fruit Juice Mango - 1L',
    description: 'Made with real fruit pulp',
    price: 95,
    mrp: 110,
    category: 'Cold Drinks & Juices',
    brand: 'Real',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/40048a.jpg' }],
    stock: 80,
    inStock: true,
    unit: 'L',
    quantity: 1
  },
  {
    name: 'Real Fruit Juice Mixed Fruit - 1L',
    description: 'Blend of delicious fruits',
    price: 95,
    mrp: 110,
    category: 'Cold Drinks & Juices',
    brand: 'Real',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/40049a.jpg' }],
    stock: 75,
    inStock: true,
    unit: 'L',
    quantity: 1
  },
  {
    name: 'Tropicana Orange Juice - 1L',
    description: '100% orange juice, no added sugar',
    price: 110,
    mrp: 125,
    category: 'Cold Drinks & Juices',
    brand: 'Tropicana',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/40050a.jpg' }],
    stock: 75,
    inStock: true,
    unit: 'L',
    quantity: 1
  },
  {
    name: 'Tropicana Mixed Fruit - 1L',
    description: 'Premium mixed fruit juice',
    price: 110,
    mrp: 125,
    category: 'Cold Drinks & Juices',
    brand: 'Tropicana',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/40051a.jpg' }],
    stock: 70,
    inStock: true,
    unit: 'L',
    quantity: 1
  },

  // Pulpy Drinks
  {
    name: 'Minute Maid Pulpy Orange - 400ml',
    description: 'Orange juice with pulpy bits',
    price: 40,
    mrp: 45,
    category: 'Cold Drinks & Juices',
    brand: 'Minute Maid',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/40052a.jpg' }],
    stock: 140,
    inStock: true,
    unit: 'ml',
    quantity: 400
  },

  // Mango Drinks
  {
    name: 'Frooti Mango Drink - 1.2L',
    description: 'Fresh and juicy mango drink',
    price: 70,
    mrp: 80,
    category: 'Cold Drinks & Juices',
    brand: 'Frooti',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/40053a.jpg' }],
    stock: 90,
    inStock: true,
    unit: 'L',
    quantity: 1.2
  },
  {
    name: 'Maaza Mango Drink - 1.2L',
    description: 'Real mango taste',
    price: 70,
    mrp: 80,
    category: 'Cold Drinks & Juices',
    brand: 'Maaza',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/40054a.jpg' }],
    stock: 85,
    inStock: true,
    unit: 'L',
    quantity: 1.2
  },
  {
    name: 'Slice Mango Drink - 1.2L',
    description: 'Thick mango drink',
    price: 65,
    mrp: 75,
    category: 'Cold Drinks & Juices',
    brand: 'Slice',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/40055a.jpg' }],
    stock: 95,
    inStock: true,
    unit: 'L',
    quantity: 1.2
  },

  // Energy Drinks
  {
    name: 'Red Bull Energy Drink - 250ml',
    description: 'Gives you wings',
    price: 110,
    mrp: 125,
    category: 'Cold Drinks & Juices',
    brand: 'Red Bull',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/40056a.jpg' }],
    stock: 60,
    inStock: true,
    unit: 'ml',
    quantity: 250
  },
  {
    name: 'Monster Energy Drink - 500ml',
    description: 'Unleash the beast',
    price: 140,
    mrp: 160,
    category: 'Cold Drinks & Juices',
    brand: 'Monster',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/40057a.jpg' }],
    stock: 50,
    inStock: true,
    unit: 'ml',
    quantity: 500
  },
  {
    name: 'Sting Energy Drink - 500ml',
    description: 'Get your energy boost',
    price: 40,
    mrp: 45,
    category: 'Cold Drinks & Juices',
    brand: 'Sting',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/40058a.jpg' }],
    stock: 80,
    inStock: true,
    unit: 'ml',
    quantity: 500
  },

  // Water
  {
    name: 'Bisleri Mineral Water - 1L',
    description: 'Pure and safe drinking water',
    price: 20,
    mrp: 22,
    category: 'Cold Drinks & Juices',
    brand: 'Bisleri',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/40059a.jpg' }],
    stock: 200,
    inStock: true,
    unit: 'L',
    quantity: 1
  },
  {
    name: 'Kinley Mineral Water - 1L',
    description: 'Trusted mineral water',
    price: 20,
    mrp: 22,
    category: 'Cold Drinks & Juices',
    brand: 'Kinley',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/40060a.jpg' }],
    stock: 180,
    inStock: true,
    unit: 'L',
    quantity: 1
  }
];

const migrateColdDrinksJuices = async () => {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/jagatstore');
    console.log('✅ Connected to MongoDB');

    console.log('🗑️  Removing existing Cold Drinks & Juices products...');
    await Product.deleteMany({ category: 'Cold Drinks & Juices' });
    console.log('✅ Existing products removed');

    console.log('📦 Adding new Cold Drinks & Juices products...');
    const result = await Product.insertMany(coldDrinksJuicesProducts);
    console.log(`✅ Added ${result.length} Cold Drinks & Juices products`);

    console.log('🎉 Migration completed successfully!');
    console.log(`📊 Total: ${result.length} products`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

migrateColdDrinksJuices();
