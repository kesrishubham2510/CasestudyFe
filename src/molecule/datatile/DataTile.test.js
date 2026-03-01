import { render, screen } from '@testing-library/react';
import DataTile from './DataTile';

describe('DataTile Component', () => {

  const baseProps = {
    dailyAverage: 12345.67,
    days: 7,
    change: 5.6789,
    message: 'Cases are increasing'
  };

  test('renders correctly with UP direction', () => {
    render(<DataTile {...baseProps} direction="UP" />);

    // Average value formatting
    expect(screen.getByText(/Avg:-/)).toHaveTextContent('12,345');

    // Days display
    expect(screen.getByText('7 Days')).toBeInTheDocument();

    // UP symbol
    expect(screen.getByText(/⬆/)).toBeInTheDocument();

    // Change formatted to 2 decimal places
    expect(screen.getByText(/5.68/)).toBeInTheDocument();

    // Message
    expect(screen.getByText(baseProps.message)).toBeInTheDocument();
  });

  test('renders correctly with DOWN direction', () => {
    render(<DataTile {...baseProps} direction="DOWN" />);

    // DOWN symbol
    expect(screen.getByText(/⬇/)).toBeInTheDocument();
  });

});