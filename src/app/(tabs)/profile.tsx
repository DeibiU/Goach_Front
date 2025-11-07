import { Link } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import TrainerIcon from '../../assets/trainer-icon.svg';
import { useAuth } from '../services/auth-service';
import { useRoutine } from '../services/routine-service';
import Slider from '../components/routine-slider';
import { useEffect, useState } from 'react';
import { Routine } from '../interfaces/types';
import { Button } from '../components/ui/button';

export default function Profile() {
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
          <View className="gap-8 justify-center pl-5">
            <Text className="text-7xl font-bold text-purple-500">{user?.name}Bepis</Text>
            <Text className="text-2xl text-white text-wrap">Bah! Who is lmfao?</Text>
            <Text className="text-2xl text-white">{user?.email}</Text>
            <Text className="text-2xl text-white">{user?.role}</Text>
          </View>
        </View>
        <Button className="w-[40%] min-w-[120px]">
          <Text>Nueva Rutina</Text>
        </Button>
      </View>
      <Slider itemList={userRoutines} />
    </View>
  );
}
