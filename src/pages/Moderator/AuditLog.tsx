import React, { useState } from 'react';

interface AuditLog {
  id: string;
  timestamp: string;
  moderator: string;
  action: string;
  target: string;
  details: string;
  type: 'assignment' | 'settings' | 'approval' | 'rejection';
}

const AuditLog: React.FC = () => {
  const mockAuditLogs: AuditLog[] = [
    {
      id: '1',
      timestamp: '2024-10-15 14:30:00',
      moderator: 'Admin Nguyễn Quang Dao',
      action: 'Phân công GV',
      target: 'Nhóm AI Healthcare System',
      details: 'Phân công GV Nguyễn Văn A',
      type: 'assignment',
    },
    {
      id: '2',
      timestamp: '2024-10-15 13:15:00',
      moderator: 'Admin Nguyễn Quang Dao',
      action: 'Cập nhật cài đặt',
      target: 'Học kỳ Fall 2024',
      details: 'Thay đổi số nhóm tối đa/lớp: 5 → 6',
      type: 'settings',
    },
    {
      id: '3',
      timestamp: '2024-10-15 11:45:00',
      moderator: 'Admin Nguyễn Quang Dao',
      action: 'Phân công GV',
      target: 'Nhóm E-Commerce Platform',
      details: 'Phân công GV Trần Thị B',
      type: 'assignment',
    },
    {
      id: '4',
      timestamp: '2024-10-15 10:20:00',
      moderator: 'Admin Nguyễn Quang Dao',
      action: 'Duyệt nhóm',
      target: 'Nhóm Smart City IoT',
      details: 'Duyệt nhóm đáp ứng quy tắc đa chuyên ngành',
      type: 'approval',
    },
    {
      id: '5',
      timestamp: '2024-10-15 09:00:00',
      moderator: 'Admin Nguyễn Quang Dao',
      action: 'Từ chối nhóm',
      target: 'Nhóm Test Project',
      details: 'Từ chối: Không đủ thành viên tối thiểu',
      type: 'rejection',
    },
    {
      id: '6',
      timestamp: '2024-10-14 16:30:00',
      moderator: 'Admin Nguyễn Quang Dao',
      action: 'Phân công GV',
      target: 'Nhóm Blockchain Finance',
      details: 'Phân công GV Phạm Thị D',
      type: 'assignment',
    },
    {
      id: '7',
      timestamp: '2024-10-14 15:00:00',
      moderator: 'Admin Nguyễn Quang Dao',
      action: 'Cập nhật cài đặt',
      target: 'Học kỳ Fall 2024',
      details: 'Thay đổi số thành viên tối thiểu: 4 → 3',
      type: 'settings',
    },
    {
      id: '8',
      timestamp: '2024-10-14 14:20:00',
      moderator: 'Admin Nguyễn Quang Dao',
      action: 'Điều tiết GV',
      target: 'Nhóm Mobile App Dev',
      details: 'Chuyển từ GV A sang GV C do cân bằng workload',
      type: 'assignment',
    },
  ];

  const getActionColor = (type: string) => {
    switch (type) {
      case 'assignment':
        return '#4D82E4';
      case 'settings':
        return '#9C27B0';
      case 'approval':
        return '#4CAF50';
      case 'rejection':
        return '#F44336';
      default:
        return '#757575';
    }
  };

  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = mockAuditLogs.filter(
    log =>
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='p-6 bg-[#F4F6F8] min-h-screen'>
      {/* Header */}
      <div className='flex items-center mb-6'>
        <span className='text-4xl text-[#4D82E4] mr-3'>📜</span>
        <h1 className='text-3xl font-semibold text-[#212B36]'>
          Lịch sử hoạt động
        </h1>
      </div>

      {/* Search */}
      <div className='bg-white p-4 mb-6 rounded-2xl shadow-sm'>
        <div className='relative'>
          <span className='absolute left-3 top-1/2 -translate-y-1/2 text-[#637381]'>
            🔍
          </span>
          <input
            type='text'
            placeholder='Tìm kiếm theo hành động, nhóm, hoặc GV...'
            className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D82E4]'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Statistics */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
        <div className='bg-white p-4 rounded-2xl shadow-sm'>
          <p className='text-sm text-[#637381] mb-1'>Tổng hoạt động hôm nay</p>
          <p className='text-4xl font-bold text-[#212B36]'>5</p>
        </div>
        <div className='bg-white p-4 rounded-2xl shadow-sm'>
          <p className='text-sm text-[#637381] mb-1'>Phân công GV</p>
          <p className='text-4xl font-bold text-[#4D82E4]'>4</p>
        </div>
        <div className='bg-white p-4 rounded-2xl shadow-sm'>
          <p className='text-sm text-[#637381] mb-1'>Cập nhật cài đặt</p>
          <p className='text-4xl font-bold text-[#9C27B0]'>2</p>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className='bg-white rounded-2xl shadow-sm overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-[#F9FAFB]'>
              <tr>
                <th className='px-6 py-4 text-left font-semibold text-[#212B36]'>
                  Thời gian
                </th>
                <th className='px-6 py-4 text-left font-semibold text-[#212B36]'>
                  Người thực hiện
                </th>
                <th className='px-6 py-4 text-left font-semibold text-[#212B36]'>
                  Hành động
                </th>
                <th className='px-6 py-4 text-left font-semibold text-[#212B36]'>
                  Đối tượng
                </th>
                <th className='px-6 py-4 text-left font-semibold text-[#212B36]'>
                  Chi tiết
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map(log => (
                <tr
                  key={log.id}
                  className='border-t border-gray-200 hover:bg-gray-50'
                >
                  <td className='px-6 py-4'>
                    <span className='text-sm text-[#637381]'>
                      {log.timestamp}
                    </span>
                  </td>
                  <td className='px-6 py-4'>
                    <div className='flex items-center gap-2'>
                      <div className='w-8 h-8 rounded-full bg-[#4D82E4] flex items-center justify-center text-white text-sm'>
                        👤
                      </div>
                      <span className='text-sm text-[#212B36]'>
                        {log.moderator}
                      </span>
                    </div>
                  </td>
                  <td className='px-6 py-4'>
                    <span
                      className='px-3 py-1 rounded-lg text-xs font-semibold'
                      style={{
                        backgroundColor: `${getActionColor(log.type)}20`,
                        color: getActionColor(log.type),
                      }}
                    >
                      {log.action}
                    </span>
                  </td>
                  <td className='px-6 py-4'>
                    <span className='text-sm text-[#212B36] font-semibold'>
                      {log.target}
                    </span>
                  </td>
                  <td className='px-6 py-4'>
                    <span className='text-sm text-[#637381]'>
                      {log.details}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AuditLog;
