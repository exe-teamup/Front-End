import { useState } from 'react';
import { Search, Filter, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { searchGroups } from '@/mock/groups.mockapi';
import GroupCard from '@/components/groups/GroupCard';

function GroupsListTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [memberFilter, setMemberFilter] = useState<number | undefined>(
    undefined
  );
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const allGroups = searchGroups(searchQuery, memberFilter);
  const totalPages = Math.ceil(allGroups.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const groups = allGroups.slice(startIndex, startIndex + itemsPerPage);

  const memberFilterOptions = [
    { value: undefined, label: 'Tất cả' },
    { value: 3, label: 'dưới 4' },
    { value: 4, label: 'dưới 5' },
    { value: 5, label: 'dưới 6' },
  ];

  // optional: filter theo chuyên ngành

  return (
    <div className='p-6'>
      <div className='mb-6'>
        <div className='flex flex-col sm:flex-row gap-4'>
          {/* Search */}
          <div className='flex-1 relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
            <input
              type='text'
              placeholder='Tìm kiếm nhóm theo tên...'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className='w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary'
            />
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className='flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50'
          >
            <Filter className='w-4 h-4' />
            Bộ lọc
          </button>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className='mt-4 p-4 bg-gray-50 rounded-lg'>
            <div className='flex items-center gap-4'>
              <span className='text-sm font-medium text-gray-700'>
                Số thành viên trong nhóm:
              </span>
              <select
                value={memberFilter || ''}
                onChange={e =>
                  setMemberFilter(
                    e.target.value ? Number(e.target.value) : undefined
                  )
                }
                className='px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:border-primary'
              >
                {memberFilterOptions.map(option => (
                  <option
                    key={option.value || 'all'}
                    value={option.value || ''}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      <div className='mb-4'>
        <h2 className='text-lg font-semibold text-gray-900'>
          Danh sách nhóm ({allGroups.length})
        </h2>
        <p className='text-sm text-gray-500'>
          {searchQuery
            ? `Kết quả tìm kiếm cho "${searchQuery}"`
            : 'Tất cả các nhóm có sẵn'}
          {totalPages > 1 && ` - Trang ${currentPage}/${totalPages}`}
        </p>
      </div>

      {/* Groups List */}
      {groups.length === 0 ? (
        <div className='text-center py-12'>
          <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
            <Users className='w-8 h-8 text-gray-400' />
          </div>
          <h3 className='text-lg font-medium text-gray-900 mb-2'>
            Không tìm thấy nhóm
          </h3>
          <p className='text-gray-500'>
            {searchQuery
              ? 'Không có nhóm nào phù hợp với từ khóa tìm kiếm của bạn.'
              : 'Hiện tại chưa có nhóm nào.'}
          </p>
        </div>
      ) : (
        <div className='space-y-4'>
          {groups.map(group => (
            <GroupCard
              key={group.id}
              group={group}
              showActions={true}
              isMyGroup={false}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='flex items-center justify-between mt-8 pt-6 border-t border-gray-200'>
          <div className='flex items-center gap-2'>
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className='flex items-center gap-2 px-3 py-2 text-sm text-gray-500 cursor-pointer hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed'
            >
              <ChevronLeft className='w-4 h-4' />
              Trước
            </button>
            <span className='text-sm text-gray-500'>
              Trang {currentPage} / {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className='flex items-center gap-2 px-3 py-2 text-sm text-gray-500 cursor-pointer hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed'
            >
              Sau
              <ChevronRight className='w-4 h-4' />
            </button>
          </div>

          {/* Page Numbers */}
          <div className='flex items-center gap-1'>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-8 h-8 cursor-pointer rounded-full text-sm font-medium transition-colors ${
                    currentPage === pageNum
                      ? 'bg-primary text-white'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <>
                <span className='text-gray-400'>...</span>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  className='w-8 h-8 cursor-pointer rounded-full text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default GroupsListTab;
