import { Button } from './button';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  startIndex: number;
  endIndex: number;
  itemsPerPage: number;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  startIndex,
  endIndex,
}: PaginationProps) {
  const pages = [];
  const maxVisiblePages = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className='flex items-center justify-between px-2 py-4'>
      <div className='text-sm text-text-body'>
        Hiển thị <span className='font-medium'>{startIndex}</span> -{' '}
        <span className='font-medium'>{endIndex}</span> trong tổng số{' '}
        <span className='font-medium'>{totalItems}</span> kết quả
      </div>

      <div className='flex items-center gap-2'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          <ChevronsLeft className='w-4 h-4' />
        </Button>

        <Button
          variant='outline'
          size='sm'
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className='w-4 h-4' />
        </Button>

        {pages.map(page => (
          <Button
            key={page}
            variant={page === currentPage ? 'default' : 'outline'}
            size='sm'
            onClick={() => onPageChange(page)}
            className='min-w-[40px]'
          >
            {page}
          </Button>
        ))}

        <Button
          variant='outline'
          size='sm'
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className='w-4 h-4' />
        </Button>

        <Button
          variant='outline'
          size='sm'
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          <ChevronsRight className='w-4 h-4' />
        </Button>
      </div>
    </div>
  );
}
