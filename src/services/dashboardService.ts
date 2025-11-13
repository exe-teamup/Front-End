import { API_ENDPOINTS } from '@/config/apiEndpoints';
import { ApiClient } from '@/lib/axios';
import type { DashboardStats, WorkloadData } from '@/types/dashboard';
import { getErrorMessage } from '@/utils/errorHandler';

export class DashboardService {
  private static readonly STATS_URL = API_ENDPOINTS.DASHBOARD.STATS;
  private static readonly WORKLOAD_URL = API_ENDPOINTS.DASHBOARD.WORKLOAD;

  /**
   * Get dashboard statistics
   */
  static async getDashboardStats(): Promise<DashboardStats> {
    try {
      const response = await ApiClient.get<DashboardStats>(this.STATS_URL);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  /**
   * Get lecturer workload data
   */
  static async getWorkloadData(): Promise<WorkloadData> {
    try {
      const response = await ApiClient.get<WorkloadData>(this.WORKLOAD_URL);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }
}

export default DashboardService;
