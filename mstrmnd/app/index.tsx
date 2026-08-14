import { useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AgentGrid } from '@/components/AgentGrid';
import { BrandLockup } from '@/components/BrandLockup';
import { MainAgentWindow } from '@/components/MainAgentWindow';
import { colors, spacing } from '@/constants/theme';

export default function ControllerScreen() {
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    const showEvt = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvt = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
    const show = Keyboard.addListener(showEvt, () => setKeyboardOpen(true));
    const hide = Keyboard.addListener(hideEvt, () => setKeyboardOpen(false));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}
    >
      <LinearGradient
        colors={['#12141A', '#07080A', '#000000']}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFill}
      />
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
        <View style={styles.topBar}>
          <View>
            <BrandLockup markSize={28} compact />
            <Text style={styles.sub}>agent controller</Text>
          </View>
          <View style={styles.session}>
            <View style={styles.dot} />
            <Text style={styles.sessionText}>SESSION LIVE</Text>
          </View>
        </View>

        <View style={[styles.padDeck, keyboardOpen && styles.padDeckCollapsed]}>
          {!keyboardOpen ? <AgentGrid /> : null}
        </View>

        <View style={[styles.mainSlot, keyboardOpen && styles.mainExpanded]}>
          <MainAgentWindow />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.void,
  },
  safe: {
    flex: 1,
    paddingHorizontal: spacing.sm,
    gap: spacing.sm,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    paddingTop: 4,
  },
  sub: {
    fontFamily: 'SpaceGrotesk_400Regular',
    color: colors.muted,
    fontSize: 9,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    marginTop: 4,
    marginLeft: 36,
  },
  session: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingBottom: 4,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.chrome,
  },
  sessionText: {
    fontFamily: 'SpaceGrotesk_500Medium',
    color: colors.metal,
    fontSize: 9,
    letterSpacing: 1.2,
  },
  padDeck: {
    flex: 2,
    minHeight: 0,
  },
  padDeckCollapsed: {
    flex: 0,
    height: 0,
    opacity: 0,
  },
  mainSlot: {
    flex: 1,
    minHeight: 220,
    marginBottom: spacing.sm,
  },
  mainExpanded: {
    minHeight: 0,
    marginBottom: 0,
  },
});
