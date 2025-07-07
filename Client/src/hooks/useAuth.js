// src/hooks/useAuth.js
import { useState } from 'react';

const useAuth = () => {
  const [user, setUser] = useState(null); // null = not logged in

  // Pass role in dummyUser: "user" or "admin"
  const login = (dummyUser = { name: 'Ishika', email: 'ishika@example.com', role: 'user' }) => {
    setUser(dummyUser);
  };

  const logout = () => {
    setUser(null);
  };

  const isAdmin = user?.role === 'admin';

  return { user, login, logout, isAdmin };
};

export default useAuth;
