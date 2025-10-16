import React from 'react';

interface LecturerWorkload {
  id: string;
  name: string;
  email: string;
  currentGroups: number;
  maxGroups: number;
  assignedGroups: string[];
}

const LecturerWorkload: React.FC = () => {
  const mockLecturers: LecturerWorkload[] = [
    {
      id: 'l1',
      name: 'GV Nguyễn Văn A',
      email: 'nguyenvana@fpt.edu.vn',
      currentGroups: 4,
      maxGroups: 6,
      assignedGroups: [
        'AI Healthcare',
        'E-Commerce Platform',
        'Mobile App Dev',
        'Cloud Computing',
      ],
    },
    {
      id: 'l2',
      name: 'GV Trần Thị B',
      email: 'tranthib@fpt.edu.vn',
      currentGroups: 2,
      maxGroups: 6,
      assignedGroups: ['Smart City IoT', 'AR Education'],
    },
    {
      id: 'l3',
      name: 'GV Lê Văn C',
      email: 'levanc@fpt.edu.vn',
      currentGroups: 5,
      maxGroups: 6,
      assignedGroups: [
        'Blockchain Finance',
        'Cybersecurity',
        'Game Development',
        'Data Analytics',
        'ML Platform',
      ],
    },
    {
      id: 'l4',
      name: 'GV Phạm Thị D',
      email: 'phamthid@fpt.edu.vn',
      currentGroups: 3,
      maxGroups: 6,
      assignedGroups: ['Social Network', 'Food Delivery', 'Online Learning'],
    },
    {
      id: 'l5',
      name: 'GV Hoàng Văn E',
      email: 'hoangvane@fpt.edu.vn',
      currentGroups: 6,
      maxGroups: 6,
      assignedGroups: [
        'ERP System',
        'CRM Platform',
        'HR Management',
        'Inventory System',
        'POS System',
        'Accounting App',
      ],
    },
    {
      id: 'l6',
      name: 'GV Vũ Thị F',
      email: 'vuthif@fpt.edu.vn',
      currentGroups: 1,
      maxGroups: 6,
      assignedGroups: ['Travel Booking'],
    },
  ];

  const getWorkloadPercentage = (current: number, max: number) => {
    return (current / max) * 100;
  };

  const getWorkloadStatus = (current: number, max: number) => {
    const percentage = getWorkloadPercentage(current, max);
    if (percentage >= 100) return { label: 'Đầy', color: '#F44336' };
    if (percentage >= 80) return { label: 'Gần đầy', color: '#FF9800' };
    if (percentage >= 50) return { label: 'Vừa phải', color: '#2196F3' };
    return { label: 'Còn trống', color: '#4CAF50' };
  };

  const getProgressColor = (current: number, max: number) => {
    const percentage = getWorkloadPercentage(current, max);
    if (percentage >= 100) return '#F44336';
    if (percentage >= 80) return '#FF9800';
    if (percentage >= 50) return '#2196F3';
    return '#4CAF50';
  };

  return (
    <div className='p-6 bg-[#F4F6F8] min-h-screen'>
      {/* Header */}
      <h1 className='text-3xl font-semibold text-[#212B36] mb-6'>
        Workload Giảng viên
      </h1>

      {/* Statistics */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
        <div className='bg-white p-4 rounded-2xl shadow-sm'>
          <p className='text-sm text-[#637381] mb-1'>Tổng số GV</p>
          <p className='text-4xl font-bold text-[#212B36]'>
            {mockLecturers.length}
          </p>
        </div>
        <div className='bg-white p-4 rounded-2xl shadow-sm'>
          <p className='text-sm text-[#637381] mb-1'>GV đã đầy</p>
          <p className='text-4xl font-bold text-[#F44336]'>
            {mockLecturers.filter(l => l.currentGroups >= l.maxGroups).length}
          </p>
        </div>
        <div className='bg-white p-4 rounded-2xl shadow-sm'>
          <p className='text-sm text-[#637381] mb-1'>GV còn slot</p>
          <p className='text-4xl font-bold text-[#4CAF50]'>
            {mockLecturers.filter(l => l.currentGroups < l.maxGroups).length}
          </p>
        </div>
        <div className='bg-white p-4 rounded-2xl shadow-sm'>
          <p className='text-sm text-[#637381] mb-1'>Tổng nhóm đã phân</p>
          <p className='text-4xl font-bold text-[#4D82E4]'>
            {mockLecturers.reduce((sum, l) => sum + l.currentGroups, 0)}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className='bg-white rounded-2xl shadow-sm overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-[#F9FAFB]'>
              <tr>
                <th className='px-6 py-4 text-left font-semibold text-[#212B36]'>
                  Giảng viên
                </th>
                <th className='px-6 py-4 text-left font-semibold text-[#212B36]'>
                  Email
                </th>
                <th className='px-6 py-4 text-left font-semibold text-[#212B36]'>
                  Số nhóm hiện tại
                </th>
                <th className='px-6 py-4 text-left font-semibold text-[#212B36]'>
                  Workload (%)
                </th>
                <th className='px-6 py-4 text-left font-semibold text-[#212B36]'>
                  Trạng thái
                </th>
                <th className='px-6 py-4 text-left font-semibold text-[#212B36]'>
                  Danh sách nhóm
                </th>
              </tr>
            </thead>
            <tbody>
              {mockLecturers.map(lecturer => {
                const status = getWorkloadStatus(
                  lecturer.currentGroups,
                  lecturer.maxGroups
                );
                const percentage = getWorkloadPercentage(
                  lecturer.currentGroups,
                  lecturer.maxGroups
                );

                return (
                  <tr
                    key={lecturer.id}
                    className='border-t border-gray-200 hover:bg-gray-50'
                  >
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 rounded-full bg-[#4D82E4] flex items-center justify-center text-white'>
                          🎓
                        </div>
                        <span className='font-semibold text-[#212B36]'>
                          {lecturer.name}
                        </span>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <span className='text-sm text-[#637381]'>
                        {lecturer.email}
                      </span>
                    </td>
                    <td className='px-6 py-4'>
                      <span className='font-semibold text-[#212B36]'>
                        {lecturer.currentGroups} / {lecturer.maxGroups}
                      </span>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='w-full max-w-[150px]'>
                        <div className='flex justify-between mb-1'>
                          <span className='text-xs text-[#637381]'>
                            {percentage.toFixed(0)}%
                          </span>
                        </div>
                        <div className='w-full h-2 bg-[#E5E7EB] rounded-full overflow-hidden'>
                          <div
                            className='h-full rounded-full transition-all'
                            style={{
                              width: `${percentage}%`,
                              backgroundColor: getProgressColor(
                                lecturer.currentGroups,
                                lecturer.maxGroups
                              ),
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <span
                        className='px-3 py-1 rounded-lg text-sm font-semibold'
                        style={{
                          backgroundColor: `${status.color}20`,
                          color: status.color,
                        }}
                      >
                        {status.label}
                      </span>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex flex-col gap-1'>
                        {lecturer.assignedGroups
                          .slice(0, 3)
                          .map((group, index) => (
                            <span
                              key={index}
                              className='text-xs text-[#637381]'
                            >
                              • {group}
                            </span>
                          ))}
                        {lecturer.assignedGroups.length > 3 && (
                          <span className='text-xs text-[#4D82E4] font-semibold'>
                            +{lecturer.assignedGroups.length - 3} nhóm khác
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LecturerWorkload;
