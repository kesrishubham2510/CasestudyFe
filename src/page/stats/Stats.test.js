import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Stats from "./Stats";
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

// ---------------- MOCK CHILD COMPONENTS ----------------
jest.mock("../../organism/lateststats/LatestStats", () => (props) => (
  <div data-testid="latest-stats">
    LatestStats-{props.totalCases}-{props.recovered}-{props.activeToday}
  </div>
));

jest.mock("../../organism/vaccinationdata/VaccinationData", () => (props) => (
  <div data-testid="vaccination-data">
    VaccinationData-{props.country}-{props.dosesAdministeredInCountry}-{props.dosesAdministeredGlobally}
  </div>
));

jest.mock("../../organism/trends/Trends", () => (props) => (
  <div data-testid="trends">
    Trends-{props.country}
  </div>
));

// ---------------- RENDER HELPER ----------------
const renderComponent = (offlineMode = false, locationState) => {
  useLocation.mockReturnValue({ state: locationState });

  return render(
    <AppContext.Provider
      value={{
        state: {
          offlineMode,
        },
      }}
    >
      <MemoryRouter>
        <Stats />
      </MemoryRouter>
    </AppContext.Provider>
  );
};

describe("Stats Component", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly with valid data", () => {
    const mockData = {
      country: "India",
      noOfCases: 1000,
      noOfRecoveries: 900,
      activeAsToday: 100,
      dosesAdministeredInCountry: 500,
      dosesAdministeredGlobally: 10000,
      trends: [],
    };

    renderComponent(false, mockData);

    expect(
      screen.getByText("Covid-19 update for India")
    ).toBeInTheDocument();

    expect(screen.getByTestId("latest-stats")).toHaveTextContent(
      "LatestStats-1000-900-100"
    );

    expect(screen.getByTestId("vaccination-data")).toHaveTextContent(
      "VaccinationData-India-500-10000"
    );

    expect(screen.getByTestId("trends")).toHaveTextContent("Trends-India");
  });

  test("uses fallback values when numbers are missing", () => {
    const mockData = {
      country: "USA",
      trends: [],
    };

    renderComponent(false, mockData);

    expect(screen.getByTestId("latest-stats")).toHaveTextContent(
      "LatestStats-0-0-0"
    );

    expect(screen.getByTestId("vaccination-data")).toHaveTextContent(
      "VaccinationData-USA-0-0"
    );
  });

  test("redirects to covid-info when offlineMode is true", async () => {
    const mockData = {
      country: "India",
      trends: [],
    };

    renderComponent(true, mockData);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/covid-info");
    });
  });

});