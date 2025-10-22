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
import { toast } from 'sonner';
import { FileUp, UserLock, Mail, GraduationCap } from 'lucide-react';

export function LecturersManagement() {
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCancelDialog, setShowCancelDialog] = useState<Lecturer | null>(
    null
  );
  const [uploading, setUploading] = useState(false);

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
        setShowCancelDialog(null);
      } catch {
        toast.error('Lỗi khi ngừng hoạt động giảng viên');
      }
    }
  };

  useEffect(() => {
    loadLecturers();
  }, []);

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

  const filteredLecturers = lecturers.filter(
    lecturer =>
      lecturer.lecturerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lecturer.email &&
        lecturer.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (lecturer.courseCode &&
        lecturer.courseCode.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
            placeholder='Tìm kiếm giảng viên...'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
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
                      onClick={() => setShowCancelDialog(lecturer)}
                    >
                      <UserLock className='w-4 h-4' />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
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
