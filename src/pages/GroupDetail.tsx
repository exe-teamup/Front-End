import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { GraduationCap, Link, Users } from 'lucide-react';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import RelatedGroupsList from '../components/groups/RelatedGroupsList';
import { getStatusInfo, joinGroup } from '../mock/groupDetail.mockapi';
import { useGroupStore } from '../store/group';
import { useStudentProfileStore } from '../store/studentProfile';
import type { Group } from '../types/group';

export function GroupDetail() {
  const { groupId } = useParams<{ groupId: string }>();
  const [showCancelDialog, setShowCancelDialog] = React.useState<string | null>(
    null
  );
  const navigate = useNavigate();
  const { fetchGroupById, currentGroup } = useGroupStore();
  const { profile } = useStudentProfileStore();

  useEffect(() => {
    if (groupId) {
      fetchGroupById(groupId);
    }
  }, [groupId, fetchGroupById]);

  const group = currentGroup;

  // TODO: Map from backend response
  const relatedGroups: Group[] = [];

  if (!group) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-gray-900 mb-2'>
            Nhóm không tồn tại
          </h1>
          <p className='text-gray-600'>
            Nhóm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo(group.groupStatus);

  const handleCopyLink = () => {
    const groupUrl = `${window.location.origin}/groups/${group.groupId}`;
    navigator.clipboard.writeText(groupUrl);
    toast.success('Đã sao chép đường dẫn nhóm');
  };

  const handleJoinRequest = () => {
    if (!profile) {
      toast.error('Vui lòng đăng nhập để tham gia nhóm');
      navigate('/login');
      return;
    }
    setShowCancelDialog(group.groupId);
  };

  const handleConfirmJoinRequest = () => {
    if (showCancelDialog) {
      joinGroup(showCancelDialog);
      toast.success(
        'Đã gửi yêu cầu tham gia nhóm. Vui lòng chờ trưởng nhóm phê duyệt.'
      );
      setShowCancelDialog(null);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          <div className='lg:col-span-2 space-y-6'>
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
              <div className='h-48 relative'>
                <img
                  src={'/images/cover/cover-profile1.jpg'}
                  alt='Group banner'
                  className='w-full h-full object-cover'
                />
              </div>

              <div className='p-6 -mt-16 relative'>
                <div className='flex items-start gap-6'>
                  <div className='w-24 h-24 bg-white rounded-full border-4 border-white shadow-md flex items-center justify-center overflow-hidden'>
                    {/* {group.avatar  ? (
                      <img
                        src={group.avatar}
                        alt='Group avatar'
                        className='w-full h-full object-cover'
                      />
                    ) : ( */}
                    <div className='w-full h-full bg-gray-100 flex items-center justify-center'>
                      <Users className='w-8 h-8 text-gray-400' />
                    </div>
                    {/* )} */}
                  </div>

                  {/* Group Details */}
                  <div className='flex-1 pt-16  '>
                    <div className='flex items-center gap-3 mb-2'>
                      <h1 className='text-lg md:text-2xl font-bold text-gray-900'>
                        {group.groupName}
                      </h1>
                      <button
                        onClick={handleCopyLink}
                        className='p-1 hover:bg-gray-100 hover:text-primary cursor-pointer rounded transition-colors'
                        title='Sao chép đường dẫn'
                      >
                        <Link className='w-4 h-4' />
                      </button>
                    </div>

                    {/* Status and Member Count */}
                    <div className='flex items-center gap-4 mb-4 text-xs md:text-sm'>
                      <div className='flex items-center gap-2'>
                        <div className='relative group'>
                          <span
                            className={`px-3 py-1 rounded-full font-medium ${statusInfo.color}`}
                          >
                            {statusInfo.label}
                          </span>
                          <div className='absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10'>
                            {statusInfo.description}
                            <div className='absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900'></div>
                          </div>
                        </div>
                      </div>
                      <div className='flex items-center gap-1 text-black'>
                        <Users className='w-4 h-4' />
                        <span>
                          {group.memberCount}/{group.templates?.maxMember ?? 6}{' '}
                          thành viên
                        </span>
                      </div>
                    </div>

                    {!profile?.groupId && (
                      <button
                        onClick={handleJoinRequest}
                        className='bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 cursor-pointer transition-colors'
                      >
                        Tham gia
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* About */}
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
              <h2 className='text-xl font-semibold text-gray-900 mb-4'>
                Mô tả nhóm
              </h2>
              <p className='text-black text-sm md:text-base leading-relaxed'>
                {group.groupName + ' -- Should be group description'}
              </p>
            </div>

            {/* Admins */}
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
              <h2 className='text-xl font-semibold text-gray-900 mb-4'>
                Quản trị viên
              </h2>

              <div className='space-y-4'>
                {/* Leader */}
                <div className='flex items-start gap-4'>
                  <img
                    src={'/images/avatar.jpg'}
                    alt={group.leader.studentName}
                    className='w-12 h-12 rounded-full object-cover'
                  />
                  <div className='flex-1'>
                    <div className='flex items-center gap-2 mb-1'>
                      <h3 className='font-medium text-gray-900'>
                        {group.leader.studentName}
                      </h3>
                      <span className='px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full'>
                        Trưởng nhóm
                      </span>
                    </div>
                    <p className='text-sm text-gray-600'>
                      {group.leader.studentName + '(should be leader email)'}
                    </p>
                  </div>
                </div>

                {/* Mentor */}
                <div className='flex items-start gap-4'>
                  {/* {group.mentor ? (
                    <>
                      <img
                        src={group.mentor.avatar || '/images/avatar.jpg'}
                        alt={group.mentor.name}
                        className='w-12 h-12 rounded-full object-cover'
                      />
                      <div className='flex-1'>
                        <div className='flex items-center gap-2 mb-1'>
                          <h3 className='font-medium text-gray-900'>
                            {group.mentor.name}
                          </h3>
                          <span className='px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full'>
                            Mentor
                          </span>
                        </div>
                        <p className='text-sm text-gray-600'>
                          {group.mentor.email}
                        </p>
                      </div>
                    </>
                  ) : ( } */}
                  <div className='flex items-center justify-center flex-row gap-4'>
                    <div className='w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center'>
                      <GraduationCap className='w-6 h-6 text-gray-400' />
                    </div>
                    <div className='flex items-center gap-2 mb-1'>
                      <h3 className='font-medium text-gray-500'>
                        Chưa chọn giảng viên
                      </h3>
                    </div>
                  </div>
                  {/* )} */}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className='lg:col-span-1'>
            <RelatedGroupsList groups={relatedGroups} />
          </div>
        </div>
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
