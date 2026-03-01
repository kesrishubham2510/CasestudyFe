import { render, screen, fireEvent } from '@testing-library/react';
import Toast from './Toast';
import { act } from 'react-dom/test-utils';

describe('Toast Component', () => {

  beforeEach(() => {
    jest.useFakeTimers(); // control setTimeout
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('renders message and default type', () => {
    const mockOnClose = jest.fn();

    render(<Toast message="Test Message" onClose={mockOnClose} />);

    const toast = screen.getByText('Test Message');
    expect(toast).toBeInTheDocument();

    // Default type = info
    expect(toast.closest('div')).toHaveClass('toast-info');
  });

  test('calls onClose when close button is clicked', () => {
    const mockOnClose = jest.fn();

    render(<Toast message="Test" onClose={mockOnClose} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('calls onClose after 3 seconds automatically', () => {
    const mockOnClose = jest.fn();

    render(<Toast message="Auto close test" onClose={mockOnClose} />);

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

});