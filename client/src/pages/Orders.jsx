import React, { useState, useEffect } from 'react';
import API from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Package, Clock, MapPin, DollarSign } from 'lucide-react';

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'Pending': return 'status-pending';
    case 'Confirmed': return 'status-confirmed';
    case 'Preparing': return 'status-preparing';
    case 'Out for Delivery': return 'status-out-for-delivery';
    case 'Delivered': return 'status-delivered';
    case 'Cancelled': return 'status-cancelled';
    default: return 'status-pending';
  }
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await API.get('/orders');
      setOrders(data);
    } catch (err) {
      setError('Failed to fetch order history.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner message="Fetching your orders..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        <h2 className="text-center">My Order History</h2>
        <div className="heading-border"></div>

        {orders.length === 0 ? (
          <div className="text-center" style={{ padding: '60px 0', background: '#fff', borderRadius: '12px' }}>
            <Package size={54} color="#ccc" style={{ marginBottom: '15px' }} />
            <h3>No Orders Found</h3>
            <p className="text-muted" style={{ marginTop: '8px' }}>
              You haven't placed any food orders yet.
            </p>
          </div>
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
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid #f0f0f0',
                    paddingBottom: '15px',
                    marginBottom: '15px',
                    flexWrap: 'wrap',
                    gap: '10px'
                  }}
                >
                  <div>
                    <span style={{ fontSize: '12px', color: '#888', display: 'block' }}>Order ID</span>
                    <strong style={{ fontSize: '15px', color: '#2f3542' }}>#{order._id}</strong>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#666', fontSize: '14px' }}>
                    <Clock size={16} />
                    <span>{new Date(order.createdAt).toLocaleString()}</span>
                  </div>

                  <div>
                    <span className={`status-badge ${getStatusBadgeClass(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Items List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '15px' }}>
                  {order.items.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img
                          src={item.image || '/img/food/p1.jpg'}
                          alt={item.name}
                          style={{ width: '45px', height: '45px', borderRadius: '8px', objectFit: 'cover' }}
                          onError={(e) => { e.target.src = '/img/food/p1.jpg'; }}
                        />
                        <div>
                          <p style={{ fontWeight: '500', margin: 0 }}>{item.name}</p>
                          <span style={{ fontSize: '13px', color: '#777' }}>
                            Qty: {item.quantity} x ${item.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <span style={{ fontWeight: '600' }}>
                        ${(item.quantity * item.price).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Footer Details */}
                <div
                  style={{
                    background: '#fafafa',
                    padding: '12px 18px',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '10px',
                    fontSize: '14px',
                    border: '1px solid #f0f0f0'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#555' }}>
                    <MapPin size={16} color="#e24a4a" />
                    <span>
                      {order.deliveryAddress?.fullName} | {order.deliveryAddress?.address}, {order.deliveryAddress?.city} ({order.deliveryAddress?.phone})
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '700', fontSize: '16px', color: '#e24a4a' }}>
                    <DollarSign size={18} />
                    <span>Total: ${order.totalAmount.toFixed(2)}</span>
                    <span style={{ fontSize: '12px', color: '#777', fontWeight: 'normal', marginLeft: '5px' }}>
                      ({order.paymentMethod})
                    </span>
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

export default Orders;
