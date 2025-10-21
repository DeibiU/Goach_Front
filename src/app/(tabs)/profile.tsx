import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

import TrainerIcon from '../../assets/trainer-icon.svg';
import { useAuth } from '../services/auth-service';
import { RoutineCarousel } from '../components/routine-carousel';

const profile = () => {
  const { user, isAuthenticated, logOut } = useAuth();
  const [role, setRole] = useState(' ');

  function roleIdentifier() {
    if (user?.role) [];
    return 'nig';
  }

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

      {/* info */}
      <View className="items-center">
        <View className="flex-row p-20 ">
          <View className="w-[40%] min-w-[120px] max-h-[300px]">
            <TrainerIcon height="100%" width="100%" className="stroke-blue-500 stroke-[30]" />
          </View>
          <View className="gap-8 justify-center pl-5" >
            <Text className="text-7xl font-bold text-purple-500">{user?.name}Bepis</Text>
            <Text className="text-2xl text-white text-wrap">Bah! Who is lmfao?</Text>
            <Text className="text-2xl text-white">{user?.email}</Text>
            <Text className="text-2xl text-white">{user?.role}</Text>
          </View>
        </View>

        {/* <Link
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
        </Link> */}
        <RoutineCarousel/>
      </View>
    </View>
  );
};

export default profile;
