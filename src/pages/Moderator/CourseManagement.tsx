import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { mockCourses, mockSemesters } from './mockData';

export function CourseManagement() {
  const [selectedSemester, setSelectedSemester] = useState('all');
  const filteredCourses =
    selectedSemester === 'all'
      ? mockCourses
      : mockCourses.filter(c => c.semester === selectedSemester);

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold text-text-title'>Quản lý Lớp học</h1>
        <p className='text-text-body mt-2'>Danh sách lớp học theo kỳ học</p>
      </div>
      <Card>
        <CardHeader>
          <div className='flex justify-between items-center'>
            <CardTitle>Danh sách Lớp học</CardTitle>
            <Select
              value={selectedSemester}
              onValueChange={setSelectedSemester}
            >
              <SelectTrigger className='w-[200px]'>
                <SelectValue placeholder='Chọn kỳ học' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>Tất cả</SelectItem>
                {mockSemesters.map(s => (
                  <SelectItem key={s.id} value={s.name}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên lớp</TableHead>
                  <TableHead>Kỳ học</TableHead>
                  <TableHead>Giảng viên</TableHead>
                  <TableHead>Sĩ số</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.map(c => (
                  <TableRow key={c.id}>
                    <TableCell className='font-medium'>{c.name}</TableCell>
                    <TableCell>{c.semester}</TableCell>
                    <TableCell>{c.lecturer}</TableCell>
                    <TableCell>{c.studentCount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
