import { Platform, StyleSheet, Text, type StyleProp, type TextStyle } from 'react-native';
import { color, font } from '@/tokens';

type Props = {
  children: string;
  style?: StyleProp<TextStyle>;
};

/** CSS background-clip shimmer on web; off-white fallback on native. */
export function ShimmerText({ children, style }: Props) {
  const webShimmer =
    Platform.OS === 'web'
      ? ({
          color: 'transparent',
          backgroundImage: `linear-gradient(180deg, ${color.shimmerStart} 0%, ${color.shimmerEnd} 100%)`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        } as TextStyle)
      : undefined;

  return (
    <Text style={[styles.base, Platform.OS === 'web' ? webShimmer : styles.native, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    fontFamily: font.sansSemi,
    fontSize: 56,
    letterSpacing: -1.8,
    lineHeight: 60,
  },
  native: {
    color: color.textPrimary,
  },
});
