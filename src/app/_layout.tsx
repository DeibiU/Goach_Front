import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import '../../global.css';
import AppProviders from './services/service-controller';
import ToastManager from 'toastify-react-native';
import { Text, View } from 'react-native';
import { PostHog, PostHogProvider } from 'posthog-react-native';

const posthog = new PostHog('TU_API_KEY', {
  host: 'https://app.posthog.com',
  captureAppLifecycleEvents: true,
});

const toastConfig = {
  error: (props: any) => (
    <View
      style={{
        backgroundColor: '#000000',
        padding: 16,
        borderRadius: 5,
        borderWidth: 3,
        borderColor: '#FF0000',
      }}
    >
      <Text style={{ color: '#FF0000', fontWeight: 'bold' }}>{props.text1}</Text>
      {props.text2 && <Text style={{ color: '#FF0000' }}>{props.text2}</Text>}
    </View>
  ),
  success: (props: any) => (
    <View
      style={{
        backgroundColor: '#000000',
        padding: 16,
        borderRadius: 5,
        borderWidth: 3,
        borderColor: '#00FF00',
      }}
    >
      <Text style={{ color: '#00FF00', fontWeight: 'bold' }}>{props.text1}</Text>
      {props.text2 && <Text style={{ color: '#00FF00' }}>{props.text2}</Text>}
    </View>
  ),
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AppProviders>
          <PostHogProvider client={posthog}>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen
                name="login"
                options={{
                  headerTitle: 'Log into Goach',
                  headerStyle: { backgroundColor: 'black' },
                  headerTintColor: '#fff',
                  headerTitleStyle: { fontWeight: 'bold' },
                }}
              />
              <Stack.Screen
                name="register"
                options={{
                  headerTitle: 'Register to Goach',
                  headerStyle: { backgroundColor: 'black' },
                  headerTintColor: '#fff',
                  headerTitleStyle: { fontWeight: 'bold' },
                }}
              />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="(unusual)" options={{ headerShown: false }} />
            </Stack>
            <PortalHost />
            <ToastManager config={toastConfig} />
          </PostHogProvider>
        </AppProviders>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
