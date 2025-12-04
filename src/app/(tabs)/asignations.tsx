import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Modal, Text, View } from 'react-native';
import Home from '../../assets/home.svg';
import List from '../../assets/list.svg';
import Stats from '../../assets/stats.svg';
import TrainerIcon from '../../assets/trainer-icon.svg';
import { TraineeInfo } from '../components/trainee-info';
import { Separator } from '../components/ui/separator';
import { TTRelation } from '../interfaces/types';
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
        try {
          const userList = await getAllUsersByTrainer(user.id);
          setTraineeList(userList);
        } catch (err: any) {
          if (err?.response?.status === 404) {
            setTraineeList([]);
          } else {
            console.error(err);
          }
        }
      };

      loadTrainees();
    } else {
      const loadTrainer = async () => {
        try {
          const ttRelation = await getAllTrainersByTrainee(user.id);
          setRelatedTrainer(ttRelation);
        } catch (err: any) {
          if (err?.response?.status === 404) {
            setRelatedTrainer(undefined);
          } else {
            console.error(err);
          }
        }
      };

      loadTrainer();
    }
  }, []);

  return (
    <View className="flex-1 bg-black">
      <View className="flex-1 justify-center bg-black px-10 pt-20 ">
        {userRole === 'TRAINER' && (
          <Text className="text-7xl font-bold text-blue-500 pb-6">Your Users</Text>
        )}
        {userRole === 'TRAINEE' && (
          <Text className="text-7xl font-bold text-blue-500 pb-6">Your Trainer</Text>
        )}

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
                  <Separator className="flex-1" />
                </View>
              )}
            />
            <Modal
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
              animationType="fade"
              transparent={true}
            >
              {selectedUser && (
                <TraineeInfo
                  ttRelation={selectedUser}
                  onDeleted={async () => {
                    try {
                      const updatedList = await getAllUsersByTrainer(user!.id);
                      setTraineeList(updatedList);
                    } catch (err: any) {
                      if (err?.response?.status === 404) {
                        setTraineeList([]);
                      } else {
                        console.error(err);
                      }
                    }
                    setModalVisible(false);
                    setSelectedUser(undefined);
                  }}
                />
              )}
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
                <Text className="text-7xl font-bold text-purple-500">
                  {relatedTrainer?.trainer?.name}
                </Text>
                <Text className="text-2xl text-white">{relatedTrainer?.trainer?.email}</Text>
              </View>
            </View>
          </View>
        )}
      </View>
      <View className="w-[100%] items-end h-auto py-[10px] mb-[10px] flex-row justify-around">
        <View className="w-[7%] max-w-[55px] max-h-[55px]">
          <Link href="/../profile">
            <Home className="fill-white" fill="#ffffff" />
            <Text className="text-white text-xs sm:text-md">Profile</Text>
          </Link>
        </View>
        <View className="w-[7%] max-w-[55px] max-h-[55px]">
          <Link href="/../asignations">
            <List className="fill-blue-500" fill="#3b82f6" />
            <Text className="text-blue-500 text-xs sm:text-md">Asigs.</Text>
          </Link>
        </View>
        <View className="w-[7%] max-w-[55px] max-h-[55px]">
          <Link href="/../stats">
            <Stats className="fill-white" fill="#ffffff" />
            <Text className="text-white text-xs sm:text-md">Stats</Text>
          </Link>
        </View>
      </View>
    </View>
  );
};

export default assignations;
