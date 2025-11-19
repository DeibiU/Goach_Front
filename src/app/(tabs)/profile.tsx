import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import Cog from '../../assets/cog.svg';
import Door from '../../assets/door.svg';
import TraineeIcon from '../../assets/trainee-icon.svg';
import TrainerIcon from '../../assets/trainer-icon.svg';
import Slider from '../components/routine-slider';
import { Button } from '../components/ui/button';
import { Routine, TTRelation } from '../interfaces/types';
import { useAuth } from '../services/auth-service';
import { useRoutine } from '../services/routine-service';
import { useUser } from '../services/user-service';
import { LinkRequestModal } from '../components/link-request';

const profile = () => {
  const { user, logOut } = useAuth();
  const { getAllRoutines } = useRoutine();
  const { incomingRequest, connectSocket } = useUser();

  const [userRoutines, setUserRoutines] = useState<Routine[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [relationData, setRelationData] = useState<TTRelation | null>(null);

  useEffect(() => {
    if (!user?.id) return;

    const load = async () => {
      const routines = await getAllRoutines(user.id);
      setUserRoutines(routines);
    };

    load();
  }, [user]);

  function isTrainer() {
    return user?.role === 'TRAINER';
  }
  useEffect(() => {
    if (!user?.id) return;
    connectSocket(user.id);
  }, [user?.id]);

  // 🔥 Cuando llega un link_request -> abrir modal
  useEffect(() => {
    if (!incomingRequest) return;
    if (!user) return;
    if (user.role !== 'TRAINEE') return;

    // Build TTRelation
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

    setModalVisible(true);
  }, [incomingRequest]);

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
      {relationData && (
        <View className="absolute inset-0 flex items-center justify-center px-4 py-6">
          <LinkRequestModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            relation={relationData}
          />
        </View>
      )}
    </View>
  );
};
export default profile;
