import {
  BannerSection,
  LatestPostSection,
  PostSection,
} from '../components/home';

export function Home() {
  return (
    <div className='min-h-screen '>
      <BannerSection className='mb-12' />
      <div className='max-w-7xl mx-auto px-4'>
        <LatestPostSection />
        <PostSection />
      </div>
    </div>
  );
}
