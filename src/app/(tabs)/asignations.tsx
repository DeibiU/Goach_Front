import React, { useEffect, useState } from 'react';
import { FlatList, Modal, Text, View } from 'react-native';
import TrainerIcon from '../../assets/trainer-icon.svg';
import { Separator } from '../components/ui/separator';
import { TTRelation, User } from '../interfaces/types';
import { TraineeInfo } from '../components/trainee-info';
import { useAuth } from '../services/auth-service';
import { useUser } from '../services/user-service';

const assignations = () => {
  const { user, userRole } = useAuth();
  const { getAllUsersByTrainer, getAllTrainersByTrainee } = useUser();
  const [traineeList, setTraineeList] = useState<TTRelation[]>([]);
  const [relatedTrainer, setRelatedTrainer] = useState<TTRelation>();
  const [selectedUser, setSelectedUser] = useState<TTRelation>();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (!user?.id) return;

    if (userRole == 'TRAINER') {
      const loadTrainees = async () => {
        const routines = await getAllUsersByTrainer(user.id);
        console.log(routines);
        setTraineeList(routines);
      };

      loadTrainees();
    } else {
      const loadTrainer = async () => {
        const ttRelation = await getAllTrainersByTrainee(user.id);
        setRelatedTrainer(ttRelation);
      };

      loadTrainer();
    }
  }, []);

  return (
    <View className="flex-1 justify-center bg-black px-10 pt-20 ">
      {userRole === 'TRAINER' && (
        <Text className="text-7xl font-bold text-blue-500 pb-6">Your Users</Text>
      )}
      {userRole === 'TRAINEE' && <Text className="text-7xl font-bold text-blue-500 pb-6">Your Trainer</Text>}

      {userRole === 'TRAINER' && (
        <>
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
        </>
      )}

      {userRole === 'TRAINEE' && (
        <View className="items-center">
          <View className="flex-row p-20 ">
            <View className="w-[40%] min-w-[120px] max-h-[300px]">
              <TrainerIcon height="100%" width="100%" className="stroke-blue-500 stroke-[30]" />
            </View>
            <View className="gap-8 justify-center pl-5">
              <Text className="text-7xl font-bold text-purple-500">{relatedTrainer?.trainer?.name}</Text>
              <Text className="text-2xl text-white">{relatedTrainer?.trainer?.email}</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default assignations;
