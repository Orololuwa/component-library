import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import CountryAutoComplete, { Option } from "./country-autocomplete";

const meta: Meta<typeof CountryAutoComplete> = {
  title: "Forms/Country Auto-Complete Input",
  component: CountryAutoComplete,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An autocomplete input to search for and select countries with the country flags displayed",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    onChange: {
      description: "Callback function called when a country is selected",
    },
    size: {
      description: "Size of the input field",
      control: "select",
      options: ["sm", "md", "lg"],
    },
    className: {
      description: "Additional CSS classes",
      control: "text",
    },
    value: {
      description: "Controlled value of the selected country",
      control: "object",
    },
    defaultValue: {
      description: "Default value (string or Option object)",
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof CountryAutoComplete>;

export const Default: Story = {
  render: () => {
    return <CountryAutoComplete />;
  },
};

export const Sizes: Story = {
  render: () => {
    return (
      <div className="space-y-4">
        <CountryAutoComplete size="sm" />
        <CountryAutoComplete size="md" />
        <CountryAutoComplete size="lg" />
      </div>
    );
  },
};

export const GetValue: Story = {
  render: () => {
    const [selectedCountry, setSelectedCountry] = useState<Option | null>(null);

    const handleChange = (country: Option) => {
      setSelectedCountry(country);
      console.log("Selected Country:", country);
    };

    return (
      <div className="space-y-4">
        <CountryAutoComplete
          value={selectedCountry}
          onChange={(option) => {
            if (option) handleChange(option);
          }}
          size="md"
        />
        {selectedCountry && (
          <div>
            <h3>Selected Country:</h3>
            <pre>{JSON.stringify(selectedCountry, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  },
};
