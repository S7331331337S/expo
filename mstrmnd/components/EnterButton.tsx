import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { colors, radii } from '@/constants/theme';
import { IconArrowRight } from '@/components/icons';

type Props = {
  label?: string;
  onPress: () => void;
};

export function EnterButton({ label = 'Enter System', onPress }: Props) {
  const handlePress = async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch {
      // web / unsupported
    }
    onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [styles.wrap, pressed && { opacity: 0.88, transform: [{ scale: 0.985 }] }]}
    >
      <LinearGradient
        colors={['rgba(255,255,255,0.16)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.12)']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.border}
      >
        <View style={styles.inner}>
          <IconArrowRight size={16} color={colors.chromeHot} strokeWidth={1.8} />
          <View style={styles.rule} />
          <Text style={styles.label}>{label}</Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignSelf: 'stretch',
    shadowColor: '#FFFFFF',
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 0 },
  },
  border: {
    borderRadius: radii.pill,
    padding: 1.2,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    backgroundColor: '#0A0A0C',
    borderRadius: radii.pill,
    paddingVertical: 16,
    paddingHorizontal: 22,
  },
  rule: {
    width: 1,
    height: 16,
    backgroundColor: 'rgba(255,255,255,0.22)',
  },
  label: {
    fontFamily: 'SpaceGrotesk_500Medium',
    color: colors.chromeHot,
    fontSize: 15,
    letterSpacing: 1.4,
  },
});
