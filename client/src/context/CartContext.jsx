import React, { createContext, useState, useEffect, useContext } from 'react';
import API from '../services/api';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Show auto-hiding toast
  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Fetch cart on load or auth state change
  useEffect(() => {
    if (user) {
      fetchBackendCart();
    } else {
      const localCart = localStorage.getItem('guestCart');
      if (localCart) {
        try {
          setCartItems(JSON.parse(localCart));
        } catch (e) {
          setCartItems([]);
        }
      } else {
        setCartItems([]);
      }
    }
  }, [user]);

  // Sync guest cart to localstorage
  useEffect(() => {
    if (!user) {
      localStorage.setItem('guestCart', JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  const fetchBackendCart = async () => {
    try {
      const { data } = await API.get('/cart');
      if (data && data.items) {
        const formatted = data.items.map((item) => ({
          _id: item._id,
          foodId: item.food._id || item.food,
          name: item.food.name || 'Food Item',
          price: item.price,
          quantity: item.quantity,
          image: item.food.image || '/img/food/p1.jpg'
        }));
        setCartItems(formatted);
      }
    } catch (err) {
      console.error('Error fetching cart:', err);
    }
  };

  const addToCart = async (food, quantity = 1) => {
    const qty = Number(quantity);
    if (user) {
      try {
        await API.post('/cart', { foodId: food._id, quantity: qty });
        await fetchBackendCart();
        showToast(`Added ${food.name} to cart!`);
      } catch (err) {
        showToast(err.response?.data?.message || 'Failed to add item to cart', 'error');
      }
    } else {
      setCartItems((prevItems) => {
        const existing = prevItems.find((item) => item.foodId === food._id);
        if (existing) {
          return prevItems.map((item) =>
            item.foodId === food._id
              ? { ...item, quantity: item.quantity + qty }
              : item
          );
        } else {
          return [
            ...prevItems,
            {
              _id: Date.now().toString(),
              foodId: food._id,
              name: food.name,
              price: food.price,
              quantity: qty,
              image: food.image
            }
          ];
        }
      });
      showToast(`Added ${food.name} to cart!`);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    if (user) {
      try {
        await API.put(`/cart/${itemId}`, { quantity: newQuantity });
        await fetchBackendCart();
      } catch (err) {
        showToast('Failed to update quantity', 'error');
      }
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item._id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeFromCart = async (itemId) => {
    if (user) {
      try {
        await API.delete(`/cart/${itemId}`);
        await fetchBackendCart();
        showToast('Item removed from cart');
      } catch (err) {
        showToast('Failed to remove item', 'error');
      }
    } else {
      setCartItems((prev) => prev.filter((item) => item._id !== itemId));
      showToast('Item removed from cart');
    }
  };

  const clearCart = async () => {
    if (user) {
      try {
        await API.delete('/cart');
        setCartItems([]);
      } catch (err) {
        console.error('Error clearing cart:', err);
      }
    } else {
      setCartItems([]);
      localStorage.removeItem('guestCart');
    }
  };

  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItemCount,
        totalPrice,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isDrawerOpen,
        setIsDrawerOpen,
        toastMessage,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
