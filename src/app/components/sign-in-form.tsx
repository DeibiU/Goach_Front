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
import { PHButton } from './PHButton';

const toastConfig = {
  success: (props: {
    text1:
      | string
      | number
      | bigint
      | boolean
      | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>
      | Iterable<React.ReactNode>
      | React.ReactPortal
      | Promise<
          | string
          | number
          | bigint
          | boolean
          | React.ReactPortal
          | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>
          | Iterable<React.ReactNode>
          | null
          | undefined
        >
      | null
      | undefined;
    text2:
      | string
      | number
      | bigint
      | boolean
      | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>
      | Iterable<React.ReactNode>
      | React.ReactPortal
      | Promise<
          | string
          | number
          | bigint
          | boolean
          | React.ReactPortal
          | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>
          | Iterable<React.ReactNode>
          | null
          | undefined
        >
      | null
      | undefined;
  }) => (
    <View style={{ backgroundColor: '#4CAF50', padding: 16, borderRadius: 10 }}>
      <Text style={{ color: 'white', fontWeight: 'bold' }}>{props.text1}</Text>
      {props.text2 && <Text style={{ color: 'white' }}>{props.text2}</Text>}
    </View>
  ),
  // Override other toast types as needed
};

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
  const [modalVisible, setModalVisible] = React.useState(false);
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
      Toast.error('Please enter an email or password');
      return;
    }

    setLoading(true);

    try {
      const loginResponse = await logIn({ email, password });
      router.push('/profile');
    } catch (error: any) {
      console.error('Error logging in', error);
      Toast.error('Invalid credentials or server error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="gap-6 rounded-2xl shadow-[rgba(0,100,255,0.5)_-5px_-4px_10px_1px]">
      <Card className="border-border/0 sm:border-border">
        <CardHeader>
          <CardTitle className="text-center text-2xl sm:text-left text-blue-500">
            Log in, Goach in!
          </CardTitle>
          <CardDescription className="text-center sm:text-left">
            Welcome back! Please log in to continue
          </CardDescription>
        </CardHeader>

        <CardContent className="gap-6">
          <View className="gap-6">
            {/* EMAIL FIELD */}
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

            {/* PASSWORD FIELD */}
            <View className="gap-1.5">
              <View className="flex-row items-center">
                <Label htmlFor="password">Password</Label>

                {/* FORGOT PASSWORD BUTTON */}
                <PHButton
                  label="Forgot Password"
                  phEvent="click_login_forgot_password"
                  variant="link"
                  className="ml-auto h-4 px-1 py-0 web:h-fit sm:h-4"
                  onPress={() => setModalVisible(true)}
                >
                  <Text className="font-normal leading-4">Forgot your password?</Text>
                </PHButton>
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

            {/* LOGIN BUTTON */}
            <PHButton
              label="Continue"
              phEvent="click_login_submit"
              className="w-full items-center py-3 bg-blue-600 rounded-xl"
              onPress={onSubmit}
            >
              <Text className="text-white">{loading ? 'Logging In..' : 'Continue'}</Text>
            </PHButton>
          </View>

          {/* REGISTER LINK */}
          <Text className="text-center text-sm">
            No accounts? Guess you'll have to{' '}
            <PHButton
              label="Register"
              phEvent="click_login_register"
              textClassName="text-green-400 underline"
              className="px-1"
              onPress={() => router.push('/register')}
            >
              <Text className="text-green-400 underline">Register</Text>
            </PHButton>{' '}
            first heh.
          </Text>
        </CardContent>
      </Card>

      {/* FORGOT PASSWORD MODAL */}
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <Pressable
            style={{ position: 'absolute', width: '100%', height: '100%' }}
            onPress={Keyboard.dismiss}
          />

          <View className="w-[90%] max-w-sm">
            {/* CLOSE MODAL BUTTON */}
            <PHButton
              label="Close Password Modal"
              phEvent="click_login_close_modal"
              variant="ghost"
              className="absolute top-5 right-5 z-10 rounded-full"
              onPress={() => setModalVisible(false)}
            >
              <Text>X</Text>
            </PHButton>

            <ResetPasswordForm />
          </View>
        </View>
      </Modal>
    </View>
  );
}
