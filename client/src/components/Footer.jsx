import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="container grid-3">
          <div>
            <h3>About FoodSource</h3>
            <p style={{ marginTop: '12px', fontSize: '14px', lineHeight: '1.6', color: '#b2bec3' }}>
              FoodSource is a premium full-stack food ordering platform designed to deliver delicious, fresh meals right to your doorstep with speed and security.
            </p>
          </div>

          <div>
            <h3>Quick Links</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
              <Link to="/">Home Page</Link>
              <Link to="/menu">Explore Menu</Link>
              <Link to="/cart">Shopping Cart</Link>
              <Link to="/login">User Login</Link>
            </div>
          </div>

          <div>
            <h3>Follow Us</h3>
            <p style={{ marginTop: '12px', fontSize: '14px', color: '#b2bec3' }}>
              Connect with us on social media for exclusive discounts and daily special meal offers!
            </p>
            <div style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>

      <div className="copyright text-center">
        <div className="container">
          <p>
            All Rights Reserved &copy; {new Date().getFullYear()} FoodSource Application | Designed & Built by{' '}
            <a href="https://github.com/abhijitmore" target="_blank" rel="noreferrer" style={{ color: '#e24a4a', fontWeight: '600' }}>
              Abhijit More
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
