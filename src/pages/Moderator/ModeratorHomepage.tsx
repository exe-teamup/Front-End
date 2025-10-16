import React from 'react';
import { useNavigate } from 'react-router-dom';

interface StatCard {
  title: string;
  value: string;
  bgColor: string;
  textColor: string;
  icon: string;
  link?: string;
}

interface GroupCard {
  id: string;
  name: string;
  leader: string;
  members: string;
  majors: string[];
  status: 'pending' | 'recruiting' | 'finalized';
  statusLabel: string;
  registeredLecturers: number;
  hasLecturer: boolean;
}

const ModeratorHomepage: React.FC = () => {
  const navigate = useNavigate();

  const stats: StatCard[] = [
    {
      title: 'Tổng số nhóm',
      value: '48',
      icon: '👥',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      link: '/moderator/groups',
    },
    {
      title: 'Chờ phân công GV',
      value: '12',
      icon: '📋',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      link: '/moderator/groups',
    },
    {
      title: 'Đã phân công',
      value: '36',
      icon: '✓',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      link: '/moderator/groups',
    },
    {
      title: 'Giảng viên đang dạy',
      value: '8',
      icon: '🎓',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      link: '/moderator/lecturers',
    },
  ];

  const pendingGroups: GroupCard[] = [
    {
      id: '1',
      name: 'AI Healthcare System',
      leader: 'Nguyễn Văn A',
      members: '4/6',
      majors: ['SE', 'AI', 'IS'],
      status: 'pending',
      statusLabel: 'Chờ phân công',
      registeredLecturers: 3,
      hasLecturer: false,
    },
    {
      id: '2',
      name: 'Smart City IoT Platform',
      leader: 'Trần Thị B',
      members: '5/6',
      majors: ['IoT', 'SE'],
      status: 'pending',
      statusLabel: 'Chờ phân công',
      registeredLecturers: 3,
      hasLecturer: false,
    },
    {
      id: '3',
      name: 'Blockchain Finance',
      leader: 'Lê Văn C',
      members: '6/6',
      majors: ['SE', 'AI', 'IS'],
      status: 'pending',
      statusLabel: 'Chờ phân công',
      registeredLecturers: 3,
      hasLecturer: false,
    },
  ];

  const hotGroups: GroupCard[] = [
    {
      id: '4',
      name: 'E-Commerce Mobile App',
      leader: 'Phạm Thị D',
      members: '5/6',
      majors: ['SE', 'IS'],
      status: 'recruiting',
      statusLabel: 'Đang tuyển',
      registeredLecturers: 2,
      hasLecturer: false,
    },
    {
      id: '5',
      name: 'Data Analytics Dashboard',
      leader: 'Hoàng Văn E',
      members: '4/6',
      majors: ['SE', 'DS'],
      status: 'recruiting',
      statusLabel: 'Đang tuyển',
      registeredLecturers: 3,
      hasLecturer: true,
    },
    {
      id: '6',
      name: 'Mobile Game Development',
      leader: 'Vũ Thị F',
      members: '6/6',
      majors: ['SE', 'DD'],
      status: 'finalized',
      statusLabel: 'Đã hoàn tất',
      registeredLecturers: 3,
      hasLecturer: true,
    },
  ];

  const getMajorColor = (major: string) => {
    const colors: { [key: string]: string } = {
      SE: 'bg-blue-500',
      AI: 'bg-purple-500',
      IS: 'bg-red-500',
      IoT: 'bg-cyan-500',
      DS: 'bg-green-500',
      DD: 'bg-pink-500',
    };
    return colors[major] || 'bg-gray-500';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-100 text-orange-600';
      case 'recruiting':
        return 'bg-blue-100 text-blue-600';
      case 'finalized':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className='min-h-screen bg-[#F4F6F8] p-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-6'>
          <h1 className='text-3xl font-bold text-[#212B36] mb-2'>
            Dashboard - Moderator
          </h1>
          <p className='text-[#637381]'>
            Quản lý và điều tiết nhóm, giảng viên
          </p>
        </div>

        {/* Statistics Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
          {stats.map((stat, index) => (
            <button
              key={index}
              onClick={() => stat.link && navigate(stat.link)}
              className={`${stat.bgColor} rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-shadow text-left w-full`}
              type='button'
            >
              <div className='text-4xl mb-2'>{stat.icon}</div>
              <h3 className='text-sm text-[#637381] mb-2'>{stat.title}</h3>
              <p className={`text-4xl font-bold ${stat.textColor}`}>
                {stat.value}
              </p>
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Nhóm chờ phân công */}
          <div className='lg:col-span-2'>
            <div className='bg-white rounded-2xl p-6 shadow-sm'>
              <div className='flex justify-between items-center mb-4'>
                <h2 className='text-xl font-bold text-[#212B36]'>
                  Nhóm chờ phân công GV
                </h2>
                <button
                  onClick={() => navigate('/moderator/groups')}
                  className='text-[#4D82E4] hover:underline text-sm font-semibold'
                >
                  Xem tất cả →
                </button>
              </div>

              <div className='space-y-4'>
                {pendingGroups.map(group => (
                  <button
                    key={group.id}
                    className='border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer w-full text-left'
                    onClick={() => navigate('/moderator/groups')}
                    type='button'
                  >
                    <div className='flex justify-between items-start mb-2'>
                      <div>
                        <h3 className='font-bold text-[#212B36] mb-1'>
                          {group.name}
                        </h3>
                        <p className='text-sm text-[#637381]'>
                          Trưởng nhóm: {group.leader}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(group.status)}`}
                      >
                        {group.statusLabel}
                      </span>
                    </div>

                    <div className='flex items-center gap-2 mb-2'>
                      <span className='text-sm text-[#637381]'>
                        👥 {group.members} thành viên
                      </span>
                      <span className='text-gray-300'>•</span>
                      <span className='text-sm text-[#637381]'>
                        📋 {group.registeredLecturers} GV đăng ký
                      </span>
                    </div>

                    <div className='flex gap-1'>
                      <span className='text-xs text-[#637381] mr-2'>
                        Ngành:
                      </span>
                      {group.majors.map(major => (
                        <span
                          key={major}
                          className={`${getMajorColor(major)} text-white text-xs px-2 py-1 rounded font-semibold`}
                        >
                          {major}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => navigate('/moderator/groups')}
                className='w-full mt-4 bg-[#4D82E4] text-white py-3 rounded-lg font-semibold hover:bg-[#3d6bc7] transition-colors'
              >
                Phân công giảng viên
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            {/* Thông báo ưu tiên */}
            <div className='bg-white rounded-2xl p-6 shadow-sm'>
              <h2 className='text-lg font-bold text-[#212B36] mb-4'>
                Thông báo ưu tiên
              </h2>
              <div className='space-y-4'>
                <div className='bg-orange-50 border border-orange-200 rounded-lg p-3'>
                  <div className='flex items-start gap-2'>
                    <span className='text-xl'>⚠️</span>
                    <div>
                      <p className='font-semibold text-orange-600 text-sm mb-1'>
                        Cần xử lý
                      </p>
                      <p className='text-sm text-[#637381]'>
                        12 nhóm đang chờ phân công giảng viên
                      </p>
                    </div>
                  </div>
                </div>

                <div className='bg-green-50 border border-green-200 rounded-lg p-3'>
                  <div className='flex items-start gap-2'>
                    <span className='text-xl'>✓</span>
                    <div>
                      <p className='font-semibold text-green-600 text-sm mb-1'>
                        Hoàn thành
                      </p>
                      <p className='text-sm text-[#637381]'>
                        36 nhóm đã được phân công thành công
                      </p>
                    </div>
                  </div>
                </div>

                <div className='bg-blue-50 border border-blue-200 rounded-lg p-3'>
                  <div className='flex items-start gap-2'>
                    <span className='text-xl'>📊</span>
                    <div>
                      <p className='font-semibold text-blue-600 text-sm mb-1'>
                        Thống kê
                      </p>
                      <p className='text-sm text-[#637381]'>
                        8 giảng viên đang hướng dẫn
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hoạt động gần đây */}
            <div className='bg-white rounded-2xl p-6 shadow-sm'>
              <h2 className='text-lg font-bold text-[#212B36] mb-4'>
                Hoạt động gần đây
              </h2>
              <div className='space-y-3'>
                <div className='border-l-4 border-blue-500 pl-3 py-1'>
                  <p className='text-sm text-[#212B36]'>
                    Phân công GV Nguyễn Văn A cho nhóm AI Healthcare
                  </p>
                  <p className='text-xs text-[#637381] mt-1'>10 phút trước</p>
                </div>
                <div className='border-l-4 border-purple-500 pl-3 py-1'>
                  <p className='text-sm text-[#212B36]'>
                    Cập nhật số nhóm tối đa/lớp: 6
                  </p>
                  <p className='text-xs text-[#637381] mt-1'>1 giờ trước</p>
                </div>
                <div className='border-l-4 border-green-500 pl-3 py-1'>
                  <p className='text-sm text-[#212B36]'>
                    Phân công GV Trần Thị B cho nhóm Smart City
                  </p>
                  <p className='text-xs text-[#637381] mt-1'>2 giờ trước</p>
                </div>
                <div className='border-l-4 border-orange-500 pl-3 py-1'>
                  <p className='text-sm text-[#212B36]'>
                    Nhóm E-Commerce Platform đăng ký GV thành công
                  </p>
                  <p className='text-xs text-[#637381] mt-1'>3 giờ trước</p>
                </div>
              </div>

              <button
                onClick={() => navigate('/moderator/audit')}
                className='w-full mt-4 text-[#4D82E4] border border-[#4D82E4] py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-sm'
              >
                Xem lịch sử đầy đủ
              </button>
            </div>
          </div>
        </div>

        {/* Nhóm nổi bật */}
        <div className='mt-8'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-2xl font-bold text-[#212B36]'>Nhóm nổi bật</h2>
            <button
              onClick={() => navigate('/moderator/groups')}
              className='text-[#4D82E4] hover:underline font-semibold'
            >
              Xem tất cả →
            </button>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {hotGroups.map(group => (
              <button
                key={group.id}
                className='bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow cursor-pointer text-left w-full'
                onClick={() => navigate('/moderator/groups')}
                type='button'
              >
                <div className='flex justify-between items-start mb-3'>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(group.status)}`}
                  >
                    {group.statusLabel}
                  </span>
                  {group.hasLecturer && (
                    <span className='text-green-500 text-xl'>✓</span>
                  )}
                </div>

                <h3 className='font-bold text-lg text-[#212B36] mb-2'>
                  {group.name}
                </h3>
                <p className='text-sm text-[#637381] mb-3'>
                  Trưởng nhóm: {group.leader}
                </p>

                <div className='flex items-center gap-2 mb-3'>
                  <span className='text-sm text-[#637381]'>
                    👥 {group.members}
                  </span>
                  <span className='text-gray-300'>•</span>
                  <span className='text-sm text-[#637381]'>
                    Ngành: {group.majors.length}
                  </span>
                </div>

                <div className='flex gap-1 mb-3'>
                  {group.majors.map(major => (
                    <span
                      key={major}
                      className={`${getMajorColor(major)} text-white text-xs px-2 py-1 rounded font-semibold`}
                    >
                      {major}
                    </span>
                  ))}
                </div>

                <div className='text-sm text-[#637381]'>
                  📋 {group.registeredLecturers} GV đã đăng ký
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModeratorHomepage;
