import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ScreenContainer } from '../components/ui/ScreenContainer';
import { CYBER_THEME } from '../constants/theme';

export default function ExploreScreen() {
  return (
    <ScreenContainer
      mode="stack"
      backgroundColor={CYBER_THEME.colors.background}
      barStyle="light-content"
    >
      <View style={s.content}>
        <Text style={s.tag}>ANALYTICS // HUD</Text>
        <Text style={s.title}>ESTADÍSTICAS DEL SISTEMA</Text>

        <View style={s.statsGrid}>
          <View style={s.statCard}>
            <Text style={s.statValue}>99.8%</Text>
            <Text style={s.statLabel}>UPTIME</Text>
          </View>
          <View style={s.statCard}>
            <Text style={s.statValue}>6/6</Text>
            <Text style={s.statLabel}>MÓDULOS</Text>
          </View>
        </View>

        <Link href="/" asChild>
          <Pressable style={s.btnVolver}>
            <Text style={s.btnVolverTxt}>&lt; VOLVER AL PANEL</Text>
          </Pressable>
        </Link>
      </View>
    </ScreenContainer>
  );
}

const s = StyleSheet.create({
  content: {
    padding: 24,
  },
  tag: {
    color: CYBER_THEME.colors.greenNeon,
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  title: {
    color: CYBER_THEME.colors.textPrimary,
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 2,
    marginVertical: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginVertical: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: CYBER_THEME.colors.cardBg,
    borderWidth: 1,
    borderColor: CYBER_THEME.colors.border,
    padding: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  statValue: {
    color: CYBER_THEME.colors.cyanNeon,
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    color: CYBER_THEME.colors.textMuted,
    fontSize: 10,
    letterSpacing: 1,
    marginTop: 4,
  },
  btnVolver: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: CYBER_THEME.colors.border,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  btnVolverTxt: {
    color: CYBER_THEME.colors.textPrimary,
    fontWeight: 'bold',
    letterSpacing: 1,
    fontSize: 12,
  },
});
