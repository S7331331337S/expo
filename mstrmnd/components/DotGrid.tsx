import Svg, { Circle, Defs, Pattern, Rect } from 'react-native-svg';
import { StyleSheet } from 'react-native';

/** Faint technical dot field — Linear / Vercel welcome texture */
export function DotGrid({ opacity = 0.14 }: { opacity?: number }) {
  return (
    <Svg pointerEvents="none" style={StyleSheet.absoluteFill}>
      <Defs>
        <Pattern id="mstrmnd-dots" width="20" height="20" patternUnits="userSpaceOnUse">
          <Circle cx="1" cy="1" r="0.7" fill={`rgba(255,255,255,${opacity})`} />
        </Pattern>
      </Defs>
      <Rect width="100%" height="100%" fill="url(#mstrmnd-dots)" />
    </Svg>
  );
}
