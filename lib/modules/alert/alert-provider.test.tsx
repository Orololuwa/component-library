import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { AlertProvider } from "./provider";
import useAlert from "./use-alert";
import React from "react";

const TestComponent = () => {
  useAlert();
  return <div>Alert context is available</div>;
};

const MESSAGE = "Test alert!";

describe("AlertProvider", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("provides context to children", () => {
    render(
      <AlertProvider>
        <TestComponent />
      </AlertProvider>
    );
    expect(screen.getByText("Alert context is available")).toBeInTheDocument();
  });

  it("throws error if used outside provider", () => {
    // Suppress error output for this test
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<TestComponent />)).toThrow(
      "useAlert must be used within an AlertProvider"
    );
    spy.mockRestore();
  });

  it("showAlert shows the alert and dismisses it after 3 seconds", async () => {
    const ShowAlert = () => {
      const { showAlert } = useAlert();
      React.useEffect(() => {
        showAlert(MESSAGE, "success");
      }, []);
      return null;
    };

    render(
      <AlertProvider>
        <ShowAlert />
      </AlertProvider>
    );

    expect(screen.getByText(MESSAGE)).toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.queryByText(MESSAGE)).not.toBeInTheDocument();
  });

  it("updateAlert properly updates alert", () => {
    const ShowAndUpdateAlert = () => {
      const { showAlert, updateAlert } = useAlert();
      React.useEffect(() => {
        const id = showAlert(MESSAGE, "success", true);
        setTimeout(() => {
          updateAlert(id, "Updated message", "error");
        }, 1000);
      }, []);
      return null;
    };

    render(
      <AlertProvider>
        <ShowAndUpdateAlert />
      </AlertProvider>
    );

    expect(screen.getByText(MESSAGE)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.getByText("Updated message")).toBeInTheDocument();
    expect(screen.queryByText(MESSAGE)).not.toBeInTheDocument();
  });

  it("removeAlert should remove alert successfully", () => {
    const RemoveAlert = () => {
      const { showAlert, removeAlert } = useAlert();
      React.useEffect(() => {
        const id = showAlert(MESSAGE, "success", true);
        setTimeout(() => {
          removeAlert(id);
        }, 1000);
      }, []);

      render(
        <AlertProvider>
          <RemoveAlert />
        </AlertProvider>
      );

      expect(screen.findByText(MESSAGE)).toBeInTheDocument();

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(screen.queryByText(MESSAGE)).not.toBeInTheDocument();

      return null;
    };
  });
});
