import React from 'react';
import { Stack } from 'expo-router';
import { AuthPage } from '../guards/AuthPage';

export default function AuthLayout() {
  return (
    <AuthPage>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthPage>
  );
}
