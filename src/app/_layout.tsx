import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import '../../global.css';
import { PostHogProvider } from 'posthog-react-native';
import AppProviders from './services/service-controller';
import ToastManager from 'toastify-react-native'
import { Text, View } from 'react-native';

const toastConfig = {
  error: (props: any) => (
    <View style={{ backgroundColor: '#000000', padding: 16, borderRadius: 5, borderWidth: 3, borderColor:'#FF0000' }}>
      <Text style={{ color: '#FF0000', fontWeight: 'bold' }}>{props.text1}</Text>
      {props.text2 && <Text style={{ color: '#FF0000' }}>{props.text2}</Text>}
    </View>
  ),
  success: (props: any) => (
    <View style={{ backgroundColor: '#000000', padding: 16, borderRadius: 5, borderWidth: 3, borderColor:'#00FF00' }}>
      <Text style={{ color: '#00FF00', fontWeight: 'bold' }}>{props.text1}</Text>
      {props.text2 && <Text style={{ color: '#00FF00' }}>{props.text2}</Text>}
    </View>
  ),
  // Override other toast types as needed
}

/**
 *
 */
export default function RootLayout() {
  return (
    /*<PostHogProvider
      apiKey="phc_3VCbvJ9U974fl5QZbliZHepXZXTkoFbySugni3OBblD"
      options={{ host: 'https://us.i.posthog.com' }}
    >*/
      <AppProviders>
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
              title: 'Login',
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
        <ToastManager config={toastConfig}/>
      </AppProviders>
    //</PostHogProvider>
  );
}
