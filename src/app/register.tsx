import { ScrollView, View } from 'react-native';

import { SignUpForm } from '@/src/app/components/sign-up-form';
import Logo from '../assets/logo.svg';

/**
 *
 */
export default function SignUpScreen() {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      className="sm:flex-1 relative items-center justify-center p-4 py-8 sm:py-4 sm:p-6 mt-safe bg-black"
      keyboardDismissMode="interactive"
    >
      <Logo
        height="20%"
        width="100%"
        className="opacity-10% absolute inset-0 -rotate-45 fill-gray-400"
      />

      <View className="w-full max-w-sm">
        <SignUpForm />
      </View>
    </ScrollView>
  );
}
