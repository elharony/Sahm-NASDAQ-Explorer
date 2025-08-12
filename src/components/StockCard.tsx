import React from 'react';
import { Stock } from '../types/stock';

interface StockCardProps {
  stock: Stock;
  index?: number;
  className?: string;
}

export const StockCard: React.FC<StockCardProps> = ({ 
  stock, 
  index = 0,
  className = '' 
}) => {
  const isActive = stock.active;

  return (
    <div
      data-testid="stock-card"
      className={`
        bg-white dark:bg-dark-800 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 
        p-4 sm:p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer
        ${!isActive ? 'opacity-60' : ''}
        ${className}
      `}
    >
      <div className="mb-3 sm:mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1">
          {stock.ticker}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
          {stock.name}
        </p>
      </div>

      <div className="flex items-center justify-between text-xs sm:text-sm">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          isActive 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
        }`}>
          {isActive ? 'Active' : 'Inactive'}
        </span>
        <span className="text-gray-500 dark:text-gray-400">
          {stock.type}
        </span>
      </div>
    </div>
  );
}; 