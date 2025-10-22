import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { NavDocuments } from './NavDocuments';
import { NavUser } from './NavUser';
import { cn } from '@/lib/utils';
import {
  IconLayoutDashboard,
  IconList,
  IconBarChart,
  IconFolder,
  IconUsers,
  IconDatabase,
  IconClipboardList,
} from '../Icon/icons';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '../ui/sidebar';

interface MenuItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  userRole: 'ADMIN' | 'MODERATOR';
  user: {
    email: string;
    displayName?: string;
    photoURL?: string;
  };
  onLogout: () => void;
}

// Menu data theo role
const menuData: Record<'ADMIN' | 'MODERATOR', MenuItem[]> = {
  ADMIN: [
    {
      title: 'Dashboard',
      url: ROUTES.ADMIN.ROOT,
      icon: IconLayoutDashboard,
    },
    {
      title: 'Kỳ học',
      url: ROUTES.ADMIN.COURSES, // Temporarily using COURSES for semesters
      icon: IconList,
    },
    {
      title: 'Giảng viên',
      url: ROUTES.ADMIN.LECTURERS,
      icon: IconBarChart,
    },
    {
      title: 'Sinh viên',
      url: ROUTES.ADMIN.STUDENTS,
      icon: IconUsers,
    },
    {
      title: 'Moderators',
      url: ROUTES.ADMIN.MODERATOR,
      icon: IconFolder,
    },
  ],
  MODERATOR: [
    {
      title: 'Dashboard',
      url: '/moderator/dashboard',
      icon: IconLayoutDashboard,
    },
    {
      title: 'Nhóm sinh viên',
      url: '/moderator/groups',
      icon: IconUsers,
    },
    {
      title: 'Diễn đàn',
      url: '/moderator/forums',
      icon: IconList,
    },
    {
      title: 'Danh sách sinh viên',
      url: '/moderator/students',
      icon: IconDatabase,
    },
    {
      title: 'Danh sách giảng viên',
      url: '/moderator/lecturers',
      icon: IconClipboardList,
    },
  ],
};

export function AppSidebar({
  userRole,
  user,
  onLogout,
  ...props
}: AppSidebarProps) {
  const menuItems = menuData[userRole] || [];
  const { state } = useSidebar();

  return (
    <Sidebar
      variant='inset'
      collapsible='icon'
      className={cn(
        'transition-all duration-200 ease-linear',
        state === 'collapsed' ? 'w-[3rem]' : 'w-[16rem]'
      )}
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              size='lg'
              className='data-[slot=sidebar-menu-button]:!p-1.5'
            >
              <Link
                to={
                  userRole === 'ADMIN'
                    ? ROUTES.ADMIN.ROOT
                    : '/moderator/dashboard'
                }
              >
                <span className='flex items-end justify-center gap-2'>
                  <img src='/images/logo.svg' alt='logo' className='w-8 h-8' />
                  {state === 'expanded' && (
                    <span className='text-base font-semibold text-primary'>
                      TeamUp
                    </span>
                  )}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavDocuments items={menuItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} onLogout={onLogout} />
      </SidebarFooter>
    </Sidebar>
  );
}
