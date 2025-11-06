import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import TraineeIcon from '../../assets/trainee-icon.svg';
import TrainerIcon from '../../assets/trainer-icon.svg';
import Slider from '../components/routine-slider';
import { Routine } from '../interfaces/types';
import { useAuth } from '../services/auth-service';
import { useRoutine } from '../services/routine-service';

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

  function isTrainer() {
    if (user?.role == 'TRAINER') {
      return true;
    } else {
      return false;
    }
  }

  return (
    <View className="flex-1 bg-black">
      <View className="items-end">
        <View className="flex-row p-[5px]">
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
      <ScrollView className="scrollbar-hidden px-[10%] py-[10px]">
        <View className="items-center  lg:flex-row px-[5%] pb-[50px]">
          <View className="w-[40%] min-w-[120px] max-h-[300px]">
            {isTrainer() && (
              <TrainerIcon height="100%" width="100%" className="stroke-blue-500 stroke-[30]" />
            )}
            {!isTrainer() && (
              <TraineeIcon height="100%" width="100%" className="stroke-blue-500 stroke-[30]" />
            )}
          </View>
          <View className="gap-8 justify-center pl-5">
            <Text className="text-4xl sm:text-7xl font-bold text-purple-500 text-wrap">{user?.name}</Text>
            <Text className="text-2xl text-white">{user?.email}</Text>
            <Text className="text-2xl text-white">{user?.role}</Text>
          </View>
        </View>
        <View className="px-[5%]">
          <Slider itemList={userRoutines} />
        </View>
      </ScrollView>
    </View>
  );
};
export default profile;
