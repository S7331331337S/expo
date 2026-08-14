import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';
import { BrandMark } from '@/components/BrandMark';
import { IconCube, IconMolecule, IconStar, IconTarget } from '@/components/icons';
import { colors } from '@/constants/theme';

type Props = {
  size?: number;
};

const CARDINALS = [
  { angle: 0, Icon: IconStar },
  { angle: 90, Icon: IconMolecule },
  { angle: 180, Icon: IconTarget },
  { angle: 270, Icon: IconCube },
] as const;

export function WelcomeOrbit({ size = 260 }: Props) {
  const cx = size / 2;
  const cy = size / 2;
  const outer = size * 0.42;
  const mid = size * 0.3;
  const inner = size * 0.18;

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
        <Circle cx={cx} cy={cy} r={outer} stroke="rgba(255,255,255,0.14)" strokeWidth={1} fill="none" />
        <Circle
          cx={cx}
          cy={cy}
          r={mid}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={1}
          strokeDasharray="2 5"
          fill="none"
        />
        <Circle cx={cx} cy={cy} r={inner} stroke="rgba(255,255,255,0.06)" strokeWidth={1} fill="none" />
        {CARDINALS.map(({ angle }) => {
          const rad = ((angle - 90) * Math.PI) / 180;
          const x = cx + outer * Math.cos(rad);
          const y = cy + outer * Math.sin(rad);
          return (
            <Line
              key={angle}
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth={1}
              strokeDasharray="2 4"
            />
          );
        })}
      </Svg>
      <View style={[styles.mark, { left: cx - 48, top: cy - 48 }]}>
        <BrandMark size={96} glow weight="bold" tone="chrome" />
      </View>
      {CARDINALS.map(({ angle, Icon }) => {
        const rad = ((angle - 90) * Math.PI) / 180;
        const x = cx + outer * Math.cos(rad);
        const y = cy + outer * Math.sin(rad);
        return (
          <View
            key={angle}
            style={[
              styles.badge,
              { left: x - 14, top: y - 14 },
            ]}
          >
            <Icon size={14} color={colors.metal} />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  mark: {
    position: 'absolute',
    width: 96,
    height: 96,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    backgroundColor: '#0A0A0C',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
