import { Link } from 'react-router-dom';
import { getUserGroupStatus } from '@/mock/groups.mockapi';
import GroupCard from './GroupCard';

function MyGroupsTab() {
  const userStatus = getUserGroupStatus();

  if (!userStatus.hasGroup || !userStatus.currentGroup) {
    return (
      <div className='p-8 text-center'>
        <div className='w-20 md:w-60 h-20 md:h-60 flex items-center justify-center mx-auto mb-4'>
          <img src='/images/not_found.svg' alt='' />
        </div>
        <h3 className='text-lg font-medium text-gray-900 mb-2'>Chưa có nhóm</h3>
        <p className='text-gray-500 mb-6'>
          Bạn chưa tham gia nhóm nào. Hãy tìm kiếm và tham gia nhóm phù hợp với
          bạn.
        </p>
        <Link
          to='/groups'
          className='inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90'
        >
          Tìm nhóm
        </Link>
      </div>
    );
  }

  return (
    <div className='p-6'>
      <div className='mb-4'>
        <h2 className='text-lg font-semibold text-gray-900'>Nhóm của bạn</h2>
        <p className='text-sm text-gray-500'>Nhóm bạn đang tham gia</p>
      </div>

      <GroupCard
        group={userStatus.currentGroup}
        showActions={true}
        isMyGroup={true}
      />
    </div>
  );
}

export default MyGroupsTab;
