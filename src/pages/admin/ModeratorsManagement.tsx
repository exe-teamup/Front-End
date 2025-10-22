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
import { Plus, Edit, Trash2, Mail, Shield, UserCheck } from 'lucide-react';

export function ModeratorsManagement() {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for moderators
  const moderators = [
    {
      id: '1',
      name: 'Nguyễn Thị Hoa',
      email: 'hoant@fpt.edu.vn',
      role: 'MODERATOR',
      department: 'Công nghệ thông tin',
      status: 'ACTIVE',
      avatar: '/images/avatar.jpg',
    },
    {
      id: '2',
      name: 'Trần Văn Minh',
      email: 'minhtv@fpt.edu.vn',
      role: 'MODERATOR',
      department: 'Khoa học máy tính',
      status: 'ACTIVE',
      avatar: '/images/avatar.jpg',
    },
    {
      id: '3',
      name: 'Lê Thị Lan',
      email: 'lanlt@fpt.edu.vn',
      role: 'MODERATOR',
      department: 'An toàn thông tin',
      status: 'COMPLETED',
      avatar: '/images/avatar.jpg',
    },
  ];

  const filteredModerators = moderators.filter(
    moderator =>
      moderator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      moderator.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      moderator.department.toLowerCase().includes(searchQuery.toLowerCase())
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
            Quản lý Moderators
          </h1>
          <p className='text-gray-600'>
            Quản lý thông tin moderators trong hệ thống
          </p>
        </div>
        <Button>
          <Plus className='w-4 h-4 mr-2' />
          Thêm moderator
        </Button>
      </div>

      <div className='flex items-center space-x-4'>
        <div className='flex-1'>
          <Input
            placeholder='Tìm kiếm moderator...'
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
              <TableHead>Vai trò</TableHead>
              <TableHead>Khoa</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className='text-right'>Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredModerators.map(moderator => (
              <TableRow key={moderator.id}>
                <TableCell>
                  <div className='flex items-center space-x-3'>
                    <img
                      src={moderator.avatar}
                      alt={moderator.name}
                      className='w-10 h-10 rounded-full object-cover'
                    />
                    <div>
                      <div className='font-medium'>{moderator.name}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center space-x-2'>
                    <Mail className='w-4 h-4 text-gray-400' />
                    <span className='text-sm'>{moderator.email}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center space-x-2'>
                    <Shield className='w-4 h-4 text-gray-400' />
                    <span className='text-sm'>{moderator.role}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center space-x-2'>
                    <UserCheck className='w-4 h-4 text-gray-400' />
                    <span className='text-sm'>{moderator.department}</span>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(moderator.status)}</TableCell>
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
