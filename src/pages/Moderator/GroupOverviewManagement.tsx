import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pagination } from '@/components/ui/pagination';
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
import { useGroups, useLecturers } from '@/hooks';
import { useTableFeatures } from '@/hooks/useTableFeatures';
import type { Group } from '@/types/group';
import {
  AlertCircle,
  ArrowUpDown,
  Loader2,
  Search,
  UserPlus,
  X,
} from 'lucide-react';
import { useMemo, useState } from 'react';

// Type for transformed group data to match component's expected format
type TransformedGroup = {
  id: string;
  name: string;
  leader: string;
  leaderEmail: string;
  members: string;
  status: 'pending' | 'active' | 'finished';
  lecturer?: string;
  majorNames: string[];
  originalGroup: Group; // Keep reference to original group
};

export function GroupOverviewManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [assigningGroup, setAssigningGroup] = useState<TransformedGroup | null>(
    null
  );
  const [selectedLecturer, setSelectedLecturer] = useState('');

  // Fetch real data using hooks
  const { allGroups, isLoadingAllGroups, allGroupsError, refetchAllGroups } =
    useGroups();
  const {
    lecturers,
    isLoading: isLoadingLecturers,
    error: lecturersError,
  } = useLecturers();

  // Transform real API data to match component's expected format
  const transformedGroups = useMemo(() => {
    return allGroups.map((group): TransformedGroup => {
      // Map GroupStatus to component's status type
      let status: 'pending' | 'active' | 'finished';
      if (group.groupStatus === 'ACTIVE') {
        status = 'active';
      } else if (group.groupStatus === 'INACTIVE') {
        status = 'pending';
      } else {
        status = 'finished';
      }

      return {
        id: group.groupId,
        name: group.groupName,
        leader: group.leader.studentName,
        leaderEmail: '', // API doesn't provide this yet
        members: group.memberCount.toString(),
        status,
        lecturer: undefined, // Note: Add lecturer info when API supports it
        majorNames: group.members
          .map(m => m.majorName)
          .filter((v, i, a) => v && a.indexOf(v) === i) as string[],
        originalGroup: group,
      };
    });
  }, [allGroups]);

  // Filter by status and search
  const filteredByStatus = useMemo(() => {
    return transformedGroups.filter(group => {
      const matchesSearch =
        group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.leader.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === 'all' || group.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [transformedGroups, searchQuery, statusFilter]);

  // Use table features hook for pagination and sorting
  const {
    paginatedData,
    totalItems,
    sortBy,
    sortOrder,
    handleSort,
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    itemsPerPage,
    handlePageChange,
  } = useTableFeatures({
    data: filteredByStatus,
    itemsPerPage: 10,
    searchFields: [],
    sortField: 'name',
  });

  const handleAssignLecturer = async () => {
    if (assigningGroup && selectedLecturer) {
      // Note: Implement API call to assign lecturer to group when endpoint is available
      // Example: await GroupService.assignLecturer(assigningGroup.id, selectedLecturer);

      // For now, just close the dialog and refetch data
      setAssigningGroup(null);
      setSelectedLecturer('');

      // Refetch groups to get updated data
      await refetchAllGroups();
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const getStatusBadge = (status: 'pending' | 'active' | 'finished') => {
    const variants: Record<
      'pending' | 'active' | 'finished',
      {
        variant: 'default' | 'secondary' | 'outline';
        label: string;
        color: string;
      }
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

  // Calculate loading and error states
  const isLoading = isLoadingAllGroups || isLoadingLecturers;
  const hasError = !!allGroupsError || !!lecturersError;

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

      {/* Error Alert */}
      {hasError && (
        <Card className='border-red-200 bg-red-50'>
          <CardContent className='pt-6'>
            <div className='flex items-center gap-2 text-red-800'>
              <AlertCircle className='h-5 w-5' />
              <p className='font-medium'>
                {allGroupsError ||
                  lecturersError ||
                  'Có lỗi xảy ra khi tải dữ liệu'}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className='shadow-lg border border-gray-200'>
        <CardHeader className='bg-gradient-to-r from-primary to-gray-100'>
          <CardTitle className='text-white'>
            Danh sách Nhóm ({totalItems})
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
            Hiển thị <span className='font-semibold'>{totalItems}</span> /{' '}
            {transformedGroups.length} nhóm
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className='flex justify-center items-center py-8'>
              <Loader2 className='w-8 h-8 animate-spin text-primary' />
              <span className='ml-2 text-text-body'>Đang tải dữ liệu...</span>
            </div>
          )}

          {/* Table with hover effects */}
          {!isLoading && (
            <div className='rounded-md border'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead
                      className='cursor-pointer'
                      onClick={() => handleSort('name')}
                    >
                      <div className='flex items-center gap-2'>
                        Nhóm
                        <ArrowUpDown className='w-4 h-4' />
                        {sortBy === 'name' && (
                          <span className='text-xs'>
                            {sortOrder === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </TableHead>
                    <TableHead
                      className='cursor-pointer'
                      onClick={() => handleSort('leader')}
                    >
                      <div className='flex items-center gap-2'>
                        Leader
                        <ArrowUpDown className='w-4 h-4' />
                        {sortBy === 'leader' && (
                          <span className='text-xs'>
                            {sortOrder === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </TableHead>
                    <TableHead>Số SV</TableHead>
                    <TableHead>Giảng viên</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className='text-right'>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className='text-center py-8 text-text-body'
                      >
                        Không tìm thấy nhóm nào phù hợp
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedData.map(group => {
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
          )}

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={totalItems}
            startIndex={startIndex}
            endIndex={endIndex}
            itemsPerPage={itemsPerPage}
          />
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
                  {lecturers
                    .filter(lecturer => lecturer.lecturerStatus === 'ACTIVE')
                    .map(lecturer => (
                      <SelectItem
                        key={lecturer.lecturerId}
                        value={lecturer.lecturerId.toString()}
                      >
                        {lecturer.lecturerName} - {lecturer.email}
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
