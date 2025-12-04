import React from 'react';
import { ScrollView, View } from 'react-native';
import { Marquee } from '@animatereactnative/marquee';

import Logo from '../../assets/logo.svg';
import { SignUpForm } from '../components/sign-up-form';

const Account = () => {
  return (
    <ScrollView
      className="mt-safe relative  bg-black p-4 py-8 sm:flex-1 sm:p-6 sm:py-4"
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View className="w-full max-w-sm">
        <SignUpForm isLogin={false} />
      </View>
    </ScrollView>
  );
};

export default Account;
