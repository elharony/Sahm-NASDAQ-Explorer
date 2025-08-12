import React, { useState, useCallback, useMemo } from 'react';
import { TrendingUp } from 'lucide-react';
import { SearchInput } from '../components/SearchInput';
import { StockCard } from '../components/StockCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Toast } from '../components/Toast';
import { useInfiniteStocks, useStockSearch } from '../hooks/useInfiniteStocks';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { useDebounce } from '../hooks/useDebounce';
import { APP_CONFIG, SEARCH_CONFIG } from '../config/constants';

export const ExploreScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showErrorToast, setShowErrorToast] = useState(false);

  const debouncedSearch = useDebounce(searchQuery, SEARCH_CONFIG.DEBOUNCE_DELAY);
  const isSearching = debouncedSearch.length >= SEARCH_CONFIG.MIN_SEARCH_LENGTH;

  // Use different hooks based on search state
  const {
    stocks: allStocks,
    isLoading: isLoadingStocks,
    isLoadingMore,
    error: stocksError,
    hasMore,
    loadMore,
    isRateLimited,
  } = useInfiniteStocks();

  const {
    data: searchData,
    isLoading: isSearchLoading,
    error: searchError,
  } = useStockSearch(debouncedSearch);

  const stocks = useMemo(() => {
    const raw = isSearching ? (searchData || []) : allStocks;
    const seen = new Set<string>();
    return raw.filter(s => {
      if (seen.has(s.ticker)) return false;
      seen.add(s.ticker);
      return true;
    });
  }, [isSearching, searchData, allStocks]);

  const isLoading = isSearching ? isSearchLoading : isLoadingStocks;
  const error = isSearching ? searchError : stocksError;

  // Enable infinite scroll for non-search mode
  useInfiniteScroll({
    hasMore: !isSearching && hasMore && !isRateLimited,
    isLoading: isLoadingMore,
    onLoadMore: loadMore,
    threshold: 1000,
  });

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // Simple error handling
  React.useEffect(() => {
    if (error) {
      setShowErrorToast(true);
    } else {
      setShowErrorToast(false);
    }
  }, [error]);

  const handleCloseError = () => {
    setShowErrorToast(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      {/* Header */}
      <div className="bg-white dark:bg-dark-800 shadow-sm border-b border-gray-200 dark:border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-[#1d4ed8]">
                {APP_CONFIG.NAME}
              </h1>
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                {APP_CONFIG.TAGLINE}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <SearchInput
            onSearch={handleSearch}
            isLoading={isSearchLoading}
            placeholder="Search NASDAQ stocks..."
            className="max-w-2xl mx-auto"
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Loading State */}
        {isLoading && stocks.length === 0 && (
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {/* Stock Grid - No staggered animations */}
        {stocks.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {stocks.map((stock) => (
              <StockCard
                key={stock.ticker}
                stock={stock}
                index={0} // No animation delay
              />
            ))}
          </div>
        )}

        {/* End of Results Indicator */}
        {!isSearching && stocks.length > 0 && !hasMore && !isLoadingMore && (
          <div className="flex justify-center py-8">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              You've reached the end of the stock listings
            </p>
          </div>
        )}

        {/* Empty State */}
        {stocks.length === 0 && !isLoading && !error && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <TrendingUp className="w-16 h-16 mx-auto mb-4" />
              <p className="text-lg font-medium">No stocks found</p>
              <p className="text-sm">
                {isSearching 
                  ? 'Try a different search term'
                  : 'Please check your API key configuration'
                }
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Loading More Toast */}
      <Toast
        isOpen={!isSearching && isLoadingMore}
        type="info"
        message={(
          <span className="flex items-center gap-2 justify-center">
            <span className="inline-block align-middle">
              <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            </span>
            <span>Loading more stocks…</span>
          </span>
        )}
      />

      {/* Error Toast */}
      <Toast
        isOpen={showErrorToast}
        type={isRateLimited ? 'warning' : 'error'}
        message={error?.message || 'Error loading stocks'}
        onClose={handleCloseError}
      />
    </div>
  );
}; 