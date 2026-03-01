import { render, screen } from '@testing-library/react';
import LatestStats from './LatestStats';

// Mock LatestStat component
jest.mock('../../molecule/lateststat/LatestStat', () => (props) => (
  <div data-testid="latest-stat">
    <span>{props.text}</span>
    <span>{props.number}</span>
    <span>{props.background}</span>
  </div>
));

describe('LatestStats Component', () => {

  test('renders all statistics with provided values', () => {
    render(
      <LatestStats
        totalCases={1000}
        recovered={800}
        activeToday={200}
      />
    );

    // Header check
    expect(screen.getByText('National Statistics')).toBeInTheDocument();

    // Should render 3 LatestStat components
    const stats = screen.getAllByTestId('latest-stat');
    expect(stats).toHaveLength(3);

    // Verify values passed correctly
    expect(screen.getByText('Total Cases')).toBeInTheDocument();
    expect(screen.getByText('1000')).toBeInTheDocument();

    expect(screen.getByText('Total Recovered')).toBeInTheDocument();
    expect(screen.getByText('800')).toBeInTheDocument();

    expect(screen.getByText('Active Today')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
  });

  test('uses fallback value 0 when props are missing', () => {
    render(<LatestStats />);

    const stats = screen.getAllByTestId('latest-stat');

    // All numbers should default to 0
    expect(screen.getAllByText('0')).toHaveLength(3);
  });

});