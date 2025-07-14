import { useMemo } from "react";
import styled from "styled-components";

interface RangeSliderProps {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  customClasses?: string;
}

interface TickMark {
  value: number;
  label: string;
}

const Container = styled.div`
  position: relative;
`;

const TickMarksContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.5rem;
`;

const TickMark = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TickLine = styled.div`
  height: 0.25rem;
  width: 1px;
  background-color: #d1d5db;
`;

const TickLabel = styled.span`
  margin-top: 0.25rem;
  color: #374151;
  font-weight: 500;
`;

const SliderContainer = styled.div`
  position: relative;
`;

const StyledSlider = styled.input`
  width: 100%;
  height: 0.5rem;
  background-color: #e5e7eb;
  appearance: none;
  border-radius: 0.5rem;
  cursor: pointer;
  position: relative;
  z-index: 0;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 2.5rem;
    height: 1.5rem;
    border-radius: 9999px;
    background-color: white;
    cursor: pointer;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    border: none;
  }

  &::-moz-range-thumb {
    appearance: none;
    width: 2.5rem;
    height: 1.5rem;
    border-radius: 9999px;
    background-color: white;
    cursor: pointer;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    border: none;
  }

  &::-moz-range-track {
    background-color: #e5e7eb;
    height: 0.5rem;
    border-radius: 0.5rem;
    border: none;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const FillBar = styled.div<{ fillPercentage: number }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  height: 0.5rem;
  background-color: #3b82f6;
  border-radius: 0.5rem 0 0 0.5rem;
  z-index: 10;
  pointer-events: none;
  width: ${(props) => props.fillPercentage}%;
`;

const EmptyBar = styled.div<{ fillPercentage: number }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  height: 0.5rem;
  background-color: #e5e7eb;
  border-radius: 0 0.5rem 0.5rem 0;
  z-index: 10;
  pointer-events: none;
  width: ${(props) => 100 - props.fillPercentage}%;
`;

export default function RangeSlider(props: RangeSliderProps) {
  const generateTickMarks = (
    min: number,
    max: number,
    count: number = 11
  ): TickMark[] => {
    return Array.from({ length: count }, (_, i) => {
      // Calculate value at each point
      const value = min + (i * (max - min)) / (count - 1);
      // Convert to thousands for label
      const labelValue = Math.round(value / 1000);

      return {
        value: value,
        label: `${labelValue}k`,
      };
    });
  };

  const fillPercentage = useMemo(() => {
    return ((props.value - props.min) / (props.max - props.min)) * 100;
  }, [props.value, props.min, props.max]);

  return (
    <Container>
      <TickMarksContainer>
        {generateTickMarks(props.min, props.max).map(({ value, label }) => (
          <TickMark key={value}>
            <TickLine />
            <TickLabel>{label}</TickLabel>
          </TickMark>
        ))}
      </TickMarksContainer>

      <SliderContainer>
        <StyledSlider
          type="range"
          min={props.min}
          max={props.max}
          value={props.value}
          onChange={props.onChange}
          step={props.step}
          disabled={props.disabled}
          className={props.customClasses}
        />

        {/* Uncomment these if you want the fill bars */}
        {/* <FillBar fillPercentage={fillPercentage} />
        <EmptyBar fillPercentage={fillPercentage} /> */}
      </SliderContainer>
    </Container>
  );
}
