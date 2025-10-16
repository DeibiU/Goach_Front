import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { AuthProvider } from './services/auth-service';
import '../../global.css';
import { PostHogProvider } from 'posthog-react-native';
/**
 *
 */
export default function RootLayout() {
  return (
    <PostHogProvider
      apiKey="phc_3VCbvJ9U974fl5QZbliZHepXZXTkoFbySugni3OBblD"
      options={{ host: 'https://us.i.posthog.com' }}
    >
      <AuthProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
              headerTitle: 'Goach',
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              title: 'Home',
            }}
          />
          <Stack.Screen
            name="login"
            options={{
              headerTitle: 'Log into Goach',
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              title: 'Home',
            }}
          />
          <Stack.Screen
            name="register"
            options={{
              headerTitle: 'Register to Goach',
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              title: 'Register',
            }}
          />
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(unusual)"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
        <PortalHost />
      </AuthProvider>
    </PostHogProvider>
  );
}
