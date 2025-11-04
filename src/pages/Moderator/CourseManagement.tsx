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
import { Plus, Pencil, Trash2, Eye } from 'lucide-react';
import { mockCourses, mockSemesters, type Course } from './mockData';

export function CourseManagement() {
  const [courses, setCourses] = useState(mockCourses);
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    semester: '',
    lecturer: '',
    studentCount: 0,
  });

  const filteredCourses =
    selectedSemester === 'all'
      ? courses
      : courses.filter(c => c.semester === selectedSemester);

  const handleCreate = () => {
    const newCourse: Course = {
      id: (courses.length + 1).toString(),
      ...formData,
    };
    setCourses([...courses, newCourse]);
    setIsCreateOpen(false);
    setFormData({ name: '', semester: '', lecturer: '', studentCount: 0 });
  };

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
      semester: course.semester,
      lecturer: course.lecturer,
      studentCount: course.studentCount,
    });
    setIsEditOpen(true);
  };

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bold text-text-title'>
            Quản lý Lớp học
          </h1>
          <p className='text-text-body mt-2'>Danh sách lớp học theo kỳ học</p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className='w-4 h-4 mr-2' />
          Thêm Lớp học
        </Button>
      </div>

      <Card className='shadow-lg border border-gray-200'>
        <CardHeader className='bg-gradient-to-r from-primary to-gray-100'>
          <div className='flex justify-between items-center'>
            <CardTitle className='text-white'>
              Danh sách Lớp học ({filteredCourses.length})
            </CardTitle>
            <Select
              value={selectedSemester}
              onValueChange={setSelectedSemester}
            >
              <SelectTrigger className='w-[200px] bg-white'>
                <SelectValue placeholder='Chọn kỳ học' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>Tất cả</SelectItem>
                {mockSemesters.map(s => (
                  <SelectItem key={s.id} value={s.name}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className='pt-6'>
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên lớp</TableHead>
                  <TableHead>Kỳ học</TableHead>
                  <TableHead>Giảng viên</TableHead>
                  <TableHead>Sĩ số</TableHead>
                  <TableHead className='text-right'>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.map(c => (
                  <TableRow key={c.id} className='hover:bg-gray-50'>
                    <TableCell className='font-medium'>{c.name}</TableCell>
                    <TableCell>{c.semester}</TableCell>
                    <TableCell>{c.lecturer}</TableCell>
                    <TableCell>{c.studentCount}</TableCell>
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
        </CardContent>
      </Card>

      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm Lớp học mới</DialogTitle>
          </DialogHeader>
          <div className='space-y-4 py-4'>
            <div>
              <Label>Tên lớp</Label>
              <Input
                placeholder='VD: EXE101_Fall2025_C1'
                value={formData.name}
                onChange={e =>
                  setFormData({ ...formData, name: e.target.value })
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
                  <SelectValue placeholder='Chọn kỳ học' />
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
            <div>
              <Label>Giảng viên</Label>
              <Input
                placeholder='Tên giảng viên'
                value={formData.lecturer}
                onChange={e =>
                  setFormData({ ...formData, lecturer: e.target.value })
                }
              />
            </div>
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
            <div>
              <Label>Giảng viên</Label>
              <Input
                value={formData.lecturer}
                onChange={e =>
                  setFormData({ ...formData, lecturer: e.target.value })
                }
              />
            </div>
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
                  <Label className='text-text-secondary'>Kỳ học</Label>
                  <p className='text-text-title font-medium mt-1'>
                    {selectedCourse.semester}
                  </p>
                </div>
                <div>
                  <Label className='text-text-secondary'>Sĩ số</Label>
                  <p className='text-text-title font-medium mt-1'>
                    {selectedCourse.studentCount}
                  </p>
                </div>
              </div>
              <div>
                <Label className='text-text-secondary'>Giảng viên</Label>
                <p className='text-text-title font-medium mt-1'>
                  {selectedCourse.lecturer}
                </p>
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
