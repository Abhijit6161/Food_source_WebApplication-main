import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { User, Mail, Calendar, ShieldCheck } from 'lucide-react';

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  return (
    <div style={{ padding: '50px 0' }}>
      <div className="container">
        <h2 className="text-center">My Account Profile</h2>
        <div className="heading-border"></div>

        <div className="form-card" style={{ maxWidth: '550px' }}>
          <div style={{ textAlign: 'center', marginBottom: '25px' }}>
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: '#e24a4a',
                color: '#fff',
                fontSize: '32px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 15px auto'
              }}
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h3 style={{ fontSize: '22px' }}>{user.name}</h3>
            <span
              style={{
                background: user.role === 'admin' ? '#6c5ce7' : '#2ecc71',
                color: '#fff',
                padding: '3px 12px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '600',
                display: 'inline-block',
                marginTop: '6px'
              }}
            >
              {user.role.toUpperCase()}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#f8f9fa', borderRadius: '8px' }}>
              <User size={20} color="#e24a4a" />
              <div>
                <span style={{ fontSize: '12px', color: '#888', display: 'block' }}>Full Name</span>
                <strong>{user.name}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#f8f9fa', borderRadius: '8px' }}>
              <Mail size={20} color="#e24a4a" />
              <div>
                <span style={{ fontSize: '12px', color: '#888', display: 'block' }}>Email Address</span>
                <strong>{user.email}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#f8f9fa', borderRadius: '8px' }}>
              <ShieldCheck size={20} color="#e24a4a" />
              <div>
                <span style={{ fontSize: '12px', color: '#888', display: 'block' }}>Account Type</span>
                <strong>{user.role === 'admin' ? 'Administrator Account' : 'Customer Account'}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
