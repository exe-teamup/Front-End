// Main exports for the API client
export { ApiClient } from './apiClient';
export { AuthTokenManager } from './authToken';
export { default as axios } from './axios';
export * from './types';

// Re-export axios instance as api for convenience
export { default as api } from './axios';
