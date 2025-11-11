import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pagination } from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGroupTemplates, useSemesters } from '@/hooks';
import { useTableFeatures } from '@/hooks/useTableFeatures';
import type { GroupTemplate } from '@/types/groupTemplate';
import {
  AlertCircle,
  ArrowUpDown,
  Eye,
  Loader2,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from 'lucide-react';
import { useMemo, useState } from 'react';

export function TemplateManagement() {
  // Fetch real data using hooks
  const {
    templates: apiTemplates,
    loading,
    error,
    createTemplate,
    updateTemplate,
    deleteTemplate,
  } = useGroupTemplates();

  const { semesters } = useSemesters();

  const [semesterFilter, setSemesterFilter] = useState<string>('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] =
    useState<GroupTemplate | null>(null);
  const [formData, setFormData] = useState({
    template: '',
    minMember: 0,
    maxMember: 0,
    minMajor: 0,
  });

  // Filter by semester/template name
  const filteredData = useMemo(() => {
    return semesterFilter === 'all'
      ? apiTemplates
      : apiTemplates.filter(t => t.template === semesterFilter);
  }, [apiTemplates, semesterFilter]);

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
    searchFields: ['template'],
    sortField: 'template',
  });

  const handleCreate = async () => {
    try {
      await createTemplate(formData);
      setIsCreateOpen(false);
      setFormData({
        template: '',
        minMember: 0,
        maxMember: 0,
        minMajor: 0,
      });
    } catch {
      // Error is handled by the hook with toast
    }
  };

  const handleEdit = async () => {
    if (selectedTemplate) {
      try {
        await updateTemplate(selectedTemplate.id, formData);
        setIsEditOpen(false);
        setSelectedTemplate(null);
      } catch {
        // Error is handled by the hook with toast
      }
    }
  };

  const handleDelete = async () => {
    if (selectedTemplate) {
      try {
        await deleteTemplate(selectedTemplate.id);
        setIsDeleteOpen(false);
        setSelectedTemplate(null);
      } catch {
        // Error is handled by the hook with toast
      }
    }
  };

  const openEdit = (template: GroupTemplate) => {
    setSelectedTemplate(template);
    setFormData({
      template: template.template || '',
      minMember: template.minMember,
      maxMember: template.maxMember,
      minMajor: template.minMajor,
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

      {/* Error Display */}
      {error && (
        <Card className='border-red-200 bg-red-50'>
          <CardContent className='pt-6'>
            <div className='flex items-center gap-2 text-red-800'>
              <AlertCircle className='h-5 w-5' />
              <p className='font-medium'>
                {error || 'Có lỗi xảy ra khi tải dữ liệu'}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

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
                {semesters.map(s => (
                  <SelectItem
                    key={s.semesterId}
                    value={s.semesterName || s.semesterCode}
                  >
                    {s.semesterName || s.semesterCode}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Loading State */}
          {loading && (
            <div className='flex justify-center items-center py-8 mb-6'>
              <Loader2 className='w-8 h-8 animate-spin text-primary' />
              <span className='ml-2 text-text-body'>Đang tải dữ liệu...</span>
            </div>
          )}

          {!loading && (
            <div className='rounded-md border'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead
                      className='cursor-pointer'
                      onClick={() => handleSort('template')}
                    >
                      <div className='flex items-center gap-2'>
                        Kỳ học / Template
                        <ArrowUpDown className='w-4 h-4' />
                        {sortBy === 'template' && (
                          <span className='text-xs'>
                            {sortOrder === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </TableHead>
                    <TableHead>Số thành viên</TableHead>
                    <TableHead>Số ngành tối thiểu</TableHead>
                    <TableHead className='text-right'>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.map(t => (
                    <TableRow key={t.id} className='hover:bg-gray-50'>
                      <TableCell className='font-medium'>
                        {t.template || 'Chưa đặt tên'}
                      </TableCell>
                      <TableCell>
                        {t.minMember} - {t.maxMember} thành viên
                      </TableCell>
                      <TableCell>{t.minMajor} ngành</TableCell>
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
          )}

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
              <Label>Tên Template (Kỳ học)</Label>
              <Input
                value={formData.template}
                onChange={e =>
                  setFormData({ ...formData, template: e.target.value })
                }
                placeholder='Ví dụ: Y Tế, Fall 2024'
              />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Label>Số thành viên tối thiểu</Label>
                <Input
                  type='number'
                  value={formData.minMember}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      minMember: Number.parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div>
                <Label>Số thành viên tối đa</Label>
                <Input
                  type='number'
                  value={formData.maxMember}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      maxMember: Number.parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>
            <div>
              <Label>Số ngành tối thiểu</Label>
              <Input
                type='number'
                value={formData.minMajor}
                onChange={e =>
                  setFormData({
                    ...formData,
                    minMajor: Number.parseInt(e.target.value) || 0,
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
            <DialogTitle>Chỉnh sửa Template</DialogTitle>
          </DialogHeader>
          <div className='space-y-4 py-4'>
            <div>
              <Label>Tên Template (Kỳ học)</Label>
              <Input
                value={formData.template}
                onChange={e =>
                  setFormData({ ...formData, template: e.target.value })
                }
                placeholder='Ví dụ: Y Tế, Fall 2024'
              />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Label>Số thành viên tối thiểu</Label>
                <Input
                  type='number'
                  value={formData.minMember}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      minMember: Number.parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div>
                <Label>Số thành viên tối đa</Label>
                <Input
                  type='number'
                  value={formData.maxMember}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      maxMember: Number.parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>
            <div>
              <Label>Số ngành tối thiểu</Label>
              <Input
                type='number'
                value={formData.minMajor}
                onChange={e =>
                  setFormData({
                    ...formData,
                    minMajor: Number.parseInt(e.target.value) || 0,
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
              Bạn có chắc chắn muốn xóa template{' '}
              <strong>{selectedTemplate?.template}</strong>? Hành động này không
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
                <Label className='text-text-secondary'>Tên Template</Label>
                <p className='text-text-title font-medium mt-1'>
                  {selectedTemplate.template}
                </p>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <Label className='text-text-secondary'>
                    Số thành viên tối thiểu
                  </Label>
                  <p className='text-text-title font-medium mt-1'>
                    {selectedTemplate.minMember} thành viên
                  </p>
                </div>
                <div>
                  <Label className='text-text-secondary'>
                    Số thành viên tối đa
                  </Label>
                  <p className='text-text-title font-medium mt-1'>
                    {selectedTemplate.maxMember} thành viên
                  </p>
                </div>
              </div>
              <div>
                <div>
                  <Label className='text-text-secondary'>
                    Số ngành tối thiểu
                  </Label>
                  <p className='text-text-title font-medium mt-1'>
                    {selectedTemplate.minMajor} ngành
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
