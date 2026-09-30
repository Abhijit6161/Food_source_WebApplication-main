const User = require('../models/User');
const Food = require('../models/Food');
const Category = require('../models/Category');
const Cart = require('../models/Cart');
const Order = require('../models/Order');

const seedCategories = [
  {
    name: 'Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Burger',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Sandwich',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Biryani & Rice',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Pasta',
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281270?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Sushi & Asian',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Desserts',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Beverages',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=600&q=80'
  }
];

const seedFoods = [
  {
    name: 'Classic Margherita Wood-Fired Pizza',
    description: 'Fresh San Marzano tomato sauce, buffalo mozzarella, fresh basil, and extra virgin olive oil on a charred sourdough crust.',
    price: 12.99,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    available: true
  },
  {
    name: 'Spicy Pepperoni & Jalapeño Feast',
    description: 'Double cured pepperoni, sliced hot jalapeños, mozzarella cheese, and hot honey drizzle.',
    price: 14.50,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    available: true
  },
  {
    name: 'Truffle Mushroom & Cream Pizza',
    description: 'Wild forest mushrooms, black truffle oil, caramelized onions, fontina cheese, and fresh thyme.',
    price: 15.99,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    available: true
  },
  {
    name: 'Ultimate Angus Smash Cheeseburger',
    description: 'Two crispy-edged Angus beef patties, double American cheese, caramelized onions, and house secret burger sauce on a brioche bun.',
    price: 11.99,
    category: 'Burger',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    available: true
  },
  {
    name: 'Crispy Buffalo Chicken Burger',
    description: 'Buttermilk fried chicken breast tossed in spicy buffalo sauce, blue cheese dressing, and crunchy slaw on a toasted bun.',
    price: 10.99,
    category: 'Burger',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    available: true
  },
  {
    name: 'Smokey BBQ Bacon Double Burger',
    description: 'Double beef patties, crispy smoked bacon, onion rings, sharp cheddar, and hickory BBQ sauce.',
    price: 13.49,
    category: 'Burger',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    available: true
  },
  {
    name: 'Artisanal Club Sandwich',
    description: 'Triple-decker toasted sourdough with smoked turkey breast, crispy bacon, avocado, lettuce, tomato, and herb mayo.',
    price: 9.99,
    category: 'Sandwich',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80',
    rating: 4.6,
    available: true
  },
  {
    name: 'Caprese Pesto Panini',
    description: 'Fresh mozzarella, ripe tomatoes, basil pesto, and balsamic glaze pressed between artisan ciabatta bread.',
    price: 8.99,
    category: 'Sandwich',
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=600&q=80',
    rating: 4.5,
    available: true
  },
  {
    name: 'Hyderabadi Dum Chicken Biryani',
    description: 'Slow-cooked fragrant basmati rice layered with marinated chicken, saffron, aromatic spices, served with raita.',
    price: 13.99,
    category: 'Biryani & Rice',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    available: true
  },
  {
    name: 'Royal Paneer Tikka Biryani',
    description: 'Char-grilled cottage cheese cubes cooked in spicy tikka gravy and tossed with saffron rice.',
    price: 11.99,
    category: 'Biryani & Rice',
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    available: true
  },
  {
    name: 'Creamy Fettuccine Alfredo with Chicken',
    description: 'Fresh egg fettuccine tossed in rich Parmesan cream sauce topped with grilled chicken breast and garlic bread.',
    price: 12.49,
    category: 'Pasta',
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281270?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    available: true
  },
  {
    name: 'Spaghetti Bolognese Supreme',
    description: 'Classic slow-simmered beef ragù served over al dente spaghetti with freshly grated Parmigiano-Reggiano.',
    price: 11.99,
    category: 'Pasta',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    available: true
  },
  {
    name: 'Dragon Salmon Roll (8 pcs)',
    description: 'Fresh Atlantic salmon, avocado, cucumber topped with spicy mayo and toasted sesame seeds.',
    price: 15.99,
    category: 'Sushi & Asian',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    available: true
  },
  {
    name: 'Molten Chocolate Lava Cake',
    description: 'Warm chocolate cake with a gooey molten chocolate center served with vanilla bean ice cream.',
    price: 6.99,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    available: true
  },
  {
    name: 'Classic New York Cheesecake',
    description: 'Rich and creamy baked cheesecake with a graham cracker crust and fresh strawberry compote.',
    price: 7.49,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    available: true
  },
  {
    name: 'Signature Iced Caramel Macchiato',
    description: 'Espresso poured over chilled milk, ice, and rich vanilla syrup, topped with sweet caramel drizzle.',
    price: 4.99,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    available: true
  },
  {
    name: 'Fresh Mango Passionfruit Smoothie',
    description: 'Blended Alphonso mangoes, passionfruit pulp, Greek yogurt, and honey.',
    price: 5.49,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    available: true
  }
];

const seedDatabase = async () => {
  try {
    await User.deleteMany({});
    await Food.deleteMany({});
    await Category.deleteMany({});
    await Cart.deleteMany({});
    await Order.deleteMany({});

    await User.create({
      name: 'System Admin',
      email: 'admin@foodsource.com',
      password: 'adminpassword123',
      role: 'admin'
    });

    await User.create({
      name: 'Abhijit More',
      email: 'user@foodsource.com',
      password: 'userpassword123',
      role: 'user'
    });

    await Category.insertMany(seedCategories);
    await Food.insertMany(seedFoods);
  } catch (error) {
    console.error('Error seeding helper data:', error.message);
  }
};

module.exports = seedDatabase;
