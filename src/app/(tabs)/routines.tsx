import React from 'react';
import { Text, View } from 'react-native';

import { User } from '../interfaces/types';

const profile = () => {
  const user = React.useState<User>();
  return (
    <View className="flex-1 justify-center bg-black pl-10 pt-20 ">
      <Text className="text-7xl font-bold text-blue-500">Who does what? </Text>
    </View>
  );
};

export default profile;
