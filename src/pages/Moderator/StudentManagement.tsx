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
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2, Eye } from 'lucide-react';
import {
  mockStudentsWithGroup,
  mockStudentsWithoutGroup,
  type Student,
} from './mockData';

export function StudentManagement() {
  const [students, setStudents] = useState([
    ...mockStudentsWithGroup,
    ...mockStudentsWithoutGroup,
  ]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    mssv: '',
    class: '',
    major: '',
    group: '',
  });

  const handleCreate = () => {
    const newStudent: Student = {
      id: (students.length + 1).toString(),
      ...formData,
    };
    setStudents([...students, newStudent]);
    setIsCreateOpen(false);
    setFormData({ name: '', mssv: '', class: '', major: '', group: '' });
  };

  const handleEdit = () => {
    if (selectedStudent) {
      setStudents(
        students.map(s =>
          s.id === selectedStudent.id ? { ...selectedStudent, ...formData } : s
        )
      );
      setIsEditOpen(false);
      setSelectedStudent(null);
    }
  };

  const handleDelete = () => {
    if (selectedStudent) {
      setStudents(students.filter(s => s.id !== selectedStudent.id));
      setIsDeleteOpen(false);
      setSelectedStudent(null);
    }
  };

  const openEdit = (student: Student) => {
    setSelectedStudent(student);
    setFormData({
      name: student.name,
      mssv: student.mssv,
      class: student.class,
      major: student.major,
      group: student.group || '',
    });
    setIsEditOpen(true);
  };

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bold text-text-title'>
            Quản lý Sinh viên
          </h1>
          <p className='text-text-body mt-2'>Danh sách sinh viên và nhóm</p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className='w-4 h-4 mr-2' />
          Thêm Sinh viên
        </Button>
      </div>

      <Card className='shadow-lg border border-gray-200'>
        <CardHeader className='bg-gradient-to-r from-primary to-gray-100'>
          <CardTitle className='text-white'>
            Danh sách Sinh viên ({students.length})
          </CardTitle>
        </CardHeader>
        <CardContent className='pt-6'>
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>MSSV</TableHead>
                  <TableHead>Họ tên</TableHead>
                  <TableHead>Lớp</TableHead>
                  <TableHead>Ngành</TableHead>
                  <TableHead>Nhóm</TableHead>
                  <TableHead className='text-right'>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map(s => (
                  <TableRow key={s.id} className='hover:bg-gray-50'>
                    <TableCell className='font-medium'>{s.mssv}</TableCell>
                    <TableCell>{s.name}</TableCell>
                    <TableCell>{s.class}</TableCell>
                    <TableCell>{s.major}</TableCell>
                    <TableCell>
                      {s.group ? (
                        <Badge variant='default'>{s.group}</Badge>
                      ) : (
                        <Badge variant='outline'>Chưa có nhóm</Badge>
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
        </CardContent>
      </Card>

      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm Sinh viên mới</DialogTitle>
          </DialogHeader>
          <div className='space-y-4 py-4'>
            <div>
              <Label>MSSV</Label>
              <Input
                placeholder='VD: SE184567'
                value={formData.mssv}
                onChange={e =>
                  setFormData({ ...formData, mssv: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Họ tên</Label>
              <Input
                placeholder='Họ và tên sinh viên'
                value={formData.name}
                onChange={e =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Label>Lớp</Label>
                <Input
                  placeholder='VD: SE1847'
                  value={formData.class}
                  onChange={e =>
                    setFormData({ ...formData, class: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Ngành</Label>
                <Input
                  placeholder='VD: SE'
                  value={formData.major}
                  onChange={e =>
                    setFormData({ ...formData, major: e.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <Label>Nhóm (tùy chọn)</Label>
              <Input
                placeholder='Tên nhóm nếu có'
                value={formData.group}
                onChange={e =>
                  setFormData({ ...formData, group: e.target.value })
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
            <DialogTitle>Chỉnh sửa Sinh viên</DialogTitle>
          </DialogHeader>
          <div className='space-y-4 py-4'>
            <div>
              <Label>MSSV</Label>
              <Input
                value={formData.mssv}
                onChange={e =>
                  setFormData({ ...formData, mssv: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Họ tên</Label>
              <Input
                value={formData.name}
                onChange={e =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Label>Lớp</Label>
                <Input
                  value={formData.class}
                  onChange={e =>
                    setFormData({ ...formData, class: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Ngành</Label>
                <Input
                  value={formData.major}
                  onChange={e =>
                    setFormData({ ...formData, major: e.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <Label>Nhóm (tùy chọn)</Label>
              <Input
                value={formData.group}
                onChange={e =>
                  setFormData({ ...formData, group: e.target.value })
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
              Bạn có chắc chắn muốn xóa sinh viên{' '}
              <strong>{selectedStudent?.name}</strong> (MSSV:{' '}
              {selectedStudent?.mssv})? Hành động này không thể hoàn tác.
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
                  <Label className='text-text-secondary'>MSSV</Label>
                  <p className='text-text-title font-medium mt-1'>
                    {selectedStudent.mssv}
                  </p>
                </div>
                <div>
                  <Label className='text-text-secondary'>Họ tên</Label>
                  <p className='text-text-title font-medium mt-1'>
                    {selectedStudent.name}
                  </p>
                </div>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <Label className='text-text-secondary'>Lớp</Label>
                  <p className='text-text-title font-medium mt-1'>
                    {selectedStudent.class}
                  </p>
                </div>
                <div>
                  <Label className='text-text-secondary'>Ngành</Label>
                  <p className='text-text-title font-medium mt-1'>
                    {selectedStudent.major}
                  </p>
                </div>
              </div>
              <div>
                <Label className='text-text-secondary'>Nhóm</Label>
                <p className='text-text-title font-medium mt-1'>
                  {selectedStudent.group || 'Chưa có nhóm'}
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
