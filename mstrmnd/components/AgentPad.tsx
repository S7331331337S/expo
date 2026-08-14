import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import type { DepartmentAgent, AgentStatus } from '@/constants/agents';
import { colors } from '@/constants/theme';
import { LifeOrb, LivingPulse } from '@/components/LivingPulse';

type Props = {
  agent: DepartmentAgent;
  selected: boolean;
  status: AgentStatus;
  activity: number;
  onPress: () => void;
};

const STATUS_LABEL: Record<AgentStatus, string> = {
  idle: 'IDLE',
  listening: 'LIVE',
  thinking: 'PROC',
  streaming: 'STREAM',
  alert: 'ALERT',
};

function ScanSweep({ active }: { active: boolean }) {
  const y = useSharedValue(0);
  useEffect(() => {
    if (!active) return;
    y.value = withRepeat(
      withTiming(1, { duration: 1800, easing: Easing.inOut(Easing.quad) }),
      -1,
      true,
    );
  }, [active, y]);
  const style = useAnimatedStyle(() => ({
    opacity: active ? 0.28 : 0,
    transform: [{ translateY: interpolate(y.value, [0, 1], [2, 52]) }],
  }));
  if (!active) return null;
  return <Animated.View pointerEvents="none" style={[styles.scan, style]} />;
}

export function AgentPad({ agent, selected, status, activity, onPress }: Props) {
  const scale = useSharedValue(1);
  const lit = status !== 'idle' || selected;
  const processing = status === 'streaming' || status === 'thinking';

  const anim = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.wrap, anim]}>
      <Pressable
        onPressIn={() => {
          scale.value = withTiming(0.93, { duration: 70 });
        }}
        onPressOut={() => {
          scale.value = withSpring(1, { damping: 16, stiffness: 280 });
        }}
        onPress={async () => {
          try {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          } catch {
            /* web */
          }
          onPress();
        }}
        style={[
          styles.pad,
          selected && styles.padSelected,
        ]}
      >
        <View style={styles.fill}>
          <View style={styles.sheen} />
          <ScanSweep active={processing || selected} />
          <View style={styles.topRow}>
            <Text style={[styles.code, { color: lit ? colors.chrome : colors.muted }]}>
              {agent.code}
            </Text>
            <View
              style={[
                styles.led,
                {
                  backgroundColor: lit ? agent.accent : colors.muted,
                  opacity: lit ? 1 : 0.28,
                },
              ]}
            />
          </View>
          <View style={styles.mid}>
            <LifeOrb color={lit ? colors.chrome : colors.muted} active={lit} />
          </View>
          <Text style={styles.name} numberOfLines={1}>
            {agent.name}
          </Text>
          <Text style={styles.dept} numberOfLines={1}>
            {agent.department}
          </Text>
          <View style={styles.footer}>
            <LivingPulse
              color={lit ? colors.chrome : colors.muted}
              active={processing}
              intensity={activity}
              bars={5}
            />
            <Text style={[styles.status, { color: lit ? colors.metal : colors.muted }]}>
              {STATUS_LABEL[status]} · L{agent.level}
            </Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, minHeight: 0 },
  pad: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.bezel,
    overflow: 'hidden',
    backgroundColor: '#12151A',
  },
  padSelected: {
    borderColor: colors.chrome,
    borderWidth: 1.5,
    backgroundColor: '#1A1D24',
  },
  fill: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 7,
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  sheen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 14,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  scan: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1.5,
    backgroundColor: colors.chrome,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2,
  },
  code: {
    fontFamily: 'SpaceGrotesk_500Medium',
    fontSize: 9,
    letterSpacing: 1.4,
  },
  led: { width: 6, height: 6, borderRadius: 3 },
  mid: { alignItems: 'center', justifyContent: 'center', flex: 1, zIndex: 2 },
  name: {
    fontFamily: 'Syne_700Bold',
    color: colors.ink,
    fontSize: 13,
    letterSpacing: 0.8,
    zIndex: 2,
  },
  dept: {
    fontFamily: 'SpaceGrotesk_400Regular',
    color: colors.muted,
    fontSize: 9,
    marginTop: 1,
    zIndex: 2,
  },
  footer: { marginTop: 4, gap: 3, zIndex: 2 },
  status: {
    fontFamily: 'SpaceGrotesk_500Medium',
    fontSize: 8,
    letterSpacing: 0.9,
  },
});
