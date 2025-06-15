import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./alert-component";
import { AlertProvider } from "./alert-provider";
import useAlert from "./use-alert";
import React from "react";

// Meta configuration for the Alert stories
const meta: Meta = {
  title: "Components/Alert",
  component: Alert,
  decorators: [(Story) => <AlertProvider>{Story()}</AlertProvider>],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Alert>;

// Demo component to showcase alert functionality
const AlertDemo = () => {
  const { showAlert } = useAlert();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <button
        onClick={() =>
          showAlert("Success message!", "success", true, "top-right")
        }
      >
        Show Success Alert
      </button>
      <button
        onClick={() => showAlert("Error message!", "error", true, "top-left")}
      >
        Show Error Alert
      </button>
      <button
        onClick={() =>
          showAlert("Warning message!", "warning", true, "bottom-right")
        }
      >
        Show Warning Alert
      </button>
      <button
        onClick={() => showAlert("Info message!", "info", true, "bottom-left")}
      >
        Show Info Alert
      </button>
      <button
        onClick={() =>
          showAlert("Upload in progress...", "upload", true, "top-right")
        }
      >
        Show Upload Alert
      </button>
      <button
        onClick={() =>
          showAlert("Auto-dismiss after 3s", "info", false, "top-right")
        }
      >
        Show Auto-dismiss Alert
      </button>
    </div>
  );
};

// Basic story with all alert variants
export const Default: Story = {
  render: () => <AlertDemo />,
};

// Individual variant stories
export const Success: Story = {
  render: () => (
    <Alert variant="success" onClose={() => {}}>
      Success message!
    </Alert>
  ),
};

export const Error: Story = {
  render: () => (
    <Alert variant="error" onClose={() => {}}>
      Error message!
    </Alert>
  ),
};

export const Warning: Story = {
  render: () => (
    <Alert variant="warning" onClose={() => {}}>
      Warning message!
    </Alert>
  ),
};

export const Info: Story = {
  render: () => (
    <Alert variant="info" onClose={() => {}}>
      Info message!
    </Alert>
  ),
};

export const Upload: Story = {
  render: () => (
    <Alert variant="upload" onClose={() => {}}>
      Upload in progress...
    </Alert>
  ),
};

// Story demonstrating auto-dismiss functionality
export const AutoDismiss: Story = {
  render: () => {
    const AutoDismissDemo = () => {
      const { showAlert } = useAlert();
      React.useEffect(() => {
        showAlert("I will disappear in 3 seconds!", "info");
      }, []);
      return null;
    };
    return <AutoDismissDemo />;
  },
};

// Story demonstrating different positions
export const DifferentPositions: Story = {
  render: () => {
    const PositionsDemo = () => {
      const { showAlert } = useAlert();
      React.useEffect(() => {
        showAlert("Top Right Alert", "success", true, "top-right");
        showAlert("Top Left Alert", "error", true, "top-left");
        showAlert("Bottom Right Alert", "warning", true, "bottom-right");
        showAlert("Bottom Left Alert", "info", true, "bottom-left");
      }, []);
      return null;
    };
    return <PositionsDemo />;
  },
};
