import { Pressable, StyleSheet, Text } from 'react-native';
import * as Haptics from 'expo-haptics';
import { color, font, radius } from '@/tokens';

type Props = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'ghost';
};

export function PillButton({ label, onPress, variant = 'primary' }: Props) {
  const handlePress = async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch {
      // web
    }
    onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.base,
        variant === 'primary' ? styles.primary : styles.ghost,
        pressed && { opacity: 0.88, transform: [{ scale: 0.985 }] },
      ]}
    >
      <Text style={variant === 'primary' ? styles.primaryLabel : styles.ghostLabel}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 48,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 22,
  },
  primary: {
    backgroundColor: color.textPrimary,
  },
  ghost: {
    backgroundColor: color.surface,
    borderWidth: 1,
    borderColor: color.borderHighlight,
  },
  primaryLabel: {
    fontFamily: font.sansSemi,
    color: color.substrate,
    fontSize: 16,
  },
  ghostLabel: {
    fontFamily: font.sansMedium,
    color: color.textPrimary,
    fontSize: 16,
  },
});
