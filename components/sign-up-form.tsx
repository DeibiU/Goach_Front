import { Link } from 'expo-router';
import * as React from 'react';
import { TextInput, View } from 'react-native';

import { SocialConnections } from '@/components/social-connections';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Text } from '@/components/ui/text';
import { IUser } from '../interfaces/IUser';

/**
 *
 */
export function SignUpForm() {
	const passwordInputRef = React.useRef<TextInput>(null);
	const [user, setUser] = React.useState<IUser>();

	/**
	 *
	 */
	function onEmailSubmitEditing() {
		passwordInputRef.current?.focus();
	}

	/**
	 *
	 */
	function onSubmit() {
		const [form, setForm] = React.useState<IUser>({
			name: '',
			email: '',
			password: '',
			isTrainer: false,
		});

		const [user, setUser] = React.useState<IUser | null>(null); // si querés guardar el resultado
		const passwordInputRef = React.useRef<TextInput>(null);

		// setter genérico y tipado para cualquier campo
		const setField =
			<K extends keyof IUser>(key: K) =>
			(value: IUser[K]) =>
				setForm(prev => ({ ...prev, [key]: value }));

		const onEmailSubmitEditing = () => {
			passwordInputRef.current?.focus();
		};

		const isValid =
			form.name.trim().length > 0 && /\S+@\S+.\S+/.test(form.email) && form.password.length >= 8;

		const onSubmit = () => {
			if (!isValid) return;
			const payload: IUser = {
				...form,
				email: form.email.trim().toLowerCase(),
			};
			setUser(payload); // acá “seteás el user” ya con tu interface
			// TODO: llamar API / navegar
		};
	}

	return (
		<View className="gap-6">
			<Card className="border-border/0 shadow-none sm:border-border sm:shadow-sm sm:shadow-black/5">
				<CardHeader>
					<CardTitle className="text-center text-xl sm:text-left">Join Goach!</CardTitle>
					<CardDescription className="text-center sm:text-left">
						Welcome to Goach! Fill in these fields to get started.
					</CardDescription>
				</CardHeader>
				<CardContent className="gap-6">
					<View className="gap-6">
						<View className="gap-1.5">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								placeholder="goach@mail.com"
								keyboardType="email-address"
								autoComplete="email"
								autoCapitalize="none"
								onSubmitEditing={onEmailSubmitEditing}
								returnKeyType="next"
								submitBehavior="submit"
							/>
						</View>
						<View className="gap-1.5">
							<View className="flex-row items-center">
								<Label htmlFor="password">Password</Label>
							</View>
							<Input
								ref={passwordInputRef}
								id="password"
								secureTextEntry
								returnKeyType="send"
								onSubmitEditing={onSubmit}
							/>
						</View>
						<View className="gap-1.5">
							<Label htmlFor="name">Name</Label>
							<Input
								id="name"
								placeholder="What's your monnicker?"
								keyboardType="default"
								autoComplete="name"
								autoCapitalize="words"
								onSubmitEditing={onSubmit}
								returnKeyType="next"
								submitBehavior="submit"
							/>
						</View>
						<View className="gap-1.5">
							<Switch checked={false} />
						</View>
						<Button className="w-full" onPress={onSubmit}>
							<Text>Continue</Text>
						</Button>
					</View>
					<Text className="text-center text-sm">Already a member?</Text>
					<Text className="text-center text-sm">
						What are you doin' here? Go{' '}
						<Link
							href="/login"
							className="text-green-400"
							style={{ textDecorationLine: 'underline' }}
						>
							Log In
						</Link>{' '}
						then!
					</Text>
					<View className="flex-row items-center">
						<Separator className="flex-1" />
						<Text className="px-4 text-sm text-muted-foreground">or</Text>
						<Separator className="flex-1" />
					</View>
					<SocialConnections />
				</CardContent>
			</Card>
		</View>
	);
}
