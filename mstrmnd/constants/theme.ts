/** Official MSTRMND brand — Linear token mapping lives in `@/tokens`. */
import { color as linearColor, font, radius as linearRadius, space } from '@/tokens';

export const brand = {
  name: 'MSTRMND',
  wordmark: 'MSTRMND',
  headline: 'The operating layer for AI systems.',
  tagline: 'Building intelligent systems. Empowering human potential.',
  pillars: ['Research', 'Technology', 'Systems', 'Future'] as const,
} as const;

/**
 * App-facing palette. Structural names map onto the shared Linear tokens
 * so marketing CSS and native StyleSheet stay in lockstep.
 */
export const colors = {
  void: linearColor.substrate,
  chassis: linearColor.surface,
  chassisRaised: linearColor.surfaceElevated,
  recess: linearColor.substrateObsidian,
  pad: linearColor.surfaceElevated,
  padPressed: linearColor.borderMuted,
  bezel: linearColor.borderHighlight,
  hairline: linearColor.hairline,
  metal: '#A8ADB4',
  chrome: '#D8DCE2',
  chromeHot: linearColor.textPrimary,
  ink: linearColor.textPrimary,
  muted: linearColor.textSecondary,
  /** Brand / system signal — Linear blur-indigo */
  signal: linearColor.accent,
  accent: linearColor.accent,
  amber: '#FFB020',
  cyan: '#3DDCFF',
  coral: '#FF6B4A',
  mint: '#5EF2C0',
  live: '#F5F5F7',
  danger: '#FF4D6A',
} as const;

export const spacing = space;

export const radii = {
  pad: linearRadius.pad,
  window: linearRadius.window,
  pill: linearRadius.pill,
  card: linearRadius.card,
} as const;

export const fonts = font;
