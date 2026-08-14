import React, { useEffect, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { BrandMark } from '@/components/BrandMark';
import { brand, colors } from '@/constants/theme';

type Props = {
  visible: boolean;
  onDone: () => void;
};

const GRAIN = Array.from({ length: 48 }, (_, i) => ({
  key: i,
  top: `${(i * 17 + 7) % 96}%` as `${number}%`,
  left: `${(i * 29 + 11) % 97}%` as `${number}%`,
  size: 1 + (i % 3),
  opacity: 0.035 + (i % 5) * 0.01,
}));

export function SplashOverlay({ visible, onDone }: Props) {
  const rootOp = useSharedValue(1);
  const spot = useSharedValue(0);
  const markOp = useSharedValue(0);
  const markScale = useSharedValue(0.92);
  const breath = useSharedValue(0.55);
  const wordOp = useSharedValue(0);
  const wordY = useSharedValue(18);
  const floorOp = useSharedValue(0);

  useEffect(() => {
    if (!visible) return;
    spot.value = withTiming(1, { duration: 1100, easing: Easing.out(Easing.cubic) });
    markOp.value = withDelay(350, withTiming(1, { duration: 900 }));
    markScale.value = withDelay(
      350,
      withTiming(1, { duration: 1100, easing: Easing.out(Easing.cubic) }),
    );
    breath.value = withDelay(
      900,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 1600, easing: Easing.inOut(Easing.sin) }),
          withTiming(0.5, { duration: 1600, easing: Easing.inOut(Easing.sin) }),
        ),
        -1,
        false,
      ),
    );
    wordOp.value = withDelay(780, withTiming(1, { duration: 850 }));
    wordY.value = withDelay(
      780,
      withTiming(0, { duration: 900, easing: Easing.out(Easing.cubic) }),
    );
    floorOp.value = withDelay(1000, withTiming(1, { duration: 1000 }));

    const t = setTimeout(() => {
      rootOp.value = withTiming(0, { duration: 700, easing: Easing.in(Easing.cubic) });
      setTimeout(onDone, 720);
    }, 3400);

    return () => clearTimeout(t);
  }, [visible, rootOp, spot, markOp, markScale, breath, wordOp, wordY, floorOp, onDone]);

  const root = useAnimatedStyle(() => ({ opacity: rootOp.value }));
  const spotStyle = useAnimatedStyle(() => ({ opacity: spot.value * 0.95 }));
  const markStyle = useAnimatedStyle(() => ({
    opacity: markOp.value,
    transform: [{ scale: markScale.value * (0.97 + breath.value * 0.04) }],
  }));
  const glowStyle = useAnimatedStyle(() => ({
    opacity: 0.12 + breath.value * 0.22,
    transform: [{ scale: 0.9 + breath.value * 0.22 }],
  }));
  const wordStyle = useAnimatedStyle(() => ({
    opacity: wordOp.value,
    transform: [{ translateY: wordY.value }],
  }));
  const floorStyle = useAnimatedStyle(() => ({ opacity: floorOp.value * 0.55 }));

  const grain = useMemo(() => GRAIN, []);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.root, root]} pointerEvents="none">
      <View style={styles.voidFill} />
      <Animated.View style={[styles.spotlightWrap, spotStyle]}>
        <LinearGradient
          colors={['rgba(255,255,255,0.16)', 'rgba(255,255,255,0.04)', 'transparent']}
          locations={[0, 0.35, 1]}
          style={styles.spotlight}
        />
      </Animated.View>

      <View style={styles.stage}>
        <Animated.View style={[styles.markGlow, glowStyle]} />
        <Animated.View style={markStyle}>
          <BrandMark size={128} glow weight="bold" tone="chrome" />
        </Animated.View>
        <Animated.View style={[styles.copy, wordStyle]}>
          <Text style={styles.wordmark}>{brand.wordmark}</Text>
        </Animated.View>
      </View>

      <Animated.View style={[styles.floor, floorStyle]}>
        <LinearGradient
          colors={[
            'transparent',
            'rgba(255,255,255,0.045)',
            'rgba(255,255,255,0.02)',
            'transparent',
          ]}
          locations={[0, 0.2, 0.55, 1]}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.reflection}>
          <BrandMark size={90} glow={false} weight="bold" tone="chrome" />
          <Text style={styles.wordmarkReflect}>{brand.wordmark}</Text>
        </View>
        <LinearGradient
          colors={['rgba(0,0,0,0.15)', 'rgba(0,0,0,0.75)', '#000000']}
          locations={[0, 0.45, 1]}
          style={styles.floorFade}
        />
      </Animated.View>

      <View pointerEvents="none" style={styles.grain}>
        {grain.map((g) => (
          <View
            key={g.key}
            style={{
              position: 'absolute',
              top: g.top,
              left: g.left,
              width: g.size,
              height: g.size,
              borderRadius: g.size,
              backgroundColor: '#fff',
              opacity: g.opacity,
            }}
          />
        ))}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.void,
  },
  voidFill: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#000',
  },
  spotlightWrap: {
    ...StyleSheet.absoluteFill,
  },
  spotlight: {
    position: 'absolute',
    top: '-8%',
    left: '8%',
    right: '8%',
    height: '62%',
    borderRadius: 999,
  },
  stage: {
    alignItems: 'center',
    marginBottom: 48,
    zIndex: 2,
  },
  markGlow: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#FFFFFF',
    top: -20,
  },
  copy: {
    alignItems: 'center',
    marginTop: 28,
  },
  wordmark: {
    fontFamily: 'Syne_800ExtraBold',
    fontSize: 40,
    color: colors.chromeHot,
    letterSpacing: 10,
  },
  floor: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '38%',
    alignItems: 'center',
    overflow: 'hidden',
  },
  reflection: {
    alignItems: 'center',
    marginTop: 8,
    opacity: 0.35,
    transform: [{ scaleY: -1 }],
  },
  wordmarkReflect: {
    marginTop: 18,
    fontFamily: 'Syne_800ExtraBold',
    fontSize: 28,
    color: colors.chrome,
    letterSpacing: 8,
  },
  floorFade: {
    ...StyleSheet.absoluteFill,
  },
  grain: {
    ...StyleSheet.absoluteFill,
    zIndex: 3,
  },
});
