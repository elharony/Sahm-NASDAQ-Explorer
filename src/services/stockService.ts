import axios from 'axios';
import { cacheService } from './cacheService';
import { 
  Stock, 
  StockApiResponse, 
  SearchParams
} from '../types/stock';
import { API_CONFIG, PAGINATION_CONFIG, CACHE_CONFIG } from '../config/constants';

class StockService {
  private cache = cacheService;
  private apiKey = process.env.REACT_APP_POLYGON_API_KEY;

  constructor() {
    console.log('StockService initialized:', {
      apiKeyExists: !!this.apiKey,
      apiKeyLength: this.apiKey?.length,
      apiKeyPreview: this.apiKey ? `${this.apiKey.substring(0, 8)}...` : 'none'
    });
  }

  private async makeRequest<T>(endpoint: string, config: any = {}): Promise<T> {
    if (!this.apiKey) {
      throw new Error('API key required. Please set REACT_APP_POLYGON_API_KEY in your environment variables.');
    }

    const url = `${API_CONFIG.BASE_URL}${endpoint}`;
    
    // Ensure apiKey is always included in params
    const params = {
      apiKey: this.apiKey,
      ...(config.params || {}),
    };

    console.log('API Request:', {
      url,
      params,
      apiKeyExists: !!this.apiKey,
      apiKeyLength: this.apiKey?.length,
      apiKeyInParams: !!params.apiKey
    });

    try {
      const response = await axios.get(url, {
        params,
        timeout: API_CONFIG.TIMEOUT,
      });

      return response.data;
    } catch (error: any) {
      console.error('API Error:', {
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url,
        params: error.config?.params,
        apiKeyInErrorParams: !!error.config?.params?.apiKey
      });
      
      if (error.response?.status === 429) {
        throw new Error('Rate limit exceeded. Please try again in a few seconds.');
      }
      if (error.response?.status === 401) {
        throw new Error('API key invalid or missing. Please check your REACT_APP_POLYGON_API_KEY.');
      }
      throw error;
    }
  }

  async getStocks(params: SearchParams = {}): Promise<StockApiResponse> {
    const {
      search,
      market = 'stocks',
      exchange,
      type,
      active = true,
      sort = 'ticker',
      order = 'asc',
      limit = PAGINATION_CONFIG.DEFAULT_LIMIT,
      cursor,
    } = params;

    // Create cache key
    const cacheKey = this.createCacheKey('stocks', params);
    
    // Try to get from cache first
    const cached = this.cache.get<StockApiResponse>(cacheKey);
    if (cached) {
      return cached;
    }

    const queryParams: Record<string, any> = {
      market,
      active,
      sort,
      order,
      limit: Math.min(limit, PAGINATION_CONFIG.MAX_LIMIT),
    };

    if (search) {
      queryParams.search = search;
    }

    if (exchange) {
      queryParams.exchange = exchange;
    }

    if (type) {
      queryParams.type = type;
    }

    if (cursor) {
      queryParams.cursor = cursor;
    }

    try {
      const response = await this.makeRequest<StockApiResponse>(
        API_CONFIG.ENDPOINTS.TICKERS,
        { params: queryParams }
      );

      // Cache the response
      const ttl = search ? CACHE_CONFIG.SEARCH_TTL : CACHE_CONFIG.DEFAULT_TTL;
      this.cache.set(cacheKey, response, ttl);

      return response;
    } catch (error) {
      throw error;
    }
  }

  async searchStocks(query: string, limit: number = 20): Promise<Stock[]> {
    if (query.length < 2) {
      return [];
    }

    try {
      const response = await this.getStocks({
        search: query,
        limit: Math.min(limit * 3, 100), // Get more results to sort them better
        active: true,
        market: 'stocks',
        exchange: 'XNAS',
      });

      const results = response.results || [];
      
      // Rank results: exact ticker > ticker starts with > exact name > name starts with > ticker includes > name includes
      const sortedResults = results.sort((a, b) => {
        const q = query.toLowerCase();
        const aTicker = a.ticker.toLowerCase();
        const bTicker = b.ticker.toLowerCase();
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();

        const rank = (ticker: string, name: string, type: string) => {
          if (ticker === q) return 0;
          if (ticker.startsWith(q)) return 1;
          if (name === q) return 2;
          if (name.startsWith(q)) return 3;
          if (ticker.includes(q)) return 4;
          if (name.includes(q)) return 5;
          return 6;
        };

        const aRank = rank(aTicker, aName, a.type);
        const bRank = rank(bTicker, bName, b.type);

        if (aRank !== bRank) return aRank - bRank;

        // Prefer common stock (CS) over others when ranks tie
        const aIsCommon = a.type === 'CS' ? 0 : 1;
        const bIsCommon = b.type === 'CS' ? 0 : 1;
        if (aIsCommon !== bIsCommon) return aIsCommon - bIsCommon;

        // Finally stable alphabetical by ticker
        return aTicker.localeCompare(bTicker);
      });

      // Return only the requested limit
      return sortedResults.slice(0, limit);
    } catch (error) {
      console.error('Search error:', error);
      throw error;
    }
  }

  async getStocksByExchange(exchange: string, limit?: number): Promise<Stock[]> {
    try {
      const response = await this.getStocks({
        exchange,
        limit,
        active: true,
        market: 'stocks',
      });

      return response.results || [];
    } catch (error) {
      console.error('Exchange filter error:', error);
      return [];
    }
  }

  private createCacheKey(prefix: string, params: SearchParams): string {
    const sortedParams = Object.keys(params)
      .sort()
      .reduce((result: Record<string, any>, key) => {
        result[key] = params[key as keyof SearchParams];
        return result;
      }, {});

    const cacheKey = `${prefix}:${JSON.stringify(sortedParams)}`;
    console.log(`[Cache] Generated key: ${cacheKey}`);
    return cacheKey;
  }

  // Clear specific cache entries
  clearCache(pattern?: string): void {
    if (pattern) {
      this.cache.clear(pattern);
    } else {
      this.cache.clearAll();
    }
  }

  // Get cache statistics
  getCacheStats() {
    return this.cache.getStats();
  }

  // Get cache info for stocks
  getStocksCacheInfo() {
    return this.cache.getCacheInfo('stocks:{"market":"stocks","active":true,"sort":"ticker","order":"asc","limit":20}');
  }

  // Get last updated time for stocks
  getStocksLastUpdated(): Date | null {
    return this.cache.getLastUpdated('stocks:{"market":"stocks","active":true,"sort":"ticker","order":"asc","limit":20}');
  }

  // Check if stocks cache is stale
  isStocksCacheStale(): boolean {
    return this.cache.isStale('stocks:{"market":"stocks","active":true,"sort":"ticker","order":"asc","limit":20}');
  }

  // Force refresh stocks (bypass cache)
  async forceRefreshStocks(): Promise<StockApiResponse> {
    // Clear the stocks cache
    this.cache.clear('stocks:');
    
    // Fetch fresh data
    return this.getStocks({
      market: 'stocks',
      active: true,
      sort: 'ticker',
      order: 'asc',
      limit: 20,
    });
  }
}

export const stockService = new StockService(); 