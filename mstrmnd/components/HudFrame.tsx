import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '@/constants/theme';

type Props = {
  children: ReactNode;
  width?: number;
};

/** Four corner ticks around a title — HUD frame from the welcome boards */
export function HudFrame({ children, width = 280 }: Props) {
  return (
    <View style={[styles.wrap, { width }]}>
      <View style={[styles.tick, styles.tl]} />
      <View style={[styles.tick, styles.tr]} />
      <View style={[styles.tick, styles.bl]} />
      <View style={[styles.tick, styles.br]} />
      <View style={styles.body}>{children}</View>
    </View>
  );
}

export function StatusLive({ label = 'SYSTEM ONLINE' }: { label?: string }) {
  return (
    <View style={styles.live}>
      <View style={styles.dot} />
      <Text style={styles.liveText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignSelf: 'center',
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  body: {
    alignItems: 'center',
    gap: 8,
  },
  tick: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderColor: 'rgba(255,255,255,0.35)',
  },
  tl: { top: 0, left: 0, borderTopWidth: 1, borderLeftWidth: 1 },
  tr: { top: 0, right: 0, borderTopWidth: 1, borderRightWidth: 1 },
  bl: { bottom: 0, left: 0, borderBottomWidth: 1, borderLeftWidth: 1 },
  br: { bottom: 0, right: 0, borderBottomWidth: 1, borderRightWidth: 1 },
  live: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.live,
    shadowColor: colors.live,
    shadowOpacity: 0.9,
    shadowRadius: 6,
  },
  liveText: {
    fontFamily: fonts.sansMedium,
    color: colors.metal,
    fontSize: 9,
    letterSpacing: 1.6,
  },
});
