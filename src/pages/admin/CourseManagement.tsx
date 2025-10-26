import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  CourseService,
  type CourseWithDetails,
} from '@/services/courseService';
import { SemesterService } from '@/services/semesterService';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  courseSchema,
  type CreateCourseFormData,
} from '@/schemas/course.schema';
import { toast } from 'sonner';
import {
  Plus,
  Edit,
  Trash2,
  FileUp,
  BookOpen,
  Users,
  Calendar,
  Search,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import type { Semester } from '@/types/semester';

export function ClassManagement() {
  const [classes, setClasses] = useState<CourseWithDetails[]>([]);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingClass, setEditingClass] = useState<CourseWithDetails | null>(
    null
  );
  const [showDeleteDialog, setShowDeleteDialog] =
    useState<CourseWithDetails | null>(null);

  // Pagination and filters
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [selectedSemester, setSelectedSemester] = useState<
    number | undefined
  >();
  const [totalClasses, setTotalClasses] = useState(0);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateCourseFormData>({
    resolver: zodResolver(
      courseSchema.omit({ courseId: true, groupCount: true })
    ),
  });

  const loadSemesters = useCallback(async () => {
    try {
      const data = await SemesterService.getAllSemesters();
      setSemesters(data);
    } catch {
      toast.error('Lỗi khi tải danh sách học kỳ');
    }
  }, []);

  const loadClasses = useCallback(async () => {
    try {
      setLoading(true);
      setSearching(!!debouncedSearchQuery);
      const params = {
        page: currentPage,
        limit: 10,
        ...(selectedSemester && { semesterId: selectedSemester }),
        ...(debouncedSearchQuery && { search: debouncedSearchQuery }),
      };

      const response = await CourseService.getAllCourses(params);
      setClasses(response.data);
      setTotalPages(response.pagination.totalPages);
      setTotalClasses(response.pagination.total);
    } catch {
      toast.error('Lỗi khi tải danh sách lớp học');
    } finally {
      setLoading(false);
      setSearching(false);
    }
  }, [currentPage, debouncedSearchQuery, selectedSemester]);

  useEffect(() => {
    loadSemesters();
  }, [loadSemesters]);

  useEffect(() => {
    loadClasses();
  }, [loadClasses]);

  // Reset to first page when search or filter changes
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [currentPage, debouncedSearchQuery, selectedSemester]);

  const handleCreate = async (data: CreateCourseFormData) => {
    try {
      await CourseService.createCourse(data);
      toast.success('Tạo lớp học thành công');
      setOpenDialog(false);
      reset();
    } catch {
      toast.error('Lỗi khi tạo lớp học');
    }
  };

  const handleUpdate = async (data: CreateCourseFormData) => {
    if (!editingClass) return;

    try {
      await CourseService.updateCourse(editingClass.courseId!, data);
      toast.success('Cập nhật lớp học thành công');
      setOpenDialog(false);
      setEditingClass(null);
      reset();
    } catch {
      toast.error('Lỗi khi cập nhật lớp học');
    }
  };

  const handleDelete = async () => {
    if (!showDeleteDialog) return;

    try {
      await CourseService.deleteCourse(showDeleteDialog.courseId!);
      toast.success('Xóa lớp học thành công');
      setShowDeleteDialog(null);
    } catch {
      toast.error('Lỗi khi xóa lớp học');
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      toast.error('Vui lòng chọn file Excel (.xlsx hoặc .xls)');
      return;
    }

    try {
      setUploading(true);
      const importedCourses = await CourseService.importCourses(file);
      toast.success(`Import thành công ${importedCourses.length} lớp học`);
    } catch {
      toast.error('Lỗi khi import file');
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  const openEditDialog = (classItem: CourseWithDetails) => {
    setEditingClass(classItem);
    setValue('semesterId', classItem.semesterId);
    setValue('lecturerId', classItem.lecturerId || undefined);
    setValue('courseCode', classItem.courseCode);
    setValue('courseName', classItem.courseName || '');
    setValue('maxGroup', classItem.maxGroup);
    setOpenDialog(true);
  };

  const resetForm = () => {
    reset();
    setEditingClass(null);
  };

  // No need for client-side filtering since we have server-side filtering
  const filteredClasses = classes || [];

  if (loading) {
    return (
      <div className='flex items-center justify-center h-64'>
        <div className='text-gray-500'>Đang tải...</div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>Quản lý Lớp học</h1>
          <p className='text-gray-600'>
            Quản lý các lớp học trong hệ thống ({totalClasses} lớp học)
          </p>
        </div>
        <div className='flex space-x-2'>
          <div className='relative'>
            <input
              type='file'
              accept='.xlsx,.xls'
              onChange={handleFileUpload}
              className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
              disabled={uploading}
            />
            <Button disabled={uploading} variant='outline'>
              <FileUp className='w-4 h-4 mr-2' />
              {uploading ? 'Đang import...' : 'Import Excel'}
            </Button>
          </div>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className='w-4 h-4 mr-2' />
                Thêm lớp học
              </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-md'>
              <DialogHeader>
                <DialogTitle>
                  {editingClass ? 'Chỉnh sửa lớp học' : 'Thêm lớp học mới'}
                </DialogTitle>
              </DialogHeader>
              <form
                onSubmit={handleSubmit(
                  editingClass ? handleUpdate : handleCreate
                )}
              >
                <div className='space-y-4'>
                  <div>
                    <Label htmlFor='semesterId'>Học kỳ</Label>
                    <Select
                      value={selectedSemester?.toString()}
                      onValueChange={value =>
                        setValue('semesterId', parseInt(value))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Chọn học kỳ' />
                      </SelectTrigger>
                      <SelectContent>
                        {semesters.map(semester => (
                          <SelectItem
                            key={semester.semesterId}
                            value={semester.semesterId.toString()}
                          >
                            {semester.semesterCode}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.semesterId && (
                      <p className='text-sm text-red-500'>
                        Học kỳ không được để trống
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor='courseCode'>Mã lớp học</Label>
                    <Input
                      id='courseCode'
                      {...register('courseCode')}
                      placeholder='VD: SE1234'
                    />
                    {errors.courseCode && (
                      <p className='text-sm text-red-500'>
                        {errors.courseCode.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor='courseName'>Tên lớp học</Label>
                    <Input
                      id='courseName'
                      {...register('courseName')}
                      placeholder='VD: Lập trình Web'
                    />
                    {errors.courseName && (
                      <p className='text-sm text-red-500'>
                        {errors.courseName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor='maxGroup'>Số nhóm tối đa cho một lớp</Label>
                    <Input
                      id='maxGroup'
                      type='number'
                      {...register('maxGroup', { valueAsNumber: true })}
                      placeholder='VD: 6'
                    />
                    {errors.maxGroup && (
                      <p className='text-sm text-red-500'>
                        {errors.maxGroup.message}
                      </p>
                    )}
                  </div>

                  <div className='flex justify-end space-x-2'>
                    <Button
                      type='button'
                      variant='outline'
                      onClick={() => setOpenDialog(false)}
                    >
                      Hủy
                    </Button>
                    <Button type='submit'>
                      {editingClass ? 'Cập nhật' : 'Tạo mới'}
                    </Button>
                  </div>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <div className='flex items-center space-x-4'>
        <div className='flex-1'>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
            <Input
              placeholder='Tìm kiếm lớp học...'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className='pl-10'
              disabled={searching}
            />
            {searching && (
              <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
                <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900'></div>
              </div>
            )}
          </div>
        </div>
        <Select
          value={selectedSemester?.toString() || 'all'}
          onValueChange={value =>
            setSelectedSemester(value === 'all' ? undefined : parseInt(value))
          }
        >
          <SelectTrigger className='w-48'>
            <SelectValue placeholder='Lọc theo học kỳ' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>Tất cả học kỳ</SelectItem>
            {semesters.map(semester => (
              <SelectItem
                key={semester.semesterId}
                value={semester.semesterId.toString()}
              >
                {semester.semesterCode}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className='bg-white rounded-lg shadow'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã lớp học</TableHead>
              <TableHead>Học kỳ</TableHead>
              <TableHead>Giảng viên</TableHead>
              <TableHead>Nhóm</TableHead>
              <TableHead className='text-right'>Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClasses.map(classItem => (
              <TableRow key={classItem.courseId}>
                <TableCell>
                  <div className='flex items-center space-x-2'>
                    <BookOpen className='w-4 h-4 text-gray-400' />
                    <span className='font-medium'>{classItem.courseCode}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center space-x-2'>
                    <Calendar className='w-4 h-4 text-gray-400' />
                    <span className='text-sm'>
                      {classItem.semester?.semesterCode}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className='text-sm'>
                    {classItem.lecturer?.lecturerName || 'Chưa phân công'}
                  </span>
                </TableCell>
                <TableCell>
                  <div className='flex items-center space-x-2'>
                    <Users className='w-4 h-4 text-gray-400' />
                    <span className='text-sm'>
                      {classItem.groupCount || 0}/{classItem.maxGroup}
                    </span>
                  </div>
                </TableCell>
                <TableCell className='text-right'>
                  <div className='flex items-center justify-end space-x-2'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => openEditDialog(classItem)}
                    >
                      <Edit className='w-4 h-4' />
                    </Button>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => setShowDeleteDialog(classItem)}
                    >
                      <Trash2 className='w-4 h-4' />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className='flex items-center justify-between'>
        <div className='text-sm text-gray-500'>
          Hiển thị {classes?.length || 0} trong {totalClasses} lớp học
          <div className='flex items-center space-x-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className='w-4 h-4' />
            </Button>
            <span className='text-sm'>
              Trang {currentPage} / {totalPages}
            </span>
            <Button
              variant='outline'
              size='sm'
              onClick={() =>
                setCurrentPage(prev => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
            >
              <ChevronRight className='w-4 h-4' />
            </Button>
          </div>
        </div>

        {/* Delete Dialog */}
        <AlertDialog
          open={!!showDeleteDialog}
          onOpenChange={() => setShowDeleteDialog(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Xóa môn học này?</AlertDialogTitle>
            </AlertDialogHeader>
            <div className='py-4'>
              <p className='text-sm text-gray-900'>
                Bạn có chắc chắn muốn xóa môn học{' '}
                <strong>{showDeleteDialog?.courseCode}</strong> không? <br />
                Hành động này không thể hoàn tác.
              </p>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Không</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className='bg-red-600 hover:bg-red-600/80 text-white'
              >
                Xóa môn học
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
