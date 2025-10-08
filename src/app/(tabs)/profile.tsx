import { Link } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

import { useAuth } from '../services/auth-service';

const profile = () => {
  const { user, isAuthenticated, logOut } = useAuth();

  return (
    <View className="flex-1 bg-black">
      <View className="items-end">
        <View className="flex-row">
          <Link
            href="/../settings"
            className="text-2xl text-green-400 "
            style={{ textDecorationLine: 'underline' }}
          >
            ☼
          </Link>
          <Link
            href="/../"
            className="text-2xl text-green-400"
            style={{ textDecorationLine: 'underline' }}
            onPress={logOut}
          >
            ◙
          </Link>
        </View>
      </View>
      <View className="flex-1 gap-8 pl-10 pt-20 ">
        <Text className="text-7xl font-bold text-purple-500">This is you</Text>
        <Text className="text-2xl text-white">Bah! Go now! Do you even know who is lmfao?</Text>
        <Text className="text-2xl text-white">{user?.name}</Text>
        <Text className="text-2xl text-white">{user?.email}</Text>
        <Text className="text-2xl text-white">{user?.role}</Text>
      </View>
      <Link
        href="/../routine"
        className="text-2xl text-green-400"
        style={{ textDecorationLine: 'underline' }}
      >
        Workout 1
      </Link>
      <Link
        href="/../routine"
        className="text-2xl text-green-400"
        style={{ textDecorationLine: 'underline' }}
      >
        Workout 2
      </Link>
      <Link
        href="/../routine"
        className="text-2xl text-green-400"
        style={{ textDecorationLine: 'underline' }}
      >
        Workout 3
      </Link>
    </View>
  );
};

export default profile;
