import { AlertContextType } from "./types";

let showAlertFunction: AlertContextType["showAlert"] | null = null;

export const setShowAlertFunction = (
  showAlert: AlertContextType["showAlert"]
) => {
  showAlertFunction = showAlert;
};

export const showGlobalAlert = (
  message: React.ReactNode,
  variant: "success" | "error" | "warning" | "info" = "info",
  dismissible = false
) => {
  if (showAlertFunction) {
    showAlertFunction(message, variant, dismissible);
  }
};
