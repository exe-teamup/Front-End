import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockLecturerWorkload } from './mockData';

export function WorkloadGiangVien() {
  const totalLecturers = mockLecturerWorkload.length;
  const available = mockLecturerWorkload.filter(
    l => l.status === 'available'
  ).length;
  const limited = mockLecturerWorkload.filter(
    l => l.status === 'limited'
  ).length;
  const full = mockLecturerWorkload.filter(l => l.current === l.quota).length;

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-2xl font-bold text-gray-900'>
          Workload Giảng viên
        </h1>
        <p className='text-gray-600'>
          Phân tích và theo dõi tải hạn ngạch của giảng viên
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <Card>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium text-gray-600'>
              Tổng số GV
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-blue-600'>
              {totalLecturers}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium text-gray-600'>
              GV còn slot
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-green-600'>{available}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium text-gray-600'>
              GV gần đầy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-orange-600'>{limited}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium text-gray-600'>
              GV đã đầy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-red-600'>{full}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách Giảng viên</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {mockLecturerWorkload.map(lecturer => {
              const percent = (lecturer.current / lecturer.quota) * 100;
              return (
                <div
                  key={lecturer.id}
                  className='flex items-center justify-between p-4 border rounded-lg'
                >
                  <div className='flex-1'>
                    <div className='font-semibold'>{lecturer.name}</div>
                    <div className='text-sm text-gray-500'>
                      {lecturer.email}
                    </div>
                  </div>
                  <div className='flex items-center gap-4'>
                    <div className='text-center'>
                      <div className='text-xs text-gray-500'>Hiện tại</div>
                      <div className='font-semibold'>{lecturer.current}</div>
                    </div>
                    <div className='text-center'>
                      <div className='text-xs text-gray-500'>Quota</div>
                      <div className='font-semibold'>{lecturer.quota}</div>
                    </div>
                    <div className='w-32'>
                      <div className='text-xs text-gray-500 mb-1'>
                        {Math.round(percent)}%
                      </div>
                      <div className='w-full bg-gray-200 rounded-full h-2'>
                        <div
                          className={`h-2 rounded-full ${
                            percent >= 100
                              ? 'bg-red-500'
                              : percent >= 75
                                ? 'bg-orange-500'
                                : percent >= 50
                                  ? 'bg-blue-500'
                                  : 'bg-green-500'
                          }`}
                          style={{ width: `${Math.min(percent, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          lecturer.status === 'available'
                            ? 'bg-green-100 text-green-800'
                            : lecturer.status === 'limited'
                              ? 'bg-orange-100 text-orange-800'
                              : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {lecturer.status === 'available'
                          ? 'Còn slot'
                          : lecturer.status === 'limited'
                            ? 'Gần đầy'
                            : 'Đã đầy'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
