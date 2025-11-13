export type PostStatus = 'ACTIVE' | 'TRASHED' | 'DELETED';
export type PostType = 'GROUP_POST' | 'USER_POST';

type PostMajorInfo = {
  majorCode: string;
  quantity: number;
};

export interface CreateGroupPostRequest {
  title: string;
  postDetail?: string;
  postMajorRequests?: {
    majorId: number;
    studentNum: number;
  }[];
}

export interface CreateUserPostRequest {
  userId: string;
  title: string;
  postDetail?: string;
  postStatus: PostStatus;
}

export interface GroupPost {
  postId: string;
  authorName?: string;
  userId?: number;
  groupId?: string | null;
  title: string;
  postDetail?: string;
  postStatus: PostStatus;
  createdAt: string;
  postType?: PostType;
  postMajors?: PostMajorInfo[];
}
