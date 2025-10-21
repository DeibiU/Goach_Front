import React from 'react';
import { Text, View } from 'react-native';

import GymIcon from '../../assets/gym-icon.svg';
import { GymForm } from '../components/gym-form';

const gyms = () => {
  return (
    <View className="flex-1 justify-center px-[20rem] bg-black gap-7">
      <View className="flex-row gap-4">
        <View className="min-w-[100px] max-h-[100px]">
          <GymIcon height="100%" width="100%" className="stroke-blue-500 stroke-[45]" />
        </View>
        <Text className="pt-3 text-7xl font-bold text-blue-500">Your Gym</Text>
      </View>
	  <View className="2xl:mx-[15rem]">
      <GymForm />
	  </View>
    </View>
  );
};

export default gyms;
