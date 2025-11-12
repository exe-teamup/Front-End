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
import { useSemesters } from '@/hooks';
import { useLecturers } from '@/hooks/useLecturers';
import { useTableFeatures } from '@/hooks/useTableFeatures';
import { CourseService } from '@/services/courseService';
import type { Lecturer } from '@/services/lectureService';
import {
  AlertCircle,
  ArrowUpDown,
  Download,
  Eye,
  Filter,
  Loader2,
  Pencil,
  Plus,
  Search,
  Trash2,
  User,
  X,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

export function LecturerManagement() {
  const {
    lecturers: apiLecturers,
    isLoading,
    error,
    updateLecturer,
    deleteLecturer,
    uploadLecturers,
  } = useLecturers();

  const { semesters, loading: semestersLoading } = useSemesters();

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [semesterFilter, setSemesterFilter] = useState<string>('all');
  const [filteredLecturers, setFilteredLecturers] = useState<Lecturer[]>([]);
  const [isFilteringBySemester, setIsFilteringBySemester] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedLecturer, setSelectedLecturer] = useState<Lecturer | null>(
    null
  );
  const [formData, setFormData] = useState({
    lecturerName: '',
    email: '',
    lecturerStatus: 'ACTIVE',
    accountStatus: 'ACTIVE',
  });

  // Filter lecturers by semester
  useEffect(() => {
    const filterBySemester = async () => {
      if (semesterFilter === 'all') {
        setFilteredLecturers(apiLecturers);
        setIsFilteringBySemester(false);
        return;
      }

      try {
        setIsFilteringBySemester(true);
        const semesterId = Number.parseInt(semesterFilter);

        // Get courses for the selected semester
        const courses = await CourseService.getCoursesBySemester(semesterId);

        // Extract unique lecturer IDs from courses
        const lecturerIds = new Set(
          courses.data.map(course => course.lecturerId).filter(Boolean)
        );

        // Filter lecturers who teach in this semester
        const filtered = apiLecturers.filter(lecturer =>
          lecturerIds.has(lecturer.lecturerId)
        );

        setFilteredLecturers(filtered);
      } catch {
        // Error filtering by semester - show all lecturers
        setFilteredLecturers(apiLecturers);
      } finally {
        setIsFilteringBySemester(false);
      }
    };

    filterBySemester();
  }, [semesterFilter, apiLecturers]);

  // Filter by status
  const filteredData = useMemo(() => {
    if (statusFilter === 'all') return filteredLecturers;
    return filteredLecturers.filter(l => l.lecturerStatus === statusFilter);
  }, [filteredLecturers, statusFilter]);

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
    searchFields: ['lecturerName', 'email'],
    sortField: 'lecturerName',
  });

  const handleEdit = async () => {
    if (selectedLecturer) {
      try {
        await updateLecturer(selectedLecturer.lecturerId, formData);
        setIsEditOpen(false);
        setSelectedLecturer(null);
      } catch {
        // Error handled by hook
      }
    }
  };

  const handleDelete = async () => {
    if (selectedLecturer) {
      try {
        await deleteLecturer(selectedLecturer.lecturerId);
        setIsDeleteOpen(false);
        setSelectedLecturer(null);
      } catch {
        // Error handled by hook
      }
    }
  };

  const openEdit = (lecturer: Lecturer) => {
    setSelectedLecturer(lecturer);
    setFormData({
      lecturerName: lecturer.lecturerName,
      email: lecturer.email,
      lecturerStatus: lecturer.lecturerStatus,
      accountStatus: lecturer.accountStatus,
    });
    setIsEditOpen(true);
  };

  const handleExport = () => {
    // TODO: Implement Excel export
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        await uploadLecturers(file);
      } catch {
        // Error handled by hook
      }
    }
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
          <Button asChild>
            <label htmlFor='file-upload' className='cursor-pointer'>
              <Plus className='w-4 h-4 mr-2' />
              Thêm giảng viên (.xlsx)
              <input
                id='file-upload'
                type='file'
                accept='.xlsx,.xls'
                className='hidden'
                onChange={handleImport}
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
              Danh sách Giảng viên ({totalItems})
            </CardTitle>
          </CardHeader>
          <CardContent className='pt-6'>
            {/* Search & Filter Bar */}
            <div className='flex gap-4 mb-6'>
              <div className='flex-1 relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
                <Input
                  placeholder='Tìm kiếm giảng viên theo tên hoặc email...'
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

              <Select
                value={semesterFilter}
                onValueChange={setSemesterFilter}
                disabled={semestersLoading || isFilteringBySemester}
              >
                <SelectTrigger className='w-[200px]'>
                  <SelectValue placeholder='Lọc theo kỳ học'>
                    {(() => {
                      if (isFilteringBySemester) {
                        return (
                          <div className='flex items-center gap-2'>
                            <Loader2 className='w-4 h-4 animate-spin' />
                            <span>Đang lọc...</span>
                          </div>
                        );
                      }
                      if (semesterFilter === 'all') {
                        return 'Tất cả kỳ học';
                      }
                      const semester = semesters.find(
                        s => s.semesterId.toString() === semesterFilter
                      );
                      return semester?.semesterName || 'Chọn kỳ học';
                    })()}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>
                    <div className='flex items-center gap-2'>
                      <Filter className='w-4 h-4' />
                      Tất cả kỳ học
                    </div>
                  </SelectItem>
                  {semesters.map(semester => (
                    <SelectItem
                      key={semester.semesterId}
                      value={semester.semesterId.toString()}
                    >
                      {semester.semesterName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className='w-[200px]'>
                  <SelectValue placeholder='Tất cả trạng thái' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>Tất cả trạng thái</SelectItem>
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
                      onClick={() => handleSort('lecturerName')}
                    >
                      <div className='flex items-center gap-2'>
                        Thông tin giảng viên
                        <ArrowUpDown className='w-4 h-4' />
                        {sortBy === 'lecturerName' && (
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
                    <TableHead>Khóa học</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className='text-right'>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.map(l => (
                    <TableRow key={l.lecturerId} className='hover:bg-gray-50'>
                      <TableCell>
                        <div className='w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center'>
                          <User className='w-5 h-5 text-gray-600' />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className='font-medium'>{l.lecturerName}</div>
                          <div className='text-sm text-gray-500'>
                            ID: {l.lecturerId}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className='text-sm'>{l.email}</TableCell>
                      <TableCell>
                        <div className='flex flex-wrap gap-1'>
                          {l.courses.length > 0 ? (
                            l.courses.map(course => (
                              <Badge
                                key={course.courseId}
                                className='bg-blue-100 text-blue-800'
                              >
                                {course.courseCode}
                              </Badge>
                            ))
                          ) : (
                            <span className='text-sm text-gray-400'>
                              Chưa có khóa học
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {l.lecturerStatus === 'ACTIVE' ? (
                          <Badge className='bg-green-100 text-green-800'>
                            ACTIVE
                          </Badge>
                        ) : (
                          <Badge
                            variant='secondary'
                            className='bg-gray-100 text-gray-600'
                          >
                            {l.lecturerStatus}
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
      )}

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
                value={formData.lecturerName}
                onChange={e =>
                  setFormData({ ...formData, lecturerName: e.target.value })
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
                <Label>Trạng thái giảng viên</Label>
                <Select
                  value={formData.lecturerStatus}
                  onValueChange={value =>
                    setFormData({ ...formData, lecturerStatus: value })
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
              <div>
                <Label>Trạng thái tài khoản</Label>
                <Select
                  value={formData.accountStatus}
                  onValueChange={value =>
                    setFormData({ ...formData, accountStatus: value })
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
              <strong>{selectedLecturer?.lecturerName}</strong>? Hành động này
              không thể hoàn tác.
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
                  {selectedLecturer.lecturerName}
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
                  <Label className='text-text-secondary'>
                    Trạng thái giảng viên
                  </Label>
                  <div className='mt-1'>
                    <Badge
                      className={
                        selectedLecturer.lecturerStatus === 'ACTIVE'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }
                    >
                      {selectedLecturer.lecturerStatus}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className='text-text-secondary'>
                    Trạng thái tài khoản
                  </Label>
                  <div className='mt-1'>
                    <Badge
                      className={
                        selectedLecturer.accountStatus === 'ACTIVE'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }
                    >
                      {selectedLecturer.accountStatus}
                    </Badge>
                  </div>
                </div>
              </div>
              <div>
                <Label className='text-text-secondary'>Khóa học</Label>
                <div className='mt-1 flex flex-wrap gap-1'>
                  {selectedLecturer.courses.length > 0 ? (
                    selectedLecturer.courses.map(course => (
                      <Badge
                        key={course.courseId}
                        className='bg-blue-100 text-blue-800'
                      >
                        {course.courseCode}
                      </Badge>
                    ))
                  ) : (
                    <p className='text-text-secondary text-sm'>
                      Chưa có khóa học
                    </p>
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
