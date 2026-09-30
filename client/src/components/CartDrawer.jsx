import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { X, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';

const CartDrawer = () => {
  const {
    cartItems,
    totalPrice,
    removeFromCart,
    isDrawerOpen,
    setIsDrawerOpen
  } = useContext(CartContext);

  if (!isDrawerOpen) return null;

  return (
    <>
      <div className="cart-drawer-backdrop" onClick={() => setIsDrawerOpen(false)} />
      <div className="cart-drawer">
        <div className="cart-drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingCart size={22} color="#6c5ce7" />
            <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Your Shopping Cart</h3>
          </div>
          <button
            onClick={() => setIsDrawerOpen(false)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
          >
            <X size={22} />
          </button>
        </div>

        <div className="cart-drawer-body">
          {cartItems.length === 0 ? (
            <div className="text-center" style={{ padding: '40px 10px', color: '#888' }}>
              <ShoppingCart size={48} style={{ opacity: 0.3, marginBottom: '15px' }} />
              <p>Your cart is currently empty.</p>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="btn-outline"
                style={{ marginTop: '15px' }}
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: '12px',
                    borderBottom: '1px solid #f0f0f0'
                  }}
                >
                  <img
                    src={item.image || '/img/food/p1.jpg'}
                    alt={item.name}
                    style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }}
                    onError={(e) => { e.target.src = '/img/food/p1.jpg'; }}
                  />
                  <div style={{ flex: 1, padding: '0 12px' }}>
                    <h5 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '2px' }}>{item.name}</h5>
                    <p style={{ fontSize: '13px', color: '#666' }}>
                      {item.quantity} x ${item.price.toFixed(2)} = ${(item.quantity * item.price).toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', padding: '4px' }}
                    title="Remove Item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-drawer-footer">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontWeight: '600', fontSize: '16px' }}>
              <span>Total Amount:</span>
              <span style={{ color: '#e24a4a' }}>${totalPrice.toFixed(2)}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link
                to="/checkout"
                onClick={() => setIsDrawerOpen(false)}
                className="btn-primary"
                style={{ width: '100%', textAlign: 'center' }}
              >
                Proceed to Checkout <ArrowRight size={16} />
              </Link>
              <Link
                to="/cart"
                onClick={() => setIsDrawerOpen(false)}
                className="btn-outline"
                style={{ width: '100%', textAlign: 'center' }}
              >
                View Full Cart
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
