import { useState } from 'react';
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
import { Plus, Edit, Trash2, Mail, User, BookOpen } from 'lucide-react';

export function StudentsManagement() {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for students
  const students = [
    {
      id: '1',
      name: 'Nguyễn Văn An',
      email: 'nguyenvanan@fpt.edu.vn',
      studentCode: 'SE181256',
      major: 'Software Engineering',
      status: 'ACTIVE',
      avatar: '/images/avatar.jpg',
    },
    {
      id: '2',
      name: 'Trần Thị Bình',
      email: 'tranthibinh@fpt.edu.vn',
      studentCode: 'SS180031',
      major: 'Information Technology',
      status: 'ACTIVE',
      avatar: '/images/avatar.jpg',
    },
    {
      id: '3',
      name: 'Lê Hoàng Nam',
      email: 'lehoangnam@fpt.edu.vn',
      studentCode: 'AI190123',
      major: 'Artificial Intelligence',
      status: 'INACTIVE',
      avatar: '/images/avatar.jpg',
    },
  ];

  const filteredStudents = students.filter(
    student =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    return status === 'ACTIVE' ? (
      <span className='px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800'>
        Hoạt động
      </span>
    ) : (
      <span className='px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800'>
        Không hoạt động
      </span>
    );
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>
            Quản lý Sinh viên
          </h1>
          <p className='text-gray-600'>
            Quản lý thông tin sinh viên trong hệ thống
          </p>
        </div>
        <Button>
          <Plus className='w-4 h-4 mr-2' />
          Thêm sinh viên
        </Button>
      </div>

      <div className='flex items-center space-x-4'>
        <div className='flex-1'>
          <Input
            placeholder='Tìm kiếm sinh viên...'
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
              <TableHead>Mã sinh viên</TableHead>
              <TableHead>Chuyên ngành</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className='text-right'>Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map(student => (
              <TableRow key={student.id}>
                <TableCell>
                  <div className='flex items-center space-x-3'>
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className='w-10 h-10 rounded-full object-cover'
                    />
                    <div>
                      <div className='font-medium'>{student.name}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center space-x-2'>
                    <Mail className='w-4 h-4 text-gray-400' />
                    <span className='text-sm'>{student.email}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center space-x-2'>
                    <User className='w-4 h-4 text-gray-400' />
                    <span className='text-sm font-mono'>
                      {student.studentCode}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center space-x-2'>
                    <BookOpen className='w-4 h-4 text-gray-400' />
                    <span className='text-sm'>{student.major}</span>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(student.status)}</TableCell>
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
