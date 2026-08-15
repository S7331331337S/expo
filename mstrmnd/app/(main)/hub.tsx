import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, type Href } from 'expo-router';
import { IntegrationOrbit } from '@/components/IntegrationOrbit';
import { ScreenHeader } from '@/components/ScreenHeader';
import { brand, colors, fonts, spacing } from '@/constants/theme';
import { useController } from '@/context/ControllerContext';
import type { Integration } from '@/constants/integrations';

export default function HubScreen() {
  const router = useRouter();
  const { selectAgent, queueCue } = useController();

  const openTool = (item: Integration) => {
    selectAgent('conductor');
    queueCue(`Connect ${item.label.toLowerCase()} into the operating layer.`);
    router.replace('/systems' as Href);
  };

  return (
    <LinearGradient colors={['#101014', '#070708', '#000000']} style={styles.root}>
      <ScreenHeader onMenuPress={() => router.replace('/systems' as Href)} />
      <View style={styles.body}>
        <Text style={styles.kicker}>INTEGRATIONS</Text>
        <Text style={styles.lead}>One layer. Every connection.</Text>
        <IntegrationOrbit onSelect={openTool} />
        <Text style={styles.tag}>{brand.tagline}</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  body: {
    flex: 1,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  kicker: {
    fontFamily: fonts.sansBold,
    color: colors.chromeHot,
    fontSize: 22,
    letterSpacing: 3,
  },
  lead: {
    fontFamily: fonts.sans,
    color: colors.muted,
    fontSize: 13,
    marginBottom: 8,
  },
  tag: {
    fontFamily: fonts.sans,
    color: colors.muted,
    fontSize: 10,
    letterSpacing: 0.6,
    textAlign: 'center',
    marginTop: 12,
  },
});
