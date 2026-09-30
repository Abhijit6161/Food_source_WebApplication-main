import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorMessage = ({ message = 'Something went wrong. Please try again.' }) => {
  return (
    <div
      style={{
        background: '#fff0f0',
        border: '1px solid #ffcdd2',
        color: '#d32f2f',
        padding: '15px 20px',
        borderRadius: '8px',
        margin: '20px auto',
        maxWidth: '600px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}
    >
      <AlertCircle size={20} style={{ flexShrink: 0 }} />
      <span style={{ fontSize: '14px', fontWeight: '500' }}>{message}</span>
    </div>
  );
};

export default ErrorMessage;
