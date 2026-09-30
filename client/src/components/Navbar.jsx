import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { ShoppingBag, User as UserIcon, LogOut, ShieldAlert } from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAdmin } = useContext(AuthContext);
  const { totalItemCount, setIsDrawerOpen } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar-fixed-top">
      <div className="container navbar-container">
        {/* Brand Logo & Name */}
        <div className="logo">
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <img src="/img/logo.png" alt="FoodSource Logo" style={{ height: '34px', width: 'auto' }} />
            <span style={{ fontSize: '23px', fontWeight: '800', color: '#ff385c', letterSpacing: '-0.5px' }}>
              Food<span style={{ color: '#1e2329' }}>Source</span>
            </span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="nav-links">
            <li>
              <NavLink to="/" end>Home</NavLink>
            </li>
            <li>
              <NavLink to="/menu">Menu</NavLink>
            </li>
            <li>
              <NavLink to="/cart">Cart</NavLink>
            </li>

            {user ? (
              <>
                <li>
                  <NavLink to="/orders">My Orders</NavLink>
                </li>
                {isAdmin && (
                  <li>
                    <NavLink to="/admin" style={{ color: '#6c5ce7', fontWeight: '600' }}>
                      <ShieldAlert size={16} style={{ display: 'inline', marginRight: '4px' }} />
                      Admin
                    </NavLink>
                  </li>
                )}
                <li>
                  <NavLink to="/profile" title="Profile">
                    <UserIcon size={18} style={{ display: 'inline', marginRight: '4px' }} />
                    {user.name.split(' ')[0]}
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="btn-outline"
                    style={{ padding: '5px 12px', fontSize: '13px' }}
                  >
                    <LogOut size={14} style={{ marginRight: '4px' }} /> Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/register" className="btn-primary" style={{ color: '#fff', padding: '6px 16px' }}>
                    Register
                  </NavLink>
                </li>
              </>
            )}

            {/* Shopping Cart Drawer Trigger */}
            <li style={{ position: 'relative' }}>
              <button
                onClick={() => setIsDrawerOpen(true)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center' }}
                title="View Shopping Cart"
              >
                <ShoppingBag size={24} color="#ff385c" />
                {totalItemCount > 0 && <span className="badge">{totalItemCount}</span>}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
