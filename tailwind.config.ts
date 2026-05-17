import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./state/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0F2342",
        sky: "#4EA1FF",
        "sky-soft": "#E8F4FF",
        mist: "#F6FAFF",
        line: "#D8E8F8",
      },
      boxShadow: {
        phone: "0 28px 70px rgba(40, 87, 138, 0.18)",
        card: "0 14px 32px rgba(78, 161, 255, 0.12)",
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(circle at top, rgba(112, 191, 255, 0.28), transparent 36%), linear-gradient(180deg, #f7fbff 0%, #edf6ff 46%, #f7fbff 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
