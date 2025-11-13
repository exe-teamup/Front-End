import { useState, useMemo } from 'react';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  X,
  User,
} from 'lucide-react';
import { toast } from 'sonner';
import { useQueries } from '@tanstack/react-query';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useGetAllJoinRequests } from '@/hooks/api/useJoinRequestsApi';
import { useHandleJoinRequest } from '@/hooks/api/useJoinRequestsApi';
import { useStudentProfileStore } from '@/store/studentProfile';
import { ApiClient } from '@/lib/axios';
import type { JoinRequestResponse } from '@/types/joinRequest';
import type { UserPublicProfile } from '@/types/user';

interface RequestWithUser {
  request: JoinRequestResponse;
  user: UserPublicProfile | undefined;
  isLoading: boolean;
}

function IncomingRequestsTab() {
  const { profile } = useStudentProfileStore();
  const [showApproveDialog, setShowApproveDialog] = useState<number | null>(
    null
  );
  const [showRejectDialog, setShowRejectDialog] = useState<number | null>(null);
  const [denyReason, setDenyReason] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { data: allRequests = [], isLoading: isLoadingRequests } =
    useGetAllJoinRequests();

  const requestsArray = useMemo(() => {
    if (!allRequests) return [];
    if (Array.isArray(allRequests)) {
      return allRequests as JoinRequestResponse[];
    }
    return [];
  }, [allRequests]);

  const incomingRequests = useMemo(() => {
    if (!profile?.groupId) return [];

    return requestsArray.filter(
      (req: JoinRequestResponse) =>
        req.groupId === Number(profile.groupId) &&
        req.requestStatus === 'PENDING' &&
        req.requestType === 'STUDENT_REQUEST'
    );
  }, [requestsArray, profile?.groupId]);

  const userQueries = useMemo(() => {
    return incomingRequests.map((request: JoinRequestResponse) => ({
      queryKey: [
        'user',
        String(request.studentId),
        'request',
        request.id,
      ] as const,
      queryFn: async () => {
        // Use /api/users/{id} endpoint
        const response = await ApiClient.get<UserPublicProfile>(
          `/users/${request.studentId}`
        );
        return response.data;
      },
      enabled: !!request.studentId,
      staleTime: 5 * 60 * 1000,
    }));
  }, [incomingRequests]);

  const userDataQueries = useQueries({
    queries: userQueries,
  });

  const requestsWithUserData: RequestWithUser[] = useMemo(() => {
    return incomingRequests.map((request, index: number) => ({
      request,
      user: userDataQueries[index]?.data as UserPublicProfile | undefined,
      isLoading: userDataQueries[index]?.isLoading ?? false,
    }));
  }, [incomingRequests, userDataQueries]);

  const { mutateAsync: handleRequest, isPending: isHandling } =
    useHandleJoinRequest();

  const totalPages = Math.ceil(requestsWithUserData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedRequests = requestsWithUserData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleApproveRequest = (requestId: number) => {
    setShowApproveDialog(requestId);
  };

  const handleRejectRequest = (requestId: number) => {
    setShowRejectDialog(requestId);
    setDenyReason('');
  };

  const confirmApproveRequest = async () => {
    if (!showApproveDialog) return;

    try {
      await handleRequest({
        id: String(showApproveDialog),
        requestStatus: 'APPROVED',
      });

      toast.success('Đã chấp nhận yêu cầu tham gia nhóm');
      setShowApproveDialog(null);
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  const confirmRejectRequest = async () => {
    if (!showRejectDialog) return;

    if (!denyReason.trim()) {
      toast.error('Vui lòng nhập lý do từ chối');
      return;
    }

    try {
      await handleRequest({
        id: String(showRejectDialog),
        requestStatus: 'DENIED',
        denyReason: denyReason.trim(),
      });

      toast.success('Đã từ chối yêu cầu tham gia nhóm');
      setShowRejectDialog(null);
      setDenyReason('');
    } catch {
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  // Loading state
  if (isLoadingRequests) {
    return (
      <div className='p-8 text-center'>
        <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
          <UserPlus className='w-8 h-8 text-gray-400 animate-pulse' />
        </div>
        <h3 className='text-lg font-medium text-gray-900 mb-2'>Đang tải...</h3>
        <p className='text-gray-500'>Đang tải danh sách yêu cầu.</p>
      </div>
    );
  }

  if (incomingRequests.length === 0) {
    return (
      <div className='p-8 text-center'>
        <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
          <UserPlus className='w-8 h-8 text-gray-400' />
        </div>
        <h3 className='text-lg font-medium text-gray-900 mb-2'>
          Không có yêu cầu
        </h3>
        <p className='text-gray-500'>
          Chưa có yêu cầu tham gia nhóm nào từ sinh viên khác.
        </p>
      </div>
    );
  }

  return (
    <div className='p-6'>
      <div className='mb-4'>
        <h2 className='text-lg font-semibold text-gray-900'>
          Yêu cầu vào nhóm ({incomingRequests.length})
        </h2>
        <p className='text-sm text-gray-500'>
          Các sinh viên muốn tham gia nhóm của bạn
          {totalPages > 1 && ` - Trang ${currentPage}/${totalPages}`}
        </p>
      </div>

      <div className='space-y-4'>
        {displayedRequests.map(({ request, user, isLoading }) => (
          <div
            key={request.id}
            className='flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50'
          >
            <div className='flex items-center gap-4 flex-1'>
              {/* Avatar */}
              <div className='w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-lg font-semibold overflow-hidden'>
                {isLoading ? (
                  <User className='w-6 h-6' />
                ) : user ? (
                  user.fullName.charAt(0).toUpperCase()
                ) : (
                  <User className='w-6 h-6' />
                )}
              </div>
              <div className='flex-1'>
                {isLoading ? (
                  <div className='space-y-2'>
                    <div className='h-4 bg-gray-200 rounded w-32 animate-pulse'></div>
                    <div className='h-3 bg-gray-200 rounded w-48 animate-pulse'></div>
                  </div>
                ) : user ? (
                  <>
                    <h3 className='font-medium text-gray-900'>
                      {user.fullName}
                    </h3>
                    <p className='text-sm text-gray-600'>{user.email}</p>
                    <div className='flex flex-col md:flex-row items-start md:items-center md:gap-4 mt-1'>
                      <span className='text-sm text-gray-600'>
                        Chuyên ngành: {user.majorName}
                      </span>
                      <span className='text-sm text-gray-500'>
                        Gửi lúc:{' '}
                        {new Date(request.createdAt).toLocaleDateString(
                          'vi-VN',
                          {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                          }
                        )}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className='text-sm text-gray-500'>
                    Không thể tải thông tin người dùng
                  </div>
                )}
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <button
                type='button'
                onClick={() => handleApproveRequest(request.id)}
                disabled={isHandling}
                className='flex items-center gap-2 cursor-pointer px-4 py-2 bg-primary text-white hover:bg-primary/90 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <Check className='w-4 h-4' />
                Xác nhận
              </button>
              <button
                type='button'
                onClick={() => handleRejectRequest(request.id)}
                disabled={isHandling}
                className='flex items-center gap-2 cursor-pointer px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <X className='w-4 h-4' />
                Từ chối
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='flex items-center justify-between mt-8 pt-6 border-t border-gray-200'>
          <div className='flex items-center gap-2'>
            <button
              type='button'
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className='flex items-center gap-2 cursor-pointer px-3 py-2 text-sm text-gray-500 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed'
            >
              <ChevronLeft className='w-4 h-4' />
              Trước
            </button>
            <span className='text-sm text-gray-500'>
              Trang {currentPage} / {totalPages}
            </span>
            <button
              type='button'
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className='flex items-center gap-2 cursor-pointer px-3 py-2 text-sm text-gray-500 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed'
            >
              Sau
              <ChevronRight className='w-4 h-4' />
            </button>
          </div>

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
                  type='button'
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
                  type='button'
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

      <AlertDialog
        open={!!showApproveDialog}
        onOpenChange={() => setShowApproveDialog(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Chấp nhận yêu cầu tham gia?</AlertDialogTitle>
          </AlertDialogHeader>
          <div className='py-4'>
            <p className='text-sm text-gray-600'>
              Bạn có chắc chắn muốn chấp nhận sinh viên này tham gia nhóm? Thành
              viên mới sẽ được thêm vào nhóm ngay lập tức.
            </p>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmApproveRequest}
              className='bg-primary hover:bg-primary/90'
              disabled={isHandling}
            >
              {isHandling ? 'Đang xử lý...' : 'Xác nhận'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={!!showRejectDialog}
        onOpenChange={() => {
          setShowRejectDialog(null);
          setDenyReason('');
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Từ chối yêu cầu tham gia?</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn từ chối yêu cầu tham gia nhóm này? Vui lòng
              nhập lý do từ chối (bắt buộc).
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className='py-4 space-y-4'>
            <div>
              <Label htmlFor='denyReason' className='text-sm font-medium'>
                Lý do từ chối <span className='text-red-500'>*</span>
              </Label>
              <Input
                id='denyReason'
                value={denyReason}
                onChange={e => setDenyReason(e.target.value)}
                placeholder='Nhập lý do từ chối...'
                className='mt-2'
                onKeyDown={e => {
                  if (e.key === 'Enter' && denyReason.trim()) {
                    confirmRejectRequest();
                  }
                }}
              />
            </div>
            <p className='text-xs text-gray-500'>
              Lý do này sẽ được gửi đến sinh viên để họ biết tại sao yêu cầu bị
              từ chối.
            </p>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setDenyReason('');
              }}
            >
              Hủy
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmRejectRequest}
              className='bg-red-600 hover:bg-red-700'
              disabled={isHandling || !denyReason.trim()}
            >
              {isHandling ? 'Đang xử lý...' : 'Từ chối'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default IncomingRequestsTab;
