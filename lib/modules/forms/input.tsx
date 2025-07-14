import { forwardRef, useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import styled, { css } from "styled-components";

type InputSize = "xs" | "sm" | "md" | "lg";

interface InputSizeConfig {
  input: string;
  label: string;
  error: string;
  icon: string;
  paddingLeft: string;
  paddingRight: string;
}

const sizeConfigs: Record<InputSize, InputSizeConfig> = {
  xs: {
    input: "padding: 0.25rem 0.5rem; font-size: 0.75rem; line-height: 1.25;",
    label: "font-size: 0.75rem; line-height: 1.25;",
    error: "font-size: 0.625rem; line-height: 1.25;",
    icon: "width: 1rem; height: 1rem;",
    paddingLeft: "padding-left: 1.75rem;",
    paddingRight: "padding-right: 1.75rem;",
  },
  sm: {
    input:
      "padding: 0.375rem 0.625rem; font-size: 0.875rem; line-height: 1.375;",
    label: "font-size: 0.875rem; line-height: 1.375;",
    error: "font-size: 0.75rem; line-height: 1.25;",
    icon: "width: 1.125rem; height: 1.125rem;",
    paddingLeft: "padding-left: 2rem;",
    paddingRight: "padding-right: 2rem;",
  },
  md: {
    input: "padding: 0.5rem 0.75rem; font-size: 1rem; line-height: 1.5;",
    label: "font-size: 1rem; line-height: 1.5;",
    error: "font-size: 0.875rem; line-height: 1.375;",
    icon: "width: 1.25rem; height: 1.25rem;",
    paddingLeft: "padding-left: 2.25rem;",
    paddingRight: "padding-right: 2.25rem;",
  },
  lg: {
    input: "padding: 0.75rem 1rem; font-size: 1.125rem; line-height: 1.625;",
    label: "font-size: 1.125rem; line-height: 1.625;",
    error: "font-size: 1rem; line-height: 1.5;",
    icon: "width: 1.5rem; height: 1.5rem;",
    paddingLeft: "padding-left: 2.75rem;",
    paddingRight: "padding-right: 2.75rem;",
  },
};

const baseInputStyles = css`
  width: 100%;
  border-radius: 0.375rem;
  border: 2px solid #d1d5db; /* Gray-300 */
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:focus {
    outline: none;
  }

  &:disabled {
    background-color: #f3f4f6; /* Gray-100 */
    cursor: not-allowed;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input<{
  $focusColor?: string;
  $size: InputSize;
  $isError?: boolean;
  $color?: string;
  $hasLeftIcon?: boolean;
  $hasRightIcon?: boolean;
}>`
  ${baseInputStyles}
  ${({ $size }) => sizeConfigs[$size].input}

  color: ${({ $color }) => $color || "#374151"}; /* Gray-700 */

  border-color: ${({ $isError, $color }) =>
    $isError ? "#dc2626" : $color || "#d1d5db"}; /* Red-600 or Gray-300 */

  ${({ $hasLeftIcon, $size }) => $hasLeftIcon && sizeConfigs[$size].paddingLeft}
  ${({ $hasRightIcon, $size }) =>
    $hasRightIcon && sizeConfigs[$size].paddingRight}

  &:focus {
    border-color: ${({ $focusColor, $isError }) => {
      if ($isError) return "#dc2626"; /* Red-600 */
      return $focusColor || "#2563eb"; /* Blue-600 */
    }};
    box-shadow: 0 0 0 3px
      ${
        ({ $isError }) =>
          $isError
            ? "rgba(220, 38, 38, 0.2)" /* Red-600 with opacity */
            : "rgba(37, 99, 235, 0.2)" /* Blue-600 with opacity */
      };
  }
`;

const IconContainer = styled.div<{
  $position: "left" | "right";
  $size: InputSize;
  $isDisabled?: boolean;
  $isClickable?: boolean;
}>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ $size }) => sizeConfigs[$size].icon}
  color: ${({ $isDisabled }) =>
    $isDisabled ? "#9ca3af" : "#6b7280"}; /* Gray-500 or Gray-400 */
  pointer-events: ${({ $isClickable }) => ($isClickable ? "auto" : "none")};
  cursor: ${({ $isClickable }) => ($isClickable ? "pointer" : "default")};
  z-index: 1;

  ${({ $position, $size }) => {
    const offset =
      $size === "xs"
        ? "0.5rem"
        : $size === "sm"
        ? "0.625rem"
        : $size === "md"
        ? "0.75rem"
        : "1rem";
    return $position === "left" ? `left: ${offset};` : `right: ${offset};`;
  }}
`;

const StyledLabel = styled.label<{ $size: InputSize; $color?: string }>`
  display: block;
  margin-bottom: 0.25rem;
  font-weight: 500;
  color: ${({ $color }) => $color || "#374151"}; /* Gray-700 */
  ${({ $size }) => sizeConfigs[$size].label}
`;

const ErrorMessage = styled.span<{ $size: InputSize }>`
  display: block;
  margin-top: 0.25rem;
  color: #dc2626; /* Red-600 */
  ${({ $size }) => sizeConfigs[$size].error}
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export interface InputProps
  extends Omit<
    React.ComponentProps<typeof StyledInput>,
    | "$focusColor"
    | "$size"
    | "$isError"
    | "$color"
    | "$hasLeftIcon"
    | "$hasRightIcon"
  > {
  $label?: string;
  $focusColor?: string;
  $size?: InputSize;
  $isError?: boolean;
  $error?: string;
  $color?: string;
  $leftIcon?: React.ReactNode;
  $rightIcon?: React.ReactNode;
  $rightIconClickable?: boolean;
  $leftIconClickable?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    $label,
    $focusColor,
    $size = "md",
    $isError = false,
    $error,
    $color,
    $leftIcon,
    $rightIcon,
    $rightIconClickable = false,
    $leftIconClickable = false,
    disabled,
    ...rest
  } = props;

  // If there's an error message, automatically set isError to true
  const hasError = $isError || !!$error;

  return (
    <InputContainer>
      {$label && (
        <StyledLabel $size={$size} htmlFor={rest.id} $color={$color}>
          {$label}
        </StyledLabel>
      )}

      <InputWrapper>
        {$leftIcon && (
          <IconContainer
            $position="left"
            $size={$size}
            $isDisabled={disabled}
            $isClickable={$leftIconClickable && !disabled}
          >
            {$leftIcon}
          </IconContainer>
        )}

        <StyledInput
          {...rest}
          ref={ref}
          $focusColor={$focusColor}
          $size={$size}
          $isError={hasError}
          $color={$color}
          $hasLeftIcon={!!$leftIcon}
          $hasRightIcon={!!$rightIcon}
          disabled={disabled}
        />

        {$rightIcon && (
          <IconContainer
            $position="right"
            $size={$size}
            $isDisabled={disabled}
            $isClickable={$rightIconClickable && !disabled}
          >
            {$rightIcon}
          </IconContainer>
        )}
      </InputWrapper>

      {$error && (
        <ErrorMessage $size={$size} role="alert">
          {$error}
        </ErrorMessage>
      )}
    </InputContainer>
  );
});

Input.displayName = "Input";

export const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      $label,
      $size,
      $isError,
      $error,
      $focusColor,
      type,
      $rightIcon,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const inputType = isVisible ? "text" : "password";

    const VisibilityIcon = isVisible ? LuEye : LuEyeClosed;

    return (
      <Input
        ref={ref}
        type={inputType}
        $label={$label}
        $size={$size}
        $isError={$isError}
        $error={$error}
        $focusColor={$focusColor}
        $rightIcon={
          <VisibilityIcon
            style={{ cursor: "pointer" }}
            onClick={() => setIsVisible(!isVisible)}
          />
        }
        $rightIconClickable={true}
        {...props}
      />
    );
  }
);

PasswordInput.displayName = "PasswordInput";
