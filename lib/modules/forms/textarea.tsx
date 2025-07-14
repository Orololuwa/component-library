import { forwardRef } from "react";
import styled, { css } from "styled-components";
import { CustomScrollbar } from "../../utils/styles";

type TextareaSize = "xs" | "sm" | "md" | "lg";

interface TextareaSizeConfig {
  textarea: string;
  label: string;
  error: string;
  icon: string;
  paddingTop: string;
  paddingBottom: string;
  paddingLeft: string;
  paddingRight: string;
}

const sizeConfigs: Record<TextareaSize, TextareaSizeConfig> = {
  xs: {
    textarea:
      "padding: 0.25rem 0.5rem; font-size: 0.75rem; line-height: 1.25; min-height: 2.5rem;",
    label: "font-size: 0.75rem; line-height: 1.25;",
    error: "font-size: 0.625rem; line-height: 1.25;",
    icon: "width: 1rem; height: 1rem;",
    paddingTop: "padding-top: 0.25rem;",
    paddingBottom: "padding-bottom: 0.25rem;",
    paddingLeft: "padding-left: 1.75rem;",
    paddingRight: "padding-right: 1.75rem;",
  },
  sm: {
    textarea:
      "padding: 0.375rem 0.625rem; font-size: 0.875rem; line-height: 1.375; min-height: 3rem;",
    label: "font-size: 0.875rem; line-height: 1.375;",
    error: "font-size: 0.75rem; line-height: 1.25;",
    icon: "width: 1.125rem; height: 1.125rem;",
    paddingTop: "padding-top: 0.375rem;",
    paddingBottom: "padding-bottom: 0.375rem;",
    paddingLeft: "padding-left: 2rem;",
    paddingRight: "padding-right: 2rem;",
  },
  md: {
    textarea:
      "padding: 0.5rem 0.75rem; font-size: 1rem; line-height: 1.5; min-height: 4rem;",
    label: "font-size: 1rem; line-height: 1.5;",
    error: "font-size: 0.875rem; line-height: 1.375;",
    icon: "width: 1.25rem; height: 1.25rem;",
    paddingTop: "padding-top: 0.5rem;",
    paddingBottom: "padding-bottom: 0.5rem;",
    paddingLeft: "padding-left: 2.25rem;",
    paddingRight: "padding-right: 2.25rem;",
  },
  lg: {
    textarea:
      "padding: 0.75rem 1rem; font-size: 1.125rem; line-height: 1.625; min-height: 5rem;",
    label: "font-size: 1.125rem; line-height: 1.625;",
    error: "font-size: 1rem; line-height: 1.5;",
    icon: "width: 1.5rem; height: 1.5rem;",
    paddingTop: "padding-top: 0.75rem;",
    paddingBottom: "padding-bottom: 0.75rem;",
    paddingLeft: "padding-left: 2.75rem;",
    paddingRight: "padding-right: 2.75rem;",
  },
};

const baseTextareaStyles = css`
  width: 100%;
  border-radius: 0.375rem;
  border: 2px solid #d1d5db; /* Gray-300 */
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  resize: vertical;
  font-family: inherit;

  &:focus {
    outline: none;
  }

  &:disabled {
    background-color: #f3f4f6; /* Gray-100 */
    cursor: not-allowed;
    resize: none;
  }
`;

const TextareaWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const StyledTextarea = styled.textarea<{
  $focusColor?: string;
  $size: TextareaSize;
  $isError?: boolean;
  $color?: string;
  $hasTopLeftIcon?: boolean;
  $hasTopRightIcon?: boolean;
  $hasBottomLeftIcon?: boolean;
  $hasBottomRightIcon?: boolean;
}>`
  ${baseTextareaStyles}
  ${CustomScrollbar}
  ${({ $size }) => sizeConfigs[$size].textarea}

  color: ${({ $color }) => $color || "#374151"}; /* Gray-700 */

  border-color: ${({ $isError, $color }) =>
    $isError ? "#dc2626" : $color || "#d1d5db"}; /* Red-600 or Gray-300 */

  ${({ $hasTopLeftIcon, $size }) =>
    $hasTopLeftIcon && sizeConfigs[$size].paddingLeft}
  ${({ $hasTopRightIcon, $size }) =>
    $hasTopRightIcon && sizeConfigs[$size].paddingRight}
  ${({ $hasBottomLeftIcon, $size }) =>
    $hasBottomLeftIcon && sizeConfigs[$size].paddingLeft}
  ${({ $hasBottomRightIcon, $size }) =>
    $hasBottomRightIcon && sizeConfigs[$size].paddingRight}

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
  $position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  $size: TextareaSize;
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
    const topOffset =
      $size === "xs"
        ? "0.5rem"
        : $size === "sm"
        ? "0.625rem"
        : $size === "md"
        ? "0.9rem"
        : "1.1rem";
    const bottomOffset =
      $size === "xs"
        ? "0.375rem"
        : $size === "sm"
        ? "0.5rem"
        : $size === "md"
        ? "0.625rem"
        : "0.875rem";

    switch ($position) {
      case "top-left":
        return `top: ${topOffset}; left: ${offset};`;
      case "top-right":
        return `top: ${topOffset}; right: ${offset};`;
      case "bottom-left":
        return `bottom: ${bottomOffset}; left: ${offset};`;
      case "bottom-right":
        return `bottom: ${bottomOffset}; right: ${offset};`;
      default:
        return "";
    }
  }}
`;

const StyledLabel = styled.label<{ $size: TextareaSize; $color?: string }>`
  display: block;
  margin-bottom: 0.25rem;
  font-weight: 500;
  color: ${({ $color }) => $color || "#374151"}; /* Gray-700 */
  ${({ $size }) => sizeConfigs[$size].label}
`;

const ErrorMessage = styled.span<{ $size: TextareaSize }>`
  display: block;
  margin-top: 0.25rem;
  color: #dc2626; /* Red-600 */
  ${({ $size }) => sizeConfigs[$size].error}
`;

const TextareaContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CharacterCount = styled.div<{
  $size: TextareaSize;
  $isOverLimit?: boolean;
}>`
  margin-top: 0.25rem;
  text-align: right;
  color: ${({ $isOverLimit }) =>
    $isOverLimit ? "#dc2626" : "#6b7280"}; /* Red-600 or Gray-500 */
  ${({ $size }) => sizeConfigs[$size].error}
`;

export interface TextareaProps
  extends Omit<
    React.ComponentProps<typeof StyledTextarea>,
    | "$focusColor"
    | "$size"
    | "$isError"
    | "$color"
    | "$hasTopLeftIcon"
    | "$hasTopRightIcon"
    | "$hasBottomLeftIcon"
    | "$hasBottomRightIcon"
  > {
  $label?: string;
  $focusColor?: string;
  $size?: TextareaSize;
  $isError?: boolean;
  $error?: string;
  $color?: string;
  $topLeftIcon?: React.ReactNode;
  $topRightIcon?: React.ReactNode;
  $bottomLeftIcon?: React.ReactNode;
  $bottomRightIcon?: React.ReactNode;
  $topLeftIconClickable?: boolean;
  $topRightIconClickable?: boolean;
  $bottomLeftIconClickable?: boolean;
  $bottomRightIconClickable?: boolean;
  $showCharacterCount?: boolean;
  $maxLength?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    const {
      $label,
      $focusColor,
      $size = "md",
      $isError = false,
      $error,
      $color,
      $topLeftIcon,
      $topRightIcon,
      $bottomLeftIcon,
      $bottomRightIcon,
      $topLeftIconClickable = false,
      $topRightIconClickable = false,
      $bottomLeftIconClickable = false,
      $bottomRightIconClickable = false,
      $showCharacterCount = false,
      $maxLength,
      disabled,
      value,
      ...rest
    } = props;

    // If there's an error message, automatically set isError to true
    const hasError = $isError || !!$error;

    // Calculate character count
    const characterCount = typeof value === "string" ? value.length : 0;
    const isOverLimit = $maxLength ? characterCount > $maxLength : false;

    return (
      <TextareaContainer>
        {$label && (
          <StyledLabel $size={$size} htmlFor={rest.id} $color={$color}>
            {$label}
          </StyledLabel>
        )}

        <TextareaWrapper>
          {$topLeftIcon && (
            <IconContainer
              $position="top-left"
              $size={$size}
              $isDisabled={disabled}
              $isClickable={$topLeftIconClickable && !disabled}
            >
              {$topLeftIcon}
            </IconContainer>
          )}

          {$topRightIcon && (
            <IconContainer
              $position="top-right"
              $size={$size}
              $isDisabled={disabled}
              $isClickable={$topRightIconClickable && !disabled}
            >
              {$topRightIcon}
            </IconContainer>
          )}

          {$bottomLeftIcon && (
            <IconContainer
              $position="bottom-left"
              $size={$size}
              $isDisabled={disabled}
              $isClickable={$bottomLeftIconClickable && !disabled}
            >
              {$bottomLeftIcon}
            </IconContainer>
          )}

          {$bottomRightIcon && (
            <IconContainer
              $position="bottom-right"
              $size={$size}
              $isDisabled={disabled}
              $isClickable={$bottomRightIconClickable && !disabled}
            >
              {$bottomRightIcon}
            </IconContainer>
          )}

          <StyledTextarea
            {...rest}
            ref={ref}
            $focusColor={$focusColor}
            $size={$size}
            $isError={hasError}
            $color={$color}
            $hasTopLeftIcon={!!$topLeftIcon}
            $hasTopRightIcon={!!$topRightIcon}
            $hasBottomLeftIcon={!!$bottomLeftIcon}
            $hasBottomRightIcon={!!$bottomRightIcon}
            disabled={disabled}
            value={value}
            maxLength={$maxLength}
          />
        </TextareaWrapper>

        {$error && (
          <ErrorMessage $size={$size} role="alert">
            {$error}
          </ErrorMessage>
        )}

        {$showCharacterCount && (
          <CharacterCount $size={$size} $isOverLimit={isOverLimit}>
            {characterCount}
            {$maxLength && `/${$maxLength}`}
          </CharacterCount>
        )}
      </TextareaContainer>
    );
  }
);

Textarea.displayName = "Textarea";
