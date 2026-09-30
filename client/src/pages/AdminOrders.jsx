import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { CartContext } from '../context/CartContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { ArrowLeft, User, Phone, MapPin, Calendar } from 'lucide-react';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { showToast } = useContext(CartContext);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await API.get('/admin/orders');
      setOrders(data);
    } catch (err) {
      setError('Failed to fetch admin orders');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await API.put(`/admin/orders/${orderId}/status`, { status: newStatus });
      showToast(`Updated order #${orderId.substring(0, 8)} status to ${newStatus}`);
      fetchOrders();
    } catch (err) {
      showToast('Failed to update order status', 'error');
    }
  };

  if (loading) return <LoadingSpinner message="Loading customer orders..." />;

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        <Link to="/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        <h2>Customer Orders Management</h2>
        <div className="heading-border" style={{ margin: '10px 0 30px 0' }}></div>

        {error && <ErrorMessage message={error} />}

        {orders.length === 0 ? (
          <p className="text-muted">No customer orders placed yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            {orders.map((order) => (
              <div
                key={order._id}
                style={{
                  background: '#fff',
                  borderRadius: '12px',
                  padding: '25px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
                  border: '1px solid #eee'
                }}
              >
                {/* Header */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid #eee',
                    paddingBottom: '15px',
                    marginBottom: '15px',
                    flexWrap: 'wrap',
                    gap: '10px'
                  }}
                >
                  <div>
                    <span style={{ fontSize: '12px', color: '#888' }}>Order Reference</span>
                    <h4 style={{ margin: 0, color: '#2f3542' }}>#{order._id}</h4>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#666' }}>
                    <Calendar size={14} />
                    <span>{new Date(order.createdAt).toLocaleString()}</span>
                  </div>

                  {/* Status Dropdown */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '500' }}>Status:</label>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="form-control"
                      style={{ padding: '6px 12px', width: 'auto', fontWeight: '600' }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Preparing">Preparing</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                {/* Grid: Customer Info & Items List */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
                  {/* Customer Info */}
                  <div style={{ background: '#fafafa', padding: '15px', borderRadius: '8px', border: '1px solid #f0f0f0', fontSize: '13px' }}>
                    <h5 style={{ fontSize: '14px', marginBottom: '10px', color: '#2f3542' }}>Customer Information</h5>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                      <User size={14} color="#e24a4a" />
                      <strong>{order.deliveryAddress?.fullName || order.user?.name}</strong>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', color: '#666' }}>
                      <Phone size={14} color="#e24a4a" />
                      <span>{order.deliveryAddress?.phone || 'N/A'}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', color: '#666' }}>
                      <MapPin size={14} color="#e24a4a" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <span>
                        {order.deliveryAddress?.address}, {order.deliveryAddress?.city} - {order.deliveryAddress?.pincode}
                      </span>
                    </div>
                  </div>

                  {/* Items List */}
                  <div>
                    <h5 style={{ fontSize: '14px', marginBottom: '10px', color: '#2f3542' }}>Ordered Items</h5>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {order.items.map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                          <span>
                            {item.name} <strong style={{ color: '#888' }}>x {item.quantity}</strong>
                          </span>
                          <span style={{ fontWeight: '600' }}>
                            ${(item.quantity * item.price).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div style={{ borderTop: '1px solid #eee', marginTop: '12px', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '16px', color: '#e24a4a' }}>
                      <span>Total Amount:</span>
                      <span>${order.totalAmount.toFixed(2)} ({order.paymentMethod})</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
