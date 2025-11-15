import { Stack } from 'expo-router';

export default function StackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="settings"
        options={{
          headerShown: false,
          title: 'Settings',
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <Stack.Screen
        name="account"
        options={{
          headerShown: false,
          title: 'Account',
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <Stack.Screen
        name="payments"
        options={{
          headerShown: false,
          title: 'Payments',
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <Stack.Screen
        name="userLink"
        options={{
          headerShown: false,
          title: 'Link',
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <Stack.Screen
        name="gyms"
        options={{
          headerShown: false,
          title: 'Gyms',
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <Stack.Screen
        name="routines"
        options={{
          headerShown: false,
          title: 'Routines',
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      {/* ✅ Now this is inside the Stack */}
      <Stack.Screen
        name="exercises"
        options={{
          headerShown: false,
          title: 'Exercises',
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
    </Stack>
  );
}
