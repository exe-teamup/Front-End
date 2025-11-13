import Spinner from '@/components/loading/Spinner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useMajors } from '@/hooks';
import { useCreateGroupPost } from '@/hooks/usePostsQuery';
import { useStudentProfileStore } from '@/store/studentProfile';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

export function CreateTeam() {
  const navigate = useNavigate();
  const [openSubmitConfirm, setOpenSubmitConfirm] = useState(false);

  const { profile } = useStudentProfileStore();
  const { mutateAsync: createGroupPost, isPending } = useCreateGroupPost();
  const {
    majors: availableMajors,
    isLoading: isMajorsLoading,
    error: majorsError,
  } = useMajors();

  const schema = useMemo(
    () =>
      z.object({
        title: z.string().min(3, 'Tiêu đề tối thiểu 3 ký tự').max(80),
        postDetail: z.string().min(20, 'Mô tả tối thiểu 20 ký tự').max(1000),
        majors: z
          .array(
            z.object({
              majorId: z.union([z.string(), z.number()]),
              studentNum: z.number().min(1).max(10),
            })
          )
          .min(1, 'Chọn ít nhất 1 ngành'),
      }),
    []
  );

  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      postDetail: '',
      majors: [],
    },
  });

  const majors = watch('majors');

  const toggleMajor = (majorId: string) => {
    const exists = majors.find(m => m.majorId === majorId);
    if (exists) {
      // Remove major
      setValue(
        'majors',
        majors.filter(m => m.majorId !== majorId),
        { shouldValidate: true }
      );
    } else {
      // Add major with default quantity of 1
      const newMajors = [...majors, { majorId, studentNum: 1 }];
      setValue('majors', newMajors, {
        shouldValidate: true,
      });
    }
  };

  const updateMajorQuantity = (majorId: string, quantity: number) => {
    setValue(
      'majors',
      majors.map(m =>
        m.majorId === majorId ? { ...m, studentNum: quantity } : m
      ),
      { shouldValidate: true }
    );
  };

  const onSubmit = () => {
    // Validate user has required data
    if (!profile?.userId) {
      toast.error(
        'Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.'
      );
      return;
    }
    if (!profile?.groupId) {
      toast.error('Bạn cần có nhóm để tạo bài tuyển thành viên.');
      return;
    }
    setOpenSubmitConfirm(true);
  };

  const confirmSubmit = async () => {
    if (!profile?.userId || !profile?.groupId) return;

    const formData = watch();

    try {
      await createGroupPost({
        title: formData.title,
        postDetail: formData.postDetail,
        postMajorRequests: formData.majors.map(m => ({
          majorId: Number(m.majorId),
          studentNum: m.studentNum,
        })),
      });

      toast.success('Đã tạo bài tuyển thành viên!');
      setOpenSubmitConfirm(false);
      reset();

      // Navigate to posts page after successful creation
      setTimeout(() => {
        navigate('/posts');
      }, 1000);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Không thể tạo bài đăng. Vui lòng thử lại.';
      toast.error(message);
      setOpenSubmitConfirm(false);
    }
  };

  return (
    <div className='max-w-6xl mx-auto px-4 py-8'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <div className='lg:col-span-2 bg-white rounded-xl border shadow-sm p-6'>
          <h1 className='text-3xl font-bold text-text-title mb-6'>
            Tạo bài tuyển thành viên mới
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            <div>
              <label
                htmlFor='team-title'
                className='block text-sm font-medium text-text-title mb-2'
              >
                Tiêu đề bài tuyển
              </label>
              <input
                id='team-title'
                {...register('title')}
                placeholder='Nhập tiêu đề (tên nhóm, tên dự án,..)'
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
                htmlFor='team-detail'
                className='block text-sm font-medium text-text-title mb-2'
              >
                Mô tả chi tiết
              </label>
              <textarea
                id='team-detail'
                {...register('postDetail')}
                placeholder='Mô tả về dự án và mục tiêu của nhóm...'
                rows={4}
                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary'
              />
              {errors.postDetail && (
                <p className='text-sm text-red-600 mt-1'>
                  {errors.postDetail.message}
                </p>
              )}
            </div>

            <div>
              <p className='text-sm font-medium text-text-title mb-2'>
                Ngành yêu cầu (chọn và nhập số lượng)
              </p>

              {/* Loading state */}
              {isMajorsLoading && (
                <div className='flex items-center justify-center py-8'>
                  <Spinner />
                  <span className='ml-2 text-gray-600'>
                    Đang tải danh sách ngành...
                  </span>
                </div>
              )}

              {/* Error state */}
              {majorsError && (
                <div className='p-4 bg-red-50 border border-red-200 rounded-lg'>
                  <p className='text-sm text-red-600'>
                    Không thể tải danh sách ngành. Vui lòng thử lại sau.
                  </p>
                </div>
              )}

              {/* Major list */}
              {!isMajorsLoading && !majorsError && (
                <div className='space-y-3'>
                  {availableMajors.length === 0 ? (
                    <p className='text-sm text-gray-500 py-4'>
                      Không có ngành nào khả dụng.
                    </p>
                  ) : (
                    availableMajors.map(major => {
                      const id = `major-${major.majorId}`;
                      const selectedMajor = watch('majors').find(
                        m => m.majorId === major.majorId
                      );
                      const isChecked = !!selectedMajor;

                      return (
                        <div
                          key={major.majorId}
                          className='flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50'
                        >
                          <input
                            id={id}
                            type='checkbox'
                            checked={isChecked}
                            onChange={() => toggleMajor(major.majorId)}
                            className='w-4 h-4 cursor-pointer'
                          />
                          <label htmlFor={id} className='flex-1 cursor-pointer'>
                            <span className='font-medium'>
                              {major.majorName}
                            </span>
                            {major.majorCode && (
                              <span className='ml-2 text-xs text-gray-500'>
                                ({major.majorCode})
                              </span>
                            )}
                          </label>
                          {isChecked && (
                            <div className='flex items-center gap-2'>
                              <label
                                htmlFor={`qty-${major.majorId}`}
                                className='text-sm text-gray-600'
                              >
                                Số lượng:
                              </label>
                              <input
                                id={`qty-${major.majorId}`}
                                type='number'
                                min='1'
                                max='10'
                                value={selectedMajor.studentNum}
                                onChange={e =>
                                  updateMajorQuantity(
                                    major.majorId,
                                    Number.parseInt(e.target.value) || 1
                                  )
                                }
                                className='w-16 px-2 py-1 border rounded focus:outline-none focus:border-primary'
                              />
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              )}

              {errors.majors && (
                <p className='text-sm text-red-600 mt-2'>
                  {errors.majors.message as string}
                </p>
              )}

              {/* Selected majors chips */}
              {watch('majors').length > 0 && (
                <div className='flex flex-wrap gap-2 mt-3'>
                  {watch('majors').map(m => {
                    const majorInfo = availableMajors.find(
                      major => major.majorId === m.majorId
                    );
                    return (
                      <span
                        key={m.majorId}
                        className='px-3 py-1 bg-primary-green text-white rounded-full text-sm'
                      >
                        {majorInfo?.majorName} (x{m.studentNum})
                      </span>
                    );
                  })}
                </div>
              )}
            </div>

            <div className='flex flex-col-reverse sm:flex-row gap-3 pt-2'>
              <button
                type='button'
                onClick={() => navigate('/posts')}
                className='flex-1 border py-2 rounded-lg text-lg cursor-pointer hover:border-primary'
              >
                Hủy tạo
              </button>
              <button
                type='submit'
                disabled={isPending}
                className='flex-1 bg-primary text-white py-2 rounded-lg text-lg cursor-pointer hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {isPending ? 'Đang đăng...' : 'Đăng bài tuyển'}
              </button>
            </div>
          </form>
        </div>

        <div className='hidden lg:block'>
          <div className='h-full rounded-xl overflow-hidden'>
            <img
              src='/images/home/banner-create1.svg'
              alt='Banner'
              className='w-full h-full object-cover'
            />
          </div>
        </div>
      </div>

      <AlertDialog open={openSubmitConfirm} onOpenChange={setOpenSubmitConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn đã xem kỹ thông tin chưa?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Chỉnh sửa</AlertDialogCancel>
            <AlertDialogAction onClick={confirmSubmit}>Gửi</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
