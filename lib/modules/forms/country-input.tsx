import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { countries } from "../../utils/country-data";

export type Option = (typeof countries)[0];

interface CountryAutocompleteProps {
  onChange?: (country: Option | null) => void;
  className?: string;
  value?: Option | null;
  defaultValue?: string | Option;
  size?: "sm" | "md" | "lg";
}

const Container = styled.div`
  width: 100%;
  border-radius: 6px;
`;

const InputContainer = styled.div`
  position: relative;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const StyledInput = styled.input<{
  size: "sm" | "md" | "lg";
  hasFlag: boolean;
}>`
  width: 100%;
  border: 1px solid #d1d5db;
  color: #374151;
  border-radius: 6px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: ring 0.15s ease-in;

  &:focus {
    outline: none;
    border: 1px solid #e5e7eb;
  }

  &::placeholder {
    color: #6b7280;
  }

  ${({ size }) => {
    switch (size) {
      case "sm":
        return "padding: 10px 8px; font-size: 14px;";
      case "lg":
        return "padding: 14px 24px; font-size: 18px;";
      default:
        return "padding: 10px 16px; font-size: 16px;";
    }
  }}

  ${({ hasFlag }) => hasFlag && "padding-right: 40px;"}
`;

const FlagContainer = styled.div`
  position: absolute;
  right: 40px;
  top: 10px;
  color: #6b7280;

  span {
    font-size: 18px;
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    color: #6b7280;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const SuggestionsContainer = styled.div`
  position: absolute;
  z-index: 10;
  width: 100%;
  margin-top: 4px;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  max-height: 256px;
  overflow-y: auto;
`;

const SuggestionsList = styled.ul`
  padding: 4px 0;
  margin: 0;
  list-style: none;
`;

const SuggestionItem = styled.li<{ isSelected: boolean }>`
  padding: 8px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    background-color: #f3f4f6;
  }

  ${({ isSelected }) => isSelected && "background-color: #eff6ff;"}
`;

const CountryInfo = styled.div`
  display: flex;
  align-items: center;

  .flag {
    margin-right: 8px;
    font-size: 18px;
  }

  .highlight {
    font-weight: bold;
    color: #2563eb;
  }
`;

const CountryCode = styled.span`
  color: #9ca3af;
  font-size: 12px;
  text-transform: uppercase;
`;

const CountryAutocomplete: React.FC<CountryAutocompleteProps> = ({
  onChange,
  className,
  value,
  defaultValue,
  size = "md",
}) => {
  // Initialize with defaultValue if provided
  const getInitialCountry = (): Option | null => {
    if (value) return value;

    if (defaultValue) {
      if (typeof defaultValue === "string") {
        // Find country by name or code
        const found = countries.find(
          (country) =>
            country.name.toLowerCase() === defaultValue.toLowerCase() ||
            country.code.toLowerCase() === defaultValue.toLowerCase()
        );

        if (found) return found;
      } else {
        return defaultValue;
      }
    }

    return null;
  };

  const [inputValue, setInputValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Option[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [selectedCountry, setSelectedCountry] = useState<Option | null>(
    getInitialCountry()
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Update selected country when value prop changes
  useEffect(() => {
    if (value !== undefined) {
      setSelectedCountry(value);
    }
  }, [value]);

  // Update input display value when selectedCountry changes
  useEffect(() => {
    if (selectedCountry) {
      setInputValue(selectedCountry.name);
    }
  }, [selectedCountry]);

  function filterCountries(input: string): Option[] {
    if (!input) return [];
    const inputLower = input.toLowerCase();

    const filteredCountries = countries
      .filter(
        (country) =>
          country.name.toLowerCase().includes(inputLower) ||
          country.code.toLowerCase().includes(inputLower) ||
          country.dial_code.toLowerCase().includes(inputLower)
      )
      .sort((a, b) => {
        const aNameStarts = a.name.toLowerCase().startsWith(inputLower);
        const bNameStarts = b.name.toLowerCase().startsWith(inputLower);

        if (aNameStarts && !bNameStarts) return -1;
        if (!aNameStarts && bNameStarts) return 1;

        return a.name.localeCompare(b.name);
      });

    return filteredCountries;
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const value = e.target.value;
    setInputValue(value);
    const filteredSuggestions = filterCountries(value);
    setSuggestions(filteredSuggestions);
    setIsOpen(value.length > 0 && filteredSuggestions.length > 0);
    setSelectedIndex(-1);

    // Clear selected country when input changes, but don't trigger onChange yet
    if (selectedCountry && value !== selectedCountry.name) {
      setSelectedCountry(null);
    }
  }

  function handleSelectSuggestion(suggestion: Option): void {
    setSelectedCountry(suggestion);
    setInputValue(suggestion.name);
    if (onChange) {
      onChange(suggestion);
    }
    setSuggestions([]);
    setIsOpen(false); // Ensure the menu closes
    setSelectedIndex(-1); // Reset selection index
    // inputRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === "Escape") {
      setIsOpen(false);
      return;
    }

    if (!isOpen) {
      if (e.key === "ArrowDown" && inputValue) {
        e.preventDefault();
        const filteredSuggestions = filterCountries(inputValue);
        if (filteredSuggestions.length > 0) {
          setSuggestions(filteredSuggestions);
          setIsOpen(true);
          setSelectedIndex(0);
        }
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0) {
        handleSelectSuggestion(suggestions[selectedIndex]);
      }
    }
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);

        // If there's text in the input but no selection, handle it when clicking outside
        if (inputValue && !selectedCountry) {
          const exactMatch = countries.find(
            (country) => country.name.toLowerCase() === inputValue.toLowerCase()
          );

          if (exactMatch) {
            handleSelectSuggestion(exactMatch);
          } else {
            // Reset to previously selected country if any
            const currentSelectedCountry = selectedCountry as Option | null;
            if (currentSelectedCountry) {
              setInputValue(currentSelectedCountry.name);
            } else {
              setInputValue("");
            }
          }
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputValue, selectedCountry]);

  function handleClearInput(): void {
    setInputValue("");
    setSuggestions([]);
    setSelectedCountry(null);
    if (onChange) {
      onChange(null);
    }
    inputRef.current?.focus();
  }

  function handleFocus(): void {
    if (inputValue.trim()) {
      const filteredSuggestions = filterCountries(inputValue);
      setSuggestions(filteredSuggestions);
      setIsOpen(filteredSuggestions.length > 0);
    }
  }

  // Get flag for currently selected country
  const selectedFlag = selectedCountry?.flag;

  return (
    <Container className={className}>
      <InputContainer>
        <InputWrapper>
          <StyledInput
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            placeholder="Search for a country..."
            size={size}
            hasFlag={!!selectedFlag}
          />

          {selectedFlag && (
            <FlagContainer>
              <span>{selectedFlag}</span>
            </FlagContainer>
          )}

          {inputValue && (
            <ClearButton onClick={handleClearInput}>
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </ClearButton>
          )}
        </InputWrapper>

        {isOpen && (
          <SuggestionsContainer ref={suggestionsRef}>
            <SuggestionsList>
              {suggestions.map((country, index) => {
                const matchInName = country.name
                  .toLowerCase()
                  .indexOf(inputValue.toLowerCase());

                return (
                  <SuggestionItem
                    key={country.code}
                    isSelected={selectedIndex === index}
                    onClick={() => handleSelectSuggestion(country)}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <CountryInfo>
                      {country.flag && (
                        <span className="flag">{country.flag}</span>
                      )}
                      <div>
                        {matchInName >= 0 ? (
                          <>
                            {country.name.substring(0, matchInName)}
                            <span className="highlight">
                              {country.name.substring(
                                matchInName,
                                matchInName + inputValue.length
                              )}
                            </span>
                            {country.name.substring(
                              matchInName + inputValue.length
                            )}
                          </>
                        ) : (
                          country.name
                        )}
                      </div>
                    </CountryInfo>
                    {country.code && <CountryCode>{country.code}</CountryCode>}
                  </SuggestionItem>
                );
              })}
            </SuggestionsList>
          </SuggestionsContainer>
        )}
      </InputContainer>
    </Container>
  );
};

export default CountryAutocomplete;
