/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        /* Official hospital brand blue - mapped to CSS variable in globals.css */
        brand: {
          50: "var(--primary-4, rgba(24, 102, 174, 0.04))",
          100: "var(--primary-8, rgba(24, 102, 174, 0.08))",
          200: "var(--primary-16, rgba(24, 102, 174, 0.16))",
          300: "var(--primary-28, rgba(24, 102, 174, 0.28))",
          400: "var(--primary-55, rgba(24, 102, 174, 0.55))",
          500: "var(--brand-blue, #1866AE)",
          600: "var(--brand-blue, #1866AE)",
          700: "var(--brand-blue, #1866AE)",
          800: "var(--brand-blue, #1866AE)",
          900: "var(--brand-blue, #1866AE)",
          950: "var(--brand-blue, #1866AE)",
          DEFAULT: "var(--brand-blue, #1866AE)",
        },

        /* Slate and black neutral palette */
        navy: {
          50: "var(--slate-4, rgba(72, 87, 108, 0.04))",
          100: "var(--slate-8, rgba(72, 87, 108, 0.08))",
          200: "var(--slate-16, rgba(72, 87, 108, 0.16))",
          300: "var(--slate-30, rgba(72, 87, 108, 0.3))",
          400: "var(--slate-40, rgba(72, 87, 108, 0.55))",
          500: "var(--brand-slate, #48576C)",
          600: "var(--brand-slate, #48576C)",
          700: "var(--brand-slate, #48576C)",
          800: "var(--brand-black, #000000)",
          850: "var(--brand-black, #000000)",
          900: "var(--brand-black, #000000)",
          950: "var(--brand-black, #000000)",
        },

        /* Primary utilities use the official blue */
        primary: {
          50: "var(--primary-4, rgba(24, 102, 174, 0.04))",
          100: "var(--primary-9, rgba(24, 102, 174, 0.09))",
          200: "var(--primary-16, rgba(24, 102, 174, 0.16))",
          300: "var(--primary-28, rgba(24, 102, 174, 0.28))",
          400: "var(--primary-55, rgba(24, 102, 174, 0.55))",
          500: "var(--brand-blue, #1866AE)",
          600: "var(--brand-blue, #1866AE)",
          700: "var(--brand-blue, #1866AE)",
          800: "var(--brand-blue, #1866AE)",
          900: "var(--brand-blue, #1866AE)",
          950: "var(--brand-blue, #1866AE)",
          DEFAULT: "var(--brand-blue, #1866AE)",
        },

        /* Official hospital pink - mapped to CSS variable in globals.css */
        secondary: {
          DEFAULT: "var(--brand-pink, #E1194D)",
          light: "var(--accent-12, rgba(225, 25, 77, 0.12))",
          dark: "var(--brand-pink-hover, #BE1742)",
        },

        accent: {
          DEFAULT: "var(--brand-pink, #E1194D)",
          light: "var(--accent-12, rgba(225, 25, 77, 0.12))",
          dark: "var(--brand-pink-hover, #BE1742)",
        },

        highlight: {
          DEFAULT: "var(--brand-pink, #E1194D)",
          light: "var(--accent-12, rgba(225, 25, 77, 0.12))",
          dark: "var(--brand-pink-hover, #BE1742)",
        },

        /* Light surfaces */
        surface: {
          DEFAULT: "var(--brand-white, #FFFFFF)",
          dark: "var(--primary-4, rgba(24, 102, 174, 0.04))",
          card: "var(--brand-white, #FFFFFF)",
        },

        /* Official text colors */
        dark: {
          DEFAULT: "var(--brand-black, #000000)",
          800: "var(--brand-black, #000000)",
          700: "var(--brand-slate, #48576C)",
          600: "var(--brand-slate, #48576C)",
        },

        /* Emergency indicators use the official pink */
        emergency: {
          DEFAULT: "var(--brand-pink, #E1194D)",
          dark: "var(--brand-pink-hover, #BE1742)",
          light: "var(--accent-8, rgba(225, 25, 77, 0.08))",
          glow: "var(--accent-35, rgba(225, 25, 77, 0.35))",
        },
      },

      /* Font families */
      fontFamily: {
        sans: [
          "var(--font-body)",
          "Geist",
          "Segoe UI",
          "Arial",
          "sans-serif",
        ],

        heading: [
          "var(--font-heading)",
          "Geist",
          "Segoe UI",
          "Arial",
          "sans-serif",
        ],

        body: [
          "var(--font-body)",
          "Geist",
          "Segoe UI",
          "Arial",
          "sans-serif",
        ],
      },

      /* Shadow tokens */
      boxShadow: {
        luxury:
          "0 20px 40px -15px rgba(24, 102, 174, 0.12), 0 0 25px -5px rgba(24, 102, 174, 0.08)",

        "luxury-hover":
          "0 25px 50px -12px rgba(24, 102, 174, 0.2), 0 0 35px -5px rgba(225, 25, 77, 0.12)",

        "glow-teal":
          "0 0 30px -5px rgba(24, 102, 174, 0.35)",

        "glow-blue":
          "0 0 30px -5px rgba(24, 102, 174, 0.35)",

        "glow-red":
          "0 0 25px -3px rgba(225, 25, 77, 0.4)",

        card:
          "0 4px 24px -8px rgba(0, 0, 0, 0.08)",

        "card-hover":
          "0 12px 40px -8px rgba(0, 0, 0, 0.15)",
      },

      /* Animation tokens */
      animation: {
        "pulse-subtle":
          "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",

        "float-slow": "float 6s ease-in-out infinite",
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "spin-slow": "spin 8s linear infinite",
      },

      keyframes: {
        float: {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-12px)",
          },
        },

        fadeUp: {
          from: {
            opacity: "0",
            transform: "translateY(20px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },

      /* Gradients */
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg, var(--brand-blue, #1866AE) 0%, var(--brand-black, #000000) 100%)",

        "teal-gradient":
          "linear-gradient(135deg, var(--brand-blue, #1866AE) 0%, var(--brand-pink, #E1194D) 100%)",

        "dark-gradient":
          "linear-gradient(180deg, var(--brand-black, #000000) 0%, var(--brand-slate, #48576C) 100%)",

        "mesh-teal":
          "radial-gradient(at 10% 10%, rgba(24,102,174,0.15) 0px, transparent 50%), radial-gradient(at 90% 20%, rgba(225,25,77,0.08) 0px, transparent 50%), radial-gradient(at 50% 85%, rgba(72,87,108,0.06) 0px, transparent 50%)",
      },
    },
  },

  plugins: [],
};
