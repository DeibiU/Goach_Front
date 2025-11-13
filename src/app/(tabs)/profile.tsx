import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import Cog from '../../assets/cog.svg';
import Door from '../../assets/door.svg';
import TraineeIcon from '../../assets/trainee-icon.svg';
import TrainerIcon from '../../assets/trainer-icon.svg';
import Slider from '../components/routine-slider';
import { Button } from '../components/ui/button';
import { Routine } from '../interfaces/types';
import { useAuth } from '../services/auth-service';
import { useRoutine } from '../services/routine-service';

const profile = () => {
  const { user, logOut } = useAuth();
  const { getAllRoutines } = useRoutine();
  const [modalVisible, setModalVisible] = useState(false);
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
      <View className="w-[100%] justify-end p-[5px] flex-row">
        <View className="w-[10%] max-w-[75px] max-h-[75px]">
          <Link href="/../settings">
            <Cog className="fill-white" />
          </Link>
        </View>
        <View className="w-[10%] max-w-[75px] max-h-[75px]">
          <Link href="/../" onPress={logOut}>
            <Door className="fill-white" />
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
            <Text className="text-4xl sm:text-7xl font-bold text-purple-500 text-wrap">
              {user?.name}
            </Text>
            <Text className="text-2xl text-white">{user?.email}</Text>
            <Text className="text-2xl text-white">{user?.role}</Text>
          </View>
        </View>
        {isTrainer() && (
          <Button className="bg-purple-600 width-[10%] py-3 rounded-2xl">
            <Text className="text-white">New Routine</Text>
          </Button>
        )}
        <View className="px-[5%] pt-[32px]">
          <Slider itemList={userRoutines} />
        </View>
      </ScrollView>
    </View>
  );
};
export default profile;
