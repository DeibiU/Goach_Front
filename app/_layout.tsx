import { Stack } from 'expo-router';
import { PostHogProvider } from 'posthog-react-native';
import '../global.css';

/**
 *
 */
export default function RootLayout() {
	return (
		<PostHogProvider
			apiKey="phc_3VCbvJ9U974fl5QZbliZHepXZXTkoFbySugni3OBblD"
			options={{
				host: 'https://us.i.posthog.com',
			}}
		>
			<Stack></Stack>
		</PostHogProvider>
	);
}
