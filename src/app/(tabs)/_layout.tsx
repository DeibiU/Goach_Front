import React from 'react';
import { Stack } from 'expo-router';
import { ProtectedPage } from '../guards/ProtectedPage';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function StackLayout() {
  return (
    <SafeAreaProvider>
      <ProtectedPage>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="profile"
            options={{
              headerShown: false,
              title: 'Profile',
              headerStyle: { backgroundColor: 'black' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold' },
            }}
          />
          <Stack.Screen
            name="asignations"
            options={{
              headerShown: false,
              title: 'Asignations',
              headerStyle: { backgroundColor: 'black' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold' },
            }}
          />
          <Stack.Screen
            name="stats"
            options={{
              headerShown: false,
              title: 'Stats',
              headerStyle: { backgroundColor: 'black' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold' },
            }}
          />
        </Stack>
      </ProtectedPage>
    </SafeAreaProvider>
  );
}
