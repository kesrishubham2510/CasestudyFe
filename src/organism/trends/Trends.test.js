import { render, screen } from '@testing-library/react';
import Trends from './Trends';

// Mock TrendTile
jest.mock('../../molecule/trendtile/TrendTile', () => (props) => (
  <div data-testid="trend-tile">
    <span>{props.header}</span>
    <span data-testid="data-prop">
      {props.data ? 'HAS_DATA' : 'NO_DATA'}
    </span>
  </div>
));

describe('Trends Component', () => {

  const mockTrendsData = {
    India: { trends: [] },
    global: { trends: [] }
  };

  test('renders both TrendTiles with correct data', () => {
    render(
      <Trends
        country="India"
        trendsData={mockTrendsData}
      />
    );

    const tiles = screen.getAllByTestId('trend-tile');
    expect(tiles).toHaveLength(2);

    expect(screen.getByText('Country Insights')).toBeInTheDocument();
    expect(screen.getByText('Global Insights')).toBeInTheDocument();

    // Both should have data
    expect(screen.getAllByText('HAS_DATA')).toHaveLength(2);
  });

  test('passes undefined when country does not exist', () => {
    render(
      <Trends
        country="USA"
        trendsData={mockTrendsData}
      />
    );

    const dataStatus = screen.getAllByTestId('data-prop');

    // First tile (country insights) should have NO_DATA
    expect(dataStatus[0]).toHaveTextContent('NO_DATA');

    // Second tile (global) should still have data
    expect(dataStatus[1]).toHaveTextContent('HAS_DATA');
  });

});