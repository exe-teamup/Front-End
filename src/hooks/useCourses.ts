import type { UpdateCourseFormData } from '@/schemas/course.schema';
import { CourseService } from '@/services/courseService';
import type { Course } from '@/types/course';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type LoadingStatus = 'idle' | 'loading' | 'success' | 'error';

interface UseCoursesReturn {
  courses: Course[];
  isLoading: boolean;
  error?: string;
  refetch: () => Promise<void>;
  updateCourse: (id: number, data: Partial<Course>) => Promise<void>;
  deleteCourse: (id: number) => Promise<void>;
  uploadCourses: (file: File) => Promise<void>;
}

/**
 * Custom hook to fetch and manage courses data
 *
 * @returns Object containing courses data, loading state, error, and CRUD functions
 */
export const useCourses = (): UseCoursesReturn => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [status, setStatus] = useState<LoadingStatus>('idle');
  const [error, setError] = useState<string>();

  const fetchCourses = async () => {
    setStatus('loading');
    setError(undefined);

    try {
      const response = await CourseService.getAllCourses({
        page: 1,
        limit: 1000,
      });
      setCourses(response.data);
      setStatus('success');
    } catch (e) {
      const message =
        e instanceof Error ? e.message : 'Failed to fetch courses';
      setError(message);
      setStatus('error');
    }
  };

  const updateCourse = async (id: number, data: Partial<Course>) => {
    try {
      await CourseService.updateCourse(id, data as UpdateCourseFormData);
      toast.success('Cập nhật lớp học thành công');
      await fetchCourses();
    } catch (e) {
      const message =
        e instanceof Error ? e.message : 'Failed to update course';
      toast.error(`Lỗi: ${message}`);
      throw e;
    }
  };

  const deleteCourse = async (id: number) => {
    try {
      await CourseService.deleteCourse(id);
      toast.success('Xóa lớp học thành công');
      await fetchCourses();
    } catch (e) {
      const message =
        e instanceof Error ? e.message : 'Failed to delete course';
      toast.error(`Lỗi: ${message}`);
      throw e;
    }
  };

  const uploadCourses = async (file: File) => {
    try {
      await CourseService.importCourses(file);
      toast.success('Upload lớp học thành công');
      await fetchCourses();
    } catch (e) {
      const message =
        e instanceof Error ? e.message : 'Failed to upload courses';
      toast.error(`Lỗi: ${message}`);
      throw e;
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return {
    courses,
    isLoading: status === 'loading',
    error,
    refetch: fetchCourses,
    updateCourse,
    deleteCourse,
    uploadCourses,
  };
};
