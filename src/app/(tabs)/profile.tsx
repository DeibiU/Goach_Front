import { Link } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

import { IUser } from '../interfaces/IUser';

const profile = () => {
  const user = React.useState<IUser>();
  return (
    <View className="flex-1 justify-center bg-black pl-10 pt-20 ">
      <Text className="text-7xl font-bold text-purple-500">This is you</Text>
      <Text className="text-2xl text-white">
        Bah! Go{' '}
        <Link
          href="/../"
          className="text-2xl text-green-400"
          style={{ textDecorationLine: 'underline' }}
        >
          home
        </Link>{' '}
        now! Do you even know who is lmfao?
      </Text>
      <Text className="text-2xl text-white">user.name</Text>
      <Text className="text-2xl text-white">user.progress</Text>
      <Text className="text-2xl text-white">user.trainer</Text>
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
