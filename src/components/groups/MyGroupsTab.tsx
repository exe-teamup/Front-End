import { Link } from 'react-router-dom';
import { getUserGroupStatus } from '@/mock/groups.mockapi';
import GroupCard from './GroupCard';
import RequestMentorModal from '@/components/modals/RequestMentorModal';
import { useState } from 'react';

function MyGroupsTab() {
  const [openMentor, setOpenMentor] = useState(false);
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
        <div className='flex items-center justify-between'>
          <p className='text-sm text-gray-500'>Nhóm bạn đang tham gia</p>
          {userStatus.currentGroup && (
            <button
              className='px-3 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 cursor-pointer'
              onClick={() => setOpenMentor(true)}
            >
              Yêu cầu mentor
            </button>
          )}
        </div>
      </div>

      <GroupCard
        group={userStatus.currentGroup}
        showActions={true}
        isMyGroup={true}
      />

      {/* Members detail list */}
      {userStatus.currentGroup && (
        <div className='mt-6 bg-white rounded-lg border border-gray-200'>
          <div className='px-6 py-4 border-b'>
            <h3 className='font-medium text-gray-900'>
              Thành viên ({userStatus.currentGroup.memberCount}/
              {userStatus.currentGroup.maxMembers})
            </h3>
          </div>
          <ul className='divide-y'>
            {userStatus.currentGroup.members.map(m => (
              <li key={m.id} className='px-6 py-3 flex items-center gap-3'>
                <img
                  src={m.avatar || '/images/avatar.jpg'}
                  alt={m.name}
                  className='w-8 h-8 rounded-full object-cover'
                />
                <div className='flex-1 min-w-0'>
                  <div className='flex items-center gap-2'>
                    <span className='text-sm font-medium text-gray-900 truncate'>
                      {m.name}
                    </span>
                    {m.role === 'LEADER' && (
                      <span className='text-[11px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700'>
                        Leader
                      </span>
                    )}
                  </div>
                  <p className='text-xs text-gray-500 truncate'>{m.email}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {userStatus.currentGroup && (
        <RequestMentorModal
          open={openMentor}
          onOpenChange={setOpenMentor}
          groupId={userStatus.currentGroup.id}
          courseCode='SE1904'
        />
      )}
    </div>
  );
}

export default MyGroupsTab;
