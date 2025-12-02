import React from 'react';
import { FlatList, View } from 'react-native';
import { Routine } from '../interfaces/types';
import SliderItem from './slider-item';

type Props = {
  itemList: Routine[];
  onRefresh?: () => Promise<void>;
};

const Slider = ({ itemList, onRefresh }: Props) => {
  return (
    <View
      className="flex-row justify-center"
      style={{
        height: 250,
        overflow: 'hidden',
      }}
    >
      <FlatList
        horizontal
        data={itemList}
        keyExtractor={(item, index) => item.id ?? index.toString()}
        renderItem={({ item }) => <SliderItem item={item} onDeleted={onRefresh} />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 20, paddingHorizontal: 16 }}
      />
    </View>
  );
};

export default Slider;
