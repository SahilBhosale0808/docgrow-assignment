import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FA5 from '@react-native-vector-icons/fontawesome5';
import TextField from '../components/TextField';
import { colors, spacing } from '../theme';
import { setUserName as saveUserName } from '../storage/user';
import Toast from 'react-native-toast-message';

type Props = { userName: string; setUserName: (n: string) => void };
export default function Settings({ userName, setUserName }: Props) {
  const [name, setName] = useState(userName);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

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

  const onSave = async () => {
    const n = name.trim();
    if (!n) return;
    await saveUserName(n);
    setUserName(n);
    Toast.show({ type: 'success', text1: 'Saved', text2: 'Profile updated' });
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.wrap}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        <View style={styles.header}>
          <FA5 name="cog" size={24} color={colors.primary} iconStyle="solid" />
          <Text style={styles.h1}>Settings</Text>
        </View>

        {/* Profile Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <FA5
              name="user-circle"
              size={20}
              color={colors.primary}
              iconStyle="solid"
            />
            <Text style={styles.sectionTitle}>Profile Information</Text>
          </View>
          <View style={styles.card}>
            <TextField
              label="Doctor Name"
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
            />
          </View>
        </View>

        {/* App Information */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <FA5
              name="info-circle"
              size={20}
              color={colors.primary}
              iconStyle="solid"
            />
            <Text style={styles.sectionTitle}>App Information</Text>
          </View>
          <View style={styles.card}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Version</Text>
              <Text style={styles.infoValue}>1.0.0</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Build</Text>
              <Text style={styles.infoValue}>2025.01</Text>
            </View>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <FA5
              name="stethoscope"
              size={20}
              color={colors.primary}
              iconStyle="solid"
            />
            <Text style={styles.sectionTitle}>About DocGrow</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.aboutText}>
              DocGrow is a comprehensive appointment management system designed
              for healthcare professionals. Manage your patients, schedule
              appointments, and keep track of medical notes efficiently.
            </Text>
          </View>
        </View>

        <Pressable style={styles.saveButton} onPress={onSave}>
          <FA5 name="save" size={16} color="#fff" iconStyle="solid" />
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </Pressable>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  h1: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  section: {
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.muted,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 4,
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.muted,
  },
  saveButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
