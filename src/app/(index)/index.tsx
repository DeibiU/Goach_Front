import { Link } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

import Logo from '../../assets/logo-short.svg';

const WelcomePage = () => {
  return (
    <View className="relative flex-1 bg-black">
      <View className="absolute h-[130%] w-[140%] justify-center pl-10 pt-[35rem]">
        <Logo
          height="100%"
          width="100%"
          className="absolute inset-0 animate-pulse fill-gray-700 opacity-10"
        />
      </View>
      <View className="h-[85%] items-start justify-center sm:justify-end">
        <Text className="pb-4 pl-5 text-4xl font-bold text-blue-500 sm:pb-9 sm:text-7xl">
          Welcome to Goach!
        </Text>
        <Text className="pl-7 text-2xl text-white">
          New Around?
          <Link
            href="/register"
            className="text-2xl text-green-400"
            style={{ textDecorationLine: 'underline' }}
          >
            Register
          </Link>
          first then! Or just
          <Link
            href="/login"
            className="text-2xl text-green-400"
            style={{ textDecorationLine: 'underline' }}
          >
            Log In
          </Link>
        </Text>
      </View>
    </View>
  );
};

export default WelcomePage;
