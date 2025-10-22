import { Button } from '@/components/Button/Button';
import { CreateGroupModal } from '@/components/modals/CreateGroupModal';
import { Plus } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GroupsListTab from '../components/groups/GroupsListTab';
import MyGroupsTab from '../components/groups/MyGroupsTab';
import RequestsTab from '../components/groups/RequestsTab';
import { useGroups } from '../hooks/useGroups';

type TabType = 'my-groups' | 'all-groups' | 'requests';

export function Groups() {
  const location = useLocation();
  const navigate = useNavigate();
  const [openCreateGroup, setOpenCreateGroup] = useState(false);

  const { isLoading, myGroup, hasGroup, allGroups, pendingRequestsCount } =
    useGroups();

  const getActiveTabFromPath = useCallback((): TabType => {
    const path = location.pathname;
    if (path === '/groups/my') return 'my-groups';
    if (path === '/groups/request') return 'requests';
    return 'all-groups';
  }, [location.pathname]);

  const [activeTab, setActiveTab] = useState<TabType>(getActiveTabFromPath());

  useEffect(() => {
    setActiveTab(getActiveTabFromPath());
  }, [getActiveTabFromPath]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    switch (tab) {
      case 'my-groups':
        navigate('/groups/my');
        break;
      case 'requests':
        navigate('/groups/request');
        break;
      case 'all-groups':
      default:
        navigate('/groups');
        break;
    }
  };

  const tabs = [
    {
      id: 'my-groups' as TabType,
      label: 'Nhóm của bạn',
      count: undefined,
    },
    {
      id: 'all-groups' as TabType,
      label: 'Danh sách nhóm',
      count: allGroups.length,
    },
    {
      id: 'requests' as TabType,
      label: 'Yêu cầu tham gia',
      count: pendingRequestsCount,
    },
  ];
  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary'></div>
      </div>
    );
  }
  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>Nhóm</h1>
          <p className='text-gray-600'>
            Quản lý nhóm và tìm kiếm cơ hội hợp tác
          </p>
        </div>

        {/* Tabs and Create Button */}
        <div className='flex items-center justify-between mb-6'>
          <div className='flex space-x-8 border-b border-gray-200'>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`relative pb-4 px-1 text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
                {tab.count !== undefined && (
                  <span className='ml-2 bg-primary text-white text-xs rounded-full px-2 py-1'>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {!hasGroup && (
            <Button
              variant='primary'
              onClick={() => setOpenCreateGroup(true)}
              className='flex items-center gap-2 text-white'
            >
              <Plus className='w-4 h-4' />
              Tạo nhóm
            </Button>
          )}
        </div>

        <div className='bg-white rounded-lg shadow-sm'>
          {activeTab === 'my-groups' && <MyGroupsTab currentGroup={myGroup} />}
          {activeTab === 'all-groups' && <GroupsListTab groups={allGroups} />}
          {activeTab === 'requests' && <RequestsTab />}
        </div>
      </div>

      <CreateGroupModal
        open={openCreateGroup}
        onOpenChange={setOpenCreateGroup}
      />
    </div>
  );
}
