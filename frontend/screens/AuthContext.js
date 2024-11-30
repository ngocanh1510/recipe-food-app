// 22520073-Phan Thị Ngọc Ánh
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  const login = (email, password) => {
    if (email==='0' && password === '0') {
      setUserEmail(email);
      setIsAuthenticated(true);
    } else {
      alert('Incorrect email or password');
    }
  };

  const logout = () => {
    setUserEmail(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

