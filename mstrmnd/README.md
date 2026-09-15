# MSTRMND

The operating layer for AI systems.

Expo (SDK 57) controller. Official mark is the metallic tetrahedron. Copy uses **MSTRMND** with that single tagline. Marketing and the native app share one **Linear** token set (true-black substrate, indigo accent, glass surfaces).

Three beats:

1. **Welcome** — mark, wordmark, tagline, Enter System
2. **Home** — command list (Create Plan, Research, Build System, Analyze, Connect Tools, Evolve)
3. **Hub** — one integrations ring

The MIDI-style **Systems** deck (12 department pads + CONDUCTOR) is still the instrument behind those commands.

## Shared design tokens

`tokens/index.ts` is the source of truth. Hex values feed:

| Surface | Consumer |
| --- | --- |
| Marketing (web) | CSS variables + `.linear-glow-card` / `.linear-text-shimmer` via `tokens/css.ts` |
| Expo app | StyleSheet + `GlassCard` (`expo-blur` on iOS/web, dark fallback on Android) + `CinematicBackground` |
| Navigation | `linearNavigationTheme` (React Navigation dark theme) |
| Tailwind / NativeWind | `tokens/nativewind.ts` + `tailwindThemeExtend` |

| Token | Hex |
| --- | --- |
| Substrate | `#000000` / `#030303` |
| Surface | `#0B0B0C` / `#121214` |
| Borders | `#1F1F23` / `#2E2E33` |
| Type | `#F5F5F7` / `#8A8A93` |
| Accent | `#5E6AD2` |

## Stack

- Expo SDK 57 + Expo Router
- Inter (UI) + Syne (wordmark)
- `expo-blur` glass + `expo-linear-gradient` cinematic glow
- Vercel AI SDK (`ai` + `@ai-sdk/react`) with `expo/fetch` streaming
- Reanimated pulses + SVG brand mark

## Run

```bash
cd mstrmnd
npm install --legacy-peer-deps
npx expo start
```

Web loads the marketing stage (shimmer headline, glass cards, token swatches) around the live phone preview. Native skips the marketing frame and opens the controller full-screen.

Regenerate splash/icon rasters after mark changes:

```bash
node scripts/generate-brand-assets.mjs
```

### Live streaming

1. Copy `.env.example` → `.env`
2. Set `AI_GATEWAY_API_KEY` (Vercel AI Gateway)
3. Optionally set `EXPO_PUBLIC_AI_GATEWAY_API_KEY=1` so the client prefers the API over the demo stream

Without a key, cues use a local character-stream demo.

## Layout

| Screen | Role |
|--------|------|
| Welcome | Tetrahedron + tagline + **Enter System** |
| Home | Six commands + cue field |
| Hub | Integration orbit |
| Systems | 12 department pads + main window |
