import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MoreHorizontal, Copy, Eye, Users, User } from 'lucide-react';
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
import type { Group } from '@/mock/groups.mockapi';
import { Button } from '../Button';

interface GroupCardProps {
  group: Group;
  showActions?: boolean;
  isMyGroup?: boolean;
}

function GroupCard({
  group,
  showActions = false,
  isMyGroup: _isMyGroup = false,
}: GroupCardProps) {
  const [showActionsMenu, setShowActionsMenu] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState<string | null>(null);

  const handleCopyLink = () => {
    const groupUrl = `${window.location.origin}/groups/${group.id}`;
    navigator.clipboard.writeText(groupUrl);
    toast.success('Đã sao chép đường dẫn nhóm');
    setShowActionsMenu(false);
  };

  const handleViewDetails = () => {
    // Navigate to group details page
    window.location.href = `/groups/${group.id}`;
    setShowActionsMenu(false);
  };

  const handleJoinRequest = (groupId: string) => {
    setShowCancelDialog(groupId);
  };

  const confirmCancelRequest = () => {
    if (showCancelDialog) {
      // Call API to cancel request
      toast.success(
        'Đã gửi yêu cầu tham gia nhóm. Vui long chờ trưởng nhóm phê duyệt.'
      );
      setShowCancelDialog(null);
    }
  };

  const getStatusBadge = () => {
    switch (group.status) {
      case 'ACTIVE':
        return (
          <span className='px-2 py-1 bg-primary-green/30 text-black text-xs rounded-full hidden md:inline-block'>
            Đang tuyển
          </span>
        );
      case 'FULL':
        return (
          <span className='px-2 py-1 bg-primary/80 text-white text-xs rounded-full hidden md:inline-block'>
            Đủ thành viên
          </span>
        );
      case 'CLOSED':
        return (
          <span className='px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full hidden md:inline-block'>
            Đã đóng
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className='relative p-6 border-b-1 border-gray-200 transition-shadow'>
      <div className='flex items-start justify-between'>
        <div className='flex items-start gap-4 flex-1'>
          <img
            src={group.avatar || '/images/logo.svg'}
            alt={group.name}
            className='w-8 h-8 md:w-14 md:h-14 rounded-lg object-cover'
          />

          <div className='flex-1'>
            <div className='flex items-center gap-3 mb-2'>
              <Link
                to={`/groups/${group.id}`}
                className='text-lg font-semibold text-gray-900 hover:text-primary transition-colors'
              >
                {group.name}
              </Link>
              {getStatusBadge()}
            </div>

            <div className='flex items-start md:items-center flex-col md:flex-row md:gap-6 text-sm text-gray-500'>
              <div className='flex items-center gap-1'>
                <Users className='w-4 h-4' />
                <span>
                  {group.memberCount}/{group.maxMembers} thành viên
                </span>
              </div>
              <div className='flex items-center gap-1'>
                <User className='w-4 h-4' />
                <span>Trưởng nhóm: {group.leaderName}</span>
              </div>
            </div>
          </div>
        </div>

        {/* join button */}
        {!_isMyGroup && group.status === 'ACTIVE' && (
          <div className='ml-4'>
            <Button
              variant='primary'
              size='md'
              className='text-white mr-2 hidden md:block'
              onClick={() => {
                handleJoinRequest(group.id);
              }}
            >
              Tham gia nhóm
            </Button>
          </div>
        )}
        {/* Actions Menu */}
        {showActions && (
          <div className='relative'>
            <button
              onClick={() => setShowActionsMenu(!showActionsMenu)}
              className='p-2 cursor-pointer hover:bg-gray-100 hover:text-primary rounded-lg transition-colors'
            >
              <MoreHorizontal className='w-5 h-5' />
            </button>

            {showActionsMenu && (
              <>
                {/* Backdrop */}
                <div
                  className='fixed inset-0 z-10'
                  role='button'
                  tabIndex={0}
                  aria-label='Đóng menu hành động'
                  onClick={() => setShowActionsMenu(false)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setShowActionsMenu(false);
                    }
                  }}
                />

                {/* Menu */}
                <div className='absolute right-0 top-full mt-1 w-60 bg-white border border-gray-200 rounded-lg shadow-lg z-20'>
                  <div className='py-1'>
                    <button
                      onClick={handleCopyLink}
                      className='flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary cursor-pointer'
                    >
                      <Copy className='w-4 h-4' />
                      Sao chép đường dẫn
                    </button>
                    <button
                      onClick={handleViewDetails}
                      className='flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary cursor-pointer'
                    >
                      <Eye className='w-4 h-4' />
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
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
              onClick={confirmCancelRequest}
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

export default GroupCard;
