import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import dayjs from 'dayjs';
import { Appointment, Status } from '../types';
import { colors, spacing } from '../theme';
import StatusPill from '../components/StatusPill';
import Toast from 'react-native-toast-message';

type Props = {
  route: { params: { id: string } };
  navigation: any;
  appointments: Appointment[];
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
};

const STATUSES: Status[] = ['confirmed', 'pending', 'canceled'];

export default function AppointmentDetails({
  route,
  appointments,
  setAppointments,
}: Props) {
  const { id } = route.params;
  const appt = useMemo(
    () => appointments.find(a => a.id === id),
    [appointments, id],
  );

  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<Status>(
    appt?.status || 'confirmed',
  );
  const [notesText, setNotesText] = useState(appt?.notes?.text || '');

  const saveStatus = () => {
    if (!appt) return;

    setAppointments(prev =>
      prev.map(a => (a.id === id ? { ...a, status: selectedStatus } : a)),
    );
    setIsEditingStatus(false);
    Toast.show({ type: 'success', text1: 'Status updated' });
  };

  const saveNotes = () => {
    if (!appt) return;

    const updatedNotes = { text: notesText.trim(), reviewed: true };

    setAppointments(prev =>
      prev.map(a =>
        a.id === id
          ? {
              ...a,
              notes: updatedNotes,
            }
          : a,
      ),
    );
    setIsEditingNotes(false);
    Toast.show({ type: 'success', text1: 'Notes saved' });
  };

  const cancelStatusEdit = () => {
    setSelectedStatus(appt?.status || 'confirmed');
    setIsEditingStatus(false);
  };

  const cancelNotesEdit = () => {
    setNotesText(appt?.notes?.text || '');
    setIsEditingNotes(false);
  };

  if (!appt)
    return (
      <SafeAreaView style={styles.wrap}>
        <Text style={styles.h1}>Not found</Text>
      </SafeAreaView>
    );

  return (
    <SafeAreaView style={styles.wrap}>
      <Text style={styles.h1}>{appt.patientName}</Text>
      <Text style={styles.sub}>
        {dayjs(appt.timeISO).format('DD MMM YYYY, HH:mm')}
      </Text>
      <Text style={styles.sub}>Reason: {appt.symptom}</Text>

      {/* Status Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Status</Text>
          {!isEditingStatus ? (
            <Pressable
              onPress={() => setIsEditingStatus(true)}
              style={styles.editBtn}
            >
              <Text style={styles.editBtnText}>Edit</Text>
            </Pressable>
          ) : (
            <View style={styles.actionButtons}>
              <Pressable onPress={cancelStatusEdit} style={styles.cancelBtn}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </Pressable>
              <Pressable onPress={saveStatus} style={styles.saveBtn}>
                <Text style={styles.saveBtnText}>Save</Text>
              </Pressable>
            </View>
          )}
        </View>

        {!isEditingStatus ? (
          <StatusPill status={appt.status} style={styles.pill} />
        ) : (
          <View style={styles.statusOptions}>
            {STATUSES.map(status => (
              <Pressable
                key={status}
                onPress={() => setSelectedStatus(status)}
                style={[
                  styles.statusChip,
                  selectedStatus === status && styles.statusChipActive,
                ]}
              >
                <Text
                  style={[
                    styles.statusChipText,
                    selectedStatus === status && styles.statusChipTextActive,
                  ]}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>

      {/* Notes Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Notes</Text>
          {!isEditingNotes ? (
            <Pressable
              onPress={() => setIsEditingNotes(true)}
              style={styles.editBtn}
            >
              <Text style={styles.editBtnText}>Edit</Text>
            </Pressable>
          ) : (
            <View style={styles.actionButtons}>
              <Pressable onPress={cancelNotesEdit} style={styles.cancelBtn}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </Pressable>
              <Pressable onPress={saveNotes} style={styles.saveBtn}>
                <Text style={styles.saveBtnText}>Save</Text>
              </Pressable>
            </View>
          )}
        </View>

        {!isEditingNotes ? (
          <Text style={styles.notesText}>
            {appt.notes?.text || 'No notes added'}
          </Text>
        ) : (
          <TextInput
            value={notesText}
            onChangeText={setNotesText}
            placeholder="Enter notes..."
            placeholderTextColor={colors.muted}
            style={styles.notesInput}
            multiline
            numberOfLines={4}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: spacing.md,
    gap: spacing.sm,
  },
  h1: { fontSize: 22, fontWeight: '700', color: colors.text },
  sub: { color: colors.muted },
  pill: { alignSelf: 'flex-start', marginTop: 6 },
  section: {
    marginTop: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.card,
    borderRadius: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  editBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: colors.primary,
    borderRadius: 6,
  },
  editBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  cancelBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
  },
  cancelBtnText: {
    color: '#374151',
    fontSize: 12,
    fontWeight: '500',
  },
  saveBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: colors.primary,
    borderRadius: 6,
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  statusOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  statusChip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  statusChipActive: {
    backgroundColor: '#E0F2FE',
  },
  statusChipText: {
    color: colors.muted,
    fontWeight: '500',
    fontSize: 14,
  },
  statusChipTextActive: {
    color: colors.primary,
  },
  notesText: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
  },
  notesInput: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    color: colors.text,
    fontSize: 14,
    minHeight: 80,
    textAlignVertical: 'top',
  },
});
