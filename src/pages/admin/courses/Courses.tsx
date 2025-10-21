import { useEffect, useState } from 'react';
import { semesterMockAPI, type Semester } from '../../../mock/semester.mockapi';

export function Courses() {
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSemesters();
  }, []);

  const loadSemesters = async () => {
    setLoading(true);
    try {
      const data = await semesterMockAPI.getAllSemesters();
      setSemesters(data);
    } catch {
      // Handle error silently or show user-friendly message
      setSemesters([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: Semester['semesterStatus']) => {
    const styles = {
      ACTIVE: 'bg-green-100 text-green-800',
      INACTIVE: 'bg-gray-100 text-gray-800',
      UPCOMING: 'bg-blue-100 text-blue-800',
      COMPLETED: 'bg-purple-100 text-purple-800',
    };

    return (
      <span
        className={`px-2 py-1 text-xs font-semibold rounded-full ${styles[status]}`}
      >
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center h-64'>
        <p className='text-text-subtitle'>Đang tải...</p>
      </div>
    );
  }

  return (
    <div>
      <div className='mb-6'>
        <h1 className='text-3xl font-bold text-text-title mb-2'>
          Quản lý Kỳ học
        </h1>
        <p className='text-text-subtitle'>Quản lý các kỳ học trong hệ thống</p>
      </div>

      <div className='bg-white rounded-lg shadow'>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Mã kỳ học
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Tên kỳ học
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Ngày bắt đầu
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Ngày kết thúc
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {semesters.map(semester => (
                <tr key={semester.semesterId} className='hover:bg-gray-50'>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-text-title'>
                    {semester.semesterCode}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-text-subtitle'>
                    {semester.semesterName}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-text-subtitle'>
                    {new Date(semester.startDate).toLocaleDateString('vi-VN')}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-text-subtitle'>
                    {new Date(semester.endDate).toLocaleDateString('vi-VN')}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm'>
                    {getStatusBadge(semester.semesterStatus)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
