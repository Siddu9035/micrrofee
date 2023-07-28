// AppContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();
const CartContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Fetch the login status and user email from AsyncStorage
    const fetchLoginStatus = async () => {
      try {
        const loginStatus = await AsyncStorage.getItem('isLoggedIn');
        const email = await AsyncStorage.getItem('userEmail');

        if (loginStatus === 'true' && email) {
          setIsLoggedIn(true);
          setUserEmail(email);
        }
      } catch (error) {
        console.log('Error retrieving login status and user email:', error);
      }
    };

    fetchLoginStatus();
  }, []);

  const handleLogin = async (email) => {
    // Save the login status and user email to AsyncStorage
    try {
      await AsyncStorage.setItem('isLoggedIn', 'true');
      await AsyncStorage.setItem('userEmail', email);
      setIsLoggedIn(true);
      setUserEmail(email);
      //   navigation.navigate('login');
    } catch (error) {
      console.log('Error saving login status and user email:', error);
    }
  };

  const handleLogout = async () => {
    // Clear the login status and user email from AsyncStorage
    try {
      await AsyncStorage.removeItem('isLoggedIn');
      await AsyncStorage.removeItem('userEmail');
      console.log('user logged out');
      setIsLoggedIn(false);
      setUserEmail('');
    } catch (error) {
      console.log('Error clearing login status and user email:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userEmail, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const updateCartItems = (newCartItems) => {
    setCartItems(newCartItems);
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, updateCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export const useCart = () => useContext(CartContext);
