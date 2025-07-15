import type { Meta, StoryObj } from "@storybook/react";
import LanguageAutocomplete, { Language } from "./language-autocomplete";
import { useState } from "react";

const meta: Meta<typeof LanguageAutocomplete> = {
  title: "Forms/Language Auto-Complete Input",
  component: LanguageAutocomplete,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onChange: {
      action: "changed",
      description: "Callback fired when the value changes",
    },
    className: {
      control: { type: "text" },
      description: "Additional CSS classes",
    },
    addFictionalLanguages: {
      control: "boolean",
      description: "Option to add fictional languages to the options",
    },
    showSuggested: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof LanguageAutocomplete>;

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<Language | null>(null);
    return (
      <div className="space-y-6 p-6" style={{ width: "400px" }}>
        {selected ? (
          <div>
            <div>
              Selected Language: <b>{selected?.name}</b>
            </div>
          </div>
        ) : null}
        <LanguageAutocomplete
          onChange={setSelected}
          addFictionalLanguages
          showSuggested
        />
      </div>
    );
  },
};
