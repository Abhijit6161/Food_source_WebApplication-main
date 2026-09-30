import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Star, ShoppingCart } from 'lucide-react';

const FoodCard = ({ food }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(food, quantity);
  };

  return (
    <div className="food-menu-box">
      <div className="food-menu-img">
        <Link to={`/food/${food._id}`}>
          <img
            src={food.image || '/img/food/p1.jpg'}
            alt={food.name}
            className="img-responsive img-curve"
            onError={(e) => { e.target.src = '/img/food/p1.jpg'; }}
          />
        </Link>
      </div>

      <div className="food-menu-desc">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to={`/food/${food._id}`}>
            <h4>{food.name}</h4>
          </Link>
          <span style={{ fontSize: '12px', background: '#f1f2f6', padding: '2px 8px', borderRadius: '10px', color: '#57606f', fontWeight: '500' }}>
            {food.category}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '4px 0' }}>
          <p className="food-price">${food.price.toFixed(2)}</p>
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '13px', color: '#ffa502', fontWeight: '600' }}>
            <Star size={14} fill="#ffa502" style={{ marginRight: '2px' }} />
            {food.rating || '4.5'}
          </div>
        </div>

        <p className="food-details">
          {food.description.length > 70
            ? `${food.description.substring(0, 70)}...`
            : food.description}
        </p>

        {food.available !== false ? (
          <div className="food-actions">
            <input
              type="number"
              min="1"
              max="20"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="qty-input"
            />
            <button onClick={handleAddToCart} className="btn-primary" style={{ fontSize: '14px', padding: '8px 16px' }}>
              <ShoppingCart size={16} /> Add To Cart
            </button>
          </div>
        ) : (
          <div style={{ color: '#ff4d4d', fontWeight: '600', fontSize: '14px', marginTop: '10px' }}>
            Currently Unavailable
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodCard;
