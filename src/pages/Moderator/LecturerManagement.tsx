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
import { Plus, Pencil, Trash2, Eye } from 'lucide-react';
import { mockLecturers, type Lecturer } from './mockData';

export function LecturerManagement() {
  const [lecturers, setLecturers] = useState(mockLecturers);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedLecturer, setSelectedLecturer] = useState<Lecturer | null>(
    null
  );
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    quota: 0,
    currentGroups: 0,
  });

  const handleCreate = () => {
    const newLecturer: Lecturer = {
      id: (lecturers.length + 1).toString(),
      ...formData,
    };
    setLecturers([...lecturers, newLecturer]);
    setIsCreateOpen(false);
    setFormData({ name: '', email: '', quota: 0, currentGroups: 0 });
  };

  const handleEdit = () => {
    if (selectedLecturer) {
      setLecturers(
        lecturers.map(l =>
          l.id === selectedLecturer.id
            ? { ...selectedLecturer, ...formData }
            : l
        )
      );
      setIsEditOpen(false);
      setSelectedLecturer(null);
    }
  };

  const handleDelete = () => {
    if (selectedLecturer) {
      setLecturers(lecturers.filter(l => l.id !== selectedLecturer.id));
      setIsDeleteOpen(false);
      setSelectedLecturer(null);
    }
  };

  const openEdit = (lecturer: Lecturer) => {
    setSelectedLecturer(lecturer);
    setFormData({
      name: lecturer.name,
      email: lecturer.email,
      quota: lecturer.quota,
      currentGroups: lecturer.currentGroups,
    });
    setIsEditOpen(true);
  };

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bold text-text-title'>
            Quản lý Giảng viên
          </h1>
          <p className='text-text-body mt-2'>
            Danh sách giảng viên và định mức nhóm
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className='w-4 h-4 mr-2' />
          Thêm Giảng viên
        </Button>
      </div>

      <Card className='shadow-lg border border-gray-200'>
        <CardHeader className='bg-gradient-to-r from-primary to-gray-100'>
          <CardTitle className='text-white'>
            Danh sách Giảng viên ({lecturers.length})
          </CardTitle>
        </CardHeader>
        <CardContent className='pt-6'>
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên giảng viên</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Định mức</TableHead>
                  <TableHead>Nhóm hiện tại</TableHead>
                  <TableHead className='text-right'>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lecturers.map(l => (
                  <TableRow key={l.id} className='hover:bg-gray-50'>
                    <TableCell className='font-medium'>{l.name}</TableCell>
                    <TableCell>{l.email}</TableCell>
                    <TableCell>{l.quota} nhóm</TableCell>
                    <TableCell>{l.currentGroups} nhóm</TableCell>
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
        </CardContent>
      </Card>

      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm Giảng viên mới</DialogTitle>
          </DialogHeader>
          <div className='space-y-4 py-4'>
            <div>
              <Label>Tên giảng viên</Label>
              <Input
                placeholder='Họ và tên'
                value={formData.name}
                onChange={e =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type='email'
                placeholder='email@fpt.edu.vn'
                value={formData.email}
                onChange={e =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Label>Định mức (nhóm)</Label>
                <Input
                  type='number'
                  value={formData.quota}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      quota: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div>
                <Label>Nhóm hiện tại</Label>
                <Input
                  type='number'
                  value={formData.currentGroups}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      currentGroups: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
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
            <DialogTitle>Chỉnh sửa Giảng viên</DialogTitle>
          </DialogHeader>
          <div className='space-y-4 py-4'>
            <div>
              <Label>Tên giảng viên</Label>
              <Input
                value={formData.name}
                onChange={e =>
                  setFormData({ ...formData, name: e.target.value })
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
                <Label>Định mức (nhóm)</Label>
                <Input
                  type='number'
                  value={formData.quota}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      quota: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div>
                <Label>Nhóm hiện tại</Label>
                <Input
                  type='number'
                  value={formData.currentGroups}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      currentGroups: parseInt(e.target.value) || 0,
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
              Bạn có chắc chắn muốn xóa giảng viên{' '}
              <strong>{selectedLecturer?.name}</strong>? Hành động này không thể
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
            <DialogTitle>Chi tiết Giảng viên</DialogTitle>
          </DialogHeader>
          {selectedLecturer && (
            <div className='space-y-4 py-4'>
              <div>
                <Label className='text-text-secondary'>Tên giảng viên</Label>
                <p className='text-text-title font-medium mt-1'>
                  {selectedLecturer.name}
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
                  <Label className='text-text-secondary'>Định mức</Label>
                  <p className='text-text-title font-medium mt-1'>
                    {selectedLecturer.quota} nhóm
                  </p>
                </div>
                <div>
                  <Label className='text-text-secondary'>Nhóm hiện tại</Label>
                  <p className='text-text-title font-medium mt-1'>
                    {selectedLecturer.currentGroups} nhóm
                  </p>
                </div>
              </div>
              <div>
                <Label className='text-text-secondary'>Trạng thái</Label>
                <p className='text-text-title font-medium mt-1'>
                  {selectedLecturer.currentGroups >= selectedLecturer.quota
                    ? '🔴 Đã đủ định mức'
                    : '🟢 Còn slot'}
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
