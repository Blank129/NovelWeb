// src/services/api.js
import axios from 'axios';

const apiAxios= axios.create({
  baseURL: 'https://api.example.com/', // Đặt base URL chung cho các API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiAxios;
