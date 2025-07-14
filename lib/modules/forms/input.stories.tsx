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
  render: () => {
    return <Input placeholder="Type here..." $label="Input Label" />;
  },
};

export const Sizes: Story = {
  render: () => {
    return (
      <div className="space-y-4">
        <Input
          $label="Extra Small"
          $size="xs"
          placeholder="Extra small input"
        />
        <Input $label="Small" $size="sm" placeholder="Small input" />
        <Input $label="Medium" $size="md" placeholder="Medium input" />
        <Input $label="Large" $size="lg" placeholder="Large input" />
      </div>
    );
  },
};

export const Icons: Story = {
  render: () => {
    return (
      <div className="space-y-4">
        <Input
          $label="Search"
          $leftIcon={<LuSearch />}
          placeholder="Search users..."
        />
        <Input
          $label="Username"
          $rightIcon={<LuUser />}
          placeholder="Enter username"
        />
        <Input
          $label="Password"
          $leftIcon={<LuLock />}
          $rightIcon={<LuEye />}
          type="password"
        />
      </div>
    );
  },
};

export const Password: Story = {
  render: () => {
    return <PasswordInput placeholder="Type here..." $label="Input Label" />;
  },
};

export const WithError: Story = {
  render: () => {
    return (
      <div className="space-y-4">
        <Input
          $label="Email"
          $error="Please enter a valid email address"
          placeholder="Enter your email"
        />
        <Input
          $label="Password"
          $isError={true}
          placeholder="Enter password"
          type="password"
        />
      </div>
    );
  },
};

export const States: Story = {
  render: () => {
    return (
      <div className="space-y-4">
        <Input $label="Normal State" placeholder="Normal input" />
        <Input $label="Disabled State" placeholder="Disabled input" disabled />
        <Input $label="With Value" defaultValue="Pre-filled value" />
        <Input $label="Required Field" placeholder="Required input" required />
      </div>
    );
  },
};

export const CustomFocusColor: Story = {
  render: () => {
    return (
      <div className="space-y-4">
        <Input
          $label="Green Focus"
          $focusColor="#10b981"
          placeholder="Focus me for green ring"
        />
        <Input
          $label="Purple Focus"
          $focusColor="#8b5cf6"
          placeholder="Focus me for purple ring"
        />
        <Input
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
        <Input placeholder="Input without label" />
        <Input placeholder="Another input without label" $size="sm" />
        <Input placeholder="Large input without label" $size="lg" />
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
