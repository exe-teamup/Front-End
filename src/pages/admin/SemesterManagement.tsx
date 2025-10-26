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
  Dialog,
  DialogContent,
  DialogDescription,
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
  SemesterService,
  type CreateSemesterRequest,
  type UpdateSemesterRequest,
} from '@/services/semesterService';
import type { Semester } from '@/types/semester';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, Calendar } from 'lucide-react';
import { semesterSchema } from '@/schemas/semester.schema';
import { z } from 'zod';

export function SemesterManagement() {
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingSemester, setEditingSemester] = useState<Semester | null>(null);
  const [formData, setFormData] = useState({
    semesterCode: '',
    semesterName: '',
    startDate: '',
    endDate: '',
    semesterStatus: 'ACTIVE' as 'ACTIVE' | 'INACTIVE' | 'COMPLETED',
  });
  const [showCancelDialog, setShowCancelDialog] = useState<Semester | null>(
    null
  );
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    loadSemesters();
  }, []);

  const loadSemesters = async () => {
    try {
      setLoading(true);
      const data = await SemesterService.getAllSemesters();
      setSemesters(data);
    } catch {
      toast.error('Lỗi khi tải danh sách kỳ học');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      // Validate form data
      const validatedData = semesterSchema.parse(formData);
      setValidationErrors({});

      await SemesterService.createSemester(
        validatedData as CreateSemesterRequest
      );
      toast.success('Tạo kỳ học thành công');
      setOpenDialog(false);
      resetForm();
      loadSemesters();
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Map validation errors to form fields
        const errors: Record<string, string> = {};
        error.issues.forEach(issue => {
          if (issue.path.length > 0) {
            errors[issue.path[0] as string] = issue.message;
          }
        });
        setValidationErrors(errors);
        toast.error('Vui lòng kiểm tra lại thông tin nhập');
      } else {
        toast.error('Lỗi khi tạo kỳ học');
      }
    }
  };

  const handleUpdate = async () => {
    if (!editingSemester) return;

    try {
      // Validate form data
      const validatedData = semesterSchema.parse(formData);
      setValidationErrors({});

      await SemesterService.updateSemester(
        editingSemester.semesterId,
        validatedData as UpdateSemesterRequest
      );
      toast.success('Cập nhật kỳ học thành công');
      setOpenDialog(false);
      setEditingSemester(null);
      resetForm();
      loadSemesters();
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Map validation errors to form fields
        const errors: Record<string, string> = {};
        error.issues.forEach(issue => {
          if (issue.path.length > 0) {
            errors[issue.path[0] as string] = issue.message;
          }
        });
        setValidationErrors(errors);
        toast.error('Vui lòng kiểm tra lại thông tin nhập');
      } else {
        toast.error('Lỗi khi cập nhật kỳ học');
      }
    }
  };

  const confirmCancelRequest = () => {
    if (showCancelDialog) {
      handleDelete();
      setShowCancelDialog(null);
    }
  };

  const handleDelete = async () => {
    if (!showCancelDialog) return;

    try {
      await SemesterService.deleteSemester(showCancelDialog.semesterId);
      toast.success('Xóa kỳ học thành công');
      loadSemesters();
    } catch {
      toast.error('Lỗi khi xoá kỳ học');
    }
  };

  const resetForm = () => {
    setFormData({
      semesterCode: '',
      semesterName: '',
      startDate: '',
      endDate: '',
      semesterStatus: 'ACTIVE',
    });
    setValidationErrors({});
  };

  const openEditDialog = (semester: Semester) => {
    setEditingSemester(semester);
    setFormData({
      semesterCode: semester.semesterCode,
      semesterName: semester.semesterName ?? '',
      startDate: semester.startDate,
      endDate: semester.endDate,
      semesterStatus: semester.semesterStatus,
    });
    setOpenDialog(true);
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      ACTIVE: 'bg-green-100 text-green-800',
      INACTIVE: 'bg-blue-100 text-blue-800',
      COMPLETED: 'bg-purple-100 text-purple-800',
    };

    return (
      <span
        className={`w-2xl px-2 py-1 rounded-full text-xs font-medium ${statusMap[status as keyof typeof statusMap]}`}
      >
        {status == 'ACTIVE'
          ? 'Đang diễn ra'
          : status == 'INACTIVE'
            ? 'Sắp tới'
            : 'Đã hoàn thành'}
      </span>
    );
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
          <h1 className='text-2xl font-bold text-gray-900'>Quản lý Kỳ học</h1>
          <p className='text-gray-600'>Quản lý các kỳ học trong hệ thống</p>
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingSemester(null);
              }}
            >
              <Plus className='w-4 h-4 mr-2' />
              Thêm kỳ học
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-md'>
            <DialogHeader>
              <DialogTitle>
                {editingSemester ? 'Chỉnh sửa kỳ học' : 'Thêm kỳ học mới'}
              </DialogTitle>
              <DialogDescription>
                {editingSemester
                  ? 'Cập nhật thông tin kỳ học'
                  : 'Nhập thông tin kỳ học mới'}
              </DialogDescription>
            </DialogHeader>
            <div className='space-y-4'>
              <div>
                <Label htmlFor='semesterCode'>Mã kỳ học</Label>
                <Input
                  id='semesterCode'
                  value={formData.semesterCode}
                  onChange={e =>
                    setFormData({ ...formData, semesterCode: e.target.value })
                  }
                  placeholder='VD: FALL2024'
                  className={
                    validationErrors.semesterCode ? 'border-red-500' : ''
                  }
                />
                {validationErrors.semesterCode && (
                  <p className='text-sm text-red-500 mt-1'>
                    {validationErrors.semesterCode}
                  </p>
                )}
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <Label htmlFor='startDate'>Ngày bắt đầu</Label>
                  <Input
                    id='startDate'
                    type='date'
                    value={formData.startDate}
                    onChange={e =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    className={
                      validationErrors.startDate ? 'border-red-500' : ''
                    }
                  />
                  {validationErrors.startDate && (
                    <p className='text-sm text-red-500 mt-1'>
                      {validationErrors.startDate}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor='endDate'>Ngày kết thúc</Label>
                  <Input
                    id='endDate'
                    type='date'
                    value={formData.endDate}
                    onChange={e =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    className={validationErrors.endDate ? 'border-red-500' : ''}
                  />
                  {validationErrors.endDate && (
                    <p className='text-sm text-red-500 mt-1'>
                      {validationErrors.endDate}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor='status'>Trạng thái</Label>
                <select
                  id='status'
                  value={formData.semesterStatus}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      semesterStatus: e.target.value as
                        | 'ACTIVE'
                        | 'INACTIVE'
                        | 'COMPLETED',
                    })
                  }
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${validationErrors.semesterStatus ? 'border-red-500' : ''}`}
                >
                  <option value='ACTIVE'>Hoạt động</option>
                  <option value='INACTIVE'>Sắp tới</option>
                  <option value='COMPLETED'>Hoàn thành</option>
                </select>
                {validationErrors.semesterStatus && (
                  <p className='text-sm text-red-500 mt-1'>
                    {validationErrors.semesterStatus}
                  </p>
                )}
              </div>
              <div className='flex justify-end space-x-2'>
                <Button variant='outline' onClick={() => setOpenDialog(false)}>
                  Hủy
                </Button>
                <Button onClick={editingSemester ? handleUpdate : handleCreate}>
                  {editingSemester ? 'Cập nhật' : 'Tạo mới'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className='bg-white rounded-lg shadow'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã kỳ học</TableHead>
              <TableHead>Tên kỳ học</TableHead>
              <TableHead>Ngày bắt đầu</TableHead>
              <TableHead>Ngày kết thúc</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className='text-right'>Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {semesters.map(semester => (
              <TableRow key={semester.semesterId}>
                <TableCell className='font-medium'>
                  {semester.semesterCode}
                </TableCell>
                <TableCell>{semester.semesterName}</TableCell>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    <Calendar className='w-4 h-4 text-gray-400' />
                    {new Date(semester.startDate).toLocaleDateString('vi-VN')}
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    <Calendar className='w-4 h-4 text-gray-400' />
                    {new Date(semester.endDate).toLocaleDateString('vi-VN')}
                  </div>
                </TableCell>
                <TableCell className='w-36'>
                  {getStatusBadge(semester.semesterStatus)}
                </TableCell>
                <TableCell className='text-right'>
                  <div className='flex items-center justify-end gap-2'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => openEditDialog(semester)}
                    >
                      <Edit className='w-4 h-4' />
                    </Button>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => setShowCancelDialog(semester)}
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
      <AlertDialog
        open={!!showCancelDialog}
        onOpenChange={() => setShowCancelDialog(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xoá học kỳ này?</AlertDialogTitle>
          </AlertDialogHeader>
          <div className='py-4'>
            <p className='text-sm text-gray-900'>
              Bạn có chắc chắn muốn xoá học kỳ này không? <br />
              Hành động này không thể hoàn tác.
            </p>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Không</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmCancelRequest}
              className='bg-red-600 hover:bg-red-600/80 text-white'
            >
              Xoá học kỳ
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
