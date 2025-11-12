import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'sonner';
import { LogOut, Trash2, UserCog } from 'lucide-react';
import type { Group } from '../../types/group';
import GroupCard from './GroupCard';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface MyGroupsTabProps {
  currentGroup?: Group;
  isLoading?: boolean;
  isLeader?: boolean;
}

function MyGroupsTab({
  currentGroup,
  isLoading = false,
  isLeader = false,
}: MyGroupsTabProps) {
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);
  const [showDisbandDialog, setShowDisbandDialog] = useState(false);
  const [showTransferDialog, setShowTransferDialog] = useState(false);
  // Show loading state
  if (isLoading) {
    return (
      <div className='p-8 text-center'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto'></div>
        <p className='text-gray-600 mt-4'>Đang tải thông tin nhóm...</p>
      </div>
    );
  }

  // Show empty state if no group
  if (!currentGroup) {
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

  const { members } = currentGroup;

  const handleLeaveGroup = () => {
    // TODO: Call API to leave group
    toast.success('Đã rời khỏi nhóm');
    setShowLeaveDialog(false);
  };

  const handleDisbandGroup = () => {
    // TODO: Call API to disband group
    toast.success('Đã giải tán nhóm');
    setShowDisbandDialog(false);
  };

  return (
    <>
      <div className='p-6'>
        <div className='mb-4'>
          <h2 className='text-lg font-semibold text-gray-900'>Nhóm của bạn</h2>
          <div className='flex items-center justify-between'>
            <p className='text-sm text-gray-500'>Nhóm bạn đang tham gia</p>
          </div>
        </div>

        <GroupCard group={currentGroup} showActions={true} isMyGroup />

        <div className='mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200'>
          <h3 className='text-sm font-medium text-gray-900 mb-3'>
            Quản lý nhóm
          </h3>
          <div className='flex flex-wrap gap-3'>
            {!isLeader ? (
              <button
                onClick={() => setShowLeaveDialog(true)}
                className='flex items-center gap-2 px-4 py-2 bg-white border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors'
              >
                <LogOut className='w-4 h-4' />
                Rời nhóm
              </button>
            ) : (
              <>
                <button
                  onClick={() => setShowTransferDialog(true)}
                  className='flex items-center gap-2 px-4 py-2 bg-white border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors'
                >
                  <UserCog className='w-4 h-4' />
                  Nhường quyền Leader
                </button>
                <button
                  onClick={() => setShowDisbandDialog(true)}
                  className='flex items-center gap-2 px-4 py-2 bg-white border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors'
                >
                  <Trash2 className='w-4 h-4' />
                  Giải tán nhóm
                </button>
              </>
            )}
          </div>
        </div>

        {/* Members detail list */}
        <div className='mt-6 bg-white rounded-lg border border-gray-200'>
          <div className='px-6 py-4 border-b'>
            <h3 className='font-medium text-gray-900'>
              Thành viên ({currentGroup.memberCount}/
              {currentGroup.templates?.maxMember ?? 6})
            </h3>
          </div>
          <ul className='divide-y'>
            {members.map(m => (
              <li
                key={m.studentId}
                className='px-6 py-3 flex items-center gap-3'
              >
                <img
                  src={'/images/avatar.jpg'}
                  alt={m.studentName}
                  className='w-8 h-8 rounded-full object-cover'
                />
                <div className='flex-1 min-w-0'>
                  <div className='flex items-center gap-2'>
                    <span className='text-sm font-medium text-gray-900 truncate'>
                      {m.studentName}
                    </span>
                    {m.isLeader && (
                      <span className='text-[11px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700'>
                        Leader
                      </span>
                    )}
                  </div>
                  <p className='text-xs text-gray-500 truncate'>
                    {m.studentName}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <AlertDialog open={showLeaveDialog} onOpenChange={setShowLeaveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Rời khỏi nhóm?</AlertDialogTitle>
          </AlertDialogHeader>
          <div className='py-4'>
            <p className='text-sm text-gray-600'>
              Bạn có chắc chắn muốn rời khỏi nhóm này? Bạn sẽ cần được mời lại
              nếu muốn tham gia lại nhóm.
            </p>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLeaveGroup}
              className='bg-red-600 hover:bg-red-700'
            >
              Rời nhóm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showDisbandDialog} onOpenChange={setShowDisbandDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Giải tán nhóm?</AlertDialogTitle>
          </AlertDialogHeader>
          <div className='py-4'>
            <p className='text-sm text-gray-600 mb-2'>
              <strong>Cảnh báo:</strong> Hành động này không thể hoàn tác!
            </p>
            <p className='text-sm text-gray-600'>
              Giải tán nhóm sẽ xóa tất cả thông tin nhóm và tất cả thành viên sẽ
              bị loại khỏi nhóm. Bạn có chắc chắn muốn tiếp tục?
            </p>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDisbandGroup}
              className='bg-red-600 hover:bg-red-700'
            >
              Giải tán nhóm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={showTransferDialog}
        onOpenChange={setShowTransferDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Nhường quyền Leader?</AlertDialogTitle>
          </AlertDialogHeader>
          <div className='py-4'>
            <p className='text-sm text-gray-600 mb-3'>
              Chọn thành viên mà bạn muốn chuyển quyền leader:
            </p>
            <div className='space-y-2 max-h-60 overflow-y-auto'>
              {members
                .filter(m => !m.isLeader)
                .map(member => (
                  <button
                    key={member.studentId}
                    onClick={() => {
                      // TODO: Implement transfer logic
                      toast.info(
                        `Chức năng chuyển quyền cho ${member.studentName} đang được phát triển`
                      );
                      setShowTransferDialog(false);
                    }}
                    className='w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left'
                  >
                    <img
                      src='/images/avatar.jpg'
                      alt={member.studentName}
                      className='w-10 h-10 rounded-full object-cover'
                    />
                    <div className='flex-1'>
                      <div className='text-sm font-medium text-gray-900'>
                        {member.studentName}
                      </div>
                      <div className='text-xs text-gray-500'>
                        {member.majorName}
                      </div>
                    </div>
                  </button>
                ))}
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default MyGroupsTab;
