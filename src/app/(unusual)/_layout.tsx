import { Stack } from 'expo-router';
import React from 'react';
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
						headerShown: false,
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
					name="account"
					options={{
						headerShown: false,
						headerTitle: 'Your account',
						headerStyle: {
							backgroundColor: 'black',
						},
						headerTintColor: '#fff',
						headerTitleStyle: {
							fontWeight: 'bold',
						},
						title: 'Account',
					}}
				/>
				<Stack.Screen
					name="payments"
					options={{
						headerShown: false,
						headerTitle: 'Your Payments',
						headerStyle: {
							backgroundColor: 'black',
						},
						headerTintColor: '#fff',
						headerTitleStyle: {
							fontWeight: 'bold',
						},
						title: 'Payments',
					}}
				/>
				<Stack.Screen
					name="userLink"
					options={{
						headerShown: false,
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
						headerShown: false,
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
				<Stack.Screen
					name="routine"
					options={{
						headerShown: false,
						headerTitle: 'Routine',
						headerStyle: {
							backgroundColor: 'black',
						},
						headerTintColor: '#fff',
						headerTitleStyle: {
							fontWeight: 'bold',
						},
						title: 'Routine',
					}}
				/>
			</Stack>
		</>
	);
}
