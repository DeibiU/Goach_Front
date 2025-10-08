import { Link, router } from 'expo-router';
import * as React from 'react';
import { TextInput, View } from 'react-native';

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
import { Switch } from '@/src/app/components/ui/switch';
import { Text } from '@/src/app/components/ui/text';
import { User, UserSpec } from '../interfaces/types';
import { useAuth } from '../services/auth-service';

/**
 *
 */
export function SignUpForm() {
  const passwordInputRef = React.useRef<TextInput>(null);
  const { signUp } = useAuth();

  const [form, setForm] = React.useState<UserSpec>({
    name: '',
    email: '',
    password: '',
    role: '',
    active: true,
    height: '0',
    weight: '0',
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
    if (!isValid) return;

    try {
      const newUser = await signUp({
        ...form,
        email: form.email.trim().toLowerCase(),
      });

      router.push('/login');
    } catch (err) {
      console.error('Sign up failed:', err);
    }
  };

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
                placeholder="What's your monnicker?"
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
            <Button className="w-full" onPress={onSubmit} disabled={!isValid}>
              <Text>Continue</Text>
            </Button>
          </View>
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
