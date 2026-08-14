# MSTRMND

The operating layer for AI systems.

Expo (SDK 57) controller. Official mark is the metallic tetrahedron. Copy uses **MSTRMND** with that single tagline.

Three beats:

1. **Welcome** — mark, wordmark, tagline, Enter System
2. **Home** — command list (Create Plan, Research, Build System, Analyze, Connect Tools, Evolve)
3. **Hub** — one integrations ring

The MIDI-style **Systems** deck (12 department pads + CONDUCTOR) is still the instrument behind those commands.

## Stack

- Expo SDK 57 + Expo Router
- Vercel AI SDK (`ai` + `@ai-sdk/react`) with `expo/fetch` streaming
- Reanimated pulses + SVG brand mark
- Syne + Space Grotesk

## Run

```bash
cd mstrmnd
npm install --legacy-peer-deps
npx expo start
```

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
