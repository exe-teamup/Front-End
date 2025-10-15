import { Outlet } from 'react-router-dom';
import { Header } from '../components/common/Header';

export function PostsLayout() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <Header />
      <main className='flex-1'>
        <Outlet />
      </main>
    </div>
  );
}
