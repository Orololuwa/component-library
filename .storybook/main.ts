import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../lib/**/*.mdx", "../lib/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-interactions"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (config) => {
    if (config.css) {
      config.css.postcss = {
        plugins: [require("tailwindcss"), require("autoprefixer")],
      };
    }
    return config;
  },
};
export default config;
