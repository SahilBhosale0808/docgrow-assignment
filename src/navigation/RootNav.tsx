import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './Tabs';
import AppointmentDetails from '../screens/AppointmentDetails';
import AddAppointment from '../screens/AddAppointment';
import { Appointment } from '../types';

export type RootStackParamList = {
  Tabs: undefined;
  AppointmentDetails: { id: string };
  AddAppointment: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

type Props = {
  appointments: Appointment[];
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
  userName: string;
  setUserName: (n: string) => void;
};

export default function RootNav({
  appointments,
  setAppointments,
  userName,
  setUserName,
}: Props) {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'slide_from_right',
        animationDuration: 300,
      }}
    >
      <Stack.Screen name="Tabs" options={{ headerShown: false }}>
        {() => (
          <Tabs
            appointments={appointments}
            setAppointments={setAppointments}
            userName={userName}
            setUserName={setUserName}
          />
        )}
      </Stack.Screen>

      <Stack.Screen 
        name="AppointmentDetails" 
        options={{ 
          headerShown: false,
          animation: 'fade_from_bottom',
        }}
      >
        {p => (
          <AppointmentDetails
            {...p}
            appointments={appointments}
            setAppointments={setAppointments}
          />
        )}
      </Stack.Screen>

      <Stack.Group 
        screenOptions={{ 
          presentation: 'modal',
          animation: 'slide_from_bottom',
          animationDuration: 250,
        }}
      >
        <Stack.Screen
          name="AddAppointment"
          options={{ title: 'Add Appointment' }}
        >
          {p => (
            <AddAppointment
              {...p}
              appointments={appointments}
              setAppointments={setAppointments}
            />
          )}
        </Stack.Screen>
      </Stack.Group>
    </Stack.Navigator>
  );
}
