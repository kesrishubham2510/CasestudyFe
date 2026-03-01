import { render, screen } from '@testing-library/react';
import VaccinationData from './VaccinationData';
import { AppContext } from '../../context/AppContext';

// Mock VaccinationDose
jest.mock('../../molecule/vaccinationdose/VaccinationDose', () => (props) => (
  <div data-testid="vaccination-dose">
    <span>{props.text}</span>
    <span>{props.number}</span>
  </div>
));

describe('VaccinationData Component', () => {

  const mockContextValue = {
    someValue: 'test'
  };

  test('renders vaccination data with provided values', () => {
    render(
      <AppContext.Provider value={mockContextValue}>
        <VaccinationData
          country="India"
          dosesAdministeredInCountry={1000}
          dosesAdministeredGlobally={5000}
        />
      </AppContext.Provider>
    );

    // Header
    expect(screen.getByText('Vaccination Date')).toBeInTheDocument();

    // Two VaccinationDose components
    const doses = screen.getAllByTestId('vaccination-dose');
    expect(doses).toHaveLength(2);

    // Dynamic country text
    expect(screen.getByText('Doses administered in India')).toBeInTheDocument();
    expect(screen.getByText('1000')).toBeInTheDocument();

    // Global text
    expect(screen.getByText('Doses administered Globally')).toBeInTheDocument();
    expect(screen.getByText('5000')).toBeInTheDocument();
  });

  test('falls back to 0 when values are missing', () => {
    render(
      <AppContext.Provider value={mockContextValue}>
        <VaccinationData country="India" />
      </AppContext.Provider>
    );

    // Should default both numbers to 0
    expect(screen.getAllByText('0')).toHaveLength(2);
  });

});