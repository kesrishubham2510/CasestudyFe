import { render, screen, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NotFound from "./NotFound";

// ---------------- MOCK NAVIGATE ----------------
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("NotFound Component", () => {

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test("renders not found message", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(
      screen.getByText("Page does not exist, redirecting to home page...")
    ).toBeInTheDocument();
  });

  test("redirects to home after 2 seconds", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    // Fast-forward 2 seconds
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  test("clears timer on unmount", () => {
    const { unmount } = render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    unmount();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    // navigate should NOT be called after unmount
    expect(mockNavigate).not.toHaveBeenCalled();
  });

});