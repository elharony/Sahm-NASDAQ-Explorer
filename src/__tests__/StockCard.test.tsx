import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StockCard } from '../components/StockCard';
import { Stock } from '../types/stock';

const mockStock: Stock = {
  ticker: 'AAPL',
  name: 'Apple Inc.',
  market: 'stocks',
  locale: 'us',
  primary_exchange: 'XNAS',
  type: 'CS',
  active: true,
  currency_name: 'usd',
};

describe('StockCard', () => {
  it('renders stock information correctly', () => {
    render(<StockCard stock={mockStock} />);
    
    expect(screen.getByText('AAPL')).toBeInTheDocument();
    expect(screen.getByText('Apple Inc.')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('CS')).toBeInTheDocument();
  });

  it('renders without click functionality', () => {
    render(<StockCard stock={mockStock} />);
    
    const card = screen.getByTestId('stock-card');
    expect(card).toBeInTheDocument();
  });

  it('displays inactive status correctly', () => {
    const inactiveStock = { ...mockStock, active: false };
    render(<StockCard stock={inactiveStock} />);
    
    expect(screen.getByText('Inactive')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<StockCard stock={mockStock} className="custom-class" />);
    const card = screen.getByTestId('stock-card');
    expect(card).toHaveClass('custom-class');
  });
}); 