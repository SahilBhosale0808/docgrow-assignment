import React from 'react';
import { Pressable, Text, StyleSheet, View, ViewStyle } from 'react-native';
import { colors, radius } from '../theme';

type Variant = 'primary' | 'ghost';
type Props = {
  title: string;
  onPress: () => void;
  variant?: Variant;
  style?: ViewStyle;
  Icon?: React.ComponentType<{ name?: string; size?: number; color?: string }>;
  iconName?: string;
};
export default function Button({
  title,
  onPress,
  variant = 'primary',
  style,
  Icon,
  iconName,
}: Props) {
  const isGhost = variant === 'ghost';
  const labelColor = isGhost ? colors.primary : '#fff';
  return (
    <Pressable
      onPress={onPress}
      style={[styles.base, isGhost ? styles.ghost : styles.primary, style]}
    >
      <View style={styles.row}>
        {Icon && iconName ? (
          <Icon name={iconName} size={16} color={labelColor} />
        ) : null}
        <Text style={[styles.label, { color: labelColor }]}>{title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: { backgroundColor: colors.primary },
  ghost: { backgroundColor: colors.primarySoft },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  label: { fontWeight: '700' },
});
