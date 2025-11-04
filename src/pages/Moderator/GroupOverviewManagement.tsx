import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, UserPlus } from 'lucide-react';
import { mockGroups, type Group } from './mockData';

export function GroupOverviewManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredGroups = mockGroups.filter(group => {
    const matchesSearch =
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.leader.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || group.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Group['status']) => {
    const variants: Record<Group['status'], { variant: any; label: string }> = {
      active: { variant: 'default', label: 'Đã phân công' },
      pending: { variant: 'secondary', label: 'Chờ phân công' },
      finished: { variant: 'outline', label: 'Hoàn thành' },
    };
    return variants[status];
  };

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold text-text-title'>Tổng quan Nhóm</h1>
        <p className='text-text-body mt-2'>
          Quản lý và phân công giảng viên hướng dẫn cho các nhóm
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Danh sách Nhóm</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex gap-4 mb-6'>
            <div className='flex-1 relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
              <Input
                placeholder='Tìm kiếm theo tên nhóm hoặc đề tài...'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className='pl-10'
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className='w-[200px]'>
                <SelectValue placeholder='Trạng thái' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>Tất cả</SelectItem>
                <SelectItem value='pending'>Chờ phân công</SelectItem>
                <SelectItem value='assigned'>Đã phân công</SelectItem>
                <SelectItem value='completed'>Hoàn thành</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nhóm</TableHead>
                  <TableHead>Đề tài</TableHead>
                  <TableHead>Số SV</TableHead>
                  <TableHead>Giảng viên</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className='text-right'>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGroups.map(group => (
                  <TableRow key={group.id}>
                    <TableCell className='font-medium'>{group.name}</TableCell>
                    <TableCell className='max-w-xs truncate'>
                      {group.leader}
                    </TableCell>
                    <TableCell>{group.members}</TableCell>
                    <TableCell>{group.lecturer || '-'}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadge(group.status).variant}>
                        {getStatusBadge(group.status).label}
                      </Badge>
                    </TableCell>
                    <TableCell className='text-right'>
                      <Button variant='outline' size='sm'>
                        <UserPlus className='w-4 h-4 mr-2' />
                        Phân công
                      </Button>
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
