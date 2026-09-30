import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import SearchBar from '../components/SearchBar';
import CategoryCard from '../components/CategoryCard';
import FoodCard from '../components/FoodCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [catRes, foodRes] = await Promise.all([
          API.get('/categories'),
          API.get('/foods')
        ]);
        setCategories(catRes.data);
        setFoods(foodRes.data.slice(0, 6)); // Display top 6 foods on home
      } catch (err) {
        setError('Failed to load menu items. Please check backend connection.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <SearchBar />

      {/* Explore Categories Section */}
      <section className="categories">
        <div className="container">
          <h2 className="text-center">Explore Categories</h2>
          <div className="heading-border"></div>

          {loading ? (
            <LoadingSpinner message="Loading categories..." />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : categories.length === 0 ? (
            <p className="text-center text-muted">No categories available.</p>
          ) : (
            <div className="grid-3">
              {categories.map((cat) => (
                <CategoryCard key={cat._id} category={cat} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Food Menu Section */}
      <section className="food-menu">
        <div className="container">
          <h2 className="text-center">Popular Food Menu</h2>
          <div className="heading-border"></div>

          {loading ? (
            <LoadingSpinner message="Loading delicious foods..." />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : foods.length === 0 ? (
            <p className="text-center text-muted">No foods found in menu.</p>
          ) : (
            <div className="grid-2">
              {foods.map((food) => (
                <FoodCard key={food._id} food={food} />
              ))}
            </div>
          )}

          <div style={{ marginTop: '40px' }} className="text-center">
            <Link to="/menu" className="btn-primary" style={{ padding: '12px 30px', fontSize: '16px' }}>
              See All Foods & Menu
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
