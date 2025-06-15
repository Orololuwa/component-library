import { ReactNode } from "react";

export type ModalSize = "small" | "medium" | "large" | "full";

export interface ModalContextType {
  showModal: (
    header?: ReactNode,
    body?: ReactNode,
    footer?: ReactNode,
    size?: ModalSize
  ) => string;
  updateModal: (
    id: string,
    header?: ReactNode,
    body?: ReactNode,
    footer?: ReactNode,
    size?: ModalSize
  ) => void;
  closeModal: (id: string) => void;
}

export interface ModalProviderProps {
  children: ReactNode;
}

export interface ModalState {
  id: string;
  header?: ReactNode;
  body?: ReactNode;
  footer?: ReactNode;
  size: ModalSize;
}
