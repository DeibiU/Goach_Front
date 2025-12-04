import { ScrollView, View } from 'react-native';

import { SignUpForm } from '@/src/app/components/sign-up-form';
import { Marquee } from '@animatereactnative/marquee';
import React from 'react';
import Logo from '../../assets/logo.svg';
import { AuthPage } from '../guards/AuthPage';
import { isWeb } from '../utils/platform-flags';

/**
 *
 */
export default function SignUpScreen() {
  return (
    <AuthPage>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        className="sm:flex-1 relative p-4 py-8 sm:py-4 sm:p-6 mt-safe bg-black"
        contentContainerStyle={{
          flexGrow: 1, 
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isWeb && (<View className="absolute inset-0 justify-center">
          <Marquee spacing={2} speed={1}>
            <Logo className="h-[60vh] w-[160vw]" fill="#4b5563" opacity={0.2} />
          </Marquee>
        </View>)}

        <View className="w-full max-w-sm">
          <SignUpForm isLogin={true} />
        </View>
      </ScrollView>
    </AuthPage>
  );
}
