import { PostCard } from '../components/Card/PostCard';
import NotificationList from '../components/Card/NotificationCard';
import type { Notification } from '../components/Card/NotificationCard';
import { getNewestPosts } from '../mock/post.mockapi';

export function Home() {
  // Lấy post đầu tiên từ mock data
  const posts = getNewestPosts(1);
  const demoPost = posts[0];

  const notifications: Notification[] = [
    {
      id: 1,
      type: 'applied',
      title: 'Có 2 sinh viên vừa mới ứng tuyển vào nhóm EduTech của bạn.',
      time: '2 giờ trước',
    },
    {
      id: 2,
      type: 'accepted',
      title: 'Chúc mừng! Bạn vừa được chấp nhận vào nhóm Green Street.',
      time: '1 ngày trước',
    },
    {
      id: 3,
      type: 'left',
      title: 'Có 1 thành viên vừa rời nhóm!',
      time: '5 giờ trước',
    },
  ];

  return (
    <div className='max-w-6xl mx-auto py-12 px-4 grid grid-cols-3 gap-6'>
      <div className='col-span-1'>
        <h3 className='text-sm text-purple-300 mb-2'>Notifications</h3>
        <NotificationList items={notifications} />
      </div>

      <div className='col-span-2'>
        {demoPost && <PostCard post={demoPost} />}
      </div>
    </div>
  );
}
