import { ReactNode } from "react";
import styled from "styled-components";
import { ModalSize } from "./types";

const sizeMap = {
  small: "400px",
  medium: "600px",
  large: "800px",
  full: "95%",
};

interface ModalContainerProps {
  $size: ModalSize;
  $isOpen: boolean;
}

const ModalContainer = styled.div<ModalContainerProps>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%)
    scale(${({ $isOpen }) => ($isOpen ? 1 : 0.95)});
  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  width: ${({ $size }) => sizeMap[$size]};
  max-width: 95vw;
  max-height: 90vh;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  transition: all 0.3s ease-in-out;
  z-index: 1000;

  @media (prefers-color-scheme: light) {
    color: #213547;
    background-color: #ffffff;
  }
`;

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  color-scheme: light dark;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  transition: opacity 0.3s ease-in-out;

  @media (prefers-color-scheme: dark) {
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

const ModalContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.header`
  padding: 1rem;
  border-bottom: 1px solid #eee;
`;

const ModalBody = styled.div`
  padding: 1rem;
  flex: 1;
  overflow-y: auto;
  min-height: 0;
`;

const ModalFooter = styled.footer`
  padding: 1rem;
  border-top: 1px solid #eee;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 1rem;
  background: transparent;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  padding: 2.5px 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.7;
  }
`;

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  size?: ModalSize;
  header?: ReactNode;
  body?: ReactNode;
  footer?: ReactNode;
  hideCloseButton?: boolean;
}

export const Modal = ({
  isOpen,
  onClose,
  size = "medium",
  hideCloseButton = false,
  header,
  body,
  footer,
}: ModalProps) => {
  return (
    <>
      <Overlay $isOpen={isOpen} onClick={onClose} />
      <ModalContainer $isOpen={isOpen} $size={size}>
        {!hideCloseButton && (
          <CloseButton onClick={onClose} aria-label="Close modal">
            &#10005;
          </CloseButton>
        )}
        <ModalContent>
          {header ? <ModalHeader>{header}</ModalHeader> : null}
          {body ? <ModalBody>{body}</ModalBody> : null}
          {footer ? <ModalFooter>{footer}</ModalFooter> : null}
        </ModalContent>
      </ModalContainer>
    </>
  );
};
