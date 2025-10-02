import { Link, useRouter } from 'expo-router';
import * as React from 'react';
import { type TextInput, View, Alert } from 'react-native';
import { useAuth } from '../services/auth-service';

import { SocialConnections } from '@/src/app/components/social-connections';
import { Button } from '@/src/app/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/app/components/ui/card';
import { Input } from '@/src/app/components/ui/input';
import { Label } from '@/src/app/components/ui/label';
import { Separator } from '@/src/app/components/ui/separator';
import { Text } from '@/src/app/components/ui/text';

/**
 *
 */
export function SignInForm() {
  const router = useRouter();
  const { logIn, user } = useAuth();
  const passwordInputRef = React.useRef<TextInput>(null);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  /**
   *
   */
  function onEmailSubmitEditing() {
    passwordInputRef.current?.focus();
  }

  /**
   *
   */
  async function onSubmit() {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter an email or password');
      return;
    }

    setLoading(true);

    try {
      const loginResponse = await logIn({ email, password });
      router.push('/profile');
    } catch (error: any) {
      console.error('Error logging in', error);
      Alert.alert('Login Failed', 'Invalid credentials or server error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="gap-6">
      <Card className="border-border/0 shadow-none sm:border-border sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left">Log in, Goach in!</CardTitle>
          <CardDescription className="text-center sm:text-left">
            Welcome back! Please log in to continue
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
                value={email}
                onChangeText={setEmail}
                onSubmitEditing={onEmailSubmitEditing}
                returnKeyType="next"
                submitBehavior="submit"
              />
            </View>
            <View className="gap-1.5">
              <View className="flex-row items-center">
                <Label htmlFor="password">Password</Label>
                <Button
                  variant="link"
                  size="sm"
                  className="ml-auto h-4 px-1 py-0 web:h-fit sm:h-4"
                  onPress={() => {
                    // TODO: Navigate to forgot password screen
                  }}
                >
                  <Text className="font-normal leading-4">Forgot your password?</Text>
                </Button>
              </View>
              <Input
                ref={passwordInputRef}
                id="password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                returnKeyType="send"
                onSubmitEditing={onSubmit}
              />
            </View>
            <Button className="w-full" onPress={onSubmit}>
              <Text>{loading ? 'Logging In..' : 'Continue'}</Text>
            </Button>
          </View>
          <Text className="text-center text-sm">
            No accounts? Guess you'll have to{' '}
            <Link
              href="/register"
              className="text-green-400"
              style={{ textDecorationLine: 'underline' }}
            >
              Register
            </Link>{' '}
            first heh.
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
