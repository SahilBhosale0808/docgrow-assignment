import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import TextField from '../components/TextField';
import { colors, spacing } from '../theme';
import { setUserName } from '../storage/user';

type Props = { onDone: (name: string) => void };
export default function OnboardingName({ onDone }: Props) {
  const [name, setName] = useState('');
  const onSave = async () => {
    const n = name.trim();
    if (!n) return;
    await setUserName(n);
    onDone(n);
  };
  return (
    <View style={styles.wrap}>
      <Text style={styles.h1}>Welcome to DocGrow</Text>
      <Text style={styles.sub}>What should we call you?</Text>
      <TextField
        label="Your Name"
        value={name}
        onChangeText={setName}
        placeholder="e.g., Dr. Mehta"
      />
      <Pressable style={styles.btn} onPress={onSave}>
        <Text style={styles.btnTxt}>Continue</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: spacing.md,
    justifyContent: 'center',
    gap: spacing.md,
  },
  h1: { fontSize: 24, fontWeight: '800', color: colors.text },
  sub: { color: '#6B7280' },
  btn: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnTxt: { color: '#fff', fontWeight: '700' },
});
