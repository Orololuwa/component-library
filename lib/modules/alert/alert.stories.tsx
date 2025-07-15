import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./component";
import { AlertProvider } from "./provider";
import useAlert from "./use-alert";
import React from "react";

const meta: Meta = {
  title: "Overlay/Alert",
  component: Alert,
  decorators: [(Story) => <AlertProvider>{Story()}</AlertProvider>],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["success", "error", "warning", "info", "upload"],
      defaultValue: "info",
      description: "Alert variant style",
    },
    position: {
      control: "select",
      options: ["top-right", "top-left", "bottom-right", "bottom-left"],
      defaultValue: "top-right",
      description: "Alert position on screen",
    },
    dismissible: {
      control: "boolean",
      defaultValue: false,
      description: "Whether alert can be manually dismissed",
    },
    message: {
      control: "text",
      defaultValue: "This is an alert message",
      description: "Alert message content",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Alert>;

// Demo component to showcase alert functionality
const AlertDemo = ({ message, variant, position, dismissible }: any) => {
  const { showAlert } = useAlert();

  React.useEffect(() => {
    showAlert(message, variant, dismissible, position);
  }, [message, variant, position, dismissible]);

  return (
    <div style={{ padding: "20px" }}>
      <h3>Current Configuration:</h3>
      <ul>
        <li>Message: {message}</li>
        <li>Variant: {variant}</li>
        <li>Position: {position}</li>
        <li>Dismissible: {dismissible ? "Yes" : "No"}</li>
      </ul>
      <button
        onClick={() => showAlert(message, variant, dismissible, position)}
      >
        Show Alert Again
      </button>
    </div>
  );
};

// Template for all stories
const Template: Story = {
  render: (args) => <AlertDemo {...args} />,
};

// Default story with controls
export const Default = {
  ...Template,
  args: {
    message: "This is a default alert",
    variant: "info",
    position: "top-right",
    dismissible: false,
  },
};

// Preset configurations
export const SuccessAlert = {
  ...Template,
  args: {
    message: "Operation completed successfully!",
    variant: "success",
    position: "top-right",
    dismissible: true,
  },
};

export const ErrorAlert = {
  ...Template,
  args: {
    message: "An error occurred!",
    variant: "error",
    position: "top-right",
    dismissible: true,
  },
};

export const WarningAlert = {
  ...Template,
  args: {
    message: "Warning: This action cannot be undone",
    variant: "warning",
    position: "bottom-left",
    dismissible: true,
  },
};

export const UploadAlert = {
  ...Template,
  args: {
    message: "Upload in progress...",
    variant: "upload",
    position: "bottom-right",
    dismissible: false,
  },
};

// Auto-dismissing alert example
export const AutoDismiss = {
  ...Template,
  args: {
    message: "I will auto-dismiss in 3 seconds",
    variant: "info",
    position: "top-right",
    dismissible: false,
  },
};
