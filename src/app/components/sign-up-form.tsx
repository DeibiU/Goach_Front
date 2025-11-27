import { Link, router } from 'expo-router';
import * as React from 'react';
import { Alert, TextInput, View } from 'react-native';

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
import { Switch } from '@/src/app/components/ui/switch';
import { Text } from '@/src/app/components/ui/text';
import { User, UserSpec } from '../interfaces/types';
import { useAuth } from '../services/auth-service';
import { useUser } from '../services/user-service';
import { Separator } from './ui/separator';
import { clearTokens, setAuthUser } from '../interceptor/token-storage';
import { Toast } from 'toastify-react-native';
type Props = {
  isLogin: boolean;
};
/**
 *
 */
export function SignUpForm({ isLogin }: Props) {
  const passwordInputRef = React.useRef<TextInput>(null);
  const { user, signUp, updateUserInContext } = useAuth();
  const { updateUser } = useUser();

  const [form, setForm] = React.useState<UserSpec>({
    name: user?.name || '',
    email: user?.email || '',
    password: user?.password || '',
    role: user?.role || '',
    active: user?.active || true,
    height: user?.height || '',
    weight: user?.weight || '',
    privateCode: '',
  });

  const setField =
    <K extends keyof User>(key: K) =>
    (value: User[K]) =>
      setForm((prev) => ({ ...prev, [key]: value }));

  /**
   *
   */
  function onEmailSubmitEditing() {
    passwordInputRef.current?.focus();
  }

  const isValid =
    form.name.trim().length > 0 && /\S+@\S+\.\S+/.test(form.email) && form.password.length >= 8;

  /**
   *
   */
  const onSubmit = async () => {
    if (!isValid) {
      Toast.warn("Non valid Info! Please enter valid information to register your account");
      return;
    }

    try {
      if (isLogin) {
        const newUser = await signUp({
          ...form,
          role: form.role || 'TRAINEE',
          email: form.email?.trim().toLowerCase(),
        });
        if(newUser){
          Toast.success('Success! User was created.')
          router.push('/login');
        }else{
          Toast.error("Error! Your user creation failed.")
        }
        
      } else {
        const emailChanged = form.email !== user?.email;
        const passwordChanged = form.password && form.password !== user?.password;

        const targetId = user?.id || '';
        const updatedUser = await updateUser(
          { ...form, email: form.email?.trim().toLowerCase() },
          targetId,
        );

        if (updatedUser) {
          updateUserInContext(updatedUser);
        }

        if (emailChanged || passwordChanged) {
          Alert.alert(
            'Re-authentication required',
            'Your credentials changed. Please log in again.',
            [
              {
                text: 'OK',
                onPress: () => {
                  clearTokens();
                  router.replace('/login');
                },
              },
            ],
          );
        } else {
          Toast.success('Profile updated! Your information was updated successfully!');
        }
      }
    } catch (err) {
      console.error('Update failed:', err);
      Toast.error('Error! There was an issue updating your profile.');
    }
  };

  return (
    <View className="gap-6">
      <Card className="border-border/0 shadow-none sm:border-border sm:shadow-sm sm:shadow-black/5">
        {isLogin && (
          <CardHeader>
            <CardTitle className="text-center text-xl sm:text-left">Join Goach!</CardTitle>
            <CardDescription className="text-center sm:text-left">
              Welcome to Goach! Fill in these fields to get started.
            </CardDescription>
          </CardHeader>
        )}
        <CardContent className="gap-6">
          <View className="gap-6">
            <View className="gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder={user?.email || 'goach@mail.com'}
                keyboardType="email-address"
                autoComplete="email"
                autoCapitalize="none"
                value={form.email}
                onChangeText={setField('email')}
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
                placeholder="shhh! We won't tell"
                ref={passwordInputRef}
                id="password"
                secureTextEntry
                value={form.password}
                onChangeText={setField('password')}
                returnKeyType="send"
                onSubmitEditing={onSubmit}
              />
            </View>
            <View className="gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder={user?.name || "What's your monnicker?"}
                keyboardType="default"
                autoComplete="name"
                autoCapitalize="words"
                value={form.name}
                onChangeText={setField('name')}
                onSubmitEditing={onSubmit}
                returnKeyType="next"
                submitBehavior="submit"
              />
            </View>
            {isLogin && (
              <View className="gap-1.5">
                <Text>
                  <Switch
                    checked={form.role === 'TRAINER'}
                    onCheckedChange={(checked: boolean) =>
                      setForm((prev) => ({
                        ...prev,
                        role: checked ? 'TRAINER' : 'TRAINEE',
                      }))
                    }
                  />
                  <Text>{'   '}I am a trainer.</Text>
                </Text>
              </View>
            )}
          </View>
          {isLogin && (
            <View className="gap-1.5">
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
            </View>
          )}
          {!isLogin && (
            <View className="gap-2">
              <View className="flex-row items-center py-3 px-5">
                <Separator />
              </View>
              <CardDescription className="text-center sm:text-left">
                You can add your biometric information here.
              </CardDescription>
              <View className="gap-1.5">
                <Label htmlFor="height">Height</Label>
                <Input
                  id="height"
                  placeholder="0"
                  keyboardType="decimal-pad"
                  value={form.height}
                  onChangeText={setField('height')}
                  returnKeyType="next"
                  submitBehavior="submit"
                />
              </View>
              <View className="gap-1.5">
                <Label htmlFor="weight">Weight</Label>
                <Input
                  id="weight"
                  placeholder="0"
                  keyboardType="decimal-pad"
                  value={form.weight}
                  onChangeText={setField('weight')}
                  returnKeyType="next"
                  submitBehavior="submit"
                />
              </View>
            </View>
          )}
          <Button className="w-full" onPress={onSubmit} disabled={!isValid}>
            <Text>Apply</Text>
          </Button>
        </CardContent>
      </Card>
    </View>
  );
}
