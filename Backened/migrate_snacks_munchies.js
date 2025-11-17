// migrate_snacks_munchies.js - Snacks & Munchies Products Migration

const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI || "mongodb+srv://rythemaggarwal7840:Rythem7840@cluster0.obezyro.mongodb.net/?appName=Cluster0")
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

const Product = require('./models/Product');

const snacksMunchiesProducts = [
  // Chips - Lays
  {
    name: 'Lay\'s Classic Salted - 95g',
    description: 'India\'s favorite potato chips',
    price: 40,
    mrp: 45,
    category: 'Snacks & Munchies',
    brand: 'Lay\'s',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/483a.jpg' }],
    stock: 200,
    inStock: true,
    unit: 'g',
    quantity: 95
  },
  {
    name: 'Lay\'s Magic Masala - 95g',
    description: 'Masala flavored chips',
    price: 40,
    mrp: 45,
    category: 'Snacks & Munchies',
    brand: 'Lay\'s',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10701a.jpg' }],
    stock: 190,
    inStock: true,
    unit: 'g',
    quantity: 95
  },
  {
    name: 'Lay\'s American Style Cream & Onion - 90g',
    description: 'Creamy and tangy chips',
    price: 40,
    mrp: 45,
    category: 'Snacks & Munchies',
    brand: 'Lay\'s',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10702a.jpg' }],
    stock: 180,
    inStock: true,
    unit: 'g',
    quantity: 90
  },

  // Kurkure
  {
    name: 'Kurkure Masala Munch - 90g',
    description: 'Crunchy masala flavored snack',
    price: 35,
    mrp: 40,
    category: 'Snacks & Munchies',
    brand: 'Kurkure',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10703a.jpg' }],
    stock: 180,
    inStock: true,
    unit: 'g',
    quantity: 90
  },
  {
    name: 'Kurkure Chilli Chatka - 85g',
    description: 'Spicy chilli flavored kurkure',
    price: 35,
    mrp: 40,
    category: 'Snacks & Munchies',
    brand: 'Kurkure',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10704a.jpg' }],
    stock: 170,
    inStock: true,
    unit: 'g',
    quantity: 85
  },

  // Bingo
  {
    name: 'Bingo Mad Angles - 95g',
    description: 'Tangy tomato flavored chips',
    price: 38,
    mrp: 42,
    category: 'Snacks & Munchies',
    brand: 'Bingo',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10705a.jpg' }],
    stock: 170,
    inStock: true,
    unit: 'g',
    quantity: 95
  },
  {
    name: 'Bingo Original Style - 90g',
    description: 'Salted potato chips',
    price: 35,
    mrp: 40,
    category: 'Snacks & Munchies',
    brand: 'Bingo',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10706a.jpg' }],
    stock: 160,
    inStock: true,
    unit: 'g',
    quantity: 90
  },

  // Namkeen - Haldiram's
  {
    name: 'Haldiram\'s Aloo Bhujia - 400g',
    description: 'Classic aloo bhujia namkeen',
    price: 110,
    mrp: 125,
    category: 'Snacks & Munchies',
    brand: 'Haldiram\'s',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10707a.jpg' }],
    stock: 140,
    inStock: true,
    unit: 'g',
    quantity: 400
  },
  {
    name: 'Haldiram\'s Namkeen Mix - 400g',
    description: 'Mixture of crunchy namkeen',
    price: 105,
    mrp: 120,
    category: 'Snacks & Munchies',
    brand: 'Haldiram\'s',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10708a.jpg' }],
    stock: 130,
    inStock: true,
    unit: 'g',
    quantity: 400
  },
  {
    name: 'Haldiram\'s Moong Dal - 350g',
    description: 'Crispy moong dal namkeen',
    price: 95,
    mrp: 110,
    category: 'Snacks & Munchies',
    brand: 'Haldiram\'s',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10709a.jpg' }],
    stock: 125,
    inStock: true,
    unit: 'g',
    quantity: 350
  },
  {
    name: 'Haldiram\'s Khatta Meetha - 400g',
    description: 'Sweet and sour mixture',
    price: 115,
    mrp: 130,
    category: 'Snacks & Munchies',
    brand: 'Haldiram\'s',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10710a.jpg' }],
    stock: 120,
    inStock: true,
    unit: 'g',
    quantity: 400
  },

  // Bikaji
  {
    name: 'Bikaji Bhujia - 400g',
    description: 'Traditional Rajasthani bhujia',
    price: 100,
    mrp: 115,
    category: 'Snacks & Munchies',
    brand: 'Bikaji',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10711a.jpg' }],
    stock: 120,
    inStock: true,
    unit: 'g',
    quantity: 400
  },
  {
    name: 'Bikaji All in One - 400g',
    description: 'Mix of all favorite namkeens',
    price: 105,
    mrp: 120,
    category: 'Snacks & Munchies',
    brand: 'Bikaji',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10712a.jpg' }],
    stock: 110,
    inStock: true,
    unit: 'g',
    quantity: 400
  },

  // Healthy Chips
  {
    name: 'Too Yumm Multigrain Chips - 54g',
    description: 'Baked multigrain chips',
    price: 30,
    mrp: 35,
    category: 'Snacks & Munchies',
    brand: 'Too Yumm',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10713a.jpg' }],
    stock: 150,
    inStock: true,
    unit: 'g',
    quantity: 54
  },

  // Premium Chips
  {
    name: 'Pringles Original - 110g',
    description: 'Perfectly stacked potato crisps',
    price: 120,
    mrp: 135,
    category: 'Snacks & Munchies',
    brand: 'Pringles',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10714a.jpg' }],
    stock: 90,
    inStock: true,
    unit: 'g',
    quantity: 110
  },
  {
    name: 'Pringles Sour Cream & Onion - 110g',
    description: 'Tangy sour cream flavor',
    price: 120,
    mrp: 135,
    category: 'Snacks & Munchies',
    brand: 'Pringles',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10715a.jpg' }],
    stock: 85,
    inStock: true,
    unit: 'g',
    quantity: 110
  },

  // Doritos & Cheetos
  {
    name: 'Doritos Nachos - 90g',
    description: 'Crunchy nacho cheese chips',
    price: 55,
    mrp: 62,
    category: 'Snacks & Munchies',
    brand: 'Doritos',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10716a.jpg' }],
    stock: 110,
    inStock: true,
    unit: 'g',
    quantity: 90
  },
  {
    name: 'Cheetos Crunchy - 70g',
    description: 'Cheese flavored crunchy puffs',
    price: 40,
    mrp: 45,
    category: 'Snacks & Munchies',
    brand: 'Cheetos',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10717a.jpg' }],
    stock: 130,
    inStock: true,
    unit: 'g',
    quantity: 70
  },

  // Nuts & Seeds
  {
    name: 'Yellow Diamond Roasted Peanuts - 200g',
    description: 'Salted roasted peanuts',
    price: 60,
    mrp: 68,
    category: 'Snacks & Munchies',
    brand: 'Yellow Diamond',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10718a.jpg' }],
    stock: 100,
    inStock: true,
    unit: 'g',
    quantity: 200
  },
  {
    name: 'Yellow Diamond Cashews - 200g',
    description: 'Premium roasted cashews',
    price: 195,
    mrp: 220,
    category: 'Snacks & Munchies',
    brand: 'Yellow Diamond',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10719a.jpg' }],
    stock: 70,
    inStock: true,
    unit: 'g',
    quantity: 200
  },

  // Biscuit Snacks
  {
    name: 'Britannia Little Hearts - 75g',
    description: 'Sweet biscuits shaped like hearts',
    price: 25,
    mrp: 30,
    category: 'Snacks & Munchies',
    brand: 'Britannia',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10720a.jpg' }],
    stock: 160,
    inStock: true,
    unit: 'g',
    quantity: 75
  },
  {
    name: 'Parle Monaco Classic - 200g',
    description: 'Salted crackers',
    price: 35,
    mrp: 40,
    category: 'Snacks & Munchies',
    brand: 'Parle',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10721a.jpg' }],
    stock: 150,
    inStock: true,
    unit: 'g',
    quantity: 200
  },
  {
    name: 'Britannia Treat Cream Wafers - 150g',
    description: 'Vanilla cream wafers',
    price: 50,
    mrp: 55,
    category: 'Snacks & Munchies',
    brand: 'Britannia',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10722a.jpg' }],
    stock: 120,
    inStock: true,
    unit: 'g',
    quantity: 150
  },

  // Popcorn
  {
    name: 'Act II Popcorn Golden Sizzle - 70g',
    description: 'Microwave popcorn',
    price: 55,
    mrp: 62,
    category: 'Snacks & Munchies',
    brand: 'Act II',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10723a.jpg' }],
    stock: 95,
    inStock: true,
    unit: 'g',
    quantity: 70
  }
];

const migrateSnacksMunchies = async () => {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/jagatstore');
    console.log('✅ Connected to MongoDB');

    console.log('🗑️  Removing existing Snacks & Munchies products...');
    await Product.deleteMany({ category: 'Snacks & Munchies' });
    console.log('✅ Existing products removed');

    console.log('📦 Adding new Snacks & Munchies products...');
    const result = await Product.insertMany(snacksMunchiesProducts);
    console.log(`✅ Added ${result.length} Snacks & Munchies products`);

    console.log('🎉 Migration completed successfully!');
    console.log(`📊 Total: ${result.length} products`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

migrateSnacksMunchies();