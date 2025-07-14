import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./textarea";
import { LuMessageSquare, LuSend } from "react-icons/lu";

const meta: Meta<typeof Textarea> = {
  title: "Forms/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    $label: {
      control: "text",
      description: "Label text for the Textarea",
    },
    $size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
      description: "Size of the Textarea",
    },
    $color: {
      control: "color",
      description: "font color",
    },
    $isError: {
      control: "boolean",
      description: "Whether the Textarea is in error state",
    },
    $error: {
      control: "text",
      description: "Error message to display",
    },
    $focusColor: {
      control: "color",
      description: "Custom focus color",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    disabled: {
      control: "boolean",
      description: "Whether the Textarea is disabled",
    },
    $showCharacterCount: {
      control: "boolean",
      description: "Whether to show character count",
    },
    $maxLength: {
      control: "number",
      description: "Maximum length of the Textarea",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  render: () => {
    return (
      <Textarea $label="Message" placeholder="Type your message..." rows={4} />
    );
  },
};

export const CharacterCount: Story = {
  render: () => {
    return (
      <Textarea
        $label="Bio"
        placeholder="Tell us about yourself..."
        $showCharacterCount={true}
        $maxLength={280}
      />
    );
  },
};

export const Sizes: Story = {
  render: () => {
    return (
      <div className="space-y-4">
        <Textarea
          $label="Extra Small"
          $size="xs"
          placeholder="Extra small Textarea"
        />
        <Textarea $label="Small" $size="sm" placeholder="Small Textarea" />
        <Textarea $label="Medium" $size="md" placeholder="Medium Textarea" />
        <Textarea $label="Large" $size="lg" placeholder="Large Textarea" />
      </div>
    );
  },
};

export const WithIcon: Story = {
  render: () => {
    return (
      <div className="space-y-4">
        <Textarea
          $label="Comment"
          $topLeftIcon={<LuMessageSquare />}
          $bottomRightIcon={<LuSend />}
          $bottomRightIconClickable={true}
          placeholder="Add a comment..."
          $size="md"
        />
      </div>
    );
  },
};

export const WithError: Story = {
  render: () => {
    return (
      <div className="space-y-4">
        <Textarea
          $label="Description"
          $error="Description is required"
          placeholder="Enter description..."
        />
      </div>
    );
  },
};

export const States: Story = {
  render: () => {
    return (
      <div className="space-y-4">
        <Textarea $label="Normal State" placeholder="Normal Textarea" />
        <Textarea
          $label="Disabled State"
          placeholder="Disabled Textarea"
          disabled
        />
        <Textarea $label="With Value" defaultValue="Pre-filled value" />
        <Textarea
          $label="Required Field"
          placeholder="Required Textarea"
          required
        />
      </div>
    );
  },
};

export const CustomFocusColor: Story = {
  render: () => {
    return (
      <div className="space-y-4">
        <Textarea
          $label="Green Focus"
          $focusColor="#10b981"
          placeholder="Focus me for green ring"
        />
        <Textarea
          $label="Purple Focus"
          $focusColor="#8b5cf6"
          placeholder="Focus me for purple ring"
        />
        <Textarea
          $label="Orange Focus"
          $focusColor="#f59e0b"
          placeholder="Focus me for orange ring"
        />
      </div>
    );
  },
};

export const WithoutLabel: Story = {
  render: () => {
    return (
      <div className="space-y-4">
        <Textarea placeholder="Textarea without label" />
        <Textarea placeholder="Another Textarea without label" $size="sm" />
        <Textarea placeholder="Large Textarea without label" $size="lg" />
      </div>
    );
  },
};

export const Playground: Story = {
  args: {
    $label: "Playground Textarea",
    $size: "md",
    placeholder: "Try different props...",
    $isError: false,
    $error: "",
    $focusColor: "#2563eb",
    disabled: false,
    $showCharacterCount: false,
    $maxLength: 500,
  },
};
