import axios from 'axios';

const api = axios.create({
  baseURL: process.env.BACKEND_URL,
  timeout: 5000
});

export default api;
