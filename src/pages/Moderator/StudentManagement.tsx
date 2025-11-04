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
import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/ui/pagination';
import {
  Pencil,
  Trash2,
  Eye,
  Search,
  X,
  ArrowUpDown,
  Upload,
} from 'lucide-react';
import {
  mockStudentsWithGroup,
  mockStudentsWithoutGroup,
  type Student,
} from './mockData';
import { useTableFeatures } from '@/hooks/useTableFeatures';

export function StudentManagement() {
  const [students, setStudents] = useState([
    ...mockStudentsWithGroup,
    ...mockStudentsWithoutGroup,
  ]);
  const [exeFilter, setExeFilter] = useState<string>('all');
  const [classFilter, setClassFilter] = useState<string>('all'); // Filter theo lớp
  const [statusFilter, setStatusFilter] = useState<string>('all'); // Filter theo trạng thái
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    mssv: '',
    email: '',
    class: '',
    major: '',
    group: '',
    isEligibleForEXE: false,
    isDisabled: false,
  });

  // Get unique classes for filter
  const uniqueClasses = Array.from(new Set(students.map(s => s.class))).sort();

  // Multi-level filtering
  let filteredData = students;

  // Filter by class
  if (classFilter !== 'all') {
    filteredData = filteredData.filter(s => s.class === classFilter);
  }

  // Filter by status (điều kiện EXE)
  if (statusFilter !== 'all') {
    if (statusFilter === 'disabled') {
      filteredData = filteredData.filter(s => s.isDisabled);
    } else {
      filteredData = filteredData.filter(
        s =>
          !s.isDisabled && s.isEligibleForEXE === (statusFilter === 'eligible')
      );
    }
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
    searchFields: ['name', 'mssv', 'email', 'major'], // Thêm email vào search
    sortField: 'name',
  });

  const handleCreate = () => {
    const newStudent: Student = {
      id: (students.length + 1).toString(),
      ...formData,
    };
    setStudents([...students, newStudent]);
    setIsCreateOpen(false);
    setFormData({
      name: '',
      mssv: '',
      email: '',
      class: '',
      major: '',
      group: '',
      isEligibleForEXE: false,
      isDisabled: false,
    });
  };

  const handleEdit = () => {
    if (selectedStudent) {
      setStudents(
        students.map(s =>
          s.id === selectedStudent.id ? { ...selectedStudent, ...formData } : s
        )
      );
      setIsEditOpen(false);
      setSelectedStudent(null);
    }
  };

  const handleDelete = () => {
    if (selectedStudent) {
      setStudents(students.filter(s => s.id !== selectedStudent.id));
      setIsDeleteOpen(false);
      setSelectedStudent(null);
    }
  };

  const openEdit = (student: Student) => {
    setSelectedStudent(student);
    setFormData({
      name: student.name,
      mssv: student.mssv,
      email: student.email,
      class: student.class,
      major: student.major,
      group: student.group || '',
      isEligibleForEXE: student.isEligibleForEXE || false,
      isDisabled: student.isDisabled || false,
    });
    setIsEditOpen(true);
  };

  const handleImportExcel = () => {
    const importType =
      exeFilter === 'eligible'
        ? 'đủ điều kiện'
        : exeFilter === 'notEligible'
          ? 'không đủ điều kiện'
          : '';
    console.log(`Import sinh viên ${importType} từ .xlsx`);
    // TODO: Implement Excel import
  };

  const getImportButtonText = () => {
    if (exeFilter === 'eligible') {
      return 'Thêm sinh viên đủ điều kiện (.xlsx)';
    } else if (exeFilter === 'notEligible') {
      return 'Thêm sinh viên không đủ điều kiện (.xlsx)';
    }
    return 'Thêm sinh viên đủ điều kiện (.xlsx)';
  };

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bold text-text-title'>
            Quản lý Sinh viên
          </h1>
          <p className='text-text-body mt-2'>
            Quản lý thông tin sinh viên trong hệ thống ({totalItems} sinh viên)
          </p>
        </div>
        <div className='flex gap-3'>
          <Button
            variant={exeFilter === 'eligible' ? 'default' : 'outline'}
            onClick={() =>
              setExeFilter(exeFilter === 'eligible' ? 'all' : 'eligible')
            }
          >
            Đủ điều kiện
          </Button>
          <Button
            variant={exeFilter === 'notEligible' ? 'default' : 'outline'}
            onClick={() =>
              setExeFilter(exeFilter === 'notEligible' ? 'all' : 'notEligible')
            }
          >
            Không đủ điều kiện
          </Button>
          <Button variant='outline' onClick={handleImportExcel}>
            <Upload className='w-4 h-4 mr-2' />
            {getImportButtonText()}
          </Button>
        </div>
      </div>

      <Card className='shadow-lg border border-gray-200'>
        <CardHeader className='bg-gradient-to-r from-primary to-gray-100'>
          <CardTitle className='text-white'>
            Danh sách Sinh viên ({totalItems})
          </CardTitle>
        </CardHeader>
        <CardContent className='pt-6'>
          {/* Search & Filter Bar */}
          <div className='flex gap-4 mb-6'>
            <div className='flex-1 relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
              <Input
                placeholder='Tìm kiếm sinh viên theo tên, email, mã sinh viên hoặc chuyên ngành...'
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
                <SelectValue placeholder='Lớp' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>Tất cả lớp</SelectItem>
                {uniqueClasses.map(cls => (
                  <SelectItem key={cls} value={cls}>
                    {cls}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className='w-[200px]'>
                <SelectValue placeholder='Điều kiện' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>Tất cả</SelectItem>
                <SelectItem value='eligible'>Đủ điều kiện</SelectItem>
                <SelectItem value='notEligible'>Không đủ điều kiện</SelectItem>
                <SelectItem value='disabled'>Vô hiệu hóa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    className='cursor-pointer'
                    onClick={() => handleSort('mssv')}
                  >
                    <div className='flex items-center gap-2'>
                      Mã số sinh viên
                      <ArrowUpDown className='w-4 h-4' />
                      {sortBy === 'mssv' && (
                        <span className='text-xs'>
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </TableHead>
                  <TableHead
                    className='cursor-pointer'
                    onClick={() => handleSort('name')}
                  >
                    <div className='flex items-center gap-2'>
                      Thông tin
                      <ArrowUpDown className='w-4 h-4' />
                      {sortBy === 'name' && (
                        <span className='text-xs'>
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead
                    className='cursor-pointer'
                    onClick={() => handleSort('class')}
                  >
                    <div className='flex items-center gap-2'>
                      Mã lớp
                      <ArrowUpDown className='w-4 h-4' />
                      {sortBy === 'class' && (
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
                {paginatedData.map(s => (
                  <TableRow key={s.id} className='hover:bg-gray-50'>
                    <TableCell className='font-medium'>{s.mssv}</TableCell>
                    <TableCell>
                      <div className='font-medium'>{s.name}</div>
                    </TableCell>
                    <TableCell className='text-sm'>{s.email}</TableCell>
                    <TableCell>{s.class}</TableCell>
                    <TableCell>
                      {s.isEligibleForEXE ? (
                        <Badge
                          variant='default'
                          className='bg-green-100 text-green-800'
                        >
                          Đủ điều kiện
                        </Badge>
                      ) : (
                        <Badge
                          variant='secondary'
                          className='bg-red-100 text-red-800'
                        >
                          Không đủ điều kiện
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className='text-right'>
                      <div className='flex justify-end gap-2'>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => {
                            setSelectedStudent(s);
                            setIsViewOpen(true);
                          }}
                        >
                          <Eye className='w-4 h-4' />
                        </Button>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => openEdit(s)}
                        >
                          <Pencil className='w-4 h-4' />
                        </Button>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => {
                            setSelectedStudent(s);
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
            <DialogTitle>Thêm Sinh viên mới</DialogTitle>
          </DialogHeader>
          <div className='space-y-4 py-4'>
            <div>
              <Label>MSSV</Label>
              <Input
                placeholder='VD: SE184567'
                value={formData.mssv}
                onChange={e =>
                  setFormData({ ...formData, mssv: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Họ tên</Label>
              <Input
                placeholder='Họ và tên sinh viên'
                value={formData.name}
                onChange={e =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Label>Lớp</Label>
                <Input
                  placeholder='VD: SE1847'
                  value={formData.class}
                  onChange={e =>
                    setFormData({ ...formData, class: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Ngành</Label>
                <Input
                  placeholder='VD: SE'
                  value={formData.major}
                  onChange={e =>
                    setFormData({ ...formData, major: e.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <Label>Nhóm (tùy chọn)</Label>
              <Input
                placeholder='Tên nhóm nếu có'
                value={formData.group}
                onChange={e =>
                  setFormData({ ...formData, group: e.target.value })
                }
              />
            </div>
            <div className='flex items-center space-x-2'>
              <input
                type='checkbox'
                id='isEligibleForEXE'
                checked={formData.isEligibleForEXE}
                onChange={e =>
                  setFormData({
                    ...formData,
                    isEligibleForEXE: e.target.checked,
                  })
                }
                className='w-4 h-4'
              />
              <Label htmlFor='isEligibleForEXE' className='cursor-pointer'>
                Đủ điều kiện làm EXE
              </Label>
            </div>
            <div className='flex items-center space-x-2'>
              <input
                type='checkbox'
                id='isDisabled'
                checked={formData.isDisabled}
                onChange={e =>
                  setFormData({
                    ...formData,
                    isDisabled: e.target.checked,
                  })
                }
                className='w-4 h-4'
              />
              <Label htmlFor='isDisabled' className='cursor-pointer'>
                Vô hiệu hóa
              </Label>
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
            <DialogTitle>Chỉnh sửa Sinh viên</DialogTitle>
          </DialogHeader>
          <div className='space-y-4 py-4'>
            <div>
              <Label>MSSV</Label>
              <Input
                value={formData.mssv}
                onChange={e =>
                  setFormData({ ...formData, mssv: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Họ tên</Label>
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
                <Label>Lớp</Label>
                <Input
                  value={formData.class}
                  onChange={e =>
                    setFormData({ ...formData, class: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Ngành</Label>
                <Input
                  value={formData.major}
                  onChange={e =>
                    setFormData({ ...formData, major: e.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <Label>Nhóm (tùy chọn)</Label>
              <Input
                value={formData.group}
                onChange={e =>
                  setFormData({ ...formData, group: e.target.value })
                }
              />
            </div>
            <div className='flex items-center space-x-2'>
              <input
                type='checkbox'
                id='isEligibleForEXE-edit'
                checked={formData.isEligibleForEXE}
                onChange={e =>
                  setFormData({
                    ...formData,
                    isEligibleForEXE: e.target.checked,
                  })
                }
                className='w-4 h-4'
              />
              <Label htmlFor='isEligibleForEXE-edit' className='cursor-pointer'>
                Đủ điều kiện làm EXE
              </Label>
            </div>
            <div className='flex items-center space-x-2'>
              <input
                type='checkbox'
                id='isDisabled-edit'
                checked={formData.isDisabled}
                onChange={e =>
                  setFormData({
                    ...formData,
                    isDisabled: e.target.checked,
                  })
                }
                className='w-4 h-4'
              />
              <Label htmlFor='isDisabled-edit' className='cursor-pointer'>
                Vô hiệu hóa
              </Label>
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
              Bạn có chắc chắn muốn xóa sinh viên{' '}
              <strong>{selectedStudent?.name}</strong> (MSSV:{' '}
              {selectedStudent?.mssv})? Hành động này không thể hoàn tác.
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
            <DialogTitle>Chi tiết Sinh viên</DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <div className='space-y-4 py-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <Label className='text-text-secondary'>MSSV</Label>
                  <p className='text-text-title font-medium mt-1'>
                    {selectedStudent.mssv}
                  </p>
                </div>
                <div>
                  <Label className='text-text-secondary'>Họ tên</Label>
                  <p className='text-text-title font-medium mt-1'>
                    {selectedStudent.name}
                  </p>
                </div>
              </div>
              <div>
                <Label className='text-text-secondary'>Email</Label>
                <p className='text-text-title font-medium mt-1'>
                  {selectedStudent.email}
                </p>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <Label className='text-text-secondary'>Lớp</Label>
                  <p className='text-text-title font-medium mt-1'>
                    {selectedStudent.class}
                  </p>
                </div>
                <div>
                  <Label className='text-text-secondary'>Ngành</Label>
                  <p className='text-text-title font-medium mt-1'>
                    {selectedStudent.major}
                  </p>
                </div>
              </div>
              <div>
                <Label className='text-text-secondary'>Nhóm</Label>
                <p className='text-text-title font-medium mt-1'>
                  {selectedStudent.group || 'Chưa có nhóm'}
                </p>
              </div>
              <div>
                <Label className='text-text-secondary'>Điều kiện EXE</Label>
                <div className='mt-2'>
                  {selectedStudent.isDisabled ? (
                    <Badge
                      variant='outline'
                      className='bg-gray-100 text-gray-600'
                    >
                      Vô hiệu hóa
                    </Badge>
                  ) : selectedStudent.isEligibleForEXE ? (
                    <Badge
                      variant='default'
                      className='bg-green-100 text-green-800'
                    >
                      Đủ điều kiện
                    </Badge>
                  ) : (
                    <Badge
                      variant='secondary'
                      className='bg-red-100 text-red-800'
                    >
                      Không đủ điều kiện
                    </Badge>
                  )}
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
