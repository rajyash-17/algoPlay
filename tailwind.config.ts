import type { Config } from 'tailwindcss';
import { tokens } from './src/lib/tokens';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/renderers/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: tokens.colors.canvas,
        surface: tokens.colors.surface,
        'surface-muted': tokens.colors.surfaceMuted,
        ink: tokens.colors.ink,
        'ink-muted': tokens.colors.inkMuted,
        'ink-subtle': tokens.colors.inkSubtle,
        primary: tokens.colors.primary,
        'primary-hover': tokens.colors.primaryHover,
        secondary: tokens.colors.secondary,
        'secondary-hover': tokens.colors.secondaryHover,
        accent: tokens.colors.accent,
        'accent-hover': tokens.colors.accentHover,
        success: tokens.colors.success,
        'success-hover': tokens.colors.successHover,
        warning: tokens.colors.warning,
        'warning-hover': tokens.colors.warningHover,
        danger: tokens.colors.danger,
        'danger-hover': tokens.colors.dangerHover,
        purple: tokens.colors.purple,
        'purple-hover': tokens.colors.purpleHover,
      },
      boxShadow: {
        sm: tokens.shadows.sm,
        DEFAULT: tokens.shadows.standard,
        standard: tokens.shadows.standard,
        large: tokens.shadows.large,
        hover: tokens.shadows.hover,
        none: 'none',
      },
      borderWidth: {
        '3': '3px',
      },
      fontFamily: {
        sans: [tokens.fonts.sans],
        mono: [tokens.fonts.mono],
        display: [tokens.fonts.display],
      },
    },
  },
  plugins: [],
};

export default config;
