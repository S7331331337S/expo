/** Official MSTRMND brand tokens — metallic tetrahedron system */
export const brand = {
  name: 'MSTRMND',
  /** Continuous wordmark — use letterSpacing in UI, not literal spaces */
  wordmark: 'MSTRMND',
  tagline: 'Building intelligent systems. Empowering human potential.',
  pillars: ['Research', 'Technology', 'Systems', 'Future'] as const,
} as const;

export const colors = {
  void: '#000000',
  stage: '#000000',
  chassis: '#050506',
  chassisRaised: '#0A0A0C',
  recess: '#000000',
  pad: '#08080A',
  padPressed: '#121214',
  bezel: '#1A1A1E',
  bezelHot: '#2A2A30',
  hairline: 'rgba(255,255,255,0.05)',
  metal: '#8A9098',
  chrome: '#D0D4DA',
  chromeHot: '#F2F4F6',
  ink: '#E8EAED',
  muted: '#5A6068',
  /** Brand signal — silver */
  signal: '#C8CDD4',
  amber: '#B8BEC6',
  cyan: '#C0C5CC',
  coral: '#AEB4BC',
  mint: '#B0B6BE',
  danger: '#9AA1AA',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
} as const;

export const radii = {
  pad: 10,
  window: 14,
  pill: 999,
} as const;
