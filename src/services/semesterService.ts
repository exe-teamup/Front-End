import { ApiClient } from '@/lib/axios';
import { API_ENDPOINTS } from '@/config/apiEndpoints';
import type { Semester } from '@/types/semester';

export interface CreateSemesterRequest {
  semesterCode: string;
  semesterName: string;
  startDate: string;
  endDate: string;
  // create new semesters as INACTIVE by default
  semesterStatus: 'INACTIVE';
}

export interface UpdateSemesterRequest extends Partial<CreateSemesterRequest> {
  semesterId: number;
}

export interface SemesterResponse {
  data: Semester;
  message: string;
}

export interface SemestersResponse {
  data: Semester[];
  message: string;
}

export class SemesterService {
  private static readonly BASE_URL = API_ENDPOINTS.SEMESTERS.BASE;
  private static readonly BY_ID_URL = API_ENDPOINTS.SEMESTERS.BY_ID;

  /**
   * Get all semesters
   */
  static async getAllSemesters(): Promise<Semester[]> {
    try {
      const response = await ApiClient.get<Semester[]>(this.BASE_URL);
      return response.data;
    } catch {
      throw new Error('Failed to fetch semesters');
    }
  }

  /**
   * Get semester by ID
   */
  static async getSemesterById(id: number): Promise<Semester> {
    try {
      const response = await ApiClient.get<Semester>(this.BY_ID_URL(id));
      return response.data;
    } catch {
      throw new Error(`Failed to fetch semester ${id}`);
    }
  }

  /**
   * Create new semester
   */
  static async createSemester(data: CreateSemesterRequest): Promise<Semester> {
    try {
      const response = await ApiClient.post<Semester>(this.BASE_URL, data);
      return response.data;
    } catch {
      throw new Error('Failed to create semester');
    }
  }

  /**
   * Update semester
   */
  static async updateSemester(
    id: number,
    data: Partial<CreateSemesterRequest>
  ): Promise<Semester> {
    try {
      const response = await ApiClient.put<Semester>(this.BY_ID_URL(id), data);
      return response.data;
    } catch {
      throw new Error(`Failed to update semester ${id}`);
    }
  }

  /**
   * Delete semester
   */
  static async deleteSemester(id: number): Promise<void> {
    try {
      await ApiClient.delete(this.BY_ID_URL(id));
    } catch {
      throw new Error(`Failed to delete semester ${id}`);
    }
  }

  /**
   * Get active semesters
   */
  static async getActiveSemesters(): Promise<Semester[]> {
    try {
      const response = await ApiClient.get<Semester[]>(
        API_ENDPOINTS.SEMESTERS.ACTIVE
      );
      return response.data;
    } catch {
      throw new Error('Failed to fetch active semesters');
    }
  }
}

export default SemesterService;
