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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
} from 'lucide-react';
import {
  mockGroupTemplates,
  mockSemesters,
  type GroupTemplate,
} from './mockData';
import { useTableFeatures } from '@/hooks/useTableFeatures';

export function TemplateManagement() {
  const [templates, setTemplates] = useState(mockGroupTemplates);
  const [semesterFilter, setSemesterFilter] = useState<string>('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] =
    useState<GroupTemplate | null>(null);
  const [formData, setFormData] = useState({
    semester: '',
    minMembers: 0,
    maxMembers: 0,
    minMajors: 0,
    maxLecturers: 0,
  });

  // Filter by semester
  const filteredData =
    semesterFilter === 'all'
      ? templates
      : templates.filter(t => t.semester === semesterFilter);

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
    searchFields: ['semester'],
    sortField: 'semester',
  });

  const handleCreate = () => {
    const newTemplate: GroupTemplate = {
      id: (templates.length + 1).toString(),
      ...formData,
    };
    setTemplates([...templates, newTemplate]);
    setIsCreateOpen(false);
    setFormData({
      semester: '',
      minMembers: 0,
      maxMembers: 0,
      minMajors: 0,
      maxLecturers: 0,
    });
  };

  const handleEdit = () => {
    if (selectedTemplate) {
      setTemplates(
        templates.map(t =>
          t.id === selectedTemplate.id
            ? { ...selectedTemplate, ...formData }
            : t
        )
      );
      setIsEditOpen(false);
      setSelectedTemplate(null);
    }
  };

  const handleDelete = () => {
    if (selectedTemplate) {
      setTemplates(templates.filter(t => t.id !== selectedTemplate.id));
      setIsDeleteOpen(false);
      setSelectedTemplate(null);
    }
  };

  const openEdit = (template: GroupTemplate) => {
    setSelectedTemplate(template);
    setFormData({
      semester: template.semester,
      minMembers: template.minMembers,
      maxMembers: template.maxMembers,
      minMajors: template.minMajors,
      maxLecturers: template.maxLecturers,
    });
    setIsEditOpen(true);
  };

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bold text-text-title'>
            Quản lý Template Nhóm
          </h1>
          <p className='text-text-body mt-2'>
            Cấu hình quy định nhóm theo kỳ học
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className='w-4 h-4 mr-2' />
          Thêm Template
        </Button>
      </div>

      <Card className='shadow-lg border border-gray-200'>
        <CardHeader className='bg-gradient-to-r from-primary to-gray-100'>
          <CardTitle className='text-white'>
            Danh sách Template ({totalItems})
          </CardTitle>
        </CardHeader>
        <CardContent className='pt-6'>
          {/* Search & Filter Bar */}
          <div className='flex gap-4 mb-6'>
            <div className='flex-1 relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
              <Input
                placeholder='Tìm kiếm theo kỳ học...'
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

            <Select value={semesterFilter} onValueChange={setSemesterFilter}>
              <SelectTrigger className='w-[200px]'>
                <SelectValue placeholder='Kỳ học' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>Tất cả kỳ</SelectItem>
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
                  <TableHead>Số thành viên</TableHead>
                  <TableHead>Số ngành tối thiểu</TableHead>
                  <TableHead>Số GV tối đa</TableHead>
                  <TableHead className='text-right'>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map(t => (
                  <TableRow key={t.id} className='hover:bg-gray-50'>
                    <TableCell className='font-medium'>{t.semester}</TableCell>
                    <TableCell>
                      {t.minMembers} - {t.maxMembers} thành viên
                    </TableCell>
                    <TableCell>{t.minMajors} ngành</TableCell>
                    <TableCell>{t.maxLecturers} GV</TableCell>
                    <TableCell className='text-right'>
                      <div className='flex justify-end gap-2'>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => {
                            setSelectedTemplate(t);
                            setIsViewOpen(true);
                          }}
                        >
                          <Eye className='w-4 h-4' />
                        </Button>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => openEdit(t)}
                        >
                          <Pencil className='w-4 h-4' />
                        </Button>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => {
                            setSelectedTemplate(t);
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

      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm Template mới</DialogTitle>
          </DialogHeader>
          <div className='space-y-4 py-4'>
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
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Label>Số thành viên tối thiểu</Label>
                <Input
                  type='number'
                  value={formData.minMembers}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      minMembers: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div>
                <Label>Số thành viên tối đa</Label>
                <Input
                  type='number'
                  value={formData.maxMembers}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      maxMembers: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Label>Số ngành tối thiểu</Label>
                <Input
                  type='number'
                  value={formData.minMajors}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      minMajors: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div>
                <Label>Số GV tối đa</Label>
                <Input
                  type='number'
                  value={formData.maxLecturers}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      maxLecturers: parseInt(e.target.value) || 0,
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
            <DialogTitle>Chỉnh sửa Template</DialogTitle>
          </DialogHeader>
          <div className='space-y-4 py-4'>
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
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Label>Số thành viên tối thiểu</Label>
                <Input
                  type='number'
                  value={formData.minMembers}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      minMembers: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div>
                <Label>Số thành viên tối đa</Label>
                <Input
                  type='number'
                  value={formData.maxMembers}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      maxMembers: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Label>Số ngành tối thiểu</Label>
                <Input
                  type='number'
                  value={formData.minMajors}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      minMajors: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div>
                <Label>Số GV tối đa</Label>
                <Input
                  type='number'
                  value={formData.maxLecturers}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      maxLecturers: parseInt(e.target.value) || 0,
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
              Bạn có chắc chắn muốn xóa template của kỳ{' '}
              <strong>{selectedTemplate?.semester}</strong>? Hành động này không
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
            <DialogTitle>Chi tiết Template</DialogTitle>
          </DialogHeader>
          {selectedTemplate && (
            <div className='space-y-4 py-4'>
              <div>
                <Label className='text-text-secondary'>Kỳ học</Label>
                <p className='text-text-title font-medium mt-1'>
                  {selectedTemplate.semester}
                </p>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <Label className='text-text-secondary'>
                    Số thành viên tối thiểu
                  </Label>
                  <p className='text-text-title font-medium mt-1'>
                    {selectedTemplate.minMembers} thành viên
                  </p>
                </div>
                <div>
                  <Label className='text-text-secondary'>
                    Số thành viên tối đa
                  </Label>
                  <p className='text-text-title font-medium mt-1'>
                    {selectedTemplate.maxMembers} thành viên
                  </p>
                </div>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <Label className='text-text-secondary'>
                    Số ngành tối thiểu
                  </Label>
                  <p className='text-text-title font-medium mt-1'>
                    {selectedTemplate.minMajors} ngành
                  </p>
                </div>
                <div>
                  <Label className='text-text-secondary'>Số GV tối đa</Label>
                  <p className='text-text-title font-medium mt-1'>
                    {selectedTemplate.maxLecturers} giảng viên
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
