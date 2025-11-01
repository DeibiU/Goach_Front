import React, { useEffect, useState } from 'react';
import { FlatList, Modal, Text, View } from 'react-native';

import { Separator } from '../components/ui/separator';
import { TTRelation, User } from '../interfaces/types';
import { TraineeInfo } from '../components/trainee-info';
import { useAuth } from '../services/auth-service';
import { useUser } from '../services/user-service';

const assignations = () => {
  const { user } = useAuth();
  const { getAllUsersByTrainer } = useUser();
  const [traineeList, setTraineeList] = useState<TTRelation[]>([]);
  const [selectedUser, setSelectedUser] = useState<TTRelation>();
  const [modalVisible, setModalVisible] = useState(false);


  useEffect(() =>{
    if(!user?.id || user?.role != 'TRAINER') return;

    const loadTrainees = async () => {
      const routines = await getAllUsersByTrainer(user.id);
      console.log(routines);
      setTraineeList(routines);
    };

    loadTrainees();
  }, []);

  useEffect(() =>{
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
              <Text className="color-white text-xl" onPress={() => {setSelectedUser(item); setModalVisible(true)}}>{item.trainee?.name}</Text>
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
        animationType='fade'
        transparent={true}
      >
        <TraineeInfo ttRelation={selectedUser}></TraineeInfo>
      </Modal>
    </View>
  );
};

export default assignations;
