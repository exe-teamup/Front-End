import { useState } from 'react';
import { Clock, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { getUserGroupStatus, cancelGroupRequest } from '@/mock/groups.mockapi';
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

function RequestsTab() {
  const userStatus = getUserGroupStatus();
  const [showCancelDialog, setShowCancelDialog] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const allRequests = userStatus.pendingRequests;
  const totalPages = Math.ceil(allRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const requests = allRequests.slice(startIndex, startIndex + itemsPerPage);

  const handleCancelRequest = (requestId: string) => {
    setShowCancelDialog(requestId);
  };

  const confirmCancelRequest = () => {
    if (showCancelDialog) {
      const success = cancelGroupRequest(showCancelDialog);
      if (success) {
        toast.success('Đã hủy yêu cầu tham gia nhóm');
        // In a real app, this would call an API and refresh the list
      } else {
        toast.error('Có lỗi xảy ra, vui lòng thử lại');
      }
      setShowCancelDialog(null);
    }
  };

  if (allRequests.length === 0) {
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
          Yêu cầu tham gia ({allRequests.length})
        </h2>
        <p className='text-sm text-gray-500'>
          Các nhóm bạn đã gửi yêu cầu tham gia
          {totalPages > 1 && ` - Trang ${currentPage}/${totalPages}`}
        </p>
      </div>

      <div className='space-y-4'>
        {requests.map(request => (
          <div
            key={request.id}
            className='flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50'
          >
            <div className='flex items-center gap-4'>
              <img
                src={request.groupAvatar || '/images/logo.svg'}
                alt={request.groupName}
                className='w-6 h-6 md:w-12 md:h-12 rounded-lg object-cover'
              />
              <div className=''>
                <h3 className='font-medium text-gray-900'>
                  {request.groupName}
                </h3>
                <p className='text-sm text-black'>
                  Trưởng nhóm: {request.groupLeader}
                </p>
                <div className='flex flex-col md:flex-row items-start md:items-center md:gap-4 mt-1'>
                  <span className='text-sm text-black'>
                    {request.memberCount}/{request.maxMembers} thành viên
                  </span>
                  <span className='text-sm text-black'>
                    Gửi lúc:{' '}
                    {new Date(request.requestedAt).toLocaleDateString('vi-VN')}
                  </span>
                </div>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <button
                onClick={() => handleCancelRequest(request.id)}
                className='flex items-center gap-2 cursor-pointer px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors'
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
            >
              Hủy yêu cầu
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default RequestsTab;
