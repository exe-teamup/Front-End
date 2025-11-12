import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDashboard } from '@/hooks/useDashboard';
import {
  AlertCircle,
  BookOpen,
  Calendar,
  Download,
  GraduationCap,
  Loader2,
  TrendingUp,
  Users,
} from 'lucide-react';
import { toast } from 'sonner';
import * as XLSX from 'xlsx';

export function Dashboard() {
  const { stats, isLoading, error } = useDashboard();

  // Map API data to display cards
  const statsCards = stats
    ? [
        {
          title: 'Tổng số sinh viên',
          value: stats.totalStudents.toString(),
          icon: Users,
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          gradient: 'from-blue-500 to-blue-600',
        },
        {
          title: 'Tổng số giảng viên',
          value: stats.totalLecturers.toString(),
          icon: GraduationCap,
          color: 'text-purple-600',
          bgColor: 'bg-purple-50',
          gradient: 'from-purple-500 to-purple-600',
        },
        {
          title: 'Kỳ học đang hoạt động',
          value: stats.activeSemesters.toString(),
          icon: Calendar,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          gradient: 'from-green-500 to-green-600',
        },
        {
          title: 'Tổng số lớp học',
          value: stats.totalCourses.toString(),
          icon: BookOpen,
          color: 'text-orange-600',
          bgColor: 'bg-orange-50',
          gradient: 'from-orange-500 to-orange-600',
        },
      ]
    : [];

  const quickStatsData = stats
    ? [
        {
          label: 'Nhóm được tạo hôm nay',
          value: stats.groupsCreatedToday,
          trend: '+' + stats.groupsCreatedToday + ' nhóm mới',
        },
        {
          label: 'Bài viết mới hôm nay',
          value: stats.newPostsToday,
          trend: '+' + stats.newPostsToday + ' bài viết',
        },
        {
          label: 'Yêu cầu tham gia chờ xử lý',
          value: stats.pendingJoinRequests,
          trend: stats.pendingJoinRequests + ' yêu cầu đang chờ',
        },
      ]
    : [];

  const recentActivitiesData = stats?.recentActivity || [];

  const handleExport = () => {
    if (!stats) return;

    try {
      // Prepare export data
      const exportData = [
        {
          'Loại thống kê': 'Tổng số sinh viên',
          'Giá trị': stats.totalStudents,
        },
        {
          'Loại thống kê': 'Tổng số giảng viên',
          'Giá trị': stats.totalLecturers,
        },
        {
          'Loại thống kê': 'Kỳ học đang hoạt động',
          'Giá trị': stats.activeSemesters,
        },
        { 'Loại thống kê': 'Tổng số lớp học', 'Giá trị': stats.totalCourses },
        {
          'Loại thống kê': 'Nhóm được tạo hôm nay',
          'Giá trị': stats.groupsCreatedToday,
        },
        {
          'Loại thống kê': 'Bài viết mới hôm nay',
          'Giá trị': stats.newPostsToday,
        },
        {
          'Loại thống kê': 'Yêu cầu tham gia chờ xử lý',
          'Giá trị': stats.pendingJoinRequests,
        },
      ];

      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(exportData);

      ws['!cols'] = [{ wch: 30 }, { wch: 15 }];

      XLSX.utils.book_append_sheet(wb, ws, 'Dashboard Stats');

      const date = new Date().toISOString().split('T')[0];
      const filename = `Dashboard_${date}.xlsx`;

      XLSX.writeFile(wb, filename);

      toast.success('Xuất file thành công', {
        description: `Đã tải xuống file ${filename}`,
      });
    } catch {
      toast.error('Xuất file thất bại', {
        description: 'Vui lòng thử lại sau',
      });
    }
  };

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-96'>
        <Loader2 className='w-8 h-8 animate-spin text-primary' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='bg-red-50 border border-red-200 rounded-lg p-6 flex items-center gap-3'>
        <AlertCircle className='w-6 h-6 text-red-600' />
        <div>
          <h3 className='font-semibold text-red-800'>Lỗi tải dữ liệu</h3>
          <p className='text-red-700'>{error}</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className='text-center py-12'>
        <p className='text-gray-500'>Không có dữ liệu</p>
      </div>
    );
  }

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
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={`stat-${index}`}
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
                  <span>Hệ thống đang hoạt động</span>
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
              {recentActivitiesData.length > 0 ? (
                recentActivitiesData.map((activity, idx) => {
                  let statusColor = 'bg-blue-500';
                  if (activity.type === 'success') {
                    statusColor = 'bg-green-500';
                  } else if (activity.type === 'warning') {
                    statusColor = 'bg-yellow-500';
                  } else if (activity.type === 'error') {
                    statusColor = 'bg-red-500';
                  }

                  return (
                    <div
                      key={activity.id || `activity-${idx}`}
                      className='flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer'
                    >
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${statusColor}`}
                      />
                      <div className='flex-1'>
                        <p className='text-sm font-medium text-text-title'>
                          {activity.title ||
                            activity.description ||
                            'Hoạt động không xác định'}
                        </p>
                        <p className='text-xs text-text-body mt-1'>
                          {activity.timestamp
                            ? new Date(activity.timestamp).toLocaleString(
                                'vi-VN'
                              )
                            : 'Không rõ thời gian'}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className='text-center text-gray-500 py-4'>
                  Chưa có hoạt động nào gần đây
                </p>
              )}
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
              {quickStatsData.map((stat, idx) => (
                <div key={`quick-stat-${idx}`} className='space-y-2'>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm font-medium text-text-body'>
                      {stat.label}
                    </span>
                    <span className='text-2xl font-bold text-text-title'>
                      {stat.value}
                    </span>
                  </div>
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
              <p className='text-2xl font-bold text-blue-600 mt-2'>
                {stats.totalStudents}
              </p>
            </div>
            <div className='p-4 bg-green-50 rounded-lg'>
              <p className='text-sm text-text-body'>Tổng giảng viên</p>
              <p className='text-2xl font-bold text-green-600 mt-2'>
                {stats.totalLecturers}
              </p>
            </div>
            <div className='p-4 bg-orange-50 rounded-lg'>
              <p className='text-sm text-text-body'>Tổng lớp học</p>
              <p className='text-2xl font-bold text-orange-600 mt-2'>
                {stats.totalCourses}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
