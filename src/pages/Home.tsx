import {
  BannerSection,
  BlogSection,
  LatestPostSection,
  PostSection,
} from '../components/home';
import { usePosts } from '../hooks/usePosts';

export function Home() {
  // Centralized post fetching - fetch once and pass to children
  const { latestPosts, hotPosts, isLoading, isError, error } = usePosts();

  return (
    <div className='min-h-screen '>
      <BannerSection className='mb-12' />
      <div className='max-w-7xl mx-auto px-4'>
        <LatestPostSection
          posts={latestPosts}
          isLoading={isLoading}
          isError={isError}
          error={error}
        />
        <PostSection
          posts={hotPosts}
          isLoading={isLoading}
          isError={isError}
          error={error}
        />
      </div>
      <BlogSection />
    </div>
  );
}
