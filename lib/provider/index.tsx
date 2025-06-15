import * as React from "react";
import "../styles/index.css";
import { AlertProvider } from "../modules/alert/provider";
export interface ProviderProps {
  children: React.ReactNode;
}

export function Provider({ children }: ProviderProps) {
  return <AlertProvider>{children}</AlertProvider>;
}
