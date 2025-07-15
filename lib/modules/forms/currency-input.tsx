import React, { useState, useEffect, useRef, useMemo } from "react";
import styled from "styled-components";
import { countries } from "../../utils/country-data";

interface CurrencyInputProps {
  value: string | number;
  onChange: (value: string, numericValue: number) => void;
  countryCode?: string;
  placeholder?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  className?: string;
  isError?: boolean;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  inputRef?: React.MutableRefObject<HTMLInputElement | null>;
}

const sizeVariants = {
  sm: {
    height: "2rem",
    fontSize: "0.875rem",
    padding: "0.25rem 0.5rem",
    symbolPadding: "0.25rem 0.5rem",
  },
  md: {
    height: "2.5rem",
    fontSize: "1rem",
    padding: "0.5rem 0.75rem",
    symbolPadding: "0.5rem 0.75rem",
  },
  lg: {
    height: "3rem",
    fontSize: "1.125rem",
    padding: "0.75rem 1rem",
    symbolPadding: "0.75rem 1rem",
  },
};

const CurrencyInputWrapper = styled.div<{
  isError?: boolean;
  size: "sm" | "md" | "lg";
  disabled?: boolean;
}>`
  display: flex;
  align-items: center;
  border: 1px solid ${(props) => (props.isError ? "#ef4444" : "#d1d5db")};
  border-radius: 0.375rem;
  background-color: ${(props) => (props.disabled ? "#f9fafb" : "white")};
  height: ${(props) => sizeVariants[props.size].height};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  overflow: hidden;
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};

  &:focus-within {
    outline: none;
    border: 1px;
    border-color: ${(props) => (props.isError ? "#ef4444" : "#3b82f6")};
  }

  &:hover:not(:focus-within) {
    border-color: ${(props) => (props.isError ? "#ef4444" : "#9ca3af")};
  }
`;

const CurrencySymbol = styled.div<{ size: "sm" | "md" | "lg" }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8fafc;
  border-right: 1px solid #e2e8f0;
  color: #64748b;
  font-weight: 500;
  font-size: ${(props) => sizeVariants[props.size].fontSize};
  padding: ${(props) => sizeVariants[props.size].symbolPadding};
  min-width: 3rem;
  height: 100%;
`;

const StyledInput = styled.input<{ size: "sm" | "md" | "lg" }>`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: ${(props) => sizeVariants[props.size].fontSize};
  padding: ${(props) => sizeVariants[props.size].padding};
  color: #374151;

  &::placeholder {
    color: #9ca3af;
  }

  &:disabled {
    cursor: not-allowed;
    background: transparent;
  }
`;

export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  value,
  onChange,
  countryCode = "US",
  placeholder = "0.00",
  onBlur,
  className,
  isError = false,
  size = "md",
  disabled = false,
  inputRef,
}) => {
  const [refUpdateCount, setRefUpdateCount] = useState(-1);
  const countriesMap = useRef<Record<string, (typeof countries)[0]> | null>(
    null
  );
  useEffect(() => {
    const tempMap: Record<string, (typeof countries)[0]> = {};
    for (const country of countries) {
      tempMap[country.currency.code] = country;
    }
    countriesMap.current = tempMap;
    // inputRef.current?.focus();
    setRefUpdateCount((prev) => prev + 1);

    return () => {
      setRefUpdateCount(-1);
    };
  }, []);

  const [displayValue, setDisplayValue] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);

  const currencySymbol = useMemo(() => {
    if (!countriesMap.current) return "$";
    return countriesMap.current[countryCode]?.currency.symbol || "$";
  }, [countriesMap.current, countryCode, refUpdateCount]);

  const locale = "en-US";

  // Format number for display
  const formatNumber = (num: number): string => {
    if (isNaN(num) || num === 0) return "";

    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(num);
  };

  // Parse display value to number
  const parseNumber = (str: string): number => {
    // Remove all non-digit and non-decimal characters
    const cleaned = str.replace(/[^\d.]/g, "");
    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : num;
  };

  // Update display value when value prop changes
  useEffect(() => {
    const numericValue = typeof value === "string" ? parseNumber(value) : value;
    if (!isFocused) {
      setDisplayValue(formatNumber(numericValue));
    }
  }, [value, isFocused, locale]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Allow only numbers, decimal point, and common separators during typing
    const cleanedValue = inputValue.replace(/[^\d.,]/g, "");

    // Replace comma with decimal point for parsing
    const normalizedValue = cleanedValue.replace(/,/g, ".");

    // Prevent multiple decimal points
    const parts = normalizedValue.split(".");
    let finalValue = parts[0];
    if (parts.length > 1) {
      finalValue += "." + parts[1];
    }

    setDisplayValue(inputValue);

    const numericValue = parseNumber(finalValue);
    onChange(finalValue, numericValue);
  };

  const handleFocus = () => {
    setIsFocused(true);
    // Show raw numeric value when focused
    const numericValue = typeof value === "string" ? parseNumber(value) : value;
    setDisplayValue(numericValue === 0 ? "" : numericValue.toString());
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    const numericValue = parseNumber(displayValue);
    setDisplayValue(formatNumber(numericValue));
    onBlur?.(e);
  };

  return (
    <CurrencyInputWrapper
      isError={isError}
      size={size}
      disabled={disabled}
      className={className}
    >
      <CurrencySymbol size={size}>{currencySymbol}</CurrencySymbol>
      <StyledInput
        type="text"
        value={displayValue}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        size={size}
        disabled={disabled}
        ref={inputRef}
      />
    </CurrencyInputWrapper>
  );
};
