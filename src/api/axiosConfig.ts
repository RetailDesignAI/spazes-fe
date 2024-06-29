import config from '@/config/config';
import axios from 'axios';

const api = axios.create({
  baseURL: config.API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    console.log(config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use((response) => {
  console.log(response);
  return response;
});

export default api;
