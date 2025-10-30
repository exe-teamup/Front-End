export interface Major {
  majorId: string;
  majorName: string;
  majorCode: string;
  parentMajorId?: string;
  parentMajorName?: string;
  level?: number;
  majorStatus: boolean;
}
