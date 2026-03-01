import { render, screen } from '@testing-library/react';
import TrendTile from './TrendTile';

// Mock DataTile
jest.mock('../datatile/DataTile', () => (props) => (
  <div data-testid="data-tile">
    <span>Days: {props.days}</span>
    <span>Average: {props.dailyAverage}</span>
    <span>Change: {props.change}</span>
    <span>Direction: {props.direction}</span>
    <span>Message: {props.message}</span>
  </div>
));

describe('TrendTile Component', () => {

  const mockProps = {
    header: 'Weekly Trends',
    data: {
      trends: [
        {
          dailyAverage: 100,
          changePercentage: 5.5,
          direction: 'UP',
          alertMessage: 'Increasing'
        },
        {
          dailyAverage: 80,
          changePercentage: -3.2,
          direction: 'DOWN',
          alertMessage: 'Decreasing'
        }
      ]
    }
  };

  test('renders header and all trend tiles correctly', () => {
    render(<TrendTile {...mockProps} />);

    // Header check
    expect(screen.getByText('Weekly Trends')).toBeInTheDocument();

    // Should render 2 DataTiles
    const tiles = screen.getAllByTestId('data-tile');
    expect(tiles).toHaveLength(2);

    // Check incremented days logic (7, 14)
    expect(screen.getByText('Days: 7')).toBeInTheDocument();
    expect(screen.getByText('Days: 14')).toBeInTheDocument();

    // Check first trend data
    expect(screen.getByText('Average: 100')).toBeInTheDocument();
    expect(screen.getByText('Change: 5.5')).toBeInTheDocument();
    expect(screen.getByText('Direction: UP')).toBeInTheDocument();
    expect(screen.getByText('Message: Increasing')).toBeInTheDocument();

    // Check second trend data
    expect(screen.getByText('Average: 80')).toBeInTheDocument();
    expect(screen.getByText('Change: -3.2')).toBeInTheDocument();
    expect(screen.getByText('Direction: DOWN')).toBeInTheDocument();
    expect(screen.getByText('Message: Decreasing')).toBeInTheDocument();
  });

});