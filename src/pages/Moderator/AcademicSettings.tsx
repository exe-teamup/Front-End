import React, { useState } from 'react';

const AcademicSettings: React.FC = () => {
  const [selectedSemester, setSelectedSemester] = useState('Fall 2024');
  const [maxGroupsPerCourse, setMaxGroupsPerCourse] = useState('6');
  const [minMembersToSelectLecturer, setMinMembersToSelectLecturer] =
    useState('3');
  const [minRequiredMajors, setMinRequiredMajors] = useState('2');
  const [maxPreferredLecturers, setMaxPreferredLecturers] = useState('3');
  const [lecturerResponseDays, setLecturerResponseDays] = useState('7');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveConfiguration = () => {
    // TODO: API call to save settings
    // Configuration: {semester, maxGroupsPerCourse, minMembersToSelectLecturer, minRequiredMajors, maxPreferredLecturers, lecturerResponseDays}
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className='p-6 bg-[#F4F6F8] min-h-screen'>
      {/* Header */}
      <div className='flex items-center mb-6'>
        <span className='text-4xl text-[#4D82E4] mr-3'>⚙️</span>
        <h1 className='text-3xl font-semibold text-[#212B36]'>
          Cài đặt Học vụ
        </h1>
      </div>

      {saveSuccess && (
        <div className='bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6'>
          Cấu hình đã được lưu thành công!
        </div>
      )}

      {/* Configuration Form */}
      <div className='bg-white p-6 rounded-2xl shadow-sm mb-6'>
        <h2 className='text-xl font-semibold text-[#212B36] mb-6'>
          Cấu hình hệ thống theo học kỳ
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Semester Selection */}
          <div>
            <label
              htmlFor='semester'
              className='block text-sm font-medium text-[#212B36] mb-2'
            >
              Học kỳ hiện tại
            </label>
            <select
              id='semester'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D82E4]'
              value={selectedSemester}
              onChange={e => setSelectedSemester(e.target.value)}
            >
              <option value='Spring 2024'>Spring 2024</option>
              <option value='Summer 2024'>Summer 2024</option>
              <option value='Fall 2024'>Fall 2024</option>
              <option value='Spring 2025'>Spring 2025</option>
            </select>
            <p className='text-xs text-[#637381] mt-1'>
              Chọn học kỳ để áp dụng cấu hình
            </p>
          </div>

          {/* Max Groups per Course */}
          <div>
            <label
              htmlFor='maxGroups'
              className='block text-sm font-medium text-[#212B36] mb-2'
            >
              Số nhóm tối đa / Lớp môn học
            </label>
            <input
              id='maxGroups'
              type='number'
              min='1'
              max='10'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D82E4]'
              value={maxGroupsPerCourse}
              onChange={e => setMaxGroupsPerCourse(e.target.value)}
            />
            <p className='text-xs text-[#637381] mt-1'>
              Mặc định: 6 (theo quy tắc 36 SV / 6 nhóm)
            </p>
          </div>

          <div className='md:col-span-2'>
            <hr className='border-gray-200' />
          </div>

          {/* Min Members to Select Lecturer */}
          <div>
            <label
              htmlFor='minMembers'
              className='block text-sm font-medium text-[#212B36] mb-2'
            >
              Số thành viên tối thiểu để chọn GV
            </label>
            <input
              id='minMembers'
              type='number'
              min='1'
              max='6'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D82E4]'
              value={minMembersToSelectLecturer}
              onChange={e => setMinMembersToSelectLecturer(e.target.value)}
            />
            <p className='text-xs text-[#637381] mt-1'>
              Nhóm cần đủ bao nhiêu thành viên mới được phép đăng ký GV
            </p>
          </div>

          {/* Min Required Majors */}
          <div>
            <label
              htmlFor='minMajors'
              className='block text-sm font-medium text-[#212B36] mb-2'
            >
              Số chuyên ngành tối thiểu / nhóm
            </label>
            <input
              id='minMajors'
              type='number'
              min='1'
              max='5'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D82E4]'
              value={minRequiredMajors}
              onChange={e => setMinRequiredMajors(e.target.value)}
            />
            <p className='text-xs text-[#637381] mt-1'>
              Quy tắc đa chuyên ngành (Multi-Major Rule)
            </p>
          </div>
        </div>

        <hr className='border-gray-200 my-6' />

        {/* Additional Settings */}
        <h2 className='text-xl font-semibold text-[#212B36] mb-6'>
          Cài đặt bổ sung
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <label
              htmlFor='maxLecturers'
              className='block text-sm font-medium text-[#212B36] mb-2'
            >
              Số GV ưu tiên tối đa / nhóm
            </label>
            <input
              id='maxLecturers'
              type='number'
              min='1'
              max='5'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D82E4]'
              value={maxPreferredLecturers}
              onChange={e => setMaxPreferredLecturers(e.target.value)}
            />
            <p className='text-xs text-[#637381] mt-1'>
              Nhóm được đăng ký tối đa bao nhiêu GV ưu tiên
            </p>
          </div>

          <div>
            <label
              htmlFor='responseDays'
              className='block text-sm font-medium text-[#212B36] mb-2'
            >
              Thời gian chờ phản hồi GV (ngày)
            </label>
            <input
              id='responseDays'
              type='number'
              min='1'
              max='30'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D82E4]'
              value={lecturerResponseDays}
              onChange={e => setLecturerResponseDays(e.target.value)}
            />
            <p className='text-xs text-[#637381] mt-1'>
              Thời gian tối đa chờ GV phản hồi yêu cầu
            </p>
          </div>
        </div>

        {/* Save Button */}
        <div className='mt-6 flex justify-end'>
          <button
            onClick={handleSaveConfiguration}
            className='px-6 py-3 bg-[#4D82E4] text-white rounded-lg font-semibold hover:bg-[#3d6bc7] transition-colors flex items-center gap-2'
          >
            <span>💾</span>
            Lưu cấu hình
          </button>
        </div>
      </div>

      {/* Info Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div className='bg-[#E3F2FD] p-4 rounded-2xl'>
          <h3 className='text-[#1976D2] font-semibold mb-2'>ℹ️ Lưu ý</h3>
          <p className='text-sm text-[#212B36]'>
            Các thay đổi sẽ áp dụng cho học kỳ được chọn và có hiệu lực ngay lập
            tức.
          </p>
        </div>

        <div className='bg-[#FFF3E0] p-4 rounded-2xl'>
          <h3 className='text-[#F57C00] font-semibold mb-2'>⚠️ Cảnh báo</h3>
          <p className='text-sm text-[#212B36]'>
            Việc thay đổi cấu hình có thể ảnh hưởng đến các nhóm đang hoạt động.
          </p>
        </div>

        <div className='bg-[#E8F5E9] p-4 rounded-2xl'>
          <h3 className='text-[#388E3C] font-semibold mb-2'>✓ Khuyến nghị</h3>
          <p className='text-sm text-[#212B36]'>
            Nên cấu hình trước khi bắt đầu học kỳ mới để tránh xung đột.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AcademicSettings;
