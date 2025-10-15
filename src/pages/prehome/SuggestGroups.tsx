import { useNavigate } from 'react-router-dom';
import { PostCard } from '@/components/ui/PostCard';
import StepProgress from '@/components/Progress/StepProgress';
import { getNewestPosts } from '@/mock/post.mockapi';
import { Button } from '@/components/Button';

export function SuggestGroups() {
  const navigate = useNavigate();

  // Lấy 2 posts gợi ý từ mock data
  const suggestions = getNewestPosts(2);

  return (
    <div className='min-h-screen bg-gray-100 p-8'>
      <div className='max-w-6xl mx-auto bg-white rounded-lg p-8'>
        <StepProgress step={4} total={4} className='mb-6' />

        <div className='text-center mb-6'>
          <h1 className='text-3xl font-bold'>Nhóm phù hợp với bạn</h1>
          <p className='text-gray-500 mt-2'>
            Dựa trên thông tin của bạn, đây là những nhóm có thể phù hợp
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {suggestions.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        <div className='mt-8 flex items-center justify-center gap-4'>
          <Button
            variant='outline'
            onClick={() => navigate('/')}
            className='px-6 py-2 rounded-md border'
          >
            Bỏ qua
          </Button>

          <Button
            variant='primary'
            onClick={() => navigate('/')}
            className='px-6 py-2 rounded-md bg-orange-500 text-white'
          >
            Vào trang chủ
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SuggestGroups;
