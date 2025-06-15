import { ReactNode } from "react";
import styled, { css } from "styled-components";
import { DrawerPosition, DrawerSize } from "./types";

const sizeMap = {
  small: { vertical: "350px", horizontal: "50%" },
  medium: { vertical: "500px", horizontal: "65%" },
  large: { vertical: "700px", horizontal: "80%" },
  full: { vertical: "100%", horizontal: "100%" },
};

interface DrawerContainerProps {
  $position: DrawerPosition;
  $size: DrawerSize;
  $isOpen: boolean;
}

const DrawerContainer = styled.div<DrawerContainerProps>`
  position: fixed;
  color-scheme: light dark;
  color: #213547;
  background-color: #ffffff;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease-in-out;
  z-index: 1000;

  ${({ $position, $size, $isOpen }) => {
    switch ($position) {
      case "left":
        return css`
          top: 0;
          left: 0;
          height: 100vh;
          width: ${sizeMap[$size].vertical};
          max-width: 100%;
          transform: translateX(${$isOpen ? "0" : "-100%"});
        `;
      case "right":
        return css`
          top: 0;
          right: 0;
          height: 100vh;
          width: ${sizeMap[$size].vertical};
          max-width: 100%;
          transform: translateX(${$isOpen ? "0" : "100%"});
        `;
      case "top":
        return css`
          top: 0;
          left: 0;
          width: 100%;
          height: ${sizeMap[$size].horizontal};
          transform: translateY(${$isOpen ? "0" : "-100%"});
        `;
      case "bottom":
        return css`
          bottom: 0;
          left: 0;
          width: 100%;
          height: ${sizeMap[$size].horizontal};
          transform: translateY(${$isOpen ? "0" : "100%"});
        `;
      default:
        return "";
    }
  }}/* @media (prefers-color-scheme: dark) {
  background-color: #242424;
  color: rgba(255, 255, 255, 0.87);
  } */
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

  /* @media (prefers-color-scheme: dark) {
    background-color: rgba(255, 255, 255, 0.5);
  } */
`;

const DrawerContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const DrawerHeader = styled.header`
  padding: 1rem;
  border-bottom: 1px solid #eee;
`;

const DrawerBody = styled.div`
  padding: 1rem;
  flex: 1;
  overflow-y: auto;
  min-height: 0;
`;

const DrawerFooter = styled.footer`
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

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  position?: DrawerPosition;
  size?: DrawerSize;
  header?: ReactNode;
  body?: ReactNode;
  footer?: ReactNode;
  hideCloseButton?: boolean;
}

export const Drawer = ({
  isOpen,
  onClose,
  position = "right",
  size = "medium",
  hideCloseButton = false,
  header,
  body,
  footer,
}: DrawerProps) => {
  return (
    <>
      <Overlay $isOpen={isOpen} onClick={onClose} />
      <DrawerContainer $isOpen={isOpen} $position={position} $size={size}>
        {!hideCloseButton && (
          <CloseButton onClick={onClose} aria-label="Close drawer">
            &#10005;
          </CloseButton>
        )}
        <DrawerContent>
          {header ? <DrawerHeader>{header}</DrawerHeader> : null}
          {body ? <DrawerBody>{body}</DrawerBody> : null}
          {footer ? <DrawerFooter>{footer}</DrawerFooter> : null}
        </DrawerContent>
      </DrawerContainer>
    </>
  );
};
