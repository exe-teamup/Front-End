import { useState } from 'react';
import { Check, ChevronLeft, ChevronRight, UserPlus, X } from 'lucide-react';
import {
  getUserGroupStatus,
  approveJoinRequest,
  rejectJoinRequest,
} from '@/mock/groups.mockapi';
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

function IncomingRequestsTab() {
  const userStatus = getUserGroupStatus();
  const [showApproveDialog, setShowApproveDialog] = useState<string | null>(
    null
  );
  const [showRejectDialog, setShowRejectDialog] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const allRequests = userStatus.incomingRequests;
  const totalPages = Math.ceil(allRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const requests = allRequests.slice(startIndex, startIndex + itemsPerPage);

  const handleApproveRequest = (requestId: string) => {
    setShowApproveDialog(requestId);
  };

  const handleRejectRequest = (requestId: string) => {
    setShowRejectDialog(requestId);
  };

  const confirmApproveRequest = () => {
    if (showApproveDialog) {
      const success = approveJoinRequest(showApproveDialog);
      if (success) {
        toast.success('Đã chấp nhận yêu cầu tham gia nhóm');
        // In a real app, this would call an API and refresh the list
      } else {
        toast.error('Có lỗi xảy ra, vui lòng thử lại');
      }
      setShowApproveDialog(null);
    }
  };

  const confirmRejectRequest = () => {
    if (showRejectDialog) {
      const success = rejectJoinRequest(showRejectDialog);
      if (success) {
        toast.success('Đã từ chối yêu cầu tham gia nhóm');
        // TODO: integrate with backend API to reject request and refresh list
      } else {
        toast.error('Có lỗi xảy ra, vui lòng thử lại');
      }
      setShowRejectDialog(null);
    }
  };

  if (allRequests.length === 0) {
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
          Yêu cầu vào nhóm ({allRequests.length})
        </h2>
        <p className='text-sm text-gray-500'>
          Các sinh viên muốn tham gia nhóm của bạn
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
              {/* Avatar placeholder */}
              <div className='w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-lg font-semibold'>
                {request.studentName.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className='font-medium text-gray-900'>
                  {request.studentName}
                </h3>
                <p className='text-sm text-gray-600'>{request.studentEmail}</p>
                <div className='flex flex-col md:flex-row items-start md:items-center md:gap-4 mt-1'>
                  <span className='text-sm text-gray-600'>
                    Chuyên ngành: {request.majorName}
                  </span>
                  <span className='text-sm text-gray-500'>
                    Gửi lúc:{' '}
                    {new Date(request.requestedAt).toLocaleDateString('vi-VN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <button
                onClick={() => handleApproveRequest(request.id)}
                className='flex items-center gap-2 cursor-pointer px-4 py-2 bg-primary text-white hover:bg-primary/90 rounded-lg transition-colors'
              >
                <Check className='w-4 h-4' />
                Xác nhận
              </button>
              <button
                onClick={() => handleRejectRequest(request.id)}
                className='flex items-center gap-2 cursor-pointer px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors'
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
            >
              Xác nhận
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={!!showRejectDialog}
        onOpenChange={() => setShowRejectDialog(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Từ chối yêu cầu tham gia?</AlertDialogTitle>
          </AlertDialogHeader>
          <div className='py-4'>
            <p className='text-sm text-gray-600'>
              Bạn có chắc chắn muốn từ chối yêu cầu tham gia nhóm này? Hành động
              này không thể hoàn tác.
            </p>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmRejectRequest}
              className='bg-red-600 hover:bg-red-700'
            >
              Từ chối
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default IncomingRequestsTab;
