/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from 'axios';
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import type { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { ApiClient } from '@/lib/axios';
import type { ApiRequestParams } from '@/lib/axios';

/**
 * Creates a basic query hook for GET requests
 * @param queryKey - Unique key for the query
 * @param url - API endpoint URL
 */
export const createQueryHook =
  (queryKey: string, url: string) =>
  (
    options?: any,
    params?: ApiRequestParams
  ): UseQueryResult<any, AxiosError<{ message: string }>> =>
    useQuery({
      queryKey: [queryKey],
      queryFn: async () => (await ApiClient.get(url, params)).data,
      ...options,
    });

/**
 * Hook with dynamic query key - automatically refetches when dependencies change
 * @param baseQueryKey - Base query key
 * @param url - API endpoint URL
 */
export const createDynamicQueryHook =
  (baseQueryKey: string, url: string) =>
  (
    dependencies?: any[],
    options?: any,
    params?: ApiRequestParams
  ): UseQueryResult<any, AxiosError<{ message: string }>> => {
    const queryKey = dependencies
      ? [baseQueryKey, ...dependencies]
      : [baseQueryKey];

    return useQuery({
      queryKey,
      queryFn: async () => (await ApiClient.get(url, params)).data,
      ...options,
    });
  };

/**
 * Hook for search with automatic refetch when search params change
 * @param baseQueryKey - Base query key
 * @param url - API endpoint URL
 */
export const createSearchQueryHook =
  (baseQueryKey: string, url: string) =>
  (
    searchParams?: ApiRequestParams, // Search parameters object
    options?: any
  ): UseQueryResult<any, AxiosError<{ message: string }>> => {
    // Create queryKey from search params for automatic refetch
    const queryKey = searchParams
      ? [baseQueryKey, searchParams]
      : [baseQueryKey];

    return useQuery({
      queryKey,
      queryFn: async () => (await ApiClient.get(url, searchParams)).data,
      enabled: !!searchParams && Object.keys(searchParams).length > 0,
      ...options,
    });
  };

/**
 * Creates a query hook with path parameter (e.g., /api/users/:id)
 * @param queryKey - Unique key for the query
 * @param url - Base API endpoint URL
 */
export const createQueryWithPathParamHook =
  (queryKey: string, url: string) =>
  (
    id?: string,
    options?: any
  ): UseQueryResult<any, AxiosError<{ message: string }>> => {
    return useQuery({
      queryKey: id ? [queryKey, id] : [queryKey],
      queryFn: async () => (await ApiClient.get(`${url}/${id}`)).data,
      enabled: !!id,
      ...options,
    });
  };

/**
 * Creates a POST mutation hook
 * @param queryKey - Query key to invalidate after mutation
 * @param url - API endpoint URL
 */
export const createMutationHook =
  (queryKey: string, url: string) =>
  (
    id?: string
  ): UseMutationResult<any, AxiosError<{ message: string }>, any> => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: data => ApiClient.post(`${url}${id ? `/${id}` : ''}`, data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: id ? [queryKey, id] : [queryKey],
        });
      },
    });
  };

/**
 * Creates a POST mutation hook for file uploads
 * @param queryKey - Query key to invalidate after mutation
 * @param url - API endpoint URL
 */
export const createMutationUploadFilesHook =
  (queryKey: string, url: string) =>
  (
    id?: string
  ): UseMutationResult<any, AxiosError<{ message: string }>, any> => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: data =>
        ApiClient.post(url, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        }),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: id ? [queryKey, id] : [queryKey],
        });
      },
    });
  };

/**
 * Creates a PUT mutation hook for file uploads
 * @param queryKeys - Array of query keys to invalidate
 * @param url - Base API endpoint URL
 */
export const updateMutationUploadFilesHook =
  (queryKeys: string[], url: string) =>
  (
    id?: string
  ): UseMutationResult<
    any,
    AxiosError<{ message: string }>,
    { id: string; data: any }
  > => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ id: idToUpdate, data }: { id: string; data: any }) =>
        ApiClient.put(`${url}/${idToUpdate}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        }),
      onSuccess: () => {
        queryKeys.forEach(queryKey => {
          queryClient.invalidateQueries({
            queryKey: id ? [queryKey, id] : [queryKey],
          });
        });
      },
    });
  };

/**
 * Creates a PUT mutation hook
 * @param queryKey - Query key to invalidate after mutation
 * @param url - Base API endpoint URL
 */
export const updateMutationHook =
  (queryKey: string, url: string) =>
  (
    id?: string
  ): UseMutationResult<
    any,
    AxiosError<{ message: string }>,
    { id: string; data: any }
  > => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ id: idToUpdate, data }: { id: string; data: any }) =>
        ApiClient.put(`${url}/${idToUpdate}`, data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: id ? [queryKey, id] : [queryKey],
        });
      },
    });
  };

/**
 * Creates a DELETE mutation hook
 * @param queryKey - Query key to invalidate after mutation
 * @param url - Base API endpoint URL
 */
export const deleteMutationHook =
  (queryKey: string, url: string) =>
  (
    id?: string
  ): UseMutationResult<any, AxiosError<{ message: string }>, string> => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (idToDelete: string) =>
        ApiClient.delete(`${url}/${idToDelete}`),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: id ? [queryKey, id] : [queryKey],
        });
      },
    });
  };

/**
 * Hook to create multiple queries simultaneously
 * @param queryKeyPrefix - Prefix key for react-query
 * @param urlGenerator - Function to generate URL based on input
 */
export const createMultiQueryHook = (
  queryKeyPrefix: string,
  urlGenerator: (input: any) => string
) => {
  return (
    inputs: any[]
  ): UseQueryResult<any, AxiosError<{ message: string }>>[] => {
    return useQueries({
      queries: inputs.map(input => ({
        queryKey: [queryKeyPrefix, input],
        queryFn: async () => (await ApiClient.get(urlGenerator(input))).data,
        enabled: !!input,
      })),
    });
  };
};

/**
 * Hook to update a single field via endpoint with path param and query param
 * @param queryKey - React-query key to invalidate
 * @param baseUrl - Example: /api/book-type
 */
export const patchMutationHook =
  (queryKey: string, baseUrl: string) =>
  (): UseMutationResult<
    any,
    AxiosError<{ message: string }>,
    {
      id: string;
      field: string;
      queryParams: Record<string, string | number>;
      body?: any;
    }
  > => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: async ({
        id,
        field,
        queryParams,
        body,
      }: {
        id: string;
        field: string;
        queryParams: Record<string, string | number>;
        body?: any;
      }) => {
        const searchParams = new URLSearchParams(queryParams as any).toString();
        const fullUrl = `${baseUrl}/${id}/${field}?${searchParams}`;
        return await ApiClient.patch(fullUrl, body);
      },
      onSuccess: (_data, { id }) => {
        queryClient.invalidateQueries({ queryKey: [queryKey, id] });
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      },
    });
  };
