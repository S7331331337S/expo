import { useState } from 'react';
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
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, type Href } from 'expo-router';
import { CommandList } from '@/components/CommandList';
import { ScreenHeader } from '@/components/ScreenHeader';
import type { Command } from '@/constants/commands';
import { brand, colors, radii, spacing } from '@/constants/theme';
import { useController } from '@/context/ControllerContext';
import { IconArrowRight } from '@/components/icons';

export default function HomeScreen() {
  const router = useRouter();
  const { selectAgent, queueCue } = useController();
  const [cue, setCue] = useState('');

  const openCommand = (command: Command) => {
    if (command.href === '/hub') {
      router.replace('/hub' as Href);
      return;
    }
    if (command.agentId) selectAgent(command.agentId);
    router.replace('/systems' as Href);
  };

  const submitCue = () => {
    const text = cue.trim();
    if (!text) return;
    setCue('');
    selectAgent('conductor');
    queueCue(text);
    router.replace('/systems' as Href);
  };

  return (
    <LinearGradient colors={['#101014', '#070708', '#000000']} style={styles.root}>
      <KeyboardAvoidingView
        style={styles.root}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScreenHeader onMenuPress={() => router.replace('/systems' as Href)} />
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.kicker}>COMMAND CENTER</Text>
          <CommandList onSelect={openCommand} />
        </ScrollView>
        <View style={styles.composer}>
          <TextInput
            style={styles.input}
            placeholder="Type a command..."
            placeholderTextColor={colors.muted}
            value={cue}
            onChangeText={setCue}
            onSubmitEditing={submitCue}
            returnKeyType="send"
          />
          <Pressable
            onPress={submitCue}
            style={[styles.send, !cue.trim() && { opacity: 0.35 }]}
            disabled={!cue.trim()}
            accessibilityLabel="Run command"
          >
            <IconArrowRight size={16} color={colors.chromeHot} />
          </Pressable>
        </View>
        <Text style={styles.tag}>{brand.tagline}</Text>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    gap: spacing.sm,
  },
  kicker: {
    fontFamily: 'SpaceGrotesk_500Medium',
    color: colors.muted,
    fontSize: 10,
    letterSpacing: 2.4,
    marginBottom: 4,
    marginTop: 2,
  },
  composer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.hairline,
    backgroundColor: colors.recess,
    paddingLeft: 16,
    paddingRight: 6,
    paddingVertical: 6,
  },
  input: {
    flex: 1,
    fontFamily: 'SpaceGrotesk_400Regular',
    color: colors.ink,
    fontSize: 14,
    paddingVertical: Platform.OS === 'ios' ? 8 : 6,
  },
  send: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1A1A20',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tag: {
    fontFamily: 'SpaceGrotesk_400Regular',
    color: colors.muted,
    fontSize: 9,
    letterSpacing: 0.8,
    textAlign: 'center',
    marginBottom: 8,
    paddingHorizontal: 24,
  },
});
