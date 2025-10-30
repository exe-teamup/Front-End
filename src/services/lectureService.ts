import { ApiClient } from '@/lib/axios';
import { API_ENDPOINTS } from '@/config/apiEndpoints';

export interface Lecturer {
  lecturerId: number;
  lecturerName: string;
  lecturerStatus: 'ACTIVE' | 'INACTIVE';
  accountStatus: 'ACTIVE' | 'INACTIVE';
  accountId: number;
  course: {
    courseId?: number;
    courseCode?: string;
  };
  email: string;
  avatar?: string;
}

export interface LecturerUploadResponse {
  lecturerId: number;
  lecturerName: string;
  lecturerStatus: 'ACTIVE';
  accountStatus: 'ACTIVE';
  accountId: number;
}

export class LecturerService {
  private static readonly BASE_URL = API_ENDPOINTS.LECTURERS.BASE;
  private static readonly BY_ID_URL = API_ENDPOINTS.LECTURERS.BY_ID;

  /**
   * Get all lecturers
   */
  static async getAllLecturers(): Promise<Lecturer[]> {
    try {
      const response = await ApiClient.get<Lecturer[]>(this.BASE_URL);
      return response.data;
    } catch {
      throw new Error('Failed to fetch lecturers');
    }
  }

  /**
   * Get lecturer by ID
   */
  static async getLecturerById(id: number): Promise<Lecturer> {
    try {
      const response = await ApiClient.get<Lecturer>(this.BY_ID_URL(id));
      return response.data;
    } catch {
      throw new Error(`Failed to fetch lecturer ${id}`);
    }
  }

  /**
   * Upload lecturers from Excel file
   */
  static async uploadLecturers(file: File): Promise<LecturerUploadResponse[]> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await ApiClient.post<LecturerUploadResponse[]>(
        this.BASE_URL,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch {
      throw new Error('Failed to upload lecturers');
    }
  }

  /**
   * Update lecturer
   */
  static async updateLecturer(
    id: number,
    data: Partial<Lecturer>
  ): Promise<Lecturer> {
    try {
      const response = await ApiClient.put<Lecturer>(this.BY_ID_URL(id), data);
      return response.data;
    } catch {
      throw new Error(`Failed to update lecturer ${id}`);
    }
  }

  /**
   * Delete lecturer
   */
  static async deleteLecturer(id: number): Promise<void> {
    try {
      await ApiClient.delete(this.BY_ID_URL(id));
    } catch {
      throw new Error(`Failed to delete lecturer ${id}`);
    }
  }
}

export default LecturerService;
