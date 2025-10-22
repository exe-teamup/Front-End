import { useState, useEffect, useCallback } from 'react';
import {
  SemesterService,
  type CreateSemesterRequest,
  type UpdateSemesterRequest,
} from '@/services/semesterService';
import type { Semester } from '@/types/semester';
import { toast } from 'sonner';
export interface UseSemestersReturn {
  semesters: Semester[];
  loading: boolean;
  error: string | null;
  loadSemesters: () => Promise<void>;
  createSemester: (data: CreateSemesterRequest) => Promise<void>;
  updateSemester: (id: number, data: UpdateSemesterRequest) => Promise<void>;
  deleteSemester: (id: number) => Promise<void>;
  getSemesterById: (id: number) => Promise<Semester | null>;
}

/**
 * Custom hook for managing semester operations
 */
export function useSemesters(): UseSemestersReturn {
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSemesters = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await SemesterService.getAllSemesters();
      setSemesters(data);
    } catch {
      const errorMessage = 'Failed to load semesters';
      setError(errorMessage);
      toast.error('Lỗi khi tải danh sách kỳ học');
    } finally {
      setLoading(false);
    }
  }, []);

  const createSemester = useCallback(async (data: CreateSemesterRequest) => {
    try {
      setError(null);
      const newSemester = await SemesterService.createSemester(data);
      setSemesters(prev => [...prev, newSemester]);
      toast.success('Tạo kỳ học thành công');
    } catch (err) {
      const errorMessage = 'Failed to create semester';
      setError(errorMessage);
      toast.error('Lỗi khi tạo kỳ học');
      throw err;
    }
  }, []);

  const updateSemester = useCallback(
    async (id: number, data: UpdateSemesterRequest) => {
      try {
        setError(null);
        const updatedSemester = await SemesterService.updateSemester(id, data);
        setSemesters(prev =>
          prev.map(semester =>
            semester.semesterId === id ? updatedSemester : semester
          )
        );
        toast.success('Cập nhật kỳ học thành công');
      } catch (err) {
        const errorMessage = 'Failed to update semester';
        setError(errorMessage);
        toast.error('Lỗi khi cập nhật kỳ học');
        throw err;
      }
    },
    []
  );

  const deleteSemester = useCallback(async (id: number) => {
    try {
      setError(null);
      await SemesterService.deleteSemester(id);
      setSemesters(prev => prev.filter(semester => semester.semesterId !== id));
      toast.success('Xóa kỳ học thành công');
    } catch (err) {
      const errorMessage = 'Failed to delete semester';
      setError(errorMessage);
      toast.error('Lỗi khi xóa kỳ học');
      throw err;
    }
  }, []);

  const getSemesterById = useCallback(
    async (id: number): Promise<Semester | null> => {
      try {
        setError(null);
        return await SemesterService.getSemesterById(id);
      } catch {
        const errorMessage = 'Failed to get semester';
        setError(errorMessage);
        toast.error('Lỗi khi lấy thông tin kỳ học');
        return null;
      }
    },
    []
  );

  // Load semesters on mount
  useEffect(() => {
    loadSemesters();
  }, [loadSemesters]);

  return {
    semesters,
    loading,
    error,
    loadSemesters,
    createSemester,
    updateSemester,
    deleteSemester,
    getSemesterById,
  };
}
