import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { BrandMark } from '@/components/BrandMark';
import { brand, colors } from '@/constants/theme';

type Props = {
  visible: boolean;
  onDone: () => void;
};

export function SplashOverlay({ visible, onDone }: Props) {
  const opacity = useSharedValue(1);
  const brandY = useSharedValue(28);
  const brandOp = useSharedValue(0);
  const markScale = useSharedValue(0.82);
  const pillars = useSharedValue(0);

  useEffect(() => {
    if (!visible) return;
    brandOp.value = withDelay(120, withTiming(1, { duration: 850 }));
    brandY.value = withDelay(
      120,
      withTiming(0, { duration: 950, easing: Easing.out(Easing.cubic) }),
    );
    markScale.value = withDelay(80, withSpring(1, { damping: 14, stiffness: 120 }));
    pillars.value = withDelay(700, withTiming(1, { duration: 700 }));

    const t = setTimeout(() => {
      opacity.value = withTiming(0, { duration: 600 });
      setTimeout(onDone, 620);
    }, 2600);

    return () => clearTimeout(t);
  }, [visible, opacity, brandOp, brandY, markScale, pillars, onDone]);

  const root = useAnimatedStyle(() => ({ opacity: opacity.value }));
  const mark = useAnimatedStyle(() => ({
    opacity: brandOp.value,
    transform: [{ translateY: brandY.value }, { scale: markScale.value }],
  }));
  const copy = useAnimatedStyle(() => ({
    opacity: brandOp.value,
    transform: [{ translateY: brandY.value }],
  }));
  const footer = useAnimatedStyle(() => ({ opacity: pillars.value }));

  if (!visible) return null;

  return (
    <Animated.View style={[styles.root, root]} pointerEvents="none">
      <LinearGradient
        colors={['#000000', '#0A0B0E', '#000000']}
        locations={[0, 0.45, 1]}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={['rgba(255,255,255,0.09)', 'rgba(255,255,255,0.02)', 'transparent']}
        style={styles.spot}
      />
      <Animated.View style={[styles.markWrap, mark]}>
        <BrandMark size={112} glow weight="bold" tone="chrome" />
      </Animated.View>
      <Animated.View style={[styles.copy, copy]}>
        <Text style={styles.wordmark}>{brand.wordmark}</Text>
        <View style={styles.rule} />
        <Text style={styles.tagline}>
          Building intelligent systems.{'\n'}Empowering human potential.
        </Text>
      </Animated.View>
      <Animated.Text style={[styles.pillars, footer]}>
        {brand.pillars.map((p) => p.toUpperCase()).join('  ·  ')}
      </Animated.Text>
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
  spot: {
    position: 'absolute',
    top: '12%',
    left: '10%',
    right: '10%',
    height: '48%',
    borderRadius: 999,
  },
  markWrap: {
    alignItems: 'center',
  },
  copy: {
    alignItems: 'center',
    marginTop: 22,
    gap: 12,
    paddingHorizontal: 28,
  },
  wordmark: {
    fontFamily: 'Syne_800ExtraBold',
    fontSize: 42,
    color: colors.chromeHot,
    letterSpacing: 9,
  },
  rule: {
    width: 72,
    height: 2,
    borderRadius: 1,
    backgroundColor: colors.chrome,
    opacity: 0.55,
  },
  tagline: {
    fontFamily: 'SpaceGrotesk_400Regular',
    color: colors.metal,
    fontSize: 11,
    letterSpacing: 1.3,
    textAlign: 'center',
    textTransform: 'uppercase',
    lineHeight: 18,
  },
  pillars: {
    position: 'absolute',
    bottom: 48,
    fontFamily: 'SpaceGrotesk_500Medium',
    color: colors.muted,
    fontSize: 9,
    letterSpacing: 2.6,
  },
});
