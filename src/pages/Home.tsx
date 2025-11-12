import {
  BannerSection,
  BlogSection,
  LatestPostSection,
  PostSection,
} from '../components/home';
import { usePostsQuery } from '../hooks/usePostsQuery';
import { useMemo } from 'react';

export function Home() {
  // Centralized post fetching with TanStack Query
  // Updates automatically after create/update/delete mutations
  const { data: posts = [], isLoading, isError, error } = usePostsQuery();

  // Filter active posts only
  const activePosts = useMemo(() => {
    return posts.filter(post => post.postStatus === 'ACTIVE');
  }, [posts]);

  // Get latest posts sorted by creation date (newest first)
  const latestPosts = useMemo(() => {
    return [...activePosts].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [activePosts]);

  // Hot posts - currently same as latest posts until API provides popularity data
  const hotPosts = latestPosts;

  return (
    <div className='min-h-screen '>
      <BannerSection className='mb-12' />
      <div className='max-w-7xl mx-auto px-4'>
        <LatestPostSection
          posts={latestPosts}
          isLoading={isLoading}
          isError={isError}
          error={error instanceof Error ? error.message : undefined}
        />
        <PostSection
          posts={hotPosts}
          isLoading={isLoading}
          isError={isError}
          error={error instanceof Error ? error.message : undefined}
        />
      </div>
      <BlogSection />
    </div>
  );
}
