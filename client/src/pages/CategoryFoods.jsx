import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';
import FoodCard from '../components/FoodCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { ArrowLeft } from 'lucide-react';

const CategoryFoods = () => {
  const { categoryName } = useParams();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryFoods = async () => {
      try {
        setLoading(true);
        const { data } = await API.get(`/foods?category=${encodeURIComponent(categoryName)}`);
        setFoods(data);
      } catch (err) {
        setError('Failed to fetch foods for this category.');
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryFoods();
  }, [categoryName]);

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <h2 className="text-center">{categoryName} Selection</h2>
        <div className="heading-border"></div>

        {loading ? (
          <LoadingSpinner message={`Loading ${categoryName} items...`} />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : foods.length === 0 ? (
          <div className="text-center" style={{ padding: '60px 0' }}>
            <h3>No foods available in category: {categoryName}</h3>
            <Link to="/menu" className="btn-primary" style={{ marginTop: '20px' }}>
              View All Foods
            </Link>
          </div>
        ) : (
          <div className="grid-2">
            {foods.map((food) => (
              <FoodCard key={food._id} food={food} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryFoods;
