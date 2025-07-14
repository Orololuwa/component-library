import { css } from "styled-components";

export const CustomScrollbar = css`
  scrollbar-width: thin;

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(236, 38, 38, 0.2);
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(239, 53, 53, 0.4);
  }
`;
