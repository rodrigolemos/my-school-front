import axios from 'axios';

const api = axios.create({
  baseURL: process.env.BACKEND_URL,
  timeout: 30000
});

export default api;
