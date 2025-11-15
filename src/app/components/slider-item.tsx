import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { Alert, Image, Pressable, Text, View } from 'react-native';
import Logo from '../../assets/cycle-ball.png';
import Pencil from '../../assets/pencil.svg';
import Bin from '../../assets/bin.svg';
import { Routine } from '../interfaces/types';
import { useRoutine } from '../services/routine-service';

type Props = {
  item: Routine;
  onDeleted?: () => Promise<void>;
};

const SliderItem = ({ item, onDeleted }: Props) => {
  const { deleteRoutine } = useRoutine();
  const router = useRouter();

  const onDeleteRequest = async () => {
    if (!item) {
      Alert.alert('Missing Info', "There's no routine to delete");
      return;
    }

    try {
      await deleteRoutine(item.id);
      Alert.alert('Success', 'Routine deleted successfully!');
      if (onDeleted) await onDeleted();
    } catch (err) {
      console.error('Error deleting routine', err);
      Alert.alert('Error', 'Failed to delete routine');
    }
  };

  const onOpenRoutine = () => {
    if (item?.id) {
      router.push({
        pathname: '/routines',
        params: { routineId: item.id },
      });
    }
  };

  return (
    <View className="flex-1 relative items-center justify-center">
      {/* Whole card is pressable */}
      <Pressable onPress={onOpenRoutine}>
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

      {/* Edit / Delete buttons overlay */}
      <View className="absolute top-2 right-2 flex-row gap-2">
        <Pressable onPress={onOpenRoutine} className="bg-black/40 p-2 rounded-md">
          <Pencil height={20} width={20} className="fill-white" />
        </Pressable>

        <Pressable onPress={onDeleteRequest} className="bg-black/40 p-2 rounded-md">
          <Bin height={20} width={20} className="fill-red-600" />
        </Pressable>
      </View>
    </View>
  );
};

export default SliderItem;
