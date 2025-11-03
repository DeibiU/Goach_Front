import * as React from 'react';
import { Dimensions, FlatList, Image, Text, View } from 'react-native';
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import CycleBall from '../../assets/icon.png'

const routines = [
  CycleBall,
    CycleBall,
  CycleBall,
];

const { width } = Dimensions.get('screen');
const _itemSize = width * 0.24;
const _spacing = 12;

function CarouselItem({
  imageUri,
  index,
  scrollX,
}: {
  imageUri: string;
  index: number;
  scrollX: SharedValue<number>;
}) {
  const stylez = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [_itemSize / 3, 0, _itemSize / 3],
          ),
        },
      ],
    };
  });
  return (
    <Animated.View style={[stylez]}>
      <Image
        source={{ uri: imageUri }}
        style={{
          width: _itemSize,
          height: _itemSize,
          borderRadius: _itemSize / 2,
          backgroundColor: '#ffffff'
        }}
      />
    </Animated.View>
  );
}

export function RoutineCarousel() {
  const scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    console.log(scrollX.value);
    scrollX.value = e.contentOffset.x;
  });
  return (
    <View className="flex-1 justify-end">
      <Animated.FlatList
        className="grow-0"
        contentContainerStyle={{
          gap: _spacing,
          paddingHorizontal: (width - _itemSize) / 2,
        }}
        data={routines}
        keyExtractor={(_, index) => String(index)}
        renderItem={({ item, index }) => {
          return <CarouselItem imageUri={item} index={index} scrollX={scrollX} />;
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={1000 / 60}
        snapToInterval={_itemSize + _spacing}
        decelerationRate={'fast'}
      />
    </View>
  );
}
