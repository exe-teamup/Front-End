import { ApiClient } from '@/lib/axios';
import { API_ENDPOINTS } from '@/config/apiEndpoints';
import { getErrorMessage } from '@/utils/errorHandler';

export interface Student {
  courseId: number;
  userId: number;
  accountId: number;
  fullName: string;
  email: string;
  userCode: string;
  phoneNumber: string;
  bio: string;
  createdAt: string;
  isLeader: boolean;
  userStatus: 'ELIGIBLE' | 'NOT_ELIGIBLE' | 'INACTIVE';
  groupId?: number | null;
  groupName?: string | null;
  majorId: number;
  majorName: string;
  avatar?: string;
}

export interface StudentUploadResponse {
  userId: number;
  fullName: string;
  userCode: string;
  email: string;
  userStatus: 'ELIGIBLE' | 'NOT_ELIGIBLE';
}

export class StudentService {
  private static readonly BASE_URL = API_ENDPOINTS.STUDENTS.BASE;
  private static readonly BY_ID_URL = API_ENDPOINTS.STUDENTS.BY_ID;

  /**
   * Get all students
   */
  static async getAllStudents(): Promise<Student[]> {
    try {
      const response = await ApiClient.get<Student[]>(this.BASE_URL);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  /**
   * Get student by ID
   */
  static async getStudentById(id: number): Promise<Student> {
    try {
      const response = await ApiClient.get<Student>(this.BY_ID_URL(id));
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  /**
   * Upload students from Excel file (eligible)
   */
  static async uploadStudents(file: File): Promise<StudentUploadResponse[]> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await ApiClient.post<StudentUploadResponse[]>(
        `${this.BASE_URL}/import`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  /**
   * Upload students from Excel file (not eligible)
   */
  static async uploadStudentsNotEligible(
    file: File
  ): Promise<StudentUploadResponse[]> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await ApiClient.post<StudentUploadResponse[]>(
        `${this.BASE_URL}/import-not-eligible`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  /**
   * Update student (only for status changes)
   */
  static async updateStudent(
    id: number,
    data: Partial<Student>
  ): Promise<Student> {
    try {
      const response = await ApiClient.put<Student>(this.BY_ID_URL(id), data);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  /**
   * Delete student (inactive account)
   */
  static async deleteStudent(id: number): Promise<void> {
    try {
      await ApiClient.delete(this.BY_ID_URL(id));
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }
}

export default StudentService;
