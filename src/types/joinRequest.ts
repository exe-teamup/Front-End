export type RequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export type RequestType = 'GROUP_INVITATION' | 'STUDENT_REQUEST';

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
