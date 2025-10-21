import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { AuthButton } from '../AuthButton';
import { Button } from '@/components/Button/Button';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { CreateGroupModal } from '@/components/modals/CreateGroupModal';

export function Header() {
  const [openCreateGroup, setOpenCreateGroup] = useState(false);

  return (
    <div className='bg-white shadow-sm sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 h-20 flex items-center justify-between'>
        {/* Left: Logo */}
        <div className='flex items-center flex-1'>
          <Link to='/' className='flex items-center gap-4'>
            <img src='/images/logo.svg' alt='Logo' className='h-14 w-14' />
          </Link>

          {/* Middle: Search */}
          <div className='flex-1 max-w-xl mx-6'>
            <SearchBar />
          </div>

          {/* nav button */}
          <div className='hidden md:block'>
            <nav className='flex items-center gap-6 text-text-subtitle'>
              <a
                href='/posts'
                className={cn(
                  'hover:text-primary transition-colors',
                  window.location.pathname === '/posts' &&
                    'border-b-2 border-primary text-primary'
                )}
              >
                Bài đăng
              </a>
              <a
                href='/groups'
                className={cn(
                  'hover:text-primary transition-colors',
                  window.location.pathname === '/groups' &&
                    'text-primary border-b-2 border-primary'
                )}
              >
                Xem nhóm
              </a>
              <a
                href='/blog'
                className='hover:text-primary transition-colors'
                onClick={e => {
                  e.preventDefault();
                  toast.info('Trang đang được phát triển');
                }}
              >
                Blog
              </a>
            </nav>
          </div>
        </div>

        {/* Right: actions */}
        <div className='flex items-center gap-4'>
          <Button
            variant='primary'
            className='rounded-md bg-transparent text-text-title border border-border-primary hover:bg-primary hover:text-white hover:border-primary'
            onClick={() => setOpenCreateGroup(true)}
          >
            + Tạo nhóm
          </Button>

          <AuthButton />
        </div>
      </div>

      {/* Create Group Modal */}
      <CreateGroupModal
        open={openCreateGroup}
        onOpenChange={setOpenCreateGroup}
      />
    </div>
  );
}
