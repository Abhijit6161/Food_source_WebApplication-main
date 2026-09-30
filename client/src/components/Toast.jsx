import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { CheckCircle2, AlertTriangle } from 'lucide-react';

const Toast = () => {
  const { toastMessage } = useContext(CartContext);

  if (!toastMessage) return null;

  const isError = toastMessage.type === 'error';

  return (
    <div className="toast-container">
      <div className={`toast ${isError ? 'toast-error' : 'toast-success'}`}>
        {isError ? (
          <AlertTriangle size={18} color="#e74c3c" />
        ) : (
          <CheckCircle2 size={18} color="#2ecc71" />
        )}
        <span>{toastMessage.message}</span>
      </div>
    </div>
  );
};

export default Toast;
