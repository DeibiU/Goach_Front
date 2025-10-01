import { Stack } from 'expo-router';
/**
 *
 */
export default function StackLayout() {
	return (
		<>
			<Stack>
				<Stack.Screen
					name="settings"
					options={{
						headerTitle: 'Settings',
						headerStyle: {
							backgroundColor: 'black',
						},
						headerTintColor: '#fff',
						headerTitleStyle: {
							fontWeight: 'bold',
						},
						title: 'Settings',
					}}
				/>
				<Stack.Screen
					name="userLink"
					options={{
						headerTitle: 'Link',
						headerStyle: {
							backgroundColor: 'black',
						},
						headerTintColor: '#fff',
						headerTitleStyle: {
							fontWeight: 'bold',
						},
						title: 'Link',
					}}
				/>
				<Stack.Screen
					name="gyms"
					options={{
						headerTitle: 'Gyms',
						headerStyle: {
							backgroundColor: 'black',
						},
						headerTintColor: '#fff',
						headerTitleStyle: {
							fontWeight: 'bold',
						},
						title: 'Gyms',
					}}
				/>
			</Stack>
		</>
	);
}
