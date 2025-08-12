import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { SplashScreen } from './pages/SplashScreen';
import { ExploreScreen } from './pages/ExploreScreen';
import { ROUTES } from './config/constants';
import './index.css';

const App: React.FC = () => {
  console.log('App component rendered, routes:', ROUTES);
  
  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <Routes>
            <Route path={ROUTES.HOME} element={<SplashScreen />} />
            <Route path={ROUTES.SPLASH} element={<SplashScreen />} />
            <Route path={ROUTES.EXPLORE} element={<ExploreScreen />} />
            <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App; 