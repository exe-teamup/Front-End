import type { Course } from './course';
import type { GroupTemplate } from './groupTemplate';

export type GroupStatus = 'ACTIVE' | 'INACTIVE' | 'LOCKED';

export interface CreateGroupRequest {
  courseId: string;
  groupName: string;
  studentId: string;
  groupTemplateId: number;
  memberEmails: string[];
}

export interface Group {
  groupId: string;
  groupName: string;
  leader: GroupMember;
  members: GroupMember[];
  templates?: Partial<GroupTemplate>;
  memberCount: number;
  groupStatus: GroupStatus;
  course: Partial<Course>;
}

export interface GroupMember {
  studentId: string;
  studentName: string;
  isLeader?: boolean;
  majorName?: string;
}
