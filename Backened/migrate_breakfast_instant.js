// migrate_breakfast_instant.js - Breakfast & Instant Foods Migration

const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI || "mongodb+srv://rythemaggarwal7840:Rythem7840@cluster0.obezyro.mongodb.net/?appName=Cluster0")
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

const Product = require('./models/Product');

const breakfastInstantProducts = [
  // Cereals
  {
    name: 'Kellogg\'s Corn Flakes - 875g',
    description: 'Crispy golden corn flakes for healthy breakfast',
    price: 320,
    mrp: 360,
    category: 'Breakfast & Instant Foods',
    brand: 'Kellogg\'s',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10665a.jpg' }],
    stock: 70,
    inStock: true,
    unit: 'g',
    quantity: 875
  },
  {
    name: 'Quaker Oats - 1kg',
    description: '100% natural whole grain oats',
    price: 180,
    mrp: 200,
    category: 'Breakfast & Instant Foods',
    brand: 'Quaker',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/486a.jpg' }],
    stock: 100,
    inStock: true,
    unit: 'kg',
    quantity: 1
  },
  {
    name: 'Kellogg\'s Chocos - 700g',
    description: 'Chocolatey breakfast cereal for kids',
    price: 280,
    mrp: 315,
    category: 'Breakfast & Instant Foods',
    brand: 'Kellogg\'s',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10666a.jpg' }],
    stock: 60,
    inStock: true,
    unit: 'g',
    quantity: 700
  },
  {
    name: 'Saffola Oats - 1kg',
    description: 'Heart-healthy oats',
    price: 195,
    mrp: 220,
    category: 'Breakfast & Instant Foods',
    brand: 'Saffola',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10667a.jpg' }],
    stock: 90,
    inStock: true,
    unit: 'kg',
    quantity: 1
  },

  // Instant Noodles
  {
    name: 'Maggi 2-Minute Noodles - 12 Pack',
    description: 'India\'s favorite instant noodles',
    price: 140,
    mrp: 156,
    category: 'Breakfast & Instant Foods',
    brand: 'Maggi',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/483a.jpg' }],
    stock: 150,
    inStock: true,
    unit: 'pack',
    quantity: 12
  },
  {
    name: 'Yippee Noodles Magic Masala - 12 Pack',
    description: 'Tasty instant noodles',
    price: 120,
    mrp: 135,
    category: 'Breakfast & Instant Foods',
    brand: 'Yippee',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10668a.jpg' }],
    stock: 140,
    inStock: true,
    unit: 'pack',
    quantity: 12
  },
  {
    name: 'Top Ramen Curry Noodles - 12 Pack',
    description: 'Delicious curry flavored noodles',
    price: 125,
    mrp: 140,
    category: 'Breakfast & Instant Foods',
    brand: 'Top Ramen',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10669a.jpg' }],
    stock: 130,
    inStock: true,
    unit: 'pack',
    quantity: 12
  },
  {
    name: 'Maggi Cuppa Mania - 4 Pack',
    description: 'Cup noodles ready in minutes',
    price: 95,
    mrp: 108,
    category: 'Breakfast & Instant Foods',
    brand: 'Maggi',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10670a.jpg' }],
    stock: 110,
    inStock: true,
    unit: 'pack',
    quantity: 4
  },
  {
    name: 'Knorr Soupy Noodles - 4 Pack',
    description: 'Soupy instant noodles',
    price: 90,
    mrp: 100,
    category: 'Breakfast & Instant Foods',
    brand: 'Knorr',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10671a.jpg' }],
    stock: 100,
    inStock: true,
    unit: 'pack',
    quantity: 4
  },

  // Ready to Eat
  {
    name: 'MTR Ready to Eat Poha - 250g',
    description: 'Traditional poha ready in 2 minutes',
    price: 65,
    mrp: 72,
    category: 'Breakfast & Instant Foods',
    brand: 'MTR',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10672a.jpg' }],
    stock: 80,
    inStock: true,
    unit: 'g',
    quantity: 250
  },
  {
    name: 'MTR Ready to Eat Upma - 250g',
    description: 'South Indian upma ready to eat',
    price: 65,
    mrp: 72,
    category: 'Breakfast & Instant Foods',
    brand: 'MTR',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10673a.jpg' }],
    stock: 75,
    inStock: true,
    unit: 'g',
    quantity: 250
  },
  {
    name: 'Nestlé Ceregrow - 300g',
    description: 'Nutritious cereal for growing kids',
    price: 245,
    mrp: 275,
    category: 'Breakfast & Instant Foods',
    brand: 'Nestlé',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10674a.jpg' }],
    stock: 50,
    inStock: true,
    unit: 'g',
    quantity: 300
  },

  // Instant Mixes
  {
    name: 'MTR Rava Idli Mix - 500g',
    description: 'Instant idli mix, just add water',
    price: 85,
    mrp: 95,
    category: 'Breakfast & Instant Foods',
    brand: 'MTR',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10675a.jpg' }],
    stock: 85,
    inStock: true,
    unit: 'g',
    quantity: 500
  },
  {
    name: 'Gits Dosa Mix - 500g',
    description: 'Crispy dosa mix ready in minutes',
    price: 80,
    mrp: 90,
    category: 'Breakfast & Instant Foods',
    brand: 'Gits',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10676a.jpg' }],
    stock: 75,
    inStock: true,
    unit: 'g',
    quantity: 500
  },
  {
    name: 'Pillsbury Pancake Mix - 400g',
    description: 'Fluffy pancakes in minutes',
    price: 120,
    mrp: 135,
    category: 'Breakfast & Instant Foods',
    brand: 'Pillsbury',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10677a.jpg' }],
    stock: 65,
    inStock: true,
    unit: 'g',
    quantity: 400
  }
];

const migrateBreakfastInstant = async () => {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/jagatstore');
    console.log('✅ Connected to MongoDB');

    console.log('🗑️  Removing existing Breakfast & Instant Foods products...');
    await Product.deleteMany({ category: 'Breakfast & Instant Foods' });
    console.log('✅ Existing products removed');

    console.log('📦 Adding new products...');
    const result = await Product.insertMany(breakfastInstantProducts);
    console.log(`✅ Added ${result.length} Breakfast & Instant Foods products`);

    console.log('🎉 Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

migrateBreakfastInstant();