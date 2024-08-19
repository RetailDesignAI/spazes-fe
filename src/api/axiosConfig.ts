import appConfig from '@/config/config';
import { AppRoutes } from '@/lib/constants/routes';
import { getTokensFromCookie } from '@/lib/cookies';
import axios from 'axios';

const api = axios.create({
  baseURL: appConfig.API_BASE_URL,
});

api.defaults.withCredentials = true;

api.interceptors.request.use(
  (config) => {
    const { accessToken } = getTokensFromCookie();
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  async (err) => {
    const { config, response } = err;

    if (response && response.status === 403) {
      try {
        const response = await axios.post(`${appConfig.API_BASE_URL}/refresh`);
        const { success } = response.data;
        if (success) {
          const { accessToken } = getTokensFromCookie();
          if (accessToken) {
            config.headers.Authorization = accessToken;
          }
          await axios(config);
          return response.data;
        }
      } catch (error) {
        console.error('Error refreshing token:', error);
        window.location.replace(AppRoutes.Login);
      }
    }

    return Promise.reject(err);
  }
);

export default api;
