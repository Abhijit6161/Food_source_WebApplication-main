import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  return (
    <Link to={`/category/${encodeURIComponent(category.name)}`}>
      <div className="category-card">
        <img
          src={category.image || '/img/category/pizza.jpg'}
          alt={category.name}
          onError={(e) => { e.target.src = '/img/category/pizza.jpg'; }}
        />
        <h3 className="category-title">{category.name}</h3>
      </div>
    </Link>
  );
};

export default CategoryCard;
