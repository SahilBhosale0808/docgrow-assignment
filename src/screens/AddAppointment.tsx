import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import dayjs from 'dayjs';
import { Appointment, Status } from '../types';
import { colors, spacing } from '../theme';
import TextField from '../components/TextField';
import Toast from 'react-native-toast-message';

type Props = {
  navigation: any;
  appointments: Appointment[];
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
};

const STATUSES: Status[] = ['confirmed', 'pending'];

export default function AddAppointment({ navigation, setAppointments }: Props) {
  const [name, setName] = useState('');
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [time, setTime] = useState('09:00');
  const [symptom, setSymptom] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<Status>('confirmed');

  const onSave = () => {
    if (!name.trim() || !symptom.trim())
      return Alert.alert('Missing info', 'Name and symptom are required');
    const dt = dayjs(`${date} ${time}`, 'YYYY-MM-DD HH:mm', true);
    if (!dt.isValid())
      return Alert.alert('Invalid date/time', 'Use YYYY-MM-DD and HH:mm (24h)');
    const newAppt: Appointment = {
      id: String(Date.now()),
      patientName: name.trim(),
      timeISO: dt.toISOString(),
      symptom: symptom.trim(),
      status,
      notes: { text: notes.trim(), reviewed: false },
    };

    setAppointments(prev => [newAppt, ...prev]);

    Toast.show({ type: 'success', text1: 'Appointment added' });
    navigation.goBack();
  };

  return (
    <View style={styles.wrap}>
      <Text style={styles.h1}>New Appointment</Text>
      <TextField
        label="Patient Name"
        value={name}
        onChangeText={setName}
        placeholder="Enter name"
      />
      <View style={styles.row}>
        <TextField
          label="Date (YYYY-MM-DD)"
          value={date}
          onChangeText={setDate}
          containerStyle={{ flex: 1 }}
        />
        <TextField
          label="Time (HH:mm)"
          value={time}
          onChangeText={setTime}
          containerStyle={{ width: 120 }}
        />
      </View>
      <TextField
        label="Symptom"
        value={symptom}
        onChangeText={setSymptom}
        placeholder="Enter symptom"
      />
      <TextField
        label="Notes"
        value={notes}
        onChangeText={setNotes}
        placeholder="Enter additional notes"
        multiline
      />
      <Text style={styles.label}>Status</Text>
      <View style={styles.statusRow}>
        {STATUSES.map(s => (
          <Pressable
            key={s}
            onPress={() => setStatus(s)}
            style={[styles.chip, status === s && styles.chipActive]}
          >
            <Text
              style={[styles.chipTxt, status === s && styles.chipTxtActive]}
            >
              {s === 'confirmed' ? 'Confirmed' : 'Pending'}
            </Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.row}>
        <Pressable
          style={[styles.btn, styles.cancel]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.btnTxt}>Cancel</Text>
        </Pressable>
        <Pressable style={[styles.btn, styles.save]} onPress={onSave}>
          <Text style={styles.btnTxt}>Save</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.bg, padding: spacing.md },
  h1: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: spacing.sm,
    color: colors.text,
  },
  row: { flexDirection: 'row', gap: spacing.sm },
  label: {
    fontWeight: '600',
    marginBottom: 6,
    color: colors.text,
    marginTop: spacing.md,
  },
  statusRow: { flexDirection: 'row', gap: 8, marginBottom: spacing.md },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: colors.card,
  },
  chipActive: { backgroundColor: '#E0F2FE' },
  chipTxt: { color: colors.muted, fontWeight: '500' },
  chipTxtActive: { color: colors.primary },
  btn: { flex: 1, paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  cancel: { backgroundColor: '#E5E7EB' },
  save: { backgroundColor: colors.primary },
  btnTxt: { color: '#fff', fontWeight: '600' },
});
