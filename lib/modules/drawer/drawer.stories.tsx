import type { Meta, StoryObj } from "@storybook/react";
import { Drawer } from "./component";
import { useState } from "react";

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    position: {
      control: "select",
      options: ["left", "right", "top", "bottom"],
      defaultValue: "right",
      description: "Position of the drawer",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large", "full"],
      defaultValue: "medium",
      description: "Size of the drawer",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Drawer>;

const DrawerTemplate: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <button onClick={() => setIsOpen(true)}>
          Open {args.position} Drawer ({args.size})
        </button>
        <Drawer
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          header={<h3>Drawer Header</h3>}
          footer={<button onClick={() => setIsOpen(false)}>Close</button>}
          body={
            <>
              <p>Position: {args.position}</p>
              <p>Size: {args.size}</p>
            </>
          }
        />
      </div>
    );
  },
};

export const Default = {
  ...DrawerTemplate,
  args: {
    position: "right",
    size: "medium",
  },
};

export const LeftSmall = {
  ...DrawerTemplate,
  args: {
    position: "left",
    size: "small",
  },
};

export const TopFull = {
  ...DrawerTemplate,
  args: {
    position: "top",
    size: "full",
  },
};

export const BottomLarge = {
  ...DrawerTemplate,
  args: {
    position: "bottom",
    size: "large",
  },
};
