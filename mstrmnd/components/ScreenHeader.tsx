import { Pressable, StyleSheet, View } from 'react-native';
import { BrandLockup } from '@/components/BrandLockup';
import { StatusLive } from '@/components/HudFrame';
import { IconGrid } from '@/components/icons';
import { colors } from '@/constants/theme';

type Props = {
  onMenuPress?: () => void;
};

export function ScreenHeader({ onMenuPress }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <BrandLockup markSize={22} compact />
      </View>
      <View style={styles.right}>
        <StatusLive />
        {onMenuPress ? (
          <Pressable onPress={onMenuPress} hitSlop={10} accessibilityLabel="Open menu">
            <IconGrid size={16} color={colors.metal} />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    paddingTop: 4,
    paddingBottom: 8,
    gap: 8,
    minHeight: 36,
  },
  left: {
    flexShrink: 1,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
