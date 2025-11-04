import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Clock, CheckCircle, GraduationCap } from 'lucide-react';

export function Dashboard() {
  const stats = [
    {
      title: 'Tổng số nhóm',
      value: '48',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Chờ phân công',
      value: '12',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      title: 'Đã phân công',
      value: '36',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Giảng viên đang dạy',
      value: '8',
      icon: GraduationCap,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-2xl font-bold text-gray-900'>Dashboard</h1>
        <p className='text-gray-600'>Tổng quan quản lý Moderator</p>
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
                <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                <div className='flex-1'>
                  <p className='text-sm font-medium'>
                    Phân công GV cho nhóm AI Healthcare
                  </p>
                  <p className='text-xs text-gray-500'>5 phút trước</p>
                </div>
              </div>
              <div className='flex items-center space-x-4'>
                <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                <div className='flex-1'>
                  <p className='text-sm font-medium'>
                    GV Nguyễn Văn A đăng ký hướng dẫn nhóm mới
                  </p>
                  <p className='text-xs text-gray-500'>1 giờ trước</p>
                </div>
              </div>
              <div className='flex items-center space-x-4'>
                <div className='w-2 h-2 bg-orange-500 rounded-full'></div>
                <div className='flex-1'>
                  <p className='text-sm font-medium'>
                    Nhóm E-Commerce đã hoàn tất thành viên
                  </p>
                  <p className='text-xs text-gray-500'>2 giờ trước</p>
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
                <span className='text-sm text-gray-600'>Nhóm mới hôm nay</span>
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
