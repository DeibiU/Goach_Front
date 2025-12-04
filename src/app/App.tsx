import { PostHogProvider } from 'posthog-react-native';
import { posthog } from '../app/posthog/posthog';
import { ExpoRoot, Slot } from 'expo-router';
import React from 'react';

export default function App() {
  return (
    <PostHogProvider client={posthog}>
      <Slot />
    </PostHogProvider>
  );
}
