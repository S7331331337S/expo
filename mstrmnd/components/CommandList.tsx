import { Pressable, StyleSheet, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import type { Command, CommandIcon } from '@/constants/commands';
import { COMMANDS } from '@/constants/commands';
import { colors, fonts, radii, spacing } from '@/constants/theme';
import {
  IconChart,
  IconChevron,
  IconEvolve,
  IconLayers,
  IconNodes,
  IconSearch,
  IconTarget,
} from '@/components/icons';

const ICONS: Record<CommandIcon, typeof IconTarget> = {
  target: IconTarget,
  search: IconSearch,
  layers: IconLayers,
  chart: IconChart,
  nodes: IconNodes,
  evolve: IconEvolve,
};

type Props = {
  onSelect: (command: Command) => void;
};

export function CommandList({ onSelect }: Props) {
  return (
    <View style={styles.list}>
      {COMMANDS.map((command) => {
        const Icon = ICONS[command.icon];
        return (
          <Pressable
            key={command.id}
            onPress={async () => {
              try {
                await Haptics.selectionAsync();
              } catch {
                // web
              }
              onSelect(command);
            }}
            style={({ pressed }) => [styles.card, pressed && styles.pressed]}
          >
            <View style={styles.iconWell}>
              <Icon size={18} color={colors.chrome} />
            </View>
            <View style={styles.copy}>
              <Text style={styles.title}>{command.title}</Text>
              <Text style={styles.blurb}>{command.blurb}</Text>
            </View>
            <IconChevron size={16} color={colors.muted} />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 8,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.hairline,
    backgroundColor: colors.chassis,
  },
  pressed: {
    backgroundColor: 'rgba(28,28,34,0.9)',
    borderColor: 'rgba(255,255,255,0.18)',
  },
  iconWell: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.hairline,
    backgroundColor: 'rgba(255,255,255,0.03)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontFamily: fonts.sansSemi,
    color: colors.ink,
    fontSize: 15,
    letterSpacing: 0.2,
  },
  blurb: {
    fontFamily: fonts.sans,
    color: colors.muted,
    fontSize: 12,
    marginTop: 2,
  },
});
