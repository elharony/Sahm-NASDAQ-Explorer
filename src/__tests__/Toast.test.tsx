import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Toast } from '../components/Toast';

describe('Toast', () => {
  const mockOnClose = jest.fn();
  const mockOnAction = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders when isOpen is true', () => {
    render(
      <Toast
        isOpen={true}
        type="info"
        message="Test message"
        onClose={mockOnClose}
      />
    );
    
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(
      <Toast
        isOpen={false}
        type="info"
        message="Test message"
        onClose={mockOnClose}
      />
    );
    
    expect(screen.queryByText('Test message')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(
      <Toast
        isOpen={true}
        type="info"
        message="Test message"
        onClose={mockOnClose}
      />
    );
    
    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('renders action button when actionLabel and onAction are provided', () => {
    render(
      <Toast
        isOpen={true}
        type="warning"
        message="Rate limit exceeded"
        actionLabel="Retry"
        onAction={mockOnAction}
        onClose={mockOnClose}
      />
    );
    
    expect(screen.getByText('Retry')).toBeInTheDocument();
  });

  it('calls onAction when action button is clicked', () => {
    render(
      <Toast
        isOpen={true}
        type="warning"
        message="Rate limit exceeded"
        actionLabel="Retry"
        onAction={mockOnAction}
        onClose={mockOnClose}
      />
    );
    
    const actionButton = screen.getByText('Retry');
    fireEvent.click(actionButton);
    
    expect(mockOnAction).toHaveBeenCalled();
  });

  it('applies correct styles for different types', () => {
    const { rerender } = render(
      <Toast
        isOpen={true}
        type="info"
        message="Info message"
        onClose={mockOnClose}
      />
    );
    
    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('bg-gray-900');
    
    rerender(
      <Toast
        isOpen={true}
        type="error"
        message="Error message"
        onClose={mockOnClose}
      />
    );
    
    expect(toast).toHaveClass('bg-red-600');
  });
}); 