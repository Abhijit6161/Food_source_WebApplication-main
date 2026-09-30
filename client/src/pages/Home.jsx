import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import SearchBar from '../components/SearchBar';
import CategoryCard from '../components/CategoryCard';
import FoodCard from '../components/FoodCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Truck, ShieldCheck, Clock, Award, ArrowRight } from 'lucide-react';

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
        setFoods(foodRes.data.slice(0, 6)); // Display top 6 featured foods on home
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
      {/* Modern Hero Search */}
      <SearchBar />

      {/* Explore Categories Section */}
      <section className="categories-section">
        <div className="container">
          <h2 className="text-center" style={{ fontSize: '28px', fontWeight: '800' }}>Explore Popular Categories</h2>
          <div className="heading-border"></div>

          {loading ? (
            <LoadingSpinner message="Loading categories..." />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : categories.length === 0 ? (
            <p className="text-center text-muted">No categories available.</p>
          ) : (
            <div className="category-grid">
              {categories.map((cat) => (
                <CategoryCard key={cat._id} category={cat} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Promotional Offers Grid */}
      <section className="promo-banners">
        <div className="container promo-grid">
          <div className="promo-card">
            <div>
              <span className="promo-badge">SPECIAL DISCOUNT</span>
              <div className="promo-title">Flat 50% OFF</div>
              <div className="promo-sub">Use Code: FOOD50 on your first 3 orders</div>
            </div>
            <Link to="/menu" style={{ color: '#fff', fontSize: '13px', fontWeight: '700', marginTop: '15px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              Claim Offer <ArrowRight size={14} />
            </Link>
          </div>

          <div className="promo-card">
            <div>
              <span className="promo-badge">WEEKEND SPECIAL</span>
              <div className="promo-title">Buy 1 Get 1 Free</div>
              <div className="promo-sub">On all gourmet sourdough pizzas</div>
            </div>
            <Link to="/category/Pizza" style={{ color: '#fff', fontSize: '13px', fontWeight: '700', marginTop: '15px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              Order Pizza <ArrowRight size={14} />
            </Link>
          </div>

          <div className="promo-card">
            <div>
              <span className="promo-badge">SUPER FAST</span>
              <div className="promo-title">20-Min Delivery</div>
              <div className="promo-sub">Hot meals delivered straight from local kitchens</div>
            </div>
            <Link to="/menu" style={{ color: '#fff', fontSize: '13px', fontWeight: '700', marginTop: '15px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              Explore Menu <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Food Menu Section */}
      <section className="food-section">
        <div className="container">
          <h2 className="text-center" style={{ fontSize: '28px', fontWeight: '800' }}>Chef Recommended & Trending Dishes</h2>
          <div className="heading-border"></div>

          {loading ? (
            <LoadingSpinner message="Loading delicious foods..." />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : foods.length === 0 ? (
            <p className="text-center text-muted">No foods found in menu.</p>
          ) : (
            <div className="grid-3">
              {foods.map((food) => (
                <FoodCard key={food._id} food={food} />
              ))}
            </div>
          )}

          <div style={{ marginTop: '45px' }} className="text-center">
            <Link to="/menu" className="btn-primary" style={{ padding: '14px 36px', fontSize: '16px' }}>
              View Complete Menu ({foods.length}+ Dishes) <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose FoodSource Section */}
      <section className="features-section">
        <div className="container grid-4">
          <div className="feature-box">
            <div className="feature-icon">
              <Truck size={28} />
            </div>
            <h4 className="feature-title">Free & Fast Delivery</h4>
            <p className="feature-desc">Delivered piping hot to your doorstep in under 30 minutes guaranteed.</p>
          </div>

          <div className="feature-box">
            <div className="feature-icon">
              <ShieldCheck size={28} />
            </div>
            <h4 className="feature-title">100% Quality & Hygiene</h4>
            <p className="feature-desc">Strict quality checks & tamper-evident packaging for safety.</p>
          </div>

          <div className="feature-box">
            <div className="feature-icon">
              <Clock size={28} />
            </div>
            <h4 className="feature-title">Live Order Tracking</h4>
            <p className="feature-desc">Real-time status updates from kitchen preparation to delivery.</p>
          </div>

          <div className="feature-box">
            <div className="feature-icon">
              <Award size={28} />
            </div>
            <h4 className="feature-title">Best Price Offer</h4>
            <p className="feature-desc">Unbeatable prices and daily discount deals on all your favorites.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
