import React, { useState } from 'react';

interface Lecturer {
  id: string;
  name: string;
  preference: number;
}

interface Group {
  id: string;
  groupName: string;
  members: string;
  majors: string[];
  registeredLecturers: Lecturer[];
  assignedLecturer: string | null;
  status: string;
  semester: string;
}

const GroupOverview: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [showModal, setShowModal] = useState(false);

  const mockGroups: Group[] = [
    {
      id: '1',
      groupName: 'AI Healthcare System',
      members: '4/6',
      majors: ['SE', 'AI'],
      registeredLecturers: [
        { id: 'l1', name: 'GV Nguyễn Văn A', preference: 1 },
      ],
      assignedLecturer: null,
      status: 'Pending Assignment',
      semester: 'Fall 2024',
    },
    {
      id: '2',
      groupName: 'E-Commerce Platform',
      members: '5/6',
      majors: ['SE', 'IS'],
      registeredLecturers: [
        { id: 'l1', name: 'GV Nguyễn Văn A', preference: 1 },
      ],
      assignedLecturer: 'GV Nguyễn Văn A',
      status: 'Finalized',
      semester: 'Fall 2024',
    },
  ];

  const filteredGroups = mockGroups.filter(
    g =>
      g.groupName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === 'all' || g.status === statusFilter)
  );

  return (
    <div className='p-6 bg-[#F4F6F8] min-h-screen'>
      <h1 className='text-3xl font-bold text-[#212B36] mb-6'>Tổng quan Nhóm</h1>

      <div className='bg-white p-4 mb-6 rounded-xl'>
        <div className='grid grid-cols-2 gap-4'>
          <input
            type='text'
            placeholder='Tìm kiếm nhóm...'
            className='px-4 py-2 border rounded-lg'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <select
            className='px-4 py-2 border rounded-lg'
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value='all'>Tất cả</option>
            <option value='Pending Assignment'>Chờ phân công</option>
            <option value='Finalized'>Hoàn tất</option>
          </select>
        </div>
      </div>

      <div className='bg-white rounded-xl overflow-hidden'>
        <table className='w-full'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-left'>Tên nhóm</th>
              <th className='px-6 py-3 text-left'>Thành viên</th>
              <th className='px-6 py-3 text-left'>Trạng thái</th>
              <th className='px-6 py-3 text-left'>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredGroups.map(group => (
              <tr key={group.id} className='border-t'>
                <td className='px-6 py-4'>{group.groupName}</td>
                <td className='px-6 py-4'>{group.members}</td>
                <td className='px-6 py-4'>
                  <span className='px-3 py-1 rounded-lg text-sm bg-green-100 text-green-600'>
                    {group.status}
                  </span>
                </td>
                <td className='px-6 py-4'>
                  <button
                    onClick={() => {
                      setSelectedGroup(group);
                      setShowModal(true);
                    }}
                    className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'
                  >
                    Phân công
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && selectedGroup && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-xl p-6 max-w-lg w-full'>
            <h2 className='text-2xl font-bold mb-4'>Phân công GV</h2>
            <p className='mb-4'>Nhóm: {selectedGroup.groupName}</p>
            <div className='flex gap-3 justify-end'>
              <button
                onClick={() => setShowModal(false)}
                className='px-4 py-2 border rounded-lg'
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupOverview;
