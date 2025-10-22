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
import { listLecturers, type Lecturer } from '@/mock/lecturers.mockapi';
import { Plus, Edit, Trash2, Mail, GraduationCap } from 'lucide-react';

export function LecturersManagement() {
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadLecturers();
  }, []);

  const loadLecturers = async () => {
    try {
      setLoading(true);
      const data = await listLecturers();
      setLecturers(data);
    } catch {
      // console.error('Error loading lecturers:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredLecturers = lecturers.filter(
    lecturer =>
      lecturer.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lecturer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lecturer.major.toLowerCase().includes(searchQuery.toLowerCase())
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
        <Button>
          <Plus className='w-4 h-4 mr-2' />
          Thêm giảng viên
        </Button>
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
              <TableHead>Chuyên ngành</TableHead>
              <TableHead className='text-right'>Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLecturers.map(lecturer => (
              <TableRow key={lecturer.id}>
                <TableCell>
                  <div className='flex items-center space-x-3'>
                    <img
                      src={lecturer.avatar || '/images/avatar.jpg'}
                      alt={lecturer.fullName}
                      className='w-10 h-10 rounded-full object-cover'
                    />
                    <div>
                      <div className='font-medium'>{lecturer.fullName}</div>
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
                    <span className='text-sm'>{lecturer.major}</span>
                  </div>
                </TableCell>
                <TableCell className='text-right'>
                  <div className='flex items-center justify-end space-x-2'>
                    <Button variant='outline' size='sm'>
                      <Edit className='w-4 h-4' />
                    </Button>
                    <Button variant='outline' size='sm'>
                      <Trash2 className='w-4 h-4' />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
