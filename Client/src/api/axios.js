import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // ✅ Adjust if needed
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Attach token automatically to protected routes
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
