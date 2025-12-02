import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Modal, ScrollView, Text, View } from 'react-native';
import Cog from '../../assets/cog.svg';
import Door from '../../assets/door.svg';
import Home from '../../assets/home.svg';
import List from '../../assets/list.svg';
import Stats from '../../assets/stats.svg';
import TraineeIcon from '../../assets/trainee-icon.svg';
import TrainerIcon from '../../assets/trainer-icon.svg';
import Slider from '../components/routine-carousel';
import { RoutineForm } from '../components/routine-form';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Routine } from '../interfaces/types';
import { useAuth } from '../services/auth-service';
import { useRoutine } from '../services/routine-service';

export default function Profile() {
  const { user, logOut } = useAuth();
  const { getAllRoutines } = useRoutine();
  const [modalVisible, setModalVisible] = useState(false);
  const [userRoutines, setUserRoutines] = useState<Routine[]>([]);

  const loadRoutines = async () => {
    if (!user?.id) return;
    const routines = await getAllRoutines(user.id);
    setUserRoutines(routines);
  };

  useEffect(() => {
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
    <>
      <View className="flex-1 bg-black">
        <View className="w-[100%] justify-end p-[10px] flex-row">
          <View className="w-[10%] max-w-[75px] max-h-[75px]">
            <Link href="/../settings">
              <Cog className="fill-white" fill="#ffffff" />
            </Link>
          </View>
          <View className="w-[10%] max-w-[75px] max-h-[75px]">
            <Link href="/../" onPress={logOut}>
              <Door className="fill-white" fill="#ffffff" />
            </Link>
          </View>
        </View>

        <ScrollView className=" scrollbar-hidden px-[10%] py-[10px]">
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
            <Button
              className="bg-purple-600 width-[10%] py-3 rounded-2xl"
              onPress={() => {
                setModalVisible(true);
              }}
            >
              <Text className="text-white">New Routine</Text>
            </Button>
          )}
          <View className="px-[5%] pt-[32px]">
            <Slider
              itemList={userRoutines}
              onRefresh={async () => {
                const routines = await getAllRoutines(user?.id);
                setUserRoutines(routines);
              }}
            />
          </View>
        </ScrollView>
        <View className="w-[100%] items-end h-auto py-[10px] mb-[10px] flex-row justify-around">
          <View className="w-[7%] max-w-[55px] max-h-[55px]">
            <Link href="/../profile">
              <Home className="fill-blue-500" fill="#3b82f6" />
              <Text className="text-blue-500 text-xs sm:text-md">Profile</Text>
            </Link>
          </View>
          <View className="w-[7%] max-w-[55px] max-h-[55px]">
            <Link href="/../asignations">
              <List className="fill-white" fill="#ffffff" />
              <Text className="text-white text-xs sm:text-md">Asigs.</Text>
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
      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        animationType="fade"
        transparent={true}
      >
        <View className="flex-1 justify-center items-center bg-black/70 px-4">
          <View className="rounded-2xl shadow-[rgba(0,100,255,0.5)_-5px_-4px_10px_1px]">
            <Card className="w-full max-w-[600px] bg-neutral-900 border border-neutral-700">
              <CardHeader>
                <CardTitle className="text-center text-xl sm:text-left text-white">
                  New Routine
                </CardTitle>
                <CardDescription className="text-center sm:text-left text-gray-300">
                  Enter the information necessary to add a new routine
                </CardDescription>
              </CardHeader>

              <CardContent className="gap-[2%] flex-row">
                <RoutineForm
                  isEditing={false}
                  selectedRoutine={null}
                  onClose={async () => {
                    setModalVisible(false);
                    const routines = await getAllRoutines(user?.id);
                    setUserRoutines(routines);
                  }}
                />
              </CardContent>
            </Card>
          </View>
        </View>
      </Modal>
    </>
  );
}
