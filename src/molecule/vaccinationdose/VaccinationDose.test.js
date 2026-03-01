import { render, screen } from '@testing-library/react';
import VaccinationDose from './VaccinationDose';

// Mock child components
jest.mock('../../atom/texttile/TextTile', () => (props) => (
  <div data-testid="text-tile">{props.text}</div>
));

jest.mock('../../atom/numbertile/NumberTile', () => (props) => (
  <div data-testid="number-tile">{props.number}</div>
));

describe('VaccinationDose Component', () => {

  const mockProps = {
    text: 'Total Doses',
    number: 1234567
  };

  test('renders correctly with provided props', () => {
    render(<VaccinationDose {...mockProps} />);

    // Wrapper exists
    const wrapper = screen.getByTestId('text-tile').closest('.vaccinationdose-tile');
    expect(wrapper).toBeInTheDocument();

    // TextTile receives correct text
    expect(screen.getByTestId('text-tile'))
      .toHaveTextContent(mockProps.text);

    // NumberTile receives correct number
    expect(screen.getByTestId('number-tile'))
      .toHaveTextContent(mockProps.number.toString());
  });

});