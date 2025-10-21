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
import { Text } from '@/src/app/components/ui/text';
import { Gym } from '../interfaces/types';
import { router } from 'expo-router';
import { useAuth } from '../services/auth-service';

export function GymForm() {
  const [form, setForm] = React.useState<Gym>({
    id: '',
    name: '',
    ownerId: '',
  });
  
  const { user, logIn } = useAuth();
  // const [email] = React.useState(user?.email);
  const [email] = React.useState('bepis')

  const [password, setPassword] = React.useState('');
  const passwordInputRef = React.useRef<TextInput>(null);

  const [loading, setLoading] = React.useState(false);

  async function onSubmit() {
      if (!password) {
        Alert.alert('Error', 'Please enter an email or password');
        return;
      }
  
      setLoading(true);
  
      try {
        const loginResponse = await logIn({ email , password });
        router.push('/profile');
      } catch (error: any) {
        console.error('Error logging in', error);
        Alert.alert('Login Failed', 'Invalid credentials or server error');
      } finally {
        setLoading(false);
      }
    }

  const setField =
    <K extends keyof Gym>(key: K) =>
    (value: Gym[K]) =>
      setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <View>
      <Card className="border-border/0 shadow-none sm:border-border sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left">And so goes the gym!</CardTitle>
          <CardDescription className="text-center sm:text-left">
            For now it's just the name.
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-6">
          <View className="gap-1.5">
            <Label htmlFor="name">Gym's Name</Label>
            <Input
              id="name"
              placeholder="0"
              keyboardType="decimal-pad"
              value={form.name}
              onChangeText={setField('name')}
              returnKeyType="next"
              submitBehavior="submit"
            />
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
          </View>
          {/* <Button className="w-full" onPress={onSubmit}>
              <Text>{loading ? 'Logging In..' : 'Continue'}</Text>
            </Button> */}
        </CardContent>
      </Card>
    </View>
  );
}
