import { ApiClient } from '@/lib/axios';
import { API_ENDPOINTS } from '@/config/apiEndpoints';
import type {
  Course,
  CreateCourseFormData,
  UpdateCourseFormData,
  CourseQueryParams,
} from '@/schemas/course.schema';

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface CourseWithDetails extends Course {
  semesterCode: string;
  lecturerName: string;
}

export class CourseService {
  private static readonly BASE_URL = API_ENDPOINTS.COURSES.BASE;
  private static readonly BY_ID_URL = API_ENDPOINTS.COURSES.BY_ID;
  private static readonly IMPORT_URL = API_ENDPOINTS.COURSES.IMPORT;

  /**
   * Get all courses with pagination and filters
   */
  static async getAllCourses(
    params?: CourseQueryParams
  ): Promise<PaginatedResponse<CourseWithDetails>> {
    try {
      const response = await ApiClient.get<CourseWithDetails[]>(this.BASE_URL);
      const allCourses = response.data || [];

      // Client-side pagination
      const page = params?.page || 1;
      const limit = params?.limit || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;

      // Apply filters
      let filteredCourses = allCourses;

      if (params?.semesterId) {
        filteredCourses = filteredCourses.filter(
          course => course.semesterId === params.semesterId
        );
      }

      if (params?.search) {
        const searchTerm = params.search.toLowerCase();
        filteredCourses = filteredCourses.filter(
          course =>
            course.courseCode.toLowerCase().includes(searchTerm) ||
            (course.courseName &&
              course.courseName.toLowerCase().includes(searchTerm))
        );
      }

      // Apply pagination
      const paginatedCourses = filteredCourses.slice(startIndex, endIndex);

      return {
        data: paginatedCourses,
        pagination: {
          page,
          limit,
          total: filteredCourses.length,
          totalPages: Math.ceil(filteredCourses.length / limit),
        },
      };
    } catch {
      throw new Error('Failed to fetch courses');
    }
  }

  /**
   * Get courses by semester
   */
  static async getCoursesBySemester(
    semesterId: number,
    params?: Omit<CourseQueryParams, 'semesterId'>
  ): Promise<PaginatedResponse<CourseWithDetails>> {
    try {
      // Use getAllCourses with semesterId filter
      const page = params?.page ?? 1;
      const limit = params?.limit ?? 10;
      const search = params?.search;
      return await this.getAllCourses({ page, limit, semesterId, search });
    } catch {
      throw new Error(`Failed to fetch courses for semester ${semesterId}`);
    }
  }

  /**
   * Get course by ID
   */
  static async getCourseById(id: number): Promise<CourseWithDetails> {
    try {
      const response = await ApiClient.get<CourseWithDetails>(
        this.BY_ID_URL(id)
      );
      return response.data;
    } catch {
      throw new Error(`Failed to fetch course ${id}`);
    }
  }

  /**
   * Create new course
   */
  static async createCourse(data: CreateCourseFormData): Promise<Course> {
    try {
      const response = await ApiClient.post<Course>(this.BASE_URL, data);
      return response.data;
    } catch {
      throw new Error('Failed to create course');
    }
  }

  /**
   * Update course
   */
  static async updateCourse(
    id: number,
    data: UpdateCourseFormData
  ): Promise<Course> {
    try {
      const response = await ApiClient.put<Course>(this.BY_ID_URL(id), data);
      return response.data;
    } catch {
      throw new Error(`Failed to update course ${id}`);
    }
  }

  /**
   * Delete course
   */
  static async deleteCourse(id: number): Promise<void> {
    try {
      await ApiClient.delete(this.BY_ID_URL(id));
    } catch {
      throw new Error(`Failed to delete course ${id}`);
    }
  }

  /**
   * Import courses from file
   */
  static async importCourses(file: File): Promise<Course[]> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await ApiClient.post<Course[]>(
        this.IMPORT_URL,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch {
      throw new Error('Failed to import courses');
    }
  }

  /**
   * Get courses statistics
   */
  static async getCourseStats(semesterId?: number): Promise<{
    totalCourses: number;
    totalGroups: number;
    averageGroupsPerCourse: number;
  }> {
    try {
      const params = semesterId ? { semesterId } : {};
      const response = await ApiClient.get<{
        totalCourses: number;
        totalGroups: number;
        averageGroupsPerCourse: number;
      }>(`${this.BASE_URL}/stats`, params);
      return response.data;
    } catch {
      throw new Error('Failed to fetch course statistics');
    }
  }
}

export default CourseService;
