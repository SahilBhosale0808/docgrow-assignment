import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import dayjs from 'dayjs';
import { Appointment } from '../types';
import { colors } from '../theme';
import StatusPill from './StatusPill';

type Props = {
  item: Appointment;
  onPress: (id: string) => void;
};
export default function AppointmentCard({ item, onPress }: Props) {
  return (
    <Pressable style={styles.row} onPress={() => onPress(item.id)}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.patientName}</Text>
        <Text style={styles.meta}>{item.symptom}</Text>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={styles.time}>
          {dayjs(item.timeISO).format('DD MMM, HH:mm')}
        </Text>
        <StatusPill status={item.status} style={{ marginTop: 6 }} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.card,
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  name: { fontWeight: '600', color: colors.text },
  meta: { color: colors.muted },
  time: { color: colors.text },
});
