const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/jagatstore')
  .then(() => console.log('✅ Connected to MongoDB'));

const products = [
  // ==================== BABY CARE PRODUCTS ====================
  {
    name: 'Pampers Baby Diaper Pants - Medium (52 Pieces)',
    description: 'Soft and comfortable diaper pants with 12 hours protection. Keeps baby dry and comfortable all day.',
    price: 950,
    mrp: 1099,
    images: [{ 
      url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/378007a.jpg' 
    }],
    category: 'Baby Care',
    subcategory: 'Diapers',
    brand: 'Pampers',
    stock: 60,
    unit: 'pieces',
    quantity: 52,
    tags: ['baby', 'diapers', 'pampers', 'baby care', 'diaper pants']
  },
  {
    name: 'Johnson Baby Soap - 75g',
    description: 'Mild and gentle soap for baby. Clinically proven mildness. Safe for delicate baby skin.',
    price: 55,
    mrp: 65,
    images: [{ 
      url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10363a.jpg' 
    }],
    category: 'Baby Care',
    subcategory: 'Baby Bath',
    brand: 'Johnson',
    stock: 120,
    unit: 'g',
    quantity: 75,
    tags: ['baby', 'soap', 'johnson', 'bath', 'baby care']
  },
  {
    name: 'Mamy Poko Pants Extra Absorb - Large (42 Pieces)',
    description: 'Extra absorb diaper pants with crisscross absorbent sheet. Prevents leakage for up to 12 hours.',
    price: 849,
    mrp: 999,
    images: [{ 
      url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/155428a.jpg' 
    }],
    category: 'Baby Care',
    subcategory: 'Diapers',
    brand: 'Mamy Poko',
    stock: 45,
    unit: 'pieces',
    quantity: 42,
    tags: ['baby', 'diapers', 'mamy poko', 'baby care', 'pants']
  },
  {
    name: 'Johnson Baby Powder - 200g',
    description: 'Clinically proven mild baby powder. Keeps baby skin soft, smooth and comfortable.',
    price: 180,
    mrp: 210,
    images: [{ 
      url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/158a.jpg' 
    }],
    category: 'Baby Care',
    subcategory: 'Baby Powder',
    brand: 'Johnson',
    stock: 85,
    unit: 'g',
    quantity: 200,
    tags: ['baby', 'powder', 'johnson', 'baby care']
  },
  {
    name: 'Himalaya Baby Lotion - 200ml',
    description: 'Enriched with natural ingredients. Keeps baby skin moisturized and soft all day long.',
    price: 155,
    mrp: 185,
    images: [{ 
      url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/90058a.jpg' 
    }],
    category: 'Baby Care',
    subcategory: 'Baby Lotion',
    brand: 'Himalaya',
    stock: 70,
    unit: 'ml',
    quantity: 200,
    tags: ['baby', 'lotion', 'himalaya', 'baby care', 'moisturizer']
  },
  {
    name: 'Huggies Wonder Pants - Medium (56 Pieces)',
    description: 'Bubble bed technology for bubble soft comfort. Extra absorption channels for dryness.',
    price: 999,
    mrp: 1199,
    images: [{ 
      url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/518641a.jpg' 
    }],
    category: 'Baby Care',
    subcategory: 'Diapers',
    brand: 'Huggies',
    stock: 55,
    unit: 'pieces',
    quantity: 56,
    tags: ['baby', 'diapers', 'huggies', 'baby care', 'wonder pants']
  },

  // ==================== PET CARE PRODUCTS ====================
  {
    name: 'Pedigree Adult Dog Food - Chicken & Vegetables (3kg)',
    description: 'Complete nutrition for adult dogs. Made with real chicken and vegetables. Supports healthy digestion.',
    price: 550,
    mrp: 600,
    images: [{ 
      url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/109992a.jpg' 
    }],
    category: 'Pet Care',
    subcategory: 'Dog Food',
    brand: 'Pedigree',
    stock: 80,
    unit: 'kg',
    quantity: 3,
    tags: ['pet', 'dog', 'food', 'pedigree', 'pet care']
  },
  {
    name: 'Whiskas Cat Food - Tuna Flavour (1.2kg)',
    description: 'Nutritious and tasty cat food made with real tuna. Complete meal for adult cats.',
    price: 320,
    mrp: 350,
    images: [{ 
      url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/142322a.jpg' 
    }],
    category: 'Pet Care',
    subcategory: 'Cat Food',
    brand: 'Whiskas',
    stock: 70,
    unit: 'kg',
    quantity: 1.2,
    tags: ['pet', 'cat', 'food', 'whiskas', 'pet care', 'tuna']
  },
  {
    name: 'Drools Adult Dog Food - Chicken & Egg (3kg)',
    description: 'High protein dog food with chicken and egg. For healthy muscles and bones.',
    price: 490,
    mrp: 550,
    images: [{ 
      url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/476533a.jpg' 
    }],
    category: 'Pet Care',
    subcategory: 'Dog Food',
    brand: 'Drools',
    stock: 65,
    unit: 'kg',
    quantity: 3,
    tags: ['pet', 'dog', 'food', 'drools', 'pet care', 'protein']
  },

  // ==================== ATTA RICE DAL PRODUCTS ====================
  {
    name: 'Aashirvaad Atta - Whole Wheat (5kg)',
    description: 'Premium quality whole wheat flour. 100% MP wheat for soft rotis. No maida.',
    price: 280,
    mrp: 300,
    images: [{ 
      url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/3624a.jpg' 
    }],
    category: 'Atta Rice Dal',
    subcategory: 'Atta',
    brand: 'Aashirvaad',
    stock: 200,
    unit: 'kg',
    quantity: 5,
    tags: ['atta', 'flour', 'wheat', 'aashirvaad', 'chakki']
  },
  {
    name: 'India Gate Basmati Rice - Dubar (1kg)',
    description: 'Premium basmati rice with long grains. Aged for superior taste and aroma.',
    price: 190,
    mrp: 210,
    images: [{ 
      url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/1963a.jpg' 
    }],
    category: 'Atta Rice Dal',
    subcategory: 'Rice',
    brand: 'India Gate',
    stock: 120,
    unit: 'kg',
    quantity: 1,
    tags: ['rice', 'basmati', 'india gate', 'premium']
  },
  {
    name: 'Tata Sampann Unpolished Toor Dal (1kg)',
    description: 'Unpolished toor dal rich in protein. Sourced directly from farmers. Chemical-free.',
    price: 145,
    mrp: 160,
    images: [{ 
      url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/442901a.jpg' 
    }],
    category: 'Atta Rice Dal',
    subcategory: 'Dal',
    brand: 'Tata Sampann',
    stock: 90,
    unit: 'kg',
    quantity: 1,
    tags: ['dal', 'toor', 'protein', 'tata sampann', 'pulses']
  },
  {
    name: 'Fortune Chakki Fresh Atta (10kg)',
    description: 'Made from 100% MP Sharbati wheat. No maida, no chemicals. Fresh chakki atta.',
    price: 520,
    mrp: 570,
    images: [{ 
      url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/483623a.jpg' 
    }],
    category: 'Atta Rice Dal',
    subcategory: 'Atta',
    brand: 'Fortune',
    stock: 150,
    unit: 'kg',
    quantity: 10,
    tags: ['atta', 'flour', 'fortune', 'wheat', 'chakki']
  },
  {
    name: 'Daawat Rozana Gold Basmati Rice (5kg)',
    description: 'Everyday basmati rice with extra long grains. Perfect for daily meals.',
    price: 620,
    mrp: 680,
    images: [{ 
      url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/482180a.jpg' 
    }],
    category: 'Atta Rice Dal',
    subcategory: 'Rice',
    brand: 'Daawat',
    stock: 100,
    unit: 'kg',
    quantity: 5,
    tags: ['rice', 'basmati', 'daawat', 'rozana', 'daily']
  },

  // ==================== DAIRY BREAD EGGS ====================
  {
    name: 'Amul Gold Milk - Full Cream (1L)',
    description: 'Fresh full cream milk rich in taste and nutrition. Perfect for daily consumption.',
    price: 60,
    mrp: 65,
    images: [{ 
      url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10491a.jpg' 
    }],
    category: 'Dairy Bread Eggs',
    subcategory: 'Milk',
    brand: 'Amul',
    stock: 100,
    unit: 'l',
    quantity: 1,
    tags: ['milk', 'dairy', 'amul', 'full cream', 'fresh']
  },
  {
    name: 'Britannia Whole Wheat Bread (400g)',
    description: 'Soft and fresh whole wheat bread. Healthy and nutritious for daily breakfast.',
    price: 35,
    mrp: 40,
    images: [{ 
      url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/13304a.jpg' 
    }],
    category: 'Dairy Bread Eggs',
    subcategory: 'Bread',
    brand: 'Britannia',
    stock: 80,
    unit: 'pieces',
    quantity: 1,
    tags: ['bread', 'whole wheat', 'britannia', 'breakfast']
  },
  {
    name: 'Farm Fresh White Eggs (6 Pieces)',
    description: 'Fresh white eggs high in protein. Perfect for breakfast, baking and cooking.',
    price: 45,
    mrp: 50,
    images: [{ 
      url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/11302a.jpg' 
    }],
    category: 'Dairy Bread Eggs',
    subcategory: 'Eggs',
    brand: 'Farm Fresh',
    stock: 150,
    unit: 'pieces',
    quantity: 6,
    tags: ['eggs', 'protein', 'farm fresh', 'white eggs']
  },
  {
    name: 'Amul Fresh Paneer (200g)',
    description: 'Fresh cottage cheese made from pure milk. Rich in protein and calcium.',
    price: 90,
    mrp: 100,
    images: [{ 
      url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/146a.jpg' 
    }],
    category: 'Dairy Bread Eggs',
    subcategory: 'Paneer',
    brand: 'Amul',
    stock: 70,
    unit: 'g',
    quantity: 200,
    tags: ['paneer', 'dairy', 'amul', 'cottage cheese', 'protein']
  },

  // ==================== MASALA OIL ====================
  {
    name: 'Everest Garam Masala (100g)',
    description: 'Authentic blend of spices. Adds rich flavor to your dishes. Pure and aromatic.',
    price: 85,
    mrp: 95,
    images: [{ 
      url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/9958a.jpg' 
    }],
    category: 'Masala Oil',
    subcategory: 'Masala',
    brand: 'Everest',
    stock: 150,
    unit: 'g',
    quantity: 100,
    tags: ['masala', 'spices', 'everest', 'garam masala', 'cooking']
  },
  {
    name: 'Fortune Sunflower Refined Oil (1L)',
    description: 'Light and healthy cooking oil. Perfect for all types of cooking. Heart healthy.',
    price: 210,
    mrp: 230,
    images: [{ 
      url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/6131a.jpg' 
    }],
    category: 'Masala Oil',
    subcategory: 'Oil',
    brand: 'Fortune',
    stock: 100,
    unit: 'l',
    quantity: 1,
    tags: ['oil', 'sunflower', 'fortune', 'cooking', 'refined']
  },
  {
    name: 'MDH Deggi Mirch (100g)',
    description: 'Adds bright red color and mild heat to dishes. Premium quality red chilli powder.',
    price: 95,
    mrp: 110,
    images: [{ 
      url: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/155a.jpg' 
    }],
    category: 'Masala Oil',
    subcategory: 'Masala',
    brand: 'MDH',
    stock: 130,
    unit: 'g',
    quantity: 100,
    tags: ['masala', 'mirch', 'mdh', 'chilli', 'spices']
  }
];

const seedProducts = async () => {
  try {
    // Delete existing products
    await Product.deleteMany();
    console.log('🗑️  Existing products deleted');
    
    // Insert new products
    const result = await Product.insertMany(products);
    console.log('✅ Sample products added successfully!');
    console.log(`📦 Total products: ${result.length}`);
    
    // Show category wise count
    const categories = {};
    result.forEach(p => {
      categories[p.category] = (categories[p.category] || 0) + 1;
    });
    
    console.log('\n📊 Category-wise breakdown:');
    Object.entries(categories).forEach(([cat, count]) => {
      console.log(`   ${cat}: ${count} products`);
    });
    
    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();