import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  return (
    <Link to={`/category/${encodeURIComponent(category.name)}`}>
      <div className="category-item-card">
        <div className="category-img-wrapper">
          <img
            src={category.image}
            alt={category.name}
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80';
            }}
          />
        </div>
        <div className="category-name">{category.name}</div>
      </div>
    </Link>
  );
};

export default CategoryCard;
