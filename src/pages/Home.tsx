import { BannerSection, LatestPostSection } from '../components/home';

export function Home() {
  return (
    <div className='min-h-screen '>
      <BannerSection className='mb-12' />
      <div className='max-w-7xl mx-auto px-4'>
        <LatestPostSection />
      </div>
    </div>
  );
}
