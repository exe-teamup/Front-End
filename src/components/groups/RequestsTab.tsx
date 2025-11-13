import { useState, useMemo } from 'react';
import { Clock, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { useQueries, useQueryClient } from '@tanstack/react-query';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useGetJoinRequestsByStudent } from '@/hooks/api/useJoinRequestsApi';
import { useDeleteJoinRequest } from '@/hooks/api/useJoinRequestsApi';
import { useStudentProfileStore } from '@/store/studentProfile';
import { ApiClient } from '@/lib/axios';
import { serviceConfig } from '@/config/serviceConfig';
import type { JoinRequestResponse } from '@/types/joinRequest';
import type { Group } from '@/types/group';

interface RequestWithGroup {
  request: JoinRequestResponse;
  group: Group | undefined;
  isLoading: boolean;
}

function RequestsTab() {
  const { profile } = useStudentProfileStore();
  const queryClient = useQueryClient();
  const [showCancelDialog, setShowCancelDialog] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { data: requests, isLoading: isLoadingRequests } =
    useGetJoinRequestsByStudent(profile?.userId ? String(profile.userId) : '');

  const requestsArray = useMemo(() => {
    if (!requests) return [];
    if (Array.isArray(requests)) {
      return requests as JoinRequestResponse[];
    }
    if (requests && typeof requests === 'object' && 'data' in requests) {
      return Array.isArray((requests as { data: unknown }).data)
        ? ((requests as { data: unknown[] }).data as JoinRequestResponse[])
        : [];
    }
    return [];
  }, [requests]);

  const pendingRequests = useMemo(() => {
    if (!Array.isArray(requestsArray) || requestsArray.length === 0) {
      return [];
    }

    const filtered = requestsArray.filter((req: JoinRequestResponse) => {
      const isPending = req.requestStatus === 'PENDING';
      const isStudentRequest = req.requestType === 'STUDENT_REQUEST';
      return isPending && isStudentRequest;
    });

    return filtered;
  }, [requestsArray]);

  const groupQueries = useMemo(() => {
    return pendingRequests.map((request: JoinRequestResponse) => ({
      queryKey: [
        'group',
        String(request.groupId),
        'request',
        request.id,
      ] as const,
      queryFn: async () => {
        const response = await ApiClient.get<Group>(
          serviceConfig.ENDPOINTS.GROUP_BY_ID(String(request.groupId))
        );
        return response.data;
      },
      enabled: !!request.groupId,
      staleTime: 5 * 60 * 1000,
    }));
  }, [pendingRequests]);

  const groupDataQueries = useQueries({
    queries: groupQueries,
  });

  const requestsWithGroupData: RequestWithGroup[] = useMemo(() => {
    return pendingRequests.map((request, index: number) => ({
      request,
      group: groupDataQueries[index]?.data,
      isLoading: groupDataQueries[index]?.isLoading ?? false,
    }));
  }, [pendingRequests, groupDataQueries]);

  const { mutateAsync: deleteRequest, isPending: isDeleting } =
    useDeleteJoinRequest();

  const totalPages = Math.ceil(requestsWithGroupData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedRequests = requestsWithGroupData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleCancelRequest = (requestId: number) => {
    setShowCancelDialog(requestId);
  };

  const confirmCancelRequest = async () => {
    if (!showCancelDialog) return;

    try {
      await deleteRequest(String(showCancelDialog));

      if (profile?.userId) {
        queryClient.invalidateQueries({
          queryKey: ['join-requests-by-student', String(profile.userId)],
        });
      }

      toast.success('Đã hủy yêu cầu tham gia nhóm');
      setShowCancelDialog(null);
    } catch {
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  if (isLoadingRequests) {
    return (
      <div className='p-8 text-center'>
        <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
          <Clock className='w-8 h-8 text-gray-400 animate-pulse' />
        </div>
        <h3 className='text-lg font-medium text-gray-900 mb-2'>Đang tải...</h3>
        <p className='text-gray-500'>Đang tải danh sách yêu cầu.</p>
      </div>
    );
  }

  if (pendingRequests.length === 0) {
    return (
      <div className='p-8 text-center'>
        <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
          <Clock className='w-8 h-8 text-gray-400' />
        </div>
        <h3 className='text-lg font-medium text-gray-900 mb-2'>
          Không có yêu cầu
        </h3>
        <p className='text-gray-500'>Bạn chưa gửi yêu cầu tham gia nhóm nào.</p>
      </div>
    );
  }

  return (
    <div className='p-6'>
      <div className='mb-4'>
        <h2 className='text-lg font-semibold text-gray-900'>
          Yêu cầu tham gia ({requestsWithGroupData.length})
        </h2>
        <p className='text-sm text-gray-500'>
          Các nhóm bạn đã gửi yêu cầu tham gia
          {totalPages > 1 && ` - Trang ${currentPage}/${totalPages}`}
        </p>
      </div>

      <div className='space-y-4'>
        {displayedRequests.map(({ request, group, isLoading }) => (
          <div
            key={request.id}
            className='flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50'
          >
            <div className='flex items-center gap-4 flex-1'>
              <img
                src='/images/logo.svg'
                alt={group?.groupName || 'Group'}
                className='w-6 h-6 md:w-12 md:h-12 rounded-lg object-cover'
              />
              <div className='flex-1'>
                {isLoading ? (
                  <div className='space-y-2'>
                    <div className='h-4 bg-gray-200 rounded w-32 animate-pulse'></div>
                    <div className='h-3 bg-gray-200 rounded w-48 animate-pulse'></div>
                  </div>
                ) : group ? (
                  <>
                    <h3 className='font-medium text-gray-900'>
                      {group.groupName}
                    </h3>
                    <p className='text-sm text-black'>
                      Trưởng nhóm: {group.leader.studentName}
                    </p>
                    <div className='flex flex-col md:flex-row items-start md:items-center md:gap-4 mt-1'>
                      <span className='text-sm text-black'>
                        {group.memberCount}/
                        {group.templates?.maxMember || '---'} thành viên
                      </span>
                      <span className='text-sm text-black'>
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
                    Không thể tải thông tin nhóm
                  </div>
                )}
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <button
                type='button'
                onClick={() => handleCancelRequest(request.id)}
                disabled={isDeleting}
                className='flex items-center gap-2 cursor-pointer px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <X className='w-4 h-4' />
                Hủy yêu cầu
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
        open={!!showCancelDialog}
        onOpenChange={() => setShowCancelDialog(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hủy yêu cầu tham gia?</AlertDialogTitle>
          </AlertDialogHeader>
          <div className='py-4'>
            <p className='text-sm text-gray-600'>
              Bạn có chắc chắn muốn hủy yêu cầu tham gia nhóm này? Hành động này
              không thể hoàn tác.
            </p>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Không</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmCancelRequest}
              className='bg-red-600 hover:bg-red-700'
              disabled={isDeleting}
            >
              {isDeleting ? 'Đang xử lý...' : 'Hủy yêu cầu'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default RequestsTab;
