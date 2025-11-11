import {
  GroupTemplateService,
  type CreateGroupTemplateRequest,
  type UpdateGroupTemplateRequest,
} from '@/services/groupTemplateService';
import type { GroupTemplate } from '@/types/groupTemplate';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

export interface UseGroupTemplatesReturn {
  templates: GroupTemplate[];
  loading: boolean;
  error: string | null;
  loadTemplates: () => Promise<void>;
  createTemplate: (data: CreateGroupTemplateRequest) => Promise<void>;
  updateTemplate: (
    id: string,
    data: UpdateGroupTemplateRequest
  ) => Promise<void>;
  deleteTemplate: (id: string) => Promise<void>;
  getTemplateById: (id: string) => Promise<GroupTemplate | null>;
}

/**
 * Custom hook for managing group template operations
 */
export function useGroupTemplates(): UseGroupTemplatesReturn {
  const [templates, setTemplates] = useState<GroupTemplate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTemplates = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await GroupTemplateService.getAllTemplates();
      setTemplates(data);
    } catch {
      const errorMessage = 'Failed to load group templates';
      setError(errorMessage);
      toast.error('Lỗi khi tải danh sách template');
    } finally {
      setLoading(false);
    }
  }, []);

  const createTemplate = useCallback(
    async (data: CreateGroupTemplateRequest) => {
      try {
        setError(null);
        const newTemplate = await GroupTemplateService.createTemplate(data);
        setTemplates(prev => [...prev, newTemplate]);
        toast.success('Tạo template thành công');
      } catch (err) {
        const errorMessage = 'Failed to create group template';
        setError(errorMessage);
        toast.error('Lỗi khi tạo template');
        throw err;
      }
    },
    []
  );

  const updateTemplate = useCallback(
    async (id: string, data: UpdateGroupTemplateRequest) => {
      try {
        setError(null);
        const updatedTemplate = await GroupTemplateService.updateTemplate(
          id,
          data
        );
        setTemplates(prev =>
          prev.map(template =>
            template.id === id ? updatedTemplate : template
          )
        );
        toast.success('Cập nhật template thành công');
      } catch (err) {
        const errorMessage = 'Failed to update group template';
        setError(errorMessage);
        toast.error('Lỗi khi cập nhật template');
        throw err;
      }
    },
    []
  );

  const deleteTemplate = useCallback(async (id: string) => {
    try {
      setError(null);
      await GroupTemplateService.deleteTemplate(id);
      setTemplates(prev => prev.filter(template => template.id !== id));
      toast.success('Xóa template thành công');
    } catch (err) {
      const errorMessage = 'Failed to delete group template';
      setError(errorMessage);
      toast.error('Lỗi khi xóa template');
      throw err;
    }
  }, []);

  const getTemplateById = useCallback(
    async (id: string): Promise<GroupTemplate | null> => {
      try {
        setError(null);
        return await GroupTemplateService.getTemplateById(id);
      } catch {
        const errorMessage = 'Failed to get group template';
        setError(errorMessage);
        toast.error('Lỗi khi lấy thông tin template');
        return null;
      }
    },
    []
  );

  // Load templates on mount
  useEffect(() => {
    loadTemplates();
  }, [loadTemplates]);

  return {
    templates,
    loading,
    error,
    loadTemplates,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    getTemplateById,
  };
}
