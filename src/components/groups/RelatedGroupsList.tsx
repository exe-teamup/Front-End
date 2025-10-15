import React from 'react';
import { Users, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import type { RelatedGroup } from '../../mock/groupDetail.mockapi';

interface RelatedGroupsListProps {
  groups: RelatedGroup[];
  currentGroupMajor: string;
}

function RelatedGroupsList({
  groups,
  currentGroupMajor,
}: RelatedGroupsListProps) {
  const [showCancelDialog, setShowCancelDialog] = React.useState<string | null>(
    null
  );

  const handleJoinGroup = (groupId: string) => {
    setShowCancelDialog(groupId);
  };

  const handleConfirmJoinRequest = () => {
    if (showCancelDialog) {
      // Call API to send join request
      toast.success(
        'Đã gửi yêu cầu tham gia nhóm. Vui long chờ trưởng nhóm phê duyệt.'
      );
      setShowCancelDialog(null);
    }
  };

  const getStatusBadge = (group: RelatedGroup) => {
    if (group.status === 'FULL') {
      return (
        <span className='px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full'>
          Đã đầy
        </span>
      );
    }
    if (group.status === 'CLOSED') {
      return (
        <span className='px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full'>
          Đã đóng
        </span>
      );
    }
    if (group.isRecruiting) {
      return (
        <span className='px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full'>
          Đang tuyển
        </span>
      );
    }
    // chỉ cho demo UI, thực tế có các ENUM khác
    return (
      <span className='px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full'>
        Không tuyển
      </span>
    );
  };

  if (groups.length === 0) {
    return (
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
        <h3 className='text-lg font-semibold text-gray-900 mb-4'>
          Nhóm bạn có thể quan tâm
        </h3>
        <p className='text-black text-sm'>
          Không có nhóm nào cùng chuyên ngành {currentGroupMajor}
        </p>
      </div>
    );
  }

  return (
    <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
      <h3 className='text-lg font-semibold text-gray-900 mb-4'>
        Nhóm bạn có thể quan tâm
      </h3>
      <p className='text-black text-sm mb-4'>
        Các nhóm cùng chuyên ngành {currentGroupMajor}
      </p>

      <div className='space-y-4'>
        {groups.map(group => (
          <div
            key={group.id}
            className='flex items-start gap-3 p-3 border-b border-gray-200 transition-colors'
          >
            <img
              src={group.avatar || '/images/logo.svg'}
              alt={group.name}
              className='w-12 h-12 rounded-lg object-cover flex-shrink-0'
            />

            <div className='flex-1 min-w-0'>
              <Link
                to={`/groups/${group.id}`}
                className='text-lg font-semibold text-gray-900 hover:text-primary transition-colors'
              >
                {group.name}
              </Link>

              <div className='flex items-center gap-2 mt-1 mb-2'>
                <div className='flex items-center gap-1 text-sm text-gray-500'>
                  <Users className='w-3 h-3' />
                  <span>
                    {group.memberCount}/{group.maxMembers}
                  </span>
                </div>
                {getStatusBadge(group)}
              </div>

              {group.status === 'ACTIVE' && group.isRecruiting && (
                <button
                  onClick={() => handleJoinGroup(group.id)}
                  className='flex items-center gap-1 px-3 py-1 text-sm text-primary rounded-2xl cursor-pointer hover:bg-primary hover:text-white transition-colors'
                >
                  <UserPlus className='w-3 h-3' />
                  Tham gia
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <AlertDialog
        open={!!showCancelDialog}
        onOpenChange={() => setShowCancelDialog(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Gửi yêu cầu tham gia?</AlertDialogTitle>
          </AlertDialogHeader>
          <div className='py-4'>
            <p className='text-sm text-gray-900'>
              Bạn có chắc chắn muốn tham gia nhóm này? <br />
              Yêu cầu sẽ được gửi đi và chờ trưởng nhóm phê duyệt.
            </p>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Không</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmJoinRequest}
              className='bg-primary hover:bg-primary/80 text-white'
            >
              Gửi yêu cầu
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default RelatedGroupsList;
