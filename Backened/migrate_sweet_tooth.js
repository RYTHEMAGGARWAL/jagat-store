// migrate_sweet_tooth.js - Sweet Tooth Products Migration

const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI || "mongodb+srv://rythemaggarwal7840:Rythem7840@cluster0.obezyro.mongodb.net/?appName=Cluster0")
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

const Product = require('./models/Product');

const sweetToothProducts = [
  // Dairy Milk
  {
    name: 'Cadbury Dairy Milk - 165g',
    description: 'Classic milk chocolate',
    price: 140,
    mrp: 160,
    category: 'Sweet Tooth',
    brand: 'Cadbury',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/40a.jpg' }],
    stock: 100,
    inStock: true,
    unit: 'g',
    quantity: 165
  },
  {
    name: 'Cadbury Dairy Milk Silk - 150g',
    description: 'Premium silk chocolate',
    price: 195,
    mrp: 220,
    category: 'Sweet Tooth',
    brand: 'Cadbury',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/41a.jpg' }],
    stock: 85,
    inStock: true,
    unit: 'g',
    quantity: 150
  },
  {
    name: 'Cadbury Dairy Milk Fruit & Nut - 165g',
    description: 'Chocolate with dry fruits',
    price: 150,
    mrp: 170,
    category: 'Sweet Tooth',
    brand: 'Cadbury',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/42a.jpg' }],
    stock: 90,
    inStock: true,
    unit: 'g',
    quantity: 165
  },

  // KitKat & Nestle
  {
    name: 'KitKat Chocolate - 138g',
    description: 'Crispy wafer chocolate',
    price: 120,
    mrp: 135,
    category: 'Sweet Tooth',
    brand: 'KitKat',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/43a.jpg' }],
    stock: 90,
    inStock: true,
    unit: 'g',
    quantity: 138
  },
  {
    name: 'KitKat Dark - 120g',
    description: 'Dark chocolate wafer',
    price: 130,
    mrp: 145,
    category: 'Sweet Tooth',
    brand: 'KitKat',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/44a.jpg' }],
    stock: 75,
    inStock: true,
    unit: 'g',
    quantity: 120
  },

  // Small Chocolates
  {
    name: '5 Star Chocolate - 40g',
    description: 'Caramel and nougat chocolate',
    price: 35,
    mrp: 40,
    category: 'Sweet Tooth',
    brand: '5 Star',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/45a.jpg' }],
    stock: 150,
    inStock: true,
    unit: 'g',
    quantity: 40
  },
  {
    name: 'Munch Chocolate - 40g',
    description: 'Crunchy wafer chocolate',
    price: 30,
    mrp: 35,
    category: 'Sweet Tooth',
    brand: 'Munch',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/46a.jpg' }],
    stock: 140,
    inStock: true,
    unit: 'g',
    quantity: 40
  },
  {
    name: 'Perk Chocolate - 28g',
    description: 'Wafer chocolate bar',
    price: 25,
    mrp: 30,
    category: 'Sweet Tooth',
    brand: 'Perk',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/47a.jpg' }],
    stock: 160,
    inStock: true,
    unit: 'g',
    quantity: 28
  },

  // International Brands
  {
    name: 'Snickers Chocolate - 50g',
    description: 'Peanuts, caramel and nougat',
    price: 40,
    mrp: 45,
    category: 'Sweet Tooth',
    brand: 'Snickers',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/48a.jpg' }],
    stock: 130,
    inStock: true,
    unit: 'g',
    quantity: 50
  },
  {
    name: 'Mars Chocolate - 51g',
    description: 'Chocolate caramel bar',
    price: 45,
    mrp: 50,
    category: 'Sweet Tooth',
    brand: 'Mars',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/49a.jpg' }],
    stock: 120,
    inStock: true,
    unit: 'g',
    quantity: 51
  },
  {
    name: 'Bounty Chocolate - 57g',
    description: 'Coconut filled chocolate',
    price: 50,
    mrp: 55,
    category: 'Sweet Tooth',
    brand: 'Bounty',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/50a.jpg' }],
    stock: 110,
    inStock: true,
    unit: 'g',
    quantity: 57
  },

  // Premium Chocolates
  {
    name: 'Ferrero Rocher - 16 pcs',
    description: 'Premium hazelnut chocolates',
    price: 550,
    mrp: 625,
    category: 'Sweet Tooth',
    brand: 'Ferrero',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/51a.jpg' }],
    stock: 40,
    inStock: true,
    unit: 'pcs',
    quantity: 16
  },
  {
    name: 'Ferrero Rocher - 3 pcs',
    description: 'Mini pack hazelnut chocolates',
    price: 125,
    mrp: 140,
    category: 'Sweet Tooth',
    brand: 'Ferrero',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/52a.jpg' }],
    stock: 70,
    inStock: true,
    unit: 'pcs',
    quantity: 3
  },

  // Assortments
  {
    name: 'Cadbury Celebrations - 118g',
    description: 'Assorted chocolates pack',
    price: 160,
    mrp: 180,
    category: 'Sweet Tooth',
    brand: 'Cadbury',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/53a.jpg' }],
    stock: 70,
    inStock: true,
    unit: 'g',
    quantity: 118
  },
  {
    name: 'Cadbury Celebrations Premium - 286g',
    description: 'Premium assorted chocolates',
    price: 380,
    mrp: 425,
    category: 'Sweet Tooth',
    brand: 'Cadbury',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/54a.jpg' }],
    stock: 50,
    inStock: true,
    unit: 'g',
    quantity: 286
  },

  // Gems & Candies
  {
    name: 'Cadbury Gems - 34g',
    description: 'Colorful chocolate buttons',
    price: 30,
    mrp: 35,
    category: 'Sweet Tooth',
    brand: 'Cadbury',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/55a.jpg' }],
    stock: 140,
    inStock: true,
    unit: 'g',
    quantity: 34
  },
  {
    name: 'Mango Bite - 100 pcs',
    description: 'Mango flavored candy',
    price: 80,
    mrp: 90,
    category: 'Sweet Tooth',
    brand: 'Parle',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/56a.jpg' }],
    stock: 100,
    inStock: true,
    unit: 'pcs',
    quantity: 100
  },
  {
    name: 'Alpenliebe Juzt Jelly - 200g',
    description: 'Fruit flavored jelly candies',
    price: 95,
    mrp: 110,
    category: 'Sweet Tooth',
    brand: 'Alpenliebe',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/57a.jpg' }],
    stock: 80,
    inStock: true,
    unit: 'g',
    quantity: 200
  },
  {
    name: 'Pulse Candy - 100 pcs',
    description: 'Tangy kaccha aam candy',
    price: 85,
    mrp: 95,
    category: 'Sweet Tooth',
    brand: 'Pulse',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/58a.jpg' }],
    stock: 110,
    inStock: true,
    unit: 'pcs',
    quantity: 100
  },

  // Indian Sweets - Ready to Eat
  {
    name: 'Gulab Jamun Ready Mix - 500g',
    description: 'Instant gulab jamun mix',
    price: 120,
    mrp: 135,
    category: 'Sweet Tooth',
    brand: 'Gits',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/59a.jpg' }],
    stock: 60,
    inStock: true,
    unit: 'g',
    quantity: 500
  },
  {
    name: 'Rasgulla Can - 1kg',
    description: 'Ready to eat rasgulla',
    price: 180,
    mrp: 200,
    category: 'Sweet Tooth',
    brand: 'Haldiram\'s',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/60a.jpg' }],
    stock: 50,
    inStock: true,
    unit: 'kg',
    quantity: 1
  },
  {
    name: 'Soan Papdi - 500g',
    description: 'Traditional Indian sweet',
    price: 165,
    mrp: 185,
    category: 'Sweet Tooth',
    brand: 'Haldiram\'s',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/61a.jpg' }],
    stock: 55,
    inStock: true,
    unit: 'g',
    quantity: 500
  }
];

const migrateSweetTooth = async () => {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/jagatstore');
    console.log('✅ Connected to MongoDB');

    console.log('🗑️  Removing existing Sweet Tooth products...');
    await Product.deleteMany({ category: 'Sweet Tooth' });
    console.log('✅ Existing products removed');

    console.log('📦 Adding new Sweet Tooth products...');
    const result = await Product.insertMany(sweetToothProducts);
    console.log(`✅ Added ${result.length} Sweet Tooth products`);

    console.log('🎉 Migration completed successfully!');
    console.log(`📊 Total: ${result.length} products`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

migrateSweetTooth();