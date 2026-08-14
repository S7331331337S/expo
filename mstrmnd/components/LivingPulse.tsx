import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';

type Props = {
  color: string;
  active: boolean;
  intensity?: number;
  bars?: number;
};

/** Living waveform — gives each pad the illusion of process / breath */
export function LivingPulse({
  color,
  active,
  intensity = 0.4,
  bars = 5,
}: Props) {
  const phase = useSharedValue(0);
  const glow = useSharedValue(intensity);

  useEffect(() => {
    phase.value = withRepeat(
      withTiming(1, {
        duration: active ? 780 : 2200,
        easing: Easing.inOut(Easing.sin),
      }),
      -1,
      true,
    );
  }, [active, phase]);

  useEffect(() => {
    glow.value = withTiming(active ? Math.max(intensity, 0.72) : intensity * 0.45, {
      duration: 350,
    });
  }, [active, intensity, glow]);

  return (
    <View style={styles.row}>
      {Array.from({ length: bars }).map((_, i) => (
        <PulseBar
          key={i}
          index={i}
          color={color}
          phase={phase}
          glow={glow}
          active={active}
        />
      ))}
    </View>
  );
}

function PulseBar({
  index,
  color,
  phase,
  glow,
  active,
}: {
  index: number;
  color: string;
  phase: SharedValue<number>;
  glow: SharedValue<number>;
  active: boolean;
}) {
  const style = useAnimatedStyle(() => {
    const offset = index * 0.15;
    const wave = Math.sin((phase.value + offset) * Math.PI * 2);
    const base = active ? 0.28 : 0.14;
    const height = interpolate(wave, [-1, 1], [base, base + glow.value * 0.78]);
    return {
      height: `${Math.round(height * 100)}%`,
      opacity: 0.3 + glow.value * 0.65,
      backgroundColor: color,
    };
  });

  return <Animated.View style={[styles.bar, style]} />;
}

type OrbProps = {
  color: string;
  active: boolean;
};

export function LifeOrb({ color, active }: OrbProps) {
  const pulse = useSharedValue(0);
  const spin = useSharedValue(0);
  const bloom = useSharedValue(active ? 1 : 0.35);

  useEffect(() => {
    pulse.value = withRepeat(
      withSequence(
        withTiming(1, { duration: active ? 650 : 1500 }),
        withTiming(0, { duration: active ? 650 : 1500 }),
      ),
      -1,
      false,
    );
    spin.value = withRepeat(
      withTiming(1, { duration: active ? 2800 : 9000, easing: Easing.linear }),
      -1,
      false,
    );
    bloom.value = withTiming(active ? 1 : 0.35, { duration: 400 });
  }, [active, pulse, spin, bloom]);

  const halo = useAnimatedStyle(() => ({
    transform: [{ scale: 0.9 + pulse.value * 0.35 }],
    opacity: 0.12 + bloom.value * 0.28,
    backgroundColor: color,
  }));

  const core = useAnimatedStyle(() => ({
    transform: [{ scale: 0.82 + pulse.value * 0.3 }],
    opacity: 0.55 + pulse.value * 0.45,
    backgroundColor: color,
    shadowColor: color,
    shadowOpacity: 0.45 + bloom.value * 0.4,
    shadowRadius: 10 + pulse.value * 12,
  }));

  const ring = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${spin.value * 360}deg` },
      { scale: 0.92 + pulse.value * 0.14 },
    ],
    borderColor: color,
    opacity: 0.25 + bloom.value * 0.55,
  }));

  return (
    <View style={styles.orbWrap}>
      <Animated.View style={[styles.halo, halo]} />
      <Animated.View style={[styles.ring, ring]} />
      <Animated.View style={[styles.core, core]} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 3,
    height: 16,
    width: '100%',
  },
  bar: {
    width: 3,
    borderRadius: 2,
    minHeight: 3,
  },
  orbWrap: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  halo: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  core: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  ring: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    borderStyle: 'dashed',
  },
});
