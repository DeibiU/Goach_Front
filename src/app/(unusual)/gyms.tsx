import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, Modal, Pressable } from 'react-native';
import { Button } from '@/src/app/components/ui/button';
import GymIcon from '../../assets/gym-icon.svg';
import { GymForm } from '../components/gym-form';
import { useAuth } from '../services/auth-service';
import { useGym } from '../services/gym-service';
import { Gym } from '../interfaces/types';
import { GymTrainerForm } from '../components/gym-trainer-form';
import { GymTraineeForm } from '../components/gym-trainee-form';
import { isWeb } from '../utils/platform-flags';

const Gyms = () => {
  const { user } = useAuth();
  const { getAllGymsByOwner } = useGym();
  const [ownerGyms, setOwnerGym] = useState<Gym>();

  const [trainerModalVisible, setTrainerModalVisible] = useState(false);
  const [traineeModalVisible, setTraineeModalVisible] = useState(false);

  useEffect(() => {
    if (!user?.id) return;

    const loadGym = async () => {
      const gym: Gym = await getAllGymsByOwner(user.id);
      if (gym.owner != null) setOwnerGym(gym);
    };

    loadGym();
  }, [user]);

  return (
    <ScrollView
      className={isWeb ? "flex-1 px-[20%] bg-black" : "flex-1 px-[10%] bg-black"}
      contentContainerStyle={{ flexGrow: 1,  justifyContent: 'center', gap: 28 }} 
    >
      <View className="flex-row gap-4">
        <View className={isWeb ? "min-w-[100px] max-h-[100px]" : "ml-5 min-w-[100px] max-h-[100px]"}>
          <GymIcon height="100%" width="100%" stroke="#3b82f6" strokeWidth={isWeb ? 50: 40}/>
        </View>
        <Text className="pt-3 sm:text-7xl text-4xl font-bold text-blue-500">Your Gym</Text>
      </View>

      {!ownerGyms && (
        <View className="2xl:mx-[8%]">
          <GymForm selectedGym={ownerGyms} userInSession={user || undefined} />
        </View>
      )}

      {ownerGyms && (
        <View className="sm:gap-8 gap-2 justify-center pl-5">
          <Text className="sm:text-7xl text-2xl font-bold text-purple-500">{ownerGyms?.name}</Text>
          <Text className="sm:text-2xl text-white">{ownerGyms.owner?.name}</Text>
          <Text className="sm:text-2xl text-white">{ownerGyms?.totalPopulation}</Text>

          <View className="flex-row gap-6 flex-wrap justify-center items-start">
            <Button
              className="bg-blue-600 px-6 py-3 rounded-2xl"
              onPress={() => setTrainerModalVisible(true)}
            >
              <Text className="text-white font-bold sm:text-lg">Add Trainer</Text>
            </Button>
            <Button
              className="bg-purple-600 px-6 py-3 rounded-2xl"
              onPress={() => setTraineeModalVisible(true)}
            >
              <Text className="text-white font-bold sm:text-lg">Add Trainee</Text>
            </Button>
          </View>
        </View>
      )}
      <Modal
        visible={trainerModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setTrainerModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/60">
          <View className="bg-white dark:bg-neutral-900 rounded-2xl p-6 w-[90%] sm:w-[70%] max-w-2xl">
            <Text className="text-2xl font-bold text-center mb-4 text-blue-500">Add Trainer</Text>
            <GymTrainerForm selectedGym={ownerGyms} />
            <Pressable
              onPress={() => setTrainerModalVisible(false)}
              className="mt-4 bg-gray-300 dark:bg-gray-700 rounded-xl py-3"
            >
              <Text className="text-center text-black dark:text-white font-medium">Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal
        visible={traineeModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setTraineeModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/60">
          <View className="bg-white dark:bg-neutral-900 rounded-2xl p-6 w-[90%] sm:w-[70%] max-w-2xl">
            <Text className="text-2xl font-bold text-center mb-4 text-purple-500">Add Trainee</Text>
            <GymTraineeForm selectedGym={ownerGyms} />
            <Pressable
              onPress={() => setTraineeModalVisible(false)}
              className="mt-4 bg-gray-300 dark:bg-gray-700 rounded-xl py-3"
            >
              <Text className="text-center text-black dark:text-white font-medium">Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Gyms;
