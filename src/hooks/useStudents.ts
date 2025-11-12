import type { Student } from '@/services/studentService';
import { StudentService } from '@/services/studentService';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export function useStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStudents = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await StudentService.getAllStudents();
      setStudents(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch students';
      setError(errorMessage);
      toast.error('Lỗi tải dữ liệu', {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const updateStudent = async (id: number, data: Partial<Student>) => {
    try {
      await StudentService.updateStudent(id, data);
      toast.success('Cập nhật thành công', {
        description: 'Thông tin sinh viên đã được cập nhật',
      });
      await fetchStudents();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to update student';
      toast.error('Cập nhật thất bại', {
        description: errorMessage,
      });
      throw err;
    }
  };

  const deleteStudent = async (id: number) => {
    try {
      await StudentService.deleteStudent(id);
      toast.success('Xóa thành công', {
        description: 'Sinh viên đã được xóa khỏi hệ thống',
      });
      await fetchStudents();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to delete student';
      toast.error('Xóa thất bại', {
        description: errorMessage,
      });
      throw err;
    }
  };

  const uploadStudents = async (file: File, isEligible: boolean = true) => {
    try {
      const uploadFn = isEligible
        ? StudentService.uploadStudents
        : StudentService.uploadStudentsNotEligible;

      const result = await uploadFn(file);
      toast.success('Thêm sinh viên thành công', {
        description: `Đã thêm ${result.length} sinh viên từ file Excel`,
      });
      await fetchStudents();
      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to upload students';
      toast.error('Thêm sinh viên thất bại', {
        description: errorMessage,
      });
      throw err;
    }
  };

  return {
    students,
    isLoading,
    error,
    refetch: fetchStudents,
    updateStudent,
    deleteStudent,
    uploadStudents,
  };
}
