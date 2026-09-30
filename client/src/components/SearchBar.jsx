import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const SearchBar = ({ initialQuery = '' }) => {
  const [keyword, setKeyword] = useState(initialQuery);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/menu?search=${encodeURIComponent(keyword.trim())}`);
    } else {
      navigate('/menu');
    }
  };

  return (
    <section className="food-search">
      <div className="container">
        <h1 className="text-white">Discover & Order Delicious Meals</h1>
        <p style={{ color: '#eee', marginBottom: '25px', fontSize: '16px' }}>
          Fresh ingredients, hot deliveries, delivered right to your home.
        </p>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="search"
            placeholder="Search for pizza, burger, sandwich..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary">
            <Search size={18} /> Search
          </button>
        </form>
      </div>
    </section>
  );
};

export default SearchBar;
