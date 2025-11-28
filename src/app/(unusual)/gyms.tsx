import { Button } from '@/src/app/components/ui/button';
import React, { useEffect, useState } from 'react';
import { FlatList, Modal, Pressable, ScrollView, Text, View } from 'react-native';
import GymIcon from '../../assets/gym-icon.svg';
import { GymForm } from '../components/gym-form';
import { GymTraineeForm } from '../components/gym-trainee-form';
import { GymTrainerForm } from '../components/gym-trainer-form';
import { Separator } from '../components/ui/separator';
import { GTRelation, GURelation, Gym, User } from '../interfaces/types';
import { useAuth } from '../services/auth-service';
import { useGym } from '../services/gym-service';
import { TraineeInfo } from '../components/trainee-info';

const Gyms = () => {
  const { user } = useAuth();
  const { getAllGymsByOwner, getAllTrainersByGym, getAllTraineesByGym } = useGym();

  const [ownerGyms, setOwnerGym] = useState<Gym>();
  const [associatesList, setAssociatesList] = useState<User[]>([]);

  const [trainerModalVisible, setTrainerModalVisible] = useState(false);
  const [traineeModalVisible, setTraineeModalVisible] = useState(false);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (!user?.id) return;

    const loadGym = async () => {
      const gym: Gym = await getAllGymsByOwner(user.id);
      if (gym.owner != null) {
        setOwnerGym(gym);
        if (gym.listAssociates) setAssociatesList(gym.listAssociates);
      }
    };

    loadGym();
  }, [user]);

  return (
    <ScrollView className="flex-1 justify-center px-[20%] bg-black gap-7">
      <View className="flex-row gap-4">
        <View className="min-w-[100px] max-h-[100px]">
          <GymIcon height="100%" width="100%" className="stroke-blue-500 stroke-[45]" />
        </View>
        <Text className="pt-3 sm:text-7xl text-4xl font-bold text-blue-500">Your Gym</Text>
      </View>

      {!ownerGyms && (
        <View className="2xl:mx-[15rem]">
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

      <FlatList
        data={associatesList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <View className="items-center p-2">
              <Text
                className="color-white text-xl"
                onPress={() => {
                  setSelectedUser(item);
                  setModalVisible(true);
                }}
              >
                {item.name}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Separator className="flex-1" />
            </View>
          </View>
        )}
      />
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <TraineeInfo
          user={selectedUser!}
          gymId={ownerGyms?.id}
          onDeleted={() => {
            setModalVisible(false);
            setSelectedUser(null);
          }}
        />
      </Modal>
    </ScrollView>
  );
};

export default Gyms;
