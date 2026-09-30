const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a food name'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Please add a description']
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
      min: [0, 'Price must be positive']
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
      trim: true
    },
    image: {
      type: String,
      required: [true, 'Please add an image URL/path']
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5
    },
    available: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Food', foodSchema);
