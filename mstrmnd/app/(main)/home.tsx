import { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useRouter, type Href } from 'expo-router';
import { CinematicBackground } from '@/components/CinematicBackground';
import { CommandList } from '@/components/CommandList';
import { ScreenHeader } from '@/components/ScreenHeader';
import type { Command } from '@/constants/commands';
import { COMMANDS } from '@/constants/commands';
import { colors, fonts, radii } from '@/constants/theme';
import { useController } from '@/context/ControllerContext';

const CHIPS = [
  { label: 'Who are you?', text: 'Who are you?' },
  { label: 'Create a plan', commandId: 'plan' },
  { label: 'Research', commandId: 'research' },
  { label: 'Summarize my day', text: 'Summarize my day and name the next three moves.' },
] as const;

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export default function HomeScreen() {
  const router = useRouter();
  const { selectAgent, queueCue } = useController();
  const [cue, setCue] = useState('');
  const hello = useMemo(greeting, []);

  const openCommand = (command: Command) => {
    if (command.href === '/hub') {
      router.replace('/hub' as Href);
      return;
    }
    if (command.agentId) selectAgent(command.agentId);
    router.replace('/systems' as Href);
  };

  const submitCue = (text = cue) => {
    const next = text.trim();
    if (!next) return;
    setCue('');
    selectAgent('conductor');
    queueCue(next);
    router.replace('/systems' as Href);
  };

  const onChip = (chip: (typeof CHIPS)[number]) => {
    if ('commandId' in chip && chip.commandId) {
      const command = COMMANDS.find((item) => item.id === chip.commandId);
      if (command) openCommand(command);
      return;
    }
    if ('text' in chip && chip.text) submitCue(chip.text);
  };

  return (
    <View style={styles.root}>
      <CinematicBackground glowHeight={280} />
      <KeyboardAvoidingView
        style={styles.root}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScreenHeader />
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.hello}>
            <Text style={styles.greeting}>{hello}</Text>
            <Text style={styles.sub}>your operating layer</Text>
          </View>

          <View style={styles.composer}>
            <TextInput
              style={styles.input}
              placeholder="Type your message here..."
              placeholderTextColor={colors.muted}
              value={cue}
              onChangeText={setCue}
              onSubmitEditing={() => submitCue()}
              returnKeyType="send"
              multiline
            />
            <Pressable
              onPress={() => submitCue()}
              style={[styles.send, !cue.trim() && { opacity: 0.35 }]}
              disabled={!cue.trim()}
            >
              <Text style={styles.sendMark}>↑</Text>
            </Pressable>
          </View>

          <View style={styles.chips}>
            {CHIPS.map((chip) => (
              <Pressable key={chip.label} onPress={() => onChip(chip)} style={styles.chip}>
                <Text style={styles.chipLabel}>{chip.label}</Text>
              </Pressable>
            ))}
          </View>

          <CommandList onSelect={openCommand} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.void,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 28,
    gap: 14,
  },
  hello: {
    paddingTop: 28,
    paddingBottom: 8,
    gap: 6,
  },
  greeting: {
    fontFamily: fonts.sansBold,
    color: colors.ink,
    fontSize: 36,
    letterSpacing: -1.2,
  },
  sub: {
    fontFamily: fonts.sans,
    color: colors.muted,
    fontSize: 16,
  },
  composer: {
    minHeight: 120,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.hairline,
    backgroundColor: colors.chassis,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 12,
  },
  input: {
    flex: 1,
    minHeight: 64,
    fontFamily: fonts.sans,
    color: colors.ink,
    fontSize: 16,
    lineHeight: 22,
  },
  send: {
    alignSelf: 'flex-end',
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendMark: {
    color: colors.void,
    fontSize: 18,
    fontFamily: fonts.sansBold,
    marginTop: -2,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.bezel,
    backgroundColor: colors.chassis,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  chipLabel: {
    fontFamily: fonts.sansMedium,
    color: colors.ink,
    fontSize: 13,
  },
});
