import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Trash2, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';

const Cart = () => {
  const {
    cartItems,
    totalPrice,
    updateQuantity,
    removeFromCart,
    clearCart
  } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        <h2 className="text-center">Your Shopping Cart</h2>
        <div className="heading-border"></div>

        {cartItems.length === 0 ? (
          <div className="text-center" style={{ padding: '60px 20px', background: '#fff', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <ShoppingBag size={64} color="#ccc" style={{ marginBottom: '20px' }} />
            <h3>Your Cart is Currently Empty</h3>
            <p className="text-muted" style={{ margin: '10px 0 25px 0' }}>
              Explore our menu and discover delicious food items to satisfy your cravings!
            </p>
            <Link to="/menu" className="btn-primary" style={{ padding: '10px 25px' }}>
              Explore Food Menu
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
            {/* Cart Items Table */}
            <div>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Food Item</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item._id}>
                      <td style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img
                          src={item.image || '/img/food/p1.jpg'}
                          alt={item.name}
                          className="table-img"
                          onError={(e) => { e.target.src = '/img/food/p1.jpg'; }}
                        />
                        <span style={{ fontWeight: '500' }}>{item.name}</span>
                      </td>
                      <td>${item.price.toFixed(2)}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            className="btn-outline"
                            style={{ padding: '2px 8px', fontSize: '12px' }}
                          >
                            -
                          </button>
                          <span style={{ fontWeight: '600', padding: '0 6px' }}>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            className="btn-outline"
                            style={{ padding: '2px 8px', fontSize: '12px' }}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td style={{ fontWeight: '600', color: '#e24a4a' }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="btn-delete"
                          title="Remove Item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
                <Link to="/menu" className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <ArrowLeft size={16} /> Continue Shopping
                </Link>
                <button onClick={clearCart} className="btn-delete" style={{ padding: '8px 16px' }}>
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Order Summary Box */}
            <div>
              <div
                style={{
                  background: '#fff',
                  padding: '25px',
                  borderRadius: '12px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                  border: '1px solid #eee'
                }}
              >
                <h3 style={{ fontSize: '20px', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '12px' }}>
                  Order Summary
                </h3>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: '#666' }}>
                  <span>Items Subtotal:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: '#666' }}>
                  <span>Delivery Charge:</span>
                  <span style={{ color: '#2ecc71', fontWeight: '500' }}>FREE</span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    margin: '20px 0',
                    paddingTop: '15px',
                    borderTop: '2px dashed #eee',
                    fontWeight: '700',
                    fontSize: '18px'
                  }}
                >
                  <span>Grand Total:</span>
                  <span style={{ color: '#e24a4a' }}>${totalPrice.toFixed(2)}</span>
                </div>

                <button
                  onClick={() => navigate('/checkout')}
                  className="btn-primary"
                  style={{ width: '100%', padding: '12px', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  Proceed to Checkout <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
