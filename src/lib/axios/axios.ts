import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios, { AxiosError } from 'axios';
import { serviceConfig } from '../../config/serviceConfig';
import { AuthTokenManager } from './authToken';

// Create axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: serviceConfig.BASE_URL,
  timeout: serviceConfig.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add auth token to requests
    const token = AuthTokenManager.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle different error scenarios
    if (error.response) {
      const { status } = error.response;

      // Handle specific error cases
      switch (status) {
        case 401:
          // Unauthorized - redirect to login or refresh token
          AuthTokenManager.clearTokens();
          // You might want to dispatch a logout action or redirect to login page here
          // Example: window.location.href = '/login';
          break;
        case 403:
          // Forbidden - user doesn't have permission
          break;
        case 404:
          // Not found
          break;
        case 422:
          // Validation error
          break;
        case 500:
          // Server error
          break;
        default:
          // Other errors
          break;
      }
    } else if (error.request) {
      // Network error
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
