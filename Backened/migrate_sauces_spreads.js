// migrate_sauces_spreads.js - Sauces & Spreads Products Migration

const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI || "mongodb+srv://rythemaggarwal7840:Rythem7840@cluster0.obezyro.mongodb.net/?appName=Cluster0")
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

const Product = require('./models/Product');

const saucesAndSpreadsProducts = [
  // Tomato Ketchup
  {
    name: 'Kissan Fresh Tomato Ketchup - 200g',
    description: 'India\'s favorite tomato ketchup made with fresh tomatoes',
    price: 45,
    mrp: 50,
    category: 'Sauces Spreads',
    brand: 'Kissan',
    images: [{
      url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/20832a.jpg'
    }],
    stock: 100,
    inStock: true,
    unit: 'g',
    quantity: 200
  },
  {
    name: 'Kissan Fresh Tomato Ketchup - 500g',
    description: 'Family pack tomato ketchup with real tomato goodness',
    price: 95,
    mrp: 105,
    category: 'Sauces Spreads',
    brand: 'Kissan',
    images: [{
      url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/20832a.jpg'
    }],
    stock: 80,
    inStock: true,
    unit: 'g',
    quantity: 500
  },
  {
    name: 'Maggi Rich Tomato Ketchup - 1kg',
    description: 'Rich and tangy tomato ketchup from Maggi',
    price: 140,
    mrp: 160,
    category: 'Sauces Spreads',
    brand: 'Maggi',
    images: [{
      url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/20833a.jpg'
    }],
    stock: 60,
    inStock: true,
    unit: 'kg',
    quantity: 1
  },

  // Chilli Sauce
  {
    name: 'Ching\'s Secret Red Chilli Sauce - 200g',
    description: 'Spicy red chilli sauce for Indo-Chinese dishes',
    price: 50,
    mrp: 55,
    category: 'Sauces Spreads',
    brand: 'Ching\'s Secret',
    images: [{
      url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/446514a.jpg'
    }],
    stock: 75,
    inStock: true,
    unit: 'g',
    quantity: 200
  },
  {
    name: 'Ching\'s Secret Green Chilli Sauce - 190g',
    description: 'Tangy green chilli sauce with authentic taste',
    price: 48,
    mrp: 52,
    category: 'Sauces Spreads',
    brand: 'Ching\'s Secret',
    images: [{
      url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/446515a.jpg'
    }],
    stock: 70,
    inStock: true,
    unit: 'g',
    quantity: 190
  },

  // Soy Sauce
  {
    name: 'Ching\'s Secret Dark Soy Sauce - 210g',
    description: 'Premium dark soy sauce for authentic Chinese cooking',
    price: 55,
    mrp: 60,
    category: 'Sauces Spreads',
    brand: 'Ching\'s Secret',
    images: [{
      url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/446516a.jpg'
    }],
    stock: 65,
    inStock: true,
    unit: 'g',
    quantity: 210
  },
  {
    name: 'Lee Kum Kee Premium Soy Sauce - 500ml',
    description: 'Authentic Chinese soy sauce for professional cooking',
    price: 180,
    mrp: 200,
    category: 'Sauces Spreads',
    brand: 'Lee Kum Kee',
    images: [{
      url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/446517a.jpg'
    }],
    stock: 40,
    inStock: true,
    unit: 'ml',
    quantity: 500
  },

  // Schezwan Sauce
  {
    name: 'Ching\'s Secret Schezwan Chutney - 250g',
    description: 'Spicy Schezwan sauce for perfect Indo-Chinese taste',
    price: 65,
    mrp: 70,
    category: 'Sauces Spreads',
    brand: 'Ching\'s Secret',
    images: [{
      url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/446518a.jpg'
    }],
    stock: 85,
    inStock: true,
    unit: 'g',
    quantity: 250
  },

  // Mayonnaise
  {
    name: 'Veeba Eggless Mayo - 250g',
    description: 'Creamy eggless mayonnaise, perfect for sandwiches',
    price: 85,
    mrp: 95,
    category: 'Sauces Spreads',
    brand: 'Veeba',
    images: [{
      url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/446519a.jpg'
    }],
    stock: 90,
    inStock: true,
    unit: 'g',
    quantity: 250
  },
  {
    name: 'Dr. Oetker FunFoods Veg Mayonnaise - 500g',
    description: 'India\'s favorite vegetarian mayonnaise',
    price: 150,
    mrp: 165,
    category: 'Sauces Spreads',
    brand: 'Dr. Oetker',
    images: [{
      url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/18922a.jpg'
    }],
    stock: 75,
    inStock: true,
    unit: 'g',
    quantity: 500
  },
  {
    name: 'Hellmann\'s Real Mayonnaise - 400ml',
    description: 'World\'s best selling mayonnaise with real eggs',
    price: 220,
    mrp: 245,
    category: 'Sauces Spreads',
    brand: 'Hellmann\'s',
    images: [{
      url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/446520a.jpg'
    }],
    stock: 50,
    inStock: true,
    unit: 'ml',
    quantity: 400
  },

  // Peanut Butter
  {
    name: 'Sundrop Peanut Butter Crunchy - 462g',
    description: 'High protein crunchy peanut butter',
    price: 180,
    mrp: 200,
    category: 'Sauces Spreads',
    brand: 'Sundrop',
    images: [{
      url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/7818a.jpg'
    }],
    stock: 70,
    inStock: true,
    unit: 'g',
    quantity: 462
  },
  {
    name: 'Sundrop Peanut Butter Creamy - 924g',
    description: 'Smooth and creamy peanut butter, high in protein',
    price: 330,
    mrp: 370,
    category: 'Sauces Spreads',
    brand: 'Sundrop',
    images: [{
      url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/7818a.jpg'
    }],
    stock: 60,
    inStock: true,
    unit: 'g',
    quantity: 924
  },
  {
    name: 'Alpino Peanut Butter Smooth - 1kg',
    description: '100% natural peanut butter with no added sugar',
    price: 450,
    mrp: 499,
    category: 'Sauces Spreads',
    brand: 'Alpino',
    images: [{
      url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/446521a.jpg'
    }],
    stock: 45,
    inStock: true,
    unit: 'kg',
    quantity: 1
  },

  // Jam
  {
    name: 'Kissan Mixed Fruit Jam - 200g',
    description: 'Delicious mixed fruit jam made with real fruits',
    price: 65,
    mrp: 72,
    category: 'Sauces Spreads',
    brand: 'Kissan',
    images: [{
      url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/20834a.jpg'
    }],
    stock: 80,
    inStock: true,
    unit: 'g',
    quantity: 200
  },
  {
    name: 'Kissan Mixed Fruit Jam - 500g',
    description: 'Family pack mixed fruit jam with fruity taste',
    price: 140,
    mrp: 155,
    category: 'Sauces Spreads',
    brand: 'Kissan',
    images: [{
      url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/20834a.jpg'
    }],
    stock: 70,
    inStock: true,
    unit: 'g',
    quantity: 500
  },
  {
    name: 'Kissan Pineapple Jam - 200g',
    description: 'Tangy pineapple jam perfect for breakfast',
    price: 68,
    mrp: 75,
    category: 'Sauces Spreads',
    brand: 'Kissan',
    images: [{
      url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/446522a.jpg'
    }],
    stock: 65,
    inStock: true,
    unit: 'g',
    quantity: 200
  },
  {
    name: 'Kissan Mango Jam - 200g',
    description: 'Sweet mango jam made with real Alphonso mangoes',
    price: 70,
    mrp: 77,
    category: 'Sauces Spreads',
    brand: 'Kissan',
    images: [{
      url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/446523a.jpg'
    }],
    stock: 75,
    inStock: true,
    unit: 'g',
    quantity: 200
  },

  // Chocolate Spread
  {
    name: 'Nutella Hazelnut Spread - 350g',
    description: 'World famous hazelnut spread with cocoa',
    price: 320,
    mrp: 360,
    category: 'Sauces Spreads',
    brand: 'Nutella',
    images: [{
      url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/77a.jpg'
    }],
    stock: 55,
    inStock: true,
    unit: 'g',
    quantity: 350
  },
  {
    name: 'Nutella Hazelnut Spread - 750g',
    description: 'Family pack Nutella for chocolate lovers',
    price: 650,
    mrp: 720,
    category: 'Sauces Spreads',
    brand: 'Nutella',
    images: [{
      url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/77a.jpg'
    }],
    stock: 40,
    inStock: true,
    unit: 'g',
    quantity: 750
  },
  {
    name: 'Hershey\'s Chocolate Syrup - 623g',
    description: 'Premium chocolate syrup for desserts and drinks',
    price: 280,
    mrp: 310,
    category: 'Sauces Spreads',
    brand: 'Hershey\'s',
    images: [{
      url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/446524a.jpg'
    }],
    stock: 50,
    inStock: true,
    unit: 'g',
    quantity: 623
  },

  // Pasta Sauce
  {
    name: 'Kissan Pasta Sauce Italian Blend - 200g',
    description: 'Ready to use Italian pasta sauce',
    price: 75,
    mrp: 82,
    category: 'Sauces Spreads',
    brand: 'Kissan',
    images: [{
      url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/446525a.jpg'
    }],
    stock: 60,
    inStock: true,
    unit: 'g',
    quantity: 200
  },
  {
    name: 'Maggi Pasta Sauce Tomato Basil - 140g',
    description: 'Tomato and basil pasta sauce from Maggi',
    price: 65,
    mrp: 70,
    category: 'Sauces Spreads',
    brand: 'Maggi',
    images: [{
      url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/446526a.jpg'
    }],
    stock: 70,
    inStock: true,
    unit: 'g',
    quantity: 140
  },

  // Vinegar
  {
    name: 'Heinz Apple Cider Vinegar - 473ml',
    description: 'Natural apple cider vinegar for health and cooking',
    price: 195,
    mrp: 215,
    category: 'Sauces Spreads',
    brand: 'Heinz',
    images: [{
      url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/446527a.jpg'
    }],
    stock: 45,
    inStock: true,
    unit: 'ml',
    quantity: 473
  },
  {
    name: 'American Garden White Vinegar - 473ml',
    description: 'Pure white vinegar for cooking and pickling',
    price: 120,
    mrp: 135,
    category: 'Sauces Spreads',
    brand: 'American Garden',
    images: [{
      url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/446528a.jpg'
    }],
    stock: 55,
    inStock: true,
    unit: 'ml',
    quantity: 473
  },

  // Honey
  {
    name: 'Dabur Honey - 400g',
    description: '100% pure honey, tested for purity',
    price: 185,
    mrp: 205,
    category: 'Sauces Spreads',
    brand: 'Dabur',
    images: [{
      url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/486a.jpg'
    }],
    stock: 80,
    inStock: true,
    unit: 'g',
    quantity: 400
  },
  {
    name: 'Dabur Honey - 1kg',
    description: 'Family pack 100% pure honey',
    price: 420,
    mrp: 470,
    category: 'Sauces Spreads',
    brand: 'Dabur',
    images: [{
      url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/486a.jpg'
    }],
    stock: 60,
    inStock: true,
    unit: 'kg',
    quantity: 1
  },
  {
    name: 'Patanjali Pure Honey - 500g',
    description: 'Natural and pure honey from Patanjali',
    price: 160,
    mrp: 180,
    category: 'Sauces Spreads',
    brand: 'Patanjali',
    images: [{
      url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/446529a.jpg'
    }],
    stock: 70,
    inStock: true,
    unit: 'g',
    quantity: 500
  }
];

const migrateSaucesSpreads = async () => {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/jagatstore', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');

    console.log('🗑️  Removing existing Sauces & Spreads products...');
    await Product.deleteMany({ category: 'Sauces Spreads' });
    console.log('✅ Existing products removed');

    console.log('📦 Adding new Sauces & Spreads products...');
    const result = await Product.insertMany(saucesAndSpreadsProducts);
    console.log(`✅ Added ${result.length} Sauces & Spreads products`);

    console.log('🎉 Migration completed successfully!');
    console.log(`📊 Total products in Sauces & Spreads: ${result.length}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

migrateSaucesSpreads();