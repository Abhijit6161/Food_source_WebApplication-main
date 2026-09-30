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
  // 🍕 PIZZA (5 Items)
  {
    name: 'Classic Margherita Wood-Fired Pizza',
    description: 'Fresh San Marzano tomato sauce, buffalo mozzarella, fresh basil, and extra virgin olive oil.',
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
    name: 'BBQ Smoky Chicken & Bacon Pizza',
    description: 'Tender grilled BBQ chicken breast, crispy bacon, red onions, cilantro, and smoked mozzarella.',
    price: 14.99,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    available: true
  },
  {
    name: 'Four Cheese Supreme Pizza (Quattro Formaggi)',
    description: 'Decadent mix of Gorgonzola, Parmesan, Fontina, and Mozzarella cheeses on a crispy thin crust.',
    price: 13.99,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    rating: 4.6,
    available: true
  },

  // 🍔 BURGER (5 Items)
  {
    name: 'Ultimate Angus Smash Cheeseburger',
    description: 'Two crispy-edged Angus beef patties, double American cheese, caramelized onions, and house secret sauce.',
    price: 11.99,
    category: 'Burger',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    available: true
  },
  {
    name: 'Crispy Buffalo Chicken Burger',
    description: 'Buttermilk fried chicken breast tossed in spicy buffalo sauce, blue cheese dressing, and crunchy slaw.',
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
    name: 'Truffle Mushroom Swiss Burger',
    description: 'Sautéed garlic mushrooms, melted Swiss cheese, truffle aioli, and arugula on a toasted brioche bun.',
    price: 12.99,
    category: 'Burger',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    available: true
  },
  {
    name: 'Veggie Black Bean & Avocado Burger',
    description: 'House-made spiced black bean patty, fresh avocado, pepper jack cheese, Chipotle mayo, and crisp lettuce.',
    price: 9.99,
    category: 'Burger',
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=600&q=80',
    rating: 4.5,
    available: true
  },

  // 🥪 SANDWICH (5 Items)
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
    name: 'Philly Cheesesteak Melt',
    description: 'Thinly sliced ribeye steak, caramelized onions, green peppers, and melted provolone on a toasted hoagie roll.',
    price: 11.49,
    category: 'Sandwich',
    image: 'https://images.unsplash.com/photo-1621800043295-a73f2f78cecf?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    available: true
  },
  {
    name: 'Spicy Chipotle Grilled Chicken Sub',
    description: 'Grilled chicken strips, melted cheddar cheese, chipotle aioli, crispy bacon, and pickled jalapeños.',
    price: 10.49,
    category: 'Sandwich',
    image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    available: true
  },
  {
    name: 'Classic Grilled Cheese & Tomato Soup Dip',
    description: 'Thick cut sourdough with melted sharp cheddar and Gruyère cheese, served with a cup of tomato basil soup.',
    price: 8.49,
    category: 'Sandwich',
    image: 'https://images.unsplash.com/photo-1528736235302-52922df5c122?auto=format&fit=crop&w=600&q=80',
    rating: 4.6,
    available: true
  },

  // 🍚 BIRYANI & RICE (5 Items)
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
    name: 'Boneless Mutton Mughlai Biryani',
    description: 'Tender mutton chunks marinated in royal Mughlai spices cooked in slow-steam dum basmati rice.',
    price: 15.99,
    category: 'Biryani & Rice',
    image: 'https://images.unsplash.com/photo-1642821373181-696a54913e93?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    available: true
  },
  {
    name: 'Special Veg Dum Biryani with Salan',
    description: 'Fresh garden vegetables, fried cashews, mint, and basmati rice simmered in earthenware pot.',
    price: 10.99,
    category: 'Biryani & Rice',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
    rating: 4.6,
    available: true
  },
  {
    name: 'Butter Chicken Rice Bowl',
    description: 'Creamy tomato butter chicken curry served over a bed of steaming hot garlic butter basmati rice.',
    price: 12.49,
    category: 'Biryani & Rice',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    available: true
  },

  // 🍝 PASTA (5 Items)
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
    name: 'Penne Arrabbiata with Garlic Toast',
    description: 'Penne pasta tossed in spicy red chili tomato garlic sauce, fresh basil, and extra virgin olive oil.',
    price: 10.99,
    category: 'Pasta',
    image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=600&q=80',
    rating: 4.5,
    available: true
  },
  {
    name: 'Creamy Pesto Prawns Linguine',
    description: 'Succulent sauteed prawns tossed with basil pesto, cherry tomatoes, and pine nuts over linguine.',
    price: 14.99,
    category: 'Pasta',
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    available: true
  },
  {
    name: 'Four Cheese Baked Lasagna',
    description: 'Layers of lasagna pasta sheet, rich meat sauce, ricotta, mozzarella, and Parmesan baked golden brown.',
    price: 13.49,
    category: 'Pasta',
    image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    available: true
  },

  // 🍣 SUSHI & ASIAN (5 Items)
  {
    name: 'Dragon Salmon Roll (8 pcs)',
    description: 'Fresh Atlantic salmon, avocado, cucumber topped with spicy mayo, unagi sauce, and toasted sesame seeds.',
    price: 15.99,
    category: 'Sushi & Asian',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    available: true
  },
  {
    name: 'Crunchy Tempura Shrimp Roll (8 pcs)',
    description: 'Crispy fried shrimp tempura, crab meat, and cucumber rolled with tobiko caviar and sweet soy glaze.',
    price: 14.99,
    category: 'Sushi & Asian',
    image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    available: true
  },
  {
    name: 'Japanese Shoyu Chicken Ramen',
    description: 'Rich pork & chicken soy broth, tender chashu chicken, soft-boiled egg, bamboo shoots, and fresh ramen noodles.',
    price: 13.49,
    category: 'Sushi & Asian',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    available: true
  },
  {
    name: 'Thai Spicy Pad Thai Noodles',
    description: 'Wok-tossed rice noodles with prawns, tofu, egg, bean sprouts, crushed peanuts, and fresh lime.',
    price: 12.99,
    category: 'Sushi & Asian',
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    available: true
  },
  {
    name: 'Steamed Chicken Dim Sum (6 pcs)',
    description: 'Handcrafted delicate dumplings stuffed with minced chicken, ginger, and scallions served with chili oil dip.',
    price: 9.99,
    category: 'Sushi & Asian',
    image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    available: true
  },

  // 🍰 DESSERTS (5 Items)
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
    name: 'Italian Tiramisu Espresso Cake',
    description: 'Layers of espresso-soaked ladyfingers, velvety mascarpone cream, and cocoa powder dusting.',
    price: 6.49,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    available: true
  },
  {
    name: 'Warm Apple Cinnamon Crumble',
    description: 'Caramelized honey crisp apples baked with oat cinnamon crumble, topped with caramel drizzled ice cream.',
    price: 5.99,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?auto=format&fit=crop&w=600&q=80',
    rating: 4.6,
    available: true
  },
  {
    name: 'Assorted Macaron Box (6 pcs)',
    description: 'Delicate French almond macarons in Pistachio, Raspberry, Salted Caramel, Chocolate, Mango, and Vanilla.',
    price: 8.99,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    available: true
  },

  // 🥤 BEVERAGES (5 Items)
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
  },
  {
    name: 'Refreshing Virgin Mint Mojito',
    description: 'Muddled fresh mint leaves, lime juice, sparkling soda, crushed ice, and cane sugar.',
    price: 4.49,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
    rating: 4.6,
    available: true
  },
  {
    name: 'Triple Chocolate Milkshake',
    description: 'Decadent blend of Belgian chocolate ice cream, whole milk, whipped cream, and chocolate fudge.',
    price: 5.99,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    available: true
  },
  {
    name: 'Japanese Iced Matcha Green Tea Latte',
    description: 'Premium ceremonial grade Uji matcha whisked with oat milk and served over ice.',
    price: 5.29,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80',
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
