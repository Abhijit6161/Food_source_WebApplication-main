import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Star, ShoppingBag, Clock, Flame } from 'lucide-react';

const FoodCard = ({ food }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(food, quantity);
  };

  return (
    <div className="food-card-modern">
      <div className="food-card-img-container">
        <Link to={`/food/${food._id}`}>
          <img
            src={food.image}
            alt={food.name}
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';
            }}
          />
        </Link>
        <div className="food-card-tag">
          <Flame size={12} color="#ff385c" style={{ display: 'inline', marginRight: '3px' }} />
          Bestseller
        </div>
        <div className="food-card-rating">
          <Star size={13} fill="#ffb400" color="#ffb400" />
          <span>{food.rating || '4.8'}</span>
        </div>
      </div>

      <div className="food-card-body">
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="food-card-category">{food.category}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#636e72' }}>
              <Clock size={12} />
              <span>20-30 min</span>
            </div>
          </div>

          <Link to={`/food/${food._id}`}>
            <h3 className="food-card-title">{food.name}</h3>
          </Link>

          <p className="food-card-desc">
            {food.description.length > 80
              ? `${food.description.substring(0, 80)}...`
              : food.description}
          </p>
        </div>

        <div className="food-card-footer">
          <div className="food-card-price">${food.price.toFixed(2)}</div>

          {food.available !== false ? (
            <div className="food-card-actions">
              <input
                type="number"
                min="1"
                max="20"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="qty-input"
              />
              <button onClick={handleAddToCart} className="btn-primary" style={{ padding: '8px 16px', fontSize: '13px' }}>
                <ShoppingBag size={15} /> Add
              </button>
            </div>
          ) : (
            <span style={{ color: '#e74c3c', fontWeight: '600', fontSize: '13px' }}>
              Out of Stock
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
