import { Link } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

const wellcomePage = () => {
  return (
    <View className="flex-1 justify-center bg-black pl-10 pt-20 ">
      <Text className="text-7xl font-bold text-blue-500">Welcome to Goach!</Text>
      <Text className="text-2xl text-white">
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
      <svg height="200" width="300"></svg>
    </View>
  );
};

export default wellcomePage;
