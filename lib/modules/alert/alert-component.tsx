import { ReactNode } from "react";
import styled, { css } from "styled-components";

// Define the variant type
type AlertVariant = "success" | "error" | "warning" | "info" | "upload";

// Base alert styles
const baseAlertStyles = css`
  display: flex;
  gap: 0.875rem;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  font-size: 14px;
  align-items: center;
`;

// Variant-specific styles
const variantStyles = {
  success: css`
    background-color: #16a34a;
    color: white;
  `,
  error: css`
    background-color: #dc2626;
    color: white;
  `,
  warning: css`
    background-color: #ca8a04;
    color: white;
  `,
  info: css`
    background-color: #2563eb;
    color: white;
  `,
  upload: css`
    background-color: white;
    border: 1px solid black;
    color: #374151;
  `,
};

// Styled alert container
const AlertContainer = styled.div<{ $variant: AlertVariant }>`
  ${baseAlertStyles}
  ${({ $variant }) => variantStyles[$variant || "info"]}
`;

// Styled heading
const AlertHeading = styled.h6<{ $variant: AlertVariant }>`
  flex: 1;
  color: ${({ $variant }) => ($variant === "upload" ? "#374151" : "white")};
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25;
  margin: 0;
`;

// Styled close button
const CloseButton = styled.button<{ $variant: AlertVariant }>`
  background: transparent;
  color: ${({ $variant }) => ($variant === "upload" ? "#374151" : "white")};
  font-weight: 700;
  transition: all 0.2s ease-in-out;
  padding: 2.5px 5px;

  &:hover {
    transform: scale(1.05);
  }
`;

// Define the Alert props interface
interface AlertProps {
  variant?: AlertVariant;
  children: ReactNode;
  dismissible?: boolean;
  onClose?: () => void;
}

export const Alert = ({ variant = "info", children, onClose }: AlertProps) => {
  return (
    <AlertContainer $variant={variant} role="alert" aria-live="assertive">
      <AlertHeading $variant={variant}>{children}</AlertHeading>
      <CloseButton $variant={variant} onClick={onClose} aria-label="Close">
        &#10005;
      </CloseButton>
    </AlertContainer>
  );
};
