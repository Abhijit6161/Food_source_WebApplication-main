const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const seedDatabase = require('./seedHelper');

dotenv.config({ path: path.join(__dirname, '../.env') });

const MONGO_URI = process.env.MONGO_URI;

const importData = async () => {
  try {
    if (!MONGO_URI) {
      throw new Error('MONGO_URI environment variable is not defined in server/.env');
    }
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected for Seeding...');

    await seedDatabase();

    console.log('✅ Database Seeding Completed Successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`Error during seeding: ${error.message}`);
    process.exit(1);
  }
};

importData();
