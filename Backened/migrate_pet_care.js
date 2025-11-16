// migrate_pet_care.js - Pet Care Products Migration
// Save in Backend folder and run: node migrate_pet_care.js

require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/jagatstore')
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

const petCareProducts = [
  { name: "Pedigree Adult Dog Dry Food (Chicken and Vegetables)", weight: "1kg", price: 232, oldPrice: 249, discount: "7% OFF", category: "Pet Care", brand: "Pedigree", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=450/da/cms-assets/cms/product/0a27b202-9f8e-4374-b0cd-b5d013d801f1.png", inStock: true, description: "Complete nutrition for adult dogs" },
  { name: "Pedigree Adult Dog Dry Food (Chicken and Vegetables)", weight: "2.8kg", price: 610, oldPrice: 655, discount: "7% OFF", category: "Pet Care", brand: "Pedigree", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/da/cms-assets/cms/product/0a27b202-9f8e-4374-b0cd-b5d013d801f1.png", inStock: true, description: "Large pack adult dog food" },
  { name: "Pedigree Puppy Dog Dry Food (Chicken and Milk)", weight: "1 kg", price: 270, oldPrice: 290, discount: "7% OFF", category: "Pet Care", brand: "Pedigree", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/5fd12876-6de4-46eb-a53a-e17887b2a6a5.png", inStock: true, description: "Complete nutrition for puppies" },
  { name: "Drools Adult (Chicken and Vegetables)", weight: "3kg", price: 605, oldPrice: 650, discount: "7% OFF", category: "Pet Care", brand: "Drools", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/9d4592ce-fcf8-4438-b0c7-4fa7c1a59141.png", inStock: true, description: "Premium adult dog food" },
  { name: "Pedigree Adult Wet Food (Chicken & Liver)", weight: "70g (30pcs)", price: 1350, oldPrice: 1500, discount: "10% OFF", category: "Pet Care", brand: "Pedigree", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/da/cms-assets/cms/product/7269b332-e28f-4dcc-8fd2-f9de5eb55214.png", inStock: true, description: "Wet food pouches pack" },
  { name: "Pedigree Adult (Chicken and Vegetables)", weight: "370 g", price: 105, oldPrice: 110, discount: "5% OFF", category: "Pet Care", brand: "Pedigree", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/da/cms-assets/cms/product/0a27b202-9f8e-4374-b0cd-b5d013d801f1.png", inStock: true, description: "Small pack dry food" },
  { name: "Whiskas Adult Dry Cat Food- Ocean Fish Flavour", weight: "480g", price: 190, oldPrice: 200, discount: "5% OFF", category: "Pet Care", brand: "Whiskas", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/71e3a9df-dd5d-437e-8ef5-3d702d2b5078.png", inStock: true, description: "Delicious ocean fish cat food" },
  { name: "Whiskas Kitten Dry Cat Food", weight: "480g", price: 195, oldPrice: 205, discount: "5% OFF", category: "Pet Care", brand: "Whiskas", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/b8a70e1c-2e3b-423e-8c7e-0e2a0b8e5e5e.png", inStock: true, description: "Complete nutrition for kittens" },
  { name: "Drools Puppy (Chicken & Egg)", weight: "1.2kg", price: 280, oldPrice: 310, discount: "10% OFF", category: "Pet Care", brand: "Drools", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/abc123def456.png", inStock: true, description: "Nutritious puppy food" },
  { name: "Pedigree Dentastix", weight: "Pack of 7", price: 120, category: "Pet Care", brand: "Pedigree", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/dentastix123.png", inStock: true, description: "Dental treats for dogs" },
  { name: "Whiskas Cat Treats", weight: "60g", price: 85, category: "Pet Care", brand: "Whiskas", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/cat-treats-456.png", inStock: true, description: "Tasty cat treats" },
  { name: "Dog Shampoo", weight: "200ml", price: 150, category: "Pet Care", brand: "Drools", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/shampoo789.png", inStock: true, description: "Gentle pet shampoo" },
  { name: "Cat Litter", weight: "5kg", price: 450, oldPrice: 500, discount: "10% OFF", category: "Pet Care", brand: "Whiskas", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/litter123.png", inStock: true, description: "Odor control cat litter" },
  { name: "Dog Collar", weight: "1 piece", price: 199, category: "Pet Care", brand: "Generic", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/collar456.png", inStock: true, description: "Adjustable dog collar" },
  { name: "Pet Bowl Set", weight: "2 pieces", price: 299, category: "Pet Care", brand: "Generic", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/bowl789.png", inStock: true, description: "Stainless steel pet bowls" },
];

const migrate = async () => {
  try {
    console.log('\n🐾 Migrating Pet Care Products...\n');
    let added = 0, skipped = 0;
    for (const p of petCareProducts) {
      const exists = await Product.findOne({ name: p.name, weight: p.weight, category: "Pet Care" });
      if (exists) { console.log(`⏭️  ${p.name}`); skipped++; }
      else { await Product.create({ ...p, stock: p.inStock ? 50 : 0 }); console.log(`✅ ${p.name} - ₹${p.price}`); added++; }
    }
    console.log(`\n✅ Done! Added: ${added}, Skipped: ${skipped}`);
    console.log(`📦 Total: ${await Product.countDocuments({ category: "Pet Care" })}\n`);
    process.exit(0);
  } catch (err) { console.error('❌ Error:', err); process.exit(1); }
};

migrate();