import React, {createContext, useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppContext = createContext();

export const AppProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [cartItems, setCartItems] = useState([]);

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

  const handleLogin = async email => {
    // Save the login status and user email to AsyncStorage
    try {
      await AsyncStorage.setItem('isLoggedIn', 'true');
      await AsyncStorage.setItem('userEmail', email);
      setIsLoggedIn(true);
      setUserEmail(email);
    } catch (error) {
      console.log('Error saving login status and user email:', error);
    }
  };

  const handleLogout = async () => {
    // Clear the login status and user email from AsyncStorage
    try {
      await AsyncStorage.removeItem('isLoggedIn');
      await AsyncStorage.removeItem('userEmail');
      setIsLoggedIn(false);
      setUserEmail('');
    } catch (error) {
      console.log('Error clearing login status and user email:', error);
    }
  };

  const updateCartItems = newCartItems => {
    setCartItems(newCartItems);
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        userEmail,
        cartItems,
        handleLogin,
        handleLogout,
        updateCartItems,
        setCartItems,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
