import React from 'react';
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
  listLecturers,
  registerLecturers,
  type Lecturer,
} from '@/mock/lecturers.mockapi';
import { toast } from 'sonner';

interface RequestMentorModalProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  groupId: string;
}

export default function RequestMentorModal({
  open,
  onOpenChange,
  groupId,
}: RequestMentorModalProps) {
  const [selected, setSelected] = React.useState<string[]>([]);
  const [lecturers, setLecturers] = React.useState<Lecturer[]>([]);

  React.useEffect(() => {
    if (open) {
      setLecturers(listLecturers());
    } else {
      setSelected([]);
    }
  }, [open]);

  const toggle = (id: string) => {
    setSelected(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= 3) return prev; // cap at 3 selections
      return [...prev, id];
    });
  };

  const handleSubmit = () => {
    const res = registerLecturers(groupId, selected);
    if (res.ok) {
      toast.success(
        'Ghi nhận giảng viên mong muốn. Lưu ý: phòng đào tạo sẽ sắp xếp cuối kỳ hạn.'
      );
      onOpenChange(false);
    } else {
      toast.error(res.error || 'Có lỗi xảy ra');
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Yêu cầu mentor cho nhóm</AlertDialogTitle>
        </AlertDialogHeader>

        <div className='space-y-3'>
          <div className='text-xs text-gray-800'>
            Chọn tối đa 3 giảng viên mong muốn.
          </div>

          <div className='max-h-64 overflow-auto border rounded-md divide-y'>
            {lecturers.map(l => (
              <label
                key={l.id}
                className='flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50'
              >
                <input
                  type='checkbox'
                  checked={selected.includes(l.id)}
                  onChange={() => toggle(l.id)}
                  className='w-4 h-4'
                />
                <img
                  src={l.avatar || '/images/avatar.jpg'}
                  alt={l.fullName}
                  className='w-8 h-8 rounded-full object-cover'
                />
                <div className='flex-1 min-w-0'>
                  <div className='text-sm font-medium text-gray-900 truncate'>
                    {l.fullName}
                  </div>
                  <div className='text-xs text-gray-500 truncate'>
                    {l.email} • {l.major}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleSubmit}
            className='bg-primary text-white hover:bg-primary/90 disabled:opacity-50'
            disabled={selected.length === 0}
          >
            Gửi yêu cầu
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
