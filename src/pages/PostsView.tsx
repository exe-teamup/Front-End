import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from '@/components/posts/PostCard';
import Spinner from '@/components/loading/Spinner';
import {
  fetchPosts,
  type PostItem,
  type PostType,
  type TimeFilter,
  type MajorCode,
} from '@/mock/posts.mockapi';

const TIME_OPTIONS: { label: string; value: TimeFilter }[] = [
  { label: 'Trước 24h', value: '24H' },
  { label: 'Trước 3 ngày', value: '3D' },
  { label: 'Trước 1 tuần', value: '1W' },
  { label: 'Tất cả', value: 'ALL' },
];

const MAJOR_OPTIONS: (MajorCode | 'ALL')[] = [
  'ALL',
  'SE',
  'SS',
  'AI',
  'GD',
  'DS',
  'CS',
  'IT',
];

export default function PostsView() {
  const location = useLocation();
  const navigate = useNavigate();

  const initialTab: PostType = React.useMemo(() => {
    if (location.pathname.endsWith('/looking')) return 'LOOKING';
    if (location.pathname.endsWith('/recruit')) return 'RECRUIT';
    return 'RECRUIT';
  }, [location.pathname]);

  const [activeTab, setActiveTab] = React.useState<PostType>(initialTab);
  const [time, setTime] = React.useState<TimeFilter>('ALL');
  const [major, setMajor] = React.useState<MajorCode | 'ALL'>('ALL');

  const [items, setItems] = React.useState<PostItem[]>([]);
  const [offset, setOffset] = React.useState(0);
  const [total, setTotal] = React.useState(0);

  const [isLoading, setIsLoading] = React.useState(true); // global-like on mount/tab change
  const [isLoadingMore, setIsLoadingMore] = React.useState(false); // incremental

  const pageSize = 10;

  const loadPosts = React.useCallback(
    (reset: boolean) => {
      if (reset) {
        setIsLoading(true);
        setOffset(0);
      } else {
        setIsLoadingMore(true);
      }

      const { items: fetched, total } = fetchPosts({
        type: activeTab,
        time,
        majorSort: major,
        offset: reset ? 0 : offset,
        limit: pageSize,
      });

      if (reset) {
        setItems(fetched);
        setTotal(total);
        setIsLoading(false);
      } else {
        setItems(prev => [...prev, ...fetched]);
        setIsLoadingMore(false);
      }
    },
    [activeTab, time, major, offset]
  );

  React.useEffect(() => {
    // reload on tab/filter change
    loadPosts(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, time, major]);

  // keep state in sync with URL changes
  React.useEffect(() => {
    const fromPath: PostType = location.pathname.endsWith('/looking')
      ? 'LOOKING'
      : 'RECRUIT';
    setActiveTab(fromPath);
  }, [location.pathname]);

  const canLoadMore = items.length < total;

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <div className='flex items-center justify-between mb-6'>
          {/* Tabs */}
          <div className='flex gap-4 border-b border-gray-200'>
            {[
              {
                id: 'RECRUIT' as PostType,
                label: 'Tuyển người',
                path: '/posts/recruit',
              },
              {
                id: 'LOOKING' as PostType,
                label: 'Tìm nhóm',
                path: '/posts/looking',
              },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  navigate(tab.path);
                }}
                className={`relative pb-3 px-1 text-sm font-medium cursor-pointer ${activeTab === tab.id ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Filters */}
          <div className='flex items-center gap-3'>
            <select
              value={time}
              onChange={e => setTime(e.target.value as TimeFilter)}
              className='border rounded-md px-3 py-2 text-sm bg-white'
              aria-label='Lọc theo thời gian'
            >
              {TIME_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <select
              value={major}
              onChange={e => setMajor(e.target.value as MajorCode | 'ALL')}
              className='border rounded-md px-3 py-2 text-sm bg-white'
              aria-label='Lọc theo chuyên ngành'
            >
              {MAJOR_OPTIONS.map(m => (
                <option key={m} value={m}>
                  {m === 'ALL' ? 'Tất cả ngành' : m}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Layout: content + right sidebar */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main list */}
          <div className='lg:col-span-2'>
            {/* Content: spaced cards */}
            <div className='space-y-4'>
              {isLoading ? (
                <div className='space-y-4'>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className='animate-pulse bg-white rounded-lg shadow-sm border border-gray-200 p-4'
                    >
                      <div className='h-4 bg-gray-200 rounded w-24 mb-2' />
                      <div className='h-5 bg-gray-200 rounded w-2/3 mb-2' />
                      <div className='h-4 bg-gray-200 rounded w-5/6' />
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {items.length === 0 ? (
                    <div className='text-center text-gray-500 py-8'>
                      Không có bài đăng
                    </div>
                  ) : (
                    <div className='space-y-4'>
                      {items.map(p => (
                        <PostCard key={p.id} post={p} />
                      ))}
                    </div>
                  )}

                  {/* Load more */}
                  {canLoadMore && (
                    <div className='flex items-center justify-center pt-2'>
                      <button
                        onClick={() => {
                          setOffset(prev => prev + pageSize);
                          loadPosts(false);
                        }}
                        className='px-4 py-2 border rounded-md text-sm hover:bg-gray-50 cursor-pointer'
                      >
                        {isLoadingMore ? (
                          <span className='inline-flex items-center gap-2'>
                            <Spinner size={16} /> Đang tải...
                          </span>
                        ) : (
                          'Tải thêm'
                        )}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Right sticky info - hidden on md and below */}
          <aside className='hidden lg:block'>
            <div className='sticky top-24'>
              <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
                <img
                  src='/images/posts/banner_post.svg'
                  alt='See who is hiring'
                  className='w-full h-auto object-cover'
                />
                <div className='p-4'>
                  <div className='grid grid-cols-2 gap-2 text-xs text-gray-600'>
                    <button
                      type='button'
                      className='hover:text-primary underline bg-transparent border-none p-0 m-0 cursor-pointer'
                    >
                      About
                    </button>
                    <button
                      type='button'
                      className='hover:text-primary underline bg-transparent border-none p-0 m-0 cursor-pointer'
                    >
                      Help Center
                    </button>
                    <button
                      type='button'
                      className='hover:text-primary underline bg-transparent border-none p-0 m-0 cursor-pointer'
                    >
                      Privacy & Terms
                    </button>
                    <button
                      type='button'
                      className='hover:text-primary underline bg-transparent border-none p-0 m-0 cursor-pointer'
                    >
                      Accessibility
                    </button>
                    <button
                      type='button'
                      className='hover:text-primary underline bg-transparent border-none p-0 m-0 cursor-pointer'
                    >
                      Business
                    </button>
                    <button
                      type='button'
                      className='hover:text-primary underline bg-transparent border-none p-0 m-0 cursor-pointer'
                    >
                      More
                    </button>
                  </div>
                  <div className='mt-4 text-[11px] text-gray-500'>
                    EXE TeamUp © {new Date().getFullYear()}
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Example usage of GlobalLoader when needed (kept hidden by default) */}
        {/* <GlobalLoader text='Đang xử lý...' /> */}
      </div>
    </div>
  );
}
