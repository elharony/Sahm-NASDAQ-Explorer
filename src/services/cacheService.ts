interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

interface CacheStats {
  size: number;
  hits: number;
  misses: number;
}

class CacheService {
  private cache = new Map<string, CacheEntry<any>>();
  private stats = {
    hits: 0,
    misses: 0,
  };

  set<T>(key: string, data: T, ttl: number = 5 * 60 * 1000): void {
    console.log(`[Cache] Setting key: ${key}, TTL: ${ttl}ms`);
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      this.stats.misses++;
      console.log(`[Cache] Miss for key: ${key}`);
      return null;
    }

    const isExpired = Date.now() - entry.timestamp > entry.ttl;
    
    if (isExpired) {
      this.cache.delete(key);
      this.stats.misses++;
      console.log(`[Cache] Expired for key: ${key}`);
      return null;
    }

    this.stats.hits++;
    console.log(`[Cache] Hit for key: ${key}`);
    return entry.data;
  }

  clear(pattern?: string): void {
    if (pattern) {
      for (const key of this.cache.keys()) {
        if (key.includes(pattern)) {
          this.cache.delete(key);
        }
      }
    } else {
      this.cache.clear();
    }
  }

  clearAll(): void {
    this.cache.clear();
  }

  getStats(): CacheStats {
    return {
      size: this.cache.size,
      hits: this.stats.hits,
      misses: this.stats.misses,
    };
  }

  getCacheInfo(key: string): { timestamp: number; ttl: number } | null {
    const entry = this.cache.get(key);
    if (!entry) return null;
    
    return {
      timestamp: entry.timestamp,
      ttl: entry.ttl,
    };
  }

  getLastUpdated(key: string): Date | null {
    const entry = this.cache.get(key);
    return entry ? new Date(entry.timestamp) : null;
  }

  isStale(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return true;
    
    return Date.now() - entry.timestamp > entry.ttl;
  }
}

export const cacheService = new CacheService(); 