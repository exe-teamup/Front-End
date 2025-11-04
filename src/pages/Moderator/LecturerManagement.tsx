import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { mockLecturers } from './mockData';

export function LecturerManagement() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold text-text-title'>
          Quản lý Giảng viên
        </h1>
        <p className='text-text-body mt-2'>
          Danh sách giảng viên trong hệ thống
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Danh sách Giảng viên</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Quota</TableHead>
                  <TableHead>Đang hướng dẫn</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockLecturers.map(l => (
                  <TableRow key={l.id}>
                    <TableCell className='font-medium'>{l.name}</TableCell>
                    <TableCell>{l.email}</TableCell>
                    <TableCell>{l.quota}</TableCell>
                    <TableCell>{l.currentGroups} nhóm</TableCell>
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
