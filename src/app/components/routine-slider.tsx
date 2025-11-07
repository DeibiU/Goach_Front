import React, { useEffect } from 'react';
import SliderItem from './slider-item';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { Routine } from '../interfaces/types';

type Props = {
  itemList: Routine[];
};

const Slider = ({ itemList }: Props) => {
  const scrollX = useSharedValue(0);
  const onScrolHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
    },
  });

  return (
    <Animated.FlatList
      data={itemList}
      keyExtractor={(item, index) => (item.id ? String(item.id) : String(index))}
      renderItem={({ item, index }) => <SliderItem item={item} index={index} scrollX={scrollX} />}
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      onScroll={onScrolHandler}
    />
  );
};

export default Slider;
