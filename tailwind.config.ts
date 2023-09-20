import type { Config } from "tailwindcss";
import AnimatePlugin from "tailwindcss-animate";
import WindyRadixPalette from "windy-radix-palette";

const config: Config = {
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
  ],
  theme: {},
  plugins: [AnimatePlugin, WindyRadixPalette],
};
export default config;
