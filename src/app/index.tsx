import { Link } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

import Logo from '../assets/logo-short.svg';

const wellcomePage = () => {
  return (
    <View className="flex-1 justify-center bg-black pl-10 pt-[35rem] ">
      <Logo
        height="130%"
        width="140%"
        className="opacity-10% absolute inset-0 fill-gray-700 animate-pulse"
      />
      <Text className="text-7xl pl-5 pb-9 font-bold text-blue-500">Welcome to Goach!</Text>
      <Text className="text-2xl pl-7 text-white">
        New Around?{' '}
        <Link
          href="/register"
          className="text-2xl text-green-400"
          style={{ textDecorationLine: 'underline' }}
        >
          Register
        </Link>{' '}
        first then! Or just{' '}
        <Link
          href="/login"
          className="text-2xl text-green-400"
          style={{ textDecorationLine: 'underline' }}
        >
          Log In
        </Link>
      </Text>
    </View>
  );
};

export default wellcomePage;
