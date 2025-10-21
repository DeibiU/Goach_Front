import { ScrollView, View } from 'react-native';

import { SignUpForm } from '@/src/app/components/sign-up-form';
import { Marquee } from '@animatereactnative/marquee';
import React from 'react';
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
      <View className="absolute justify-center inset-0">
        <Marquee spacing={2} speed={1}>
          <Logo className="opacity-10% fill-gray-700 h-[60vh] w-[150vw]" />
        </Marquee>
      </View>
      <View className="w-full max-w-sm">
        <SignUpForm />
      </View>
    </ScrollView>
  );
}
