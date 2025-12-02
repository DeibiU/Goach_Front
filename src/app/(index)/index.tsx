import { Link } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

import Logo from '../../assets/logo-short.svg';

const WelcomePage = () => {
  return (
  
    <View className="flex-1 relative bg-black">
      <View className="justify-center absolute pl-10 pt-[35rem] h-[130%] w-[140%]">
        <Logo
          height="100%"
          width="100%"
          className="opacity-10 inset-0 absolute fill-gray-700 animate-pulse"
        />
      </View>
      <View className="items-start h-[85%] sm:justify-end justify-center">
        <Text className="sm:text-7xl text-4xl pl-5 sm:pb-9 pb-4 font-bold text-blue-500">
          Welcome to Goach!
        </Text>
        <Text className="text-2xl pl-7 text-white">
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
