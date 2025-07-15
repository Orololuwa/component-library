import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { CurrencyInput } from "./currency-input";

const meta: Meta<typeof CurrencyInput> = {
  title: "Forms/CurrencyInput",
  component: CurrencyInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "text" },
      description: "The current value of the input",
    },
    onChange: {
      action: "changed",
      description: "Callback fired when the value changes",
    },
    countryCode: {
      control: { type: "select" },
      options: ["US", "GB", "EU", "CA", "AU", "JP", "IN"],
      description: "Country code to determine currency symbol",
    },
    placeholder: {
      control: { type: "text" },
      description: "Placeholder text",
    },
    onBlur: {
      action: "blurred",
      description: "Callback fired when input loses focus",
    },
    className: {
      control: { type: "text" },
      description: "Additional CSS classes",
    },
    isError: {
      control: { type: "boolean" },
      description: "Whether the input is in an error state",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Size of the input",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the input is disabled",
    },
  },
};

export default meta;
type Story = StoryObj<typeof CurrencyInput>;

export const Default: Story = {
  render: () => {
    const [ngnValue, setNgnValue] = useState<string>("0");

    return (
      <div className="space-y-6 p-6 max-w-md">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            NGN Amount (Medium)
          </label>
          <CurrencyInput
            value={ngnValue}
            onChange={(value, _) => setNgnValue(value)}
            countryCode="NGN"
            size="md"
            placeholder="Enter NGN amount"
          />
        </div>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [usdValue, setUsdValue] = useState<string>("1234.56");
    const [eurValue, setEurValue] = useState<string>("0");
    const [ngnValue, setNgnValue] = useState<string>("500000");

    return (
      <div className="space-y-6 p-6 max-w-md">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            USD Amount (Small)
          </label>
          <CurrencyInput
            value={usdValue}
            onChange={(value, _) => setUsdValue(value)}
            countryCode="USD"
            size="sm"
            placeholder="Enter USD amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            EUR Amount (Medium)
          </label>
          <CurrencyInput
            value={eurValue}
            onChange={(value, _) => setEurValue(value)}
            countryCode="EUR"
            size="md"
            placeholder="Enter EUR amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            NGN Amount (Large)
          </label>
          <CurrencyInput
            value={ngnValue}
            onChange={(value, _) => setNgnValue(value)}
            countryCode="NGN"
            size="lg"
            placeholder="Enter NGN amount"
          />
        </div>
      </div>
    );
  },
};

export const States: Story = {
  render: () => {
    return (
      <div className="space-y-6 p-6 max-w-md">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Error State
          </label>
          <CurrencyInput
            value="0"
            onChange={() => {}}
            countryCode="GB"
            size="md"
            isError={true}
            placeholder="Enter GBP amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Disabled State
          </label>
          <CurrencyInput
            value="1000"
            onChange={() => {}}
            countryCode="JP"
            size="md"
            disabled={true}
            placeholder="Enter JPY amount"
          />
        </div>
      </div>
    );
  },
};
