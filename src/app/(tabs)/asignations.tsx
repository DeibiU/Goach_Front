import React, { useEffect, useState } from 'react';
import { FlatList, Modal, Text, View } from 'react-native';

import { TraineeInfo } from '../components/trainee-info';
import { Separator } from '../components/ui/separator';
import { TTRelation } from '../interfaces/types';
import { useAuth } from '../services/auth-service';
import { useUser } from '../services/user-service';

const assignations = () => {
  const { user } = useAuth();
  const { getAllUsersByTrainer, getAllTrainersByTrainee } = useUser();
  const [traineeList, setTraineeList] = useState<TTRelation[]>([]);
  const [selectedUser, setSelectedUser] = useState<TTRelation>();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (!user?.id || user?.role != 'TRAINER') return;

    if (user?.role == 'TRAINER') {
      const loadTrainees = async () => {
        const userList = await getAllUsersByTrainer(user.id);
        console.log(userList);
        setTraineeList(userList);
      };
      loadTrainees();
    } else {
      const loadTrainer = async () => {
        const trainer = await getAllTrainersByTrainee(user.id);
        setTraineeList(trainer);
      };

      loadTrainer();
    }
  }, []);

  useEffect(() => {
    console.log(traineeList);
  }, []);

  return (
    <View className="flex-1 justify-center bg-black px-10 pt-20 ">
      <Text className="text-7xl font-bold text-blue-500 pb-6">Your Users</Text>
      <View className="flex-row items-center">
        <Separator className="flex-1" />
      </View>

      <FlatList
        data={traineeList}
        renderItem={({ item }) => (
          <View>
            <View className="items-center p-2 hover:bg-blue-500">
              <Text
                className="color-white text-xl"
                onPress={() => {
                  setSelectedUser(item);
                  setModalVisible(true);
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
      <Modal
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
        animationType="fade"
        transparent={true}
      >
        <TraineeInfo ttRelation={selectedUser}></TraineeInfo>
      </Modal>
    </View>
  );
};

export default assignations;
