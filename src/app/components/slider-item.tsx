import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Pencil from '../../assets/pencil.svg';
import Bin from '../../assets/bin.svg';
import { Routine } from '../interfaces/types';
import { useRoutine } from '../services/routine-service';
import { Toast } from 'toastify-react-native';
import { useAuth } from '../services/auth-service';

type Props = {
  item: Routine;
  onDeleted?: () => Promise<void>;
};

const SliderItem = ({ item, onDeleted }: Props) => {
  const { deleteRoutine } = useRoutine();
  const { user } = useAuth();
  const router = useRouter();

  const onDeleteRequest = async () => {
    if (!item) {
      Toast.warn("Missing Info! There's no routine to delete");
      return;
    }

    try {
      await deleteRoutine(item.id);
      Toast.success('Success! Routine deleted successfully.');
      if (onDeleted) await onDeleted();
    } catch (err) {
      console.error(err);
      Toast.error('Error! Failed to delete routine.');
    }
  };

  const onOpenRoutine = () => {
    if (item?.id) {
      router.push({
        pathname: '/workoutsessions',
        params: { routineId: item.id },
      });
    }
  };

  const onEditRoutine = () => {
    if (item?.id) {
      router.push({
        pathname: '/routines',
        params: { routineId: item.id },
      });
    }
  };

  return (
    <View className="relative items-center justify-center">
      <Pressable onPress={onOpenRoutine} className="active:opacity-80">
        <View className="w-[150px] h-[150px] sm:w-[250px] sm:h-[250px] rounded-xl overflow-hidden">
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,255,1)']}
            className="absolute bottom-0 justify-end w-full h-full p-3 rounded-xl"
          >
            <Text className="text-white sm:text-2xl font-bold">{item.name}</Text>
            <Text className="text-white sm:text-base">{item.level}</Text>
            <Text className="text-white sm:text-base">By: {item.trainer?.name}</Text>
            <Text className="text-white text-sm font-semibold">{item.description}</Text>
          </LinearGradient>
        </View>
      </Pressable>

      {user?.role === 'TRAINER' && (
        <View pointerEvents="box-none" className="absolute top-2 right-2 flex-row gap-2">
          <Pressable onPress={onEditRoutine} className="bg-black/40 p-2 rounded-md">
            <Pencil height={20} width={20} fill="#ffffff" />
          </Pressable>

          <Pressable onPress={onDeleteRequest} className="bg-black/40 p-2 rounded-md">
            <Bin height={20} width={20} fill="#ff0000" />
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default SliderItem;
