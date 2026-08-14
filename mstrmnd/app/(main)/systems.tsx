import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, type Href } from 'expo-router';
import { AgentGrid } from '@/components/AgentGrid';
import { MainAgentWindow } from '@/components/MainAgentWindow';
import { ScreenHeader } from '@/components/ScreenHeader';
import { colors, spacing } from '@/constants/theme';
import { useController } from '@/context/ControllerContext';

export default function SystemsScreen() {
  const router = useRouter();
  const { selectedAgent } = useController();

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={['#101014', '#070708', '#000000']}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFill}
      />
      <ScreenHeader onMenuPress={() => router.replace('/home' as Href)} />
      <View style={styles.subRow}>
        <Text style={styles.sub}>systems · {selectedAgent.name}</Text>
      </View>
      <View style={styles.padDeck}>
        <AgentGrid />
      </View>
      <View style={styles.mainSlot}>
        <MainAgentWindow />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.void,
    paddingHorizontal: spacing.sm,
    gap: spacing.sm,
  },
  subRow: {
    paddingHorizontal: 4,
    marginTop: -4,
  },
  sub: {
    fontFamily: 'SpaceGrotesk_400Regular',
    color: colors.muted,
    fontSize: 9,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
  },
  padDeck: {
    flex: 2,
    minHeight: 0,
  },
  mainSlot: {
    flex: 1,
    minHeight: 200,
    marginBottom: spacing.xs,
  },
});
