import React, { useMemo, useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  TextInput,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import dayjs from 'dayjs';
import { Appointment } from '../types';
import { colors } from '../theme';
import AppointmentCard from '../components/AppointmentCard';
import FA5 from '@react-native-vector-icons/fontawesome5';

type Props = {
  navigation: any;
  route: { params?: { dateISO?: string } };
  appointments?: Appointment[];
};

const FILTERS = { TODAY: 'Today', UPCOMING: 'Upcoming', PAST: 'Past' } as const;
type Filter = (typeof FILTERS)[keyof typeof FILTERS];

export default function Appointments({
  navigation,
  route,
  appointments = [],
}: Props) {
  const initialDate = route?.params?.dateISO || dayjs().format('YYYY-MM-DD');
  const [filter, setFilter] = useState<Filter>(FILTERS.TODAY);
  const [q, setQ] = useState('');
  const fabScaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(fabScaleAnim, {
      toValue: 1,
      delay: 300,
      useNativeDriver: true,
    }).start();
  }, [fabScaleAnim]);

  const base = useMemo(() => {
    const now = dayjs(initialDate);
    if (filter === FILTERS.TODAY)
      return appointments.filter(a => dayjs(a.timeISO).isSame(now, 'day'));
    if (filter === FILTERS.UPCOMING)
      return appointments.filter(a => dayjs(a.timeISO).isAfter(now, 'day'));
    return appointments.filter(a => dayjs(a.timeISO).isBefore(now, 'day'));
  }, [appointments, filter, initialDate]);

  const data = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return base;
    return base.filter(
      a =>
        a.patientName.toLowerCase().includes(query) ||
        a.symptom.toLowerCase().includes(query),
    );
  }, [base, q]);

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
      <View style={styles.filters}>
        {Object.values(FILTERS).map(f => (
          <Pressable
            key={f}
            onPress={() => setFilter(f)}
            style={[styles.chip, filter === f && styles.chipActive]}
          >
            <Text
              style={[styles.chipTxt, filter === f && styles.chipTxtActive]}
            >
              {f}
            </Text>
          </Pressable>
        ))}
      </View>

      <TextInput
        value={q}
        onChangeText={setQ}
        placeholder="Search by name or symptom"
        placeholderTextColor={colors.muted}
        style={styles.search}
      />

      <FlatList
        data={data}
        keyExtractor={i => i.id}
        ListEmptyComponent={<Text style={styles.muted}>No appointments.</Text>}
        renderItem={({ item }) => (
          <AppointmentCard
            item={item}
            onPress={id => navigation.navigate('AppointmentDetails', { id })}
          />
        )}
        contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 16 }}
      />

      <Animated.View
        style={[styles.fabContainer, { transform: [{ scale: fabScaleAnim }] }]}
      >
        <Pressable
          style={styles.fab}
          onPress={() => navigation.navigate('AddAppointment')}
        >
          <FA5 name="plus" size={20} color="#fff" iconStyle="solid" />
        </Pressable>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  filters: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
    marginHorizontal: 16,
    marginTop: 16,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: colors.card,
  },
  chipActive: { backgroundColor: '#E0F2FE' },
  chipTxt: { color: colors.muted, fontWeight: '500' },
  chipTxtActive: { color: colors.primary },
  search: {
    backgroundColor: colors.card,
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    marginHorizontal: 16,
    color: colors.text,
  },
  muted: { color: colors.muted, marginHorizontal: 16 },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
