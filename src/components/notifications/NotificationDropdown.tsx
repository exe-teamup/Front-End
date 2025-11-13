import React, { useRef, useEffect } from 'react';
import { Bell, CheckCheck } from 'lucide-react';
import {
  useGetMyNotifications,
  useMarkNotificationAsRead,
  useMarkAllNotificationsAsRead,
} from '@/hooks/api/useNotificationsApi';
import type { AccountNotification } from '@/types/notification';

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationDropdown({
  isOpen,
  onClose,
}: NotificationDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: notifications = [], isLoading } = useGetMyNotifications();
  const { mutateAsync: markAsRead } = useMarkNotificationAsRead();
  const { mutateAsync: markAllAsRead } = useMarkAllNotificationsAsRead();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Ensure notifications is an array
  const notificationsArray: AccountNotification[] = React.useMemo(
    () => (Array.isArray(notifications) ? notifications : []),
    [notifications]
  );

  const sortedNotifications = React.useMemo(() => {
    return [...notificationsArray].sort(
      (a, b) => b.accountNotificationId - a.accountNotificationId
    );
  }, [notificationsArray]);

  const unreadCount = sortedNotifications.filter(n => !n.checked).length;

  const handleMarkAsRead = async (accountNotificationId: number) => {
    try {
      await markAsRead(accountNotificationId);
    } catch {
      // Silent fail
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      // Get all unread notification IDs
      const unreadIds = sortedNotifications
        .filter(n => !n.checked)
        .map(n => n.accountNotificationId);

      if (unreadIds.length > 0) {
        await markAllAsRead(unreadIds);
      }
    } catch {
      // Silent fail
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        role='button'
        tabIndex={-1}
        className='fixed inset-0 z-40'
        onClick={onClose}
        onKeyDown={e => {
          if (e.key === 'Escape') {
            onClose();
          }
        }}
        aria-label='Đóng thông báo'
        aria-hidden='true'
      />

      {/* Dropdown */}
      <div
        ref={dropdownRef}
        className='absolute right-0 top-full mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-[600px] flex flex-col'
      >
        {/* Header */}
        <div className='px-4 py-3 border-b border-gray-200 flex items-center justify-between'>
          <h3 className='text-lg font-semibold text-gray-900'>Thông báo</h3>
          {unreadCount > 0 && (
            <button
              type='button'
              onClick={handleMarkAllAsRead}
              className='text-sm text-primary hover:text-primary/80 flex items-center gap-1'
            >
              <CheckCheck className='w-4 h-4' />
              Đánh dấu tất cả đã đọc
            </button>
          )}
        </div>

        {/* Notifications List */}
        <div className='overflow-y-auto flex-1'>
          {isLoading ? (
            <div className='p-4 text-center text-gray-500'>Đang tải...</div>
          ) : sortedNotifications.length === 0 ? (
            <div className='p-8 text-center'>
              <Bell className='w-12 h-12 text-gray-300 mx-auto mb-3' />
              <p className='text-gray-500'>Không có thông báo nào</p>
            </div>
          ) : (
            <div className='divide-y divide-gray-100'>
              {sortedNotifications.map(notification => (
                <button
                  key={notification.accountNotificationId}
                  type='button'
                  className={`w-full p-4 hover:bg-gray-50 transition-colors cursor-pointer text-left ${
                    !notification.checked ? 'bg-blue-50/50' : ''
                  }`}
                  onClick={() => {
                    if (!notification.checked) {
                      handleMarkAsRead(notification.accountNotificationId);
                    }
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      if (!notification.checked) {
                        handleMarkAsRead(notification.accountNotificationId);
                      }
                    }
                  }}
                  aria-label={notification.formattedContent}
                >
                  <div className='flex items-start gap-3'>
                    <div className='flex-1 min-w-0'>
                      <p className='text-sm text-gray-900'>
                        {notification.formattedContent}
                      </p>
                    </div>
                    {!notification.checked && (
                      <div className='w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1.5' />
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
