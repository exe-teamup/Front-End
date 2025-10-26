import { AxiosError } from 'axios';

export interface ApiErrorResponse {
  error: string;
  message: string;
  status: number;
  timestamp: string;
}

/**
 * Extract error message from API response
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    if (error.response?.data) {
      const errorData = error.response.data as ApiErrorResponse;
      if (errorData.message) {
        return errorData.message;
      }
      if (errorData.error) {
        return errorData.error;
      }
    }
    return error.message || 'Có lỗi xảy ra';
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Có lỗi xảy ra';
}

export function getErrorDetails(error: unknown): ApiErrorResponse | null {
  if (error instanceof AxiosError && error.response?.data) {
    return error.response.data as ApiErrorResponse;
  }

  return null;
}
