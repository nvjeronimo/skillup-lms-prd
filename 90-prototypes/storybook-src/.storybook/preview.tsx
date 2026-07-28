import type { Preview } from "@storybook/react";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import "../src/tokens/tokens.css";
import "../src/tokens/global.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: { disable: true },
    options: {
      storySort: {
        order: [
          "Introduction",
          "Foundations",
          ["Design Tokens", "Typography", "Color", "Spacing", "Iconography", "Accessibility"],
          "Atoms",
          "Molecules",
          "Organisms",
          "Pages",
        ],
      },
    },
  },
  decorators: [
    withThemeByDataAttribute({
      themes: { dark: "dark", light: "light" },
      defaultTheme: "dark",
      attributeName: "data-theme",
    }),
  ],
};

export default preview;
