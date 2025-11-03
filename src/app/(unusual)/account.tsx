import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { BiometricsForm } from '../components/biometrics-form';
import { SignUpForm } from '../components/sign-up-form';
import { Separator } from '../components/ui/separator';

const account = () => {
  return (
    <ScrollView>
      <View className="flex-1 gap-10 bg-black sm:flex-1 relative justify-center px-8 py-8 sm:py-10 lg:px-[15rem]">
        <Text className="text-7xl font-bold text-blue-500">Personal Info</Text>
        <View className="2xl:mx-[15rem]">
          <SignUpForm />
        </View>
        <View className="flex-row items-center py-3 px-10">
            <Separator/>
        </View>
        <Text className="text-7xl font-bold text-blue-500">Biometrics</Text>
        <View className="2xl:mx-[15rem]">
          <BiometricsForm />
        </View>
      </View>
    </ScrollView>
  );
};

export default account;
