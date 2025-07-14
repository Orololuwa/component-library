import type { Preview } from "@storybook/react-vite";
import "../lib/styles/index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    addons: {
      orientation: "right",
    },
  },
};

export default preview;
