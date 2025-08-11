import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Dashboard from '../screens/Dashboard';
import Calendar from '../screens/Calendar';
import Appointments from '../screens/Appointments';
import Settings from '../screens/Settings';
import { Appointment } from '../types';
import FA5 from '@react-native-vector-icons/fontawesome5';

const Tab = createBottomTabNavigator();

type Props = {
  appointments: Appointment[];
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
  userName: string;
  setUserName: (n: string) => void;
};

export default function Tabs({
  appointments,
  setAppointments,
  userName,
  setUserName,
}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerTitleAlign: 'center',
        tabBarActiveTintColor: '#0EA5E9',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarLabelStyle: { fontSize: 12, paddingBottom: 2 },
        tabBarStyle: {
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom + 4,
          paddingTop: 8,
        },
        tabBarIcon: ({ color }) => {
          const map: Record<string, string> = {
            Dashboard: 'home',
            Calendar: 'calendar-alt',
            Appointments: 'list-alt',
            Settings: 'cog',
          };
          const name = map[route.name] || 'circle';
          return (
            <FA5 name={name as any} size={20} color={color} iconStyle="solid" />
          );
        },
      })}
    >
      <Tab.Screen name="Dashboard" options={{ headerShown: false }}>
        {p => (
          <Dashboard {...p} appointments={appointments} userName={userName} />
        )}
      </Tab.Screen>

      <Tab.Screen name="Calendar" options={{ headerShown: false }}>
        {p => <Calendar {...p} appointments={appointments} />}
      </Tab.Screen>

      <Tab.Screen name="Appointments" options={{ headerShown: false }}>
        {p => (
          <Appointments
            {...p}
            appointments={appointments}
            setAppointments={setAppointments}
          />
        )}
      </Tab.Screen>

      <Tab.Screen name="Settings" options={{ headerShown: false }}>
        {p => <Settings {...p} userName={userName} setUserName={setUserName} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
