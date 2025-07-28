import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://blw-railways-production.up.railway.app/api'  // Railway backend URL
  : 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ API Response Error:', error);
    
    if (error.code === 'ECONNREFUSED') {
      console.error('🔌 Connection refused - Backend server is not running');
      alert('Backend server is not running. Please start the server and try again.');
    } else if (error.response?.status === 404) {
      console.error('🔍 Resource not found');
    } else if (error.response?.status === 500) {
      console.error('🚨 Server error');
    } else if (error.code === 'ECONNABORTED') {
      console.error('⏰ Request timeout');
      alert('Request timeout. Please check your connection and try again.');
    }
    
    return Promise.reject(error);
  }
);

// Test backend connection
export const testConnection = async () => {
  try {
    const response = await api.get('/test');
    console.log('✅ Backend connection successful:', response.data);
    return true;
  } catch (error) {
    console.error('❌ Backend connection failed:', error);
    return false;
  }
};