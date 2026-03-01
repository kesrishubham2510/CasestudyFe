import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Welcome from "./Welcome";
import { AppContext } from "../../context/AppContext";
import { dataSource } from "../../connection/APIConnection";

// Mock navigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// Mock API
jest.mock("../../connection/APIConnection", () => ({
  dataSource: {
    countryStats: jest.fn(),
    comparisionStats: jest.fn(),
  },
}));

// Mock Toast
jest.mock("../../molecule/toast/Toast", () => (props) => (
  <div data-testid="toast">
    <span>{props.message}</span>
    <button onClick={props.onClose}>close</button>
  </div>
));

const renderComponent = (offlineMode = false) => {
  return render(
    <AppContext.Provider
      value={{
        state: {
          offlineMode,
          dashboardTitle: "COVID Dashboard",
          beginningDate: "2020-02-05",
        },
      }}
    >
      <MemoryRouter>
        <Welcome />
      </MemoryRouter>
    </AppContext.Provider>
  );
};

describe("Welcome Component", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly", () => {
    renderComponent();
    expect(screen.getByText("COVID Dashboard")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Provide comma separared/i)).toBeInTheDocument();
  });

  test("redirects to covid-info when offlineMode is true", async () => {
    renderComponent(true);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/covid-info");
    });
  });

  test("updates input values on change", () => {
    renderComponent();

    const input = screen.getByPlaceholderText(/Provide comma separared/i);
    fireEvent.change(input, { target: { id: "countryName", value: "India" } });

    expect(input.value).toBe("India");
  });

  test("shows error toast for invalid country", async () => {
    renderComponent();

    const input = screen.getByPlaceholderText(/Provide comma separared/i);
    fireEvent.change(input, { target: { id: "countryName", value: "InvalidCountry" } });

    fireEvent.click(screen.getByText("Search"));

    await waitFor(() => {
      expect(screen.getByText(/Invalid/)).toBeInTheDocument();
    });
  });

  test("calls countryStats and navigates to /stats for single country", async () => {
    dataSource.countryStats.mockResolvedValue({ some: "data" });

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(/Provide comma separared/i), {
      target: { id: "countryName", value: "India" },
    });

    fireEvent.click(screen.getByText("Search"));

    await waitFor(() => {
      expect(dataSource.countryStats).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith("/stats", {
        state: { some: "data" },
      });
    });
  });

  test("calls comparisionStats and navigates for 2 countries", async () => {
    dataSource.comparisionStats.mockResolvedValue({ compare: "data" });

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(/Provide comma separared/i), {
      target: { id: "countryName", value: "India,USA" },
    });

    fireEvent.click(screen.getByText("Search"));

    await waitFor(() => {
      expect(dataSource.comparisionStats).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith("/comparision", {
        state: { compare: "data" },
      });
    });
  });

  test("calls comparisionStats for 3 countries", async () => {
    dataSource.comparisionStats.mockResolvedValue({ compare: "data" });

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(/Provide comma separared/i), {
      target: { id: "countryName", value: "India,USA,UK" },
    });

    fireEvent.click(screen.getByText("Search"));

    await waitFor(() => {
      expect(dataSource.comparisionStats).toHaveBeenCalled();
    });
  });

  test("calls comparisionStats for 4 countries", async () => {
    dataSource.comparisionStats.mockResolvedValue({ compare: "data" });

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(/Provide comma separared/i), {
      target: { id: "countryName", value: "India,USA,UK,France" },
    });

    fireEvent.click(screen.getByText("Search"));

    await waitFor(() => {
      expect(dataSource.comparisionStats).toHaveBeenCalled();
    });
  });

  test("redirects to covid-info on fetch failure", async () => {
    dataSource.countryStats.mockRejectedValue(new Error("Failed to fetch"));

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(/Provide comma separared/i), {
      target: { id: "countryName", value: "India" },
    });

    fireEvent.click(screen.getByText("Search"));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/covid-info", {
        state: { loadedDueToError: true },
      });
    });
  });
});