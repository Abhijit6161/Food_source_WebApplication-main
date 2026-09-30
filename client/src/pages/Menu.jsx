import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import API from '../services/api';
import FoodCard from '../components/FoodCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Search, SlidersHorizontal } from 'lucide-react';

const Menu = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'All';

  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [sortBy, setSortBy] = useState('default');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchFoods();
  }, [activeCategory, searchTerm]);

  const fetchCategories = async () => {
    try {
      const { data } = await API.get('/categories');
      setCategories(data);
    } catch (err) {
      console.error('Failed to load categories');
    }
  };

  const fetchFoods = async () => {
    try {
      setLoading(true);
      const params = {};
      if (activeCategory !== 'All') params.category = activeCategory;
      if (searchTerm.trim()) params.keyword = searchTerm.trim();

      const { data } = await API.get('/foods', { params });
      setFoods(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch foods. Please check network connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (catName) => {
    setActiveCategory(catName);
    if (catName === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catName);
    }
    setSearchParams(searchParams);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      searchParams.set('search', searchTerm.trim());
    } else {
      searchParams.delete('search');
    }
    setSearchParams(searchParams);
  };

  const getSortedFoods = () => {
    let sorted = [...foods];
    if (sortBy === 'price-low') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    return sorted;
  };

  const sortedFoods = getSortedFoods();

  return (
    <div style={{ padding: '40px 0 80px 0' }}>
      <div className="container">
        <h2 className="text-center" style={{ fontSize: '32px', fontWeight: '800' }}>Explore Our Complete Menu</h2>
        <div className="heading-border"></div>

        {/* Search & Sort Header Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '30px',
            flexWrap: 'wrap',
            gap: '15px'
          }}
        >
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '10px', flex: 1, maxWidth: '450px' }}>
            <input
              type="text"
              placeholder="Search for pizza, burgers, sushi, biryani..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control"
              style={{ borderRadius: 'var(--radius-full)' }}
            />
            <button type="submit" className="btn-primary" style={{ padding: '10px 22px' }}>
              <Search size={16} /> Search
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <SlidersHorizontal size={18} color="#636e72" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-control"
              style={{ width: 'auto', padding: '8px 16px', borderRadius: 'var(--radius-full)', fontWeight: '600' }}
            >
              <option value="default">Sort by Recommended</option>
              <option value="rating">Top Rated ⭐</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills Bar */}
        <div className="filter-pills-bar">
          <button
            onClick={() => handleCategoryClick('All')}
            className={`pill-btn ${activeCategory === 'All' ? 'active' : ''}`}
          >
            All Items ({foods.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => handleCategoryClick(cat.name)}
              className={`pill-btn ${activeCategory === cat.name ? 'active' : ''}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Food Grid */}
        {loading ? (
          <LoadingSpinner message="Fetching food catalog..." />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : sortedFoods.length === 0 ? (
          <div className="text-center" style={{ padding: '60px 0', background: '#fff', borderRadius: '16px' }}>
            <h3>No food items match your criteria</h3>
            <p className="text-muted" style={{ marginTop: '10px' }}>
              Try searching with another keyword or select a different category.
            </p>
          </div>
        ) : (
          <div className="grid-3">
            {sortedFoods.map((food) => (
              <FoodCard key={food._id} food={food} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
