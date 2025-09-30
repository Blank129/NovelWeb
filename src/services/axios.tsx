// src/services/api.js
import axios from 'axios';

const apiAxiosInstance= axios.create({
  baseURL: 'http://localhost:3000/api', // Đặt base URL chung cho các API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiAxiosInstance;
