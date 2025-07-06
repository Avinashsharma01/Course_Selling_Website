import { createContext, useState, useEffect } from 'react';
import axios from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const { data } = await axios.post('/user/login', { email, password });
    localStorage.setItem('token', data.token);
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get('/user/profile');
      setUser(data);
    } catch {
      logout();
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


🔹 hooks/useAuth.js
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuth = () => useContext(AuthContext);
export default useAuth;
