import { useMemo, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export function CreateTeam() {
  const [openSubmitConfirm, setOpenSubmitConfirm] = useState(false);

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().min(3, 'Tên nhóm tối thiểu 3 ký tự').max(80),
        desc: z.string().min(20, 'Mô tả tối thiểu 20 ký tự').max(1000),
        requiredMajors: z.array(z.string()).min(1, 'Chọn ít nhất 1 ngành'),
        tags: z.array(z.string()).max(5, 'Tối đa 5 tags'),
        tagInput: z.string().optional(),
      }),
    []
  );

  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      desc: '',
      requiredMajors: [],
      tags: [],
      tagInput: '',
    },
  });

  const requiredMajors = watch('requiredMajors');
  const tags = watch('tags');
  const tagInput = watch('tagInput');

  const toggleMajor = (m: string) => {
    const next = requiredMajors.includes(m)
      ? requiredMajors.filter(x => x !== m)
      : [...requiredMajors, m];
    setValue('requiredMajors', next, { shouldValidate: true });
  };

  const addTag = () => {
    const v = (tagInput || '').trim();
    if (!v) return;
    if (tags.length >= 5) return toast.warning('Tối đa 5 tags');
    if (tags.includes(v)) return;
    setValue('tags', [...tags, v], { shouldValidate: true });
    setValue('tagInput', '');
  };

  const removeTag = (t: string) => {
    setValue(
      'tags',
      tags.filter(x => x !== t),
      { shouldValidate: true }
    );
  };

  const onSubmit = () => setOpenSubmitConfirm(true);

  const confirmSubmit = () => {
    toast.success('Đã tạo bài tuyển thành viên!');
    setOpenSubmitConfirm(false);
    setValue('name', '');
    setValue('desc', '');
    setValue('requiredMajors', []);
    setValue('tags', []);
    setValue('tagInput', '');
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
                htmlFor='team-name'
                className='block text-sm font-medium text-text-title mb-2'
              >
                Tên nhóm
              </label>
              <input
                id='team-name'
                {...register('name')}
                placeholder='Nhập tên nhóm...'
                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary'
              />
              {errors.name && (
                <p className='text-sm text-red-600 mt-1'>
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor='team-desc'
                className='block text-sm font-medium text-text-title mb-2'
              >
                Mô tả nhóm
              </label>
              <textarea
                id='team-desc'
                {...register('desc')}
                placeholder='Mô tả về dự án và mục tiêu của nhóm...'
                rows={4}
                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary'
              />
              {errors.desc && (
                <p className='text-sm text-red-600 mt-1'>
                  {errors.desc.message}
                </p>
              )}
            </div>

            <div>
              <p className='text-sm font-medium text-text-title mb-2'>
                Ngành yêu cầu
              </p>
              <div className='space-y-3'>
                {/* sẽ lấy danh sách ngành từ API khi triển khai thật */}
                {[
                  'Kỹ thuật phần mềm',
                  'Marketing',
                  'Ngôn ngữ',
                  'Thiết kế đồ họa',
                ].map((m, idx) => {
                  const id = `major-${idx}`;
                  return (
                    <div key={m} className='flex items-center gap-3'>
                      <input
                        id={id}
                        type='checkbox'
                        checked={requiredMajors.includes(m)}
                        onChange={() => toggleMajor(m)}
                      />
                      <label htmlFor={id} className='cursor-pointer'>
                        {m}
                      </label>
                    </div>
                  );
                })}
              </div>
              {errors.requiredMajors && (
                <p className='text-sm text-red-600 mt-2'>
                  {errors.requiredMajors.message as string}
                </p>
              )}
              {requiredMajors.length > 0 && (
                <div className='flex flex-wrap gap-2 mt-3'>
                  {requiredMajors.map(m => (
                    <span
                      key={m}
                      className='px-3 py-1 bg-primary-green text-white rounded-full text-sm'
                    >
                      {m}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div>
              <p className='text-sm font-medium text-text-title mb-2'>
                Tag (tuỳ chọn, tối đa 5)
              </p>
              <div className='space-y-3'>
                {['Edutech', 'Healthcare', 'Môi trường'].map((t, idx) => {
                  const id = `tagpreset-${idx}`;
                  return (
                    <div key={t} className='flex items-center gap-3'>
                      <input
                        id={id}
                        type='checkbox'
                        checked={tags.includes(t)}
                        onChange={() =>
                          setValue(
                            'tags',
                            tags.includes(t)
                              ? tags.filter(x => x !== t)
                              : [...tags, t],
                            { shouldValidate: true }
                          )
                        }
                      />
                      <label htmlFor={id} className='cursor-pointer'>
                        {t}
                      </label>
                    </div>
                  );
                })}
              </div>
              <div className='mt-3 flex items-center gap-2'>
                <label htmlFor='tag-input' className='sr-only'>
                  Thêm tag
                </label>
                <input
                  id='tag-input'
                  {...register('tagInput')}
                  placeholder='Thêm tag'
                  className='flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:border-primary'
                />
                <button
                  type='button'
                  onClick={addTag}
                  className='px-3 py-2 border rounded-lg cursor-pointer hover:border-primary'
                >
                  Thêm
                </button>
              </div>
              {errors.tags && (
                <p className='text-sm text-red-600 mt-2'>
                  {errors.tags.message as string}
                </p>
              )}
              {tags.length > 0 && (
                <div className='flex flex-wrap gap-2 mt-3'>
                  {tags.map(t => (
                    <div key={t} className='flex items-center'>
                      <span className='px-3 py-1 bg-primary-blue/90 text-white rounded-full text-sm'>
                        {t}
                      </span>
                      <button
                        type='button'
                        onClick={() => removeTag(t)}
                        className='ml-2 text-sm text-gray-600 hover:text-red-600 hover:scale-110 cursor-pointer'
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className='flex flex-col-reverse sm:flex-row gap-3 pt-2'>
              <button
                type='button'
                className='flex-1 border py-2 rounded-lg text-lg cursor-pointer hover:border-primary'
              >
                Hủy tạo
              </button>
              <button
                type='submit'
                className='flex-1 bg-primary text-white py-2 rounded-lg text-lg cursor-pointer hover:opacity-90'
              >
                Tạo nhóm
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
