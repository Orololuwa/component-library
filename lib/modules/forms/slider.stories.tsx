import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Slider from "./slider";

const meta: Meta<typeof Slider> = {
  title: "Forms/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A customizable range slider component with tick marks and labels.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "number" },
      description: "Current value of the slider",
    },
    min: {
      control: { type: "number" },
      description: "Minimum value of the slider",
    },
    max: {
      control: { type: "number" },
      description: "Maximum value of the slider",
    },
    step: {
      control: { type: "number" },
      description: "Step increment for the slider",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the slider is disabled",
    },
    customClasses: {
      control: { type: "text" },
      description: "Additional CSS classes to apply",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive wrapper component for stories
const InteractiveSlider = (args: any) => {
  const [value, setValue] = useState(args.value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };

  return (
    <div style={{ width: "400px", padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <h3>Current Value: {Math.round(value / 1000)}k</h3>
      </div>
      <Slider {...args} value={value} onChange={handleChange} />
    </div>
  );
};

// Default story
export const Default: Story = {
  render: (args) => <InteractiveSlider {...args} />,
  args: {
    value: 25000,
    min: 0,
    max: 100000,
    step: 1000,
    disabled: false,
  },
};

// Small range story
export const SmallRange: Story = {
  render: (args) => <InteractiveSlider {...args} />,
  args: {
    value: 5000,
    min: 1000,
    max: 10000,
    step: 500,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: "A smaller range slider from $1k to $10k with $500 steps.",
      },
    },
  },
};

// Disabled state story
export const Disabled: Story = {
  render: (args) => <InteractiveSlider {...args} />,
  args: {
    value: 50000,
    min: 0,
    max: 100000,
    step: 1000,
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: "A disabled slider showing the disabled state styling.",
      },
    },
  },
};

// Multiple sliders example
export const MultipleSliders: Story = {
  args: {
    disabled: true
  },

  render: () => {
    const [minValue, setMinValue] = useState(20000);
    const [maxValue, setMaxValue] = useState(80000);

    return (
      <div style={{ width: "500px", padding: "20px" }}>
        <div style={{ marginBottom: "30px" }}>
          <h3>Salary Range Filter</h3>
          <p>
            Min: {Math.round(minValue / 1000)}k - Max:{" "}
            {Math.round(maxValue / 1000)}k
          </p>
        </div>

        <div style={{ marginBottom: "30px" }}>
          <h4>Minimum Salary</h4>
          <Slider
            value={minValue}
            min={0}
            max={100000}
            step={5000}
            onChange={(e) => setMinValue(Number(e.target.value))}
          />
        </div>

        <div>
          <h4>Maximum Salary</h4>
          <Slider
            value={maxValue}
            min={0}
            max={100000}
            step={5000}
            onChange={(e) => setMaxValue(Number(e.target.value))}
          />
        </div>
      </div>
    );
  },

  parameters: {
    docs: {
      description: {
        story: "Multiple sliders working together for range filtering.",
      },
    },
  }
};

// Playground story for testing
export const Playground: Story = {
  render: (args) => <InteractiveSlider {...args} />,
  args: {
    value: 50000,
    min: 0,
    max: 100000,
    step: 1000,
    disabled: false,
    customClasses: "",
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive playground to test all props and configurations.",
      },
    },
  },
};
