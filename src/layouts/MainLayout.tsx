import { Outlet } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';

export function MainLayout() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <Header />

      {/* Main Content */}
      <main className='flex-1'>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
