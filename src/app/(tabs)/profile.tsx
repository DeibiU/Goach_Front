import { Link, router } from 'expo-router';
import React from 'react';
import { Alert, Text, View } from 'react-native';

import { User } from '../interfaces/types';
import { useAuth } from '../services/auth-service';

const profile = () => {
  const { user, isAuthenticated, logOut } = useAuth();

  return (
    <View className="flex-1 justify-center bg-black pl-10 pt-20 ">
      <Text className="text-7xl font-bold text-purple-500">This is you</Text>
      <Text className="text-2xl text-white">
        Bah! Go{' '}
        <Link
          href="/../"
          className="text-2xl text-green-400"
          style={{ textDecorationLine: 'underline' }}
          onPress={logOut}
        >
          home
        </Link>{' '}
        now! Do you even know who is lmfao?
      </Text>
      <Text className="text-2xl text-white">{user?.name}</Text>
      <Text className="text-2xl text-white">{user?.email}</Text>
      <Text className="text-2xl text-white">{user?.role}</Text>
      <Link
        href="/../settings"
        className="text-2xl text-green-400"
        style={{ textDecorationLine: 'underline' }}
      >
        ☼
      </Link>
    </View>
  );
};

export default profile;
