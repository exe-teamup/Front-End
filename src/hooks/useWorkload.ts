import DashboardService from '@/services/dashboardService';
import type { WorkloadData } from '@/types/dashboard';
import { useEffect, useState } from 'react';

export function useWorkload() {
  const [workloadData, setWorkloadData] = useState<WorkloadData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkloadData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await DashboardService.getWorkloadData();
      setWorkloadData(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to fetch workload data'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkloadData();
  }, []);

  return {
    workloadData,
    isLoading,
    error,
    refetch: fetchWorkloadData,
  };
}
