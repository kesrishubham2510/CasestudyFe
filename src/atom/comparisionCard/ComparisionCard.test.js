import {render, screen} from '@testing-library/react';
import ComparisionCard from './ComparisionCard';

describe('ComparisionCard Component', () => {

  const mockProps = {
    country: 'India',
    totalCases: '1000000',
    activeToday: '50000',
    dosesAdministered: '800000',
    recovered: '900000'
  };

  test('renders all comparison data correctly', () => {
    render(<ComparisionCard {...mockProps} />);

   
    expect(screen.getByRole('heading', { level: 3 }))
      .toHaveTextContent(mockProps.country);
   
    expect(screen.getByText('Total Cases')).toBeInTheDocument();
    expect(screen.getByText('Active Cases')).toBeInTheDocument();
    expect(screen.getByText('Vaccinated')).toBeInTheDocument();
    expect(screen.getByText('Recoveries')).toBeInTheDocument();

    expect(screen.getByText(mockProps.totalCases)).toBeInTheDocument();
    expect(screen.getByText(mockProps.activeToday)).toBeInTheDocument();
    expect(screen.getByText(mockProps.dosesAdministered)).toBeInTheDocument();
    expect(screen.getByText(mockProps.recovered)).toBeInTheDocument();
  });

});