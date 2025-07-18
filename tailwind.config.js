/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", // light gray border
        input: "var(--color-input)", // white input background
        ring: "var(--color-ring)", // deep forest green
        background: "var(--color-background)", // pure white with subtle warmth
        foreground: "var(--color-foreground)", // dark blue-gray
        primary: {
          DEFAULT: "var(--color-primary)", // deep forest green
          foreground: "var(--color-primary-foreground)", // white
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", // warm saddle brown
          foreground: "var(--color-secondary-foreground)", // white
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", // clear red destructive
          foreground: "var(--color-destructive-foreground)", // white
        },
        muted: {
          DEFAULT: "var(--color-muted)", // light neutral surface
          foreground: "var(--color-muted-foreground)", // medium gray
        },
        accent: {
          DEFAULT: "var(--color-accent)", // energetic coral
          foreground: "var(--color-accent-foreground)", // white
        },
        popover: {
          DEFAULT: "var(--color-popover)", // white popover background
          foreground: "var(--color-popover-foreground)", // dark blue-gray
        },
        card: {
          DEFAULT: "var(--color-card)", // white card background
          foreground: "var(--color-card-foreground)", // dark blue-gray
        },
        success: {
          DEFAULT: "var(--color-success)", // standard success green
          foreground: "var(--color-success-foreground)", // white
        },
        warning: {
          DEFAULT: "var(--color-warning)", // amber warning
          foreground: "var(--color-warning-foreground)", // dark blue-gray
        },
        error: {
          DEFAULT: "var(--color-error)", // clear red error
          foreground: "var(--color-error-foreground)", // white
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        heading: ['Inter', 'sans-serif'],
        body: ['Source Sans Pro', 'sans-serif'],
        caption: ['Nunito Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'soft': '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
        'soft-lg': '0 4px 6px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24)',
      },
      animation: {
        'cart-bounce': 'cartBounce 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'gentle-pulse': 'gentlePulse 1.5s ease-in-out infinite',
      },
      keyframes: {
        cartBounce: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
        gentlePulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(280px, 1fr))',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}