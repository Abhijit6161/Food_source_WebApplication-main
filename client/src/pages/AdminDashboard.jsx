import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Users, Utensils, ShoppingBag, DollarSign, ArrowRight } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const { data } = await API.get('/admin/stats');
      setStats(data);
    } catch (err) {
      setError('Failed to fetch admin stats');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading Admin Dashboard statistics..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <div>
            <h2>Admin Dashboard Overview</h2>
            <p className="text-muted">Manage system statistics, food menu catalog, and customer orders</p>
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
            <Link to="/admin/foods" className="btn-primary">
              <Utensils size={16} /> Manage Foods
            </Link>
            <Link to="/admin/orders" className="btn-secondary">
              <ShoppingBag size={16} /> Manage Orders
            </Link>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div>
              <div className="stat-num">${stats?.totalRevenue?.toFixed(2) || '0.00'}</div>
              <div className="stat-label">Total Revenue</div>
            </div>
            <DollarSign size={36} color="#e24a4a" />
          </div>

          <div className="stat-card">
            <div>
              <div className="stat-num">{stats?.totalOrders || 0}</div>
              <div className="stat-label">Total Orders</div>
            </div>
            <ShoppingBag size={36} color="#00b894" />
          </div>

          <div className="stat-card">
            <div>
              <div className="stat-num">{stats?.totalFoods || 0}</div>
              <div className="stat-label">Food Items in Menu</div>
            </div>
            <Utensils size={36} color="#0984e3" />
          </div>

          <div className="stat-card">
            <div>
              <div className="stat-num">{stats?.totalUsers || 0}</div>
              <div className="stat-label">Registered Customers</div>
            </div>
            <Users size={36} color="#6c5ce7" />
          </div>
        </div>

        {/* Recent Orders Table */}
        <div style={{ background: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3 style={{ fontSize: '18px' }}>Recent Customer Orders</h3>
            <Link to="/admin/orders" style={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              View All Orders <ArrowRight size={14} />
            </Link>
          </div>

          {stats?.recentOrders?.length === 0 ? (
            <p className="text-muted">No recent orders recorded.</p>
          ) : (
            <table className="custom-table" style={{ margin: 0 }}>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                  <th>Order Date</th>
                </tr>
              </thead>
              <tbody>
                {stats?.recentOrders?.map((order) => (
                  <tr key={order._id}>
                    <td>#{order._id.substring(0, 10)}...</td>
                    <td>{order.user?.name || 'Guest'} ({order.user?.email})</td>
                    <td style={{ fontWeight: '600', color: '#e24a4a' }}>${order.totalAmount.toFixed(2)}</td>
                    <td>
                      <span className={`status-badge status-${order.status.toLowerCase().replace(/\s+/g, '-')}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
