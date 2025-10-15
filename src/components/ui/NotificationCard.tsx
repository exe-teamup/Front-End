import type { FC, ComponentType, SVGProps } from 'react';
import { IconBell, IconUser } from '../Icon/icons';

type NotificationType = 'applied' | 'accepted' | 'left';

export interface Notification {
  id: string | number;
  type: NotificationType;
  title: string;
  message?: string;
  time?: string;
}

const typeMeta: Record<
  NotificationType,
  { bg: string; text: string; icon: ComponentType<SVGProps<SVGSVGElement>> }
> = {
  applied: { bg: 'bg-blue-100', text: 'text-blue-800', icon: IconBell },
  // If there's no IconCheck exported in your icons file, reuse IconUser (or replace with the correct export)
  accepted: { bg: 'bg-green-100', text: 'text-green-800', icon: IconUser },
  left: { bg: 'bg-gray-100', text: 'text-gray-800', icon: IconUser },
};

export const NotificationCard: FC<{ item: Notification }> = ({ item }) => {
  const meta = typeMeta[item.type];
  const Icon = meta.icon;
  return (
    <div
      className='rounded-md p-3 mb-3 shadow-sm'
      role='article'
      aria-labelledby={`notif-${item.id}`}
    >
      <div className={`flex items-start gap-3 ${meta.bg} p-3 rounded-md`}>
        <div className={`p-2 rounded-full ${meta.text} bg-white/80 flex-none`}>
          <Icon className='w-5 h-5' />
        </div>
        <div className='flex-1'>
          <div
            id={`notif-${item.id}`}
            className='font-medium text-sm text-text-title'
          >
            {item.title}
          </div>
          {item.message && (
            <div className='text-xs text-gray-600 mt-1'>{item.message}</div>
          )}
          {item.time && (
            <div className='text-[11px] text-gray-400 mt-2'>{item.time}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export const NotificationList: FC<{ items: Notification[] }> = ({ items }) => {
  if (!items || items.length === 0) {
    return <div className='p-4 text-sm text-gray-500'>Không có thông báo</div>;
  }
  return (
    <div className='p-4 rounded border border-dashed border-purple-300 bg-white/5'>
      {items.map(it => (
        <NotificationCard key={it.id} item={it} />
      ))}
    </div>
  );
};

export default NotificationList;
