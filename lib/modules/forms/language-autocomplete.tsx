import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

export interface Language {
  code: string;
  name: string;
  native: string;
  region: string;
  isCustom?: boolean;
}

interface SpokenLanguageAutocompleteProps {
  onChange?: (language: Language | null) => void;
  showSuggested?: boolean;
  className?: string;
  addFictionalLanguages?: boolean;
}

const Container = styled.div`
  width: 100%;
  border-radius: 0.375rem;
`;

const InputContainer = styled.div`
  position: relative;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.625rem 1rem;
  font-size: 1rem;
  border: 1px solid #d1d5db;
  color: #374151;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: ring 0.15s ease-in;

  &:focus {
    outline: none;
    ring: 1px solid #e5e7eb;
  }

  &::placeholder {
    color: #6b7280;
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  color: #9ca3af;

  &:hover {
    color: #6b7280;
  }
`;

const SuggestionsList = styled.div`
  position: absolute;
  z-index: 10;
  width: 100%;
  margin-top: 0.25rem;
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  max-height: 16rem;
  overflow-y: auto;
`;

const SuggestionsUl = styled.ul`
  padding: 0.25rem 0;
  list-style: none;
  margin: 0;
`;

const SuggestionItem = styled.li<{ isSelected: boolean }>`
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) =>
    props.isSelected ? "#eff6ff" : "transparent"};

  &:hover {
    background-color: #f3f4f6;
  }
`;

const CustomSuggestionItem = styled.li<{ isSelected: boolean }>`
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  background-color: ${(props) =>
    props.isSelected ? "#eff6ff" : "transparent"};

  &:hover {
    background-color: #f3f4f6;
  }
`;

const CustomSuggestionContent = styled.div`
  display: flex;
  align-items: center;
  color: #2563eb;
`;

const CustomSuggestionText = styled.span`
  font-weight: 500;
`;

const LanguageInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const LanguageDetails = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  display: flex;
  align-items: center;
`;

const NativeText = styled.span`
  margin-right: 0.5rem;
`;

const RegionTag = styled.span`
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  background-color: #f3f4f6;
  border-radius: 9999px;
`;

const LanguageCode = styled.span`
  color: #9ca3af;
  font-size: 0.75rem;
  text-transform: uppercase;
`;

const HighlightedTextWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const HighlightedText = styled.span`
  font-weight: bold;
  color: #2563eb;
`;

const SelectedLanguageContainer = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: #eff6ff;
  border-radius: 0.375rem;
`;

const SelectedLanguageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SelectedLanguageTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
  color: #1e40af;
  margin: 0;
`;

const SelectedLanguageNative = styled.p`
  color: #2563eb;
  margin: 0;
`;

const SelectedLanguageCustom = styled.p`
  color: #2563eb;
  font-size: 0.875rem;
  font-style: italic;
  margin: 0;
`;

const SelectedLanguageInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const SelectedLanguageRegion = styled.span`
  background-color: #dbeafe;
  color: #1e40af;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
`;

const SelectedLanguageCode = styled.span`
  color: #6b7280;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const SpokenLanguageAutocomplete: React.FC<SpokenLanguageAutocompleteProps> = ({
  onChange,
  showSuggested = false,
  className,
  addFictionalLanguages = false,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Language[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(
    null
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const languages: Language[] = [
    { code: "en", name: "English", native: "English", region: "Global" },
    {
      code: "es",
      name: "Spanish",
      native: "Español",
      region: "Europe/Americas",
    },
    { code: "zh", name: "Chinese (Mandarin)", native: "中文", region: "Asia" },
    { code: "hi", name: "Hindi", native: "हिन्दी", region: "Asia" },
    {
      code: "ar",
      name: "Arabic",
      native: "العربية",
      region: "Middle East/Africa",
    },
    { code: "bn", name: "Bengali", native: "বাংলা", region: "Asia" },
    {
      code: "pt",
      name: "Portuguese",
      native: "Português",
      region: "Europe/South America",
    },
    { code: "ru", name: "Russian", native: "Русский", region: "Europe/Asia" },
    { code: "ja", name: "Japanese", native: "日本語", region: "Asia" },
    {
      code: "fr",
      name: "French",
      native: "Français",
      region: "Europe/Africa/Americas",
    },
    { code: "de", name: "German", native: "Deutsch", region: "Europe" },
    { code: "pa", name: "Punjabi", native: "ਪੰਜਾਬੀ", region: "Asia" },
    { code: "jv", name: "Javanese", native: "Basa Jawa", region: "Asia" },
    { code: "ko", name: "Korean", native: "한국어", region: "Asia" },
    { code: "vi", name: "Vietnamese", native: "Tiếng Việt", region: "Asia" },
    { code: "te", name: "Telugu", native: "తెలుగు", region: "Asia" },
    { code: "tr", name: "Turkish", native: "Türkçe", region: "Europe/Asia" },
    { code: "it", name: "Italian", native: "Italiano", region: "Europe" },
    { code: "fa", name: "Persian", native: "فارسی", region: "Middle East" },
    { code: "pl", name: "Polish", native: "Polski", region: "Europe" },
    { code: "uk", name: "Ukrainian", native: "Українська", region: "Europe" },
    { code: "ml", name: "Malayalam", native: "മലയാളം", region: "Asia" },
    { code: "sw", name: "Swahili", native: "Kiswahili", region: "Africa" },
    { code: "ta", name: "Tamil", native: "தமிழ்", region: "Asia" },
    { code: "nl", name: "Dutch", native: "Nederlands", region: "Europe" },
    { code: "th", name: "Thai", native: "ไทย", region: "Asia" },
    { code: "he", name: "Hebrew", native: "עברית", region: "Middle East" },
    { code: "no", name: "Norwegian", native: "Norsk", region: "Europe" },
    { code: "sv", name: "Swedish", native: "Svenska", region: "Europe" },
    { code: "fi", name: "Finnish", native: "Suomi", region: "Europe" },
    { code: "el", name: "Greek", native: "Ελληνικά", region: "Europe" },
    { code: "hu", name: "Hungarian", native: "Magyar", region: "Europe" },
    { code: "cs", name: "Czech", native: "Čeština", region: "Europe" },
    { code: "ro", name: "Romanian", native: "Română", region: "Europe" },
    { code: "bg", name: "Bulgarian", native: "Български", region: "Europe" },
    { code: "ur", name: "Urdu", native: "اردو", region: "Asia" },
    { code: "ne", name: "Nepali", native: "नेपाली", region: "Asia" },
    { code: "am", name: "Amharic", native: "አማርኛ", region: "Africa" },
    { code: "yo", name: "Yoruba", native: "Yorùbá", region: "Africa" },
    { code: "ig", name: "Igbo", native: "Igbo", region: "Africa" },
    { code: "zu", name: "Zulu", native: "isiZulu", region: "Africa" },
    { code: "ha", name: "Hausa", native: "Hausa", region: "Africa" },
    // Fictional Languages
    ...(addFictionalLanguages
      ? [
          {
            code: "kl",
            name: "Klingon",
            native: "tlhIngan Hol",
            region: "Star Trek Universe",
          },
          {
            code: "elv",
            name: "Elvish (Quenya)",
            native: "Eldarin",
            region: "Middle-Earth",
          },
          {
            code: "sjn",
            name: "Sindarin",
            native: "Edhellen",
            region: "Middle-Earth",
          },
          {
            code: "dth",
            name: "Dothraki",
            native: "Dothraki",
            region: "Game of Thrones",
          },
          {
            code: "val",
            name: "High Valyrian",
            native: "Valyrio",
            region: "Game of Thrones",
          },
          {
            code: "hbn",
            name: "Huttese",
            native: "Huttese",
            region: "Star Wars",
          },
          {
            code: "min",
            name: "Minionese",
            native: "Banana Language",
            region: "Despicable Me",
          },
          { code: "na", name: "Na'vi", native: "Na'vi", region: "Avatar" },
          {
            code: "sim",
            name: "Simlish",
            native: "Simlish",
            region: "The Sims",
          },
        ]
      : []),
  ];

  function filterLanguages(input: string): Language[] {
    if (!input) return [];
    const inputLower = input.toLowerCase();

    const exactMatch = languages.find(
      (lang) => lang.name.toLowerCase() === inputLower
    );

    const filteredLanguages = languages
      .filter(
        (lang) =>
          lang.name.toLowerCase().includes(inputLower) ||
          lang.native.toLowerCase().includes(inputLower) ||
          lang.region.toLowerCase().includes(inputLower)
      )
      .sort((a, b) => {
        const aNameStarts = a.name.toLowerCase().startsWith(inputLower);
        const bNameStarts = b.name.toLowerCase().startsWith(inputLower);

        if (aNameStarts && !bNameStarts) return -1;
        if (!aNameStarts && bNameStarts) return 1;

        return a.name.localeCompare(b.name);
      });

    const result = [...filteredLanguages];
    if (!exactMatch && input.length >= 2) {
      const formattedInput =
        input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
      result.unshift({
        code: "",
        name: formattedInput,
        native: "",
        region: "",
        isCustom: true,
      });
    }

    return result;
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const value = e.target.value;
    setInputValue(value);
    setSuggestions(filterLanguages(value));
    setIsOpen(value.length > 0);
    setSelectedIndex(-1);
  }

  function handleSelectSuggestion(suggestion: Language): void {
    setInputValue("");
    setSelectedLanguage(suggestion);
    if (onChange) {
      onChange(suggestion);
    }
    setSuggestions([]);
    setIsOpen(false);
    inputRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (!isOpen) return;

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
      } else if (inputValue.trim().length >= 2) {
        const customLanguage: Language = {
          code: "",
          name: inputValue.trim(),
          native: "",
          region: "",
          isCustom: true,
        };
        handleSelectSuggestion(customLanguage);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
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
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleClearInput(): void {
    setInputValue("");
    setSuggestions([]);
    setSelectedLanguage(null);
    if (onChange) {
      onChange(null);
    }
    inputRef.current?.focus();
  }

  return (
    <Container className={className}>
      <InputContainer>
        <InputWrapper>
          <Input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() =>
              inputValue.trim() &&
              setSuggestions(filterLanguages(inputValue)) &&
              setIsOpen(true)
            }
            placeholder="Search for a language..."
          />
          {inputValue && (
            <ClearButton onClick={handleClearInput}>
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </ClearButton>
          )}
        </InputWrapper>

        {isOpen && suggestions.length > 0 && (
          <SuggestionsList ref={suggestionsRef}>
            <SuggestionsUl>
              {suggestions.map((lang, index) => {
                if (lang.isCustom) {
                  return (
                    <CustomSuggestionItem
                      key="custom-option"
                      isSelected={selectedIndex === index}
                      onClick={() => handleSelectSuggestion(lang)}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      <CustomSuggestionContent>
                        <svg
                          width="20"
                          height="20"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ marginRight: "0.5rem" }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                        <CustomSuggestionText>
                          Use "{lang.name}"
                        </CustomSuggestionText>
                      </CustomSuggestionContent>
                    </CustomSuggestionItem>
                  );
                }

                const matchInName = lang.name
                  .toLowerCase()
                  .indexOf(inputValue.toLowerCase());

                return (
                  <SuggestionItem
                    key={lang.code}
                    isSelected={selectedIndex === index}
                    onClick={() => handleSelectSuggestion(lang)}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <LanguageInfo>
                      {matchInName >= 0 ? (
                        <HighlightedTextWrapper>
                          {lang.name.substring(0, matchInName)}
                          <HighlightedText>
                            {lang.name.substring(
                              matchInName,
                              matchInName + inputValue.length
                            )}
                          </HighlightedText>
                          {lang.name.substring(matchInName + inputValue.length)}
                        </HighlightedTextWrapper>
                      ) : (
                        lang.name
                      )}
                      {(lang.native || lang.region) && (
                        <LanguageDetails>
                          {lang.native && (
                            <NativeText>{lang.native}</NativeText>
                          )}
                          {lang.region && <RegionTag>{lang.region}</RegionTag>}
                        </LanguageDetails>
                      )}
                    </LanguageInfo>
                    {lang.code && <LanguageCode>{lang.code}</LanguageCode>}
                  </SuggestionItem>
                );
              })}
            </SuggestionsUl>
          </SuggestionsList>
        )}
      </InputContainer>

      {showSuggested && selectedLanguage && (
        <SelectedLanguageContainer>
          <SelectedLanguageHeader>
            <div>
              <SelectedLanguageTitle>
                {selectedLanguage.name}
              </SelectedLanguageTitle>
              {selectedLanguage.native && (
                <SelectedLanguageNative>
                  {selectedLanguage.native}
                </SelectedLanguageNative>
              )}
              {selectedLanguage.isCustom && (
                <SelectedLanguageCustom>
                  Custom language entry
                </SelectedLanguageCustom>
              )}
            </div>
            <SelectedLanguageInfo>
              {selectedLanguage.region && (
                <SelectedLanguageRegion>
                  {selectedLanguage.region}
                </SelectedLanguageRegion>
              )}
              {selectedLanguage.code && (
                <SelectedLanguageCode>
                  Code: {selectedLanguage.code}
                </SelectedLanguageCode>
              )}
            </SelectedLanguageInfo>
          </SelectedLanguageHeader>
        </SelectedLanguageContainer>
      )}
    </Container>
  );
};

export default SpokenLanguageAutocomplete;
