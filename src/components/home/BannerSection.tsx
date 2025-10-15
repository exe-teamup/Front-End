import { Zap, Plus } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { MAJORS } from '../../mock/major.mockapi';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

interface BannerSectionProps {
  className?: string;
}

export function BannerSection({ className }: BannerSectionProps) {
  const [selectedMajor, setSelectedMajor] = useState<string | null>(null);
  const [openEnterConfirm, setOpenEnterConfirm] = useState(false);
  const navigate = useNavigate();
  const [openFindModal, setOpenFindModal] = useState(false);

  const schema = z.object({
    title: z.string().min(3, 'Tối thiểu 3 ký tự').max(80),
    desc: z.string().min(10, 'Tối thiểu 10 ký tự').max(500),
  });
  type FormValues = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { title: '', desc: '' },
  });

  const handleMajorClick = (majorId: string) => {
    setSelectedMajor(selectedMajor === majorId ? null : majorId);
    navigate(`/posts?search=${majorId}`);
  };

  const handleFindGroups = () => {
    setOpenFindModal(true);
  };

  const handlePost = () => {
    // TODO: This function is now handled in the form's onSubmit from api
  };

  const handleFindMember = () => {
    setOpenEnterConfirm(true);
  };

  return (
    <div
      className={cn(
        'bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 py-8',
        className
      )}
    >
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex flex-col lg:flex-row gap-8 lg:items-stretch'>
          {/* Left Sidebar - Major Filters */}
          <div className='hidden lg:block lg:w-1/4'>
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-full flex flex-col'>
              <div className='mb-6'>
                <h2 className='text-xl font-bold text-text-title mb-1'>
                  Tìm theo ngành học
                </h2>
                <p className='text-sm text-text-subtitle'>
                  Tìm nhóm phù hợp với ngành học
                </p>
              </div>

              <nav className='space-y-1'>
                {MAJORS.map(major => (
                  <button
                    key={major.id}
                    onClick={() => handleMajorClick(major.id)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left group cursor-pointer',
                      selectedMajor === major.id
                        ? 'bg-primary/10 text-primary'
                        : 'hover:bg-primary/10 hover:text-primary text-text-subtitle'
                    )}
                  >
                    <span className='text-sm font-medium'>{major.name}</span>
                  </button>
                ))}
              </nav>

              <div className='mt-6 pt-6 border-t border-gray-200'>
                <button
                  onClick={() => {
                    setSelectedMajor(null);
                    navigate('/posts');
                  }}
                  className='text-primary hover:text-primary/80 font-medium text-sm w-full text-center cursor-pointer'
                >
                  Tất cả các ngành
                </button>
              </div>
            </div>
          </div>

          <div className='lg:w-3/4 flex flex-col'>
            {/* Action Buttons */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'>
              <button
                onClick={handleFindGroups}
                className='p-4 bg-gradient-to-br from-orange-50 to-orange-100 hover:shadow-lg transition-all cursor-pointer border border-orange-200 rounded-lg group'
              >
                <div className='flex items-center gap-3'>
                  <div className='p-1.5 bg-orange-500 rounded-lg'>
                    <Zap className='w-4 h-4 text-white' />
                  </div>
                  <div>
                    <span className='text-base font-semibold text-text-title'>
                      Tìm nhóm ngay
                    </span>
                  </div>
                </div>
              </button>

              <button
                onClick={handleFindMember}
                className='p-4 bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-all cursor-pointer border border-blue-200 rounded-lg group relative'
              >
                <div className='flex items-center gap-3'>
                  <div className='p-1.5 bg-blue-600 rounded-lg'>
                    <Plus className='w-4 h-4 text-white' />
                  </div>
                  <div>
                    <span className='text-base font-semibold text-text-title'>
                      Tuyển thành viên
                    </span>
                  </div>
                  <span className='absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full'>
                    Trở thành leader
                  </span>
                </div>
              </button>
            </div>

            {/* Banner Image */}
            <div className='relative overflow-hidden rounded-2xl shadow-xl'>
              <img
                src='/images/home/banner-home.png'
                alt='Banner home'
                className='w-full md:h-96 h-auto object-cover'
                onError={e => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'block';
                }}
              />
              <div
                className='w-full h-64 bg-gray-200 rounded-2xl flex items-center justify-center'
                style={{ display: 'none' }}
              >
                <div className='text-6xl text-gray-400'>🖼️</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AlertDialog open={openEnterConfirm} onOpenChange={setOpenEnterConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Bạn có muốn đăng bài tuyển thành viên?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setOpenEnterConfirm(false);
                navigate('/posts/create-post');
              }}
            >
              Tiếp tục
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Modal: Post looking-for-team */}
      <Dialog open={openFindModal} onOpenChange={setOpenFindModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Đăng bài tìm nhóm</DialogTitle>
          </DialogHeader>
          <form
            className='space-y-4'
            onSubmit={handleSubmit(() => {
              toast.success('Đăng bài thành công!');
              reset();
              setOpenFindModal(false);
            })}
          >
            <div>
              <label
                htmlFor='find-title'
                className='block text-sm font-medium text-text-title mb-2'
              >
                Tiêu đề
              </label>
              <input
                id='find-title'
                {...register('title')}
                placeholder='VD: Tìm nhóm project Marketing...'
                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary'
              />
              {errors.title && (
                <p className='text-sm text-red-600 mt-1'>
                  {errors.title.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor='find-desc'
                className='block text-sm font-medium text-text-title mb-2'
              >
                Mô tả
              </label>
              <textarea
                id='find-desc'
                rows={4}
                {...register('desc')}
                placeholder='Giới thiệu ngắn về bản thân, kỹ năng, mong muốn...'
                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary'
              />
              {errors.desc && (
                <p className='text-sm text-red-600 mt-1'>
                  {errors.desc.message}
                </p>
              )}
            </div>
            <DialogFooter>
              <button
                type='button'
                className='border px-4 py-2 rounded-lg cursor-pointer hover:border-primary'
                onClick={() => setOpenFindModal(false)}
              >
                Hủy
              </button>
              <button
                type='submit'
                className='bg-primary text-white px-4 py-2 rounded-lg cursor-pointer hover:opacity-90'
                onClick={handlePost}
              >
                Đăng bài
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
