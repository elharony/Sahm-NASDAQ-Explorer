import React, { useState, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useDebounce } from '../hooks/useDebounce';
import { SEARCH_CONFIG } from '../config/constants';

interface SearchInputProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
  isLoading?: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Search stocks...',
  onSearch,
  className,
  isLoading = false,
}) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, SEARCH_CONFIG.DEBOUNCE_DELAY);

  React.useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  const handleClear = useCallback(() => {
    setQuery('');
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  return (
    <div className={clsx('relative', className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className={clsx(
            'w-full pl-10 pr-10 py-3 rounded-xl border border-gray-300',
            'focus:ring-0 focus:outline-none focus:border-[#1d4ed8]',
            'bg-white text-gray-900 placeholder-gray-500',
            'dark:bg-dark-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400',
            'hover:border-gray-400 dark:hover:border-gray-500'
          )}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-4 h-4 border-2 border-gray-300 border-t-primary-500 rounded-full"
            />
          ) : query ? (
            <button
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors w-4 h-4 flex items-center justify-center"
              type="button"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}; 