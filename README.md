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
- **🔍 Real-time Search** — Backend search with debouncing (300ms)
- **📊 Infinite Scroll** — Pagination with loading states
- **⚡ Basic Caching** — Client-side caching to reduce API calls
- **🎨 Responsive Design** — Mobile-first approach with Tailwind CSS
- **🛡️ Error Handling** — Error boundaries and toast notifications
- **📈 Rate Limit Management** — Handling of API rate limits

### 🛠️ Tech Stack
- **TypeScript** — Full type safety across the application
- **React 18** — Latest React patterns and hooks
- **Performance** — Optimized code splitting and rendering
- **Testing** — Comprehensive test suite with React Testing Library

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 16+ ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **Polygon.io API key** ([Get Free Key](https://polygon.io/))

### Setup

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

3. **Configure environment**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` and add your Polygon.io API key:
   ```bash
   REACT_APP_POLYGON_API_KEY=your_polygon_api_key_here
   REACT_APP_ENV=development
   ```

4. **Launch development server**
   ```bash
   npm start
   ```
   
   Access the app at [http://localhost:3000](http://localhost:3000)

5. **Run tests**
   ```bash
   # Run all tests
   npm test
   
   # Run tests with coverage
   npm test -- --coverage --watchAll=false
   
   # Run tests in watch mode
   npm test -- --watch
   ```

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



---



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



---



---

<div align="center">
  <p>Made with ❤️ by <a href="https://www.linkedin.com/in/yahya-elharony/">Yahya Elharony</a></p>
  <p>⭐ Star this repository if you found it helpful!</p>
</div> 
