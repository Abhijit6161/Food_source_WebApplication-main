import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';
import ErrorMessage from '../components/ErrorMessage';
import { CheckCircle2, Truck, ShieldCheck } from 'lucide-react';

const Checkout = () => {
  const { cartItems, totalPrice, clearCart, showToast } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      setError('Your cart is empty');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const orderPayload = {
        items: cartItems.map((item) => ({
          food: item.foodId || item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        deliveryAddress: formData,
        paymentMethod: 'Cash on Delivery'
      };

      const { data } = await API.post('/orders', orderPayload);

      await clearCart();
      showToast('Order placed successfully!');
      navigate('/orders');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container text-center" style={{ padding: '60px 0' }}>
        <h3>No items in cart to checkout</h3>
        <button onClick={() => navigate('/menu')} className="btn-primary" style={{ marginTop: '15px' }}>
          Back to Menu
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        <h2 className="text-center">Checkout & Place Order</h2>
        <div className="heading-border"></div>

        {error && <ErrorMessage message={error} />}

        <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '30px' }}>
          {/* Delivery Form */}
          <div
            style={{
              background: '#fff',
              padding: '30px',
              borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.06)'
            }}
          >
            <h3 style={{ fontSize: '20px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Truck size={20} color="#e24a4a" /> Delivery & Contact Details
            </h3>

            <form onSubmit={handlePlaceOrder}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Enter full name"
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Enter contact number"
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Delivery Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows="3"
                  placeholder="Street address, apartment, building"
                  className="form-control"
                ></textarea>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    placeholder="Enter city"
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label>Pincode / Postal Code</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    required
                    placeholder="Enter pincode"
                    className="form-control"
                  />
                </div>
              </div>

              <div style={{ marginTop: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '8px', border: '1px solid #eee' }}>
                <h4 style={{ fontSize: '16px', marginBottom: '8px', color: '#2f3542' }}>Payment Method</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input type="radio" checked readOnly id="cod" />
                  <label htmlFor="cod" style={{ fontWeight: '600', cursor: 'pointer' }}>
                    Cash on Delivery (COD)
                  </label>
                </div>
                <p style={{ fontSize: '13px', color: '#777', marginTop: '4px' }}>
                  Pay cash directly to the delivery partner when your order arrives.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{ width: '100%', padding: '14px', marginTop: '25px', fontSize: '16px' }}
              >
                {loading ? 'Processing Order...' : `Confirm & Place Order ($${totalPrice.toFixed(2)})`}
              </button>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <div
              style={{
                background: '#fff',
                padding: '25px',
                borderRadius: '12px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.06)'
              }}
            >
              <h3 style={{ fontSize: '18px', marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                Items Summary ({cartItems.length})
              </h3>

              <div style={{ maxHeight: '280px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '5px' }}>
                {cartItems.map((item) => (
                  <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px' }}>
                    <div>
                      <span style={{ fontWeight: '500' }}>{item.name}</span>
                      <span style={{ color: '#888', display: 'block', fontSize: '12px' }}>Qty: {item.quantity}</span>
                    </div>
                    <span style={{ fontWeight: '600' }}>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid #eee', marginTop: '15px', paddingTop: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Subtotal:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: '#2ecc71', fontWeight: '500' }}>
                  <span>Delivery Fee:</span>
                  <span>FREE</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: '700', color: '#e24a4a', paddingTop: '10px', borderTop: '2px dashed #eee' }}>
                  <span>Total Pay:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '20px', color: '#57606f', fontSize: '13px' }}>
                <ShieldCheck size={18} color="#2ecc71" /> 100% Safe & Hygienic Delivery Guarantee
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
