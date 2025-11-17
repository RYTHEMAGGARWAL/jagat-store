// migrate_organic_healthy.js - Organic & Healthy Living Products Migration

const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI || "mongodb+srv://rythemaggarwal7840:Rythem7840@cluster0.obezyro.mongodb.net/?appName=Cluster0")
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

const Product = require('./models/Product');

const organicHealthyProducts = [
  // Organic Tea & Coffee
  {
    name: 'Organic India Tulsi Tea - 100 Bags',
    description: 'Organic Tulsi green tea bags',
    price: 245,
    mrp: 275,
    category: 'Organic & Healthy Living',
    brand: 'Organic India',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10601a.jpg' }],
    stock: 60,
    inStock: true,
    unit: 'bags',
    quantity: 100
  },
  {
    name: 'Organic India Tulsi Green Tea - 25 Bags',
    description: 'Premium tulsi green tea',
    price: 95,
    mrp: 110,
    category: 'Organic & Healthy Living',
    brand: 'Organic India',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10602a.jpg' }],
    stock: 75,
    inStock: true,
    unit: 'bags',
    quantity: 25
  },

  // Organic Grains & Rice
  {
    name: '24 Mantra Organic Brown Rice - 1kg',
    description: 'Unpolished brown rice',
    price: 165,
    mrp: 190,
    category: 'Organic & Healthy Living',
    brand: '24 Mantra',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10603a.jpg' }],
    stock: 70,
    inStock: true,
    unit: 'kg',
    quantity: 1
  },
  {
    name: '24 Mantra Organic White Rice - 1kg',
    description: 'Organic basmati rice',
    price: 175,
    mrp: 200,
    category: 'Organic & Healthy Living',
    brand: '24 Mantra',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10604a.jpg' }],
    stock: 65,
    inStock: true,
    unit: 'kg',
    quantity: 1
  },
  {
    name: 'Pro Nature Organic Quinoa - 500g',
    description: 'Premium quality quinoa',
    price: 295,
    mrp: 330,
    category: 'Organic & Healthy Living',
    brand: 'Pro Nature',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10605a.jpg' }],
    stock: 50,
    inStock: true,
    unit: 'g',
    quantity: 500
  },

  // Organic Sweeteners
  {
    name: 'Organic Honey - 500g',
    description: '100% pure organic honey',
    price: 285,
    mrp: 320,
    category: 'Organic & Healthy Living',
    brand: 'Organic India',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10606a.jpg' }],
    stock: 55,
    inStock: true,
    unit: 'g',
    quantity: 500
  },
  {
    name: 'Organic Jaggery Powder - 500g',
    description: 'Chemical-free jaggery',
    price: 125,
    mrp: 145,
    category: 'Organic & Healthy Living',
    brand: '24 Mantra',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10607a.jpg' }],
    stock: 70,
    inStock: true,
    unit: 'g',
    quantity: 500
  },

  // Healthy Breakfast
  {
    name: 'Soulfull Ragi Bites - 400g',
    description: 'Healthy ragi breakfast cereal',
    price: 175,
    mrp: 195,
    category: 'Organic & Healthy Living',
    brand: 'Soulfull',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10608a.jpg' }],
    stock: 65,
    inStock: true,
    unit: 'g',
    quantity: 400
  },
  {
    name: 'Yoga Bar Muesli - 700g',
    description: 'Crunchy muesli with fruits & nuts',
    price: 295,
    mrp: 330,
    category: 'Organic & Healthy Living',
    brand: 'Yoga Bar',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10609a.jpg' }],
    stock: 50,
    inStock: true,
    unit: 'g',
    quantity: 700
  },

  // Seeds & Nuts
  {
    name: 'Nourish Organics Seeds Mix - 150g',
    description: 'Mix of chia, flax & sunflower seeds',
    price: 185,
    mrp: 210,
    category: 'Organic & Healthy Living',
    brand: 'Nourish',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10610a.jpg' }],
    stock: 60,
    inStock: true,
    unit: 'g',
    quantity: 150
  },
  {
    name: 'True Elements Chia Seeds - 150g',
    description: 'Premium quality chia seeds',
    price: 165,
    mrp: 190,
    category: 'Organic & Healthy Living',
    brand: 'True Elements',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10611a.jpg' }],
    stock: 55,
    inStock: true,
    unit: 'g',
    quantity: 150
  },
  {
    name: 'True Elements Flax Seeds - 150g',
    description: 'Roasted flax seeds',
    price: 145,
    mrp: 165,
    category: 'Organic & Healthy Living',
    brand: 'True Elements',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10612a.jpg' }],
    stock: 60,
    inStock: true,
    unit: 'g',
    quantity: 150
  },
  {
    name: 'True Elements Pumpkin Seeds - 125g',
    description: 'Raw pumpkin seeds',
    price: 185,
    mrp: 210,
    category: 'Organic & Healthy Living',
    brand: 'True Elements',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10613a.jpg' }],
    stock: 50,
    inStock: true,
    unit: 'g',
    quantity: 125
  },

  // Organic Milk & Alternatives
  {
    name: 'Raw Pressery Almond Milk - 1L',
    description: 'Unsweetened almond milk',
    price: 195,
    mrp: 220,
    category: 'Organic & Healthy Living',
    brand: 'Raw Pressery',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10614a.jpg' }],
    stock: 45,
    inStock: true,
    unit: 'L',
    quantity: 1
  },
  {
    name: 'Raw Pressery Coconut Milk - 1L',
    description: 'Fresh coconut milk',
    price: 185,
    mrp: 210,
    category: 'Organic & Healthy Living',
    brand: 'Raw Pressery',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10615a.jpg' }],
    stock: 40,
    inStock: true,
    unit: 'L',
    quantity: 1
  },

  // Organic Nut Butter
  {
    name: 'Pintola Organic Peanut Butter - 1kg',
    description: 'All natural crunchy peanut butter',
    price: 495,
    mrp: 550,
    category: 'Organic & Healthy Living',
    brand: 'Pintola',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10616a.jpg' }],
    stock: 40,
    inStock: true,
    unit: 'kg',
    quantity: 1
  },
  {
    name: 'Pintola Organic Almond Butter - 500g',
    description: '100% roasted almonds',
    price: 625,
    mrp: 699,
    category: 'Organic & Healthy Living',
    brand: 'Pintola',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10617a.jpg' }],
    stock: 35,
    inStock: true,
    unit: 'g',
    quantity: 500
  },

  // Healthy Snacks
  {
    name: 'Yoga Bar Protein Bars - 6 pcs',
    description: 'High protein nutrition bars',
    price: 295,
    mrp: 330,
    category: 'Organic & Healthy Living',
    brand: 'Yoga Bar',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10618a.jpg' }],
    stock: 55,
    inStock: true,
    unit: 'pcs',
    quantity: 6
  },
  {
    name: 'RiteBite Max Protein Bars - 6 pcs',
    description: 'Active protein bars',
    price: 285,
    mrp: 320,
    category: 'Organic & Healthy Living',
    brand: 'RiteBite',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10619a.jpg' }],
    stock: 60,
    inStock: true,
    unit: 'pcs',
    quantity: 6
  },

  // Organic Oil
  {
    name: 'Organic Cold Pressed Coconut Oil - 500ml',
    description: '100% pure virgin coconut oil',
    price: 285,
    mrp: 320,
    category: 'Organic & Healthy Living',
    brand: '24 Mantra',
    images: [{ url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10620a.jpg' }],
    stock: 50,
    inStock: true,
    unit: 'ml',
    quantity: 500
  }
];

const migrateOrganicHealthy = async () => {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/jagatstore');
    console.log('✅ Connected to MongoDB');

    console.log('🗑️  Removing existing Organic & Healthy Living products...');
    await Product.deleteMany({ category: 'Organic & Healthy Living' });
    console.log('✅ Existing products removed');

    console.log('📦 Adding new Organic & Healthy Living products...');
    const result = await Product.insertMany(organicHealthyProducts);
    console.log(`✅ Added ${result.length} Organic & Healthy Living products`);

    console.log('🎉 Migration completed successfully!');
    console.log(`📊 Total: ${result.length} products`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

migrateOrganicHealthy();