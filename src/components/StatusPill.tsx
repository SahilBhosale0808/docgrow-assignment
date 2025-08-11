import React from 'react';
import { Text, StyleSheet, View, ViewStyle } from 'react-native';
import { Status } from '../types';

type Props = { status: Status; style?: ViewStyle };
export default function StatusPill({ status, style }: Props) {
  const bg =
    status === 'confirmed'
      ? '#DCFCE7'
      : status === 'pending'
      ? '#FEF9C3'
      : '#FEE2E2';
  const textColor =
    status === 'confirmed'
      ? '#065F46'
      : status === 'pending'
      ? '#92400E'
      : '#991B1B';
  const label =
    status === 'confirmed'
      ? 'Confirmed'
      : status === 'pending'
      ? 'Pending'
      : 'Canceled';
  return (
    <View style={[styles.wrap, { backgroundColor: bg }, style]}>
      <Text style={[styles.txt, { color: textColor }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 4, paddingHorizontal: 8, borderRadius: 999 },
  txt: { fontSize: 12, fontWeight: '600' },
});
