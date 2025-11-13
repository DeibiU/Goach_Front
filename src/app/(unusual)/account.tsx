import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { SignUpForm } from '../components/sign-up-form';
import { Separator } from '../components/ui/separator';

const Account = () => {
  return (
    <ScrollView className="flex-1 bg-black">
      <View className="px-[15%] flex-1 gap-7 sm:flex-1 relative justify-center py-8 sm:py-10 lg:px-[10rem]">
        <Text className="text-7xl font-bold text-blue-500">Account</Text>
        <View className=" sm:flex-row flex-col">
          <View className="gap-4 p-4 sm:w-[50%] w-[100%] rounded-2xl shadow-[rgba(0,100,255,0.5)_-5px_-4px_10px_1px] justify-center">
            <Text className="text-center text-xl sm:text-left font-bold text-white">
              Your personal info
            </Text>
            <Text className="text-center text-lg sm:text-left text-white">
              You may insert all the information you haven't yet added, as well as updating the
              information you currently have.
            </Text>
            <Text className="text-center text-lg sm:text-left text-white">
              You can also save your biometric info here for you and your coach if you have one. 
            </Text>
          </View>
          <View className="sm:w-[50%] w-[100%] pl-[20px]">
            <SignUpForm isLogin={false} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Account;
