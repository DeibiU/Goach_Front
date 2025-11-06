import React, { useEffect } from 'react';
import { Image, View, Text, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { Routine } from '../interfaces/types';
import Logo from '../../assets/cycle-ball.png';

type Props = {
  item: Routine;
  index: number;
  scrollX: SharedValue<number>;
};

const SliderItem = ({ item, index, scrollX }: Props) => {
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
  return (
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
  );
};

export default SliderItem;
