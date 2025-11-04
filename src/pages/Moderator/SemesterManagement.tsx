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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Pagination } from '@/components/ui/pagination';
import {
  Plus,
  Pencil,
  Trash2,
  Calendar,
  Eye,
  Search,
  X,
  ArrowUpDown,
} from 'lucide-react';
import { mockSemesters, type Semester } from './mockData';
import { useTableFeatures } from '@/hooks/useTableFeatures';

export function SemesterManagement() {
  const [semesters, setSemesters] = useState<Semester[]>(mockSemesters);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState<Semester | null>(
    null
  );
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    status: 'upcoming' as Semester['status'],
  });

  // Filter by status first
  const filteredData =
    statusFilter === 'all'
      ? semesters
      : semesters.filter(s => s.status === statusFilter);

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

  const getStatusBadge = (status: Semester['status']) => {
    const variants: Record<
      Semester['status'],
      { variant: any; label: string; color: string }
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

  const handleCreate = () => {
    const newSemester: Semester = {
      id: (semesters.length + 1).toString(),
      ...formData,
    };
    setSemesters([...semesters, newSemester]);
    setIsCreateOpen(false);
    setFormData({ name: '', startDate: '', endDate: '', status: 'upcoming' });
  };

  const handleEdit = () => {
    if (selectedSemester) {
      setSemesters(
        semesters.map(s =>
          s.id === selectedSemester.id
            ? { ...selectedSemester, ...formData }
            : s
        )
      );
      setIsEditOpen(false);
      setSelectedSemester(null);
    }
  };

  const handleDelete = () => {
    if (selectedSemester) {
      setSemesters(semesters.filter(s => s.id !== selectedSemester.id));
      setIsDeleteOpen(false);
      setSelectedSemester(null);
    }
  };

  const openEdit = (semester: Semester) => {
    setSelectedSemester(semester);
    setFormData({
      name: semester.name,
      startDate: semester.startDate,
      endDate: semester.endDate,
      status: semester.status,
    });
    setIsEditOpen(true);
  };

  const openView = (semester: Semester) => {
    setSelectedSemester(semester);
    setIsViewOpen(true);
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
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className='w-4 h-4 mr-2' />
          Thêm Kỳ học
        </Button>
      </div>
      <Card className='shadow-lg border border-gray-200'>
        <CardHeader className='bg-gradient-to-r from-primary to-gray-100'>
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
                      Thời gian
                      <ArrowUpDown className='w-4 h-4' />
                      {sortBy === 'startDate' && (
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

      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm Kỳ học mới</DialogTitle>
          </DialogHeader>
          <div className='space-y-4 py-4'>
            <div>
              <Label>Tên kỳ học</Label>
              <Input
                placeholder='VD: Fall 2025'
                value={formData.name}
                onChange={e =>
                  setFormData({ ...formData, name: e.target.value })
                }
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
                value={formData.status}
                onValueChange={(value: Semester['status']) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='upcoming'>Sắp diễn ra</SelectItem>
                  <SelectItem value='active'>Đang diễn ra</SelectItem>
                  <SelectItem value='finished'>Đã kết thúc</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setIsCreateOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleCreate}>Tạo mới</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa Kỳ học</DialogTitle>
          </DialogHeader>
          <div className='space-y-4 py-4'>
            <div>
              <Label>Tên kỳ học</Label>
              <Input
                value={formData.name}
                onChange={e =>
                  setFormData({ ...formData, name: e.target.value })
                }
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
                value={formData.status}
                onValueChange={(value: Semester['status']) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='upcoming'>Sắp diễn ra</SelectItem>
                  <SelectItem value='active'>Đang diễn ra</SelectItem>
                  <SelectItem value='finished'>Đã kết thúc</SelectItem>
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
