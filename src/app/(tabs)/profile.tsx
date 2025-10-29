import { Link, router } from 'expo-router';
import React from 'react';
import { Alert, Text, View } from 'react-native';
import { useAuth } from '../services/auth-service';
import { useRoutine } from '../services/routine-service';
import Slider from '../components/routine-slider';
import { useEffect, useState } from 'react';
import { Routine } from '../interfaces/types';

const profile = () => {
  const { user, logOut } = useAuth();
  const { getAllRoutines } = useRoutine();
  const [userRoutines, setUserRoutines] = useState<Routine[]>([]);

  useEffect(() => {
    if (!user?.id) return;

    const loadRoutines = async () => {
      const routines = await getAllRoutines(user.id);
      setUserRoutines(routines);
    };

    loadRoutines();
  }, [user]);

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
      <View className="items-center justify-center flex-1">
        <Slider itemList={userRoutines} />
      </View>
    </View>
  );
};

export default profile;
