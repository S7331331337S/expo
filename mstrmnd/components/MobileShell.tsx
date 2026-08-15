import { StyleSheet, View } from 'react-native';
import type { ReactNode } from 'react';
import { color } from '@/tokens';

type Props = {
  children: ReactNode;
};

/** Full-bleed canvas — Vercel / Linear, not a toy phone frame */
export function MobileShell({ children }: Props) {
  return <View style={styles.root}>{children}</View>;
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: color.substrate,
  },
});
