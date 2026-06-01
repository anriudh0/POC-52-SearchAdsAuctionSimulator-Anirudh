import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        rails: {
          bg: "#030712",
          surface: "#0B1117",
          border: "#1F2937",
          cyan: "#38BDF8",
          indigo: "#818CF8"
        }
      },
      fontFamily: {
        sans: ["Inter", "Geist", "Arial", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 0 0.5px rgba(56, 189, 248, 0.7), 0 0 18px rgba(56, 189, 248, 0.16)"
      }
    }
  },
  plugins: []
};

export default config;
