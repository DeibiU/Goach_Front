import React from 'react';
import { ScrollView, View } from 'react-native';

import { Marquee } from '@animatereactnative/marquee';
import Logo from '../../assets/logo.svg';
import { SignUpForm } from '../components/sign-up-form';

const Account = () => {
  return (
    <ScrollView className="sm:flex-1 relative items-center justify-center p-4 py-8 sm:py-4 sm:p-6 mt-safe bg-black">
      <View className="absolute justify-center inset-0">
        <Marquee spacing={2} speed={1}>
          <Logo className="opacity-10% fill-gray-900 h-[60vh] w-[160vw]" />
        </Marquee>
      </View>
      <View className="w-full max-w-sm">
        <SignUpForm isLogin={false} />
      </View>
    </ScrollView>
  );
};

export default Account;
