import type { Meta, StoryObj } from "@storybook/react";
import { Input, PasswordInput } from "./input";
import { LuEye, LuLock, LuSearch, LuUser } from "react-icons/lu";

const meta: Meta<typeof Input> = {
  title: "Forms/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    $label: {
      control: "text",
      description: "Label text for the input",
    },
    $size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
      description: "Size of the input",
    },
    $color: {
      control: "color",
      description: "font color",
    },
    $isError: {
      control: "boolean",
      description: "Whether the input is in error state",
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
      description: "Whether the input is disabled",
    },
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "tel", "url", "search"],
      description: "Input type",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: (args) => {
    return <Input {...args} placeholder="Type here..." $label="Input Label" />;
  },
};

export const Sizes: Story = {
  render: (args) => {
    return (
      <div className="space-y-4">
        <Input
          $label="Extra Small"
          $size="xs"
          placeholder="Extra small input"
          {...args}
        />
        <Input $label="Small" $size="sm" placeholder="Small input" {...args} />
        <Input
          $label="Medium"
          $size="md"
          placeholder="Medium input"
          {...args}
        />
        <Input $label="Large" $size="lg" placeholder="Large input" {...args} />
      </div>
    );
  },
};

export const Icons: Story = {
  render: (args) => {
    return (
      <div className="space-y-4">
        <Input
          $label="Search"
          $leftIcon={<LuSearch />}
          placeholder="Search users..."
          {...args}
        />
        <Input
          $label="Username"
          $rightIcon={<LuUser />}
          placeholder="Enter username"
          {...args}
        />
        <Input
          $label="Password"
          $leftIcon={<LuLock />}
          $rightIcon={<LuEye />}
          type="password"
          {...args}
        />
      </div>
    );
  },
};

export const Password: Story = {
  render: (args) => {
    return (
      <PasswordInput
        {...args}
        placeholder="Type here..."
        $label="Input Label"
      />
    );
  },
};

export const WithError: Story = {
  render: (args) => {
    return (
      <div className="space-y-4">
        <Input
          $label="Email"
          $error="Please enter a valid email address"
          placeholder="Enter your email"
          {...args}
        />
        <Input
          $label="Password"
          $isError={true}
          placeholder="Enter password"
          type="password"
          {...args}
        />
      </div>
    );
  },
};

export const States: Story = {
  render: (args) => {
    return (
      <div className="space-y-4">
        <Input $label="Normal State" placeholder="Normal input" {...args} />
        <Input
          $label="Disabled State"
          placeholder="Disabled input"
          disabled
          {...args}
        />
        <Input $label="With Value" defaultValue="Pre-filled value" {...args} />
        <Input
          $label="Required Field"
          placeholder="Required input"
          required
          {...args}
        />
      </div>
    );
  },
};

export const CustomFocusColor: Story = {
  render: (args) => {
    return (
      <div className="space-y-4">
        <Input
          $label="Green Focus"
          $focusColor="#10b981"
          placeholder="Focus me for green ring"
          {...args}
        />
        <Input
          $label="Purple Focus"
          $focusColor="#8b5cf6"
          placeholder="Focus me for purple ring"
          {...args}
        />
        <Input
          $label="Orange Focus"
          $focusColor="#f59e0b"
          placeholder="Focus me for orange ring"
          {...args}
        />
      </div>
    );
  },
};

export const WithoutLabel: Story = {
  render: (args) => {
    return (
      <div className="space-y-4">
        <Input placeholder="Input without label" {...args} />
        <Input placeholder="Another input without label" $size="sm" {...args} />
        <Input placeholder="Large input without label" $size="lg" {...args} />
      </div>
    );
  },
};

export const Playground: Story = {
  args: {
    $label: "Playground Input",
    $size: "md",
    placeholder: "Try different props...",
    $isError: false,
    $error: "",
    $focusColor: "#2563eb",
    disabled: false,
    type: "text",
  },
};
