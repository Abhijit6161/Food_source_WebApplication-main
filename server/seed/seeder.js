const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Food = require('../models/Food');
const Category = require('../models/Category');
const Cart = require('../models/Cart');
const Order = require('../models/Order');

dotenv.config({ path: '../.env' });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/foodsource';

const seedCategories = [
  {
    name: 'Pizza',
    image: '/img/category/pizza.jpg'
  },
  {
    name: 'Sandwich',
    image: '/img/category/sandwich.jpg'
  },
  {
    name: 'Burger',
    image: '/img/category/burger.jpg'
  }
];

const seedFoods = [
  {
    name: 'Italian Cheese Pizza',
    description: 'Freshly baked pizza loaded with authentic mozzarella cheese, basil, and signature tomato sauce.',
    price: 8.99,
    category: 'Pizza',
    image: '/img/food/p1.jpg',
    rating: 4.8,
    available: true
  },
  {
    name: 'Club Sandwich Supreme',
    description: 'Crispy toasted multi-grain bread stuffed with fresh veggies, herbs, and garlic spread.',
    price: 6.50,
    category: 'Sandwich',
    image: '/img/food/s1.jpg',
    rating: 4.6,
    available: true
  },
  {
    name: 'Double Patty Cheeseburger',
    description: 'Juicy grilled patties layered with cheddar cheese, lettuce, onion, and secret sauce.',
    price: 7.99,
    category: 'Burger',
    image: '/img/food/b1.jpg',
    rating: 4.7,
    available: true
  },
  {
    name: 'Pepperoni Delight Pizza',
    description: 'Classic wood-fired thin crust pizza topped with spicy pepperoni and herbs.',
    price: 9.99,
    category: 'Pizza',
    image: '/img/food/p1.jpg',
    rating: 4.9,
    available: true
  },
  {
    name: 'Grilled Veggie Sandwich',
    description: 'Panini grilled sandwich packed with bell peppers, zucchini, and mint pesto.',
    price: 5.99,
    category: 'Sandwich',
    image: '/img/food/s1.jpg',
    rating: 4.4,
    available: true
  },
  {
    name: 'Crispy Chicken Burger',
    description: 'Golden crispy chicken breast with jalapeños, mayo, and lettuce on a sesame bun.',
    price: 8.49,
    category: 'Burger',
    image: '/img/food/b1.jpg',
    rating: 4.8,
    available: true
  }
];

const importData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected for Seeding...');

    // Clear existing data
    await User.deleteMany();
    await Food.deleteMany();
    await Category.deleteMany();
    await Cart.deleteMany();
    await Order.deleteMany();

    console.log('Cleared existing data.');

    // Seed Admin and Regular User
    const adminUser = await User.create({
      name: 'System Admin',
      email: 'admin@foodsource.com',
      password: 'adminpassword123',
      role: 'admin'
    });

    const regularUser = await User.create({
      name: 'Abhijit More',
      email: 'user@foodsource.com',
      password: 'userpassword123',
      role: 'user'
    });

    console.log(`Created Users: Admin (${adminUser.email}), User (${regularUser.email})`);

    // Seed Categories
    await Category.insertMany(seedCategories);
    console.log('Seeded Categories.');

    // Seed Foods
    await Food.insertMany(seedFoods);
    console.log('Seeded Food Items.');

    console.log('✅ Database Seeding Completed Successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`Error during seeding: ${error.message}`);
    process.exit(1);
  }
};

importData();
