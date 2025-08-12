export const API_CONFIG = {
  BASE_URL: 'https://api.polygon.io',
  ENDPOINTS: {
    TICKERS: '/v3/reference/tickers',
  },
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;

export const CACHE_CONFIG = {
  DEFAULT_TTL: 5 * 60 * 1000, // 5 minutes
  SEARCH_TTL: 2 * 60 * 1000,  // 2 minutes for search results
  MAX_CACHE_SIZE: 100,
} as const;

export const PAGINATION_CONFIG = {
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const;

export const SEARCH_CONFIG = {
  DEBOUNCE_DELAY: 300,
  MIN_SEARCH_LENGTH: 2,
} as const;

export const APP_CONFIG = {
  NAME: 'Sahm',
  TAGLINE: 'Your Gateway to NASDAQ',
  DEVELOPER: 'Yahya Elharony',
  WEBSITE: 'https://elharony.com',
  LINKEDIN: 'https://www.linkedin.com/in/yahya-elharony/',
  REPOSITORY: 'https://github.com/elharony/Sahm-NASDAQ-Explorer',
  VERSION: '1.0.0',
} as const;


export const ROUTES = {
  HOME: '/',
  SPLASH: '/splash',
  EXPLORE: '/explore',
} as const; 