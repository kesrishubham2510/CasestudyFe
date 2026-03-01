import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PageTemplate from "./PageTemplate";
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

// ---------------- RENDER HELPER ----------------
const renderComponent = ({
  pathname = "/",
  offlineMode = false,
  toggleButtonText = "Enable Offline Mode",
} = {}) => {
  const mockSetState = jest.fn();

  useLocation.mockReturnValue({ pathname });

  render(
    <AppContext.Provider
      value={{
        state: {
          offlineMode,
          toggleButtonText,
        },
        setState: mockSetState,
      }}
    >
      <MemoryRouter>
        <PageTemplate component={<div>Child Component</div>} />
      </MemoryRouter>
    </AppContext.Provider>
  );

  return { mockSetState };
};

describe("PageTemplate Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders child component", () => {
    renderComponent();
    expect(screen.getByText("Child Component")).toBeInTheDocument();
  });

  test("home button disabled on root path", () => {
    renderComponent({ pathname: "/" });

    const homeButton = screen.getByText("Home");
    expect(homeButton).toBeDisabled();
  });

  test("home button disabled when offline mode is true", () => {
    renderComponent({ pathname: "/stats", offlineMode: true });

    const homeButton = screen.getByText("Home");
    expect(homeButton).toBeDisabled();
  });

  test("home button navigates to / when enabled", () => {
    renderComponent({ pathname: "/stats", offlineMode: false });

    const homeButton = screen.getByText("Home");
    fireEvent.click(homeButton);

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  test("toggle enables offline mode when currently online", () => {
    const { mockSetState } = renderComponent({
      offlineMode: false,
      toggleButtonText: "Enable Offline Mode",
    });

    const toggleButton = screen.getByText("Enable Offline Mode");

    fireEvent.click(toggleButton);

    expect(mockSetState).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/covid-info");
  });

  test("toggle enables online mode when currently offline", () => {
    const { mockSetState } = renderComponent({
      offlineMode: true,
      toggleButtonText: "Enable Online Mode",
    });

    const toggleButton = screen.getByText("Enable Online Mode");

    fireEvent.click(toggleButton);

    expect(mockSetState).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});