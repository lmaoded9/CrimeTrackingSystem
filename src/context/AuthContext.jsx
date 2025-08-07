import React, { createContext, useContext, useState, useEffect } from 'react';
import usersData from './users.json'; // Import the JSON file

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState(usersData.users);
  const [citizens, setCitizens] = useState(usersData.citizens);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check if user exists in users or citizens
    const user = [...users, ...citizens].find(u => u.email === email && u.password === password);

    if (user) {
      const { password, ...userToStore } = user;
      setUser(userToStore);
      localStorage.setItem('user', JSON.stringify(userToStore));
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const register = async (userData) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check if email is already taken
    const isEmailTaken = [...users, ...citizens].some(u => u.email === userData.email);

    if (isEmailTaken) {
      setIsLoading(false);
      return false;
    }

    // Add new citizen to the list
    const newCitizen = { id: Date.now().toString(), ...userData };
    const updatedCitizens = [...citizens, newCitizen];
    setCitizens(updatedCitizens);

    const { password, ...userToStore } = newCitizen;
    setUser(userToStore);
    localStorage.setItem('user', JSON.stringify(userToStore));

    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
