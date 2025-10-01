import { Link } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

import { IUser } from '../interfaces/IUser';

const profile = () => {
  const user = React.useState<IUser>();
  return (
    <View className="flex-1 justify-center bg-black pl-10 pt-20 ">
      <Text className="text-7xl font-bold text-blue-500">Settings</Text>
      <Text className="text-2xl text-white">user.name</Text>
      <Text className="text-2xl text-white">user.email</Text>
      <Text className="text-2xl text-white">user.trainer</Text>
      <Text className="text-2xl text-white">user.role</Text>
      <Link
        href="userLink"
        className="text-2xl text-green-400"
        style={{ textDecorationLine: 'underline' }}
      >
        link a trainer
      </Link>{' '}
      <Link
        href="gyms"
        className="text-2xl text-green-400"
        style={{ textDecorationLine: 'underline' }}
      >
        own a gym
      </Link>{' '}
    </View>
  );
};

export default profile;
