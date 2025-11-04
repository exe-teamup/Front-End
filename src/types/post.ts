export type PostStatus = 'ACTIVE' | 'TRASHED' | 'DELETED';
export type PostType = 'GROUP_POST' | 'USER_POST';

type PostMajorInfo = {
  majorCode: string;
  quantity: number;
};

export interface GroupPost {
  postId: string;
  authorName: string;
  groupId: string;
  title: string;
  postDetail?: string;
  postStatus: PostStatus;
  createdAt: string;
  postType?: PostType;
  postMajors?: PostMajorInfo[];
}
