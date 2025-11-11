import { DashboardService } from '@/services/dashboardService';
import type { DashboardStats } from '@/types/dashboard';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export function useDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await DashboardService.getDashboardStats();
      setStats(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch dashboard stats';
      setError(errorMessage);
      toast.error('Lỗi tải dữ liệu', {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    stats,
    isLoading,
    error,
    refetch: fetchStats,
  };
}
