import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
import { AppSidebar } from '../components/sidebar/AppSidebar';
import { SidebarProvider, SidebarTrigger } from '../components/ui/sidebar';
import { ROUTES } from '../constants/routes';
import { toast } from 'sonner';

interface DashboardLayoutProps {
  userRole: 'ADMIN' | 'MODERATOR';
  user: {
    email: string;
    displayName?: string;
    photoURL?: string;
  };
}

export function DashboardLayout({ userRole, user }: DashboardLayoutProps) {
  const { signOut } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate(ROUTES.AUTH.ROOT);
    toast.success('Đăng xuất thành công');
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className='flex min-h-screen w-full'>
        <AppSidebar userRole={userRole} user={user} onLogout={handleLogout} />

        <div className='flex-1 flex flex-col'>
          <header className='flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4'>
            <SidebarTrigger className='-ml-1' />
            <div className='h-4 w-px bg-gray-200 mx-2' />
            <div className='flex-1'>
              <h2 className='text-lg font-semibold text-text-title'>
                {userRole === 'ADMIN'
                  ? 'Admin Dashboard'
                  : 'Moderator Dashboard'}
              </h2>
            </div>
          </header>

          {/* Main Content */}
          <main className='flex-1 overflow-auto bg-white p-6'>
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
