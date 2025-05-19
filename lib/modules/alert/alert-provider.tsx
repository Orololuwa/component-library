import { Alert } from "./alert-component";
import { createContext, ReactNode, useEffect, useState } from "react";
import { setShowAlertFunction } from "./alert-service";
import { AlertContextType, AlertProviderProps } from "./types";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

export const AlertContext = createContext<AlertContextType | undefined>(
  undefined
);

export type AlertProps = {
  id: string;
  message: ReactNode;
  variant: "success" | "error" | "warning" | "info" | "upload";
  dismissible: boolean;
  position: "bottom-left" | "bottom-right" | "top-left" | "top-right";
};

// Styled container for alerts based on their position
const AlertContainer = styled.div<{ $position: string }>`
  position: fixed;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 0.5rem; /* space-y-2 equivalent */

  ${({ $position }) => {
    switch ($position) {
      case "top-right":
        return `
          top: 1rem;
          right: 1rem;
        `;
      case "bottom-right":
        return `
          bottom: 1rem;
          right: 1rem;
        `;
      case "bottom-left":
        return `
          bottom: 1rem;
          left: 1rem;
        `;
      case "top-left":
        return `
          top: 1rem;
          left: 1rem;
        `;
      default:
        return `
          top: 1rem;
          right: 1rem;
        `;
    }
  }}
`;

export const AlertProvider = ({ children }: AlertProviderProps) => {
  const [alerts, setAlerts] = useState<AlertProps[]>([]);

  const showAlert = (
    message: ReactNode,
    variant: "success" | "error" | "warning" | "info" | "upload" = "info",
    dismissible = false,
    position: AlertProps["position"] = "top-right"
  ) => {
    const id = uuidv4();
    setAlerts((prevAlerts) => [
      ...prevAlerts,
      { id, message, variant, dismissible, position },
    ]);

    if (dismissible) {
      return id;
    }

    setTimeout(() => {
      setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
    }, 5000);

    return id;
  };

  const updateAlert = (
    id: string,
    message: ReactNode,
    variant: "success" | "error" | "warning" | "info" | "upload" = "info",
    dismissible = false
  ) => {
    setAlerts((prevAlerts) =>
      prevAlerts.map((alert) =>
        alert.id === id ? { ...alert, message, variant, dismissible } : alert
      )
    );
  };

  const removeAlert = (id: string) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  };

  useEffect(() => {
    setShowAlertFunction(showAlert);
  }, []);

  // Group alerts by position
  const positionGroups = {
    "top-right": alerts.filter((item) => item.position === "top-right"),
    "bottom-right": alerts.filter((item) => item.position === "bottom-right"),
    "bottom-left": alerts.filter((item) => item.position === "bottom-left"),
    "top-left": alerts.filter((item) => item.position === "top-left"),
  };

  return (
    <AlertContext.Provider value={{ showAlert, updateAlert, removeAlert }}>
      {children}

      {Object.entries(positionGroups).map(([position, positionAlerts]) => (
        <AlertContainer key={position} $position={position}>
          {positionAlerts.map(
            ({ id, message, variant, dismissible }, index) => (
              <Alert
                key={index}
                variant={variant}
                dismissible={dismissible}
                onClose={() => removeAlert(id)}
              >
                {message}
              </Alert>
            )
          )}
        </AlertContainer>
      ))}
    </AlertContext.Provider>
  );
};
