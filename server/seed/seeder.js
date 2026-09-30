const mongoose = require('mongoose');
const dotenv = require('dotenv');
const seedDatabase = require('./seedHelper');

dotenv.config({ path: '../.env' });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/foodsource';

const importData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected for Seeding...');

    await seedDatabase();

    console.log('✅ Database Seeding Completed Successfully with 40 Food Items (5 per Category across 8 Categories)!');
    process.exit(0);
  } catch (error) {
    console.error(`Error during seeding: ${error.message}`);
    process.exit(1);
  }
};

importData();
