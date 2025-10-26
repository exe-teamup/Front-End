import { useState, useEffect } from 'react';
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { StudentService, type Student } from '@/services/studentService';
import { CourseService } from '@/services/courseService';
import { toast } from 'sonner';
import {
  FileUp,
  Trash2,
  Mail,
  BookOpen,
  Filter,
  GraduationCap,
  Lock,
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function StudentsManagement() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState<Student | null>(
    null
  );
  const [showDetailDialog, setShowDetailDialog] = useState<Student | null>(
    null
  );
  const [uploading, setUploading] = useState(false);
  const [courses, setCourses] = useState<
    { courseId: number; courseCode: string }[]
  >([]);
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [uploadType, setUploadType] = useState<'eligible' | 'not-eligible'>(
    'eligible'
  );

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalStudents, setTotalStudents] = useState(0);
  const itemsPerPage = 10;

  const handleDelete = async () => {
    if (!showDeleteDialog) return;

    try {
      await StudentService.deleteStudent(showDeleteDialog.userId);
      setStudents(prev =>
        prev.filter(student => student.userId !== showDeleteDialog.userId)
      );
      toast.success('Vô hiệu hóa tài khoản sinh viên thành công');
      setShowDeleteDialog(null);
    } catch {
      toast.error('Lỗi khi vô hiệu hóa tài khoản sinh viên');
    }
  };

  useEffect(() => {
    loadStudents();
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const response = await CourseService.getAllCourses();
      const uniqueCourses = Array.from(
        new Set(response.data.map(course => course.courseCode))
      ).map(code => {
        const course = response.data.find(c => c.courseCode === code);
        return { courseId: course?.courseId || 0, courseCode: code };
      });
      setCourses(uniqueCourses);
    } catch {
      // Silently fail, filter will just be empty
    }
  };

  const loadStudents = async () => {
    try {
      setLoading(true);
      const data = await StudentService.getAllStudents();
      const studentsWithAvatar = data.map(student => ({
        ...student,
        avatar: student.avatar || '/images/avatar.jpg',
      }));
      setStudents(studentsWithAvatar);
    } catch {
      toast.error('Lỗi khi tải danh sách sinh viên');
    } finally {
      setLoading(false);
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
      const uploadedStudents =
        uploadType === 'eligible'
          ? await StudentService.uploadStudents(file)
          : await StudentService.uploadStudentsNotEligible(file);

      const newStudents: Student[] = uploadedStudents.map(student => ({
        ...student,
        courseId: 1,
        accountId: student.userId,
        majorId: 1,
        majorName: 'Software Engineering',
        phoneNumber: '0987654321',
        bio: 'Student',
        createdAt: new Date().toISOString(),
        isLeader: false,
        groupId: null,
        groupName: null,
        avatar: '/images/avatar.jpg',
      }));

      setStudents(prev => [...prev, ...newStudents]);
      toast.success(
        `Tải lên thành công ${uploadedStudents.length} sinh viên ${uploadType === 'eligible' ? 'đủ điều kiện' : 'không đủ điều kiện'}`
      );
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Lỗi khi tải lên sinh viên'
      );
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch =
      student.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.userCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.majorName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCourse =
      selectedCourse === 'all' ||
      student.courseId.toString() === selectedCourse;

    const matchesStatus =
      selectedStatus === 'all' || student.userStatus === selectedStatus;

    return matchesSearch && matchesCourse && matchesStatus;
  });

  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setTotalStudents(filteredStudents.length);
    setTotalPages(Math.ceil(filteredStudents.length / itemsPerPage));
    if (currentPage > Math.ceil(filteredStudents.length / itemsPerPage)) {
      setCurrentPage(1);
    }
  }, [filteredStudents, currentPage]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ELIGIBLE':
        return (
          <span className='px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 whitespace-nowrap'>
            Đủ điều kiện
          </span>
        );
      case 'NOT_ELIGIBLE':
        return (
          <span className='px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 whitespace-nowrap'>
            Không đủ điều kiện
          </span>
        );
      case 'INACTIVE':
        return (
          <span className='px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 whitespace-nowrap'>
            Vô hiệu hóa
          </span>
        );
      default:
        return (
          <span className='px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 whitespace-nowrap'>
            Không xác định
          </span>
        );
    }
  };

  const handleViewDetails = (student: Student) => {
    setShowDetailDialog(student);
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center h-64'>
        <div className='text-gray-500'>Đang tải...</div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>
            Quản lý Sinh viên
          </h1>
          <p className='text-gray-600'>
            Quản lý thông tin sinh viên trong hệ thống ({students.length} sinh
            viên)
          </p>
        </div>
        <div className='flex space-x-2'>
          <Select
            value={uploadType}
            onValueChange={(value: 'eligible' | 'not-eligible') =>
              setUploadType(value)
            }
          >
            <SelectTrigger className='w-[200px]'>
              <SelectValue placeholder='Chọn loại upload' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='eligible'>Đủ điều kiện</SelectItem>
              <SelectItem value='not-eligible'>Không đủ điều kiện</SelectItem>
            </SelectContent>
          </Select>
          <div className='relative'>
            <input
              type='file'
              accept='.xlsx,.xls'
              onChange={handleFileUpload}
              className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
              disabled={uploading}
            />
            <Button disabled={uploading}>
              <FileUp className='w-4 h-4 mr-2' />
              {uploading
                ? 'Đang tải lên...'
                : `Thêm sinh viên ${uploadType === 'eligible' ? 'đủ điều kiện' : 'không đủ điều kiện'} (.xlsx)`}
            </Button>
          </div>
        </div>
      </div>

      <div className='flex items-center space-x-4'>
        <div className='flex-1'>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
            <Input
              placeholder='Tìm kiếm sinh viên theo tên, email, mã sinh viên hoặc chuyên ngành...'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className='pl-10'
            />
          </div>
        </div>
        <div className='flex items-center space-x-2'>
          <Filter className='w-4 h-4 text-gray-500' />
          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Chọn lớp' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>Tất cả lớp</SelectItem>
              {courses.map(course => (
                <SelectItem
                  key={course.courseCode}
                  value={course.courseId.toString()}
                >
                  {course.courseCode}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Chọn trạng thái' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>Tất cả trạng thái</SelectItem>
              <SelectItem value='ELIGIBLE'>Đủ điều kiện</SelectItem>
              <SelectItem value='NOT_ELIGIBLE'>Không đủ điều kiện</SelectItem>
              <SelectItem value='INACTIVE'>Vô hiệu hóa</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className='bg-white rounded-lg shadow'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã số sinh viên</TableHead>
              <TableHead>Thông tin</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Mã lớp</TableHead>
              <TableHead className='w-[150px]'>
                <div className='flex items-center space-x-2'>
                  <Lock className='w-4 h-4 text-gray-400' />
                  <span>Trạng thái</span>
                </div>
              </TableHead>
              <TableHead className='text-right'>Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className='text-center py-8'>
                  Đang tải...
                </TableCell>
              </TableRow>
            ) : paginatedStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className='text-center py-8'>
                  Không có sinh viên nào.
                </TableCell>
              </TableRow>
            ) : (
              paginatedStudents.map(student => (
                <TableRow key={student.userId}>
                  <TableCell>
                    <div className='flex items-center space-x-2'>
                      <BookOpen className='w-4 h-4 text-gray-400' />
                      <span className='font-medium font-mono'>
                        {student.userCode}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center space-x-3'>
                      <img
                        src={student.avatar || '/images/avatar.jpg'}
                        alt={student.fullName}
                        className='w-10 h-10 rounded-full object-cover'
                      />
                      <div>
                        <div className='font-medium'>{student.fullName}</div>
                        <div className='text-sm text-gray-500'>
                          {student.isLeader ? 'Trưởng nhóm' : 'Thành viên'}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center space-x-2'>
                      <Mail className='w-4 h-4 text-gray-400' />
                      <span className='text-sm'>{student.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center space-x-2'>
                      <GraduationCap className='w-4 h-4 text-gray-400' />
                      <span className='text-sm font-mono'>
                        {courses.find(c => c.courseId === student.courseId)
                          ?.courseCode || 'N/A'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className='w-[150px]'>
                    {getStatusBadge(student.userStatus)}
                  </TableCell>
                  <TableCell className='text-right'>
                    <div className='flex items-center justify-end space-x-2'>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => handleViewDetails(student)}
                        title='Xem chi tiết'
                      >
                        <Eye className='w-4 h-4 mr-1' />
                        Xem chi tiết
                      </Button>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => setShowDeleteDialog(student)}
                        title='Vô hiệu hóa tài khoản'
                        disabled={student.userStatus === 'INACTIVE'}
                      >
                        <Trash2 className='w-4 h-4 text-red-600' />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className='flex items-center justify-between'>
        <div className='text-sm text-gray-500'>
          Hiển thị {paginatedStudents.length} trong {totalStudents} sinh viên
        </div>
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!showDeleteDialog}
        onOpenChange={() => setShowDeleteDialog(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Vô hiệu hóa tài khoản sinh viên này?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <div className='py-4'>
            <p className='text-sm text-gray-900'>
              Bạn có chắc chắn muốn vô hiệu hóa tài khoản sinh viên{' '}
              <strong>{showDeleteDialog?.fullName}</strong> (
              {showDeleteDialog?.userCode}) không? <br />
              Sinh viên sẽ không thể truy cập hệ thống và hành động này không
              thể hoàn tác.
            </p>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className='bg-red-600 hover:bg-red-600/80 text-white'
            >
              Vô hiệu hóa tài khoản
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Student Detail Modal */}
      <Dialog
        open={!!showDetailDialog}
        onOpenChange={() => setShowDetailDialog(null)}
      >
        <DialogContent className='max-w-2xl max-h-[80vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>Chi tiết sinh viên</DialogTitle>
          </DialogHeader>

          {showDetailDialog && (
            <div className='space-y-6'>
              {/* Header with Avatar and Basic Info */}
              <div className='flex items-start space-x-4'>
                <img
                  src={showDetailDialog.avatar || '/images/avatar.jpg'}
                  alt={showDetailDialog.fullName}
                  className='w-20 h-20 rounded-full object-cover'
                />
                <div className='flex-1'>
                  <h3 className='text-xl font-semibold text-gray-900'>
                    {showDetailDialog.fullName}
                  </h3>
                  <p className='text-sm text-gray-500 font-mono'>
                    {showDetailDialog.userCode}
                  </p>
                  <div className='mt-2'>
                    {getStatusBadge(showDetailDialog.userStatus)}
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-4'>
                  <div>
                    <div className='text-sm font-medium text-gray-500'>
                      Email
                    </div>
                    <div className='flex items-center space-x-2 mt-1'>
                      <Mail className='w-4 h-4 text-gray-400' />
                      <span className='text-sm'>{showDetailDialog.email}</span>
                    </div>
                  </div>

                  <div>
                    <div className='text-sm font-medium text-gray-500'>
                      Số điện thoại
                    </div>
                    <p className='text-sm mt-1'>
                      {showDetailDialog.phoneNumber}
                    </p>
                  </div>

                  <div>
                    <div className='text-sm font-medium text-gray-500'>
                      Vai trò
                    </div>
                    <p className='text-sm mt-1'>
                      {showDetailDialog.isLeader ? 'Trưởng nhóm' : 'Thành viên'}
                    </p>
                  </div>
                </div>

                <div className='space-y-4'>
                  <div>
                    <div className='text-sm font-medium text-gray-500'>
                      Mã lớp học
                    </div>
                    <div className='flex items-center space-x-2 mt-1'>
                      <GraduationCap className='w-4 h-4 text-gray-400' />
                      <span className='text-sm font-mono'>
                        {courses.find(
                          c => c.courseId === showDetailDialog.courseId
                        )?.courseCode || 'N/A'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className='text-sm font-medium text-gray-500'>
                      Chuyên ngành
                    </div>
                    <div className='flex items-center space-x-2 mt-1'>
                      <BookOpen className='w-4 h-4 text-gray-400' />
                      <span className='text-sm'>
                        {showDetailDialog.majorName}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className='text-sm font-medium text-gray-500'>
                      Ngày tạo
                    </div>
                    <p className='text-sm mt-1'>
                      {new Date(showDetailDialog.createdAt).toLocaleDateString(
                        'vi-VN'
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Group Information */}
              <div>
                <div className='text-sm font-medium text-gray-500'>
                  Thông tin nhóm
                </div>
                <div className='mt-2 p-3 bg-gray-50 rounded-lg'>
                  {showDetailDialog.groupName ? (
                    <div>
                      <p className='text-sm font-medium'>
                        {showDetailDialog.groupName}
                      </p>
                      <p className='text-xs text-gray-500'>
                        ID: {showDetailDialog.groupId}
                      </p>
                    </div>
                  ) : (
                    <p className='text-sm text-gray-500'>
                      Chưa tham gia nhóm nào
                    </p>
                  )}
                </div>
              </div>

              {/* Bio */}
              {showDetailDialog.bio && (
                <div>
                  <div className='text-sm font-medium text-gray-500'>
                    Giới thiệu
                  </div>
                  <p className='text-sm mt-1 p-3 bg-gray-50 rounded-lg'>
                    {showDetailDialog.bio}
                  </p>
                </div>
              )}

              {/* Account Information */}
              <div className='border-t pt-4'>
                <h4 className='text-sm font-medium text-gray-500 mb-2'>
                  Thông tin tài khoản
                </h4>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
                  <div>
                    <span className='text-gray-500'>Account ID:</span>
                    <span className='ml-2 font-mono'>
                      {showDetailDialog.accountId}
                    </span>
                  </div>
                  <div>
                    <span className='text-gray-500'>User ID:</span>
                    <span className='ml-2 font-mono'>
                      {showDetailDialog.userId}
                    </span>
                  </div>
                  <div>
                    <span className='text-gray-500'>Course ID:</span>
                    <span className='ml-2 font-mono'>
                      {showDetailDialog.courseId}
                    </span>
                  </div>
                  <div>
                    <span className='text-gray-500'>Major ID:</span>
                    <span className='ml-2 font-mono'>
                      {showDetailDialog.majorId}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
