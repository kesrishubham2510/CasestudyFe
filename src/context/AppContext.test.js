import { render, screen, fireEvent } from "@testing-library/react";
import { useContext } from "react";
import AppContextProvider, { AppContext } from "../context/AppContext";


function TestComponent() {
  const { state, setState } = useContext(AppContext);

  return (
    <div>
      <p data-testid="country">{state.currCountry}</p>
      <p data-testid="offline">{state.offlineMode.toString()}</p>

      <button
        onClick={() =>
          setState(prev => ({
            ...prev,
            currCountry: "USA",
            offlineMode: true
          }))
        }
      >
        Update State
      </button>
    </div>
  );
}

describe("AppContextProvider", () => {

  test("should provide initial state", () => {
    render(
      <AppContextProvider>
        <TestComponent />
      </AppContextProvider>
    );

    expect(screen.getByTestId("country").textContent).toBe("India");
    expect(screen.getByTestId("offline").textContent).toBe("false");
  });

  test("should update state correctly", () => {
    render(
      <AppContextProvider>
        <TestComponent />
      </AppContextProvider>
    );

    fireEvent.click(screen.getByText("Update State"));

    expect(screen.getByTestId("country").textContent).toBe("USA");
    expect(screen.getByTestId("offline").textContent).toBe("true");
  });

});