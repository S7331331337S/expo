import type { ReactNode } from 'react';
import Svg, { Circle, Line, Path, Rect } from 'react-native-svg';
import { colors } from '@/constants/theme';

type IconProps = {
  size?: number;
  color?: string;
  strokeWidth?: number;
};

const defaults = { size: 18, color: colors.chrome, strokeWidth: 1.6 };

function wrap(
  { size = defaults.size }: IconProps,
  children: ReactNode,
) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {children}
    </Svg>
  );
}

export function IconTarget({ size = 18, color = colors.chrome, strokeWidth = 1.6 }: IconProps) {
  return wrap({ size }, <>
    <Circle cx="12" cy="12" r="8" stroke={color} strokeWidth={strokeWidth} />
    <Circle cx="12" cy="12" r="3.5" stroke={color} strokeWidth={strokeWidth} />
    <Circle cx="12" cy="12" r="1" fill={color} />
  </>);
}

export function IconSearch({ size = 18, color = colors.chrome, strokeWidth = 1.6 }: IconProps) {
  return wrap({ size }, <>
    <Circle cx="11" cy="11" r="6.5" stroke={color} strokeWidth={strokeWidth} />
    <Line x1="15.8" y1="15.8" x2="20" y2="20" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  </>);
}

export function IconLayers({ size = 18, color = colors.chrome, strokeWidth = 1.6 }: IconProps) {
  return wrap({ size }, <>
    <Path d="M12 3 L21 8 L12 13 L3 8 Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
    <Path d="M3 12 L12 17 L21 12" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M3 16 L12 21 L21 16" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </>);
}

export function IconChart({ size = 18, color = colors.chrome, strokeWidth = 1.6 }: IconProps) {
  return wrap({ size }, <>
    <Line x1="4" y1="20" x2="4" y2="11" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <Line x1="10" y1="20" x2="10" y2="6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <Line x1="16" y1="20" x2="16" y2="13" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <Line x1="22" y1="20" x2="22" y2="8" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  </>);
}

export function IconNodes({ size = 18, color = colors.chrome, strokeWidth = 1.6 }: IconProps) {
  return wrap({ size }, <>
    <Circle cx="6" cy="7" r="2.2" stroke={color} strokeWidth={strokeWidth} />
    <Circle cx="18" cy="7" r="2.2" stroke={color} strokeWidth={strokeWidth} />
    <Circle cx="12" cy="17" r="2.2" stroke={color} strokeWidth={strokeWidth} />
    <Line x1="7.8" y1="8.2" x2="10.4" y2="15.2" stroke={color} strokeWidth={strokeWidth} />
    <Line x1="16.2" y1="8.2" x2="13.6" y2="15.2" stroke={color} strokeWidth={strokeWidth} />
    <Line x1="8.2" y1="7" x2="15.8" y2="7" stroke={color} strokeWidth={strokeWidth} />
  </>);
}

export function IconEvolve({ size = 18, color = colors.chrome, strokeWidth = 1.6 }: IconProps) {
  return wrap({ size }, <>
    <Path d="M12 20 V7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <Path d="M7 12 L12 6 L17 12" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    <Circle cx="12" cy="20" r="1.4" fill={color} />
  </>);
}

export function IconHome({ size = 18, color = colors.chrome, strokeWidth = 1.6 }: IconProps) {
  return wrap({ size }, <>
    <Path d="M4 11 L12 4 L20 11 V20 H15 V14 H9 V20 H4 Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
  </>);
}

export function IconGrid({ size = 18, color = colors.chrome, strokeWidth = 1.6 }: IconProps) {
  return wrap({ size }, <>
    <Rect x="3.5" y="3.5" width="6" height="6" rx="1.2" stroke={color} strokeWidth={strokeWidth} />
    <Rect x="14.5" y="3.5" width="6" height="6" rx="1.2" stroke={color} strokeWidth={strokeWidth} />
    <Rect x="3.5" y="14.5" width="6" height="6" rx="1.2" stroke={color} strokeWidth={strokeWidth} />
    <Rect x="14.5" y="14.5" width="6" height="6" rx="1.2" stroke={color} strokeWidth={strokeWidth} />
  </>);
}

export function IconChat({ size = 18, color = colors.chrome, strokeWidth = 1.6 }: IconProps) {
  return wrap({ size }, <>
    <Path d="M5 6 H19 V16 H9 L5 20 V6 Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
  </>);
}

export function IconDocs({ size = 18, color = colors.chrome, strokeWidth = 1.6 }: IconProps) {
  return wrap({ size }, <>
    <Path d="M7 4 H14 L19 9 V20 H7 Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
    <Path d="M14 4 V9 H19" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
  </>);
}

export function IconWorkspace({ size = 18, color = colors.chrome, strokeWidth = 1.6 }: IconProps) {
  return wrap({ size }, <>
    <Rect x="3.5" y="3.5" width="7" height="7" rx="1" stroke={color} strokeWidth={strokeWidth} />
    <Rect x="13.5" y="3.5" width="7" height="7" rx="1" stroke={color} strokeWidth={strokeWidth} />
    <Rect x="3.5" y="13.5" width="7" height="7" rx="1" stroke={color} strokeWidth={strokeWidth} />
    <Rect x="13.5" y="13.5" width="7" height="7" rx="1" stroke={color} strokeWidth={strokeWidth} />
  </>);
}

export function IconCrm({ size = 18, color = colors.chrome, strokeWidth = 1.6 }: IconProps) {
  return wrap({ size }, <>
    <Circle cx="12" cy="8" r="3.2" stroke={color} strokeWidth={strokeWidth} />
    <Path d="M5 19 C5 14.8 8 13 12 13 C16 13 19 14.8 19 19" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  </>);
}

export function IconStorage({ size = 18, color = colors.chrome, strokeWidth = 1.6 }: IconProps) {
  return wrap({ size }, <>
    <Path d="M5 7 C5 5.3 8.1 4 12 4 C15.9 4 19 5.3 19 7 C19 8.7 15.9 10 12 10 C8.1 10 5 8.7 5 7 Z" stroke={color} strokeWidth={strokeWidth} />
    <Path d="M5 7 V17 C5 18.7 8.1 20 12 20 C15.9 20 19 18.7 19 17 V7" stroke={color} strokeWidth={strokeWidth} />
    <Path d="M5 12 C5 13.7 8.1 15 12 15 C15.9 15 19 13.7 19 12" stroke={color} strokeWidth={strokeWidth} />
  </>);
}

export function IconNotes({ size = 18, color = colors.chrome, strokeWidth = 1.6 }: IconProps) {
  return wrap({ size }, <>
    <Path d="M7 4 H17 V20 H7 Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
    <Line x1="10" y1="9" x2="14" y2="9" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <Line x1="10" y1="13" x2="14" y2="13" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  </>);
}

export function IconArrowRight({ size = 18, color = colors.chrome, strokeWidth = 1.6 }: IconProps) {
  return wrap({ size }, <>
    <Path d="M5 12 H19" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <Path d="M13 6 L19 12 L13 18" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </>);
}

export function IconChevron({ size = 18, color = colors.muted, strokeWidth = 1.6 }: IconProps) {
  return wrap({ size }, <>
    <Path d="M9 5 L16 12 L9 19" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </>);
}

export function IconStar({ size = 18, color = colors.chrome, strokeWidth = 1.6 }: IconProps) {
  return wrap({ size }, <>
    <Path d="M12 3 L13.2 9.2 L19 10 L13.2 10.8 L12 17 L10.8 10.8 L5 10 L10.8 9.2 Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
  </>);
}

export function IconMolecule({ size = 18, color = colors.chrome, strokeWidth = 1.6 }: IconProps) {
  return wrap({ size }, <>
    <Circle cx="7" cy="8" r="2" stroke={color} strokeWidth={strokeWidth} />
    <Circle cx="17" cy="7" r="2" stroke={color} strokeWidth={strokeWidth} />
    <Circle cx="12" cy="17" r="2.2" stroke={color} strokeWidth={strokeWidth} />
    <Line x1="8.7" y1="9.2" x2="10.6" y2="15.2" stroke={color} strokeWidth={strokeWidth} />
    <Line x1="15.3" y1="8.6" x2="13.5" y2="15" stroke={color} strokeWidth={strokeWidth} />
  </>);
}

export function IconCube({ size = 18, color = colors.chrome, strokeWidth = 1.6 }: IconProps) {
  return wrap({ size }, <>
    <Path d="M12 4 L20 8.5 V15.5 L12 20 L4 15.5 V8.5 Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
    <Path d="M12 20 V11.5" stroke={color} strokeWidth={strokeWidth} />
    <Path d="M4 8.5 L12 11.5 L20 8.5" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
  </>);
}
