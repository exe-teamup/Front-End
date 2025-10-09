import { Button } from '../Button/Button';
import { IconBell, IconUser } from '../Icon/icons';

export function Header() {
  return (
    <div className='bg-white shadow-sm border-b'>
      <div className='max-w-7xl mx-auto px-4 h-16 flex items-center justify-between'>
        {/* Left: Logo */}
        <div className='flex items-center gap-4'>
          <img src='/logo.ico' alt='Logo' className='h-8 w-8' />
          <div className='text-text-title font-semibold'>EXE</div>
        </div>

        {/* Middle: Search */}
        <div className='flex-1 max-w-xl mx-6'>
          <input
            type='text'
            placeholder='Tìm kiếm nhóm, chuyên ngành,...'
            className='w-full border border-border-primary rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary'
          />
        </div>

        {/* Right: actions */}
        <div className='flex items-center gap-4'>
          <Button
            variant='primary'
            className='rounded-md bg-transparent text-text-title border border-border-primary hover:bg-primary/10 hover:text-white'
          >
            + Tạo nhóm
          </Button>

          <button
            aria-label='notifications'
            className='relative text-text-title'
          >
            <IconBell className='h-5 w-5' />
            <span className='absolute -top-1 -right-2 bg-error text-white text-xs rounded-full px-1'>
              2
            </span>
          </button>

          <div className='flex items-center gap-2 text-text-title'>
            <IconUser className='h-5 w-5' />
            <span>Nguyễn Văn An</span>
          </div>
        </div>
      </div>
    </div>
  );
}
