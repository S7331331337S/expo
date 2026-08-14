import { Pressable, StyleSheet, Text, View } from 'react-native';
import { usePathname, useRouter, type Href } from 'expo-router';
import { colors } from '@/constants/theme';
import { IconGrid, IconHome, IconNodes } from '@/components/icons';

const TABS = [
  { href: '/home' as const, label: 'Home', Icon: IconHome },
  { href: '/hub' as const, label: 'Hub', Icon: IconNodes },
  { href: '/systems' as const, label: 'Systems', Icon: IconGrid },
];

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <View style={styles.bar}>
      {TABS.map(({ href, label, Icon }) => {
        const active = pathname === href || pathname.startsWith(`${href}/`);
        const color = active ? colors.chromeHot : colors.muted;
        return (
          <Pressable
            key={href}
            onPress={() => router.replace(href as Href)}
            style={[styles.tab, active && styles.tabActive]}
            accessibilityRole="button"
            accessibilityLabel={label}
          >
            <Icon size={18} color={color} strokeWidth={active ? 1.9 : 1.5} />
            {active ? <View style={styles.glow} /> : null}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 8,
    paddingHorizontal: 18,
    borderTopWidth: 1,
    borderTopColor: colors.hairline,
    backgroundColor: 'rgba(6,6,8,0.92)',
  },
  tab: {
    width: 56,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  tabActive: {
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  glow: {
    position: 'absolute',
    bottom: 4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.chromeHot,
    shadowColor: '#fff',
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
});
