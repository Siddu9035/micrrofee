// CartContext.js
import React, { createContext, useState } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const updateCartItems = (newCartItems) => {
    setCartItems(newCartItems);
  };
  return (
    <CartContext.Provider value={{ cartItems, setCartItems}}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
