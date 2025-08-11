import React, { useMemo, useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CalendarList } from 'react-native-calendars';
import dayjs from 'dayjs';
import { Appointment } from '../types';
import { colors } from '../theme';
import { dayCounts, markedDatesFrom } from '../utils/calendar';
import AppointmentCard from '../components/AppointmentCard';
import { FontAwesome5 } from '@react-native-vector-icons/fontawesome5';

type Props = {
  navigation: any;
  appointments: Appointment[];
};

const monthDiff = (a: dayjs.Dayjs, b: dayjs.Dayjs) =>
  a.year() * 12 + a.month() - (b.year() * 12 + b.month());

export default function CalendarScreen({ navigation, appointments }: Props) {
  const [selected, setSelected] = useState(dayjs().format('YYYY-MM-DD'));
  const [pastRange, setPastRange] = useState(2);
  const [futureRange, setFutureRange] = useState(2);
  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf('month'));
  const calRef = useRef<any>(null);
  const listFadeAnim = useRef(new Animated.Value(1)).current;

  const counts = useMemo(() => dayCounts(appointments), [appointments]);
  const baseMarked = useMemo(() => markedDatesFrom(counts), [counts]);
  const marked = useMemo(
    () => ({
      ...baseMarked,
      [selected]: {
        ...(baseMarked[selected] || {}),
        selected: true,
        selectedColor: colors.primary,
        selectedTextColor: '#fff',
      },
    }),
    [baseMarked, selected],
  );

  const handleDayPress = useCallback(
    (d: any) => {
      setSelected(d.dateString);

      Animated.sequence([
        Animated.timing(listFadeAnim, {
          toValue: 0.7,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(listFadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    },
    [listFadeAnim],
  );

  const dayList = useMemo(
    () =>
      appointments
        .filter(a => dayjs(a.timeISO).isSame(dayjs(selected), 'day'))
        .sort(
          (a, b) => dayjs(a.timeISO).valueOf() - dayjs(b.timeISO).valueOf(),
        ),
    [appointments, selected],
  );

  const onVisibleMonthsChange = useCallback(
    (months: any[]) => {
      if (!months?.length) return;

      setCurrentMonth(dayjs(months[0].dateString).startOf('month'));

      const todayM = dayjs().startOf('month');
      const minStr = months.reduce(
        (m, d) => (d.dateString < m ? d.dateString : m),
        months[0].dateString,
      );
      const maxStr = months.reduce(
        (m, d) => (d.dateString > m ? d.dateString : m),
        months[0].dateString,
      );
      const minM = dayjs(minStr);
      const maxM = dayjs(maxStr);

      const needPast = Math.max(0, monthDiff(todayM, minM));
      const needFuture = Math.max(0, monthDiff(maxM, todayM));
      if (needPast > pastRange) setPastRange(needPast + 1);
      if (needFuture > futureRange) setFutureRange(needFuture + 1);
    },
    [pastRange, futureRange],
  );

  const goPrevMonth = () =>
    calRef.current?.scrollToMonth(currentMonth.subtract(1, 'month').toDate());
  const goNextMonth = () =>
    calRef.current?.scrollToMonth(currentMonth.add(1, 'month').toDate());

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
      <View style={styles.hintRow}>
        <Pressable onPress={goPrevMonth} hitSlop={10} style={styles.navButton}>
          <FontAwesome5
            name="chevron-left"
            iconStyle="solid"
            size={18}
            color={colors.primary}
          />
        </Pressable>
        <Text style={styles.hintTxt}>Swipe to change month</Text>
        <Pressable onPress={goNextMonth} hitSlop={10} style={styles.navButton}>
          <FontAwesome5
            name="chevron-right"
            iconStyle="solid"
            size={18}
            color={colors.primary}
          />
        </Pressable>
      </View>

      <CalendarList
        ref={calRef}
        horizontal
        pagingEnabled
        pastScrollRange={pastRange}
        futureScrollRange={futureRange}
        markingType="custom"
        markedDates={marked}
        onDayPress={handleDayPress}
        onVisibleMonthsChange={onVisibleMonthsChange}
        theme={{
          todayTextColor: colors.primary,
          textDayFontWeight: '600',
          textMonthFontWeight: '700',
        }}
      />

      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <View style={[styles.dot, styles.dotAvailable]} />
          <Text style={styles.legendTxt}>Available</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.dot, styles.dotPartial]} />
          <Text style={styles.legendTxt}>Partial</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.dot, styles.dotFull]} />
          <Text style={styles.legendTxt}>Fully booked</Text>
        </View>
      </View>

      <Animated.View style={[styles.listWrap, { opacity: listFadeAnim }]}>
        <Text style={styles.heading}>
          {dayjs(selected).format('ddd, DD MMM')} — {dayList.length} Appointment
          {dayList.length !== 1 ? 's' : ''}
        </Text>
        <FlatList
          data={dayList}
          keyExtractor={i => i.id}
          ListEmptyComponent={
            <Text style={styles.muted}>No appointments.</Text>
          }
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                navigation.navigate('AppointmentDetails', { id: item.id })
              }
            >
              <AppointmentCard
                item={item}
                onPress={id =>
                  navigation.navigate('AppointmentDetails', { id })
                }
              />
            </Pressable>
          )}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  hintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  navButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.card,
  },
  hintTxt: { color: colors.muted, fontSize: 12, fontWeight: '600' },
  legendRow: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 16,
    paddingTop: 8,
    alignItems: 'center',
  },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dot: { width: 12, height: 12, borderRadius: 6 },
  dotAvailable: { backgroundColor: '#DCFCE7' },
  dotPartial: { backgroundColor: '#FEF3C7' },
  dotFull: { backgroundColor: '#FECACA' },
  legendTxt: { color: colors.muted, fontSize: 12 },
  listWrap: { flex: 1, padding: 16, paddingTop: 8 },
  heading: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  muted: { color: colors.muted },
});
