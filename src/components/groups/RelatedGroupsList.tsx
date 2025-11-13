import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { UserPlus, Users } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';
import { ApiClient } from '@/lib/axios';
import { useGetUserById } from '@/hooks/api/useUsersApi';
import { useJoinRequest } from '@/hooks/usePostsQuery';
import { useStudentProfileStore } from '@/store/studentProfile';
import type { Group } from '../../types/group';

interface RelatedGroupsListProps {
  leaderId?: string;
  currentGroupMajor?: string;
}

function RelatedGroupsList({
  leaderId,
  currentGroupMajor,
}: RelatedGroupsListProps) {
  const { profile } = useStudentProfileStore();
  const { mutateAsync: sendJoinRequest, isPending } = useJoinRequest();
  const [showCancelDialog, setShowCancelDialog] = React.useState<string | null>(
    null
  );

  // Fetch leader info to get majorId
  const { data: leaderInfo } = useGetUserById(leaderId || '');

  // Fetch related groups by majorId
  const { data: allGroups = [], isLoading } = useQuery<Group[]>({
    queryKey: ['groups', 'related', leaderInfo?.majorId],
    queryFn: async () => {
      if (!leaderInfo?.majorId) return [];

      const response = await ApiClient.get<Group[]>('/groups', {
        majorId: leaderInfo.majorId,
      });
      return response.data;
    },
    enabled: !!leaderInfo?.majorId,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  // Filter out current group and limit to 6
  const relatedGroups = React.useMemo(() => {
    if (!allGroups || !Array.isArray(allGroups)) return [];

    // Filter out groups that match current leader (if leaderId is provided)
    const filtered = leaderId
      ? allGroups.filter(
          group => group.leader && String(group.leader.studentId) !== leaderId
        )
      : allGroups;

    // Limit to 6 groups
    return filtered.slice(0, 6);
  }, [allGroups, leaderId]);

  // Check if user already has a group or is a leader (cannot join)
  const hasGroupOrIsLeader = React.useMemo(() => {
    return !!(profile?.groupId || profile?.leader);
  }, [profile?.groupId, profile?.leader]);

  const handleJoinGroup = (groupId: string) => {
    setShowCancelDialog(groupId);
  };

  const handleConfirmJoinRequest = async () => {
    if (!showCancelDialog || !profile?.userId) {
      toast.error('Vui lòng đăng nhập để tham gia nhóm');
      return;
    }

    try {
      await sendJoinRequest({
        studentId: Number(profile.userId),
        groupId: Number(showCancelDialog),
        requestType: 'STUDENT_REQUEST',
      });

      toast.success(
        'Đã gửi yêu cầu tham gia nhóm. Vui lòng chờ trưởng nhóm phê duyệt.'
      );
      setShowCancelDialog(null);
    } catch (error) {
      const message =
        (
          error as {
            response?: { data?: { message?: string } };
            message?: string;
          }
        )?.response?.data?.message ||
        (error as { message?: string })?.message ||
        'Không thể gửi yêu cầu. Vui lòng thử lại.';
      toast.error(message);
    }
  };

  const getStatusBadge = (group: Group) => {
    if (
      group.groupStatus === 'ACTIVE' &&
      group.memberCount >= (group.templates?.maxMember || 6)
    ) {
      return (
        <span className='px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full'>
          Đã đầy
        </span>
      );
    }
    if (group.groupStatus === 'INACTIVE') {
      return (
        <span className='px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full'>
          Đã đóng
        </span>
      );
    }
    if (
      group.groupStatus === 'ACTIVE' &&
      group.memberCount < (group.templates?.maxMember || 6)
    ) {
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

  if (isLoading) {
    return (
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
        <h3 className='text-lg font-semibold text-gray-900 mb-4'>
          Nhóm bạn có thể quan tâm
        </h3>
        <div className='space-y-4'>
          {[1, 2, 3].map(i => (
            <div key={i} className='animate-pulse'>
              <div className='h-4 bg-gray-200 rounded w-3/4 mb-2'></div>
              <div className='h-3 bg-gray-200 rounded w-1/2'></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (relatedGroups.length === 0) {
    return (
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
        <h3 className='text-lg font-semibold text-gray-900 mb-4'>
          Nhóm bạn có thể quan tâm
        </h3>
        <p className='text-black text-sm'>
          {currentGroupMajor
            ? `Không có nhóm nào cùng chuyên ngành ${currentGroupMajor}`
            : 'Không có nhóm nào để hiển thị'}
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
        {relatedGroups.map(group => (
          <div
            key={group.groupId}
            className='flex items-start gap-3 p-3 border-b border-gray-200 transition-colors'
          >
            <img
              src={'/images/logo.svg'}
              alt={group.groupName}
              className='w-12 h-12 rounded-lg object-cover flex-shrink-0'
            />

            <div className='flex-1 min-w-0'>
              <Link
                to={`/groups/${group.groupId}`}
                className='text-lg font-semibold text-gray-900 hover:text-primary transition-colors'
              >
                {group.groupName}
              </Link>

              <div className='flex items-center gap-2 mt-1 mb-2'>
                <div className='flex items-center gap-1 text-sm text-gray-500'>
                  <Users className='w-3 h-3' />
                  <span>
                    {group.memberCount}/{group.templates?.maxMember || '---'}{' '}
                    thành viên
                  </span>
                </div>
                {getStatusBadge(group)}
              </div>

              {group.groupStatus === 'ACTIVE' &&
                group.memberCount < (group.templates?.maxMember || 6) && (
                  <button
                    onClick={() => handleJoinGroup(group.groupId)}
                    disabled={hasGroupOrIsLeader || isPending}
                    className='flex items-center gap-1 px-3 py-1 text-sm text-primary rounded-2xl cursor-pointer hover:bg-primary hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    <UserPlus className='w-3 h-3' />
                    {isPending
                      ? 'Đang gửi...'
                      : hasGroupOrIsLeader
                        ? 'Bạn đã có nhóm'
                        : 'Tham gia'}
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
              disabled={isPending}
            >
              {isPending ? 'Đang gửi...' : 'Gửi yêu cầu'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default RelatedGroupsList;
