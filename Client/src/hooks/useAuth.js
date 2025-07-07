// src/hooks/useAuth.js
import { useState } from 'react';

const useAuth = () => {
  const [user, setUser] = useState(null); // null = not logged in

  const login = (dummyUser = { name: 'Ishika', email: 'ishika@example.com' }) => {
    setUser(dummyUser);
  };

  const logout = () => {
    setUser(null);
  };

  return { user, login, logout };
};

export default useAuth;
