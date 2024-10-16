import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,mdx}"],
  corePlugins: { preflight: false },
  theme: {},
  plugins: [],
};
export default config;
