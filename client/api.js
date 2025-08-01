import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/v2',
  withCredentials: true, 
});

export default API;
