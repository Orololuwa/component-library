import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./component";
import { useState } from "react";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large", "full"],
      defaultValue: "medium",
      description: "Size of the modal",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

const ModalTemplate: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <button onClick={() => setIsOpen(true)}>
          Open Modal ({args.size})
        </button>
        <Modal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          header={<h3>Modal Header</h3>}
          footer={<button onClick={() => setIsOpen(false)}>Close</button>}
          body={
            <>
              <p>Size: {args.size}</p>
              <p>This is a modal with customizable size.</p>
              <div style={{ height: "200px" }}>Scrollable content area</div>
            </>
          }
        />
      </div>
    );
  },
};

export const Default = {
  ...ModalTemplate,
  args: {
    size: "medium",
  },
};

export const Small = {
  ...ModalTemplate,
  args: {
    size: "small",
  },
};

export const Large = {
  ...ModalTemplate,
  args: {
    size: "large",
  },
};

export const FullWidth = {
  ...ModalTemplate,
  args: {
    size: "full",
  },
};
