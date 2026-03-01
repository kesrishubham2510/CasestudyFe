import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Comparision from "./Comparision";
import { AppContext } from "../../context/AppContext";

// ---------------- MOCK NAVIGATE ----------------
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: jest.fn(),
  };
});

import { useLocation } from "react-router-dom";

// ---------------- MOCK ComparisionCard ----------------
jest.mock("../../atom/comparisionCard/ComparisionCard", () => (props) => (
  <div data-testid="comparision-card">
    Card-{props.country}-{props.totalCases}-{props.recovered}-{props.activeToday}-{props.dosesAdministered}
  </div>
));

// ---------------- RENDER HELPER ----------------
const renderComponent = ({
  offlineMode = false,
  locationState = [],
  beginningDate = "2020-02-05",
} = {}) => {

  useLocation.mockReturnValue({ state: locationState });

  return render(
    <AppContext.Provider
      value={{
        state: {
          offlineMode,
          beginningDate,
        },
      }}
    >
      <MemoryRouter>
        <Comparision />
      </MemoryRouter>
    </AppContext.Provider>
  );
};

describe("Comparision Component", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders multiple comparison cards", () => {
    const mockData = [
      {
        country: "India",
        noOfCases: 1000,
        noOfRecoveries: 900,
        activeAsToday: 100,
        dosesAdministeredInCountry: 500,
      },
      {
        country: "USA",
        noOfCases: 2000,
        noOfRecoveries: 1500,
        activeAsToday: 500,
        dosesAdministeredInCountry: 1000,
      },
    ];

    renderComponent({ locationState: mockData });

    const cards = screen.getAllByTestId("comparision-card");
    expect(cards.length).toBe(2);

    expect(cards[0]).toHaveTextContent("Card-India-1000-900-100-500");
    expect(cards[1]).toHaveTextContent("Card-USA-2000-1500-500-1000");
  });

  test("uses fallback values when fields are missing", () => {
    const mockData = [
      {
        country: "India",
      },
    ];

    renderComponent({ locationState: mockData });

    const card = screen.getByTestId("comparision-card");

    expect(card).toHaveTextContent("Card-India-0-0-0-0");
  });

  test("uses fallback country when missing", () => {
    const mockData = [{}];

    renderComponent({ locationState: mockData });

    const card = screen.getByTestId("comparision-card");

    expect(card).toHaveTextContent("Card-Abcd-0-0-0-0");
  });

  test("shows referencedDate in header when available", () => {
    const mockData = [];
    mockData.referencedDate = "10-02-2020";

    renderComponent({ locationState: mockData });

    expect(
      screen.getByText(/Covid-19 Stats Comparision 10-02-2020/)
    ).toBeInTheDocument();
  });

  test("shows beginningDate when referencedDate is missing", () => {
    renderComponent({
      locationState: [],
      beginningDate: "2020-02-05",
    });

    expect(
      screen.getByText(/Covid-19 Stats Comparision/)
    ).toBeInTheDocument();
  });

  test("redirects to covid-info when offlineMode is true", async () => {
    renderComponent({
      offlineMode: true,
      locationState: [],
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/covid-info");
    });
  });

});