import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { APP_CONFIG, ROUTES } from '../config/constants';
import { DarkModeToggle } from '../components/DarkModeToggle';

export const SplashScreen: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Fixed 10 second delay for presentation purposes
    const delay = 10000;
    
    console.log(`Splash screen will navigate in ${delay}ms`);
    
    const timer = setTimeout(() => {
      console.log('Navigating to explore screen');
      navigate(ROUTES.EXPLORE, { replace: true });
    }, delay);

    return () => {
      console.log('Clearing splash timer');
      clearTimeout(timer);
    };
  }, [navigate]);

  const logoVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: -30,
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const textVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const presentationVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 1.5,
        ease: 'easeOut',
      },
    },
  };

  const developerVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 2,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center justify-center px-4 relative">
      {/* Dark Mode Toggle - Top Right */}
      <div className="absolute top-4 right-4 z-10">
        <DarkModeToggle />
      </div>
      
      {/* Main Content - Centered */}
      <div className="text-center flex-1 flex flex-col items-center justify-center">
        {/* NASDAQ Logo */}
        <motion.div
          variants={logoVariants}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          {/* Real Nasdaq Logo */}
          <div className="relative mb-8">
            <motion.div
              className="flex items-center justify-center"
              animate={{ 
                filter: [
                  "drop-shadow(0 10px 20px rgba(37, 99, 235, 0.2))",
                  "drop-shadow(0 20px 40px rgba(37, 99, 235, 0.3))",
                  "drop-shadow(0 10px 20px rgba(37, 99, 235, 0.2))",
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <img 
                src="/images/nasdaq-logo.png" 
                alt="Nasdaq Logo" 
                className="w-64 h-auto max-w-full"
              />
            </motion.div>
            
            {/* Floating particles around logo */}
            {[0, 1, 2, 3].map((index) => (
              <motion.div
                key={index}
                className="absolute w-2 h-2 bg-blue-400 rounded-full"
                style={{
                  top: `${20 + (index * 20)}%`,
                  left: `${10 + (index * 25)}%`,
                }}
                animate={{
                  y: [-10, 10, -10],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.5,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
          
          {/* App Title */}
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-5xl sm:text-6xl font-bold text-[#1d4ed8] mb-2">
              {APP_CONFIG.NAME}
            </h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 font-medium">
              {APP_CONFIG.TAGLINE}
            </p>
          </motion.div>
        </motion.div>

        {/* Presentation Text */}
        <motion.div
          variants={presentationVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400 italic">
            Set to 10 seconds for demonstration/presentation only, will redirect to /explore to view stocks list
          </p>
        </motion.div>

        {/* Loading Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex justify-center space-x-2">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-3 h-3 bg-blue-500 rounded-full"
                animate={{
                  y: [-6, 6, -6],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Developer Credit - Fixed at Bottom */}
      <motion.div
        variants={developerVariants}
        initial="hidden"
        animate="visible"
        className="absolute bottom-8 left-0 right-0 text-center px-4"
      >
        <p className="text-gray-700 dark:text-gray-300 text-sm font-medium">
          Built with ❤️ by{' '}
          <a 
            href={APP_CONFIG.WEBSITE} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline transition-colors"
          >
            {APP_CONFIG.DEVELOPER}
          </a>
        </p>
        <div className="flex justify-center items-center space-x-4 mt-2">
          <a 
            href={APP_CONFIG.LINKEDIN} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            LinkedIn
          </a>
          <span className="text-gray-400">•</span>
          <a 
            href={APP_CONFIG.REPOSITORY} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            GitHub
          </a>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Version {APP_CONFIG.VERSION}
        </p>
      </motion.div>
    </div>
  );
}; 