import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Sparkles, Clock, ShieldCheck } from 'lucide-react';

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

  const handleQuickTagClick = (tag) => {
    navigate(`/menu?search=${encodeURIComponent(tag)}`);
  };

  return (
    <section className="hero-section">
      <div className="container hero-content">
        <div className="hero-badges">
          <span className="hero-pill">
            <Sparkles size={14} color="#ffb400" style={{ display: 'inline', marginRight: '4px' }} />
            50% OFF First Order
          </span>
          <span className="hero-pill">
            <Clock size={14} color="#00b894" style={{ display: 'inline', marginRight: '4px' }} />
            Average 25 Min Delivery
          </span>
          <span className="hero-pill">
            <ShieldCheck size={14} color="#6c5ce7" style={{ display: 'inline', marginRight: '4px' }} />
            100% Hygienic Guarantee
          </span>
        </div>

        <h1 className="hero-title">
          Hungry? Order <span>Delicious Food</span> Right to Your Doorstep
        </h1>

        <p className="hero-subtitle">
          Explore top-rated restaurants, wood-fired pizzas, gourmet burgers, sushi & fresh beverages.
        </p>

        <form onSubmit={handleSearch} className="hero-search-box">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', paddingLeft: '14px', borderRight: '1px solid #eee', color: '#636e72', fontSize: '14px' }}>
            <MapPin size={18} color="#ff385c" />
            <span style={{ fontWeight: '500', whiteSpace: 'nowrap' }}>Deliver to Home</span>
          </div>

          <input
            type="search"
            placeholder="Search pizza, burger, biryani, pasta, sushi..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />

          <button type="submit" className="btn-primary" style={{ padding: '12px 28px' }}>
            <Search size={18} /> Search
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '20px', flexWrap: 'wrap', fontSize: '13px', color: '#b2bec3' }}>
          <span>Popular searches:</span>
          {['Pizza', 'Burger', 'Biryani', 'Pasta', 'Sushi', 'Desserts'].map((tag) => (
            <button
              key={tag}
              onClick={() => handleQuickTagClick(tag)}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#fff',
                padding: '3px 12px',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchBar;
