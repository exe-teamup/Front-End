import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
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
import { useStudents } from '@/hooks/useStudents';
import { useTableFeatures } from '@/hooks/useTableFeatures';
import type { Student } from '@/services/studentService';
import {
  AlertCircle,
  ArrowUpDown,
  Download,
  Eye,
  Loader2,
  Pencil,
  Search,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import * as XLSX from 'xlsx';

export function StudentManagement() {
  const {
    students: apiStudents,
    isLoading,
    error,
    updateStudent,
    deleteStudent,
    uploadStudents,
  } = useStudents();

  const [exeFilter, setExeFilter] = useState<string>('all');
  const [classFilter, setClassFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    userCode: '',
    phoneNumber: '',
    bio: '',
    userStatus: 'ELIGIBLE' as Student['userStatus'],
  });

  // Get unique classes for filter (derived from userCode - e.g., SE1841)
  const uniqueClasses = useMemo(() => {
    const classes = apiStudents
      .map(s => {
        // Extract class from userCode (e.g., SE184567 -> SE1845)
        const match = s.userCode.match(/^([A-Z]+\d{4})/);
        return match ? match[1] : '';
      })
      .filter(Boolean);
    return Array.from(new Set(classes)).sort();
  }, [apiStudents]);

  // Multi-level filtering
  const filteredData = useMemo(() => {
    let filtered = apiStudents;

    // Filter by class
    if (classFilter !== 'all') {
      filtered = filtered.filter(s => s.userCode.startsWith(classFilter));
    }

    // Filter by status
    if (statusFilter !== 'all') {
      if (statusFilter === 'disabled') {
        filtered = filtered.filter(s => s.userStatus === 'INACTIVE');
      } else if (statusFilter === 'eligible') {
        filtered = filtered.filter(s => s.userStatus === 'ELIGIBLE');
      } else if (statusFilter === 'notEligible') {
        filtered = filtered.filter(s => s.userStatus === 'NOT_ELIGIBLE');
      }
    }

    return filtered;
  }, [apiStudents, classFilter, statusFilter]);

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
    searchFields: ['fullName', 'userCode', 'email', 'majorName'],
    sortField: 'fullName',
  });

  const handleEdit = async () => {
    if (selectedStudent) {
      try {
        await updateStudent(selectedStudent.userId, formData);
        setIsEditOpen(false);
        setSelectedStudent(null);
      } catch {
        // Error handled by hook
      }
    }
  };

  const handleDelete = async () => {
    if (selectedStudent) {
      try {
        await deleteStudent(selectedStudent.userId);
        setIsDeleteOpen(false);
        setSelectedStudent(null);
      } catch {
        // Error handled by hook
      }
    }
  };

  const openEdit = (student: Student) => {
    setSelectedStudent(student);
    setFormData({
      fullName: student.fullName,
      email: student.email,
      userCode: student.userCode,
      phoneNumber: student.phoneNumber || '',
      bio: student.bio || '',
      userStatus: student.userStatus,
    });
    setIsEditOpen(true);
  };

  const handleImportExcel = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const isEligible = exeFilter !== 'notEligible';
        await uploadStudents(file, isEligible);
        // Reset the input so the same file can be selected again
        event.target.value = '';
      } catch {
        // Error handled by hook
      }
    }
  };

  const handleExport = () => {
    try {
      // Prepare data for export
      const exportData = filteredData.map(student => ({
        'Mã sinh viên': student.userCode,
        'Họ tên': student.fullName,
        Email: student.email,
        'Số điện thoại': student.phoneNumber || '',
        'Chuyên ngành': student.majorName,
        Nhóm: student.groupName || 'Chưa có nhóm',
        'Trạng thái':
          student.userStatus === 'ELIGIBLE'
            ? 'Đủ điều kiện'
            : student.userStatus === 'NOT_ELIGIBLE'
              ? 'Không đủ điều kiện'
              : 'Vô hiệu hóa',
      }));

      // Create workbook and worksheet
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(exportData);

      // Set column widths
      ws['!cols'] = [
        { wch: 15 }, // Mã sinh viên
        { wch: 25 }, // Họ tên
        { wch: 30 }, // Email
        { wch: 15 }, // Số điện thoại
        { wch: 20 }, // Chuyên ngành
        { wch: 25 }, // Nhóm
        { wch: 20 }, // Trạng thái
      ];

      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(wb, ws, 'Danh sách sinh viên');

      // Generate filename with current date
      const date = new Date().toISOString().split('T')[0];
      const filename = `DanhSachSinhVien_${date}.xlsx`;

      // Write file
      XLSX.writeFile(wb, filename);

      toast.success('Xuất file thành công', {
        description: `Đã tải xuống file ${filename}`,
      });
    } catch {
      toast.error('Xuất file thất bại', {
        description: 'Vui lòng thử lại sau',
      });
    }
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
          <Button variant='outline' onClick={handleExport}>
            <Download className='w-4 h-4 mr-2' />
            Tải file
          </Button>
          <Button
            variant={exeFilter === 'ELIGIBLE' ? 'default' : 'outline'}
            onClick={() =>
              setExeFilter(exeFilter === 'ELIGIBLE' ? 'all' : 'eligible')
            }
          >
            Đủ điều kiện
          </Button>
          <Button
            variant={exeFilter === 'NOT_ELIGIBLE' ? 'default' : 'outline'}
            onClick={() =>
              setExeFilter(exeFilter === 'NOT_ELIGIBLE' ? 'all' : 'notEligible')
            }
          >
            Không đủ điều kiện
          </Button>
          <Button asChild>
            <label htmlFor='file-upload-students' className='cursor-pointer'>
              <Upload className='w-4 h-4 mr-2' />
              {getImportButtonText()}
              <input
                id='file-upload-students'
                type='file'
                accept='.xlsx,.xls'
                className='hidden'
                onChange={handleImportExcel}
              />
            </label>
          </Button>
        </div>
      </div>

      {error && (
        <div className='bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2'>
          <AlertCircle className='w-5 h-5 text-red-600' />
          <p className='text-red-800'>{error}</p>
        </div>
      )}

      {isLoading ? (
        <div className='flex justify-center items-center h-64'>
          <Loader2 className='w-8 h-8 animate-spin text-primary' />
        </div>
      ) : (
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
                  <SelectItem value='notEligible'>
                    Không đủ điều kiện
                  </SelectItem>
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
                      onClick={() => handleSort('userCode')}
                    >
                      <div className='flex items-center gap-2'>
                        Mã số sinh viên
                        <ArrowUpDown className='w-4 h-4' />
                        {sortBy === 'userCode' && (
                          <span className='text-xs'>
                            {sortOrder === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </TableHead>
                    <TableHead
                      className='cursor-pointer'
                      onClick={() => handleSort('fullName')}
                    >
                      <div className='flex items-center gap-2'>
                        Thông tin
                        <ArrowUpDown className='w-4 h-4' />
                        {sortBy === 'fullName' && (
                          <span className='text-xs'>
                            {sortOrder === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead
                      className='cursor-pointer'
                      onClick={() => handleSort('majorName')}
                    >
                      <div className='flex items-center gap-2'>
                        Chuyên ngành
                        <ArrowUpDown className='w-4 h-4' />
                        {sortBy === 'majorName' && (
                          <span className='text-xs'>
                            {sortOrder === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </TableHead>
                    <TableHead>Nhóm</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className='text-right'>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.map(s => (
                    <TableRow key={s.userId} className='hover:bg-gray-50'>
                      <TableCell className='font-medium'>
                        <Badge className='bg-blue-100 text-blue-800'>
                          {s.userCode}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className='font-medium'>{s.fullName}</div>
                      </TableCell>
                      <TableCell className='text-sm'>{s.email}</TableCell>
                      <TableCell>{s.majorName}</TableCell>
                      <TableCell>
                        <span className='text-sm'>
                          {s.groupName || 'Chưa có nhóm'}
                        </span>
                      </TableCell>
                      <TableCell>
                        {s.userStatus === 'ELIGIBLE' ? (
                          <Badge
                            variant='default'
                            className='bg-green-100 text-green-800'
                          >
                            Đủ điều kiện
                          </Badge>
                        ) : s.userStatus === 'NOT_ELIGIBLE' ? (
                          <Badge
                            variant='secondary'
                            className='bg-red-100 text-red-800'
                          >
                            Không đủ điều kiện
                          </Badge>
                        ) : (
                          <Badge
                            variant='outline'
                            className='bg-gray-100 text-gray-600'
                          >
                            Vô hiệu hóa
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
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa Sinh viên</DialogTitle>
          </DialogHeader>
          <div className='space-y-4 py-4'>
            <div>
              <Label>Mã sinh viên</Label>
              <Input
                value={formData.userCode}
                disabled
                className='bg-gray-50'
              />
            </div>
            <div>
              <Label>Họ tên</Label>
              <Input
                value={formData.fullName}
                onChange={e =>
                  setFormData({ ...formData, fullName: e.target.value })
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
            <div>
              <Label>Số điện thoại</Label>
              <Input
                value={formData.phoneNumber}
                onChange={e =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Giới thiệu</Label>
              <Input
                value={formData.bio}
                onChange={e =>
                  setFormData({ ...formData, bio: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Trạng thái</Label>
              <Select
                value={formData.userStatus}
                onValueChange={(v: Student['userStatus']) =>
                  setFormData({ ...formData, userStatus: v })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='ELIGIBLE'>Đủ điều kiện</SelectItem>
                  <SelectItem value='NOT_ELIGIBLE'>
                    Không đủ điều kiện
                  </SelectItem>
                  <SelectItem value='INACTIVE'>Vô hiệu hóa</SelectItem>
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

      {/* Delete AlertDialog */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa sinh viên{' '}
              <strong>{selectedStudent?.fullName}</strong> (Mã sinh viên:{' '}
              {selectedStudent?.userCode})? Hành động này không thể hoàn tác.
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
                  <Label className='text-text-secondary'>Mã sinh viên</Label>
                  <p className='text-text-title font-medium mt-1'>
                    {selectedStudent.userCode}
                  </p>
                </div>
                <div>
                  <Label className='text-text-secondary'>Họ tên</Label>
                  <p className='text-text-title font-medium mt-1'>
                    {selectedStudent.fullName}
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
                  <Label className='text-text-secondary'>Chuyên ngành</Label>
                  <p className='text-text-title font-medium mt-1'>
                    {selectedStudent.majorName}
                  </p>
                </div>
                <div>
                  <Label className='text-text-secondary'>Số điện thoại</Label>
                  <p className='text-text-title font-medium mt-1'>
                    {selectedStudent.phoneNumber || 'Chưa cập nhật'}
                  </p>
                </div>
              </div>
              <div>
                <Label className='text-text-secondary'>Nhóm</Label>
                <p className='text-text-title font-medium mt-1'>
                  {selectedStudent.groupName || 'Chưa có nhóm'}
                </p>
              </div>
              <div>
                <Label className='text-text-secondary'>Giới thiệu</Label>
                <p className='text-text-title font-medium mt-1'>
                  {selectedStudent.bio || 'Chưa cập nhật'}
                </p>
              </div>
              <div>
                <Label className='text-text-secondary'>Trạng thái</Label>
                <div className='mt-2'>
                  {selectedStudent.userStatus === 'ELIGIBLE' ? (
                    <Badge
                      variant='default'
                      className='bg-green-100 text-green-800'
                    >
                      Đủ điều kiện
                    </Badge>
                  ) : selectedStudent.userStatus === 'NOT_ELIGIBLE' ? (
                    <Badge
                      variant='secondary'
                      className='bg-red-100 text-red-800'
                    >
                      Không đủ điều kiện
                    </Badge>
                  ) : (
                    <Badge
                      variant='outline'
                      className='bg-gray-100 text-gray-600'
                    >
                      Vô hiệu hóa
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
