import { StyleSheet, View } from 'react-native';
import { Slot } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav } from '@/components/BottomNav';
import { colors } from '@/constants/theme';

export default function MainLayout() {
  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
        <View style={styles.body}>
          <Slot />
        </View>
        <SafeAreaView edges={['bottom']} style={styles.nav}>
          <BottomNav />
        </SafeAreaView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.void,
  },
  safe: {
    flex: 1,
  },
  body: {
    flex: 1,
    minHeight: 0,
  },
  nav: {
    backgroundColor: 'rgba(6,6,8,0.92)',
  },
});
