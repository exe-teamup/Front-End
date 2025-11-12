import { GroupPostCard } from '@/components/posts/GroupPostCard';
import { usePostsQuery } from '@/hooks/usePostsQuery';
import type { PostType } from '@/types/post';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Tab type for navigation (not related to API PostType)
type ViewTab = 'ALL' | 'RECRUIT' | 'LOOKING';

// Time filter options (client-side filtering for now)
type TimeFilter = '24H' | '3D' | '1W' | 'ALL';

const TIME_OPTIONS: { label: string; value: TimeFilter }[] = [
  { label: 'Trước 24h', value: '24H' },
  { label: 'Trước 3 ngày', value: '3D' },
  { label: 'Trước 1 tuần', value: '1W' },
  { label: 'Tất cả', value: 'ALL' },
];

// Major codes for filtering (client-side for now)
const MAJOR_OPTIONS = [
  'ALL',
  'SE',
  'SS',
  'AI',
  'GD',
  'DS',
  'CS',
  'IT',
] as const;

export default function PostsView() {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active tab and postType filter based on route
  const initialTab: ViewTab = React.useMemo(() => {
    if (location.pathname.endsWith('/looking')) return 'LOOKING';
    if (location.pathname.endsWith('/recruit')) return 'RECRUIT';
    return 'ALL';
  }, [location.pathname]);

  const [activeTab, setActiveTab] = React.useState<ViewTab>(initialTab);

  // Map route to postType filter for API
  const postTypeFilter: PostType | undefined = React.useMemo(() => {
    if (activeTab === 'RECRUIT') return 'GROUP_POST';
    if (activeTab === 'LOOKING') return 'USER_POST';
    return undefined; // ALL - no filter
  }, [activeTab]);

  // Fetch posts from API using TanStack Query
  // Updates automatically after create/update/delete mutations
  const {
    data: posts = [],
    isLoading,
    isError,
    error,
  } = usePostsQuery(postTypeFilter);

  // Filter only active posts (exclude trashed/deleted)
  const activePosts = React.useMemo(() => {
    return posts.filter(post => post.postStatus === 'ACTIVE');
  }, [posts]);
  const [time, setTime] = React.useState<TimeFilter>('ALL');
  const [major, setMajor] =
    React.useState<(typeof MAJOR_OPTIONS)[number]>('ALL');
  const [displayedCount, setDisplayedCount] = React.useState(10);

  const pageSize = 10;

  // Client-side filtering logic
  const filteredPosts = React.useMemo(() => {
    let result = activePosts;

    // Filter by time
    if (time !== 'ALL') {
      const now = Date.now();
      const msPerHour = 60 * 60 * 1000;
      const timeThresholds: Record<TimeFilter, number> = {
        '24H': 24 * msPerHour,
        '3D': 3 * 24 * msPerHour,
        '1W': 7 * 24 * msPerHour,
        ALL: Infinity,
      };

      result = result.filter(post => {
        const postTime = new Date(post.createdAt).getTime();
        return now - postTime <= timeThresholds[time];
      });
    }

    // Filter by major
    if (major !== 'ALL') {
      result = result.filter(
        post => post.postMajors?.some(m => m.majorCode === major) ?? false
      );
    }

    return result;
  }, [activePosts, time, major]);

  // Paginated posts (for "load more" functionality)
  const displayedPosts = React.useMemo(() => {
    return filteredPosts.slice(0, displayedCount);
  }, [filteredPosts, displayedCount]);

  // Reset displayed count when filters change
  React.useEffect(() => {
    setDisplayedCount(pageSize);
  }, [activeTab, time, major]);

  // Keep state in sync with URL changes
  React.useEffect(() => {
    let fromPath: ViewTab = 'ALL';
    if (location.pathname.endsWith('/looking')) fromPath = 'LOOKING';
    else if (location.pathname.endsWith('/recruit')) fromPath = 'RECRUIT';
    setActiveTab(fromPath);
  }, [location.pathname]);

  const canLoadMore = displayedCount < filteredPosts.length;

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <div className='flex items-center justify-between mb-6'>
          {/* Tabs */}
          <div className='flex gap-4 border-b border-gray-200'>
            {[
              {
                id: 'ALL' as ViewTab,
                label: 'Tất cả',
                path: '/posts',
              },
              {
                id: 'RECRUIT' as ViewTab,
                label: 'Tuyển người',
                path: '/posts/recruit',
              },
              {
                id: 'LOOKING' as ViewTab,
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
              onChange={e =>
                setMajor(e.target.value as (typeof MAJOR_OPTIONS)[number])
              }
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
              {/* Loading State */}
              {isLoading && (
                <div className='space-y-4'>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={`skeleton-${i}`}
                      className='animate-pulse bg-white rounded-lg shadow-sm border border-gray-200 p-4'
                    >
                      <div className='h-4 bg-gray-200 rounded w-24 mb-2' />
                      <div className='h-5 bg-gray-200 rounded w-2/3 mb-2' />
                      <div className='h-4 bg-gray-200 rounded w-5/6' />
                    </div>
                  ))}
                </div>
              )}

              {/* Error State */}
              {!isLoading && isError && (
                <div className='bg-red-50 border border-red-200 rounded-lg p-4 text-center'>
                  <p className='text-red-600 font-medium'>
                    Không thể tải bài đăng
                  </p>
                  <p className='text-red-500 text-sm mt-1'>
                    {error instanceof Error ? error.message : 'Đã xảy ra lỗi'}
                  </p>
                </div>
              )}

              {/* Empty State */}
              {!isLoading && !isError && displayedPosts.length === 0 && (
                <div className='text-center text-gray-500 py-8'>
                  Không có bài đăng phù hợp
                </div>
              )}

              {/* Posts List */}
              {!isLoading && !isError && displayedPosts.length > 0 && (
                <>
                  <div className='space-y-4'>
                    {displayedPosts.map(post => (
                      <GroupPostCard key={post.postId} post={post} />
                    ))}
                  </div>

                  {/* Load More Button */}
                  {canLoadMore && (
                    <div className='flex items-center justify-center pt-2'>
                      <button
                        onClick={() => {
                          setDisplayedCount(prev => prev + pageSize);
                        }}
                        className='px-4 py-2 border rounded-md text-sm hover:bg-gray-50 cursor-pointer'
                      >
                        Tải thêm ({filteredPosts.length - displayedCount} còn
                        lại)
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
