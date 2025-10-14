import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { ToastProvider } from 'react-native-toast-notifications';
import { PaperProvider } from 'react-native-paper';
import { View } from 'react-native';
import 'react-native-reanimated';
import { useFonts } from '../hooks/useFonts';

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const fontsLoaded = useFonts();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#000000' }}>
      <StatusBar style="light" backgroundColor="#000000" />
      <QueryClientProvider client={queryClient}>
        <PaperProvider>
          <ToastProvider
            placement="top"
            duration={2000}
            animationType="slide-in"
            successColor="#00812F"
            dangerColor="#D10000"
            offset={50}
          >
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="(tabs)" />
            </Stack>
          </ToastProvider>
        </PaperProvider>
      </QueryClientProvider>
    </View>
  );
}