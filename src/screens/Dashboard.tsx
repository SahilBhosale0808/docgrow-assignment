import React, { useMemo, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Pressable } from 'react-native';
import dayjs from 'dayjs';
import { Appointment } from '../types';
import { colors, spacing, typography } from '../theme';
import MetricCard from '../components/MetricCard';
import Button from '../components/Button';
import AppHeader from '../components/AppHeader';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  navigation: any;
  appointments?: Appointment[];
  userName?: string;
};

export default function Dashboard({
  navigation,
  appointments = [],
  userName = 'Doctor',
}: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const todaysCount = useMemo(
    () =>
      appointments.filter(a => dayjs(a.timeISO).isSame(dayjs(), 'day')).length,
    [appointments],
  );
  const totalPatients = useMemo(
    () => new Set(appointments.map(a => a.patientName)).size,
    [appointments],
  );
  const upcoming = useMemo(
    () =>
      [...appointments]
        .filter(a => dayjs(a.timeISO).isAfter(dayjs()))
        .sort((a, b) => dayjs(a.timeISO).valueOf() - dayjs(b.timeISO).valueOf())
        .slice(0, 3),
    [appointments],
  );
  const next = upcoming[0];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.safe}>
      <View style={styles.container}>
        <AppHeader />
        <Animated.View
          style={[
            styles.body,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.greetRow}>
            <Text style={styles.h1}>Hello, {userName}</Text>
          </View>

          <View style={styles.metrics}>
            <MetricCard value={todaysCount} label="Today’s Appointments" />
            <MetricCard value={totalPatients} label="Total Patients" />
          </View>

          {next ? (
            <Pressable
              style={styles.nextCard}
              onPress={() =>
                navigation.navigate('AppointmentDetails', { id: next.id })
              }
            >
              <Text style={styles.nextTitle}>Next Appointment</Text>
              <Text style={styles.nextPatient}>{next.patientName}</Text>
              <Text style={styles.nextSub}>
                {dayjs(next.timeISO).format('ddd, DD MMM · HH:mm')} •{' '}
                {next.symptom}
              </Text>
            </Pressable>
          ) : null}

          <View style={styles.actions}>
            <Button
              title="Add Appointment"
              onPress={() => navigation.navigate('AddAppointment')}
              style={styles.btnWide}
            />
            <Button
              title="View Calendar"
              variant="ghost"
              onPress={() => navigation.navigate('Calendar')}
              style={styles.btnWide}
            />
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  container: { flex: 1 },
  body: {
    paddingHorizontal: spacing.md,
    gap: spacing.md,
    paddingBottom: 80,
  },
  greetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  h1: { fontSize: typography.h1, fontWeight: '800', color: colors.text },
  metrics: { flexDirection: 'row', gap: spacing.sm },
  actions: { flexDirection: 'row', gap: spacing.sm },
  btnWide: { flex: 1 },
  nextCard: {
    backgroundColor: '#F0F9FF',
    borderRadius: 16,
    padding: 14,
  },
  nextTitle: { fontWeight: '700', color: colors.primary, marginBottom: 6 },
  nextPatient: { fontSize: 16, fontWeight: '700', color: colors.text },
  nextSub: { color: '#6B7280' },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  listTitle: { fontWeight: '700', color: colors.text },
  count: {
    backgroundColor: '#E5E7EB',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
    fontSize: 12,
    color: colors.text,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  patient: { fontWeight: '600', color: colors.text },
  sub: { color: '#6B7280' },
  time: { fontWeight: '600', color: colors.text },
  empty: { color: colors.muted },
});
