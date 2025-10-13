export interface Major {
  id: string;
  name: string;
  code: string;
  studentCount: number;
}

export const MAJORS: Major[] = [
  {
    id: '1',
    name: 'Công nghệ thông tin',
    code: 'IT',
    studentCount: 150,
  },
  {
    id: '2',
    name: 'Đồ họa',
    code: 'GD',
    studentCount: 80,
  },
  {
    id: '3',
    name: 'Ngôn ngữ Nhật',
    code: 'JP',
    studentCount: 60,
  },
  {
    id: '4',
    name: 'Ngôn ngữ Anh',
    code: 'EN',
    studentCount: 120,
  },
  {
    id: '5',
    name: 'Thiết kế Mỹ thuật số',
    code: 'DM',
    studentCount: 90,
  },
  {
    id: '6',
    name: 'Marketing',
    code: 'MK',
    studentCount: 70,
  },
];
