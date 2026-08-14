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
  stage: '#050506',
  chassis: '#0E0F12',
  chassisRaised: '#16181D',
  recess: '#060607',
  pad: '#12141A',
  padPressed: '#1C1C20',
  bezel: '#2C3038',
  bezelHot: '#3A404A',
  hairline: 'rgba(255,255,255,0.07)',
  metal: '#9AA1AA',
  chrome: '#D5DAE0',
  chromeHot: '#F5F7FA',
  ink: '#EEF1F5',
  muted: '#6E7580',
  /** Brand signal — silver */
  signal: '#C8CDD4',
  amber: '#FFB020',
  cyan: '#3DDCFF',
  coral: '#FF6B4A',
  mint: '#5EF2C0',
  danger: '#FF4D6A',
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
