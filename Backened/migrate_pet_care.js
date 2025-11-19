// migrate_pet_care_IMPROVED.js - Smart Migration with Add/Update/Delete
// Save in Backend folder and run: node migrate_pet_care_IMPROVED.js

require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI || "mongodb+srv://rythemaggarwal7840:Rythem7840@cluster0.obezyro.mongodb.net/?appName=Cluster0")
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  stock: { type: Number, default: 50 },
  brand: { type: String, default: 'Generic' },
  rating: { type: Number, default: 4.0 },
  reviews: { type: Array, default: [] },
  weight: { type: String, default: '' },
  oldPrice: { type: Number },
  discount: { type: String },
  inStock: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

// ========== PET CARE PRODUCTS ==========
// ADD/EDIT/DELETE products here and run the script
const petCareProducts = [
  // DOG FOOD - DRY
  { 
    name: "Pedigree Adult Dog Dry Food (Chicken and Vegetables)", 
    weight: "1kg", 
    price: 232, 
    oldPrice: 249, 
    discount: "7% OFF", 
    category: "Pet Care", 
    brand: "Pedigree", 
    image: "https://m.media-amazon.com/images/I/71z6FZKrjaL._SL1500_.jpg", 
    inStock: true, 
    description: "Complete nutrition for adult dogs",
    stock: 50
  },
  { 
    name: "Pedigree Adult Dog Dry Food (Chicken and Vegetables)", 
    weight: "2.8kg", 
    price: 610, 
    oldPrice: 655, 
    discount: "7% OFF", 
    category: "Pet Care", 
    brand: "Pedigree", 
    image: "https://m.media-amazon.com/images/I/71cOUZ5r5nL._SL1500_.jpg", 
    inStock: true, 
    description: "Large pack adult dog food",
    stock: 50
  },
  { 
    name: "Pedigree Adult Dog Dry Food (Chicken and Vegetables)", 
    weight: "370g", 
    price: 105, 
    oldPrice: 110, 
    discount: "5% OFF", 
    category: "Pet Care", 
    brand: "Pedigree", 
    image: "https://m.media-amazon.com/images/I/81eWZVaZl6L._SL1500_.jpg", 
    inStock: true, 
    description: "Small pack dry food",
    stock: 50
  },
  { 
    name: "Pedigree Puppy Dog Dry Food (Chicken and Milk)", 
    weight: "1kg", 
    price: 270, 
    oldPrice: 290, 
    discount: "7% OFF", 
    category: "Pet Care", 
    brand: "Pedigree", 
    image: "https://m.media-amazon.com/images/I/81OkQZ+SzwL._SL1500_.jpg", 
    inStock: true, 
    description: "Complete nutrition for puppies",
    stock: 50
  },
  { 
    name: "Drools Adult Dog Food (Chicken and Vegetables)", 
    weight: "3kg", 
    price: 605, 
    oldPrice: 650, 
    discount: "7% OFF", 
    category: "Pet Care", 
    brand: "Drools", 
    image: "https://m.media-amazon.com/images/I/71QWvqVMIDL._SL1500_.jpg", 
    inStock: true, 
    description: "Premium adult dog food",
    stock: 50
  },
  { 
    name: "Drools Puppy Dog Food (Chicken & Egg)", 
    weight: "1.2kg", 
    price: 280, 
    oldPrice: 310, 
    discount: "10% OFF", 
    category: "Pet Care", 
    brand: "Drools", 
    image: "https://m.media-amazon.com/images/I/71xGwO1ULQL._SL1500_.jpg", 
    inStock: true, 
    description: "Nutritious puppy food",
    stock: 50
  },
  
  // DOG FOOD - WET
  { 
    name: "Pedigree Adult Wet Food (Chicken & Liver)", 
    weight: "70g (30pcs)", 
    price: 1350, 
    oldPrice: 1500, 
    discount: "10% OFF", 
    category: "Pet Care", 
    brand: "Pedigree", 
    image: "https://m.media-amazon.com/images/I/71YwZs4dkYL._SL1500_.jpg", 
    inStock: true, 
    description: "Wet food pouches pack",
    stock: 50
  },
  
  // CAT FOOD
  { 
    name: "Whiskas Adult Dry Cat Food - Ocean Fish", 
    weight: "480g", 
    price: 190, 
    oldPrice: 200, 
    discount: "5% OFF", 
    category: "Pet Care", 
    brand: "Whiskas", 
    image: "https://m.media-amazon.com/images/I/71pNW0JDHRL._SL1500_.jpg", 
    inStock: true, 
    description: "Delicious ocean fish cat food",
    stock: 50
  },
  { 
    name: "Whiskas Kitten Dry Cat Food", 
    weight: "480g", 
    price: 195, 
    oldPrice: 205, 
    discount: "5% OFF", 
    category: "Pet Care", 
    brand: "Whiskas", 
    image: "https://m.media-amazon.com/images/I/71zSWRdcvJL._SL1500_.jpg", 
    inStock: true, 
    description: "Complete nutrition for kittens",
    stock: 50
  },
  { 
    name: "Whiskas Cat Treats (Tuna)", 
    weight: "60g", 
    price: 85, 
    category: "Pet Care", 
    brand: "Whiskas", 
    image: "https://m.media-amazon.com/images/I/71l0PGt-6nL._SL1500_.jpg", 
    inStock: true, 
    description: "Tasty cat treats",
    stock: 50
  },
  
  // DOG TREATS & CARE
  { 
    name: "Pedigree Dentastix", 
    weight: "Pack of 7", 
    price: 120, 
    category: "Pet Care", 
    brand: "Pedigree", 
    image: "https://m.media-amazon.com/images/I/71UKJ+SaDAL._SL1500_.jpg", 
    inStock: true, 
    description: "Dental treats for dogs",
    stock: 50
  },
  { 
    name: "Dog Shampoo (Anti-Tick)", 
    weight: "200ml", 
    price: 150, 
    category: "Pet Care", 
    brand: "Drools", 
    image: "https://m.media-amazon.com/images/I/61EwC-xr5QL._SL1000_.jpg", 
    inStock: true, 
    description: "Gentle pet shampoo",
    stock: 50
  },
  
  // CAT CARE
  { 
    name: "Cat Litter (Odour Control)", 
    weight: "5kg", 
    price: 450, 
    oldPrice: 500, 
    discount: "10% OFF", 
    category: "Pet Care", 
    brand: "Whiskas", 
    image: "https://m.media-amazon.com/images/I/71wYDqLmT0L._SL1500_.jpg", 
    inStock: true, 
    description: "Odor control cat litter",
    stock: 50
  },
  
  // PET ACCESSORIES
  { 
    name: "Dog Collar (Adjustable)", 
    weight: "1 piece", 
    price: 199, 
    category: "Pet Care", 
    brand: "Generic", 
    image: "https://m.media-amazon.com/images/I/71qXJZgmBsL._SL1500_.jpg", 
    inStock: true, 
    description: "Adjustable dog collar",
    stock: 50
  },
  { 
    name: "Pet Bowl Set (Stainless Steel)", 
    weight: "2 pieces", 
    price: 299, 
    category: "Pet Care", 
    brand: "Generic", 
    image: "https://m.media-amazon.com/images/I/71VYjG8hPTL._SL1500_.jpg", 
    inStock: true, 
    description: "Stainless steel pet bowls",
    stock: 50
  },
];

// ========== SMART MIGRATION FUNCTION ==========
const smartMigrate = async () => {
  try {
    console.log('\n🐾 Starting Smart Migration for Pet Care Products...\n');
    console.log('━'.repeat(60));
    
    let added = 0, updated = 0, unchanged = 0;
    
    // Get all existing products in this category
    const existingProducts = await Product.find({ category: "Pet Care" });
    
    // Create a map of existing products for quick lookup
    const existingMap = new Map();
    existingProducts.forEach(product => {
      const key = `${product.name}_${product.weight}`;
      existingMap.set(key, product);
    });
    
    // Create a set of products from our source
    const sourceProductKeys = new Set();
    
    // Process each product from source
    for (const productData of petCareProducts) {
      const key = `${productData.name}_${productData.weight}`;
      sourceProductKeys.add(key);
      
      const existingProduct = existingMap.get(key);
      
      if (!existingProduct) {
        // ADD NEW PRODUCT
        await Product.create(productData);
        console.log(`✅ ADDED: ${productData.name} (${productData.weight}) - ₹${productData.price}`);
        added++;
      } else {
        // CHECK IF UPDATE NEEDED
        const needsUpdate = 
          existingProduct.price !== productData.price ||
          existingProduct.oldPrice !== productData.oldPrice ||
          existingProduct.discount !== productData.discount ||
          existingProduct.image !== productData.image ||
          existingProduct.description !== productData.description ||
          existingProduct.inStock !== productData.inStock ||
          existingProduct.stock !== productData.stock ||
          existingProduct.brand !== productData.brand;
        
        if (needsUpdate) {
          // UPDATE PRODUCT
          await Product.findByIdAndUpdate(existingProduct._id, productData);
          console.log(`🔄 UPDATED: ${productData.name} (${productData.weight}) - ₹${productData.price}`);
          updated++;
        } else {
          console.log(`⏭️  UNCHANGED: ${productData.name} (${productData.weight})`);
          unchanged++;
        }
      }
    }
    
    // DELETE products that are no longer in source
    console.log('\n' + '━'.repeat(60));
    console.log('🗑️  Checking for products to delete...\n');
    
    let deleted = 0;
    for (const existingProduct of existingProducts) {
      const key = `${existingProduct.name}_${existingProduct.weight}`;
      if (!sourceProductKeys.has(key)) {
        await Product.findByIdAndDelete(existingProduct._id);
        console.log(`❌ DELETED: ${existingProduct.name} (${existingProduct.weight})`);
        deleted++;
      }
    }
    
    // Summary
    console.log('\n' + '━'.repeat(60));
    console.log('\n📊 MIGRATION SUMMARY:');
    console.log(`   ✅ Added: ${added}`);
    console.log(`   🔄 Updated: ${updated}`);
    console.log(`   ⏭️  Unchanged: ${unchanged}`);
    console.log(`   ❌ Deleted: ${deleted}`);
    console.log(`   📦 Total in DB: ${await Product.countDocuments({ category: "Pet Care" })}`);
    console.log('\n✅ Migration Complete!\n');
    
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Migration Error:', err);
    process.exit(1);
  }
};

// Run migration
smartMigrate();