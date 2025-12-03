// migrate_home_offices_FIXED.js
// Run: node migrate_home_offices_FIXED.js

require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

const productSchema = new mongoose.Schema({}, { strict: false });
const Product = mongoose.model('Product', productSchema);

// ========== HOME & OFFICES PRODUCTS ==========
const homeOfficesProducts = [

  // GOOD KNIGHT REFILL & MACHINE
  {
    name: 'Good Knight Activ+ Refill',
    weight: '45ml',
    price: 72,
    oldPrice: 86,
    discount: '16% OFF',
   category: 'Home and Offices',
    brand: 'Good Knight',
    image: 'https://tse1.mm.bing.net/th/id/OIP.DoVgIW4TZ71U3HxjNlM3ugHaHa?pid=Api&P=0&h=180',
    inStock: true,
    description: 'Good Knight Activ+ | Liquid Mosquito Refill | 60 Nights | 45ml',
    stock: 150
  },
  {
    name: 'Good Knight Activ+ Machine + Refill Combo',
    weight: '1 Set',
    price: 95,
    oldPrice: 115,
    discount: '17% OFF',
     category: 'Home and Offices',
    brand: 'Good Knight',
    image: 'https://tse4.mm.bing.net/th/id/OIP.eTMi6kBG3xtanqqMkw8pHgHaHa?pid=Api&P=0&h=180',
    inStock: true,
    description: 'Good Knight Activ+ | Machine + Refill Combo | Mosquito Repellent',
    stock: 80
  },

  // ALL OUT REFILL & MACHINE
  {
    name: 'All Out Ultra Refill',
    weight: '45ml',
    price: 72,
    oldPrice: 86,
    discount: '16% OFF',
    category: 'Home and Offices',
    brand: 'All Out',
    image: 'https://tse4.mm.bing.net/th/id/OIP.4LUCOn981OQ9rGloWMMP_wHaHa?pid=Api&P=0&h=180',
    inStock: true,
    description: 'All Out Ultra | Liquid Mosquito Refill | 60 Nights | 45ml',
    stock: 140
  },
  {
    name: 'All Out Ultra Machine + Refill Combo',
    weight: '1 Set',
    price: 95,
    oldPrice: 115,
    discount: '17% OFF',
    category: 'Home and Offices',
    brand: 'All Out',
    image: 'https://tse4.mm.bing.net/th/id/OIP.gezZT1XeniDqoP7Ii_rpiwHaHa?pid=Api&P=0&h=180',
    inStock: true,
    description: 'All Out Ultra | Machine + Refill Combo | Mosquito Repellent',
    stock: 75
  },

  // MAXO REFILL & MACHINE
  {
    name: 'Maxo A Grade Refill',
    weight: '45ml',
    price: 65,
    oldPrice: 78,
    discount: '17% OFF',
    category: 'Home and Offices',
    brand: 'Maxo',
    image: 'https://tse3.mm.bing.net/th/id/OIP.0fTWeA9OzpN1BPI43yrDnQHaHa?pid=Api&P=0&h=180',
    inStock: true,
    description: 'Maxo A Grade | Liquid Mosquito Refill | 60 Nights | 45ml',
    stock: 120
  },
  {
    name: 'Maxo Machine + Refill Combo',
    weight: '1 Set',
    price: 85,
    oldPrice: 102,
    discount: '17% OFF',
    category: 'Home and Offices',
    brand: 'Maxo',
    image: 'https://tse3.mm.bing.net/th/id/OIP.Kab8R_KQK_hLmDYjFqdvSQAAAA?pid=Api&P=0&h=180',
    inStock: true,
    description: 'Maxo A Grade | Machine + Refill Combo | Mosquito Repellent',
    stock: 70
  },

  // AGARBATTI (INCENSE STICKS)
  {
    name: 'Good Knight Neem Agarbatti',
    weight: '12 Sticks',
    price: 25,
    oldPrice: 30,
    discount: '17% OFF',
    category: 'Home and Offices',
    brand: 'Good Knight',
    image: 'https://tse4.mm.bing.net/th/id/OIP.pGl5hgsJz961eaR-KJtqsgAAAA?pid=Api&P=0&h=180',
    inStock: true,
    description: 'Good Knight Neem | Mosquito Repellent Agarbatti | 12 Sticks',
    stock: 180
  },
  {
    name: 'Comfort Mosquito Repellent Agarbatti',
    weight: '20 Sticks',
    price: 22,
    oldPrice: 26,
    discount: '15% OFF',
    category: 'Home and Offices',
    brand: 'Comfort',
    image: 'https://5.imimg.com/data5/IOS/Default/2023/9/340900702/GU/XB/OB/45700625/product-jpeg-1000x1000.png',
    inStock: true,
    description: 'Comfort | Mosquito Repellent Agarbatti | Herbal | 20 Sticks',
    stock: 160
  },

  // MOSQUITO COILS
  {
    name: 'Good Knight Neem Power Coil',
    weight: '10 Coils',
    price: 55,
    oldPrice: 66,
    discount: '17% OFF',
    category: 'Home and Offices',
    brand: 'Good Knight',
    image: 'https://tse3.mm.bing.net/th/id/OIP._gUHuuoiBHhtBpjssoa8HAHaHa?pid=Api&P=0&h=180',
    inStock: true,
    description: 'Good Knight Neem Power | Mosquito Coil | 10 Coils Pack',
    stock: 130
  },
  {
    name: 'Mortein Mosquito Coil',
    weight: '10 Coils',
    price: 52,
    oldPrice: 62,
    discount: '16% OFF',
    category: 'Home and Offices',
    brand: 'Mortein',
    image: 'https://tse1.mm.bing.net/th/id/OIP.HLxnsG2KcNgNXoxsXNzaoQHaHa?pid=Api&P=0&h=180',
    inStock: true,
    description: 'Mortein Peaceful Nights | Mosquito Coil | 10 Coils Pack',
    stock: 140
  },

  // HIT BLACK (MOSQUITO & FLY KILLER)
  {
    name: 'Hit Black Mosquito & Fly Killer (400ml)',
    weight: '400ml',
    price: 265,
    oldPrice: 320,
    discount: '17% OFF',
    category: 'Home and Offices',
    brand: 'Hit',
    image: 'https://tse1.mm.bing.net/th/id/OIP.cjs6qPxjlKLh7wpY54tTUQHaHa?pid=Api&P=0&h=180',
    inStock: true,
    description: 'Hit Black | Mosquito & Fly Killer Spray | Medium | 400ml',
    stock: 90
  },
  {
    name: 'Hit Black Mosquito & Fly Killer (625ml)',
    weight: '625ml',
    price: 385,
    oldPrice: 465,
    discount: '17% OFF',
    category: 'Home and Offices',
    brand: 'Hit',
    image: 'https://tse3.mm.bing.net/th/id/OIP.CFMI8NJ4AkSrliovXXs24AHaHa?pid=Api&P=0&h=180',
    inStock: true,
    description: 'Hit Black | Mosquito & Fly Killer Spray | Big | 625ml',
    stock: 60
  },

  // HIT RED (COCKROACH & CRAWLING INSECT)
  {
    name: 'Hit Red Crawling Insect Killer (400ml)',
    weight: '400ml',
    price: 265,
    oldPrice: 320,
    discount: '17% OFF',
    category: 'Home and Offices',
    brand: 'Hit',
    image: 'https://tse4.mm.bing.net/th/id/OIP.ayCy0o97YkncqWp6GCn8fgAAAA?pid=Api&P=0&h=180',
    inStock: true,
    description: 'Hit Red | Crawling Insect Killer Spray | Medium | 400ml',
    stock: 80
  },
  {
    name: 'Hit Red Crawling Insect Killer (625ml)',
    weight: '625ml',
    price: 385,
    oldPrice: 465,
    discount: '17% OFF',
    category: 'Home and Offices',
    brand: 'Hit',
    image: 'https://tse3.mm.bing.net/th/id/OIP.XH_JEH8iP8Mnrh_yAC55mAHaHa?pid=Api&P=0&h=180',
    inStock: true,
    description: 'Hit Red | Crawling Insect Killer Spray | Big | 625ml',
    stock: 55
  },

  // HIT ANTI ROACH GEL
  {
    name: 'Hit Anti Roach Gel',
    weight: '20g',
    price: 125,
    oldPrice: 150,
    discount: '17% OFF',
    category: 'Home and Offices',
    brand: 'Hit',
    image: 'https://tse4.mm.bing.net/th/id/OIP.WTOVkEPwp1foDdSEP3CYWQHaF6?pid=Api&P=0&h=180',
    inStock: true,
    description: 'Hit Anti Roach Gel | Cockroach Killer | Syringe Injection | 20g',
    stock: 90
  },

  // PCI RAT GLUE TRAP
  {
    name: 'PCI Rat Glue Trap Small',
    weight: '1 Pc',
    price: 35,
    oldPrice: 42,
    discount: '17% OFF',
    category: 'Home and Offices',
    brand: 'PCI',
    image: 'https://tse1.mm.bing.net/th/id/OIP.QFdwFo0Z-l6CDVI5B8ZuOQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'PCI Rat Glue Trap | Mouse Catcher | Small Size | Non-Toxic',
    stock: 150
  },
  {
    name: 'PCI Rat Glue Trap Big',
    weight: '1 Pc',
    price: 65,
    oldPrice: 78,
    discount: '17% OFF',
    category: 'Home & Office',
    brand: 'PCI',
    image: 'https://tse2.mm.bing.net/th/id/OIP.ZiBVYA-XpU-yHVAzEM20JQHaHa?pid=Api&H=160&W=160',
    inStock: true,
    description: 'PCI Rat Glue Trap | Mouse Catcher | Big Size | Non-Toxic',
    stock: 100
  },

  // PCI RAT KILLER
  {
    name: 'PCI Rat Killer Cake',
    weight: '50g',
    price: 45,
    oldPrice: 55,
    discount: '18% OFF',
   category: 'Home and Offices',
    brand: 'PCI',
    image: 'https://tse1.mm.bing.net/th/id/OIP.UbxdKTWmFkPRQv79j502XgHaEl?pid=Api&H=98&W=160',
    inStock: true,
    description: 'PCI Roban Rat Killer | Rodent Control | Cake | 50g',
    stock: 140
  },




  // ============ NOVA KNIVES & KITCHEN TOOLS ============
{
    name: 'Nova Spectrum Plain Knife',
    weight: '1 Piece',
    price: 85,
    oldPrice: 99,
    discount: '14% OFF',
    category: 'Home and Offices',
    brand: 'Nova',
    image: 'https://tse1.mm.bing.net/th/id/OIP.mTPr3gPlpkmsWIzbUyIrPAAAAA?pid=Api&H=213&W=160',
    inStock: true,
    description: 'Nova Spectrum Plain Knife | Stainless Steel | Sharp Blade | Comfortable Grip | 1 Piece',
    stock: 100
},
{
    name: 'Nova Spectrum Utility Knife',
    weight: '1 Piece',
    price: 95,
    oldPrice: 110,
    discount: '14% OFF',
    category: 'Home and Offices',
    brand: 'Nova',
    image: '	https://tse2.mm.bing.net/th/id/OIP.0LbWV61pU6uih53CkiQyDQHaC8?pid=Api&H=63&W=160',
    inStock: true,
    description: 'Nova Spectrum Utility Knife | Multi-Purpose | Stainless Steel Blade | 1 Piece',
    stock: 100
},
{
    name: 'Nova Spectrum Regular Peeler',
    weight: '1 Piece',
    price: 55,
    oldPrice: 65,
    discount: '15% OFF',
    category: 'Home and Offices',
    brand: 'Nova',
    image: 'https://tse1.mm.bing.net/th/id/OIP.pNxrgggzmvHl7nBibbLwXQHaDU?pid=Api&H=71&W=160',
    inStock: true,
    description: 'Nova Spectrum Regular Peeler | Sharp Blade | Easy Grip Handle | 1 Piece',
    stock: 100
},
// ============ NOVA LIGHTER ============
{
    name: 'Nova Gas Lighter - Regular',
    weight: '1 Piece',
    price: 45,
    oldPrice: 55,
    discount: '18% OFF',
    category: 'Home and Offices',
    brand: 'Nova',
    image: 'https://tse2.mm.bing.net/th/id/OIP.NwqYtdkIpVv2ifNnyDq-oQAAAA?pid=Api&H=213&W=160',
    inStock: true,
    description: 'Nova Gas Lighter Regular | Refillable | Easy Ignition | Kitchen Essential | 1 Piece',
    stock: 100
},


];

// ========== SMART MIGRATION FUNCTION ==========
const smartMigrate = async () => {
  try {
    console.log('\n🏠 Starting Smart Migration for Home & Offices...\n');
    console.log('━'.repeat(60));
    
    let added = 0, updated = 0, unchanged = 0;
    
    // Get existing products
    const existingProducts = await Product.find({ category: 'Home and Offices' });
    
    // Create map for quick lookup
    const existingMap = new Map();
    existingProducts.forEach(product => {
      if (product && product.name) {
        const key = `${product.name}_${product.weight || ''}`;
        existingMap.set(key, product);
      }
    });
    
    const sourceProductKeys = new Set();
    
    // Process each product
    for (const productData of homeOfficesProducts) {
      if (!productData || !productData.name) {
        console.log('⚠️  Skipped invalid product data');
        continue;
      }

      const key = `${productData.name}_${productData.weight || ''}`;
      sourceProductKeys.add(key);
      
      const existingProduct = existingMap.get(key);
      
      if (!existingProduct) {
        await Product.create(productData);
        console.log(`✅ ADDED: ${productData.name} (${productData.weight}) - ₹${productData.price}`);
        added++;
      } else {
        const needsUpdate = 
          existingProduct.price !== productData.price ||
          existingProduct.oldPrice !== productData.oldPrice ||
          existingProduct.discount !== productData.discount ||
          existingProduct.image !== productData.image;
        
        if (needsUpdate) {
          await Product.findByIdAndUpdate(existingProduct._id, productData);
          console.log(`🔄 UPDATED: ${productData.name} (${productData.weight}) - ₹${productData.price}`);
          updated++;
        } else {
          console.log(`⏭️  UNCHANGED: ${productData.name} (${productData.weight})`);
          unchanged++;
        }
      }
    }
    
    // Count total
    const totalCount = await Product.countDocuments({ category: 'Home & Office' });
    
    console.log('\n' + '━'.repeat(60));
    console.log('\n📊 MIGRATION SUMMARY:');
    console.log(`   ✅ Added: ${added}`);
    console.log(`   🔄 Updated: ${updated}`);
    console.log(`   ⏭️  Unchanged: ${unchanged}`);
    console.log(`   📦 Total "Home & Offices" products: ${totalCount}`);
    console.log('\n✅ Migration Complete!\n');
    
    mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Migration Error:', err);
    mongoose.disconnect();
    process.exit(1);
  }
};

smartMigrate();