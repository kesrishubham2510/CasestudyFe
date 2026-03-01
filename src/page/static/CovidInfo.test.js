import { render, screen, fireEvent } from "@testing-library/react";
import CovidInfo from "./CovidInfo";
import { useLocation } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
}));

jest.mock("../../molecule/toast/Toast", () => ({ message, onClose }) => (
  <div data-testid="toast">
    <span>{message}</span>
    <button onClick={onClose}>Close</button>
  </div>
));

describe("CovidInfo Component", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders heading and all covid facts", () => {
    useLocation.mockReturnValue({ state: null });

    render(<CovidInfo />);

    expect(screen.getByText("Essential COVID-19 Facts")).toBeInTheDocument();

    expect(screen.getByText(/1\. Transmission/)).toBeInTheDocument();
    expect(screen.getByText(/2\. Common Symptoms/)).toBeInTheDocument();
    expect(screen.getByText(/3\. Vaccination Impact/)).toBeInTheDocument();
    expect(screen.getByText(/4\. Prevention Basics/)).toBeInTheDocument();
    expect(screen.getByText(/5\. Variant Evolution/)).toBeInTheDocument();
    expect(screen.getByText(/6\. Asymptomatic Spread/)).toBeInTheDocument();
  });

  test("shows Toast when loadedDueToError is true", async () => {
    useLocation.mockReturnValue({
      state: { loadedDueToError: true },
    });

    render(<CovidInfo />);

    expect(
      await screen.findByText("Connection failed, Let's browse facts")
    ).toBeInTheDocument();
  });

  test("closes Toast when close button is clicked", async () => {
    useLocation.mockReturnValue({
      state: { loadedDueToError: true },
    });

    render(<CovidInfo />);

    const closeButton = await screen.findByText("Close");
    fireEvent.click(closeButton);

    expect(
      screen.queryByText("Connection failed, Let's browse facts")
    ).not.toBeInTheDocument();
  });

});