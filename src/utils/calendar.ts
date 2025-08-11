import dayjs from 'dayjs';
import { Appointment } from '../types';

export type DayCountMap = Record<string, number>;

export function dayCounts(appointments: Appointment[]): DayCountMap {
  return appointments.reduce<DayCountMap>((acc, a) => {
    const d = dayjs(a.timeISO).format('YYYY-MM-DD');
    acc[d] = (acc[d] || 0) + 1;
    return acc;
  }, {});
}

// thresholds: 0–2 green, 3–5 yellow, 6+ red
export function markedDatesFrom(counts: DayCountMap) {
  const res: Record<string, any> = {};
  Object.entries(counts).forEach(([date, count]) => {
    let bg = '#DCFCE7'; // light green - Available
    let txt = '#065F46'; // dark green
    if (count >= 6) {
      bg = '#FECACA'; // light red - Fully booked
      txt = '#991B1B'; // dark red
    } else if (count >= 3) {
      bg = '#FEF3C7'; // light amber - Partial
      txt = '#92400E'; // dark amber
    }

    res[date] = {
      customStyles: {
        container: { backgroundColor: bg, borderRadius: 6 },
        text: { color: txt, fontWeight: '700' },
      },
    };
  });
  return res;
}
