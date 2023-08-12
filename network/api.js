// api.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://cross-platform.rp.devfactory.com/', // API base URL
  timeout: 1000, // Set a timeout
  headers: {'Content-Type': 'application/json'},
});

export default instance;
