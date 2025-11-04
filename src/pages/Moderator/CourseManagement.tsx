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
} from 'lucide-react';
import { mockCourses, mockSemesters, type Course } from './mockData';
import { useTableFeatures } from '@/hooks/useTableFeatures';
import { Badge } from '@/components/ui/badge';

export function CourseManagement() {
  const [courses, setCourses] = useState(mockCourses);
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    courseCode: '',
    semester: '',
    lecturer: '',
    studentCount: 0,
    groupCount: 0,
  });

  const filteredData =
    selectedSemester === 'all'
      ? courses
      : courses.filter(c => c.semester === selectedSemester);

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
    searchFields: ['name', 'semester', 'lecturer'],
    sortField: 'name',
  });

  const handleEdit = () => {
    if (selectedCourse) {
      setCourses(
        courses.map(c =>
          c.id === selectedCourse.id ? { ...selectedCourse, ...formData } : c
        )
      );
      setIsEditOpen(false);
      setSelectedCourse(null);
    }
  };

  const handleDelete = () => {
    if (selectedCourse) {
      setCourses(courses.filter(c => c.id !== selectedCourse.id));
      setIsDeleteOpen(false);
      setSelectedCourse(null);
    }
  };

  const openEdit = (course: Course) => {
    setSelectedCourse(course);
    setFormData({
      name: course.name,
      courseCode: course.courseCode || '',
      semester: course.semester,
      lecturer: course.lecturer,
      studentCount: course.studentCount,
      groupCount: course.groupCount || 0,
    });
    setIsEditOpen(true);
  };

  const handleExport = () => {
    console.log('Export courses to Excel');
    // TODO: Implement Excel export
  };

  const handleImport = () => {
    console.log('Import courses from Excel');
    // TODO: Implement Excel import
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
          <Button onClick={handleImport}>
            <Plus className='w-4 h-4 mr-2' />
            Thêm lớp học (.xlsx)
          </Button>
        </div>
      </div>

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
                {mockSemesters.map(s => (
                  <SelectItem key={s.id} value={s.name}>
                    {s.name}
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
                    onClick={() => handleSort('semester')}
                  >
                    <div className='flex items-center gap-2'>
                      Kỳ học
                      <ArrowUpDown className='w-4 h-4' />
                      {sortBy === 'semester' && (
                        <span className='text-xs'>
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </TableHead>
                  <TableHead
                    className='cursor-pointer'
                    onClick={() => handleSort('lecturer')}
                  >
                    <div className='flex items-center gap-2'>
                      Giảng viên
                      <ArrowUpDown className='w-4 h-4' />
                      {sortBy === 'lecturer' && (
                        <span className='text-xs'>
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </TableHead>
                  <TableHead>Nhóm</TableHead>
                  <TableHead className='text-right'>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map(c => (
                  <TableRow key={c.id} className='hover:bg-gray-50'>
                    <TableCell>
                      {c.courseCode && (
                        <Badge className='bg-green-100 text-green-800'>
                          {c.courseCode}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{c.semester}</TableCell>
                    <TableCell>{c.lecturer}</TableCell>
                    <TableCell>
                      <span className='text-sm'>{c.groupCount || 0} nhóm</span>
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
                value={formData.name}
                onChange={e =>
                  setFormData({ ...formData, name: e.target.value })
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
                <Label>Kỳ học</Label>
                <Select
                  value={formData.semester}
                  onValueChange={v => setFormData({ ...formData, semester: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {mockSemesters.map(s => (
                      <SelectItem key={s.id} value={s.name}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Giảng viên</Label>
              <Input
                value={formData.lecturer}
                onChange={e =>
                  setFormData({ ...formData, lecturer: e.target.value })
                }
              />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Label>Sĩ số</Label>
                <Input
                  type='number'
                  value={formData.studentCount}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      studentCount: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div>
                <Label>Số nhóm</Label>
                <Input
                  type='number'
                  value={formData.groupCount}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      groupCount: parseInt(e.target.value) || 0,
                    })
                  }
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
              <strong>{selectedCourse?.name}</strong>? Hành động này không thể
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
            <DialogTitle>Chi tiết Lớp học</DialogTitle>
          </DialogHeader>
          {selectedCourse && (
            <div className='space-y-4 py-4'>
              <div>
                <Label className='text-text-secondary'>Tên lớp</Label>
                <p className='text-text-title font-medium mt-1'>
                  {selectedCourse.name}
                </p>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <Label className='text-text-secondary'>Mã lớp</Label>
                  <div className='mt-1'>
                    {selectedCourse.courseCode ? (
                      <Badge className='bg-green-100 text-green-800'>
                        {selectedCourse.courseCode}
                      </Badge>
                    ) : (
                      <p className='text-text-secondary text-sm'>Chưa có</p>
                    )}
                  </div>
                </div>
                <div>
                  <Label className='text-text-secondary'>Kỳ học</Label>
                  <p className='text-text-title font-medium mt-1'>
                    {selectedCourse.semester}
                  </p>
                </div>
              </div>
              <div>
                <Label className='text-text-secondary'>Giảng viên</Label>
                <p className='text-text-title font-medium mt-1'>
                  {selectedCourse.lecturer}
                </p>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <Label className='text-text-secondary'>Sĩ số</Label>
                  <p className='text-text-title font-medium mt-1'>
                    {selectedCourse.studentCount} sinh viên
                  </p>
                </div>
                <div>
                  <Label className='text-text-secondary'>Số nhóm</Label>
                  <p className='text-text-title font-medium mt-1'>
                    {selectedCourse.groupCount || 0} nhóm
                  </p>
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
