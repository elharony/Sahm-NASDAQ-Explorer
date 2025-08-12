# 🚀 Sahm-NASDAQ-Explorer

<div align="center">
  <img src="public/images/nasdaq-logo.png" alt="NASDAQ Logo" width="120" />
  
  [![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue.svg)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.6-38B2AC.svg)](https://tailwindcss.com/)
  [![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.16.16-ff0055.svg)](https://www.framer.com/motion/)
  [![Netlify](https://img.shields.io/badge/Netlify-Deployed-00C7B7.svg)](https://netlify.com/)
  
  **A modern, responsive stock market explorer for NASDAQ listings with real-time search, infinite scroll, and professional UI/UX**
  
  Built with ❤️ by [Yahya Elharony](https://www.linkedin.com/in/yahya-elharony/)
</div>

---

## ✨ Features

### 🎯 Core Functionality
- **📱 Splash Screen** — NASDAQ-branded welcome with 10-second demo timer
- **🔍 Real-time Search** — Backend search with intelligent debouncing (300ms)
- **📊 Infinite Scroll** — Seamless pagination with loading states
- **⚡ Smart Caching** — Client-side caching to prevent redundant API calls
- **🎨 Responsive Design** — Mobile-first approach with Tailwind CSS
- **🛡️ Error Handling** — Comprehensive error boundaries and toast notifications
- **📈 Rate Limit Management** — Graceful handling of API rate limits

### 🛠️ Technical Excellence
- **TypeScript** — Full type safety throughout the application
- **React 18** — Modern React patterns with hooks and functional components
- **Performance Optimized** — Code splitting, lazy loading, and efficient rendering
- **Testing** — Comprehensive test suite with React Testing Library
- **PWA Ready** — Progressive Web App capabilities with service workers
- **SEO Optimized** — Meta tags, structured data, and semantic HTML

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 16+ ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **Polygon.io API key** ([Get Free Key](https://polygon.io/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/sahm-nasdaq-explorer.git
   cd sahm-nasdaq-explorer
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` and add your Polygon.io API key:
   ```bash
   REACT_APP_POLYGON_API_KEY=your_polygon_api_key_here
   REACT_APP_ENV=development
   ```

4. **Start the development server**
   ```bash
   npm start
   ```
   
   The app runs at [http://localhost:3000](http://localhost:3000)

---

## 🏗️ Project Structure

```
sahm-nasdaq-explorer/
├── public/                 # Static assets
│   ├── _redirects         # Netlify SPA routing
│   ├── favicon.ico        # App favicon
│   ├── manifest.json      # PWA manifest
│   └── images/            # Image assets
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── StockCard.tsx  # Stock display component
│   │   ├── SearchInput.tsx # Search with debouncing
│   │   ├── Toast.tsx      # Notification system
│   │   ├── LoadingSpinner.tsx # Loading indicators
│   │   └── ErrorBoundary.tsx # Error handling
│   ├── hooks/             # Custom React hooks
│   │   ├── useInfiniteStocks.ts # Stock data management
│   │   ├── useInfiniteScroll.ts # Scroll detection
│   │   └── useDebounce.ts # Input debouncing
│   ├── pages/             # Page components
│   │   ├── SplashScreen.tsx # Welcome screen
│   │   └── ExploreScreen.tsx # Main stock explorer
│   ├── services/          # API and business logic
│   │   ├── stockService.ts # Polygon.io API integration
│   │   └── cacheService.ts # Client-side caching
│   ├── config/            # Configuration files
│   │   └── constants.ts   # App constants and config
│   ├── types/             # TypeScript type definitions
│   │   └── stock.ts       # Stock-related interfaces
│   └── __tests__/         # Test files
│       ├── StockCard.test.tsx
│       ├── SearchInput.test.tsx
│       └── Toast.test.tsx
├── netlify.toml           # Netlify deployment config
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

---

## 🎯 Key Features Deep Dive

### 🔍 Real-time Search
```typescript
// Intelligent search with debouncing
const debouncedSearch = useDebounce(searchQuery, 300);

// Smart result ranking
const sortedResults = results.sort((a, b) => {
  // Exact ticker match > ticker starts with > exact name > name starts with
  const rank = (ticker: string, name: string) => {
    if (ticker === query) return 0;
    if (ticker.startsWith(query)) return 1;
    if (name === query) return 2;
    if (name.startsWith(query)) return 3;
    return 4;
  };
});
```

### ⚡ Smart Caching System
```typescript
// Client-side caching with TTL
class CacheService {
  private cache = new Map<string, CacheEntry<any>>();
  
  set<T>(key: string, data: T, ttl: number = 5 * 60 * 1000): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }
  
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry || this.isExpired(entry)) return null;
    return entry.data;
  }
}
```

### 📱 Responsive Design
```typescript
// Mobile-first responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {stocks.map((stock) => (
    <StockCard key={stock.ticker} stock={stock} />
  ))}
</div>
```

---

## 🧪 Testing

### Run Tests
```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage --watchAll=false

# Run tests in watch mode
npm test -- --watch
```

### Test Coverage
- **Components**: 100% coverage for core UI components
- **Hooks**: Comprehensive testing of custom hooks
- **Integration**: End-to-end user flow testing
- **Error Handling**: Rate limit and network error scenarios

### Example Test
```typescript
describe('StockCard', () => {
  it('renders stock information correctly', () => {
    render(<StockCard stock={mockStock} />);
    
    expect(screen.getByText('AAPL')).toBeInTheDocument();
    expect(screen.getByText('Apple Inc.')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });
});
```

---

## 🚀 Deployment

### Netlify (Recommended)

1. **Connect Repository**
   - Link your GitHub repository to Netlify
   - Netlify auto-detects React configuration

2. **Set Environment Variables**
   ```
   REACT_APP_POLYGON_API_KEY=your_actual_api_key
   REACT_APP_ENV=production
   ```

3. **Deploy**
   ```bash
   # Build locally
   npm run build
   
   # Deploy to Netlify
   netlify deploy --prod
   ```

### Other Platforms
- **Vercel**: `vercel --prod`
- **GitHub Pages**: `npm run deploy`
- **AWS S3 + CloudFront**: Manual upload to S3 bucket

---

## 🛠️ Development

### Available Scripts
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run test suite
npm run lint       # Run ESLint
npm run lint:fix   # Fix ESLint issues
npm run format     # Format code with Prettier
```

### Code Quality
- **ESLint**: Code linting with React and TypeScript rules
- **Prettier**: Code formatting
- **TypeScript**: Static type checking
- **Husky**: Git hooks for pre-commit checks

### Performance Monitoring
```typescript
// Built-in performance monitoring
window.addEventListener('load', function() {
  if ('performance' in window) {
    const perfData = window.performance.timing;
    const loadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log('Page load time:', loadTime + 'ms');
  }
});
```

---

## 📊 Performance Metrics

### Bundle Analysis
- **Main Bundle**: 107.17 kB (gzipped)
- **CSS Bundle**: 4.98 kB (gzipped)
- **Total Size**: ~112 kB (optimized)

### Core Web Vitals
- **LCP**: < 2.5s (Largest Contentful Paint)
- **FID**: < 100ms (First Input Delay)
- **CLS**: < 0.1 (Cumulative Layout Shift)

### Optimization Techniques
- **Code Splitting**: Route-based lazy loading
- **Tree Shaking**: Unused code elimination
- **Image Optimization**: WebP format with fallbacks
- **Caching**: Client-side and CDN caching

---

## 🔧 Configuration

### Environment Variables
```bash
# Required
REACT_APP_POLYGON_API_KEY=your_api_key

# Optional
REACT_APP_ENV=development|production
REACT_APP_API_TIMEOUT=10000
```

### API Configuration
```typescript
export const API_CONFIG = {
  BASE_URL: 'https://api.polygon.io',
  ENDPOINTS: {
    TICKERS: '/v3/reference/tickers',
  },
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;
```

### Cache Configuration
```typescript
export const CACHE_CONFIG = {
  DEFAULT_TTL: 5 * 60 * 1000, // 5 minutes
  SEARCH_TTL: 2 * 60 * 1000,  // 2 minutes for search
  MAX_CACHE_SIZE: 100,
} as const;
```

---

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Add tests for new functionality
5. Run the test suite: `npm test`
6. Commit your changes: `git commit -m 'feat: add amazing feature'`
7. Push to the branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

### Code Style
- Follow TypeScript best practices
- Use functional components with hooks
- Write comprehensive tests
- Follow the existing code structure
- Use meaningful commit messages

---

## 📚 API Reference

### Polygon.io Integration
```typescript
// Fetch stocks with pagination
const response = await stockService.getStocks({
  market: 'stocks',
  exchange: 'XNAS',
  active: true,
  limit: 20,
  cursor: nextCursor,
});

// Search stocks
const results = await stockService.searchStocks('AAPL', 20);
```

### Custom Hooks
```typescript
// Infinite scroll stocks
const { stocks, isLoading, hasMore, loadMore } = useInfiniteStocks();

// Debounced search
const { data, isLoading, error } = useStockSearch(query);

// Infinite scroll detection
useInfiniteScroll({ hasMore, isLoading, onLoadMore });
```

---

## 🐛 Troubleshooting

### Common Issues

#### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### API Errors
- Verify `REACT_APP_POLYGON_API_KEY` is set correctly
- Check API key permissions and rate limits
- Ensure network connectivity

#### Routing Issues (Netlify)
- Verify `public/_redirects` file exists
- Check `netlify.toml` configuration
- Ensure all routes redirect to `index.html`

### Debug Mode
```bash
# Enable debug logging
REACT_APP_DEBUG=true npm start
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Polygon.io** for providing the stock market API
- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations
- **Netlify** for seamless deployment

---

## 📞 Support

- **Documentation**: [Project Wiki](https://github.com/yourusername/sahm-nasdaq-explorer/wiki)
- **Issues**: [GitHub Issues](https://github.com/yourusername/sahm-nasdaq-explorer/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/sahm-nasdaq-explorer/discussions)
- **Email**: [Contact Developer](mailto:your-email@example.com)

---

<div align="center">
  <p>Made with ❤️ by <a href="https://www.linkedin.com/in/yahya-elharony/">Yahya Elharony</a></p>
  <p>⭐ Star this repository if you found it helpful!</p>
</div> 