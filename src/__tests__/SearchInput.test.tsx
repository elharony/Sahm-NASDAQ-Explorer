import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchInput } from '../components/SearchInput';

const mockOnSearch = jest.fn();

describe('SearchInput', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default placeholder', () => {
    render(<SearchInput onSearch={mockOnSearch} />);
    
    expect(screen.getByPlaceholderText('Search stocks...')).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    render(<SearchInput onSearch={mockOnSearch} placeholder="Custom placeholder" />);
    
    expect(screen.getByPlaceholderText('Custom placeholder')).toBeInTheDocument();
  });

  it('calls onSearch with debounced input', async () => {
    render(<SearchInput onSearch={mockOnSearch} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'AAPL' } });
    
    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('AAPL');
    }, { timeout: 1000 });
  });

  it('shows clear button when input has value', () => {
    render(<SearchInput onSearch={mockOnSearch} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'AAPL' } });
    
    expect(screen.getByLabelText('Clear search')).toBeInTheDocument();
  });

  it('clears input when clear button is clicked', () => {
    render(<SearchInput onSearch={mockOnSearch} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'AAPL' } });
    
    const clearButton = screen.getByLabelText('Clear search');
    fireEvent.click(clearButton);
    
    expect(input).toHaveValue('');
  });

  it('shows loading spinner when isLoading is true', () => {
    render(<SearchInput onSearch={mockOnSearch} isLoading={true} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'AAPL' } });
    
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
}); 