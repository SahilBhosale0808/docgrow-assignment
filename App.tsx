import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import RootNav from './src/navigation/RootNav';
import { mockAppointments } from './src/data/mockAppointments';
import { Appointment } from './src/types';
import { getUserName, setUserName as persistName } from './src/storage/user';
import OnboardingName from './src/screens/OnboardingName';
import SplashScreen from './src/screens/SplashScreen';

export default function App() {
  const [appointments, setAppointments] =
    useState<Appointment[]>(mockAppointments);
  const [userName, setUserName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    (async () => {
      const saved = await getUserName();
      if (saved) setUserName(saved);
      setIsLoading(false);
    })();
  }, []);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  const handleNameDone = async (name: string) => {
    setUserName(name);
    await persistName(name);
  };

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  if (isLoading) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {userName ? (
          <RootNav
            appointments={appointments}
            setAppointments={setAppointments}
            userName={userName}
            setUserName={setUserName}
          />
        ) : (
          <OnboardingName onDone={handleNameDone} />
        )}
      </NavigationContainer>
      <Toast />
    </SafeAreaProvider>
  );
}
