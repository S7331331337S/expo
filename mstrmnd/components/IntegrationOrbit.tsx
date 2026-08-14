import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';
import * as Haptics from 'expo-haptics';
import { BrandMark } from '@/components/BrandMark';
import {
  IconChat,
  IconCrm,
  IconDocs,
  IconNotes,
  IconSearch,
  IconStorage,
  IconWorkspace,
} from '@/components/icons';
import { INTEGRATIONS, type Integration } from '@/constants/integrations';
import { colors } from '@/constants/theme';

const ICON = {
  chat: IconChat,
  docs: IconDocs,
  workspace: IconWorkspace,
  crm: IconCrm,
  storage: IconStorage,
  search: IconSearch,
  notes: IconNotes,
} as const;

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

type Props = {
  onSelect?: (item: Integration) => void;
};

export function IntegrationOrbit({ onSelect }: Props) {
  const [size, setSize] = useState(300);
  const cx = size / 2;
  const cy = size / 2;
  const outer = size * 0.36;
  const inner = size * 0.22;
  const node = 42;

  const nodes = useMemo(
    () =>
      INTEGRATIONS.map((item) => ({
        ...item,
        ...polar(cx, cy, outer, item.angle),
      })),
    [cx, cy, outer],
  );

  return (
    <View
      style={styles.measure}
      onLayout={(e) => {
        const w = Math.round(e.nativeEvent.layout.width);
        if (w > 0 && Math.abs(w - size) > 2) setSize(Math.min(w, 320));
      }}
    >
    <View style={[styles.stage, { width: size, height: size + 18 }]}>
      <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
        <Circle cx={cx} cy={cy} r={outer} stroke="rgba(255,255,255,0.16)" strokeWidth={1} fill="none" />
        <Circle
          cx={cx}
          cy={cy}
          r={inner}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={1}
          strokeDasharray="2 6"
          fill="none"
        />
        {nodes.map((n) => (
          <Line
            key={n.id}
            x1={cx}
            y1={cy}
            x2={n.x}
            y2={n.y}
            stroke="rgba(255,255,255,0.12)"
            strokeWidth={1}
          />
        ))}
        {nodes.map((n) => (
          <Circle key={`${n.id}-dot`} cx={n.x} cy={n.y} r={2} fill="rgba(255,255,255,0.55)" />
        ))}
      </Svg>

      <View style={[styles.core, { left: cx - 44, top: cy - 44 }]}>
        <BrandMark size={52} glow weight="bold" tone="chrome" />
      </View>

      {nodes.map((n) => {
        const Icon = ICON[n.icon];
        return (
          <Pressable
            key={n.id}
            onPress={async () => {
              try {
                await Haptics.selectionAsync();
              } catch {
                // web
              }
              onSelect?.(n);
            }}
            style={[
              styles.node,
              {
                width: node,
                height: node,
                left: n.x - node / 2,
                top: n.y - node / 2,
              },
            ]}
            accessibilityLabel={n.label}
          >
            <Icon size={16} color={colors.chrome} />
          </Pressable>
        );
      })}

      {nodes.map((n) => (
        <Text
          key={`${n.id}-label`}
          style={[
            styles.label,
            {
              left: n.x - 46,
              top: n.y + node / 2 + 2,
            },
          ]}
        >
          {n.label}
        </Text>
      ))}
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  measure: {
    width: '100%',
    alignItems: 'center',
  },
  stage: {
    alignSelf: 'center',
  },
  core: {
    position: 'absolute',
    width: 88,
    height: 88,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: '#101014',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#fff',
    shadowOpacity: 0.2,
    shadowRadius: 18,
  },
  node: {
    position: 'absolute',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
    backgroundColor: '#0C0C10',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    position: 'absolute',
    width: 92,
    textAlign: 'center',
    fontFamily: 'SpaceGrotesk_500Medium',
    color: colors.muted,
    fontSize: 8,
    letterSpacing: 1.1,
  },
});
