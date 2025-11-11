import { LecturerService, type Lecturer } from '@/services/lectureService';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type LoadingStatus = 'idle' | 'loading' | 'success' | 'error';

interface UseLecturersReturn {
  lecturers: Lecturer[];
  isLoading: boolean;
  error?: string;
  refetch: () => Promise<void>;
  updateLecturer: (id: number, data: Partial<Lecturer>) => Promise<void>;
  deleteLecturer: (id: number) => Promise<void>;
  uploadLecturers: (file: File) => Promise<void>;
}

/**
 * Custom hook to fetch and manage lecturers data
 *
 * @returns Object containing lecturers data, loading state, error, and CRUD functions
 */
export const useLecturers = (): UseLecturersReturn => {
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [status, setStatus] = useState<LoadingStatus>('idle');
  const [error, setError] = useState<string>();

  const fetchLecturers = async () => {
    setStatus('loading');
    setError(undefined);

    try {
      const data = await LecturerService.getAllLecturers();
      setLecturers(data);
      setStatus('success');
    } catch (e) {
      const message =
        e instanceof Error ? e.message : 'Failed to fetch lecturers';
      setError(message);
      setStatus('error');
    }
  };

  const updateLecturer = async (id: number, data: Partial<Lecturer>) => {
    try {
      await LecturerService.updateLecturer(id, data);
      toast.success('Cập nhật giảng viên thành công');
      await fetchLecturers();
    } catch (e) {
      const message =
        e instanceof Error ? e.message : 'Failed to update lecturer';
      toast.error(`Lỗi: ${message}`);
      throw e;
    }
  };

  const deleteLecturer = async (id: number) => {
    try {
      await LecturerService.deleteLecturer(id);
      toast.success('Xóa giảng viên thành công');
      await fetchLecturers();
    } catch (e) {
      const message =
        e instanceof Error ? e.message : 'Failed to delete lecturer';
      toast.error(`Lỗi: ${message}`);
      throw e;
    }
  };

  const uploadLecturers = async (file: File) => {
    try {
      await LecturerService.uploadLecturers(file);
      toast.success('Upload giảng viên thành công');
      await fetchLecturers();
    } catch (e) {
      const message =
        e instanceof Error ? e.message : 'Failed to upload lecturers';
      toast.error(`Lỗi: ${message}`);
      throw e;
    }
  };

  useEffect(() => {
    fetchLecturers();
  }, []);

  return {
    lecturers,
    isLoading: status === 'loading',
    error,
    refetch: fetchLecturers,
    updateLecturer,
    deleteLecturer,
    uploadLecturers,
  };
};
