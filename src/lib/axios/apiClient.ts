import type { AxiosRequestConfig } from 'axios';
import axiosInstance from './axios';
import type { ApiRequestParams, ApiResponse, PaginatedResponse } from './types';

/**
 * Generic API client with common HTTP methods
 */
export class ApiClient {
  /**
   * GET request
   */
  static async get<T>(
    url: string,
    params?: ApiRequestParams,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await axiosInstance.get(url, { params, ...config });
    return response.data;
  }

  /**
   * POST request
   */
  static async post<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await axiosInstance.post(url, data, config);
    return response.data;
  }

  /**
   * PUT request
   */
  static async put<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await axiosInstance.put(url, data, config);
    return response.data;
  }

  /**
   * PATCH request
   */
  static async patch<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await axiosInstance.patch(url, data, config);
    return response.data;
  }

  /**
   * DELETE request
   */
  static async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await axiosInstance.delete(url, config);
    return response.data;
  }

  /**
   * GET request for paginated data
   */
  static async getPaginated<T>(
    url: string,
    params?: ApiRequestParams,
    config?: AxiosRequestConfig
  ): Promise<PaginatedResponse<T>> {
    const response = await axiosInstance.get(url, { params, ...config });
    return response.data;
  }
}

export { default as axios } from './axios';
export * from './types';
