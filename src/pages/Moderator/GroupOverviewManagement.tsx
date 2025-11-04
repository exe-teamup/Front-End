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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, UserPlus, X } from 'lucide-react';
import { mockGroups, mockLecturers, type Group } from './mockData';

export function GroupOverviewManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [assigningGroup, setAssigningGroup] = useState<Group | null>(null);
  const [selectedLecturer, setSelectedLecturer] = useState('');

  const filteredGroups = mockGroups.filter(group => {
    const matchesSearch =
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.leader.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || group.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAssignLecturer = () => {
    if (assigningGroup && selectedLecturer) {
      console.log(
        `Assigning ${selectedLecturer} to group ${assigningGroup.name}`
      );
      setAssigningGroup(null);
      setSelectedLecturer('');
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const getStatusBadge = (status: Group['status']) => {
    const variants: Record<
      Group['status'],
      { variant: any; label: string; color: string }
    > = {
      active: {
        variant: 'default',
        label: 'Đã phân công',
        color: 'bg-green-100 text-green-800',
      },
      pending: {
        variant: 'secondary',
        label: 'Chờ phân công',
        color: 'bg-yellow-100 text-yellow-800',
      },
      finished: {
        variant: 'outline',
        label: 'Hoàn thành',
        color: 'bg-blue-100 text-blue-800',
      },
    };
    return variants[status];
  };

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bold text-text-title'>Tổng quan Nhóm</h1>
          <p className='text-text-body mt-2'>
            Quản lý và phân công giảng viên hướng dẫn cho các nhóm
          </p>
        </div>
      </div>

      <Card className='shadow-lg border border-gray-200'>
        <CardHeader className='bg-gradient-to-r from-primary to-gray-100'>
          <CardTitle className='text-white'>
            Danh sách Nhóm ({filteredGroups.length})
          </CardTitle>
        </CardHeader>
        <CardContent className='pt-6'>
          {/* Advanced Search & Filters */}
          <div className='flex gap-4 mb-6'>
            <div className='flex-1 relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
              <Input
                placeholder='Tìm kiếm theo tên nhóm, đề tài, leader...'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className='pl-10 pr-10'
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
                >
                  <X className='w-4 h-4' />
                </button>
              )}
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className='w-[200px]'>
                <SelectValue placeholder='Trạng thái' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>Tất cả trạng thái</SelectItem>
                <SelectItem value='pending'>Chờ phân công</SelectItem>
                <SelectItem value='active'>Đã phân công</SelectItem>
                <SelectItem value='finished'>Hoàn thành</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant='outline'
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
              }}
            >
              Xóa bộ lọc
            </Button>
          </div>

          {/* Results count */}
          <div className='mb-4 text-sm text-text-body'>
            Hiển thị{' '}
            <span className='font-semibold'>{filteredGroups.length}</span> /{' '}
            {mockGroups.length} nhóm
          </div>

          {/* Table with hover effects */}
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nhóm</TableHead>
                  <TableHead>Leader</TableHead>
                  <TableHead>Số SV</TableHead>
                  <TableHead>Giảng viên</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className='text-right'>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGroups.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className='text-center py-8 text-text-body'
                    >
                      Không tìm thấy nhóm nào phù hợp
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredGroups.map(group => {
                    const statusInfo = getStatusBadge(group.status);
                    return (
                      <TableRow
                        key={group.id}
                        className='hover:bg-gray-50 transition-colors'
                      >
                        <TableCell className='font-medium text-text-title'>
                          {group.name}
                        </TableCell>
                        <TableCell className='text-text-body'>
                          {group.leader}
                        </TableCell>
                        <TableCell className='text-text-body'>
                          <span className='inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm'>
                            {group.members}
                          </span>
                        </TableCell>
                        <TableCell className='text-text-body'>
                          {group.lecturer ? (
                            <span className='font-medium'>
                              {group.lecturer}
                            </span>
                          ) : (
                            <span className='text-gray-400 italic'>
                              Chưa có
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant={statusInfo.variant}>
                            {statusInfo.label}
                          </Badge>
                        </TableCell>
                        <TableCell className='text-right'>
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() => setAssigningGroup(group)}
                            className='hover:bg-primary hover:text-white transition-colors'
                          >
                            <UserPlus className='w-4 h-4 mr-2' />
                            Phân công
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Assign Lecturer Dialog */}
      <Dialog
        open={!!assigningGroup}
        onOpenChange={() => setAssigningGroup(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Phân công Giảng viên</DialogTitle>
          </DialogHeader>
          <div className='space-y-4 py-4'>
            <div className='space-y-2'>
              <Label>Nhóm</Label>
              <Input value={assigningGroup?.name || ''} disabled />
            </div>
            <div className='space-y-2'>
              <Label>Leader</Label>
              <Input value={assigningGroup?.leader || ''} disabled />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='lecturer'>Chọn Giảng viên</Label>
              <Select
                value={selectedLecturer}
                onValueChange={setSelectedLecturer}
              >
                <SelectTrigger id='lecturer'>
                  <SelectValue placeholder='Chọn giảng viên' />
                </SelectTrigger>
                <SelectContent>
                  {mockLecturers.map(lecturer => (
                    <SelectItem key={lecturer.id} value={lecturer.id}>
                      {lecturer.name} - {lecturer.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setAssigningGroup(null)}>
              Hủy
            </Button>
            <Button onClick={handleAssignLecturer} disabled={!selectedLecturer}>
              Xác nhận
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
