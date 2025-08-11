import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FA5 from '@react-native-vector-icons/fontawesome5';
import { colors, spacing } from '../theme';

export default function AppHeader() {
  return (
    <View style={styles.wrap}>
      <FA5
        name="stethoscope"
        size={24}
        color={colors.primary}
        iconStyle="solid"
      />
      <Text style={styles.title}>DocGrow</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: { fontSize: 22, fontWeight: '800', color: colors.text },
});
