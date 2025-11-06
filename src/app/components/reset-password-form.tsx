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
import * as React from 'react';
import { TextInput, View } from 'react-native';
import { UserSpec } from '../interfaces/types';
import { useAuth } from '../services/auth-service';

export function ResetPasswordForm() {
  const passwordInputRef = React.useRef<TextInput>(null);
  const { changePassword, sendEmail } = useAuth();
  const [form, setForm] = React.useState<UserSpec>({
    password: '',
    privateCode: '',
    name: '',
    role: '',
    email: '',
    active: true,
    height: '',
    weight: ''
  });

  function onPasswordSubmitEditing() {
    passwordInputRef.current?.focus();
  }

  const isValid = /\S+@\S+\.\S+/.test(form.email) && form.password.length >= 8;

  async function onResetSubmit() {
    if (!isValid) return;

    if (!form.email.trim()) return;

    try {
      const auxUser = {
        ...form,
        email: form.email.trim(),
        password: form.password,
        role: 'ADMIN',
        privateCode: form.privateCode,
      };

      const response = await changePassword(auxUser);
      console.log('Password changed successfully:', response);
    } catch (err) {
      console.error('Password Change failed:', err);
    }
  }

  async function onEmailSubmit() {
    if (!form.email.trim()) return;

    try {
      const auxUser = {
        ...form,
        email: form.email.trim(),
        role: 'ADMIN',
      };

      const response = await sendEmail(auxUser);
      console.log('Email sent successfully:', response);
    } catch (err) {
      console.error('Email sending failed:', err);
    }
  }

  return (
    <View className="sm:flex-1 items-center justify-center px-4 sm:py-4 sm:p-6 mt-safe bg-black bg-opacity-[45%]">
      <Card className="border-border/0 shadow-none sm:border-border sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left">Reset password</CardTitle>
          <CardDescription className="text-center sm:text-left">
            Enter the code sent to your email and set a new password
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-6">
          <View className="gap-6">
            <View className="gap-1.5">
              <View className="flex-row items-center">
                <Label htmlFor="password">Email</Label>
              </View>
              <View className="flex-row gap-1">
                <Input
                  id="email"
                  placeholder="Enter a valid email to send the verification code!"
                  keyboardType="email-address"
                  autoComplete="email"
                  autoCapitalize="none"
                  value={form.email}
                  onChangeText={(text) => setForm({ ...form, email: text })}
                />
                <Button className="w-[15%] h-auto rounded-s rounded-e" onPress={onEmailSubmit}>
                  <Text>Send</Text>
                </Button>
              </View>
            </View>
            <View className="gap-1.5">
              <View className="flex-row items-center">
                <Label htmlFor="password">New password</Label>
              </View>
              <Input
                id="password"
                secureTextEntry
                value={form.password}
                onChangeText={(text) => setForm({ ...form, password: text })}
              />
            </View>
            <View className="gap-1.5">
              <Label htmlFor="code">Verification code</Label>
              <Input
                id="code"
                keyboardType="numeric"
                value={form.privateCode}
                onChangeText={(text) => setForm({ ...form, privateCode: text })}
              />
            </View>
            <Button className="w-full" onPress={onResetSubmit}>
              <Text>Reset Password</Text>
            </Button>
          </View>
        </CardContent>
      </Card>
    </View>
  );
}
