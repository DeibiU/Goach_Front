import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

import GymIcon from '../../assets/gym-icon.svg';
import { GymForm } from '../components/gym-form';
import { Separator } from '../components/ui/separator';
import { GURelation } from '../interfaces/types';
import { useAuth } from '../services/auth-service';
import { useGym } from '../services/gym-service';

const { user } = useAuth();
const { getAllTrainersByGym, getAllTraineesByGym } = useGym();
const [traineeList, setTraineeList] = useState<GURelation[]>([]);
const [trainerList, setTrainerList] = useState<GURelation[]>([]);
//const [selectedUser, setSelectedUser] = useState<GURelation>();

useEffect(() => {
  //if (!user?.id || user?.role != 'TRAINER') return;

  const loadTrainers = async () => {
    const trainerList = await getAllTrainersByGym("user.id");
    console.log(trainerList);
    setTrainerList(trainerList);
  };

  const loadTrainees = async () => {
    const traineeList = await getAllTraineesByGym("user.id");
    console.log(traineeList);
    setTraineeList(traineeList);
  };

  loadTrainers();
  loadTrainees();
}, []);

useEffect(() => {
  console.log(traineeList);
  console.log(trainerList);
}, []);

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
      <View>
        <FlatList
          data={trainerList}
          renderItem={({ item }) => (
            <View>
              <View className="items-center p-2 hover:bg-blue-500">
                <Text
                  className="color-white text-xl"
                  onPress={() => {
                    //setSelectedUser(item);
                    //setModalVisible(true);
                  }}
                >
                  {item.trainer?.name}
                </Text>
              </View>
              <View className="flex-row items-center">
                <Separator className="flex-1" />
              </View>
            </View>
          )}
        />
        <FlatList
          data={traineeList}
          renderItem={({ item }) => (
            <View>
              <View className="items-center p-2 hover:bg-blue-500">
                <Text
                  className="color-white text-xl"
                  onPress={() => {
                    //setSelectedUser(item);
                    //setModalVisible(true);
                  }}
                >
                  {item.trainee?.name}
                </Text>
              </View>
              <View className="flex-row items-center">
                <Separator className="flex-1" />
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default gyms;
