import { ApiClient } from '@/lib/axios';
import type { GroupTemplate } from '@/types/groupTemplate';

export interface CreateGroupTemplateRequest {
  minMember: number;
  maxMember: number;
  minMajor: number;
  template?: string;
}

export interface UpdateGroupTemplateRequest {
  minMember?: number;
  maxMember?: number;
  minMajor?: number;
  template?: string;
}

export class GroupTemplateService {
  private static readonly BASE_URL = '/group-templates';

  /**
   * Get all group templates
   */
  static async getAllTemplates(): Promise<GroupTemplate[]> {
    try {
      const response = await ApiClient.get<GroupTemplate[]>(this.BASE_URL);
      return response.data;
    } catch {
      throw new Error('Failed to fetch group templates');
    }
  }

  /**
   * Get group template by ID
   */
  static async getTemplateById(id: string): Promise<GroupTemplate> {
    try {
      const response = await ApiClient.get<GroupTemplate>(
        `${this.BASE_URL}/${id}`
      );
      return response.data;
    } catch {
      throw new Error(`Failed to fetch group template ${id}`);
    }
  }

  /**
   * Create new group template
   */
  static async createTemplate(
    data: CreateGroupTemplateRequest
  ): Promise<GroupTemplate> {
    try {
      const response = await ApiClient.post<GroupTemplate>(this.BASE_URL, data);
      return response.data;
    } catch {
      throw new Error('Failed to create group template');
    }
  }

  /**
   * Update group template
   */
  static async updateTemplate(
    id: string,
    data: UpdateGroupTemplateRequest
  ): Promise<GroupTemplate> {
    try {
      const response = await ApiClient.put<GroupTemplate>(
        `${this.BASE_URL}/${id}`,
        data
      );
      return response.data;
    } catch {
      throw new Error(`Failed to update group template ${id}`);
    }
  }

  /**
   * Delete group template
   */
  static async deleteTemplate(id: string): Promise<void> {
    try {
      await ApiClient.delete(`${this.BASE_URL}/${id}`);
    } catch {
      throw new Error(`Failed to delete group template ${id}`);
    }
  }
}

export default GroupTemplateService;
