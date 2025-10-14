import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { X, Search, UserPlus, Users } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { searchFriends, type Friend } from '@/mock/friends.mockapi';

interface CreateGroupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const schema = z.object({
  groupName: z.string().min(3, 'Tên nhóm phải có ít nhất 3 ký tự').max(50),
  maxMembers: z
    .number()
    .min(4, 'Tối thiểu 4 thành viên')
    .max(6, 'Tối đa 6 thành viên'),
});

type FormValues = z.infer<typeof schema>;

export function CreateGroupModal({
  open,
  onOpenChange,
}: CreateGroupModalProps) {
  const [selectedMembers, setSelectedMembers] = useState<Friend[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMemberSearch, setShowMemberSearch] = useState(false);
  const [_avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] =
    useState<string>('/images/logo.svg');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      groupName: '',
      maxMembers: 6,
    },
  });

  const maxMembers = watch('maxMembers');
  const filteredFriends = searchFriends(searchQuery);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = e => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddMember = (friend: Friend) => {
    if (selectedMembers.length >= maxMembers - 1) {
      toast.error(`Tối đa ${maxMembers} thành viên trong nhóm`);
      return;
    }

    if (selectedMembers.find(m => m.id === friend.id)) {
      toast.error('Thành viên đã được thêm');
      return;
    }

    setSelectedMembers([...selectedMembers, friend]);
    setSearchQuery('');
    setShowMemberSearch(false);
  };

  const handleRemoveMember = (friendId: string) => {
    setSelectedMembers(selectedMembers.filter(m => m.id !== friendId));
  };

  const onSubmit = (_data: FormValues) => {
    if (selectedMembers.length === 0) {
      toast.error('Vui lòng mời ít nhất 1 thành viên');
      return;
    }

    setShowConfirmDialog(true);
  };

  const handleConfirmCreate = () => {
    // TODO: Submit to API
    // console.log('Creating group:', {
    //   groupName: watch('groupName'),
    //   maxMembers: watch('maxMembers'),
    //   avatar: avatarFile,
    //   memberEmails: selectedMembers.map(m => m.email),
    // });

    toast.success(
      'Yêu cầu đã được gửi, vui lòng đợi người bạn mời chấp nhận, nhóm sẽ được tạo thành công!'
    );
    reset();
    setSelectedMembers([]);
    setAvatarFile(null);
    setAvatarPreview('/images/logo.svg');
    setShowConfirmDialog(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='md:max-w-2xl max-w-md max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='text-xl font-semibold'>Tạo nhóm</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <div className='flex gap-4'>
              <div className='flex flex-col items-center space-y-2'>
                <div className='w-20 h-20 rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200'>
                  <img
                    src={avatarPreview}
                    alt='Group avatar'
                    className='w-full h-full object-cover'
                  />
                </div>
                <label htmlFor='avatar-upload' className='cursor-pointer'>
                  <div className='w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center hover:bg-primary'>
                    <X className='w-3 h-3 text-white rotate-45' />
                  </div>
                  <input
                    id='avatar-upload'
                    type='file'
                    accept='image/*'
                    onChange={handleAvatarChange}
                    className='hidden'
                  />
                </label>
              </div>
            </div>

            <p className='text-sm text-danger font-semibold'>
              * Thông tin bắt buộc
            </p>
          </div>

          {/* Group Name */}
          <div>
            <label
              htmlFor='group-name'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Tên nhóm *
            </label>
            <div className='flex items-center gap-2'>
              <input
                id='group-name'
                {...register('groupName')}
                placeholder='Nhập tên nhóm...'
                className='flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary'
              />
              <span className='text-sm text-gray-500'>
                {watch('groupName')?.length || 0}/50
              </span>
            </div>
            {errors.groupName && (
              <p className='text-sm text-red-600 mt-1'>
                {errors.groupName.message}
              </p>
            )}
          </div>

          {/* Max Members */}
          <div>
            <label
              htmlFor='max-members'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Số thành viên tối đa *
            </label>
            <select
              id='max-members'
              {...register('maxMembers', { valueAsNumber: true })}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary'
            >
              <option value={3}>3 thành viên</option>
              <option value={4}>4 thành viên</option>
              <option value={5}>5 thành viên</option>
              <option value={6}>6 thành viên</option>
            </select>
            {errors.maxMembers && (
              <p className='text-sm text-red-600 mt-1'>
                {errors.maxMembers.message}
              </p>
            )}
          </div>

          {/* Member Invitation */}
          <div>
            <label
              htmlFor='member-search'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Mời thành viên *{' '}
              <span className='text-red-600'>(ít nhất 1 người)</span>
            </label>

            {/* Selected Members */}
            {selectedMembers.length > 0 && (
              <div className='mb-3'>
                <div className='flex flex-wrap gap-2'>
                  {selectedMembers.map(member => (
                    <div
                      key={member.id}
                      className='flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-1'
                    >
                      <img
                        src={member.avatar || '/images/avatar.jpg'}
                        alt={member.name}
                        className='w-6 h-6 rounded-full object-cover'
                      />
                      <span className='text-sm text-primary-blue'>
                        {member.name}
                      </span>
                      <button
                        type='button'
                        onClick={() => handleRemoveMember(member.id)}
                        className='text-primary-blue cursor-pointer hover:text-red-600'
                      >
                        <X className='w-4 h-4' />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Search Members */}
            <div className='relative'>
              <div className='flex items-center gap-2'>
                <div className='relative flex-1'>
                  <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
                  <input
                    id='member-search'
                    type='text'
                    placeholder='Tìm kiếm theo tên, email hoặc mã sinh viên...'
                    value={searchQuery}
                    onChange={e => {
                      setSearchQuery(e.target.value);
                      setShowMemberSearch(true);
                    }}
                    onFocus={() => setShowMemberSearch(true)}
                    className='w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary'
                  />
                </div>
                <button
                  type='button'
                  onClick={() => setShowMemberSearch(!showMemberSearch)}
                  className='flex items-center gap-2 px-3 py-2 bg-primary text-white rounded-lg cursor-pointer hover:bg-primary/90'
                >
                  <UserPlus className='w-4 h-4' />
                  Thêm
                </button>
              </div>

              {/* Search Results */}
              {showMemberSearch && (
                <div className='absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto'>
                  {filteredFriends.length === 0 ? (
                    <div className='p-3 text-sm text-gray-500'>
                      Không tìm thấy kết quả
                    </div>
                  ) : (
                    filteredFriends.map(friend => (
                      <div
                        key={friend.id}
                        onClick={() => handleAddMember(friend)}
                        onKeyDown={e => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleAddMember(friend);
                          }
                        }}
                        role='button'
                        tabIndex={0}
                        className='flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0'
                      >
                        <img
                          src={friend.avatar || '/images/avatar.jpg'}
                          alt={friend.name}
                          className='w-10 h-10 rounded-full object-cover'
                        />
                        <div className='flex-1'>
                          <div className='font-medium text-gray-900'>
                            {friend.name}
                          </div>
                          <div className='text-sm text-gray-500'>
                            {friend.email}
                          </div>
                        </div>
                        <Users className='w-4 h-4 text-gray-400' />
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            <p className='text-sm text-gray-500 mt-1'>
              Đã chọn {selectedMembers.length}/{maxMembers - 1} thành viên
            </p>
          </div>

          {/* Action Buttons */}
          <div className='flex justify-end gap-3 pt-4 border-t border-gray-200'>
            <button
              type='button'
              onClick={() => onOpenChange(false)}
              className='px-6 py-2 border border-gray-300 rounded-lg text-gray-700 cursor-pointer hover:bg-gray-50'
            >
              Hủy
            </button>
            <button
              type='submit'
              className='px-6 py-2 bg-primary text-white rounded-lg cursor-pointer hover:bg-primary/90'
            >
              Tạo nhóm
            </button>
          </div>
        </form>

        {/* Confirmation Dialog */}
        <AlertDialog
          open={showConfirmDialog}
          onOpenChange={setShowConfirmDialog}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Bạn có chắc muốn tạo nhóm?</AlertDialogTitle>
            </AlertDialogHeader>
            <div className='py-4'>
              <p className='text-sm text-gray-600'>
                Bạn sẽ trở thành leader và không thể yêu cầu tham gia nhóm khác!
              </p>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Hủy</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmCreate}>
                Tạo nhóm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DialogContent>
    </Dialog>
  );
}
