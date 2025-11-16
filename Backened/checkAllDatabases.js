// checkAllDatabases.js - Check ALL databases and users
// Place in Backend and run: node checkAllDatabases.js

const mongoose = require('mongoose');

const checkAllDatabases = async () => {
  try {
    console.log('═══════════════════════════════════');
    console.log('🔍 CHECKING ALL DATABASES');
    console.log('═══════════════════════════════════\n');

    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017');
    console.log('✅ Connected to MongoDB\n');

    // Get admin database
    const adminDb = mongoose.connection.db.admin();
    
    // List all databases
    const { databases } = await adminDb.listDatabases();
    
    console.log('📊 FOUND DATABASES:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━');
    databases.forEach((db, index) => {
      console.log(`${index + 1}. ${db.name} (Size: ${(db.sizeOnDisk / 1024).toFixed(2)} KB)`);
    });
    console.log('\n');

    // Check each database for users collection
    for (const dbInfo of databases) {
      const dbName = dbInfo.name;
      
      // Skip system databases
      if (dbName === 'admin' || dbName === 'config' || dbName === 'local') {
        continue;
      }

      console.log(`🔍 Checking database: ${dbName}`);
      console.log('─────────────────────────────────');

      const db = mongoose.connection.useDb(dbName);
      
      // Check if users collection exists
      const collections = await db.db.listCollections().toArray();
      const hasUsers = collections.some(c => c.name === 'users');

      if (hasUsers) {
        console.log('   ✅ Has "users" collection');
        
        // Get users from this database
        const User = db.model('User', new mongoose.Schema({}, { strict: false }), 'users');
        const users = await User.find({});
        
        console.log(`   👥 Found ${users.length} user(s):\n`);
        
        users.forEach((user, index) => {
          console.log(`   User ${index + 1}:`);
          console.log(`      📧 Email: ${user.email}`);
          console.log(`      👤 Name: ${user.name}`);
          console.log(`      🎯 Role: ${user.role || 'not set'}`);
          console.log(`      🔐 Has Password: ${user.password ? 'YES' : 'NO'}`);
          console.log('');
        });
      } else {
        console.log('   ❌ No "users" collection');
      }
      console.log('');
    }

    console.log('═══════════════════════════════════');
    console.log('💡 WHAT TO DO NEXT:');
    console.log('═══════════════════════════════════');
    console.log('1. Check which database your Backend is using');
    console.log('2. Check Backend/server.js or .env file');
    console.log('3. Look for MONGO_URI or database connection');
    console.log('4. Make sure it matches one of the databases above\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

checkAllDatabases();