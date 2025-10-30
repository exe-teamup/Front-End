import { useMajorStore } from '@/store/major';
import { useEffect } from 'react';

/**
 * Custom hook to fetch and manage majors data
 *
 * Features:
 * - Automatically fetches majors on mount
 * - Returns loading/error states
 * - Filters out inactive majors by default
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { majors, isLoading, error } = useMajors();
 *
 *   if (isLoading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error}</div>;
 *
 *   return (
 *     <select>
 *       {majors.map(major => (
 *         <option key={major.majorId} value={major.majorId}>
 *           {major.majorName}
 *         </option>
 *       ))}
 *     </select>
 *   );
 * }
 * ```
 */
export function useMajors() {
  const { majors, status, error, fetchMajors } = useMajorStore();

  useEffect(() => {
    // Only fetch if we haven't fetched yet
    if (status === 'idle') {
      fetchMajors();
    }
  }, [status, fetchMajors]);

  return {
    majors: majors.filter(m => m.majorStatus), // Only return active majors
    allMajors: majors, // Return all majors including inactive
    isLoading: status === 'loading',
    isError: status === 'error',
    error,
    refetch: fetchMajors,
  };
}
