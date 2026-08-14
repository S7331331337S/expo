import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, type Href } from 'expo-router';
import { BrandLockup } from '@/components/BrandLockup';
import { EnterButton } from '@/components/EnterButton';
import { HudFrame, StatusLive } from '@/components/HudFrame';
import { WelcomeOrbit } from '@/components/WelcomeOrbit';
import { brand, colors, spacing } from '@/constants/theme';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={['#101014', '#070708', '#000000']}
        locations={[0, 0.45, 1]}
        style={StyleSheet.absoluteFill}
      />
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>
        <View style={styles.top}>
          <BrandLockup markSize={22} compact />
          <StatusLive />
        </View>

        <View style={styles.hero}>
          <WelcomeOrbit size={248} />
          <HudFrame width={268}>
            <Text style={styles.welcome}>Welcome to {brand.wordmark}</Text>
            <Text style={styles.tagline}>{brand.tagline}</Text>
          </HudFrame>
        </View>

        <View style={styles.cta}>
          <EnterButton onPress={() => router.replace('/home' as Href)} />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.void,
  },
  safe: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4,
  },
  hero: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 18,
  },
  welcome: {
    fontFamily: 'SpaceGrotesk_400Regular',
    color: colors.chrome,
    fontSize: 14,
    letterSpacing: 1.4,
    textAlign: 'center',
  },
  tagline: {
    fontFamily: 'SpaceGrotesk_400Regular',
    color: colors.muted,
    fontSize: 12,
    letterSpacing: 0.4,
    textAlign: 'center',
  },
  cta: {
    paddingBottom: 18,
  },
});
