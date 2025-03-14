import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
 

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
        // setIsAuthenticated(true);
      }
    };
    loadToken();
  }, []);

  const login = async (newToken) => {
    await AsyncStorage.setItem('token', newToken);
    setToken(newToken);
    console.log("Token: ", newToken);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setToken(null);
    setIsAuthenticated(false);
  };


  return (
    <AuthContext.Provider value={{ isAuthenticated,token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

