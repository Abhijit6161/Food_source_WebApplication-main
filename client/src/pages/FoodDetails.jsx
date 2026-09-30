import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';
import { CartContext } from '../context/CartContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Star, ShoppingCart, ArrowLeft, Clock, ShieldCheck } from 'lucide-react';

const FoodDetails = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        setLoading(true);
        const { data } = await API.get(`/foods/${id}`);
        setFood(data);
      } catch (err) {
        setError('Food item not found or unavailable.');
      } finally {
        setLoading(false);
      }
    };
    fetchFoodDetails();
  }, [id]);

  if (loading) return <LoadingSpinner message="Loading item details..." />;
  if (error || !food) return <ErrorMessage message={error || 'Food not found'} />;

  return (
    <div style={{ padding: '50px 0' }}>
      <div className="container">
        <Link to="/menu" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '30px' }}>
          <ArrowLeft size={16} /> Back to Full Menu
        </Link>

        <div
          style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '30px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '40px',
            alignItems: 'center'
          }}
        >
          <div>
            <img
              src={food.image || '/img/food/p1.jpg'}
              alt={food.name}
              style={{ width: '100%', maxHeight: '380px', objectFit: 'cover', borderRadius: '12px' }}
              onError={(e) => { e.target.src = '/img/food/p1.jpg'; }}
            />
          </div>

          <div>
            <span
              style={{
                background: '#f1f2f6',
                color: '#57606f',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: '600'
              }}
            >
              {food.category}
            </span>

            <h1 style={{ fontSize: '32px', margin: '15px 0 10px 0', color: '#2f3542' }}>{food.name}</h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
              <span style={{ fontSize: '28px', fontWeight: '700', color: '#e24a4a' }}>
                ${food.price.toFixed(2)}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#ffa502', fontWeight: '600' }}>
                <Star size={18} fill="#ffa502" />
                <span>{food.rating || '4.5'}</span>
              </div>
            </div>

            <p style={{ color: '#636e72', lineHeight: '1.7', fontSize: '15px', marginBottom: '25px' }}>
              {food.description}
            </p>

            <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', color: '#666', fontSize: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={16} color="#e24a4a" /> 25-35 mins delivery
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={16} color="#2ecc71" /> Fresh & Hygienic
              </div>
            </div>

            {food.available !== false ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <label style={{ fontWeight: '500' }}>Quantity:</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="qty-input"
                    style={{ padding: '8px', width: '70px', fontSize: '16px' }}
                  />
                </div>

                <button
                  onClick={() => addToCart(food, quantity)}
                  className="btn-primary"
                  style={{ padding: '12px 28px', fontSize: '16px' }}
                >
                  <ShoppingCart size={18} /> Add to Cart (${(food.price * quantity).toFixed(2)})
                </button>
              </div>
            ) : (
              <div style={{ color: '#ff4d4d', fontWeight: '600', fontSize: '16px' }}>
                Currently Out of Stock
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
