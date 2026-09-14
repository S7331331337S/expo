import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, type Href } from 'expo-router';
import { BrandLockup } from '@/components/BrandLockup';
import { CinematicBackground } from '@/components/CinematicBackground';
import { EnterButton } from '@/components/EnterButton';
import { HudFrame, StatusLive } from '@/components/HudFrame';
import { WelcomeOrbit } from '@/components/WelcomeOrbit';
import { brand, colors, fonts, spacing } from '@/constants/theme';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.root}>
      <CinematicBackground />
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
    fontFamily: fonts.sans,
    color: colors.chrome,
    fontSize: 14,
    letterSpacing: 1.4,
    textAlign: 'center',
  },
  tagline: {
    fontFamily: fonts.sans,
    color: colors.muted,
    fontSize: 12,
    letterSpacing: 0.4,
    textAlign: 'center',
  },
  cta: {
    paddingBottom: 18,
  },
});
