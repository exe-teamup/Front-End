import { useState } from 'react';
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
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
  Eye,
  Search,
  X,
  ArrowUpDown,
  Download,
  User,
} from 'lucide-react';
import { mockLecturers, type Lecturer } from './mockData';
import { useTableFeatures } from '@/hooks/useTableFeatures';
import { Badge } from '@/components/ui/badge';

export function LecturerManagement() {
  const [lecturers, setLecturers] = useState(mockLecturers);
  const [classFilter, setClassFilter] = useState<string>('all'); // Filter theo lớp
  const [statusFilter, setStatusFilter] = useState<string>('all'); // Filter theo trạng thái
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedLecturer, setSelectedLecturer] = useState<Lecturer | null>(
    null
  );
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    quota: 0,
    currentGroups: 0,
    classCode: '',
    status: 'ACTIVE' as Lecturer['status'],
  });

  // Get unique classes for filter
  const uniqueClasses = Array.from(
    new Set(lecturers.map(l => l.classCode).filter(Boolean))
  ).sort();

  // Multi-level filtering
  let filteredData = lecturers;

  // Filter by class
  if (classFilter !== 'all') {
    filteredData = filteredData.filter(l => l.classCode === classFilter);
  }

  // Filter by status
  if (statusFilter !== 'all') {
    filteredData = filteredData.filter(l => l.status === statusFilter);
  }

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
    searchFields: ['name', 'email'],
    sortField: 'name',
  });

  const handleEdit = () => {
    if (selectedLecturer) {
      setLecturers(
        lecturers.map(l =>
          l.id === selectedLecturer.id
            ? { ...selectedLecturer, ...formData }
            : l
        )
      );
      setIsEditOpen(false);
      setSelectedLecturer(null);
    }
  };

  const handleDelete = () => {
    if (selectedLecturer) {
      setLecturers(lecturers.filter(l => l.id !== selectedLecturer.id));
      setIsDeleteOpen(false);
      setSelectedLecturer(null);
    }
  };

  const openEdit = (lecturer: Lecturer) => {
    setSelectedLecturer(lecturer);
    setFormData({
      name: lecturer.name,
      email: lecturer.email,
      quota: lecturer.quota,
      currentGroups: lecturer.currentGroups,
      classCode: lecturer.classCode || '',
      status: lecturer.status || 'ACTIVE',
    });
    setIsEditOpen(true);
  };

  const handleExport = () => {
    console.log('Export lecturers to Excel');
    // TODO: Implement Excel export
  };

  const handleImport = () => {
    console.log('Import lecturers from Excel');
    // TODO: Implement Excel import
  };

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bold text-text-title'>
            Quản lý Giảng viên
          </h1>
          <p className='text-text-body mt-2'>
            Quản lý giảng viên thông tin ({totalItems} giảng viên)
          </p>
        </div>
        <div className='flex gap-3'>
          <Button variant='outline' onClick={handleExport}>
            <Download className='w-4 h-4 mr-2' />
            Tải file
          </Button>
          <Button onClick={handleImport}>
            <Plus className='w-4 h-4 mr-2' />
            Thêm giảng viên (.xlsx)
          </Button>
        </div>
      </div>

      <Card className='shadow-lg border border-gray-200'>
        <CardHeader className='bg-gradient-to-r from-primary to-gray-100'>
          <CardTitle className='text-white'>
            Danh sách Giảng viên ({totalItems})
          </CardTitle>
        </CardHeader>
        <CardContent className='pt-6'>
          {/* Search & Filter Bar */}
          <div className='flex gap-4 mb-6'>
            <div className='flex-1 relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
              <Input
                placeholder='Tìm kiếm giảng viên theo tên, email hoặc mã lớp...'
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

            <Select value={classFilter} onValueChange={setClassFilter}>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Tất cả lớp' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>Tất cả lớp</SelectItem>
                {uniqueClasses.map(cls => (
                  <SelectItem key={cls} value={cls || ''}>
                    {cls}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Tất cả trạng thái' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>Tất cả</SelectItem>
                <SelectItem value='ACTIVE'>ACTIVE</SelectItem>
                <SelectItem value='INACTIVE'>INACTIVE</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-[60px]'>Avatar</TableHead>
                  <TableHead
                    className='cursor-pointer'
                    onClick={() => handleSort('name')}
                  >
                    <div className='flex items-center gap-2'>
                      Thông tin giảng viên
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
                    onClick={() => handleSort('email')}
                  >
                    <div className='flex items-center gap-2'>
                      Email
                      <ArrowUpDown className='w-4 h-4' />
                      {sortBy === 'email' && (
                        <span className='text-xs'>
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </TableHead>
                  <TableHead>Mã lớp</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className='text-right'>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map(l => (
                  <TableRow key={l.id} className='hover:bg-gray-50'>
                    <TableCell>
                      <div className='w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center'>
                        <User className='w-5 h-5 text-gray-600' />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className='font-medium'>{l.name}</div>
                        <div className='text-sm text-gray-500'>ID: {l.id}</div>
                      </div>
                    </TableCell>
                    <TableCell className='text-sm'>{l.email}</TableCell>
                    <TableCell>
                      {l.classCode && (
                        <Badge className='bg-green-100 text-green-800'>
                          {l.classCode}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {l.status === 'ACTIVE' ? (
                        <Badge className='bg-green-100 text-green-800'>
                          ACTIVE
                        </Badge>
                      ) : (
                        <Badge
                          variant='secondary'
                          className='bg-gray-100 text-gray-600'
                        >
                          INACTIVE
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className='text-right'>
                      <div className='flex justify-end gap-2'>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => {
                            setSelectedLecturer(l);
                            setIsViewOpen(true);
                          }}
                        >
                          <Eye className='w-4 h-4' />
                        </Button>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => openEdit(l)}
                        >
                          <Pencil className='w-4 h-4' />
                        </Button>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => {
                            setSelectedLecturer(l);
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

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa Giảng viên</DialogTitle>
          </DialogHeader>
          <div className='space-y-4 py-4'>
            <div>
              <Label>Tên giảng viên</Label>
              <Input
                value={formData.name}
                onChange={e =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type='email'
                value={formData.email}
                onChange={e =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Label>Định mức (nhóm)</Label>
                <Input
                  type='number'
                  value={formData.quota}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      quota: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div>
                <Label>Nhóm hiện tại</Label>
                <Input
                  type='number'
                  value={formData.currentGroups}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      currentGroups: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Label>Mã lớp</Label>
                <Input
                  placeholder='VD: SE102'
                  value={formData.classCode || ''}
                  onChange={e =>
                    setFormData({ ...formData, classCode: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Trạng thái</Label>
                <Select
                  value={formData.status || 'ACTIVE'}
                  onValueChange={(value: 'ACTIVE' | 'INACTIVE') =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='ACTIVE'>ACTIVE</SelectItem>
                    <SelectItem value='INACTIVE'>INACTIVE</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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

      {/* Delete AlertDialog */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa giảng viên{' '}
              <strong>{selectedLecturer?.name}</strong>? Hành động này không thể
              hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className='bg-red-600 hover:bg-red-700'
            >
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* View Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chi tiết Giảng viên</DialogTitle>
          </DialogHeader>
          {selectedLecturer && (
            <div className='space-y-4 py-4'>
              <div>
                <Label className='text-text-secondary'>Tên giảng viên</Label>
                <p className='text-text-title font-medium mt-1'>
                  {selectedLecturer.name}
                </p>
              </div>
              <div>
                <Label className='text-text-secondary'>Email</Label>
                <p className='text-text-title font-medium mt-1'>
                  {selectedLecturer.email}
                </p>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <Label className='text-text-secondary'>Định mức</Label>
                  <p className='text-text-title font-medium mt-1'>
                    {selectedLecturer.quota} nhóm
                  </p>
                </div>
                <div>
                  <Label className='text-text-secondary'>Nhóm hiện tại</Label>
                  <p className='text-text-title font-medium mt-1'>
                    {selectedLecturer.currentGroups} nhóm
                  </p>
                </div>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <Label className='text-text-secondary'>Mã lớp</Label>
                  <div className='mt-1'>
                    {selectedLecturer.classCode ? (
                      <Badge className='bg-green-100 text-green-800'>
                        {selectedLecturer.classCode}
                      </Badge>
                    ) : (
                      <p className='text-text-secondary text-sm'>Chưa có</p>
                    )}
                  </div>
                </div>
                <div>
                  <Label className='text-text-secondary'>Trạng thái</Label>
                  <div className='mt-1'>
                    <Badge
                      className={
                        selectedLecturer.status === 'ACTIVE'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }
                    >
                      {selectedLecturer.status || 'ACTIVE'}
                    </Badge>
                  </div>
                </div>
              </div>
              <div>
                <Label className='text-text-secondary'>Tình trạng slot</Label>
                <p className='text-text-title font-medium mt-1'>
                  {selectedLecturer.currentGroups >= selectedLecturer.quota
                    ? '🔴 Đã đủ định mức'
                    : '🟢 Còn slot'}
                </p>
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
