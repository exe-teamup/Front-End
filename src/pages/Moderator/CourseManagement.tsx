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
import { useCourses } from '@/hooks/useCourses';
import { useSemesters } from '@/hooks/useSemesters';
import { useTableFeatures } from '@/hooks/useTableFeatures';
import type { Course } from '@/types/course';
import {
  AlertCircle,
  ArrowUpDown,
  Download,
  Eye,
  Loader2,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import * as XLSX from 'xlsx';

export function CourseManagement() {
  const {
    courses: apiCourses,
    isLoading,
    error,
    updateCourse,
    deleteCourse,
    uploadCourses,
  } = useCourses();

  const { semesters } = useSemesters();

  const [selectedSemester, setSelectedSemester] = useState('all');
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({
    courseId: 0,
    courseName: '',
    courseCode: '',
    semesterId: 0,
    lecturerId: 0,
    maxGroup: 0,
    maxStudents: 0,
    groupCount: 0,
    status: 'ACTIVE' as Course['status'],
  });

  const filteredData = useMemo(() => {
    if (selectedSemester === 'all') return apiCourses;
    return apiCourses.filter(c => c.semesterCode === selectedSemester);
  }, [apiCourses, selectedSemester]);

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
    searchFields: ['courseName', 'courseCode', 'semesterCode', 'lecturerName'],
    sortField: 'courseName',
  });

  const handleEdit = async () => {
    if (selectedCourse) {
      try {
        await updateCourse(selectedCourse.courseId, formData);
        setIsEditOpen(false);
        setSelectedCourse(null);
      } catch {
        // Error handled by hook
      }
    }
  };

  const handleDelete = async () => {
    if (selectedCourse) {
      try {
        await deleteCourse(selectedCourse.courseId);
        setIsDeleteOpen(false);
        setSelectedCourse(null);
      } catch {
        // Error handled by hook
      }
    }
  };

  const openEdit = (course: Course) => {
    setSelectedCourse(course);
    setFormData({
      courseId: course.courseId,
      courseName: course.courseName,
      courseCode: course.courseCode,
      semesterId: course.semesterId,
      lecturerId: course.lecturerId,
      maxGroup: course.maxGroup,
      maxStudents: course.maxStudents,
      groupCount: course.groupCount,
      status: course.status || 'ACTIVE',
    });
    setIsEditOpen(true);
  };

  const handleExport = () => {
    try {
      // Prepare data for export
      const exportData = filteredData.map(course => ({
        'Mã lớp': course.courseCode,
        'Tên lớp': course.courseName,
        'Kỳ học': course.semesterCode,
        'Giảng viên': course.lecturerName,
        'Số nhóm hiện tại': course.groupCount,
        'Số nhóm tối đa': course.maxGroup,
        'Số sinh viên tối đa': course.maxStudents,
        'Trạng thái': course.status,
      }));

      // Create workbook and worksheet
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(exportData);

      // Set column widths
      ws['!cols'] = [
        { wch: 12 }, // Mã lớp
        { wch: 30 }, // Tên lớp
        { wch: 15 }, // Kỳ học
        { wch: 25 }, // Giảng viên
        { wch: 18 }, // Số nhóm hiện tại
        { wch: 18 }, // Số nhóm tối đa
        { wch: 20 }, // Số sinh viên tối đa
        { wch: 12 }, // Trạng thái
      ];

      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(wb, ws, 'Danh sách lớp học');

      // Generate filename with current date
      const date = new Date().toISOString().split('T')[0];
      const filename = `DanhSachLopHoc_${date}.xlsx`;

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

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        await uploadCourses(file);
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
            Quản lý Lớp học
          </h1>
          <p className='text-text-body mt-2'>
            Danh sách lớp học theo kỳ học ({totalItems} lớp học)
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
              Thêm lớp học (.xlsx)
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
              Danh sách Lớp học ({totalItems})
            </CardTitle>
          </CardHeader>
          <CardContent className='pt-6'>
            {/* Search & Filter Bar */}
            <div className='flex gap-4 mb-6'>
              <div className='flex-1 relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
                <Input
                  placeholder='Tìm kiếm theo tên lớp, mã lớp, kỳ học, giảng viên...'
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
                value={selectedSemester}
                onValueChange={setSelectedSemester}
              >
                <SelectTrigger className='w-[200px]'>
                  <SelectValue placeholder='Chọn kỳ học' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>Tất cả kỳ học</SelectItem>
                  {semesters.map(s => (
                    <SelectItem key={s.semesterId} value={s.semesterCode}>
                      {s.semesterName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className='rounded-md border'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead
                      className='cursor-pointer'
                      onClick={() => handleSort('courseCode')}
                    >
                      <div className='flex items-center gap-2'>
                        Mã lớp
                        <ArrowUpDown className='w-4 h-4' />
                        {sortBy === 'courseCode' && (
                          <span className='text-xs'>
                            {sortOrder === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </TableHead>
                    <TableHead
                      className='cursor-pointer'
                      onClick={() => handleSort('courseName')}
                    >
                      <div className='flex items-center gap-2'>
                        Tên lớp
                        <ArrowUpDown className='w-4 h-4' />
                        {sortBy === 'courseName' && (
                          <span className='text-xs'>
                            {sortOrder === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </TableHead>
                    <TableHead
                      className='cursor-pointer'
                      onClick={() => handleSort('semesterCode')}
                    >
                      <div className='flex items-center gap-2'>
                        Kỳ học
                        <ArrowUpDown className='w-4 h-4' />
                        {sortBy === 'semesterCode' && (
                          <span className='text-xs'>
                            {sortOrder === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </TableHead>
                    <TableHead
                      className='cursor-pointer'
                      onClick={() => handleSort('lecturerName')}
                    >
                      <div className='flex items-center gap-2'>
                        Giảng viên
                        <ArrowUpDown className='w-4 h-4' />
                        {sortBy === 'lecturerName' && (
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
                  {paginatedData.map(c => (
                    <TableRow key={c.courseId} className='hover:bg-gray-50'>
                      <TableCell>
                        <Badge className='bg-blue-100 text-blue-800'>
                          {c.courseCode}
                        </Badge>
                      </TableCell>
                      <TableCell className='font-medium'>
                        {c.courseName}
                      </TableCell>
                      <TableCell>{c.semesterCode}</TableCell>
                      <TableCell>{c.lecturerName}</TableCell>
                      <TableCell>
                        <span className='text-sm'>
                          {c.groupCount} / {c.maxGroup} nhóm
                        </span>
                      </TableCell>
                      <TableCell>
                        {c.status === 'ACTIVE' ? (
                          <Badge className='bg-green-100 text-green-800'>
                            ACTIVE
                          </Badge>
                        ) : c.status === 'DRAFT' ? (
                          <Badge className='bg-yellow-100 text-yellow-800'>
                            DRAFT
                          </Badge>
                        ) : (
                          <Badge
                            variant='secondary'
                            className='bg-gray-100 text-gray-600'
                          >
                            {c.status}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className='text-right'>
                        <div className='flex justify-end gap-2'>
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() => {
                              setSelectedCourse(c);
                              setIsViewOpen(true);
                            }}
                          >
                            <Eye className='w-4 h-4' />
                          </Button>
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() => openEdit(c)}
                          >
                            <Pencil className='w-4 h-4' />
                          </Button>
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() => {
                              setSelectedCourse(c);
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
            <DialogTitle>Chỉnh sửa Lớp học</DialogTitle>
          </DialogHeader>
          <div className='space-y-4 py-4'>
            <div>
              <Label>Tên lớp</Label>
              <Input
                value={formData.courseName}
                onChange={e =>
                  setFormData({ ...formData, courseName: e.target.value })
                }
              />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Label>Mã lớp</Label>
                <Input
                  placeholder='VD: SE102'
                  value={formData.courseCode}
                  onChange={e =>
                    setFormData({ ...formData, courseCode: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Trạng thái</Label>
                <Select
                  value={formData.status}
                  onValueChange={(v: Course['status']) =>
                    setFormData({ ...formData, status: v })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='DRAFT'>DRAFT</SelectItem>
                    <SelectItem value='ACTIVE'>ACTIVE</SelectItem>
                    <SelectItem value='INACTIVE'>INACTIVE</SelectItem>
                    <SelectItem value='COMPLETED'>COMPLETED</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Label>Số nhóm tối đa</Label>
                <Input
                  type='number'
                  value={formData.maxGroup}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      maxGroup: Number.parseInt(e.target.value) || 0,
                    })
                  }
                  onInput={e => {
                    const input = e.currentTarget;
                    input.value = input.value.replace(/^0+(?=\d)/, '');
                  }}
                />
              </div>
              <div>
                <Label>Số sinh viên tối đa</Label>
                <Input
                  type='number'
                  value={formData.maxStudents}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      maxStudents: Number.parseInt(e.target.value) || 0,
                    })
                  }
                  onInput={e => {
                    const input = e.currentTarget;
                    input.value = input.value.replace(/^0+(?=\d)/, '');
                  }}
                />
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
              Bạn có chắc chắn muốn xóa lớp học{' '}
              <strong>{selectedCourse?.courseName}</strong>? Hành động này không
              thể hoàn tác.
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
            <DialogTitle>Chi tiết Lớp học</DialogTitle>
          </DialogHeader>
          {selectedCourse && (
            <div className='space-y-4 py-4'>
              <div>
                <Label className='text-text-secondary'>Tên lớp</Label>
                <p className='text-text-title font-medium mt-1'>
                  {selectedCourse.courseName}
                </p>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <Label className='text-text-secondary'>Mã lớp</Label>
                  <div className='mt-1'>
                    <Badge className='bg-blue-100 text-blue-800'>
                      {selectedCourse.courseCode}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className='text-text-secondary'>Kỳ học</Label>
                  <p className='text-text-title font-medium mt-1'>
                    {selectedCourse.semesterCode}
                  </p>
                </div>
              </div>
              <div>
                <Label className='text-text-secondary'>Giảng viên</Label>
                <p className='text-text-title font-medium mt-1'>
                  {selectedCourse.lecturerName}
                </p>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <Label className='text-text-secondary'>Số nhóm tối đa</Label>
                  <p className='text-text-title font-medium mt-1'>
                    {selectedCourse.maxGroup} nhóm
                  </p>
                </div>
                <div>
                  <Label className='text-text-secondary'>
                    Số nhóm hiện tại
                  </Label>
                  <p className='text-text-title font-medium mt-1'>
                    {selectedCourse.groupCount} nhóm
                  </p>
                </div>
              </div>
              <div>
                <Label className='text-text-secondary'>
                  Số sinh viên tối đa
                </Label>
                <p className='text-text-title font-medium mt-1'>
                  {selectedCourse.maxStudents} sinh viên
                </p>
              </div>
              <div>
                <Label className='text-text-secondary'>Trạng thái</Label>
                <div className='mt-1'>
                  {selectedCourse.status === 'ACTIVE' ? (
                    <Badge className='bg-green-100 text-green-800'>
                      ACTIVE
                    </Badge>
                  ) : selectedCourse.status === 'DRAFT' ? (
                    <Badge className='bg-yellow-100 text-yellow-800'>
                      DRAFT
                    </Badge>
                  ) : (
                    <Badge
                      variant='secondary'
                      className='bg-gray-100 text-gray-600'
                    >
                      {selectedCourse.status}
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
