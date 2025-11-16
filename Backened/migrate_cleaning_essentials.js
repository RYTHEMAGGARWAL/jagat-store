// migrate_cleaning_essentials.js - Cleaning Essentials Migration

const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('./models/Product');

const cleaningEssentialsProducts = [
  // Toilet Cleaners
  {
    name: 'Harpic Toilet Cleaner - 1L',
    description: 'Powerful toilet cleaning liquid',
    price: 145,
    mrp: 165,
    category: 'Cleaning Essentials',
    brand: 'Harpic',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10401a.jpg' }],
    stock: 80,
    inStock: true,
    unit: 'L',
    quantity: 1
  },
  {
    name: 'Harpic Power Plus - 500ml',
    description: 'Extra strong toilet cleaner',
    price: 85,
    mrp: 95,
    category: 'Cleaning Essentials',
    brand: 'Harpic',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10402a.jpg' }],
    stock: 100,
    inStock: true,
    unit: 'ml',
    quantity: 500
  },
  {
    name: 'Domex Toilet Cleaner - 1L',
    description: 'Kills 99.9% germs',
    price: 135,
    mrp: 155,
    category: 'Cleaning Essentials',
    brand: 'Domex',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10403a.jpg' }],
    stock: 75,
    inStock: true,
    unit: 'L',
    quantity: 1
  },

  // Floor Cleaners
  {
    name: 'Lizol Floor Cleaner - 975ml',
    description: 'Disinfectant floor cleaner',
    price: 125,
    mrp: 140,
    category: 'Cleaning Essentials',
    brand: 'Lizol',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10404a.jpg' }],
    stock: 90,
    inStock: true,
    unit: 'ml',
    quantity: 975
  },
  {
    name: 'Lizol Citrus Floor Cleaner - 500ml',
    description: 'Fresh citrus fragrance',
    price: 75,
    mrp: 85,
    category: 'Cleaning Essentials',
    brand: 'Lizol',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10405a.jpg' }],
    stock: 95,
    inStock: true,
    unit: 'ml',
    quantity: 500
  },

  // Dishwash
  {
    name: 'Vim Dishwash Bar - 600g',
    description: 'Lemon dishwash bar',
    price: 85,
    mrp: 95,
    category: 'Cleaning Essentials',
    brand: 'Vim',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10406a.jpg' }],
    stock: 120,
    inStock: true,
    unit: 'g',
    quantity: 600
  },
  {
    name: 'Vim Dishwash Liquid - 750ml',
    description: 'Tough on grease, soft on hands',
    price: 95,
    mrp: 110,
    category: 'Cleaning Essentials',
    brand: 'Vim',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10407a.jpg' }],
    stock: 100,
    inStock: true,
    unit: 'ml',
    quantity: 750
  },
  {
    name: 'Pril Dishwash Liquid - 750ml',
    description: 'Concentrated dishwashing liquid',
    price: 105,
    mrp: 120,
    category: 'Cleaning Essentials',
    brand: 'Pril',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10408a.jpg' }],
    stock: 85,
    inStock: true,
    unit: 'ml',
    quantity: 750
  },

  // Glass & Surface Cleaners
  {
    name: 'Colin Glass Cleaner - 500ml',
    description: 'Streak-free shine',
    price: 110,
    mrp: 125,
    category: 'Cleaning Essentials',
    brand: 'Colin',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10409a.jpg' }],
    stock: 70,
    inStock: true,
    unit: 'ml',
    quantity: 500
  },
  {
    name: 'Colin Glass Cleaner Refill - 500ml',
    description: 'Refill pack for Colin',
    price: 85,
    mrp: 95,
    category: 'Cleaning Essentials',
    brand: 'Colin',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10410a.jpg' }],
    stock: 80,
    inStock: true,
    unit: 'ml',
    quantity: 500
  },

  // Scrubbers & Pads
  {
    name: 'Scotch Brite Scrub Pad - 3 pcs',
    description: 'Heavy-duty scrubbing pads',
    price: 55,
    mrp: 62,
    category: 'Cleaning Essentials',
    brand: 'Scotch Brite',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10411a.jpg' }],
    stock: 150,
    inStock: true,
    unit: 'pcs',
    quantity: 3
  },
  {
    name: 'Scotch Brite Scrub Sponge - 3 pcs',
    description: 'Dual-sided scrub sponge',
    price: 65,
    mrp: 72,
    category: 'Cleaning Essentials',
    brand: 'Scotch Brite',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10412a.jpg' }],
    stock: 140,
    inStock: true,
    unit: 'pcs',
    quantity: 3
  },

  // Detergents - Bar
  {
    name: 'Rin Detergent Bar - 1kg',
    description: 'Superior stain removal',
    price: 95,
    mrp: 110,
    category: 'Cleaning Essentials',
    brand: 'Rin',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10413a.jpg' }],
    stock: 110,
    inStock: true,
    unit: 'kg',
    quantity: 1
  },
  {
    name: 'Wheel Detergent Bar - 1kg',
    description: 'Tough on stains',
    price: 85,
    mrp: 95,
    category: 'Cleaning Essentials',
    brand: 'Wheel',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10414a.jpg' }],
    stock: 105,
    inStock: true,
    unit: 'kg',
    quantity: 1
  },

  // Detergents - Liquid
  {
    name: 'Surf Excel Liquid - 1L',
    description: 'Liquid detergent for washing machine',
    price: 195,
    mrp: 220,
    category: 'Cleaning Essentials',
    brand: 'Surf Excel',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10415a.jpg' }],
    stock: 85,
    inStock: true,
    unit: 'L',
    quantity: 1
  },

  // Detergents - Powder
  {
    name: 'Ariel Detergent Powder - 2kg',
    description: 'Removes tough stains in 1 wash',
    price: 320,
    mrp: 365,
    category: 'Cleaning Essentials',
    brand: 'Ariel',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10416a.jpg' }],
    stock: 70,
    inStock: true,
    unit: 'kg',
    quantity: 2
  },
  {
    name: 'Tide Plus Detergent - 2kg',
    description: 'Extra power detergent powder',
    price: 280,
    mrp: 320,
    category: 'Cleaning Essentials',
    brand: 'Tide',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10417a.jpg' }],
    stock: 80,
    inStock: true,
    unit: 'kg',
    quantity: 2
  },
  {
    name: 'Surf Excel Easy Wash - 2kg',
    description: 'Easy wash detergent powder',
    price: 265,
    mrp: 300,
    category: 'Cleaning Essentials',
    brand: 'Surf Excel',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10418a.jpg' }],
    stock: 75,
    inStock: true,
    unit: 'kg',
    quantity: 2
  },

  // Fabric Conditioner
  {
    name: 'Comfort Fabric Conditioner - 860ml',
    description: 'Softens & freshens clothes',
    price: 185,
    mrp: 210,
    category: 'Cleaning Essentials',
    brand: 'Comfort',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10419a.jpg' }],
    stock: 65,
    inStock: true,
    unit: 'ml',
    quantity: 860
  },
  {
    name: 'Comfort After Wash - 400ml',
    description: 'Luxury fragrance conditioner',
    price: 95,
    mrp: 110,
    category: 'Cleaning Essentials',
    brand: 'Comfort',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10420a.jpg' }],
    stock: 70,
    inStock: true,
    unit: 'ml',
    quantity: 400
  }
];

const migrateCleaningEssentials = async () => {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/jagatstore');
    console.log('✅ Connected to MongoDB');

    console.log('🗑️  Removing existing Cleaning Essentials products...');
    await Product.deleteMany({ category: 'Cleaning Essentials' });
    console.log('✅ Existing products removed');

    console.log('📦 Adding new Cleaning Essentials products...');
    const result = await Product.insertMany(cleaningEssentialsProducts);
    console.log(`✅ Added ${result.length} Cleaning Essentials products`);

    console.log('🎉 Migration completed successfully!');
    console.log(`📊 Total: ${result.length} products`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

migrateCleaningEssentials();