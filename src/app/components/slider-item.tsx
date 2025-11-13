import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import React from 'react';
import { Alert, Dimensions, Image, Pressable, Text, View } from 'react-native';
import { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import Logo from '../../assets/cycle-ball.png';
import Pencil from '../../assets/pencil.svg';
import Bin from '../../assets/bin.svg';
import { Routine } from '../interfaces/types';
import { useRoutine } from '../services/routine-service';

type Props = {
  item: Routine;
  index: number;
  scrollX: SharedValue<number>;
};

const SliderItem = ({ item, index, scrollX }: Props) => {
  const {deleteRoutine} = useRoutine();
  const rnAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [
              (index - 1) * Dimensions.get('screen').width,
              index * Dimensions.get('screen').width,
              (index + 1) * Dimensions.get('screen').width,
            ],
            [-Dimensions.get('screen').width * 0.25, 0, Dimensions.get('screen').width * 0.25],
            Extrapolation.CLAMP,
          ),
        },
        {
          scale: interpolate(
            scrollX.value,
            [
              (index - 1) * Dimensions.get('screen').width,
              index * Dimensions.get('screen').width,
              (index + 1) * Dimensions.get('screen').width,
            ],
            [0.9, 0, 0.9],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  });
  
  const onDeleteRequest = async (routineId: string | undefined) => {
    if(!item){
      Alert.alert('Missing Info', "There's no routine to delete");
      return;
    }
        
    try {
      await deleteRoutine(item.id, item);
      Alert.alert('Success', 'Routine deleted succesfully!');
    } catch (err) {
      console.error('Error deleting routine', err);
      
      Alert.alert('Error', 'Failed to delete routine');
    }

  }

  return (
    <View className="flex-1 relative">
      <Link href="/../settings">
        <View className="items-center flex-1 justify-center w-[150px] h-[150px] sm:w-[250px] sm:h-[250px]">
          <Image src={Logo} />
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,255,1)']}
            className="absolute justify-end rounded-xl w-[150px] h-[150px] sm:w-[250px] sm:h-[250px] p-3"
          >
            <Text className="text-white sm:text-2xl font-bold">{item.name}</Text>
            <Text className="text-white sm:text-base">{item.level}</Text>
            <Text className="text-white sm:text-base">By: {item.trainer?.name}</Text>
            <Text className="text-white text-sm font-semibold">{item.description}</Text>
          </LinearGradient>
        </View>
      </Link>

      <View className="inset-0 absolute h-[15%] w-[32%] flex-row ml-[63%] gap-2">
        <Link href={{ pathname: '/routines', params: { routineId: item.id } }}>
          <Pencil height="100%" width="100%" className="fill-white" />
        </Link>
        <Pressable onPress={() => onDeleteRequest(item.id)}>
          <Bin height="100%" width="100%" className="fill-white" />
        </Pressable>
      </View>
    </View>
  );
};

export default SliderItem;
