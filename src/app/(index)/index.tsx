import { Link } from 'expo-router';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { isAndroid, isWeb } from '../utils/platform-flags';

import Logo from '../../assets/logo-short.svg';
const GrayLogo = require('../../assets/logo-gray-short.png');

const WelcomePage = () => {
  return (
  
    <View className="flex-1 relative bg-black">
      <View className="justify-center absolute pl-10 pt-[35rem] h-[130%] w-[140%]">
        {isWeb && (<Logo
          height="100%"
          width="100%"
          className="opacity-10 inset-0 absolute fill-gray-700 animate-pulse"
        />)}
        {isAndroid &&(<Image source={ GrayLogo } height={10} width={10} className="opacity-10 inset-0 absolute animate-pulse" />)}
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
