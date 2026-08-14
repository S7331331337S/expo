import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { DEPARTMENT_AGENTS } from '@/constants/agents';
import { colors, spacing } from '@/constants/theme';
import { AgentPad } from '@/components/AgentPad';
import { useController } from '@/context/ControllerContext';

const COLS = 3;

function Screw() {
  return <View style={styles.screw} />;
}

export function AgentGrid() {
  const { selectedId, selectAgent, runtimes } = useController();

  const rows: (typeof DEPARTMENT_AGENTS)[] = [];
  for (let i = 0; i < DEPARTMENT_AGENTS.length; i += COLS) {
    rows.push(DEPARTMENT_AGENTS.slice(i, i + COLS));
  }

  return (
    <View style={styles.chassis}>
      <LinearGradient colors={['#1A1D24', '#12151A', '#0C0E12']} style={StyleSheet.absoluteFill} />
      <View style={styles.screwRow}>
        <Screw />
        <Text style={styles.chassisLabel}>PAD DECK // 3×4</Text>
        <Screw />
      </View>
      <View style={styles.grid}>
        {rows.map((row, ri) => (
          <View key={ri} style={styles.row}>
            {row.map((agent) => {
              const runtime = runtimes[agent.id] ?? {
                status: 'idle' as const,
                activity: 0.1,
              };
              return (
                <AgentPad
                  key={agent.id}
                  agent={agent}
                  selected={selectedId === agent.id}
                  status={runtime.status}
                  activity={runtime.activity}
                  onPress={() => selectAgent(agent.id)}
                />
              );
            })}
          </View>
        ))}
      </View>
      <View style={styles.screwRow}>
        <Screw />
        <Screw />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chassis: {
    flex: 1,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.bezel,
    overflow: 'hidden',
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    minHeight: 0,
  },
  screwRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
    marginVertical: 2,
  },
  chassisLabel: {
    fontFamily: 'SpaceGrotesk_500Medium',
    color: colors.muted,
    fontSize: 8,
    letterSpacing: 2,
  },
  screw: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#2A2F38',
    borderWidth: 1,
    borderColor: '#3E4652',
  },
  grid: {
    flex: 1,
    gap: 7,
    minHeight: 0,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    gap: 7,
    minHeight: 0,
  },
});
