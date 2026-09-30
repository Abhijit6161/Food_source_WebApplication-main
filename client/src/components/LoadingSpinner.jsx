import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ message = 'Loading delicious food...' }) => {
  return (
    <div className="text-center" style={{ padding: '60px 20px' }}>
      <Loader2 size={40} color="#e24a4a" style={{ animation: 'spin 1s linear infinite' }} />
      <p style={{ marginTop: '12px', color: '#666', fontSize: '15px' }}>{message}</p>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
