import { ReactNode } from "react";
import { AlertProps } from "./provider";

export interface AlertContextType {
  showAlert: (
    message: ReactNode,
    variant?: "success" | "error" | "warning" | "info" | "upload",
    dismissible?: boolean,
    position?: AlertProps["position"]
  ) => string;
  updateAlert: (
    id: string,
    message: ReactNode,
    variant?: "success" | "error" | "warning" | "info" | "upload",
    dismissible?: boolean,
    position?: AlertProps["position"]
  ) => void;
  removeAlert: (id: string) => void;
}

export interface AlertProviderProps {
  children: ReactNode;
}
