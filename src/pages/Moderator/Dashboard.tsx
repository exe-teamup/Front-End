import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Users,
  Clock,
  CheckCircle,
  GraduationCap,
  Download,
  TrendingUp,
} from 'lucide-react';

export function Dashboard() {
  // Premium stats with gradient cards
  const stats = [
    {
      title: 'Tổng số nhóm',
      value: '48',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Chờ phân công GV',
      value: '12',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      gradient: 'from-orange-500 to-orange-600',
    },
    {
      title: 'Đã phân công',
      value: '36',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      gradient: 'from-green-500 to-green-600',
    },
    {
      title: 'Giảng viên đang dạy',
      value: '8',
      icon: GraduationCap,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      gradient: 'from-purple-500 to-purple-600',
    },
  ];

  const recentActivities = [
    {
      title: 'Phân công GV Nguyễn Văn A cho nhóm AI Healthcare',
      time: '10 phút trước',
      status: 'success',
    },
    {
      title: 'Cập nhật quota GV Trần Thị B: 5 → 6 nhóm',
      time: '1 giờ trước',
      status: 'info',
    },
    {
      title: 'Nhóm Smart City IoT đã hoàn thành đăng ký',
      time: '2 giờ trước',
      status: 'success',
    },
    {
      title: 'Yêu cầu join nhóm E-Commerce từ SV Lê Văn C',
      time: '3 giờ trước',
      status: 'warning',
    },
  ];

  const quickStats = [
    { label: 'Nhóm mới tuần này', value: 8, trend: '+12%' },
    { label: 'Tỷ lệ hoàn thành', value: 94, progress: 94 },
    { label: 'GV khả dụng', value: 3, trend: '-2 so với tuần trước' },
  ];

  const handleExport = () => {
    // TODO: Implement Excel export
    console.log('Exporting dashboard data...');
  };

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div>
        <h1 className='text-3xl font-bold text-text-title'>
          Dashboard - Moderator
        </h1>
        <p className='text-text-body mt-2'>
          Quản lý và điều tiết nhóm, giảng viên
        </p>
      </div>

      {/* Stats Grid - Premium gradient cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className='relative overflow-hidden shadow-lg border-0 hover:shadow-xl transition-all duration-300 hover:-translate-y-1'
            >
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient}`}
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
                <p className='text-xs text-text-body mt-1 flex items-center gap-1'>
                  <TrendingUp className='h-3 w-3' />
                  <span>+15% so với tháng trước</span>
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Two Column Layout */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Recent Activities */}
        <Card className='shadow-lg border border-gray-200'>
          <CardHeader className='bg-gradient-to-r from-primary to-gray-100'>
            <CardTitle className='text-white'>Hoạt động gần đây</CardTitle>
          </CardHeader>
          <CardContent className='pt-6'>
            <div className='space-y-4 max-h-80 overflow-y-auto'>
              {recentActivities.map((activity, idx) => (
                <div
                  key={idx}
                  className='flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer'
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      activity.status === 'success'
                        ? 'bg-green-500'
                        : activity.status === 'warning'
                          ? 'bg-yellow-500'
                          : 'bg-blue-500'
                    }`}
                  />
                  <div className='flex-1'>
                    <p className='text-sm font-medium text-text-title'>
                      {activity.title}
                    </p>
                    <p className='text-xs text-text-body mt-1'>
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className='shadow-lg border border-gray-200'>
          <CardHeader className='bg-gradient-to-r from-purple-500 to-purple-600'>
            <CardTitle className='text-white'>Thống kê nhanh</CardTitle>
          </CardHeader>
          <CardContent className='pt-6'>
            <div className='space-y-6'>
              {quickStats.map((stat, idx) => (
                <div key={idx} className='space-y-2'>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm font-medium text-text-body'>
                      {stat.label}
                    </span>
                    <span className='text-2xl font-bold text-text-title'>
                      {stat.value}
                      {stat.progress !== undefined && '%'}
                    </span>
                  </div>
                  {stat.progress !== undefined && (
                    <div className='w-full bg-gray-200 rounded-full h-2.5'>
                      <div
                        className='bg-gradient-to-r from-green-500 to-green-600 h-2.5 rounded-full transition-all duration-500'
                        style={{ width: `${stat.progress}%` }}
                      />
                    </div>
                  )}
                  {stat.trend && (
                    <p className='text-xs text-text-body'>{stat.trend}</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export Section */}
      <Card className='shadow-lg border border-gray-200'>
        <CardHeader className='bg-gradient-to-r from-primary to-gray-100'>
          <div className='flex justify-between items-center'>
            <CardTitle className='text-white'>Báo cáo tổng quan</CardTitle>
            <Button
              variant='secondary'
              size='sm'
              onClick={handleExport}
              className='bg-white text-primary hover:bg-gray-100'
            >
              <Download className='w-4 h-4 mr-2' />
              Export Excel
            </Button>
          </div>
        </CardHeader>
        <CardContent className='pt-6'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-center'>
            <div className='p-4 bg-blue-50 rounded-lg'>
              <p className='text-sm text-text-body'>Tổng sinh viên</p>
              <p className='text-2xl font-bold text-blue-600 mt-2'>250</p>
            </div>
            <div className='p-4 bg-green-50 rounded-lg'>
              <p className='text-sm text-text-body'>Sinh viên có nhóm</p>
              <p className='text-2xl font-bold text-green-600 mt-2'>235</p>
            </div>
            <div className='p-4 bg-orange-50 rounded-lg'>
              <p className='text-sm text-text-body'>Sinh viên chưa có nhóm</p>
              <p className='text-2xl font-bold text-orange-600 mt-2'>15</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
