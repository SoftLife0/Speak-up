import React, { createContext, useContext, useState, useEffect } from 'react';

const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add this

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user from sessionStorage:', error);
      }
    }
    setLoading(false); // Always set loading to false
  }, []);

  const loginUser = (userData) => {
    setUser(userData);
    sessionStorage.setItem('user', JSON.stringify(userData));
  };

  const logoutUser = () => {
    setUser(null);
    sessionStorage.removeItem('user');
  };

  return (
    <userContext.Provider value={{ user, setUser, loginUser, logoutUser, loading }}>
      {children}
    </userContext.Provider>
  );
};


export const useUser = () => useContext(userContext);
