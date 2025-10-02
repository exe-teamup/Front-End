import { Outlet } from 'react-router-dom';
import { AuthButton } from '../components/AuthButton';

export function MainLayout() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <header className='bg-white shadow-sm border-b h-16'>
        <div className='px-4 h-full flex items-center justify-between'>
          <div>Header sẽ có logo, nav...</div>
          <AuthButton />
        </div>
      </header>

      {/* Main Content */}
      <main className='flex-1'>
        <Outlet />
      </main>

      {/* Footer - placeholder */}
      <footer className='bg-white border-t py-4'>
        <div className='px-4 text-center text-text-subtitle text-sm'>
          Footer sẽ có thông tin liên hệ...
        </div>
      </footer>
    </div>
  );
}
