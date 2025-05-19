import React from "react";
import styled, { css } from "styled-components";

// Define the variant types
type TypographyVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";

// Define the base styles
const baseStyles = css`
  -webkit-font-smoothing: antialiased;
`;

// Define variant-specific styles
const variantStyles = {
  h1: css`
    font-size: 2.25rem;
    font-weight: 700;
    line-height: 1.2;
  `,
  h2: css`
    font-size: 1.875rem;
    font-weight: 600;
    line-height: 1.2;
  `,
  h3: css`
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1.2;
  `,
  h4: css`
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 1.2;
  `,
  h5: css`
    font-size: 1.125rem;
    font-weight: 500;
    line-height: 1.2;
  `,
  h6: css`
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.2;
  `,
  p: css`
    font-size: 1rem;
    line-height: 1.625;
  `,
};

// Create a styled component that applies styles based on the variant
const StyledTypography = styled.div<{ $variant: TypographyVariant }>`
  ${baseStyles}
  ${({ $variant }) => variantStyles[$variant]}
`;

export interface TypographyProps {
  as?: TypographyVariant;
  children: React.ReactNode;
  className?: string;
}

export const Typography = ({
  as = "p",
  className,
  children,
}: TypographyProps) => {
  return (
    <StyledTypography
      as={as as keyof JSX.IntrinsicElements}
      className={className}
      $variant={as}
    >
      {children}
    </StyledTypography>
  );
};
