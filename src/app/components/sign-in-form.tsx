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
import { Text } from '@/src/app/components/ui/text';
import { Link, useRouter } from 'expo-router';
import * as React from 'react';
import { Keyboard, Modal, Pressable, type TextInput, View } from 'react-native';
import { useAuth } from '../services/auth-service';
import { ResetPasswordForm } from './reset-password-form';
import { Toast } from 'toastify-react-native';
import { getAccessToken } from '../interceptor/token-storage';
import { useUser } from '../services/user-service';

/**
 *
 */
export function SignInForm() {
  const router = useRouter();
  const { logIn, token } = useAuth();
  const { connectSocket } = useUser();
  const passwordInputRef = React.useRef<TextInput>(null);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [singinVisible, setVisible] = React.useState(true);
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
      Toast.warn('Please enter an email or password');
      return;
    }

    setLoading(true);

    try {
      const loginResponse = await logIn({ email, password });
      connectSocket(loginResponse.authUser.id);
      router.replace('/(tabs)/profile');
    } catch (error: any) {
      console.error('Error logging in', error);
      Toast.error('Invalid credentials or server error');
    } finally {
      setLoading(false);
    }
  }

  if (token) {
    return null;
  }
  return (
    <View className="gap-6 rounded-2xl ">
      <Card className="border-border/0 sm:border-border">
        <CardHeader>
          <CardTitle className="text-center text-2xl sm:text-left text-blue-500">Log in, Goach in!</CardTitle>
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
                    setModalVisible(true);
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
        </CardContent>
      </Card>
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <Pressable
            style={{ position: 'absolute', width: '100%', height: '100%' }}
            onPress={Keyboard.dismiss}
          />
          <View className="w-[90%] max-w-sm">
            <Button
              variant="ghost"
              onPress={() => setModalVisible(false)}
              className="absolute top-5 right-5 rounded-full"
            >
              <Text>X</Text>
            </Button>
            <ResetPasswordForm />
          </View>
        </View>
      </Modal>
    </View>
  );
}