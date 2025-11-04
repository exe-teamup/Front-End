import { useState, useMemo } from 'react';

interface UseTableFeaturesOptions<T> {
  data: T[];
  itemsPerPage?: number;
  searchFields?: (keyof T)[];
  sortField?: keyof T;
}

export function useTableFeatures<T extends Record<string, any>>({
  data,
  itemsPerPage = 10,
  searchFields = [],
  sortField,
}: UseTableFeaturesOptions<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<keyof T | ''>(sortField || '');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Search logic
  const searchedData = useMemo(() => {
    if (!searchQuery.trim()) return data;

    return data.filter(item => {
      return searchFields.some(field => {
        const value = item[field];
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(searchQuery.toLowerCase());
      });
    });
  }, [data, searchQuery, searchFields]);

  // Sort logic
  const sortedData = useMemo(() => {
    if (!sortBy) return searchedData;

    return [...searchedData].sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];

      if (aVal === bVal) return 0;

      const comparison = aVal > bVal ? 1 : -1;
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [searchedData, sortBy, sortOrder]);

  // Pagination logic
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  // Handlers
  const handleSort = (field: keyof T) => {
    if (sortBy === field) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on search
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const clearSearch = () => {
    setSearchQuery('');
    setCurrentPage(1);
  };

  return {
    // Data
    paginatedData,
    totalItems: sortedData.length,

    // Search
    searchQuery,
    handleSearch,
    clearSearch,

    // Sort
    sortBy,
    sortOrder,
    handleSort,

    // Pagination
    currentPage,
    totalPages,
    itemsPerPage,
    startIndex: startIndex + 1,
    endIndex: Math.min(endIndex, sortedData.length),
    handlePageChange,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
}
