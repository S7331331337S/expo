import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, type Href } from 'expo-router';
import { BrandMark } from '@/components/BrandMark';
import { CinematicBackground } from '@/components/CinematicBackground';
import { DotGrid } from '@/components/DotGrid';
import { PillButton } from '@/components/PillButton';
import { brand, colors, fonts } from '@/constants/theme';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.root}>
      <CinematicBackground glowHeight={420} />
      <DotGrid />
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>
        <View style={styles.hero}>
          <View style={styles.markWell}>
            <View style={styles.halo} />
            <BrandMark size={88} glow weight="bold" tone="chrome" />
          </View>
          <Text style={styles.welcome}>Welcome to</Text>
          <Text style={styles.word}>{brand.wordmark}</Text>
          <Text style={styles.tagline}>{brand.headline}</Text>
        </View>
        <View style={styles.cta}>
          <PillButton label="Get started" onPress={() => router.replace('/home' as Href)} />
          <PillButton
            label="Enter System"
            variant="ghost"
            onPress={() => router.replace('/systems' as Href)}
          />
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
    paddingHorizontal: 28,
  },
  hero: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  markWell: {
    width: 128,
    height: 128,
    borderRadius: 32,
    backgroundColor: colors.chassis,
    borderWidth: 1,
    borderColor: colors.hairline,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    overflow: 'hidden',
  },
  halo: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  welcome: {
    fontFamily: fonts.sans,
    color: colors.muted,
    fontSize: 16,
  },
  word: {
    fontFamily: fonts.sansBold,
    color: colors.ink,
    fontSize: 44,
    letterSpacing: -1.4,
  },
  tagline: {
    fontFamily: fonts.sans,
    color: colors.muted,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    maxWidth: 280,
    marginTop: 4,
  },
  cta: {
    gap: 10,
    paddingBottom: 28,
  },
});
