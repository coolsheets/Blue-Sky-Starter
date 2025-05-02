const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

// === CONFIGURATION ===
const uri = 'YOUR_ATLAS_CONNECTION_STRING'; // Replace with your Atlas connection string
const dbName = 'YOUR_DATABASE_NAME';         // Replace with your database name
const jsonDir = './collection-cleanup-json'; // Folder containing your JSON files

// === FUNCTION TO CLEAN COLLECTION ===
async function cleanCollection(collectionName, deleteCriteriaArray, db) {
  for (const criteria of deleteCriteriaArray) {
    const result = await db.collection(collectionName).deleteMany(criteria);
    console.log(`Deleted ${result.deletedCount} record(s) from '${collectionName}' where`, criteria);
  }
}

// === MAIN SCRIPT ===
async function main() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);

    const files = fs.readdirSync(jsonDir).filter(f => f.endsWith('.json'));
    for (const file of files) {
      const collectionName = path.basename(file, '.json');
      const filePath = path.join(jsonDir, file);
      const criteriaArray = JSON.parse(fs.readFileSync(filePath));
      console.log(`\nCleaning '${collectionName}' using '${file}'...`);
      await cleanCollection(collectionName, criteriaArray, db);
    }

    console.log('\n✅ MongoDB cleanup completed.');
  } catch (err) {
    console.error('❌ Error during cleanup:', err);
  } finally {
    await client.close();
  }
}

main();
