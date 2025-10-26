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
import { LecturerService, type Lecturer } from '@/services/lectureService';
import { CourseService } from '@/services/courseService';
import { toast } from 'sonner';
import {
  FileUp,
  Lock,
  LockOpen,
  Mail,
  GraduationCap,
  Filter,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function LecturersManagement() {
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCancelDialog, setShowCancelDialog] = useState<Lecturer | null>(
    null
  );
  const [uploading, setUploading] = useState(false);
  const [courses, setCourses] = useState<{ courseCode: string }[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showLockDialog, setShowLockDialog] = useState<Lecturer | null>(null);

  const handleToggleLock = async (lecturer: Lecturer) => {
    try {
      const newStatus =
        lecturer.lecturerStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
      // API expects 'status' field, not 'lecturerStatus'
      await LecturerService.updateLecturer(lecturer.lecturerId, {
        status: newStatus,
      } as Partial<Lecturer>);

      // Update local state
      setLecturers(prev =>
        prev.map(l =>
          l.lecturerId === lecturer.lecturerId
            ? { ...l, lecturerStatus: newStatus }
            : l
        )
      );

      toast.success(
        newStatus === 'ACTIVE'
          ? 'Mở khóa giảng viên thành công'
          : 'Khóa giảng viên thành công'
      );
      setShowLockDialog(null);
    } catch {
      toast.error('Lỗi khi thay đổi trạng thái giảng viên');
    }
  };

  const confirmCancelRequest = async () => {
    if (showCancelDialog) {
      try {
        await LecturerService.deleteLecturer(showCancelDialog.lecturerId);
        setLecturers(prev =>
          prev.filter(
            lecturer => lecturer.lecturerId !== showCancelDialog.lecturerId
          )
        );
        toast.success('Ngừng hoạt động giảng viên thành công');
        loadLecturers();
        setShowCancelDialog(null);
      } catch {
        toast.error('Lỗi khi ngừng hoạt động giảng viên');
      }
    }
  };

  useEffect(() => {
    loadLecturers();
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const response = await CourseService.getAllCourses();
      // Extract unique course codes
      const uniqueCourses = Array.from(
        new Set(response.data.map(course => course.courseCode))
      ).map(code => ({ courseCode: code }));
      setCourses(uniqueCourses);
    } catch {
      // Silently fail, filter will just be empty
    }
  };

  const loadLecturers = async () => {
    try {
      setLoading(true);
      const data = await LecturerService.getAllLecturers();
      // Add default course info for display
      const lecturersWithCourse = data.map(lecturer => ({
        ...lecturer,
        courseId: lecturer.courseId || 1,
        courseCode: lecturer.courseCode || 'SE1902',
        email: lecturer.email || `lecturer${lecturer.lecturerId}@fpt.edu.vn`,
        avatar: lecturer.avatar || '/images/avatar.jpg',
      }));
      setLecturers(lecturersWithCourse);
    } catch {
      toast.error('Lỗi khi tải danh sách giảng viên');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      toast.error('Vui lòng chọn file Excel (.xlsx hoặc .xls)');
      return;
    }

    try {
      setUploading(true);
      const uploadedLecturers = await LecturerService.uploadLecturers(file);

      // Add default course info and refresh the list
      const newLecturers = uploadedLecturers.map(lecturer => ({
        ...lecturer,
        courseId: 1,
        courseCode: 'SE1902',
        email: `lecturer${lecturer.lecturerId}@fpt.edu.vn`,
        avatar: '/images/avatar.jpg',
      }));

      setLecturers(prev => [...prev, ...newLecturers]);
      toast.success(
        `Tải lên thành công ${uploadedLecturers.length} giảng viên`
      );
    } catch {
      toast.error('Lỗi khi tải lên file');
    } finally {
      setUploading(false);
      // Reset file input
      event.target.value = '';
    }
  };

  const filteredLecturers = lecturers.filter(lecturer => {
    // Search filter
    const matchesSearch =
      lecturer.lecturerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lecturer.email &&
        lecturer.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (lecturer.courseCode &&
        lecturer.courseCode.toLowerCase().includes(searchQuery.toLowerCase()));

    // Course filter
    const matchesCourse =
      selectedCourse === 'all' || lecturer.courseCode === selectedCourse;

    // Status filter
    const matchesStatus =
      selectedStatus === 'all' || lecturer.lecturerStatus === selectedStatus;

    return matchesSearch && matchesCourse && matchesStatus;
  });

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
            Quản lý Giảng viên
          </h1>
          <p className='text-gray-600'>
            Quản lý thông tin giảng viên trong hệ thống
          </p>
        </div>
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
            {uploading ? 'Đang tải lên...' : 'Thêm giảng viên (.xlsx)'}
          </Button>
        </div>
      </div>

      <div className='flex items-center space-x-4'>
        <div className='flex-1'>
          <Input
            placeholder='Tìm kiếm giảng viên theo tên, email hoặc mã lớp...'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
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
                <SelectItem key={course.courseCode} value={course.courseCode}>
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
              <SelectItem value='ACTIVE'>Hoạt động</SelectItem>
              <SelectItem value='INACTIVE'>Bị khóa</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className='bg-white rounded-lg shadow'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Thông tin</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Mã lớp học</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className='text-right'>Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLecturers.map(lecturer => (
              <TableRow key={lecturer.lecturerId}>
                <TableCell>
                  <div className='flex items-center space-x-3'>
                    <img
                      src={lecturer.avatar || '/images/avatar.jpg'}
                      alt={lecturer.lecturerName}
                      className='w-10 h-10 rounded-full object-cover'
                    />
                    <div>
                      <div className='font-medium'>{lecturer.lecturerName}</div>
                      <div className='text-sm text-gray-500'>
                        ID: {lecturer.lecturerId}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center space-x-2'>
                    <Mail className='w-4 h-4 text-gray-400' />
                    <span className='text-sm'>{lecturer.email}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center space-x-2'>
                    <GraduationCap className='w-4 h-4 text-gray-400' />
                    <span className='text-sm'>{lecturer.courseCode}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center space-x-2'>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        lecturer.lecturerStatus === 'ACTIVE'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {lecturer.lecturerStatus}
                    </span>
                  </div>
                </TableCell>
                <TableCell className='text-right'>
                  <div className='flex items-center justify-end space-x-2'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => setShowLockDialog(lecturer)}
                      title={
                        lecturer.lecturerStatus === 'ACTIVE'
                          ? 'Khóa giảng viên'
                          : 'Mở khóa giảng viên'
                      }
                    >
                      {lecturer.lecturerStatus === 'ACTIVE' ? (
                        <Lock className='w-4 h-4 text-red-600' />
                      ) : (
                        <LockOpen className='w-4 h-4 text-green-600' />
                      )}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* Lock/Unlock Dialog */}
      <AlertDialog
        open={!!showLockDialog}
        onOpenChange={() => setShowLockDialog(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {showLockDialog?.lecturerStatus === 'ACTIVE'
                ? 'Khóa giảng viên này?'
                : 'Mở khóa giảng viên này?'}
            </AlertDialogTitle>
          </AlertDialogHeader>
          <div className='py-4'>
            <p className='text-sm text-gray-900'>
              {showLockDialog?.lecturerStatus === 'ACTIVE' ? (
                <>
                  Bạn có chắc chắn muốn khóa giảng viên{' '}
                  <strong>{showLockDialog?.lecturerName}</strong> không? <br />
                  Giảng viên sẽ không thể truy cập hệ thống.
                </>
              ) : (
                <>
                  Bạn có chắc chắn muốn mở khóa giảng viên{' '}
                  <strong>{showLockDialog?.lecturerName}</strong> không? <br />
                  Giảng viên sẽ có thể truy cập hệ thống trở lại.
                </>
              )}
            </p>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => showLockDialog && handleToggleLock(showLockDialog)}
              className={
                showLockDialog?.lecturerStatus === 'ACTIVE'
                  ? 'bg-red-600 hover:bg-red-600/80 text-white'
                  : 'bg-green-600 hover:bg-green-600/80 text-white'
              }
            >
              {showLockDialog?.lecturerStatus === 'ACTIVE' ? 'Khóa' : 'Mở khóa'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Dialog */}
      <AlertDialog
        open={!!showCancelDialog}
        onOpenChange={() => setShowCancelDialog(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Ngừng hoạt động của giảng viên này?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <div className='py-4'>
            <p className='text-sm text-gray-900'>
              Bạn có chắc chắn muốn ngừng hoạt động giảng viên này không? <br />
              Hành động này không thể hoàn tác.
            </p>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Không</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmCancelRequest}
              className='bg-red-600 hover:bg-red-600/80 text-white'
            >
              Ngừng hoạt động
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
