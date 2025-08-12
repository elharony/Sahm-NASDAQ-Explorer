import { useState, useEffect, useCallback } from 'react';
import { stockService } from '../services/stockService';
import { Stock } from '../types/stock';

interface UseInfiniteStocksResult {
  stocks: Stock[];
  isLoading: boolean;
  isLoadingMore: boolean;
  error: Error | null;
  hasMore: boolean;
  loadMore: () => void;
  refresh: () => void;
  isRateLimited: boolean;
}

export const useInfiniteStocks = (): UseInfiniteStocksResult => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [cursor, setCursor] = useState<string | undefined>();
  const [hasMore, setHasMore] = useState(true);
  const [isRateLimited, setIsRateLimited] = useState(false);

  const loadStocks = useCallback(async (nextCursor?: string, isRefresh = false) => {
    if (isRefresh) {
      setIsLoading(true);
      setStocks([]);
      setCursor(undefined);
      setHasMore(true);
      setError(null);
      setIsRateLimited(false);
    } else if (nextCursor) {
      setIsLoadingMore(true);
    } else {
      setIsLoading(true);
      setError(null);
      setIsRateLimited(false);
    }

    try {
      const response = await stockService.getStocks({
        active: true,
        market: 'stocks',
        exchange: 'XNAS',
        cursor: nextCursor,
        limit: 20,
      });

      if (isRefresh || !nextCursor) {
        setStocks(response.results || []);
      } else {
        setStocks(prev => [...prev, ...(response.results || [])]);
      }

      // Extract cursor from next_url for pagination
      if (response.next_url) {
        try {
          const url = new URL(response.next_url);
          const newCursor = url.searchParams.get('cursor');
          setCursor(newCursor || undefined);
          setHasMore(!!newCursor);
        } catch {
          setCursor(undefined);
          setHasMore(false);
        }
      } else {
        setCursor(undefined);
        setHasMore(false);
      }

      // Clear error state on success
      setError(null);
      setIsRateLimited(false);

    } catch (err) {
      const error = err as any;
      
      // Check for rate limiting
      const isRateLimitError = error.message?.includes('exceeded the maximum requests') || 
                              error.message?.includes('rate limit') ||
                              error.status === 429;
      
      if (isRateLimitError) {
        setIsRateLimited(true);
        setError(new Error('Rate limit exceeded. Please try again in a few seconds.'));
      } else {
        setError(error);
      }
      
      // Only clear stocks on initial load errors, not on loadMore errors
      if (isRefresh || !nextCursor) {
        setStocks([]);
      }
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, []);

  const loadMore = useCallback(() => {
    if (cursor && hasMore && !isLoadingMore && !isRateLimited) {
      loadStocks(cursor);
    }
  }, [cursor, hasMore, isLoadingMore, isRateLimited, loadStocks]);

  const refresh = useCallback(() => {
    loadStocks(undefined, true);
  }, [loadStocks]);

  useEffect(() => {
    loadStocks();
  }, [loadStocks]);

  return {
    stocks,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    loadMore,
    refresh,
    isRateLimited,
  };
};

export const useStockSearch = (query: string) => {
  const [data, setData] = useState<Stock[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (query.length < 2) {
      setData([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    const searchStocks = async () => {
      try {
        const result = await stockService.searchStocks(query, 20);
        setData(result);
        setError(null);
      } catch (err) {
        const error = err as any;
        if (error.message?.includes('rate limit') || error.status === 429) {
          setError(new Error('Rate limit exceeded. Please try again in a few seconds.'));
        } else {
          setError(err as Error);
        }
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(searchStocks, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  return { data, isLoading, error };
}; 