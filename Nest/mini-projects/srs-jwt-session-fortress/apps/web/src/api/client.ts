import axios from 'axios';
import { getToken, setToken } from '../utils/tokenStore';
import {queryClient} from '../main'
const BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const fetchBackend = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Sends cookies for authenticated sessions
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});

fetchBackend.interceptors.request.use(
  (config) => {
    const token = getToken();
    console.log('Interceptor: Retrieved token from storage:', token);
    if (token) {
      config.headers['authorization'] = `Bearer ${token}`;
    }
    console.log('Sending token to prove authentication:', token)

    return config;
  },
  (error) => {

    return Promise.reject(error);
  }
);

fetchBackend.interceptors.response.use(
  (response) => {
    return response; // Pass the data straight to the React component.
  },
  async (error) => {
    const originalRequest = error.config;

    // 1. URL GUARD: If the failed request WAS the refresh route, DO NOT retry. 
    // Just wipe the token and reject the promise to break the loop.
    if (originalRequest.url.includes('/auth/refresh')) {
      setToken(null);
      queryClient.setQueryData(['isAuthenticated'], false);
      return Promise.reject(error);
    }

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token
        console.log('Attempting to refresh access token...');
        const refreshResponse = await fetchBackend.post('/auth/refresh');
        console.log('Refresh response received:', refreshResponse.data);
        const newAccessToken = refreshResponse.data.accessToken;
        
        setToken(newAccessToken);

        console.log('Token refreshed successfully, new access token:', newAccessToken);

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return fetchBackend(originalRequest);
      } catch (refreshError) {
        
        // 1. Tell TypeScript to check if this is an AxiosError
        if (axios.isAxiosError(refreshError)) {
          console.error('Refresh request failed because:', refreshError.response?.data || refreshError.message);

          // 2. Now TypeScript knows `.response` exists, no more red squiggles
          if (refreshError.response && (refreshError.response.status === 401 || refreshError.response.status === 403)) {
            setToken(null);
            queryClient.setQueryData(['isAuthenticated'], false);
          }
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);