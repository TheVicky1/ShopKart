import axios from 'axios';

// Axios instance configured with backend URL and credentials enabled for cookies
const api = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true
});

export default api;
