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
import { useSemesters } from '@/hooks';
import { useTableFeatures } from '@/hooks/useTableFeatures';
import type { Semester, semesterStatus } from '@/types/semester';
import {
  AlertCircle,
  ArrowUpDown,
  Calendar,
  Eye,
  Loader2,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from 'lucide-react';
import { useMemo, useState } from 'react';

// Type for UI status representation
type UIStatus = 'upcoming' | 'active' | 'finished';

// Type for transformed semester data to match component's expected format
type TransformedSemester = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: UIStatus;
  originalSemester: Semester;
};

export function SemesterManagement() {
  // Fetch real data using hook
  const {
    semesters: apiSemesters,
    loading,
    error,
    updateSemester,
    deleteSemester,
  } = useSemesters();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedSemester, setSelectedSemester] =
    useState<TransformedSemester | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [formData, setFormData] = useState({
    semesterCode: '',
    semesterName: '',
    startDate: '',
    endDate: '',
    semesterStatus: 'INACTIVE' as semesterStatus,
  });

  // Transform API data to match component's expected format
  const transformedSemesters = useMemo((): TransformedSemester[] => {
    return apiSemesters.map((semester): TransformedSemester => {
      // Map semesterStatus to component's status type
      let status: UIStatus;
      if (semester.semesterStatus === 'ACTIVE') {
        status = 'active';
      } else if (semester.semesterStatus === 'INACTIVE') {
        status = 'upcoming';
      } else {
        status = 'finished'; // COMPLETED
      }

      return {
        id: semester.semesterId.toString(),
        name: semester.semesterName || semester.semesterCode,
        startDate: semester.startDate,
        endDate: semester.endDate,
        status,
        originalSemester: semester,
      };
    });
  }, [apiSemesters]);

  // Filter by status first
  const filteredData = useMemo(() => {
    return statusFilter === 'all'
      ? transformedSemesters
      : transformedSemesters.filter(s => s.status === statusFilter);
  }, [transformedSemesters, statusFilter]);

  // Use table features hook
  const {
    paginatedData,
    totalItems,
    searchQuery,
    handleSearch,
    clearSearch,
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
    data: filteredData,
    itemsPerPage: 10,
    searchFields: ['name', 'startDate', 'endDate'],
    sortField: 'name',
  });

  const getStatusBadge = (status: UIStatus) => {
    const variants: Record<
      UIStatus,
      {
        variant: 'default' | 'secondary' | 'outline';
        label: string;
        color: string;
      }
    > = {
      active: {
        variant: 'default',
        label: 'Đang diễn ra',
        color: 'bg-green-100 text-green-800',
      },
      upcoming: {
        variant: 'secondary',
        label: 'Sắp diễn ra',
        color: 'bg-blue-100 text-blue-800',
      },
      finished: {
        variant: 'outline',
        label: 'Đã kết thúc',
        color: 'bg-gray-100 text-gray-800',
      },
    };
    return variants[status];
  };

  const handleEdit = async () => {
    if (selectedSemester) {
      try {
        const {
          semesterCode,
          semesterName,
          startDate,
          endDate,
          semesterStatus,
        } = formData;
        await updateSemester(selectedSemester.originalSemester.semesterId, {
          semesterCode,
          semesterName,
          startDate,
          endDate,
          semesterStatus,
        });

        setIsEditOpen(false);
        setSelectedSemester(null);
      } catch {
        // Error is handled by the hook with toast
      }
    }
  };

  const handleDelete = async () => {
    if (selectedSemester) {
      try {
        await deleteSemester(selectedSemester.originalSemester.semesterId);
        setIsDeleteOpen(false);
        setSelectedSemester(null);
      } catch {
        // Error is handled by the hook with toast
      }
    }
  };

  const openEdit = (semester: TransformedSemester) => {
    setSelectedSemester(semester);
    setFormData({
      semesterCode: semester.originalSemester.semesterCode,
      semesterName: semester.originalSemester.semesterName || '',
      startDate: semester.startDate,
      endDate: semester.endDate,
      semesterStatus: semester.originalSemester.semesterStatus,
    });
    setIsEditOpen(true);
  };

  const openView = (semester: TransformedSemester) => {
    setSelectedSemester(semester);
    setIsViewOpen(true);
  };

  const handleImport = () => {
    // Note: Implement Excel import functionality when backend endpoint is ready
    // This will require a file upload endpoint
  };

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bold text-text-title'>Quản lý Kỳ học</h1>
          <p className='text-text-body mt-2'>
            Quản lý thông tin các kỳ học trong hệ thống ({totalItems} kỳ học)
          </p>
        </div>
        <div className='flex gap-3'>
          <Button onClick={handleImport}>
            <Plus className='w-4 h-4 mr-2' />
            Thêm kỳ học (.xlsx)
          </Button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <Card className='border-red-200 bg-red-50'>
          <CardContent className='pt-6'>
            <div className='flex items-center gap-2 text-red-800'>
              <AlertCircle className='h-5 w-5' />
              <p className='font-medium'>
                {error || 'Có lỗi xảy ra khi tải dữ liệu'}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className='shadow-lg border border-gray-200'>
        <CardHeader className='bg-linear-to-r from-primary to-gray-100'>
          <CardTitle className='text-white'>
            Danh sách Kỳ học ({totalItems})
          </CardTitle>
        </CardHeader>
        <CardContent className='pt-6'>
          {/* Search & Filter Bar */}
          <div className='flex gap-4 mb-6'>
            <div className='flex-1 relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
              <Input
                placeholder='Tìm kiếm theo tên kỳ học, thời gian...'
                value={searchQuery}
                onChange={e => handleSearch(e.target.value)}
                className='pl-10 pr-10'
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
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
                <SelectItem value='all'>Tất cả</SelectItem>
                <SelectItem value='upcoming'>Sắp diễn ra</SelectItem>
                <SelectItem value='active'>Đang diễn ra</SelectItem>
                <SelectItem value='finished'>Đã kết thúc</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Loading State */}
          {loading && (
            <div className='flex justify-center items-center py-8 mb-6'>
              <Loader2 className='w-8 h-8 animate-spin text-primary' />
              <span className='ml-2 text-text-body'>Đang tải dữ liệu...</span>
            </div>
          )}

          {!loading && (
            <div className='rounded-md border'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead
                      className='cursor-pointer'
                      onClick={() => handleSort('name')}
                    >
                      <div className='flex items-center gap-2'>
                        Tên kỳ học
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
                      onClick={() => handleSort('startDate')}
                    >
                      <div className='flex items-center gap-2'>
                        Ngày bắt đầu
                        <ArrowUpDown className='w-4 h-4' />
                        {sortBy === 'startDate' && (
                          <span className='text-xs'>
                            {sortOrder === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </TableHead>
                    <TableHead
                      className='cursor-pointer'
                      onClick={() => handleSort('endDate')}
                    >
                      <div className='flex items-center gap-2'>
                        Ngày kết thúc
                        <ArrowUpDown className='w-4 h-4' />
                        {sortBy === 'endDate' && (
                          <span className='text-xs'>
                            {sortOrder === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className='text-right'>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.map(semester => (
                    <TableRow key={semester.id}>
                      <TableCell className='font-medium'>
                        {semester.name}
                      </TableCell>
                      <TableCell>
                        <div className='flex items-center gap-2'>
                          <Calendar className='w-4 h-4 text-gray-400' />
                          <span>{semester.startDate}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className='flex items-center gap-2'>
                          <Calendar className='w-4 h-4 text-gray-400' />
                          <span>{semester.endDate}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={getStatusBadge(semester.status).color}
                        >
                          {getStatusBadge(semester.status).label}
                        </Badge>
                      </TableCell>
                      <TableCell className='text-right'>
                        <div className='flex justify-end gap-2'>
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() => openView(semester)}
                          >
                            <Eye className='w-4 h-4' />
                          </Button>
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() => openEdit(semester)}
                          >
                            <Pencil className='w-4 h-4' />
                          </Button>
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() => {
                              setSelectedSemester(semester);
                              setIsDeleteOpen(true);
                            }}
                          >
                            <Trash2 className='w-4 h-4 text-red-600' />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
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

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa Kỳ học</DialogTitle>
          </DialogHeader>
          <div className='space-y-4 py-4'>
            <div>
              <Label>Mã kỳ học</Label>
              <Input
                value={formData.semesterCode}
                onChange={e =>
                  setFormData({ ...formData, semesterCode: e.target.value })
                }
                placeholder='Ví dụ: FALL2024'
              />
            </div>
            <div>
              <Label>Tên kỳ học</Label>
              <Input
                value={formData.semesterName}
                onChange={e =>
                  setFormData({ ...formData, semesterName: e.target.value })
                }
                placeholder='Ví dụ: Fall 2024'
              />
            </div>
            <div>
              <Label>Ngày bắt đầu</Label>
              <Input
                type='date'
                value={formData.startDate}
                onChange={e =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Ngày kết thúc</Label>
              <Input
                type='date'
                value={formData.endDate}
                onChange={e =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Trạng thái</Label>
              <Select
                value={formData.semesterStatus}
                onValueChange={(value: semesterStatus) =>
                  setFormData({ ...formData, semesterStatus: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='INACTIVE'>Sắp diễn ra</SelectItem>
                  <SelectItem value='ACTIVE'>Đang diễn ra</SelectItem>
                  <SelectItem value='COMPLETED'>Đã kết thúc</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setIsEditOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleEdit}>Lưu thay đổi</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa</DialogTitle>
          </DialogHeader>
          <p className='text-text-body'>
            Bạn có chắc chắn muốn xóa kỳ học{' '}
            <strong>{selectedSemester?.name}</strong>? Hành động này không thể
            hoàn tác.
          </p>
          <DialogFooter>
            <Button variant='outline' onClick={() => setIsDeleteOpen(false)}>
              Hủy
            </Button>
            <Button variant='destructive' onClick={handleDelete}>
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Detail Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chi tiết Kỳ học</DialogTitle>
          </DialogHeader>
          {selectedSemester && (
            <div className='space-y-4 py-4'>
              <div>
                <Label className='text-text-secondary'>Mã kỳ học</Label>
                <p className='text-text-title font-medium mt-1'>
                  {selectedSemester.originalSemester.semesterCode}
                </p>
              </div>
              <div>
                <Label className='text-text-secondary'>Tên kỳ học</Label>
                <p className='text-text-title font-medium mt-1'>
                  {selectedSemester.name}
                </p>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <Label className='text-text-secondary'>Ngày bắt đầu</Label>
                  <p className='text-text-title font-medium mt-1'>
                    {selectedSemester.startDate}
                  </p>
                </div>
                <div>
                  <Label className='text-text-secondary'>Ngày kết thúc</Label>
                  <p className='text-text-title font-medium mt-1'>
                    {selectedSemester.endDate}
                  </p>
                </div>
              </div>
              <div>
                <Label className='text-text-secondary'>Trạng thái</Label>
                <div className='mt-2'>
                  <Badge
                    variant={getStatusBadge(selectedSemester.status).variant}
                    className={getStatusBadge(selectedSemester.status).color}
                  >
                    {getStatusBadge(selectedSemester.status).label}
                  </Badge>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewOpen(false)}>Đóng</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
