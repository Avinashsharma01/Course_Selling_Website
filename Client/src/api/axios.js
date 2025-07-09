import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Updated to match API documentation
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
    console.error('Axios Error Intercepted:', error);

    // Log more detailed information about the error
    if (error.response) {
      console.error('Error Response:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data
      });

      // Add the response data to the error object for easier access
      error.responseData = error.response.data;

      // Check if it's an "already enrolled" error - handle it gracefully
      if (error.response.status === 400 &&
        error.response.data.message === "Already enrolled in this course") {
        console.log("Detected 'already enrolled' error - this is expected in some cases");
      }
    } else if (error.request) {
      console.error('Error Request:', error.request);
    }

    // Pass through the full error object for better debugging
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      const userType = localStorage.getItem('userType');
      localStorage.removeItem('userType');

      // Redirect based on user type
      if (userType === 'admin') {
        window.location.href = '/auth/admin/login';
      } else {
        window.location.href = '/auth/login';
      }
    }

    // Return the full error object to preserve the error structure
    return Promise.reject(error);
  }
);

export default instance;
