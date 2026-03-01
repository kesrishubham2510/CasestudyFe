import { render, screen } from '@testing-library/react';
import LatestStat from './LatestStat';

// Mock child components
jest.mock('../../atom/texttile/TextTile', () => (props) => (
  <div data-testid="text-tile">{props.text}</div>
));

jest.mock('../../atom/numbertile/NumberTile', () => (props) => (
  <div data-testid="number-tile">{props.number}</div>
));

describe('LatestStat Component', () => {

  const mockProps = {
    background: 'bg-red',
    image: 'test-image.png',
    text: 'Total Cases',
    number: 123456
  };

  test('renders correctly with all props', () => {
    render(<LatestStat {...mockProps} />);

    // Check wrapper class
    const wrapper = screen.getByRole('img').closest('div');
    expect(wrapper).toHaveClass('stat-tile');
    expect(wrapper).toHaveClass('bg-red');

    // Check image src
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', mockProps.image);

    // Check TextTile rendering
    expect(screen.getByTestId('text-tile'))
      .toHaveTextContent(mockProps.text);

    // Check NumberTile rendering
    expect(screen.getByTestId('number-tile'))
      .toHaveTextContent(mockProps.number.toString());
  });

});