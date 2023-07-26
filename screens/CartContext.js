// CartContext.js
import React, { createContext, useState } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // const updateCartItems = (newCartItems) => {
  //   setCartItems(newCartItems);
  // };
  // const addToCart = (itemToAdd, quantity = 1) => {
  //   const existingItemIndex = cartItems.findIndex((item) => item.id === itemToAdd.id);
  
  //   if (existingItemIndex !== -1) {
  //     // If the item already exists, update its quantity
  //     const updatedCartItems = [...cartItems];
  //     updatedCartItems[existingItemIndex].quantity += quantity;
  //     setCartItems(updatedCartItems);
  //   } else {
  //     // If the item doesn't exist, add it to the cart with the provided quantity
  //     setCartItems([...cartItems, { ...itemToAdd, quantity }]);
  //   }
  // };
  return (
    <CartContext.Provider value={{ cartItems, setCartItems}}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
