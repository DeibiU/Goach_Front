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
import Logo from '../../assets/splash-icon.png';

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
    <View className="items-center justify-center w-full">
      <Image src={Logo} className="w-screen h-full rounded-md" />
      <LinearGradient
        colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.4)']}
        className="absolute w-screen h-full p-20"
      >
        <Text className="text-white text-2xl font-bold">{item.name}</Text>
        <Text className="text-white text-base">{item.level}</Text>
        <Text className="text-white text-base">{item.trainer?.name}</Text>
        <Text className="text-white text-sm font-semibold">{item.description}</Text>
      </LinearGradient>
    </View>
  );
};

export default SliderItem;
