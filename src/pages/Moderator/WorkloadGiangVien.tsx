import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Pagination } from '@/components/ui/pagination';
import {
  Users,
  UserCheck,
  AlertTriangle,
  XCircle,
  Edit,
  ArrowUpDown,
  Search,
  X,
} from 'lucide-react';
import { mockLecturerWorkload } from './mockData';
import { useTableFeatures } from '@/hooks/useTableFeatures';

export function WorkloadGiangVien() {
  const [lecturers, setLecturers] = useState(mockLecturerWorkload);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [editingLecturer, setEditingLecturer] = useState<
    (typeof mockLecturerWorkload)[0] | null
  >(null);
  const [newQuota, setNewQuota] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'quota'>('name');

  // Filter by status
  const filteredData =
    statusFilter === 'all'
      ? lecturers
      : lecturers.filter(l => l.status === statusFilter);

  const {
    paginatedData,
    totalItems,
    searchQuery,
    handleSearch,
    clearSearch,
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    itemsPerPage,
    handlePageChange,
  } = useTableFeatures({
    data: filteredData,
    itemsPerPage: 10,
    searchFields: ['name', 'email'],
    sortField: 'name',
  });

  const totalLecturers = lecturers.length;
  const available = lecturers.filter(l => l.status === 'available').length;
  const limited = lecturers.filter(l => l.status === 'limited').length;
  const full = lecturers.filter(l => l.current === l.quota).length;

  const handleEditQuota = (lecturer: (typeof mockLecturerWorkload)[0]) => {
    setEditingLecturer(lecturer);
    setNewQuota(lecturer.quota.toString());
  };

  const handleSaveQuota = () => {
    if (editingLecturer && newQuota) {
      const updatedLecturers = lecturers.map(l =>
        l.id === editingLecturer.id ? { ...l, quota: parseInt(newQuota) } : l
      );
      setLecturers(updatedLecturers);
      setEditingLecturer(null);
      setNewQuota('');
    }
  };

  const handleSort = () => {
    setSortBy(sortBy === 'name' ? 'quota' : 'name');
  };

  const sortedData = [...paginatedData].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    return b.quota - a.quota;
  });

  const statCards = [
    {
      title: 'Tổng số GV',
      value: totalLecturers,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      title: 'GV còn slot',
      value: available,
      icon: UserCheck,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      gradient: 'from-green-500 to-green-600',
    },
    {
      title: 'GV gần đầy',
      value: limited,
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      gradient: 'from-orange-500 to-orange-600',
    },
    {
      title: 'GV đã đầy',
      value: full,
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      gradient: 'from-red-500 to-red-600',
    },
  ];

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold text-text-title'>
          Workload Giảng viên
        </h1>
        <p className='text-text-body mt-2'>
          Phân tích và theo dõi tải hạn ngạch của giảng viên
        </p>
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className='relative overflow-hidden shadow-lg border-0 hover:shadow-xl transition-all duration-300'
            >
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r ${stat.gradient}`}
              />
              <CardHeader className='pb-3'>
                <div className='flex items-center justify-between'>
                  <CardTitle className='text-sm font-medium text-text-body'>
                    {stat.title}
                  </CardTitle>
                  <div className={`${stat.bgColor} p-2 rounded-lg`}>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className='text-3xl font-bold text-text-title'>
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Lecturers List */}
      <Card className='shadow-lg border border-gray-200'>
        <CardHeader className='bg-linear-to-r from-primary to-gray-100'>
          <div className='flex justify-between items-center'>
            <CardTitle className='text-white'>
              Danh sách Giảng viên ({totalItems})
            </CardTitle>
            <Button
              variant='secondary'
              size='sm'
              onClick={handleSort}
              className='bg-white text-primary hover:bg-gray-100'
            >
              <ArrowUpDown className='w-4 h-4 mr-2' />
              Sắp xếp: {sortBy === 'name' ? 'Tên' : 'Quota'}
            </Button>
          </div>
        </CardHeader>
        <CardContent className='pt-6'>
          {/* Search & Filter Bar */}
          <div className='flex gap-4 mb-6'>
            <div className='flex-1 relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
              <Input
                placeholder='Tìm kiếm theo tên, email...'
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

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className='w-[200px]'>
                <SelectValue placeholder='Trạng thái' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>Tất cả</SelectItem>
                <SelectItem value='available'>Còn slot</SelectItem>
                <SelectItem value='limited'>Sắp đầy</SelectItem>
                <SelectItem value='full'>Đã đủ</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-4'>
            {sortedData.map(lecturer => {
              const percent = (lecturer.current / lecturer.quota) * 100;
              const isOverload = percent >= 100;

              return (
                <div
                  key={lecturer.id}
                  className='flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors'
                >
                  <div className='flex-1'>
                    <div className='font-semibold text-text-title'>
                      {lecturer.name}
                    </div>
                    <div className='text-sm text-text-body'>
                      {lecturer.email}
                    </div>
                  </div>

                  <div className='flex items-center gap-6'>
                    <div className='text-center min-w-[60px]'>
                      <div className='text-xs text-text-body'>Hiện tại</div>
                      <div className='font-semibold text-text-title'>
                        {lecturer.current}
                      </div>
                    </div>

                    <div className='text-center min-w-[60px]'>
                      <div className='text-xs text-text-body'>Quota</div>
                      <div className='font-semibold text-text-title'>
                        {lecturer.quota}
                      </div>
                    </div>

                    <div className='min-w-[150px]'>
                      <div className='flex justify-between items-center mb-1'>
                        <span className='text-xs text-text-body'>Tỷ lệ</span>
                        <span
                          className={`text-xs font-semibold ${
                            isOverload ? 'text-red-600' : 'text-green-600'
                          }`}
                        >
                          {Math.round(percent)}%
                        </span>
                      </div>
                      <div className='w-full bg-gray-200 rounded-full h-3'>
                        <div
                          className={`h-3 rounded-full transition-all duration-500 ${
                            isOverload
                              ? 'bg-linear-to-r from-red-500 to-red-600'
                              : 'bg-linear-to-r from-green-500 to-green-600'
                          }`}
                          style={{ width: `${Math.min(percent, 100)}%` }}
                        />
                      </div>
                    </div>

                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => handleEditQuota(lecturer)}
                      className='min-w-[100px]'
                    >
                      <Edit className='w-4 h-4 mr-2' />
                      Sửa quota
                    </Button>
                  </div>
                </div>
              );
            })}
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

      {/* Edit Quota Dialog */}
      <Dialog
        open={!!editingLecturer}
        onOpenChange={() => setEditingLecturer(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa Quota</DialogTitle>
          </DialogHeader>
          <div className='space-y-4 py-4'>
            <div className='space-y-2'>
              <Label>Giảng viên</Label>
              <Input value={editingLecturer?.name || ''} disabled />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='quota'>Quota mới</Label>
              <Input
                id='quota'
                type='number'
                value={newQuota}
                onChange={e => setNewQuota(e.target.value)}
                placeholder='Nhập quota mới'
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setEditingLecturer(null)}>
              Hủy
            </Button>
            <Button onClick={handleSaveQuota}>Lưu thay đổi</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
