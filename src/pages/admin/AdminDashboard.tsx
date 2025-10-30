import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, GraduationCap, BookOpen, UserCheck } from 'lucide-react';

export function AdminDashboard() {
  const stats = [
    {
      title: 'Tổng sinh viên',
      value: '42',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Tổng giảng viên',
      value: '6',
      icon: GraduationCap,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Kỳ học hiện tại',
      value: 'FA25',
      icon: BookOpen,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Số lớp học',
      value: '18',
      icon: UserCheck,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-2xl font-bold text-gray-900'>Dashboard</h1>
        <p className='text-gray-600'>Tổng quan hệ thống quản lý</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium text-gray-600'>
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <Card>
          <CardHeader>
            <CardTitle>Hoạt động gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div className='flex items-center space-x-4'>
                <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                <div className='flex-1'>
                  <p className='text-sm font-medium'>
                    Hệ thống hoạt động bình thường
                  </p>
                  <p className='text-xs text-gray-500'>2 phút trước</p>
                </div>
              </div>
              <div className='flex items-center space-x-4'>
                <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                <div className='flex-1'>
                  <p className='text-sm font-medium'>
                    Cập nhật dữ liệu sinh viên
                  </p>
                  <p className='text-xs text-gray-500'>15 phút trước</p>
                </div>
              </div>
              <div className='flex items-center space-x-4'>
                <div className='w-2 h-2 bg-yellow-500 rounded-full'></div>
                <div className='flex-1'>
                  <p className='text-sm font-medium'>Báo cáo tuần được tạo</p>
                  <p className='text-xs text-gray-500'>1 giờ trước</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Thống kê nhanh</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div className='flex justify-between items-center'>
                <span className='text-sm text-gray-600'>
                  Nhóm đã tạo hôm nay
                </span>
                <span className='font-semibold'>8</span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-sm text-gray-600'>Bài đăng mới</span>
                <span className='font-semibold'>23</span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-sm text-gray-600'>Yêu cầu tham gia</span>
                <span className='font-semibold'>45</span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-sm text-gray-600'>Tỷ lệ hoàn thành</span>
                <span className='font-semibold text-green-600'>94%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
