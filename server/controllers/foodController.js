const Food = require('../models/Food');

// @desc    Get all foods (supports search, category filter, availability)
// @route   GET /api/foods
// @access  Public
const getFoods = async (req, res) => {
  try {
    const { keyword, category, available } = req.query;
    let query = {};

    if (keyword) {
      query.name = { $regex: keyword, $options: 'i' };
    }

    if (category && category !== 'All') {
      query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }

    if (available !== undefined) {
      query.available = available === 'true';
    }

    const foods = await Food.find(query).sort({ createdAt: -1 });
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single food by ID
// @route   GET /api/foods/:id
// @access  Public
const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (food) {
      res.json(food);
    } else {
      res.status(404).json({ message: 'Food item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new food item
// @route   POST /api/foods
// @access  Private/Admin
const createFood = async (req, res) => {
  try {
    const { name, description, price, category, image, available } = req.body;

    if (!name || !description || price === undefined || !category || !image) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const food = new Food({
      name,
      description,
      price: Number(price),
      category,
      image,
      available: available !== undefined ? available : true
    });

    const createdFood = await food.save();
    res.status(201).json(createdFood);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a food item
// @route   PUT /api/foods/:id
// @access  Private/Admin
const updateFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (food) {
      food.name = req.body.name || food.name;
      food.description = req.body.description || food.description;
      food.price = req.body.price !== undefined ? Number(req.body.price) : food.price;
      food.category = req.body.category || food.category;
      food.image = req.body.image || food.image;
      if (req.body.available !== undefined) {
        food.available = req.body.available;
      }

      const updatedFood = await food.save();
      res.json(updatedFood);
    } else {
      res.status(404).json({ message: 'Food item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a food item
// @route   DELETE /api/foods/:id
// @access  Private/Admin
const deleteFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (food) {
      await food.deleteOne();
      res.json({ message: 'Food item removed successfully' });
    } else {
      res.status(404).json({ message: 'Food item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood
};
