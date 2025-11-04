import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2, Calendar } from 'lucide-react';
import { mockSemesters, type Semester } from './mockData';

export function SemesterManagement() {
  const [semesters] = useState<Semester[]>(mockSemesters);

  const getStatusBadge = (status: Semester['status']) => {
    const variants: Record<
      Semester['status'],
      { variant: any; label: string }
    > = {
      active: { variant: 'default', label: 'Đang diễn ra' },
      upcoming: { variant: 'secondary', label: 'Sắp diễn ra' },
      finished: { variant: 'outline', label: 'Đã kết thúc' },
    };
    return variants[status];
  };

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bold text-text-title'>Quản lý Kỳ học</h1>
          <p className='text-text-body mt-2'>
            Quản lý thông tin các kỳ học trong hệ thống
          </p>
        </div>
        <Button>
          <Plus className='w-4 h-4 mr-2' />
          Thêm Kỳ học
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Danh sách Kỳ học</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên kỳ học</TableHead>
                  <TableHead>Thời gian</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className='text-right'>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {semesters.map(semester => (
                  <TableRow key={semester.id}>
                    <TableCell className='font-medium'>
                      {semester.name}
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center gap-2'>
                        <Calendar className='w-4 h-4 text-gray-400' />
                        <span>
                          {semester.startDate} - {semester.endDate}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadge(semester.status).variant}>
                        {getStatusBadge(semester.status).label}
                      </Badge>
                    </TableCell>
                    <TableCell className='text-right'>
                      <div className='flex justify-end gap-2'>
                        <Button variant='outline' size='sm'>
                          <Pencil className='w-4 h-4' />
                        </Button>
                        <Button variant='outline' size='sm'>
                          <Trash2 className='w-4 h-4' />
                        </Button>
                      </div>
                    </TableCell>
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
