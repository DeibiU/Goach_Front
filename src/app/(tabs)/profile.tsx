import { Link, Redirect } from 'expo-router';
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
import { RoleType, Routine, TTRelation } from '../interfaces/types';
import { useAuth } from '../services/auth-service';
import { useRoutine } from '../services/routine-service';
import { isWeb } from '../utils/platform-flags';
import { useUser } from '../services/user-service';
import { LinkRequestModal } from '../components/link-request';

/**
 *
 */
export default function Profile() {
  const { user, logOut } = useAuth();
  const { getAllRoutines } = useRoutine();
  const { getAllTrainersByTrainee } = useUser();

  const [modalVisible, setModalVisible] = useState(false);
  const [requestVisible, setRequestVisible] = useState(false);
  const { incomingRequest, connectSocket } = useUser();

  const [userRoutines, setUserRoutines] = useState<Routine[]>([]);
  const [relationData, setRelationData] = useState<TTRelation | null>(null);

  const loadRoutines = async () => {
    if (!user?.id) return;

    let routines: Routine[] = [];

    if (user.role === RoleType.trainee) {
      const trainerRelation = await getAllTrainersByTrainee(user.id);

      if (!trainerRelation?.trainer?.id) {
        console.log('User has no trainer assigned');
        setUserRoutines([]);
        return;
      }

      routines = await getAllRoutines(trainerRelation.trainer.id);
    } else {
      routines = await getAllRoutines(user.id);
    }

    setUserRoutines(routines);
  };

  useEffect(() => {
    loadRoutines();
  }, [user]);
  useEffect(() => {
    console.log('Hola 1');
    if (!user?.id) return;
    connectSocket(user.id);
  }, [user?.id]);

  console.log(incomingRequest);

  useEffect(() => {
    if (!incomingRequest) return;
    if (!user) return;
    if (user.role !== 'TRAINEE') return;
 
    setRelationData({
      trainer: {
        id: incomingRequest.senderId,
        name: incomingRequest.senderName,
      },
      trainee: {
        id: user.id,
        name: user.name,
      },
      traineeStatus: 'INACTIVE',
      paymentDate: new Date(),
      paymentStatus: 'UNPAID',
      paymentPrice: 0,
    });

    console.log(relationData);

    setRequestVisible(true);
  }, [incomingRequest]);

  const isTrainer = () => user?.role === 'TRAINER';

  return (
    <>
      <View className="flex-1 bg-black">
        <View className={isWeb ? "w-full flex-row justify-end p-[10px]" : "w-full flex-row justify-end p-[10px] gap-3 pt-[30px]"}>
          <View className="max-h-[75px] w-[10%] max-w-[75px]">
            <Link href="/../settings">
              <Cog className="fill-white" fill="#ffffff" />
            </Link>
          </View>
          <View className="max-h-[75px] w-[10%] max-w-[75px]">
            <Link href="/(index)/login" onPress={logOut}>
              <Door className="fill-white" fill="#ffffff" />
            </Link>
          </View>
        </View>

        <ScrollView className="scrollbar-hidden px-[10%] py-[10px]">
          <View className="items-center px-[5%] pb-[50px] lg:flex-row">
            <View className={isWeb ? "max-h-[300px] w-2/5 min-w-[120px]" : "max-h-[150px] w-2/5 min-w-[120px]"}>
              {isTrainer() ? (
                <TrainerIcon height="100%" width="100%" stroke="#3b82f6" strokeWidth={isWeb ? 50: 30} />
              ) : (
                <TraineeIcon height="100%" width="100%" stroke="#3b82f6" strokeWidth={isWeb ? 50: 30} />
              )}
            </View>

            <View className="justify-center gap-8 pl-5">
              <Text className="text-wrap text-4xl font-bold text-purple-500 sm:text-7xl">
                {user?.name}
              </Text>
              <Text className="text-2xl text-white">{user?.email}</Text>
              <Text className="text-2xl text-white">{user?.role}</Text>
            </View>
          </View>

          {isTrainer() && (
            <Button
              className="width-[10%] rounded-2xl bg-purple-600 py-3"
              onPress={() => setModalVisible(true)}
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
        {relationData && (
          <View className="absolute inset-0 flex items-center justify-center px-4 py-6">
            <LinkRequestModal
              visible={requestVisible}
              onClose={() => setRequestVisible(false)}
              relation={relationData}
            />
          </View>
        )}
        <View className="mb-[10px] h-auto w-full flex-row items-end justify-around py-[10px]">
          <View className="max-h-[55px] w-[7%] max-w-[55px]">
            <Link href="/../profile">
              <Home className="fill-blue-500" fill="#3b82f6" />
              <Text className="sm:text-md text-xs text-blue-500">Profile</Text>
            </Link>
          </View>
          <View className="max-h-[55px] w-[7%] max-w-[55px]">
            <Link href="/../asignations">
              <List className="fill-white" fill="#ffffff" />
              <Text className="sm:text-md text-xs text-white">Asigs.</Text>
            </Link>
          </View>
          <View className="max-h-[55px] w-[7%] max-w-[55px]">
            <Link href="/../stats">
              <Stats className="fill-white" fill="#ffffff" />
              <Text className="sm:text-md text-xs text-white">Stats</Text>
            </Link>
          </View>
        </View>
      </View>

      {/* MODAL */}
      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        animationType="fade"
        transparent={true}
      >
        <View className="flex-1 justify-center items-center bg-black/70 px-4">
          <View className={isWeb ? "rounded-2xl shadow-[rgba(0,100,255,0.5)_-5px_-4px_10px_1px]" : "rounded-2xl"}>
            <Card className="w-full max-w-[600px] bg-neutral-900 border border-neutral-700">
              <CardHeader>
                <CardTitle className="text-center text-xl text-white sm:text-left">
                  New Routine
                </CardTitle>
                <CardDescription className="text-center text-gray-300 sm:text-left">
                  Enter the information necessary to add a new routine
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-row gap-[2%]">
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
