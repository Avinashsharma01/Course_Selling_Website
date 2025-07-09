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

// Response interceptor to handle responses and errors
instance.interceptors.response.use(
  (response) => {
    // Any status code within the range of 2xx causes this function to trigger
    // You can modify or format the response data here before returning it
    return response.data;
  },
  (error) => {
    // Any status codes outside the range of 2xx cause this function to trigger
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Something went wrong';

    // You can handle specific status codes here
    if (error.response?.status === 401) {
      // Handle unauthorized access (e.g., redirect to login)
      localStorage.removeItem('token');
      // You might want to redirect to login page or dispatch an action
      // window.location.href = '/login';
    }

    // You can also handle other status codes as needed

    // Return a rejected promise with the error message
    return Promise.reject(errorMessage);
  }
);

export default instance;
