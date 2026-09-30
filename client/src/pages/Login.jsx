import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import ErrorMessage from '../components/ErrorMessage';
import { LogIn } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { login } = useContext(AuthContext);
  const { showToast } = useContext(CartContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const user = await login(email, password);
      showToast(`Welcome back, ${user.name}!`);
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '50px 0' }}>
      <div className="container">
        <div className="form-card">
          <div className="text-center" style={{ marginBottom: '25px' }}>
            <LogIn size={40} color="#e24a4a" />
            <h2 style={{ marginBottom: '5px' }}>Customer Login</h2>
            <p className="text-muted">Enter your email and password to sign in</p>
          </div>

          {error && <ErrorMessage message={error} />}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                required
                placeholder="e.g. user@foodsource.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ width: '100%', padding: '12px', fontSize: '16px', marginTop: '10px' }}
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center" style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
            Don't have an account yet?{' '}
            <Link to="/register" style={{ color: '#e24a4a', fontWeight: '600' }}>
              Register Here
            </Link>
          </p>

          <div
            style={{
              marginTop: '25px',
              padding: '15px',
              background: '#f8f9fa',
              borderRadius: '8px',
              fontSize: '12px',
              color: '#555',
              border: '1px solid #eee'
            }}
          >
            <strong>Demo Credentials for Testing:</strong>
            <div style={{ marginTop: '6px' }}>
              <div>👤 Customer: <code>user@foodsource.com</code> / <code>userpassword123</code></div>
              <div style={{ marginTop: '2px' }}>🛡️ Admin: <code>admin@foodsource.com</code> / <code>adminpassword123</code></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
