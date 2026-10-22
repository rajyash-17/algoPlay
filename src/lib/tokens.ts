/**
 * AlgoPlay Neo-Brutalist Doodle Design Tokens
 * 
 * Single source of truth for:
 * - Colors (flat bright arcade & doodle tones, high contrast)
 * - Borders (thick brutalist black outlines)
 * - Shadows (hard offset brutalist drop shadows)
 * - Fonts & typography
 * - Component styling presets
 */

export const tokens = {
  colors: {
    // Canvas & backgrounds
    canvas: '#FAF7F0',        // Warm newsprint cream
    surface: '#FFFFFF',       // Pure white card surfaces
    surfaceMuted: '#F4EFE6',  // Secondary background
    overlay: 'rgba(0, 0, 0, 0.5)',

    // Inks (doodle black)
    ink: '#121212',           // Primary dark text / strokes
    inkMuted: '#525252',      // Secondary text
    inkSubtle: '#8C8C8C',     // Muted labels / line numbers

    // Neo-brutalist accent palette (flat, punchy, high-contrast)
    primary: '#FFE600',       // Electric Canary Yellow
    primaryHover: '#FFD000',
    secondary: '#FF5E7E',     // Punchy Bubblegum Pink
    secondaryHover: '#E04866',
    accent: '#4DEEEA',        // Neo-Cyan
    accentHover: '#29D3CF',
    success: '#00F0A0',       // Mint Neon Green
    successHover: '#00D68F',
    warning: '#FFA800',       // Tangerine Orange
    warningHover: '#E69700',
    danger: '#FF3366',        // Coral Red
    dangerHover: '#E61E51',
    purple: '#B388FF',        // Electric Lavender
    purpleHover: '#9D6BF0',

    // Data structure visualization state colors
    viz: {
      defaultBg: '#FFFFFF',
      defaultBorder: '#121212',
      defaultText: '#121212',
      compareBg: '#4DEEEA',       // Cyan for compared / read
      swapBg: '#FF5E7E',          // Pink for swapped / modified
      sortedBg: '#00F0A0',        // Green for settled / target match
      visitedBg: '#FFE600',       // Yellow for visited / active
      windowBg: 'rgba(179, 136, 255, 0.22)', // Window bracket fill
      windowBorder: '#B388FF',    // Window bracket outline
      pointerBg: '#121212',       // Solid ink pointer badge
      pointerText: '#FFE600',     // Canary yellow badge text
    },

    // Difficulty badges
    difficulty: {
      Easy: {
        bg: '#00F0A0',
        text: '#121212',
      },
      Medium: {
        bg: '#FFA800',
        text: '#121212',
      },
      Hard: {
        bg: '#FF3366',
        text: '#FFFFFF',
      },
    },
  },

  borders: {
    thin: '1px solid #121212',
    standard: '2px solid #121212',
    thick: '3px solid #121212',
    heavy: '4px solid #121212',
    radius: {
      none: '0px',
      sm: '4px',
      md: '8px',
      lg: '12px',
      pill: '9999px',
    },
  },

  shadows: {
    none: 'none',
    sm: '2px 2px 0px #121212',
    standard: '4px 4px 0px #121212',
    large: '6px 6px 0px #121212',
    hover: '2px 2px 0px #121212',
    active: '0px 0px 0px #121212',
  },

  fonts: {
    mono: 'ui-monospace, SFMono-Regular, "JetBrains Mono", Menlo, Monaco, Consolas, monospace',
    sans: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    display: '"Comic Neue", "Chalkboard SE", system-ui, -apple-system, sans-serif',
  },
} as const;

export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';
export type VisualRole = 'pointer' | 'window' | 'visited' | 'result' | 'compare' | 'swap';
