import { API_ENDPOINTS } from '@/config/apiEndpoints';
import { ApiClient } from '@/lib/axios';
import type { DashboardStats } from '@/types/dashboard';
import { getErrorMessage } from '@/utils/errorHandler';

export class DashboardService {
  private static readonly STATS_URL = API_ENDPOINTS.DASHBOARD.STATS;

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
}

export default DashboardService;
