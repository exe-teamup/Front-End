import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header/Header';

export function MainLayout() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <Header />

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
