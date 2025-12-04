import { Link, router } from 'expo-router';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

import Logo from '../assets/logo-short.svg';

import { PHButton } from './components/PHButton';
import { usePostHog } from 'posthog-react-native';

const WelcomePage = () => {
  const ph = usePostHog();

  useEffect(() => {
    console.log('AQUI PASO EL EVENTO SIU');

    ph.capture('test_event_loaded');
  }, []);

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
          New Around?{' '}
          <PHButton
            label="Register"
            phEvent="click_register"
            textClassName="text-2xl text-green-400 underline"
            className="px-0 py-0"
            onPress={() => router.push('/register')}
          />{' '}
          first then! Or just{' '}
          <PHButton
            label="Log In"
            phEvent="click_login"
            textClassName="text-2xl text-green-400 underline"
            className="px-0 py-0"
            onPress={() => router.push('/login')}
          />
        </Text>
      </View>
    </View>
  );
};

export default WelcomePage;
