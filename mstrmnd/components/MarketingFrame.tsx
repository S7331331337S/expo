import { Platform, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import type { ReactNode } from 'react';
import { BrandLockup } from '@/components/BrandLockup';
import { CinematicBackground } from '@/components/CinematicBackground';
import { GlassCard } from '@/components/GlassCard';
import { ShimmerText } from '@/components/ShimmerText';
import { brand } from '@/constants/theme';
import { color, font } from '@/tokens';

type Props = {
  children: ReactNode;
};

const WIDE = 1100;

const FEATURES = [
  {
    kicker: 'Grid',
    title: 'Twelve live pads',
    body: 'Every department on one surface — status, cue, and session in the same dark room.',
  },
  {
    kicker: 'Conductor',
    title: 'One operator',
    body: 'Route work across the company, synthesize the answer, and keep the score.',
  },
  {
    kicker: 'Session',
    title: 'Always on',
    body: 'Streaming replies, living pads, and a single indigo signal when something moves.',
  },
] as const;

/**
 * Web marketing stage around the live Expo phone preview.
 * Native apps skip this and render the controller full-screen.
 */
export function MarketingFrame({ children }: Props) {
  const { width } = useWindowDimensions();

  if (Platform.OS !== 'web') {
    return <>{children}</>;
  }

  const wide = width >= WIDE;

  return (
    <View style={styles.root}>
      <CinematicBackground glowHeight={wide ? 560 : 320} />
      <View style={[styles.nav, !wide && styles.navNarrow]}>
        <BrandLockup markSize={22} glow />
        <Text style={styles.navMeta}>In session</Text>
      </View>
      <View style={[styles.hero, !wide && styles.heroNarrow]}>
        <View style={[styles.copy, !wide && styles.copyNarrow]}>
          <Text style={styles.kicker}>Agent controller</Text>
          <ShimmerText style={wide ? styles.headline : styles.headlineNarrow}>
            The operating layer for AI systems.
          </ShimmerText>
          <Text style={[styles.lede, !wide && styles.ledeNarrow]}>{brand.tagline}</Text>
          {wide ? (
            <View style={styles.features}>
              {FEATURES.map((feature) => (
                <GlassCard key={feature.kicker} style={styles.feature} padded={false}>
                  <View style={styles.featureInner}>
                    <Text style={styles.featureKicker}>{feature.kicker}</Text>
                    <Text style={styles.featureTitle}>{feature.title}</Text>
                    <Text style={styles.featureBody}>{feature.body}</Text>
                  </View>
                </GlassCard>
              ))}
            </View>
          ) : null}
        </View>
        <View style={styles.deviceSlot}>
          <View pointerEvents="none" style={styles.deviceGlow} />
          {children}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: color.substrate,
  },
  nav: {
    zIndex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    paddingTop: 22,
    paddingBottom: 8,
  },
  navNarrow: {
    paddingHorizontal: 20,
    paddingTop: 14,
  },
  navMeta: {
    fontFamily: font.sansMedium,
    color: color.textSecondary,
    fontSize: 12,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },
  hero: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingBottom: 32,
    gap: 64,
    zIndex: 1,
  },
  heroNarrow: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingTop: 12,
    gap: 28,
  },
  copy: {
    flex: 1,
    maxWidth: 560,
    gap: 18,
  },
  copyNarrow: {
    maxWidth: 640,
    width: '100%',
    alignItems: 'center',
  },
  kicker: {
    fontFamily: font.sansMedium,
    color: color.accent,
    fontSize: 12,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
  },
  headline: {
    fontFamily: font.sansSemi,
    fontSize: 56,
    lineHeight: 60,
    letterSpacing: -1.8,
  },
  headlineNarrow: {
    fontFamily: font.sansSemi,
    fontSize: 32,
    lineHeight: 36,
    letterSpacing: -1,
    textAlign: 'center',
  },
  lede: {
    fontFamily: font.sans,
    color: color.textSecondary,
    fontSize: 17,
    lineHeight: 26,
    maxWidth: 420,
  },
  ledeNarrow: {
    textAlign: 'center',
  },
  features: {
    marginTop: 8,
    gap: 10,
  },
  feature: {
    maxWidth: 440,
  },
  featureInner: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 4,
  },
  featureKicker: {
    fontFamily: font.sansMedium,
    color: color.accent,
    fontSize: 11,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  featureTitle: {
    fontFamily: font.sansSemi,
    color: color.textPrimary,
    fontSize: 15,
    letterSpacing: -0.2,
  },
  featureBody: {
    fontFamily: font.sans,
    color: color.textSecondary,
    fontSize: 13,
    lineHeight: 19,
  },
  deviceSlot: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  deviceGlow: {
    position: 'absolute',
    width: 420,
    height: 520,
    borderRadius: 260,
    backgroundColor: 'rgba(94, 106, 210, 0.16)',
  },
});
