import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { mockStudentsWithGroup, mockStudentsWithoutGroup } from './mockData';

export function StudentManagement() {
  const allStudents = [...mockStudentsWithGroup, ...mockStudentsWithoutGroup];
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold text-text-title'>
          Quản lý Sinh viên
        </h1>
        <p className='text-text-body mt-2'>
          Danh sách sinh viên trong hệ thống
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Danh sách Sinh viên</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên</TableHead>
                  <TableHead>MSSV</TableHead>
                  <TableHead>Lớp</TableHead>
                  <TableHead>Nhóm</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allStudents.map(s => (
                  <TableRow key={s.id}>
                    <TableCell className='font-medium'>{s.name}</TableCell>
                    <TableCell>{s.mssv}</TableCell>
                    <TableCell>{s.class}</TableCell>
                    <TableCell>{s.group || '-'}</TableCell>
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
