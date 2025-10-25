import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar';

interface NavUserProps {
  user: {
    email: string;
    displayName?: string;
    photoURL?: string;
  };
  onLogout: () => void;
}

export function NavUser({ user, onLogout }: NavUserProps) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className='flex items-center gap-3 p-2'>
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName || user.email}
              className='h-8 w-8 rounded-full'
            />
          ) : (
            <div className='h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm'>
              {user.email.charAt(0).toUpperCase()}
            </div>
          )}
          <div className='flex-1 min-w-0'>
            <p className='text-sm font-medium text-text-title truncate'>
              {user.displayName || user.email.split('@')[0]}
            </p>
            <p className='text-xs text-text-subtitle truncate'>{user.email}</p>
          </div>
        </div>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton
          onClick={onLogout}
          className='text-error hover:bg-red-50 cursor-pointer'
        >
          Đăng xuất
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
