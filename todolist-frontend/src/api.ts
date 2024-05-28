// src/api.ts
import axios from 'axios';

const API_SERVER = process.env.REACT_APP_API_SERVER;

const api = axios.create({
  baseURL: API_SERVER,
  headers: {
    'Content-Type': 'application/json'
  }
});



export default api;
