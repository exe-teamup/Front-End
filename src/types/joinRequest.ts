export type RequestStatus = 'PENDING' | 'APPROVED' | 'DENIED' | 'WITHDRAWN';
export type RequestType = 'GROUP_INVITATION' | 'STUDENT_REQUEST';

export interface JoinRequestResponse {
  id: number;
  studentId: number;
  groupId: number;
  createdAt: string;
  requestStatus: RequestStatus;
  denyReason: string | null;
  requestType: RequestType;
}

export interface JoinRequest {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  majorName?: string;
  groupId: string;
  groupName: string;
  requestType: RequestType;
  status: RequestStatus;
  createdAt: string;
  updatedAt?: string;
}

export interface ApproveRejectRequest {
  requestId: string;
  action: 'APPROVE' | 'REJECT';
}
