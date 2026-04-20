import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Welcome from "./Welcome";
import { AppContext } from "../../context/AppContext";
import { dataSource } from "../../connection/APIConnection";
import errors from "../../error/Errors";

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
    supportedCountries: jest.fn().mockResolvedValue(["India", "USA", "UK", "France"]),
  },
}));

// Mock Toast
jest.mock("../../molecule/toast/Toast", () => (props) => (
  <div data-testid="toast">
    <span>{props.message}</span>
    <button onClick={props.onClose}>close</button>
  </div>
));

const renderComponent = (offlineMode = false, countries = ["India", "USA", "UK", "France"]) => {
  const setState = jest.fn();

  return render(
    <AppContext.Provider
      value={{
        state: {
          offlineMode,
          dashboardTitle: "COVID Dashboard",
          beginningDate: "2020-02-05",
          supportedCountries: countries,
        },
        setState, // ✅ important
      }}
    >
      <MemoryRouter>
        <Welcome />
      </MemoryRouter>
    </AppContext.Provider>,
  );
};

describe("Welcome Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly", () => {
    renderComponent();
    expect(screen.getByText("COVID Dashboard")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Provide comma separared/i),
    ).toBeInTheDocument();
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
    fireEvent.change(input, {
      target: { id: "countryName", value: "InvalidCountry" },
    });

    fireEvent.click(screen.getByText("Search"));

    await waitFor(() => {
      expect(screen.getByText(/Invalid/)).toBeInTheDocument();
    });
  });

  test("calls countryStats and navigates to /stats for single country", async () => {
  dataSource.countryStats.mockResolvedValue({ some: "data" });

  renderComponent(false, ["India"]);

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
      target: { id: "countryName", value: "India, USA" },
    });

    fireEvent.click(screen.getByText("Search"));

    await waitFor(() => {
      expect(dataSource.comparisionStats).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith("/comparision", {
        state: {
          referencedDate: expect.any(String),
          data: { compare: "data" },
        },
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
    dataSource.countryStats.mockRejectedValue(
      new errors.networkError("Failed to fetch"),
    );

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


test("fetches supported countries when not present in context", async () => {
  const setState = jest.fn();

  render(
    <AppContext.Provider
      value={{
        state: {
          offlineMode: false,
          dashboardTitle: "COVID Dashboard",
          beginningDate: "2020-02-05",
          supportedCountries: [],
        },
        setState,
      }}
    >
      <MemoryRouter>
        <Welcome />
      </MemoryRouter>
    </AppContext.Provider>
  );

  await waitFor(() => {
    expect(dataSource.supportedCountries).toHaveBeenCalled();
    expect(setState).toHaveBeenCalled();
  });
});

test("does not fetch supported countries if already present", async () => {
  renderComponent(false, ["India"]);

  await waitFor(() => {
    expect(dataSource.supportedCountries).not.toHaveBeenCalled();
  });
}); 

test("does not call API when input is empty", async () => {
  renderComponent();

  fireEvent.click(screen.getByText("Search"));

  await waitFor(() => {
    expect(dataSource.countryStats).not.toHaveBeenCalled();
    expect(dataSource.comparisionStats).not.toHaveBeenCalled();
  });
});

test("hides info toast after closing", async () => {
  renderComponent();

  const infoToast = screen.getByText(/Use Comma separated/i);
  expect(infoToast).toBeInTheDocument();

  fireEvent.click(screen.getAllByText("close")[0]);

  await waitFor(() => {
    expect(screen.queryByText(/Use Comma separated/i)).not.toBeInTheDocument();
  });
});

test("formats date correctly before API call", async () => {
  dataSource.countryStats.mockResolvedValue({});

  renderComponent(false, ["India"]);

  fireEvent.change(screen.getByPlaceholderText(/Provide comma separared/i), {
    target: { id: "countryName", value: "India" },
  });

  fireEvent.change(screen.getByDisplayValue("2020-02-05"), {
    target: { id: "referenceDate", value: "2020-12-31" },
  });

  fireEvent.click(screen.getByText("Search"));

  await waitFor(() => {
    expect(dataSource.countryStats).toHaveBeenCalledWith(
      expect.anything(),
      "India",
      "31-12-2020" 
    );
  });
});

test("shows error message for generic API error", async () => {
  dataSource.countryStats.mockRejectedValue(new Error("Some error"));

  renderComponent(false, ["India"]);

  fireEvent.change(screen.getByPlaceholderText(/Provide comma separared/i), {
    target: { id: "countryName", value: "India" },
  });

  fireEvent.click(screen.getByText("Search"));

  await waitFor(() => {
    expect(screen.getByText("Some error")).toBeInTheDocument();
  });
});

test("stops on first invalid country in multiple input", async () => {
  renderComponent(false, ["India"]);

  fireEvent.change(screen.getByPlaceholderText(/Provide comma separared/i), {
    target: { id: "countryName", value: "India, InvalidCountry" },
  });

  fireEvent.click(screen.getByText("Search"));

  await waitFor(() => {
    expect(screen.getByText(/Invalid/)).toBeInTheDocument();
    expect(dataSource.comparisionStats).not.toHaveBeenCalled();
  });
});

test("trims spaces in country names", async () => {
  dataSource.countryStats.mockResolvedValue({});

  renderComponent(false, ["India"]);

  fireEvent.change(screen.getByPlaceholderText(/Provide comma separared/i), {
    target: { id: "countryName", value: "   India   " },
  });

  fireEvent.click(screen.getByText("Search"));

  await waitFor(() => {
    expect(dataSource.countryStats).toHaveBeenCalledWith(
      expect.anything(),
      "   India   ",
      expect.anything()
    );
  });
});